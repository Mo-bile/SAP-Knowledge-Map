# Knowledge Map Guidelines (SSOT)

이 문서는 `SAP-Knowledge-Map` 저장소의 모든 지식 맵(다이어그램 및 마크다운)을 작성·확장·리팩터링할 때 따르는 단일 기준(SSOT)입니다.

---

## 1. 핵심 구조 원칙: 트리(위치) + 관계 동사(연결)
- **전체 위치는 트리(Tree)로 표현한다.**
  - 최상위 계층 흐름은 `DB / DDIC ➔ ABAP / RAP 백엔드 ➔ Fiori / UI5 (또는 SAP GUI) 프론트엔드`를 기본 축으로 삼는다.
- **구체적인 연결은 관계 동사로 명시한다.**
  - 호출 관계, 의존 관계, 데이터 흐름은 성격이 다르므로 같은 화살표로 뭉뚱그리지 않는다.
  - 반드시 **`정의 · 참조 · 호출 · 조회 · 저장 · 검증 · 노출`** 등 명확한 동사를 화살표에 표기하여, 누가 정의·사용하고 변경 시 어디까지 영향이 가는지 추적 가능하게 유지한다.

---

## 2. 상위 루트 노드 및 계층 분리 기준

### 2-1. DDIC와 ABAP Program의 중심축
- 두 영역은 **`중앙 설계도(DDIC) ← [참조 · 조회 · 변경] ── 실행 엔진(ABAP Program)`**이라는 단방향 의존 구조를 기본 축으로 연결한다.
- 상위 루트 노드는 목적에 따라 아래 3가지 관점을 구분해 적용한다.
  - **설계 관점 (개념 지도 기본 루트):** `애플리케이션 = 정적 구조(DDIC) + 동적 행위(ABAP Program)`
  - **저장소 관점 (시스템 내부 위치):** `ABAP Repository = 전역 메타데이터(DDIC) + 실행 코드(ABAP Program)`
  - **실무 관리 관점 (업무 단위 묶음):** `Package = 업무별 DDIC 자산 + ABAP 프로그램 자산`

### 2-2. 설계도(`Data Types`)와 메모리 실체(`Data Objects`) 분리
- 메모리 할당 여부를 기준으로 두 영역을 반드시 **형제 노드**로 분리한다.
  - **`Data Types` (설계도 / 메모리 할당 X):**
    - `Predefined Type` (`Complete Type` / `Incomplete Type`)
    - `Local Type` (`TYPES` 구문: Structure Type, Table Type)
    - `Global Type` (`DDIC`: Data Element, Structure, Transparent Table, Table Type)
  - **`Data Objects` (실제 변수 / 메모리 할당 O):**
    - `Elementary` (단일 값)
    - `Structure / Work Area` (1개 행)
    - `Internal Table` (다중 행: Standard / Sorted / Hashed)
- 두 영역은 `Data Types ──(TYPE 참조)──▶ Data Objects`로 연결하고, 내부 객체 간 이동은 `Work Area ◀──(LOOP / READ / APPEND / MODIFY)──▶ Internal Table`로 표시한다.

---

## 3. 확장 및 복잡도 관리 원칙
- **중간 폴더 노드로 묶기:**
  - `Statements` 등 하위 항목이 빠르게 늘어나는 영역은 문법 디테일을 평면 나열하지 않는다.
  - 예: `초기화/메모리(CLEAR, REFRESH, FREE)`, `ITAB 제어(CRUD, 다중 복사, 순회, 정렬)`, `Open SQL`처럼 중간 폴더 노드를 두어 확장 시에도 가독성을 유지한다.
- **핵심 데이터 흐름 화살표만 선택적으로 추가:**
  - 모든 노드를 선으로 잇지 않고, 선언과 데이터 적재 흐름을 이해하는 데 결정적인 연결선만 남긴다.
  - 예: `Open SQL(SELECT) ──▶ Work Area(단건) / Internal Table(다중)`

---

## 4. 서술 및 정확성 기준
- **비교는 출발점으로, 마무리는 SAP 용어로:** 기존 웹/백엔드 개념과의 비교는 이해를 돕는 보조 수단으로만 쓰며, 맵의 노드와 설명은 SAP 실제 용어를 기준으로 기록한다.
- **사실과 해석의 구분:** 확인된 시스템 동작과 설계 의도에 대한 해석을 섞어 쓰지 않는다.
- **현재 학습 환경 우선:** 버전·환경(Classic ABAP vs ABAP Cloud/RAP 등) 차이가 실제 동작이나 제약에 영향을 줄 때만 조건을 명시한다.