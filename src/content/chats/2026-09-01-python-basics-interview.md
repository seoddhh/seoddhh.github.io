---
title: 파이썬이 뭐고 어떻게 공부하는거야?
date: 2026-09-01
tags: [python]
draft: false
---

:::user
파이썬이 뭐고 어떻게 공부하는거야?
:::

:::assistant
**설치부터 클래스까지, 파이썬으로 간단한 프로그램을 직접 만들 수 있는 정도**까지 다룹니다. 전체 흐름은 이렇습니다.

| 장 | 배우는 것 | 한 줄 요약 |
|---|---|---|
| **1. 시작하기** | 설치, 실행, 기본 용어 | 코드를 쓰고 실행하는 방법 |
| **2. 자료형** | 문자열, 숫자, 변수, 입력 | 프로그램이 다루는 값의 종류 |
| **3. 조건문** | 불, `if` / `elif` / `else` | 상황에 따라 다르게 동작하기 |
| **4. 반복문** | 리스트, 딕셔너리, `for`, `while` | 같은 일을 여러 번 하기 |
| **5. 함수** | `def`, 매개변수, 재귀, 튜플, 람다 | 코드에 이름 붙여 재사용하기 |
| **6. 예외 처리** | `try` / `except` / `finally` | 오류가 나도 멈추지 않게 하기 |
| **7. 모듈** | 표준 모듈, 외부 모듈, 모듈 만들기 | 남이 만든 코드 가져다 쓰기 |
| **8. 클래스** | 객체, 생성자, 메소드, 상속 | 데이터와 동작을 하나로 묶기 |

- **실습 환경**: Python 3.14, macOS / Windows, VS Code. 예제는 파이썬 3 버전이면 똑같이 동작합니다.
- **참고한 책**: 『혼자 공부하는 파이썬』(윤인성, 한빛미디어)의 목차를 따라가면서, 제가 이해한 방식으로 다시 정리했습니다.

앞 장의 내용이 뒤 장의 재료가 됩니다. 변수를 알아야 조건문을 쓸 수 있고, 반복문을 알아야 함수를 쓸모 있게 만들 수 있습니다.
:::

:::user
프로그램이랑 프로그래밍 언어는 정확히 뭐야?
:::

:::assistant
**프로그램**은 컴퓨터에게 시킬 일을 순서대로 적어 둔 **작업 지시서**입니다. 계산기 앱, 게임, 웹 브라우저가 모두 프로그램입니다.

그런데 컴퓨터는 0과 1로 된 **기계어**만 알아듣습니다. 사람이 기계어로 직접 쓰기는 너무 어렵기 때문에, 사람이 읽고 쓸 수 있는 형태로 적은 뒤 기계어로 번역합니다. 이렇게 사람과 컴퓨터 사이에서 쓰는 말이 **프로그래밍 언어**입니다.

```text
사람이 쓴 코드  →  번역  →  기계어  →  컴퓨터가 실행
```

**파이썬**은 이 프로그래밍 언어 중 하나입니다. 1991년 귀도 반 로섬이 만들었고, 지금은 입문 교육부터 웹, 데이터 분석, 인공지능까지 폭넓게 쓰입니다.
:::

:::user
왜 다들 파이썬으로 시작하라고 해?
:::

:::assistant
같은 일을 하는 코드를 비교해 보면 바로 보입니다. 화면에 "Hello"를 출력하는 코드입니다.

```java
// Java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
```

```python
# Python
print("Hello")
```

파이썬이 인기 있는 이유는 세 가지로 정리할 수 있습니다.

1. **문법이 쉽습니다.** 영어 문장처럼 읽히고, 꼭 필요한 것만 쓰면 됩니다.
2. **바로 실행해 볼 수 있습니다.** 한 줄 쓰고 바로 결과를 확인할 수 있어서 배우는 속도가 빠릅니다.
3. **쓸 수 있는 곳이 많습니다.** 이미 만들어진 도구(라이브러리)가 많아서 웹, 데이터, AI 어디든 바로 써먹을 수 있습니다.

> **핵심 정리**: 프로그램은 작업 지시서, 프로그래밍 언어는 그 지시서를 쓰는 말, 파이썬은 그중 가장 읽고 쓰기 쉬운 언어입니다.
:::

:::user
파이썬은 어떻게 설치하고 실행해?
:::

:::assistant
**1. 설치하기**

[python.org](https://www.python.org/downloads/)에서 최신 버전을 내려받아 설치합니다. **Windows에서는 설치 첫 화면의 `Add python.exe to PATH`를 꼭 체크하세요.** 이걸 빼먹으면 터미널에서 `python`을 입력해도 "명령을 찾을 수 없다"고 나옵니다.

설치가 끝나면 터미널(Windows는 PowerShell, macOS는 터미널)에서 확인합니다.

```bash
python --version     # Windows
python3 --version    # macOS
```

**2. 인터랙티브 셸로 실행하기**

터미널에 `python`(macOS는 `python3`)을 입력하면 `>>>` 프롬프트가 나옵니다. 여기에 코드를 한 줄 쓰면 바로 결과가 나옵니다. 계산기처럼 간단히 확인할 때 좋습니다.

```python
>>> 10 + 20
30
>>> print("안녕하세요")
안녕하세요
```

나갈 때는 `exit()`를 입력합니다.

**3. 에디터로 파일 만들어 실행하기**

코드가 길어지면 `.py` 파일로 저장해서 실행합니다.

| 에디터 | 특징 |
|---|---|
| **IDLE** | 파이썬을 설치하면 같이 설치됨. `F5`로 바로 실행. 처음 연습할 때 편함 |
| **VS Code** | 가장 많이 쓰는 무료 에디터. Python 확장을 설치하면 자동 완성, 오류 표시, 디버깅까지 지원 |

VS Code에서 `hello.py`를 만들고 터미널에서 실행합니다.

```bash
python hello.py      # Windows (PowerShell)
python3 hello.py     # macOS
```
:::

:::user
처음 하는 사람들이 자주 하는 실수가 있어?
:::

:::assistant
거의 모두가 한 번씩 겪는 실수들입니다.

| 증상 | 원인 | 해결 |
|---|---|---|
| `>>>`에서 `python hello.py`를 입력했더니 `SyntaxError` | 파이썬 셸 안에서 터미널 명령을 입력함 | `exit()`로 나온 뒤 터미널에서 실행 |
| `SyntaxError: invalid character` | 한글 입력 상태에서 따옴표나 괄호를 입력함(`“ ”`, `（ ）`) | 영문 입력 상태에서 다시 입력 |
| `IndentationError` | 들여쓰기 칸 수가 서로 다름 | 스페이스 4칸으로 통일 |
| `NameError: name 'pirnt' is not defined` | 오타 | 오류 메시지의 이름을 그대로 확인 |
| `SyntaxError: '(' was never closed` | 괄호나 따옴표를 닫지 않음 | 여는 것과 닫는 것의 짝 확인 |

오류가 나면 **메시지의 마지막 줄**을 먼저 읽으세요. 오류 종류와 이유가 거기 있고, 바로 위에 몇 번째 줄에서 났는지가 적혀 있습니다.
:::

:::user
코드를 읽다 보면 표현식, 키워드, 식별자 같은 말이 나오는데 다 뭐야?
:::

:::assistant
파이썬 코드를 읽을 때 계속 나오는 용어들입니다. 아래 코드 하나로 전부 설명할 수 있습니다.

```python
# 원의 넓이를 구합니다
radius = 5
area = 3.14 * radius ** 2
if area > 50:
    print("넓이:", area)
```

| 용어 | 뜻 | 위 코드에서 |
|---|---|---|
| **표현식** | 계산하면 **값이 나오는** 코드 | `3.14 * radius ** 2`, `area > 50` |
| **문장** | 실행할 수 있는 코드 **한 단위**. 보통 한 줄 | `radius = 5`, `if ...:` 블록 전체 |
| **키워드** | 파이썬이 이미 쓰고 있는 **특별한 단어**. 이름으로 쓸 수 없음 | `if` (그 외 `for`, `def`, `True`, `None` 등) |
| **식별자** | 내가 붙이는 **이름** | `radius`, `area` |
| **주석** | `#` 뒤의 설명. 실행되지 않음 | `# 원의 넓이를 구합니다` |
| **연산자와 자료** | 계산 기호와 계산 대상 | `*`, `**`, `>` / `3.14`, `5`, `50` |

식별자는 이런 규칙을 따릅니다.

- 영문자, 숫자, `_`만 쓰고 **숫자로 시작할 수 없습니다.** (`1st` ✗, `first` ✓)
- 키워드는 쓸 수 없습니다. (`if` ✗)
- 변수와 함수는 `user_name`처럼 소문자와 `_`로(스네이크 케이스), 클래스는 `UserName`처럼 단어 첫 글자를 대문자로(캐멀 케이스) 씁니다.

**출력은 `print()`** 로 합니다. 쉼표로 여러 값을 넘기면 공백으로 이어서 출력합니다.

```python
print("이름:", "홍길동", "나이:", 20)   # 이름: 홍길동 나이: 20
print()                               # 빈 줄
```
:::

:::user
자료형이 뭐야? 문자열은 어떻게 다뤄?
:::

:::assistant
**자료형**은 값의 종류입니다. 종류에 따라 할 수 있는 일이 다르기 때문에 구분합니다. 기본 자료형은 세 가지입니다.

| 자료형 | 뜻 | 예 |
|---|---|---|
| `str` (문자열) | 글자 | `"안녕"`, `'Python'` |
| `int`, `float` (숫자) | 정수, 실수 | `10`, `3.14` |
| `bool` (불) | 참, 거짓 | `True`, `False` |

`type()`으로 자료형을 확인할 수 있습니다.

```python
type("안녕")   # <class 'str'>
type(10)       # <class 'int'>
```

**문자열 만들기**

큰따옴표나 작은따옴표로 감쌉니다. 따옴표 안에 따옴표를 넣거나 줄을 바꾸려면 `\`(이스케이프 문자)를 씁니다.

```python
print("안녕하세요")
print('그는 "안녕"이라고 말했다')     # 다른 종류의 따옴표로 감싸기
print("첫 줄\n둘째 줄")              # \n: 줄바꿈, \t: 탭
print("""여러 줄을
그대로 쓸 수 있습니다""")             # 따옴표 세 개
```

**문자열 연산자**

```python
"안녕" + "하세요"     # '안녕하세요'  연결
"하" * 3             # '하하하'      반복

text = "Python"
text[0]              # 'P'   인덱싱: 0부터 셉니다
text[-1]             # 'n'   음수는 뒤에서부터
text[0:2]            # 'Py'  슬라이싱: 끝 번호는 포함하지 않습니다
text[2:]             # 'thon'
len(text)            # 6     길이
```

`text[10]`처럼 없는 위치에 접근하면 `IndexError`가 납니다. 인덱스가 0부터 시작한다는 것만 기억하면 대부분 피할 수 있습니다.
:::

:::user
숫자 계산은 어떻게 해?
:::

:::assistant
숫자는 소수점이 없는 **정수(`int`)** 와 소수점이 있는 **실수(`float`)** 로 나뉩니다. `10`은 정수, `10.0`은 실수입니다.

| 연산자 | 뜻 | 예 | 결과 |
|---|---|---|---|
| `+` `-` `*` | 더하기, 빼기, 곱하기 | `7 * 2` | `14` |
| `/` | 나누기 (결과는 항상 실수) | `7 / 2` | `3.5` |
| `//` | 몫 | `7 // 2` | `3` |
| `%` | 나머지 | `7 % 2` | `1` |
| `**` | 제곱 | `2 ** 10` | `1024` |

**연산자 우선순위**는 수학과 같습니다. 곱하기·나누기가 더하기·빼기보다 먼저고, 헷갈리면 괄호를 씁니다.

```python
2 + 3 * 4      # 14
(2 + 3) * 4    # 20
```

문자열 연산자도 같은 규칙을 따릅니다. `*`가 `+`보다 먼저 계산됩니다.

```python
"안녕" + "!" * 3    # '안녕!!!'   ("안녕!" * 3이 아님)
```

하나 알아 두면 좋은 점: 실수는 컴퓨터 안에서 2진수로 저장되기 때문에 아주 작은 오차가 생깁니다.

```python
0.1 + 0.2    # 0.30000000000000004
```

버그가 아니라 모든 언어에서 같은 현상입니다. 돈 계산처럼 정확해야 할 때는 `round()`나 `decimal` 모듈을 씁니다.
:::

:::user
변수는 뭐고, 사용자한테 값을 입력받으려면 어떻게 해?
:::

:::assistant
**변수는 값에 붙이는 이름표**입니다. `=`는 "같다"가 아니라 **오른쪽 값을 왼쪽 이름에 넣는다**는 뜻입니다.

```python
pi = 3.14
radius = 10
print(pi * radius * 2)   # 62.800000000000004

count = 0
count = count + 1        # count에 1을 더해서 다시 count에 넣음
count += 1               # 위와 같은 뜻 (복합 대입 연산자: += -= *= /=)
```

**사용자 입력: `input()`**

`input()`은 사용자가 입력할 때까지 기다렸다가 입력한 값을 돌려줍니다. 중요한 점은 **숫자를 입력해도 항상 문자열로 돌려준다**는 것입니다.

```python
age = input("나이를 입력하세요> ")   # 20 입력
print(age + 1)                      # TypeError: 문자열에 숫자를 더할 수 없음
```

그래서 숫자로 계산하려면 바꿔 줘야 합니다.

| 함수 | 하는 일 | 예 |
|---|---|---|
| `int()` | 문자열 → 정수 | `int("20")` → `20` |
| `float()` | 문자열 → 실수 | `float("3.5")` → `3.5` |
| `str()` | 숫자 → 문자열 | `str(20)` → `"20"` |

`int("안녕")`이나 `int("3.5")`처럼 바꿀 수 없는 값을 넣으면 `ValueError`가 납니다.

**예제: 인치를 센티미터로 바꾸기**

```python
raw = input("인치 단위의 숫자를 입력하세요> ")
inch = float(raw)
cm = inch * 2.54
print(inch, "inch는", cm, "cm입니다")
```

코드가 한 줄씩 어떻게 실행되는지 눈으로 보고 싶다면 [Python Tutor](https://pythontutor.com/)에 코드를 붙여 넣어 보세요. 변수에 값이 들어가는 과정을 그림으로 보여 줍니다.
:::

:::user
문자열로 할 수 있는 게 더 있어?
:::

:::assistant
자주 쓰는 기능만 모았습니다. 문자열 뒤에 `.`을 찍고 함수를 부릅니다.

**값을 문자열 안에 끼워 넣기: `format()`과 f-문자열**

```python
name, score = "철수", 92.456

"{}님의 점수는 {}점".format(name, score)   # 철수님의 점수는 92.456점
f"{name}님의 점수는 {score}점"              # 위와 같음 (f-문자열)

f"{score:.1f}"      # '92.5'        소수점 아래 한 자리
f"{1234567:,}"      # '1,234,567'   천 단위 쉼표
f"{52:05d}"         # '00052'       다섯 자리로 채우기
```

f-문자열이 더 짧고 읽기 쉬워서 보통은 f-문자열을 씁니다. `format()`이 나은 경우는 **틀을 먼저 만들어 두고 값은 나중에 채울 때**입니다. f-문자열은 쓰는 순간 값이 들어가야 하지만, `format()`은 틀만 따로 보관할 수 있습니다.

```python
template = "{name}님, 주문하신 {item}의 배송이 시작되었습니다."
order = {"name": "영희", "item": "키보드"}
template.format(**order)
```

**그 밖에 자주 쓰는 기능**

```python
"Hello".upper()           # 'HELLO'   대문자로
"Hello".lower()           # 'hello'   소문자로
"  hi  ".strip()          # 'hi'      양옆 공백 제거 (lstrip, rstrip은 한쪽만)

"123".isdigit()           # True      숫자로만 되어 있는가
"abc".isalpha()           # True      글자로만 되어 있는가

"안녕안녕하세요".find("안녕")    # 0    처음 나오는 위치 (없으면 -1)
"안녕안녕하세요".rfind("안녕")   # 2    마지막으로 나오는 위치

"안녕" in "안녕하세요"     # True      포함되어 있는가

"10 20 30".split(" ")     # ['10', '20', '30']   기준 문자로 자르기
```

`isdigit()`은 `input()`으로 받은 값을 `int()`로 바꾸기 전에 숫자인지 확인할 때 유용합니다.
:::

:::user
조건문은 어떻게 써?
:::

:::assistant
조건문은 **불(`bool`)** 값을 보고 실행할지 말지 정합니다. 불은 `True`와 `False` 두 값뿐이고, 주로 비교해서 만듭니다.

| 비교 연산자 | 뜻 |
|---|---|
| `==` / `!=` | 같다 / 다르다 |
| `<` `>` `<=` `>=` | 작다, 크다, 작거나 같다, 크거나 같다 |

`=`는 값을 넣는 것이고, 같은지 비교하는 건 `==`입니다. 처음에 가장 많이 헷갈리는 부분입니다.

여러 조건은 **논리 연산자**로 묶습니다.

| 연산자 | 뜻 | 예 |
|---|---|---|
| `and` | 둘 다 참이면 참 | `age >= 13 and age < 20` |
| `or` | 하나라도 참이면 참 | `day == "토" or day == "일"` |
| `not` | 참과 거짓을 뒤집음 | `not is_member` |

`age >= 13 and age < 20`은 `13 <= age < 20`처럼 수학식으로 써도 됩니다.

**if 조건문**

`if` 뒤에 조건을 쓰고, 콜론(`:`) 뒤에 **들여쓰기한 줄만** 조건이 참일 때 실행됩니다. 파이썬은 중괄호 대신 들여쓰기로 범위를 나눕니다.

```python
from datetime import datetime

now = datetime.now()
if now.hour < 12:
    print("오전입니다")
if now.hour >= 12:
    print("오후입니다")
```

**예제: 짝수와 홀수 구분하기**

2로 나눈 나머지가 0이면 짝수입니다.

```python
number = int(input("정수를 입력하세요> "))
if number % 2 == 0:
    print("짝수입니다")
if number % 2 == 1:
    print("홀수입니다")
```
:::

:::user
위 예제처럼 if를 두 번 쓰는 건 좀 비효율적이지 않아?
:::

:::assistant
맞습니다. 짝수가 아니면 무조건 홀수인데 조건을 두 번 검사하고 있습니다. 이럴 때 `else`를 씁니다.

```python
if number % 2 == 0:
    print("짝수입니다")
else:
    print("홀수입니다")
```

경우가 세 개 이상이면 `elif`로 이어 붙입니다. **위에서부터 검사해서 처음 참인 곳 하나만 실행**합니다.

```python
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:     # 여기 왔다면 이미 90 미만이므로 "score < 90"을 또 쓸 필요가 없음
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
```

앞 조건에서 걸러진 내용을 뒤 조건에 다시 쓰지 않는 것이 `elif`를 효율적으로 쓰는 방법입니다.

**False로 취급되는 값**

`if` 뒤에는 불이 아닌 값도 올 수 있습니다. 이때 **"비어 있는" 값은 `False`** 로 취급되고, 나머지는 전부 `True`입니다.

| False로 취급되는 값 |
|---|
| `0`, `0.0`, `""`(빈 문자열), `[]`(빈 리스트), `{}`(빈 딕셔너리), `None` |

```python
name = input("이름> ")
if name:
    print(f"{name}님 안녕하세요")
else:
    print("이름을 입력하지 않았습니다")
```

**나중에 채울 자리: `pass`와 `raise NotImplementedError`**

`if` 블록은 비워 둘 수 없습니다. 아직 내용을 정하지 못했다면 `pass`로 자리만 잡아 둡니다.

```python
if score >= 90:
    pass    # TODO: 나중에 구현
```

다만 `pass`는 조용히 넘어가서 구현을 잊어버리기 쉽습니다. 실행됐을 때 확실히 알아채고 싶다면 `raise NotImplementedError`를 씁니다. 그 줄에 도착하면 오류를 내서 "아직 안 만들었다"고 알려 줍니다.
:::

:::user
값을 여러 개 한꺼번에 다루려면 어떻게 해? 리스트가 그거야?
:::

:::assistant
네. **리스트는 여러 값을 순서대로 담는 상자**입니다. 대괄호로 만들고, 문자열처럼 인덱스로 꺼냅니다.

```python
fruits = ["사과", "바나나", "포도"]
fruits[0]          # '사과'
fruits[-1]         # '포도'
fruits[1] = "딸기"  # 문자열과 달리 요소를 바꿀 수 있음

[1, 2] + [3, 4]    # [1, 2, 3, 4]   연결
[0] * 3            # [0, 0, 0]      반복
len(fruits)        # 3              길이

matrix = [[1, 2], [3, 4]]   # 리스트 안의 리스트
matrix[1][0]                # 3
```

**요소 추가와 제거**

| 코드 | 하는 일 |
|---|---|
| `fruits.append("귤")` | 맨 뒤에 추가 |
| `fruits.insert(0, "귤")` | 0번 위치에 추가 |
| `del fruits[0]` / `fruits.pop(0)` | 위치로 제거 (`pop`은 제거한 값을 돌려줌) |
| `fruits.remove("귤")` | 값으로 제거 (처음 하나만) |
| `fruits.clear()` | 전부 제거 |
| `"귤" in fruits` | 들어 있는지 확인 (`not in`은 반대) |

**for 반복문**

리스트의 요소를 **하나씩 꺼내서** 같은 일을 반복합니다.

```python
for fruit in fruits:
    print(fruit, "맛있다")
```

**예제: 중첩 리스트와 중첩 반복문**

리스트 안에 리스트가 있으면 반복문도 두 겹으로 씁니다.

```python
numbers = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]
for row in numbers:
    for n in row:
        print(n, end=" ")   # end=" ": 줄바꿈 대신 공백
    print()
```

**전개 연산자 `*`**

리스트 앞에 `*`를 붙이면 요소를 풀어서 넣습니다.

```python
a = [1, 2, 3]
b = [*a, 4, 5]    # [1, 2, 3, 4, 5]
print(*a)         # 1 2 3   (print(1, 2, 3)과 같음)
```
:::

:::user
딕셔너리는 리스트랑 뭐가 달라?
:::

:::assistant
리스트는 **순서(0, 1, 2...)** 로 값을 찾고, 딕셔너리는 **이름(키)** 으로 값을 찾습니다. 중괄호 안에 `키: 값`을 씁니다.

```python
student = {
    "name": "철수",
    "age": 17,
    "hobbies": ["축구", "게임"],
}

student["name"]           # '철수'
student["age"] = 18       # 값 바꾸기
student["grade"] = 2      # 없는 키에 넣으면 새로 추가
del student["hobbies"]    # 제거
```

없는 키를 꺼내면 `KeyError`가 납니다. 키가 있는지 확실하지 않다면 두 가지 방법이 있습니다.

```python
if "email" in student:            # 1. in으로 먼저 확인
    print(student["email"])

email = student.get("email")      # 2. get(): 키가 없으면 None을 돌려줌
```

`for`로 딕셔너리를 돌리면 **키**가 하나씩 나옵니다.

```python
for key in student:
    print(key, ":", student[key])
```

> 이름표가 붙은 정보(학생 한 명, 상품 하나)는 딕셔너리, 같은 종류가 여러 개 나열된 것(학생 목록)은 리스트가 어울립니다. 실제로는 "딕셔너리가 담긴 리스트"를 가장 많이 씁니다.
:::

:::user
"1부터 100까지 반복"처럼 숫자로 반복하려면? while은 언제 써?
:::

:::assistant
**범위(`range`)** 를 씁니다. 숫자 목록을 실제로 만들지 않고 "어디부터 어디까지"라는 정보만 가지고 있어서 가볍습니다.

| 코드 | 만들어지는 숫자 |
|---|---|
| `range(5)` | 0, 1, 2, 3, 4 |
| `range(1, 6)` | 1, 2, 3, 4, 5 (끝 숫자는 포함하지 않음) |
| `range(0, 10, 2)` | 0, 2, 4, 6, 8 (2씩 증가) |
| `range(4, -1, -1)` | 4, 3, 2, 1, 0 (거꾸로) |

```python
total = 0
for i in range(1, 101):
    total += i
print(total)   # 5050

fruits = ["사과", "바나나", "포도"]
for i in range(len(fruits)):      # 몇 번째인지도 필요할 때
    print(i, fruits[i])
```

**예제: 피라미드 만들기**

```python
for i in range(1, 5):
    print(" " * (4 - i) + "*" * (2 * i - 1))
```

```text
   *
  ***
 *****
*******
```

**while 반복문**

`for`는 **정해진 횟수나 목록**만큼 반복하고, `while`은 **조건이 참인 동안** 계속 반복합니다. 몇 번 반복할지 미리 모를 때 씁니다.

```python
# 상태를 기준으로: 리스트에서 2를 전부 지울 때까지
numbers = [1, 2, 1, 2]
while 2 in numbers:
    numbers.remove(2)

# 시간을 기준으로: 5초 동안
import time
end = time.time() + 5
count = 0
while time.time() < end:
    count += 1
print(f"5초 동안 {count}번 반복했습니다")
```

조건이 계속 참이면 영원히 반복하니(무한 반복), 조건이 언젠가 거짓이 되는지 꼭 확인하세요. 멈추지 않으면 `Ctrl + C`로 강제 종료합니다.

**break와 continue**

```python
while True:
    text = input("종료하려면 q> ")
    if text == "q":
        break          # 반복문을 완전히 빠져나감
    if text == "":
        continue       # 아래는 건너뛰고 다음 반복으로
    print("입력:", text)
```
:::

:::user
반복문이랑 같이 쓰면 편한 함수가 있어?
:::

:::assistant
직접 반복문을 쓰기 전에 이미 있는 함수로 되는지 먼저 보세요.

```python
scores = [80, 95, 70]
min(scores), max(scores), sum(scores)    # (70, 95, 245)

for s in reversed(scores):       # 뒤집어서 반복
    print(s)

for i, s in enumerate(scores):   # 몇 번째인지 + 값을 같이
    print(f"{i}번: {s}점")

prices = {"사과": 1000, "배": 2000}
for name, price in prices.items():   # 딕셔너리의 키와 값을 같이
    print(name, price)
```

**리스트 내포(list comprehension)**

"반복하면서 새 리스트를 만드는" 코드를 한 줄로 줄입니다.

```python
# 반복문으로
squares = []
for i in range(10):
    if i % 2 == 0:
        squares.append(i * i)

# 리스트 내포로
squares = [i * i for i in range(10) if i % 2 == 0]   # [0, 4, 16, 36, 64]
```

`[만들 값 for 변수 in 반복할 것 if 조건]` 순서로 읽으면 됩니다.

**여러 줄 문자열을 들여쓰기 안에서 쓸 때의 문제**

`if`나 함수 안에서 `"""`를 쓰면 **코드의 들여쓰기 공백까지 문자열에 들어갑니다.** 괄호로 문자열을 이어 붙이면 이 문제를 피할 수 있습니다.

```python
if True:
    message = (
        "첫 번째 줄입니다.\n"
        "두 번째 줄입니다."
    )
```

**한 번 쓰면 끝나는 값: 이터레이터**

`reversed()`의 결과를 변수에 담아 두 번 반복해 보면 이상한 일이 생깁니다.

```python
r = reversed([1, 2, 3])
print(list(r))   # [3, 2, 1]
print(list(r))   # []  ← 두 번째는 비어 있음
```

`reversed()`는 리스트를 새로 만드는 게 아니라, **다음 값을 하나씩 꺼내 주는 이터레이터**를 돌려주기 때문입니다. 이터레이터는 `next()`로 값을 하나씩 꺼내고, 끝까지 꺼내면 다시 쓸 수 없습니다. 메모리를 아끼는 대신 한 번만 쓸 수 있는 셈입니다. 여러 번 쓸 거라면 `list()`로 바꿔서 저장해 두세요.
:::

:::user
같은 코드를 여러 번 쓰게 되는데, 함수는 어떻게 만들어?
:::

:::assistant
**함수는 코드 묶음에 이름을 붙인 것**입니다. `def`로 만들고, 필요할 때 이름으로 부릅니다.

```python
def greet(name):          # name: 매개변수 (함수가 받는 값)
    return f"안녕, {name}"  # return: 함수의 결과를 돌려줌

message = greet("철수")    # "철수": 인수 (함수에 넘기는 값)
```

`return`을 만나면 함수는 **그 자리에서 끝납니다.** `return`이 없으면 `None`을 돌려줍니다.

**매개변수의 여러 형태**

```python
# 기본 매개변수: 값을 안 넘기면 기본값 사용
def power(base, exp=2):
    return base ** exp

power(3)       # 9
power(3, 3)    # 27

# 키워드 매개변수: 이름을 붙여서 순서와 상관없이 넘김
power(exp=3, base=2)   # 8

# 가변 매개변수: 개수를 정하지 않고 받음 (튜플로 들어옴)
def total(*numbers):
    return sum(numbers)

total(1, 2, 3, 4)   # 10
```

매개변수는 **일반 → 가변(`*`) → 기본값** 순서로 씁니다. 가변 매개변수 뒤에 있는 매개변수는 키워드로만 넘길 수 있습니다.

```python
def print_n(*values, n=1):
    for _ in range(n):
        print(*values)

print_n("안녕", "파이썬", n=2)
```
:::

:::user
함수 안에서 자기 자신을 부를 수도 있어?
:::

:::assistant
네, **재귀 함수**라고 합니다. 큰 문제를 **같은 모양의 작은 문제**로 쪼갤 수 있을 때 씁니다. 팩토리얼(5! = 5 × 4!)이 대표적입니다.

```python
def factorial(n):
    if n <= 1:        # 멈추는 조건이 반드시 있어야 함
        return 1
    return n * factorial(n - 1)

factorial(5)   # 120
```

**재귀 함수의 문제**

1. **멈추는 조건이 없으면** 끝없이 자신을 부르다가 `RecursionError`가 납니다. 파이썬은 기본적으로 약 1000번까지만 허용합니다.
2. **같은 계산을 반복**할 수 있습니다. 피보나치 수열을 그대로 재귀로 짜면 `fib(3)`을 여러 번, `fib(2)`는 더 많이 다시 계산합니다. n이 조금만 커져도 엄청나게 느려집니다.

이미 계산한 값을 딕셔너리에 저장해 두고 다시 쓰면(메모이제이션) 해결됩니다.

```python
memo = {1: 1, 2: 1}

def fib(n):
    if n in memo:
        return memo[n]
    memo[n] = fib(n - 1) + fib(n - 2)
    return memo[n]

fib(100)   # 354224848179261915075 (바로 나옴)
```

**조기 리턴**

조건이 맞으면 **먼저 `return`하고 끝내는** 방식입니다. `if`-`else`가 깊어지지 않아서 읽기 편해집니다. 위의 `fib`도 조기 리턴을 쓴 코드입니다.

**예제: 리스트 평탄화하기**

`[1, [2, [3, 4]], 5]`처럼 겹겹이 들어간 리스트를 `[1, 2, 3, 4, 5]`로 펼칩니다. 안쪽 리스트도 "리스트를 펼치는" 같은 문제라서 재귀가 잘 맞습니다.

```python
def flatten(data):
    output = []
    for item in data:
        if type(item) == list:
            output += flatten(item)   # 리스트면 한 번 더 펼치기
        else:
            output.append(item)
    return output

flatten([1, [2, [3, 4]], 5])   # [1, 2, 3, 4, 5]
```

**함수를 쓰는 이유: 이름 붙이기와 유지보수**

함수는 반복을 줄이는 것만이 목적이 아닙니다. `calc_discount(price)`처럼 **코드에 이름을 붙이면 주석이 없어도 무슨 일을 하는지 읽힙니다.** 또 같은 로직을 한 곳에 모아 두면, 나중에 고칠 때 한 곳만 고치면 됩니다.
:::

:::user
함수 고급에는 뭐가 있어?
:::

:::assistant
**튜플: 바꿀 수 없는 리스트**

소괄호로 만들고, 만든 뒤에는 요소를 바꿀 수 없습니다. 괄호를 생략할 수 있어서, 함수에서 여러 값을 돌려주거나 두 변수를 맞바꿀 때 자연스럽게 쓰입니다.

```python
point = (10, 20)
x, y = point          # 풀어서 담기

a, b = 1, 2
a, b = b, a           # 값 맞바꾸기

def min_max(numbers):
    return min(numbers), max(numbers)   # 튜플로 돌려줌

low, high = min_max([3, 1, 4])
```

**람다: 한 줄짜리 이름 없는 함수**

함수를 다른 함수에 넘길 때, 따로 `def`를 만들기 번거로우면 씁니다.

```python
numbers = [1, 2, 3, 4, 5]
list(map(lambda x: x * 2, numbers))         # [2, 4, 6, 8, 10]  전부 변환
list(filter(lambda x: x % 2 == 0, numbers)) # [2, 4]            조건에 맞는 것만

# key: 무엇을 기준으로 정렬할지 알려 주기
students = [{"name": "철수", "score": 80}, {"name": "영희", "score": 95}]
sorted(students, key=lambda s: s["score"], reverse=True)   # 점수 높은 순
```

**파일 처리**

`open()`으로 열고, 다 쓰면 닫아야 합니다. `with`를 쓰면 블록이 끝날 때 자동으로 닫아 줍니다.

```python
with open("memo.txt", "w", encoding="utf-8") as f:   # w: 새로 쓰기, a: 이어 쓰기
    f.write("안녕하세요\n")

with open("memo.txt", "r", encoding="utf-8") as f:   # r: 읽기
    for line in f:             # 한 줄씩 읽기
        print(line.strip())
```

**제너레이터: 필요할 때 하나씩 만드는 함수**

함수 안에 `return` 대신 `yield`를 쓰면, 호출해도 바로 실행되지 않고 **이터레이터**가 만들어집니다. 값을 요청할 때마다 `yield`까지만 실행하고 멈춥니다.

```python
def count_up(n):
    for i in range(1, n + 1):
        print(f"{i} 만드는 중")
        yield i

gen = count_up(3)   # 아직 아무것도 출력되지 않음
next(gen)           # "1 만드는 중" → 1
next(gen)           # "2 만드는 중" → 2
```

값을 한꺼번에 만들어 두지 않으니 아주 큰 데이터를 다룰 때 메모리를 아낄 수 있습니다. 앞에서 본 이터레이터처럼 한 번만 쓸 수 있습니다.

**값 복사와 레퍼런스 복사**

숫자나 문자열을 함수에 넘기면 함수 안에서 바꿔도 밖에는 영향이 없습니다. 그런데 **리스트나 딕셔너리는 함수 안에서 바꾸면 원본도 바뀝니다.**

```python
def add_item(items):
    items.append("new")

my_list = ["a"]
add_item(my_list)
print(my_list)   # ['a', 'new']  ← 원본이 바뀜
```

리스트 같은 큰 값은 복사하지 않고 **"그 값이 어디 있는지(레퍼런스)"** 만 넘기기 때문입니다. 컴퓨터는 작은 값을 **스택**이라는 공간에, 리스트 같은 큰 값을 **힙**이라는 공간에 두고 스택에서는 위치만 가리키는데, 함수에 넘어가는 게 바로 이 위치입니다. 원본을 지키고 싶다면 `items.copy()`로 복사해서 넘기세요.
:::

:::user
프로그램이 오류로 멈추지 않게 하려면 어떻게 해?
:::

:::assistant
오류는 크게 두 종류입니다.

| | 구문 오류 (Syntax Error) | 예외 (Exception) |
|---|---|---|
| 언제 | **실행하기 전**에 발견 | **실행 중**에 발생 |
| 원인 | 문법이 틀림 (괄호 누락 등) | 문법은 맞지만 실행할 수 없음 (0으로 나누기, 없는 파일 열기 등) |
| 해결 | 코드를 고쳐야만 실행됨 | 코드를 고치거나 **예외 처리** |

예외를 처리하는 방법은 두 가지입니다. 먼저 조건문으로 미리 막을 수 있습니다.

```python
text = input("정수 입력> ")
if text.isdigit():
    print(int(text) * 2)
else:
    print("정수를 입력하세요")
```

하지만 미리 알 수 없는 상황이 많기 때문에 보통은 **`try`-`except`** 를 씁니다. `try` 안에서 예외가 나면 `except`로 넘어갑니다.

```python
try:
    number = int(input("정수 입력> "))
except:
    print("정수를 입력하지 않았습니다")
else:
    print("두 배:", number * 2)    # 예외가 없을 때만 실행
finally:
    print("프로그램 종료")           # 예외가 있든 없든 무조건 실행
```

| 블록 | 실행되는 때 |
|---|---|
| `try` | 먼저 실행 |
| `except` | `try`에서 예외가 났을 때 |
| `else` | `try`에서 예외가 없었을 때 |
| `finally` | 항상. 중간에 `return`이나 `break`가 있어도 실행 |

`finally`는 파일을 닫거나 연결을 끊는 것처럼 **무슨 일이 있어도 해야 하는 정리 작업**에 씁니다.
:::

:::user
위에서처럼 except만 쓰면 무슨 예외인지 모르잖아?
:::

:::assistant
맞습니다. 그래서 **예외 종류를 지정해서** 잡고, 필요하면 **예외 객체**를 받아서 내용을 확인합니다.

```python
numbers = [1, 2, 3]
try:
    index = int(input("몇 번째 값을 볼까요?> "))
    print(numbers[index])
except ValueError as e:        # 정수가 아닌 값을 입력했을 때
    print("정수를 입력하세요:", e)
except IndexError as e:        # 범위를 벗어났을 때
    print("0~2 사이로 입력하세요:", e)
except Exception as e:         # 위에서 못 잡은 나머지 전부
    print("알 수 없는 오류:", type(e).__name__, e)
```

`except`는 위에서부터 검사하므로, **구체적인 예외를 먼저, 모든 예외(`Exception`)는 마지막에** 씁니다.

**모든 예외를 잡을 때 조심할 점**

`except Exception`이나 `except:`로 전부 잡고 아무것도 하지 않으면, 오타 같은 **진짜 버그까지 조용히 숨겨집니다.** 프로그램은 안 멈추는데 결과가 이상하고, 원인은 찾기 어려워집니다. 모든 예외를 잡는다면 최소한 어떤 예외였는지 출력하거나 기록해 두세요.

**`raise`: 예외 직접 일으키기**

내 함수가 처리할 수 없는 값이 들어왔을 때 **일부러 예외를 일으켜서** 호출한 쪽에 알립니다.

```python
def set_age(age):
    if age < 0:
        raise ValueError("나이는 0 이상이어야 합니다")
    return age
```

오류를 숨기는 것보다, 문제가 생긴 그 자리에서 분명하게 알리는 편이 나중에 원인을 찾기 훨씬 쉽습니다.

파이썬 자체나 유명한 라이브러리의 코드를 GitHub에서 열어 보면 `raise`와 `except`가 실제로 어떻게 쓰이는지 볼 수 있습니다. 좋은 공부 자료입니다.
:::

:::user
모듈은 뭐야? 어떻게 가져다 써?
:::

:::assistant
**모듈은 다른 사람이 만들어 둔 코드 파일**입니다. `import`로 가져와서 씁니다. 파이썬을 설치하면 기본으로 들어 있는 모듈을 **표준 모듈**이라고 합니다.

```python
import math                      # 모듈 전체 가져오기
math.sqrt(16)                    # 4.0

from math import sqrt, pi        # 필요한 것만 가져오기
sqrt(16)                         # 앞에 math. 없이 사용

import datetime as dt            # 별명 붙이기
dt.datetime.now()
```

자주 쓰는 표준 모듈입니다.

| 모듈 | 하는 일 | 예 |
|---|---|---|
| `math` | 수학 계산 | `math.ceil(2.1)` → 3 (올림) |
| `random` | 무작위 값 | `random.randint(1, 6)`, `random.choice(list)` |
| `sys` | 파이썬 실행 환경 정보 | `sys.version`, `sys.argv` |
| `os` | 운영체제 기능 (파일, 폴더) | `os.listdir(".")`, `os.mkdir("new")` |
| `datetime` | 날짜와 시간 | `datetime.now().year` |
| `time` | 시간 측정, 멈추기 | `time.sleep(1)` (1초 기다림) |
| `urllib` | 인터넷에서 데이터 가져오기 | `urlopen("https://...").read()` |

어떤 함수가 있는지 모르겠다면 **공식 문서**(docs.python.org)를 찾아보는 습관을 들이는 게 좋습니다.

`operator.itemgetter()`도 알아 두면 편합니다. 앞에서 본 `key=lambda s: s["score"]`를 `key=itemgetter("score")`로 쓸 수 있습니다.
:::

:::user
표준 모듈에 없는 기능은 어떻게 해?
:::

:::assistant
다른 사람이 만들어 공개한 **외부 모듈**을 설치합니다. 터미널에서 `pip`를 씁니다.

```bash
pip install beautifulsoup4     # macOS는 pip3
```

어떤 모듈이 있는지는 [PyPI](https://pypi.org/)에서 검색하거나 "파이썬 ○○ 라이브러리"로 찾아보면 됩니다.

**대표적인 외부 모듈 두 가지**

```python
# Beautiful Soup: 웹 페이지(HTML)에서 원하는 정보 뽑아내기
from bs4 import BeautifulSoup
html = "<ul><li>사과</li><li>배</li></ul>"
soup = BeautifulSoup(html, "html.parser")
for li in soup.select("li"):
    print(li.text)
```

```python
# Flask: 간단한 웹 서버 만들기
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "<h1>Hello World</h1>"

# 터미널에서: flask --app 파일이름 run
```

**라이브러리와 프레임워크의 차이**

둘 다 남이 만든 코드지만 **누가 주도권을 쥐느냐**가 다릅니다.

| | 라이브러리 | 프레임워크 |
|---|---|---|
| 흐름 | **내 코드가** 필요할 때 라이브러리를 부름 | **프레임워크가** 정해진 때에 내 코드를 부름 |
| 예 | Beautiful Soup: 내가 `select()`를 호출 | Flask: 누군가 `/`에 접속하면 Flask가 `hello()`를 호출 |

**데코레이터**

Flask 코드의 `@app.route("/")`처럼 함수 위에 `@`로 붙이는 것을 **데코레이터**라고 합니다. 함수를 고치지 않고 **앞뒤에 기능을 덧붙이는** 방법입니다.

```python
def announce(func):
    def wrapper():
        print("--- 시작 ---")
        func()
        print("--- 끝 ---")
    return wrapper

@announce
def hello():
    print("안녕하세요")

hello()
# --- 시작 ---
# 안녕하세요
# --- 끝 ---
```
:::

:::user
모듈을 직접 만들 수도 있어?
:::

:::assistant
네. **`.py` 파일 하나가 곧 모듈**입니다. 같은 폴더에 파일을 만들고 파일 이름으로 `import`하면 됩니다.

```python
# calc.py
PI = 3.14

def circle_area(r):
    return PI * r * r

if __name__ == "__main__":     # 이 파일을 직접 실행할 때만 동작
    print(circle_area(10))
```

```python
# main.py
import calc
print(calc.circle_area(5))     # 78.5
```

`if __name__ == "__main__":`은 자주 보게 될 코드입니다. `python calc.py`로 **직접 실행하면** 아래 코드가 동작하고, 다른 파일에서 **`import`하면** 동작하지 않습니다. 모듈 안의 테스트 코드가 가져다 쓰는 쪽에서 실행되지 않게 막는 역할입니다.

**패키지**

모듈이 많아지면 폴더로 묶습니다. 모듈을 모아 둔 폴더를 **패키지**라고 합니다.

```text
my_app/
├── main.py
└── shapes/            ← 패키지
    ├── __init__.py    ← 패키지를 가져올 때 먼저 실행되는 파일 (비워 둬도 됨)
    ├── circle.py
    └── square.py
```

```python
from shapes import circle
from shapes.square import area
```

**텍스트 데이터와 바이너리 데이터**

파일은 크게 두 종류입니다. 메모장으로 열어서 읽을 수 있으면 **텍스트 데이터**(`.txt`, `.py`, `.csv`), 이미지나 음악처럼 사람이 읽을 수 없는 형태면 **바이너리 데이터**입니다. 바이너리 파일은 모드에 `b`를 붙여서 엽니다.

```python
with open("photo.png", "rb") as f:    # rb: 바이너리 읽기
    data = f.read()
with open("copy.png", "wb") as f:     # wb: 바이너리 쓰기
    f.write(data)
```

낯선 모듈을 이해하고 싶다면 **공식 문서의 예제부터 따라 해 보고**, 익숙해지면 **모듈 파일을 직접 열어 코드를 읽어 보세요.** 위에서 본 `if __name__ == "__main__":` 같은 패턴이 실제로 어떻게 쓰이는지 보입니다.
:::

:::user
마지막으로 클래스는 뭐야? 왜 필요해?
:::

:::assistant
학생 여러 명의 성적을 관리한다고 해 봅시다. 딕셔너리로 만들면 이렇게 됩니다.

```python
students = [
    {"name": "철수", "korean": 90, "math": 80},
    {"name": "영희", "korean": 95, "math": 100},
]

def get_average(student):
    return (student["korean"] + student["math"]) / 2
```

데이터(딕셔너리)와 그 데이터를 다루는 함수가 따로 떨어져 있습니다. 학생 데이터가 복잡해지면 어떤 함수가 어떤 데이터용인지 헷갈리기 시작합니다.

**클래스는 데이터와 그 데이터를 다루는 함수를 하나로 묶은 설계도**입니다. 설계도로 찍어 낸 실제 물건을 **객체**(또는 인스턴스)라고 합니다.

```python
class Student:
    def __init__(self, name, korean, math):   # 생성자: 객체를 만들 때 실행
        self.name = name                       # self: 지금 만들어지는 객체 자신
        self.korean = korean
        self.math = math

    def get_average(self):                     # 메소드: 클래스 안의 함수
        return (self.korean + self.math) / 2

chulsoo = Student("철수", 90, 80)   # 객체 만들기
chulsoo.name                        # '철수'
chulsoo.get_average()               # 85.0
```

| 용어 | 뜻 |
|---|---|
| **클래스** | 객체를 만드는 설계도 (`Student`) |
| **객체 / 인스턴스** | 설계도로 만든 실제 값 (`chulsoo`) |
| **생성자** | 객체를 만들 때 자동으로 실행되는 `__init__` |
| **속성** | 객체가 가진 데이터 (`self.name`) |
| **메소드** | 객체가 가진 함수 (`get_average`) |
| **self** | 메소드 안에서 "이 객체 자신"을 가리킴. 항상 첫 번째 매개변수 |

이제 학생의 데이터와 기능이 `chulsoo` 하나에 모여 있어서, `chulsoo.`만 쓰면 할 수 있는 일이 전부 보입니다.
:::

:::user
클래스로 더 할 수 있는 건?
:::

:::assistant
**어떤 클래스의 객체인지 확인하기**

```python
isinstance(chulsoo, Student)   # True
```

**특수한 이름의 메소드**

`__이름__` 형태의 메소드를 만들면 파이썬 기본 기능과 연결됩니다.

```python
class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def __str__(self):              # print()나 str()로 출력할 때
        return f"{self.name}({self.score}점)"

    def __lt__(self, other):        # < 로 비교할 때 (lt = less than)
        return self.score < other.score

a, b = Student("철수", 80), Student("영희", 95)
print(a)        # 철수(80점)
a < b           # True
max([a, b])     # 영희(95점)  ← 비교가 되니 max()도 동작
```

**클래스 변수와 클래스 메소드**

`self.`로 만든 변수는 객체마다 따로 갖지만, **클래스 변수는 모든 객체가 함께** 씁니다.

```python
class Student:
    count = 0                   # 클래스 변수

    def __init__(self, name):
        self.name = name
        Student.count += 1      # 학생이 만들어질 때마다 1 증가

    @classmethod
    def print_count(cls):       # 클래스 메소드: 객체 없이 클래스 이름으로 호출
        print(f"학생 수: {cls.count}")

Student("철수")
Student("영희")
Student.print_count()           # 학생 수: 2
```

**가비지 컬렉터**

더 이상 아무 변수도 가리키지 않는 객체는 파이썬이 알아서 메모리에서 지웁니다. 이 청소 담당을 **가비지 컬렉터**라고 합니다. 그래서 파이썬에서는 메모리를 직접 해제할 필요가 없습니다.

**프라이빗 변수와 게터/세터**

`chulsoo.score = -100`처럼 말도 안 되는 값을 밖에서 넣는 걸 막고 싶을 때 씁니다. 변수 이름 앞에 `__`를 붙이면 클래스 밖에서 직접 접근할 수 없고, `@property`로 읽고 쓰는 창구를 따로 만듭니다.

```python
class Student:
    def __init__(self, score):
        self.__score = score        # 밖에서 직접 접근 불가

    @property
    def score(self):                # 게터: 값 읽기
        return self.__score

    @score.setter
    def score(self, value):         # 세터: 값 쓰기 전에 검사
        if not 0 <= value <= 100:
            raise ValueError("점수는 0~100 사이여야 합니다")
        self.__score = value

s = Student(80)
s.score = 90      # OK
s.score = -100    # ValueError
```

**상속**

이미 있는 클래스를 **물려받아서** 필요한 부분만 추가하거나 바꿉니다. 같은 코드를 다시 쓰지 않아도 됩니다.

```python
class Person:
    def __init__(self, name):
        self.name = name

    def introduce(self):
        return f"저는 {self.name}입니다"

class Student(Person):              # Person을 물려받음
    def __init__(self, name, school):
        super().__init__(name)       # 부모의 생성자 실행
        self.school = school

    def introduce(self):             # 부모의 메소드를 바꿈 (오버라이드)
        return super().introduce() + f", {self.school}에 다닙니다"

Student("철수", "한빛고").introduce()   # '저는 철수입니다, 한빛고에 다닙니다'
```
:::

:::user
전체를 한 번에 정리하면?
:::

:::assistant
파이썬 기초는 결국 **"값을 담고(자료형·변수), 판단하고(조건문), 반복하고(반복문), 묶는(함수·모듈·클래스)"** 과정입니다.

| 장 | 꼭 기억할 것 |
|---|---|
| 1. 시작하기 | 오류가 나면 메시지의 **마지막 줄**부터 읽기 |
| 2. 자료형 | `input()`은 **항상 문자열**. 숫자로 쓰려면 `int()`로 변환 |
| 3. 조건문 | `=`는 넣기, `==`는 비교. 빈 값(`0`, `""`, `[]`, `None`)은 `False` |
| 4. 반복문 | 정해진 횟수는 `for`, 조건이 바뀔 때까지는 `while`. 이터레이터는 **한 번만** 쓸 수 있음 |
| 5. 함수 | 리스트·딕셔너리는 함수 안에서 바꾸면 **원본도 바뀜** |
| 6. 예외 처리 | 구체적인 예외만 잡기. 전부 잡고 무시하면 **버그가 숨음** |
| 7. 모듈 | 만들기 전에 표준 모듈과 `pip`에 이미 있는지 먼저 찾기 |
| 8. 클래스 | 데이터와 그 데이터를 다루는 함수를 **하나로 묶는** 설계도 |

정리하면서 제가 배운 점은 이렇습니다.

- 문법을 외우는 것보다 **오류 메시지를 읽는 연습**이 더 빨리 늘게 해 줍니다.
- `reversed()` 결과가 두 번째에 비어 있는 것처럼, **"왜 이렇게 동작하지?"** 싶은 순간이 개념(이터레이터, 레퍼런스)을 제대로 이해하는 기회였습니다.
- 예제를 눈으로 읽기만 하지 말고 **값을 바꿔 가며 직접 실행**해 봐야 내 것이 됩니다.

:::
