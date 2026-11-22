

### [Part 1.  문제]

#### A. 코드 틀린 그림 찾기 & 결과 예측 (ABAP 기초 · 지도 3 연계)

**1. 내장 타입 길이 함정 (결과 예측)**

```abap
DATA gv_name TYPE c.
gv_name = '홍길동'.
```

* 위 코드를 실행한 뒤 디버깅으로 `gv_name`을 열어보면 어떤 값이 들어있을까?

**2. 로컬 설계도 `TYPES` 참조 (빈칸 채우기)**

```abap
TYPES ty_code TYPE c LENGTH 4.
DATA gv_code (  ①  ) ty_code.
```

* `ty_code`는 외부 DDIC가 아니라 프로그램 내부에 만든 것인데, ①에는 `TYPE`과 `LIKE` 중 무엇을 넣어야 할까?

**3. 1행 작업대 vs 여러 행 표 (에러 찾기)**

```abap
DATA gs_scarr TYPE scarr.
DATA gt_scarr TYPE TABLE OF scarr.

gs_scarr-carrid = 'AA'.   " (A)
gt_scarr-carrid = 'AA'.   " (B)
```

* `(A)`와 `(B)` 중 문법 에러가 나는 줄은 어디이며, 그 이유는 무엇일까?

**4. `CLEAR`의 진짜 동작 (결과 예측)**

```abap
DATA gs_memb TYPE ztcl2memb10.
gs_memb-name = '김철수'.
CLEAR gs_memb.
```

* `CLEAR gs_memb.`를 실행하면 `gs_memb` 변수는 메모리에서 삭제(소멸)될까, 아니면 그대로 남아 있을까?

---

#### B. DDIC 설계 & 실무 상황 판단 (지도 2 연계)

**5. Domain vs Data Element 분리 이유**

* 사원 테이블에 `'입사일'`과 `'퇴사일'` 두 필드를 만들려 한다. 둘 다 똑같이 **8자리 날짜 형식**을 쓰지만, 화면에 뜨는 **이름(라벨)만 다르게** 보여주고 싶다. 이때 **공유해야 할 객체**와 **따로 만들어야 할 객체**는 각각 무엇일까?

**6. 금액·수량 필드의 활성화 에러**

* 테이블에 `SALARY`(급여액, 타입 `CURR`) 필드를 추가하고 저장한 뒤 활성화 버튼을 눌렀더니 에러가 났다. 무엇을 빠뜨렸을 가능성이 가장 높을까?

**7. 코드 테이블과 텍스트 테이블 분리 (`SKA1` vs `SKAT`)**

* G/L 계정 실습에서 계정 코드(`SKA1`)와 계정 설명(`SKAT`)을 굳이 한 테이블에 안 합치고 두 테이블로 쪼개 둔 이유는 무엇일까?

**8. 상위 → 하위 연동 유지보수 & 바로가기**

* `회사 → 지점 → 사업부`처럼 상위 화면에서 선택한 키를 하위 화면으로 넘기며 이어서 관리하고, 현업이 `SM30` 대신 `ZDEPT` 같은 전용 T-code로 바로 열게 해주고 싶다. 각각 어떤 기능/T-code를 써야 할까?

---

#### C. 전체 흐름 & 오개념 OX 퀴즈 (지도 1·2 연계)

**9. [O / X]** 10월에 배운 SAPUI5(XML View + JS Controller)는 브라우저에서 곧바로 SAP DB 테이블에 직접 접속해 데이터를 읽어온다.

**10. [O / X]** SE11에서 만든 Structure(`ZSCL2_TIME_10`)를 활성화하면, Transparent Table처럼 실제 DB에 데이터가 영구 저장되는 공간이 생긴다.

**11. [O / X]** 테이블에 `MANDT`(Client) 필드를 기본 키(Key)로 넣는 이유는, 같은 SAP 시스템 안에서 회사/환경별 데이터를 논리적으로 격리해 관리하기 위해서다.

**12. [O / X]** 자식 테이블의 부서코드 필드에 부모 테이블(Check Table)을 연결하는 Foreign Key를 걸어두면, SM30에서 부모 테이블에 없는 부서코드를 입력할 때 저장 단계에서 차단된다.