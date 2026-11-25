# SAP Knowledge Map

SAP의 개별 문법이나 기능을 파편적으로 암기하지 않고, **전체 아키텍처 속 위치(Where), 존재 이유와 책임(Why), 구성 요소 간의 연결과 작동 흐름(How)**을 구조화하기 위해 관리하는 지식 맵 저장소입니다.

## 문서 구성 및 의도

| 문서 | 의도 및 다루는 범위 |
| :--- | :--- |
| **[01.comprehensive map.md](./01.comprehensive%20map.md)** | **전체 아키텍처 지도.** 프론트엔드(UI5/Fiori, SAP GUI), 백엔드 로직(ABAP/RAP), 데이터 계층(DDIC/DB)이 어떤 책임으로 나뉘고 서로 어떻게 연결되는지 최상위 큰 그림을 잡기 위한 문서입니다. |
| **[02.DDIC.md](./02.DDIC.md)** | **데이터 설계도와 규칙.** 시스템 전역에서 재사용되는 데이터 틀(Domain, Data Element, Structure, Table, Table Type)과 뷰·유지보수 구조(Maintenance View, TMG, View Cluster)가 왜 분리되어 설계되었는지 정리한 문서입니다. |
| **[03.ABAP prgram.md](./03.ABAP%20prgram.md)** | **실행 로직과 메모리 흐름.** 설계도(`Data Types`)를 참조해 실제 런타임 메모리 객체(`Data Objects`: Work Area, Internal Table)를 생성하고, 제어문·ITAB 조작·Open SQL·디버깅을 통해 데이터가 어떻게 이동하고 변하는지 정리한 문서입니다. |
| **[fisrt week/problem.md](./fisrt%20week/problem.md)** | **개념 검증 및 실습 문제.** 맵으로 정리한 계층·참조·메모리 동작을 실제 코드와 시나리오에 적용해 보며, '안다는 착각'과 오개념을 점검하기 위한 문서입니다. |
| **[GUIDELINES.md](./GUIDELINES.md)** | **지식 맵 작성·확장 원칙 (SSOT).** 새로운 개념을 지도에 추가하거나 리팩터링할 때 계층과 관계가 꼬이지 않도록 유지하는 설계 기준 문서입니다. |

## 활용 방식
- 새로운 SAP 개념을 학습하거나 정리할 때는 [GUIDELINES.md](./GUIDELINES.md)의 원칙에 따라 기존 지도에 연결합니다.
- 각 문서는 독립된 요약본이 아니라 **상위 지도(`01`) → 데이터 구조(`02`) → 실행 로직(`03`) → 검증(`problem`)** 순으로 맥락이 이어지도록 유지합니다.