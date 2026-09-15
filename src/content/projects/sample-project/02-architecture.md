---
title: 아키텍처
date: 2026-08-02
tags: [architecture]
order: 2
draft: true
---

:::user
전체 구조는 어떻게 설계했어?
:::

:::assistant
예시 답변입니다. 코드 블록 렌더링을 확인합니다.

```python
def retrieve(query: str) -> list[str]:
    return vector_store.similarity_search(query, k=5)
```
:::

:::user
왜 그 구조를 선택했어?
:::

:::assistant
두 번째 턴 예시입니다.
:::
