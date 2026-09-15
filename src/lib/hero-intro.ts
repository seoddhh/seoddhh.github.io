// 첫 진입 히어로 WebGL 렌더러.
// 화면 중앙에 fbm 노이즈 경계를 가진 구멍이 생겨 바깥으로 퍼지고, 구멍 안으로 뒤의 UI가 드러납니다.

export const HERO_FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const VERTEX_SHADER = /* glsl */ `
  attribute vec2 aPosition;

  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform vec2 uResolution;
  uniform float uProgress; // 0: 화면 전체가 흰색, 1: 구멍이 화면 전체로 퍼져 사라짐
  uniform float uTime;
  uniform float uPixel;    // 픽셀화 셀 크기(디바이스 픽셀)
  uniform sampler2D uText;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    // 좌표를 셀 단위로 양자화해 경계를 계단처럼 픽셀화합니다.
    vec2 cell = (floor(gl_FragCoord.xy / uPixel) + 0.5) * uPixel;
    vec2 p = (cell - 0.5 * uResolution) / uResolution.y;

    // 구멍 반지름: 시작 시 노이즈가 중앙에 구멍을 내지 않도록 음수에서 출발해,
    // 끝에서는 화면 모서리의 노이즈 경계까지 모두 지나갑니다.
    float cover = length(0.5 * uResolution / uResolution.y) + 0.25;
    float radius = mix(-0.45, cover, uProgress);
    float distanceFromCenter = length(p);
    float t = uTime * 0.6;

    // 회색 테두리와 흰 영역은 서로 다른 노이즈로 흔들어 경계가 겹치지 않게 합니다.
    float rimEdge = distanceFromCenter + (fbm(p * 2.5 - vec2(t * 0.7, t)) - 0.5) * 0.45;
    float coreEdge = distanceFromCenter + (fbm(p * 3.5 + vec2(t, -t)) - 0.5) * 0.35;
    float rimWidth = 0.14;

    // 구멍(투명) → 회색 테두리 → 흰 영역 순서로 중앙에서 바깥으로 배치됩니다.
    float rim = 1.0 - step(rimEdge, radius);
    float core = 1.0 - step(coreEdge, radius + rimWidth);
    float alpha = rim * (1.0 - smoothstep(0.9, 1.0, uProgress));

    // 글자는 픽셀화하지 않고, 흰 영역 안에서만 보입니다.
    float text = texture2D(uText, gl_FragCoord.xy / uResolution).a * core;

    vec3 color = mix(vec3(0.45), vec3(1.0), core);
    color = mix(color, vec3(0.0), text);
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

export interface HeroRenderer {
  resize(): void;
  draw(progress: number, time: number): void;
  dispose(): void;
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
}

export function createHeroRenderer(canvas: HTMLCanvasElement, text: string): HeroRenderer | null {
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false });
  const textCanvas = document.createElement('canvas');
  const context = textCanvas.getContext('2d');
  if (!gl || !context) return null;

  const program = createProgram(gl);
  if (!program) return null;
  gl.useProgram(program);

  // 화면 전체를 덮는 삼각형 하나
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'aPosition');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uniforms = {
    resolution: gl.getUniformLocation(program, 'uResolution'),
    progress: gl.getUniformLocation(program, 'uProgress'),
    time: gl.getUniformLocation(program, 'uTime'),
    pixel: gl.getUniformLocation(program, 'uPixel'),
    text: gl.getUniformLocation(program, 'uText'),
  };

  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.uniform1i(uniforms.text, 0);

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.round(window.innerWidth * dpr);
    const height = Math.round(window.innerHeight * dpr);

    canvas.width = width;
    canvas.height = height;
    textCanvas.width = width;
    textCanvas.height = height;
    gl.viewport(0, 0, width, height);

    // CSS 대체 글자(.hero-intro__fallback)와 같은 크기 규칙: min(9vw, 14vh)
    const size = Math.min(width * 0.09, height * 0.14);
    context.font = `700 ${size}px ${HERO_FONT}`;
    context.letterSpacing = `${-0.02 * size}px`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#fff';
    context.fillText(text, width / 2, height / 2);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);

    gl.uniform2f(uniforms.resolution, width, height);
    gl.uniform1f(uniforms.pixel, 8 * dpr);
  };

  resize();

  return {
    resize,
    draw(progress, time) {
      gl.uniform1f(uniforms.progress, progress);
      gl.uniform1f(uniforms.time, time);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    dispose() {
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}

// CSS cubic-bezier와 같은 이징 함수를 만듭니다.
export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const sample = (a: number, b: number, t: number) =>
    3 * a * (1 - t) ** 2 * t + 3 * b * (1 - t) * t ** 2 + t ** 3;

  return (x: number) => {
    let low = 0;
    let high = 1;
    let t = x;
    for (let i = 0; i < 20; i++) {
      if (sample(x1, x2, t) < x) low = t;
      else high = t;
      t = (low + high) / 2;
    }
    return sample(y1, y2, t);
  };
}
