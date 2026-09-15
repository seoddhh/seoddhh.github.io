// `:::user` / `:::assistant` 컨테이너 디렉티브를 채팅 턴 <section>으로 변환합니다.
// 각 턴에는 순서대로 `m-1`, `m-2` ... 앵커 id가 붙습니다.
const ROLES = new Set(['user', 'assistant']);

export default function remarkChatTurns() {
  return (tree) => {
    let index = 0;

    const walk = (node) => {
      if (node.type === 'containerDirective' && ROLES.has(node.name)) {
        index += 1;
        node.data = {
          ...node.data,
          hName: 'section',
          hProperties: {
            id: `m-${index}`,
            className: ['chat-turn', `chat-turn--${node.name}`],
            'data-role': node.name,
          },
        };
      }
      node.children?.forEach(walk);
    };

    walk(tree);
  };
}
