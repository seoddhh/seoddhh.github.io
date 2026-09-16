---
title: 아키텍처
date: 2026-07-10
tags: [architecture, LangGraph, FastAPI]
order: 2
suggested: true
draft: false
---

:::user
전체 구조는 어떻게 설계했어?
:::

:::assistant
LangGraph **StateGraph의 선형 9노드 파이프라인**입니다. 관광객/현지인, 시간대 선택 유무, 식사 유무 같은 갈래는 엣지로 나누지 않고 노드 안에서 처리했습니다.

| 노드 | 하는 일 | 바깥 의존 |
|---|---|---|
| `parse_intent` | 자연어 → 칩 구조화 (칩으로 들어오면 0콜) | 챗 LLM |
| `plan` | 시간 골격 · 식사 앵커 | 없음 (순수 계산) |
| `retrieve` | 의미검색 + 권역 필터 · 개인화 재랭킹 · 종류 쿼터 | 임베딩 API → Chroma |
| `select_places` | 장소 선정 · `reason` · `activities` | 챗 LLM (멀티데이는 일차별 병렬) |
| `fit_schedule` | 방문 순서 · 시각 · 이동수단 | 없음 (순수 계산) |
| `meals` | 끼니별 실제 식당 3곳 | 로컬 캐시 |
| `enrich` | 방문 시각의 혼잡도 예보 | 서울시 citydata_ppltn |
| `nearby` | 주변 식당 · 진행중 행사 카드 | 캐시 재사용 · 서울시 citydata |
| `compose` | 제목 · 선정 근거 · 스톱 카드 문구 | 챗 LLM (전역 1 + 일차 N + 스톱 M) |

**9개 노드 중 LLM이 판단하는 건 3개**(`parse_intent`, `select_places`, `compose`)뿐입니다. `plan`과 `fit_schedule`은 바깥을 전혀 보지 않고 로직으로만 계산합니다.

역할 분담도 명확히 뒀습니다. 어디를, 왜, 어떤 순서로 갈지는 AI 서버가 전부 정하고, 프론트는 그 순서 위에 지도 SDK로 실제 도로 폴리라인만 그립니다.
:::

:::user
왜 그 구조를 선택했어?
:::

:::assistant
| 기술 | 선택 이유 |
|---|---|
| **LangGraph** (StateGraph) | 코스 생성은 *무엇을 할지가 요청 시점에 이미 정해져 있어서* 모델이 다음 단계를 고를 필요가 없습니다. 여기에 tool calling 루프를 씌우면 레이턴시만 길어집니다. 확실한 워크플로우가 있고 분기만 처리하면 되는 구조라 StateGraph가 맞았습니다. |
| **Chroma** (로컬 persistent) | 장소 1,648개는 벡터 DB를 따로 띄울 규모가 아닙니다. sqlite 파일이라 배포 이미지에 같이 구워서 읽기 전용으로 올릴 수 있습니다. |
| **FastAPI + SSE** | 코스 하나에 5~6초가 걸려서 진행 상황 표시가 꼭 필요했습니다. 서버가 보내주기만 하면 되고 양방향이 필요 없어서 WebSocket 대신 SSE를 썼습니다. BFF는 그대로 흘려보내기만 하면 되고 재연결도 브라우저가 알아서 합니다. |
| **계산 노드 분리** | 시간 계산과 동선 최적화는 항상 같은 답이 나와야 합니다. LLM에 맡기면 검증할 방법이 없어서 로직으로 처리했습니다. |
| **프로바이더 스위치** | 챗 LLM은 호출 제한이 있어서 `upstage \| gemini \| claude` 스위치를 두고, `LLM_PROVIDER` 값만 바꾸면 코드 수정 없이 폴백되게 했습니다. |
| **uv** | `pyproject.toml` + `uv.lock`을 커밋해 팀·배포 환경의 버전을 고정했습니다. |
:::

:::user
클라이언트랑은 어떻게 연결돼?
:::

:::assistant
브라우저는 same-origin으로 Vercel Next.js BFF에만 붙고, BFF가 `AI_SERVER_URL`로 프록시하면서 `X-Internal-Token`을 붙입니다. AI 서버는 `verify_internal_token` 미들웨어로 `/agent/*`만 막습니다. AI 서버 주소가 밖으로 드러나지 않고, 토큰도 브라우저에 내려가지 않습니다.

| 메서드 · 경로 | 기능 |
|---|---|
| `GET /health` | 헬스체크 · LLM/임베딩 프로바이더 · Chroma 컬렉션 |
| `POST /agent/chat` | 통합 진입점 — `chips`가 있으면 칩 진입, 없으면 `message` 자연어 진입 |
| `POST /agent/chat/stream` | 입력은 위와 같고 응답이 SSE. `progress`(노드 완료) → `final`(payload). 프론트가 실제로 쓰는 경로 |
| `POST /agent/course` | 코스 생성만 하는 단일 기능 |

배포 후에는 `GET /health`부터 확인합니다. 임베딩 모델과 컬렉션 짝이 어긋나면 **에러 없이 검색 결과만 이상해지기 때문**입니다.

```jsonc
{ "llm_provider": "gemini", "embedding_provider": "upstage",
  "embedding_model": "embedding-2", "chroma_collection": "seoulro_v3" }
```
:::
