---
title: FastAPI란 무엇인가??
date: 2026-09-02
tags: [python, fastapi]
draft: false
---

:::user
FastAPI가 뭐야 api인데 속도 빠른건가?
:::

:::assistant
하하 그런 멍청한 질문을 하시다니 제가 FastAPI가 무엇이고, 왜 쓰고, 어떻게 쓰는건지 알려드리겠습니다. FastAPI가 "파이썬 웹 **프레임워크**"라서, 프레임워크가 무엇인지부터 시작합니다.

| 순서 | 다룰 내용 |
|---|---|
| **1. 배경** | 프레임워크란 무엇인가, 웹 프레임워크가 하는 일, API란 무엇인가 |
| **2. FastAPI 소개** | 공식 문서의 정의와 특징, 무엇으로 만들어졌는가(Starlette, Pydantic, Uvicorn) |
| **3. 직접 만들기** | 설치, 실행, 경로·쿼리 매개변수, 요청 본문, 자동 문서 |
| **4. 한 걸음 더** | `async def`와 `def` 중 무엇을 쓸까 |

- **실습 환경**: Python 3.14, FastAPI 0.141.1, Pydantic 2.13, macOS
- **기준 문서**: [FastAPI 공식 문서](https://fastapi.tiangolo.com/) ([한국어](https://fastapi.tiangolo.com/ko/)). 글의 설명과 인용은 공식 문서를 따랐고, 예제의 응답은 위 환경에서 직접 실행한 결과입니다.
- **먼저 알면 좋은 것**: [앞 글](/c/2026-09-01-python-basics-interview)에서 다룬 함수, 딕셔너리, 데코레이터, 클래스
:::

:::user
프레임워크가 정확히 뭐야? 라이브러리랑은 뭐가 달라?
:::

:::assistant
둘 다 **다른 사람이 미리 만들어 둔 코드**라는 점은 같습니다. 차이는 **누가 흐름을 쥐고 있느냐**입니다.

| | 라이브러리 | 프레임워크 |
|---|---|---|
| 비유 | **공구함**: 필요할 때 내가 꺼내 씀 | **건물의 뼈대**: 정해진 자리에 내가 벽과 가구를 채움 |
| 흐름의 주인 | **내 코드** | **프레임워크** |
| 호출 방향 | 내 코드 → 라이브러리 함수 호출 | 프레임워크 → 내 코드 호출 |
| 예 | `math`, `random`, Beautiful Soup | Django, Flask, FastAPI |

코드로 보면 더 분명합니다.

```python
# 라이브러리: 내가 원하는 때에 직접 부른다
import math
print(math.sqrt(16))

# 프레임워크: 나는 함수를 "등록"만 하고, 부르는 건 프레임워크가 한다
@app.get("/hello")
def hello():
    return {"message": "안녕하세요"}
```

아래 `hello()`는 내 코드 어디에서도 호출하지 않습니다. 누군가 브라우저로 `/hello`에 접속하면 **프레임워크가 알아서 `hello()`를 불러 줍니다.** 이렇게 호출의 방향이 뒤집히는 것을 **제어의 역전(Inversion of Control)** 이라고 합니다. "우리에게 연락하지 마세요, 우리가 연락할게요(Don't call us, we'll call you)"라는 말로도 자주 설명합니다.

그래서 프레임워크를 쓴다는 건 **정해진 규칙(틀)을 따르는 대신, 반복되는 귀찮은 일을 맡기는 것**입니다.
:::

:::user
그럼 웹 프레임워크는 어떤 귀찮은 일을 대신 해 줘?
:::

:::assistant
브라우저나 앱이 서버에 보내는 **요청(HTTP 요청)** 은 사실 이런 텍스트입니다.

```text
POST /items/ HTTP/1.1
Host: 127.0.0.1:8000
Content-Type: application/json

{"name": "키보드", "price": 35000}
```

프레임워크가 없다면 이 텍스트를 받아서 직접 처리해야 합니다.

1. 첫 줄을 잘라서 **어떤 방식(`POST`)으로 어느 주소(`/items/`)** 에 왔는지 알아냅니다.
2. 주소에 맞는 함수를 찾아 실행합니다. (**라우팅**)
3. 본문의 JSON 문자열을 파이썬 딕셔너리로 바꿉니다.
4. `price`가 정말 숫자인지, 빠진 값은 없는지 **검증**합니다.
5. 결과를 다시 JSON 텍스트로 바꾸고, 상태 코드(`200 OK` 등)를 붙여 **응답**합니다.
6. 중간에 오류가 나면 적절한 오류 응답을 만듭니다.

이 과정은 어떤 서비스를 만들든 거의 같습니다. **웹 프레임워크는 이 공통 작업을 맡고, 개발자는 2번의 "그 함수 안에서 실제로 할 일"에만 집중하게 해 줍니다.**
:::

:::user
FastAPI 설명에 계속 "API"라는 말이 나오던데, API는 뭐야?
:::

:::assistant
**API(Application Programming Interface)는 프로그램끼리 대화하는 창구**입니다. 식당으로 비유하면 손님(앱)이 주방(서버의 데이터와 기능)에 직접 들어가지 않고, **메뉴판을 보고 점원에게 주문하는 규칙**이 API입니다.

웹에서는 보통 이렇게 동작합니다.

```text
[앱/브라우저]  --- GET /items/3 --->  [서버의 API]
[앱/브라우저]  <--- {"item_id": 3, "name": "키보드"} ---  [서버의 API]
```

- **주소(경로)** 로 무엇을 원하는지 알리고,
- **HTTP 메서드**(`GET`은 조회, `POST`는 생성 등)로 무엇을 할지 알리고,
- 데이터는 주로 **JSON** 형식으로 주고받습니다.

웹 페이지(HTML)를 통째로 만들어 보내는 대신 **데이터만 주고받기 때문에**, 같은 API 하나를 웹, 모바일 앱, 다른 서버가 함께 쓸 수 있습니다. FastAPI는 이름 그대로 **이런 API를 만드는 데 집중한** 프레임워크입니다.
:::

:::user
파이썬 웹 프레임워크는 Django, Flask도 있잖아. 뭐가 달라?
:::

:::assistant
만들려는 것의 크기와 방향이 다릅니다.

| | Django | Flask | FastAPI |
|---|---|---|---|
| 성격 | **풀스택**: 필요한 게 거의 다 들어 있음 | **마이크로**: 최소한만 있고 나머지는 골라 붙임 | **API 특화 마이크로** |
| 기본 제공 | 관리자 페이지, DB 연동(ORM), 로그인, 템플릿 | 라우팅, 요청·응답 | 라우팅, **타입 기반 검증, 자동 API 문서**, 비동기 |
| 잘 맞는 것 | 관리 화면까지 있는 웹 서비스 전체 | 작고 단순한 웹 서비스 | 앱·프론트엔드가 쓰는 **API 서버**, AI 모델 서빙 |

공식 문서의 [대안과 영감](https://fastapi.tiangolo.com/alternatives/) 페이지를 보면, FastAPI는 기존 도구에서 좋은 점을 가져와 만들어졌습니다.

- **Flask**에서: 마이크로 프레임워크여서 필요한 도구를 골라 조합하기 쉽고, 라우팅이 단순하다는 점
- **Requests**(HTTP 요청 라이브러리)에서: `get`, `post`처럼 HTTP 메서드 이름을 그대로 쓰는 직관적인 사용법
- **OpenAPI(Swagger)** 에서: 직접 만든 형식 대신 **API 명세의 공개 표준**을 쓰는 것

어느 게 더 좋다기보다, **API 서버를 빠르고 안전하게 만드는 것**이 목적이라면 FastAPI가 잘 맞습니다.
:::

:::user
그래서 FastAPI를 한 문장으로 정의하면?
:::

:::assistant
공식 문서는 이렇게 소개합니다.

> FastAPI framework, high performance, easy to learn, fast to code, ready for production
>
> (FastAPI 프레임워크: 고성능, 배우기 쉬움, 빠른 개발, 실제 서비스 운영에 바로 쓸 수 있음)

조금 더 풀면 **"파이썬 타입 힌트를 기반으로 API를 만드는 현대적이고 빠른 웹 프레임워크"** 입니다. 공식 문서가 꼽는 특징은 이렇습니다.

| 특징 | 공식 문서의 설명 |
|---|---|
| **빠름** | NodeJS, Go와 비슷한 수준의 매우 높은 성능. 가장 빠른 파이썬 프레임워크 중 하나 |
| **빠른 개발** | 기능 개발 속도 약 200~300% 향상 |
| **적은 버그** | 개발자가 만드는 오류 약 40% 감소 |
| **직관적** | 에디터 자동 완성이 어디서나 동작. 디버깅 시간 감소 |
| **쉬움** | 쓰기 쉽고 배우기 쉽게 설계. 문서 읽는 시간 감소 |
| **짧음** | 매개변수 선언 하나로 여러 기능. 코드 중복 최소화 |
| **견고함** | 자동 대화형 문서와 함께 실제 운영 가능한 코드 |
| **표준 기반** | API 공개 표준인 **OpenAPI**와 **JSON Schema**를 기반으로 완전히 호환 |

속도와 버그 감소 수치는 공식 문서가 밝힌 **FastAPI 팀의 자체 측정치**라서, 모든 프로젝트에서 똑같이 나온다고 보기는 어렵습니다. 이 글에서 직접 확인해 볼 핵심은 **"타입만 적으면 검증과 문서가 따라온다"** 는 점입니다.
:::

:::user
FastAPI는 뭘로 만들어진 거야? Starlette, Pydantic, Uvicorn 같은 이름이 같이 나오던데.
:::

:::assistant
FastAPI는 모든 걸 처음부터 만들지 않고, 잘 만들어진 도구 두 개 위에 올라가 있습니다. 공식 문서의 표현으로는 **"웹 부분은 Starlette, 데이터 부분은 Pydantic"** 입니다.

| 구성 요소 | 역할 | 공식 문서의 설명 |
|---|---|---|
| **Starlette** | 웹 부분: 요청 받기, 라우팅, 응답 보내기, 웹소켓 | 가벼운 ASGI 프레임워크/툴킷. `FastAPI` 클래스는 `Starlette` 클래스를 **직접 상속**함 |
| **Pydantic** | 데이터 부분: 타입 검증, 변환, JSON 직렬화 | 데이터 검증, 직렬화, JSON Schema 기반 모델 문서화를 모두 처리 |
| **Uvicorn** | 서버: 실제로 네트워크 요청을 받아 FastAPI에 넘겨줌 | 매우 빠른 ASGI 서버. 웹 프레임워크가 아니라 **서버** |

요청 하나가 처리되는 흐름으로 보면 이렇습니다.

```text
브라우저/앱
   │  HTTP 요청
   ▼
Uvicorn (서버: 요청을 받아서 넘겨줌)
   │  ASGI 규칙으로 전달
   ▼
FastAPI = Starlette(라우팅) + Pydantic(검증)
   │  맞는 함수를 찾아 호출
   ▼
내가 작성한 함수
```

**ASGI**는 "파이썬 서버와 웹 프레임워크가 서로 대화하는 약속"입니다. 이 약속 덕분에 Uvicorn 같은 서버와 FastAPI 같은 프레임워크를 따로 만들어도 서로 연결할 수 있습니다.

공식 문서는 FastAPI를 **"Starlette on steroids(Starlette의 강화판)"** 라고 부릅니다. Starlette에는 없는 자동 데이터 검증, 자동 문서, 의존성 주입, 보안 도구를 Pydantic과 함께 얹은 것이 FastAPI입니다.
:::

:::user
FastAPI의 핵심 아이디어가 "타입 힌트"라고 하던데, 타입 힌트가 뭐야?
:::

:::assistant
**타입 힌트는 변수나 매개변수에 "이건 어떤 자료형이다"라고 적어 두는 표시**입니다.

```python
def greet(name: str, age: int) -> str:
    return f"{name}님은 {age}살입니다"
```

- `name: str`: `name`에는 문자열이 온다
- `age: int`: `age`에는 정수가 온다
- `-> str`: 이 함수는 문자열을 돌려준다

없어도 되는 값은 `| None`과 기본값을 함께 씁니다.

```python
def search(keyword: str, limit: int | None = None): ...
```

중요한 점은 **파이썬 자체는 타입 힌트를 검사하지 않는다**는 것입니다. `greet(123, "스물")`처럼 불러도 파이썬은 그냥 실행합니다. 타입 힌트는 원래 사람과 에디터(자동 완성, 오류 표시)를 위한 메모였습니다.

**FastAPI는 이 메모를 실제로 읽어서 사용합니다.** 공식 문서의 설명대로 새로운 문법을 배울 필요 없이 표준 파이썬 타입을 그대로 쓰는데, 이 타입 하나로 FastAPI가 다음 일을 합니다.

- 에디터 자동 완성과 타입 검사
- 들어온 데이터의 **검증**: 잘못되면 알아서 오류 응답
- 데이터 **변환**: 주소의 `"3"`(문자열)을 `3`(정수)으로
- **API 문서 자동 생성**

이 네 가지를 뒤에서 하나씩 직접 확인합니다.
:::

:::user
좋아, 직접 설치하고 실행해 보자.
:::

:::assistant
**1. 가상환경을 만들고 설치합니다**

프로젝트마다 패키지를 따로 관리하도록 가상환경을 먼저 만듭니다. (Windows는 `python`, macOS는 `python3`)

```bash
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install "fastapi[standard]"
```

`[standard]`를 붙이면 개발 서버(Uvicorn), `fastapi` 명령어, 테스트 도구 같은 자주 쓰는 도구가 함께 설치됩니다. 공식 문서는 터미널에 따라 대괄호가 문제를 일으킬 수 있으니 **따옴표로 감싸라**고 안내합니다.

**2. `main.py`를 만듭니다**

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}
```

**3. 개발 서버를 실행합니다**

```bash
fastapi dev main.py
```

```text
 ⚡️ Starting FastAPI in development mode

 🐍 Using import string: main:app

 🌐 Server started at http://127.0.0.1:8000
    Documentation at http://127.0.0.1:8000/docs

INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

로그에 **Uvicorn**이 보입니다. 앞에서 본 것처럼 `fastapi` 명령어가 Uvicorn 서버를 띄우고, 그 위에서 `main.py`의 `app`이 동작합니다. `main.py` 안의 `app`은 자동으로 찾기 때문에, 공식 문서처럼 `fastapi dev`만 입력해도 됩니다.

브라우저에서 `http://127.0.0.1:8000`에 접속하면 이런 JSON이 보입니다.

```json
{"message": "Hello World"}
```

**`fastapi dev`와 `fastapi run`의 차이**

| | `fastapi dev` | `fastapi run` |
|---|---|---|
| 용도 | 개발할 때 | 실제 서비스할 때 |
| 자동 재시작 | 코드를 저장하면 자동으로 다시 시작 | 없음 |
| 접속 범위 | `127.0.0.1`: 내 컴퓨터에서만 | `0.0.0.0`: 외부에서도 접속 가능 |
:::

:::user
짧은 코드인데 한 줄씩 뜯어보면 무슨 뜻이야?
:::

:::assistant
```python
from fastapi import FastAPI     # 1

app = FastAPI()                  # 2

@app.get("/")                    # 3
def read_root():                 # 4
    return {"message": "Hello World"}   # 5
```

1. `FastAPI` **클래스**를 가져옵니다.
2. 클래스로 **객체(앱)** 를 만듭니다. 이 `app`이 API 전체를 대표하고, `fastapi dev`가 찾는 것도 이 이름입니다.
3. **경로 작동 데코레이터**입니다. 공식 문서의 설명 그대로, "바로 아래 함수가 **경로 `/`** 로 오는 **`GET` 요청**을 담당한다"고 FastAPI에 알려 줍니다. 앞 글에서 본 데코레이터가 여기서 쓰입니다.
4. **경로 작동 함수**입니다. 요청이 오면 FastAPI가 이 함수를 부릅니다. (앞에서 말한 제어의 역전)
5. 딕셔너리를 돌려주면 FastAPI가 **자동으로 JSON으로 바꿔서** 응답합니다. 리스트, 문자열, 숫자, Pydantic 모델도 돌려줄 수 있습니다.

공식 문서에 나오는 용어를 정리하면 이렇습니다.

| 용어 | 뜻 | 예 |
|---|---|---|
| **경로(path)** | URL에서 첫 `/`부터 끝까지. **엔드포인트**, **라우트**라고도 부름 | `https://example.com/items/foo` → `/items/foo` |
| **작동(operation)** | HTTP 메서드 | `GET`, `POST`, `PUT`, `DELETE` |
| **경로 작동 데코레이터** | 경로와 메서드를 함수에 연결 | `@app.get("/")`, `@app.post("/items/")` |
| **경로 작동 함수** | 요청을 실제로 처리하는 함수 | `read_root()` |

HTTP 메서드는 보통 이런 뜻으로 씁니다.

| 메서드 | 뜻 | 데코레이터 |
|---|---|---|
| `GET` | 데이터 **조회** | `@app.get()` |
| `POST` | 데이터 **생성** | `@app.post()` |
| `PUT` | 데이터 **수정** | `@app.put()` |
| `DELETE` | 데이터 **삭제** | `@app.delete()` |
:::

:::user
주소에 따라 다른 값을 받으려면? 예를 들어 3번 상품 조회 같은 거.
:::

:::assistant
경로에 `{ }`로 **경로 매개변수**를 만들고, 같은 이름의 함수 매개변수로 받습니다.

```python
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}
```

여기서 앞에서 말한 **타입 힌트의 효과**를 직접 볼 수 있습니다.

**데이터 변환**: `/items/3`에 접속하면 주소의 `"3"`(문자열)이 `int`로 바뀌어 들어옵니다.

```json
{"item_id": 3, "q": null}
```

**데이터 검증**: `/items/foo`처럼 정수가 아닌 값이 오면, 내 함수는 실행되지도 않고 FastAPI가 **422 오류**와 함께 어디가 왜 틀렸는지 알려 줍니다.

```json
{
  "detail": [
    {
      "type": "int_parsing",
      "loc": ["path", "item_id"],
      "msg": "Input should be a valid integer, unable to parse string as an integer",
      "input": "foo"
    }
  ]
}
```

`loc`(위치)에 `path`의 `item_id`라고 정확히 나옵니다. `if not item_id.isdigit(): ...` 같은 검사 코드를 한 줄도 쓰지 않았는데도요.

**쿼리 매개변수**

경로에 없는 매개변수 `q`는 주소 뒤 `?` 다음에 오는 **쿼리 매개변수**가 됩니다. `/items/3?q=hello`로 접속하면 `q`에 `"hello"`가 들어가고, 기본값이 `None`이라 생략해도 됩니다. 기본값을 주면 목록 조회의 페이지 나누기도 간단하게 만들 수 있습니다.

```python
@app.get("/items/")
def list_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}

# /items/?limit=5  →  {"skip": 0, "limit": 5}
```

**경로 순서에 주의하기**

공식 문서가 강조하는 주의점입니다. 경로는 **위에서부터 순서대로** 검사하기 때문에, 고정된 경로를 매개변수 경로보다 **먼저** 써야 합니다.

```python
@app.get("/users/me")            # 먼저
def read_user_me():
    return {"user_id": "현재 로그인한 사용자"}

@app.get("/users/{user_id}")     # 나중에
def read_user(user_id: str):
    return {"user_id": user_id}
```

순서를 바꾸면 `/users/me`로 접속해도 `/users/{user_id}`가 먼저 걸려서, `"me"`라는 사용자를 찾는 것처럼 처리됩니다.
:::

:::user
상품을 새로 등록할 때처럼, 데이터를 여러 개 묶어서 보내려면?
:::

:::assistant
**요청 본문(body)** 으로 JSON을 받습니다. 받을 데이터의 모양을 **Pydantic의 `BaseModel`을 상속한 클래스**로 정의합니다. 공식 문서의 예제입니다.

```python
from fastapi import FastAPI
from pydantic import BaseModel

class Item(BaseModel):
    name: str                        # 필수
    description: str | None = None   # 선택 (기본값 None)
    price: float                     # 필수
    tax: float | None = None         # 선택

app = FastAPI()

@app.post("/items/")
def create_item(item: Item):
    return item
```

클래스 안에 **타입 힌트만** 적었을 뿐인데, 공식 문서에 따르면 FastAPI는 이 선언 하나로 이런 일을 합니다.

- 요청 본문을 JSON으로 읽습니다.
- 필요하면 타입을 변환합니다.
- 데이터를 검증하고, 틀리면 **어디가 무엇이 틀렸는지** 오류로 알려 줍니다.
- 받은 데이터를 `item` 매개변수에 넣어 줍니다. 타입이 `Item`이라 에디터에서 `item.` 뒤에 자동 완성이 됩니다.
- 모델의 **JSON Schema**를 만들고, 이 스키마가 자동 문서에 들어갑니다.

직접 보내 보면 이렇습니다.

```text
보낸 값: {"name": "키보드", "price": "35000"}
응답 200: {"name": "키보드", "description": null, "price": 35000.0, "tax": null}
```

`price`를 문자열 `"35000"`으로 보냈는데 `float`로 바뀌었고, 보내지 않은 선택 항목은 `null`로 채워졌습니다. 필수 항목인 `price`를 빼먹으면 이렇게 됩니다.

```text
보낸 값: {"name": "키보드"}
응답 422: {"detail": [{"type": "missing", "loc": ["body", "price"], "msg": "Field required", ...}]}
```

**FastAPI가 매개변수를 구분하는 규칙**

지금까지 매개변수를 세 곳(경로, 쿼리, 본문)에서 받았는데, 어디서 받을지 따로 지정한 적이 없습니다. 공식 문서의 규칙은 이렇습니다.

| 매개변수가 | 받는 곳 |
|---|---|
| 경로의 `{ }`에도 선언되어 있으면 | **경로** 매개변수 |
| `int`, `float`, `str`, `bool` 같은 **단일 타입**이면 | **쿼리** 매개변수 |
| **Pydantic 모델** 타입이면 | 요청 **본문** |
:::

:::user
공식 문서에서 "자동 문서"를 강조하던데, 그건 뭐야?
:::

:::assistant
서버를 켠 상태에서 `http://127.0.0.1:8000/docs`에 접속해 보세요. 지금까지 만든 API가 전부 정리된 **대화형 문서(Swagger UI)** 가 나옵니다.

- 경로, 메서드, 매개변수, 요청 본문의 모양이 모두 표시됩니다.
- **Try it out** 버튼을 누르면 브라우저에서 바로 요청을 보내고 응답을 확인할 수 있습니다.
- 코드를 고치고 저장하면 문서도 함께 바뀝니다.

`http://127.0.0.1:8000/redoc`에서는 같은 내용을 다른 모양(ReDoc)으로 볼 수 있습니다.

**어떻게 자동으로 만들어질까?**

FastAPI는 코드의 경로, 타입 힌트, Pydantic 모델을 읽어서 **OpenAPI**라는 표준 형식의 명세를 만듭니다. `http://127.0.0.1:8000/openapi.json`에서 원본을 볼 수 있습니다.

```json
{
  "openapi": "3.1.0",
  "info": {"title": "FastAPI", "version": "0.1.0"},
  "paths": {"/": {...}, "/items/{item_id}": {...}, "/items/": {...}}
}
```

`/docs`와 `/redoc`은 이 JSON을 보기 좋게 그려 주는 화면입니다. **표준 형식**이라는 점이 중요한데, 공식 문서에 따르면 이 명세로 여러 언어의 **클라이언트 코드를 자동으로 생성**할 수도 있습니다. 프론트엔드 개발자에게 API 사용법을 따로 설명하지 않고 `/docs` 주소만 알려 줘도 되는 이유입니다.

문서를 따로 쓰면 코드와 문서가 점점 어긋나기 쉬운데, **코드 자체가 문서가 되니** 어긋날 일이 없습니다.
:::

:::user
예제를 보면 `def`도 있고 `async def`도 있던데, 뭘 써야 해?
:::

:::assistant
공식 문서의 [동시성과 async/await](https://fastapi.tiangolo.com/async/) 페이지가 햄버거 가게로 설명합니다.

- **`def`(동기)**: 주문하고 카운터 앞에서 햄버거가 나올 때까지 **계속 서서 기다립니다.** 그동안 다른 일을 못 합니다.
- **`async def`(비동기)**: 주문하고 번호표를 받은 뒤, **자리에 앉아 다른 일을 하다가** 번호가 불리면 받으러 갑니다.

웹 서버는 데이터베이스나 다른 서버의 응답을 **기다리는 시간**이 대부분이라서, 기다리는 동안 다른 요청을 처리할 수 있는 비동기가 유리합니다. 다만 비동기의 이점을 얻으려면 **내가 쓰는 라이브러리도 비동기(`await`)를 지원해야** 합니다.

공식 문서의 결론을 정리하면 이렇습니다.

| 상황 | 선택 |
|---|---|
| `await`로 부르라고 안내하는 라이브러리를 쓸 때 | `async def` |
| `await`를 지원하지 않는 라이브러리를 쓸 때 (대부분의 DB 라이브러리 등) | `def` |
| 외부와 통신하며 기다릴 일이 없을 때 | `async def` |
| **잘 모르겠을 때** | **`def`** |

`def`로 쓰면 FastAPI가 그 함수를 **별도의 스레드 풀에서 실행**해서, 기다리는 동안에도 서버 전체가 멈추지 않게 해 줍니다. 가장 피해야 할 것은 `async def` 안에서 `await`를 지원하지 않는, 오래 기다리는 코드를 부르는 경우입니다. 이러면 그동안 서버가 다른 요청을 처리하지 못합니다.

그래서 처음에는 **`def`로 시작하고, 비동기 라이브러리를 쓸 때 `async def`로 바꾸는 것**이 안전합니다.
:::

:::user
전체를 정리하면?
:::

:::assistant
| 질문 | 답 |
|---|---|
| 프레임워크란? | 흐름을 쥐고 **내 코드를 불러 주는** 틀. 라이브러리는 내가 부름 |
| 웹 프레임워크가 하는 일은? | 요청 해석, 라우팅, 검증, 응답 변환 같은 **공통 작업** |
| FastAPI란? | **타입 힌트를 기반으로 API를 만드는** 빠른 파이썬 웹 프레임워크 |
| 무엇으로 만들어졌나? | 웹은 **Starlette**, 데이터는 **Pydantic**, 서버는 **Uvicorn** |
| 가장 큰 장점은? | 타입만 적으면 **변환, 검증, 에디터 지원, API 문서**가 따라옴 |
| `def`와 `async def`는? | 비동기 라이브러리를 쓸 때만 `async def`, **모르면 `def`** |

정리하면서 제가 배운 점은 이렇습니다.

- 프레임워크를 배운다는 건 문법보다 **"프레임워크가 내 코드를 언제, 어떻게 부르는가"** 를 이해하는 일이었습니다. 경로 작동 함수를 제가 직접 부르지 않는다는 걸 알고 나서 구조가 한 번에 보였습니다.
- 파이썬에서는 "메모"에 불과했던 **타입 힌트가 FastAPI에서는 실제로 동작하는 코드**가 됩니다. 앞 글에서 `input()`으로 받은 값을 `int()`로 직접 바꾸고 검사하던 일을 FastAPI는 타입 하나로 대신합니다.
- 422 응답의 `loc` 값만 봐도 **어떤 위치(`path`, `query`, `body`)의 어느 값이 틀렸는지** 바로 알 수 있어서, 오류를 추적하기 쉬웠습니다.

다음 글에서는 공식 문서의 다음 주제인 **의존성 주입(`Depends`)** 과, 여러 파일로 API를 나누는 **`APIRouter`** 를 다뤄 보겠습니다.
:::
