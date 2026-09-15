// 단색 UI에 맞춘 그레이스케일 Shiki 테마. 색 대신 명도와 스타일로 토큰을 구분합니다.
/** @type {import('shiki').ThemeRegistration} */
export default {
  name: 'mono-dark',
  type: 'dark',
  colors: {
    'editor.background': '#171717',
    'editor.foreground': '#d4d4d4',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#6b6b6b', fontStyle: 'italic' },
    },
    {
      scope: ['keyword', 'keyword.control', 'storage', 'storage.type', 'storage.modifier', 'variable.language'],
      settings: { foreground: '#ffffff' },
    },
    {
      scope: ['entity.name.function', 'support.function', 'entity.name.tag'],
      settings: { foreground: '#f5f5f5' },
    },
    {
      scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'],
      settings: { foreground: '#e5e5e5' },
    },
    {
      scope: ['string', 'string.quoted', 'constant.character.escape', 'entity.other.attribute-name'],
      settings: { foreground: '#a3a3a3' },
    },
    {
      scope: ['constant.numeric', 'constant.language', 'constant.other'],
      settings: { foreground: '#bdbdbd' },
    },
    {
      scope: ['punctuation', 'keyword.operator', 'meta.brace'],
      settings: { foreground: '#8a8a8a' },
    },
    {
      scope: ['variable', 'variable.parameter'],
      settings: { foreground: '#d4d4d4' },
    },
  ],
};
