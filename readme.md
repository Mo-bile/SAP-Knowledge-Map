# SAP Knowledge Map

SAP의 개별 문법이나 기능을 파편적으로 암기하지 않고, 전체 아키텍처 속 위치(Where), 존재 이유와 책임(Why), 구성 요소 간의 연결과 작동 흐름(How) 을 구조화하기 위해 관리하는 지식 맵 저장소입니다.

## 문서 구성 및 의도

| 문서 | 의도 및 다루는 범위 |
| :--- | :--- |
| **[01.comprehensive map.md](./01.comprehensive%20map.md)** | **전체 아키텍처 지도.** 프론트엔드(UI5/Fiori, SAP GUI), 백엔드 로직(ABAP/RAP), 데이터 계층(DDIC/DB)이 어떤 책임으로 나뉘고 서로 어떻게 연결되는지 최상위 큰 그림을 잡기 위한 문서입니다. |
| **[02.DDIC.md](./02.DDIC.md)** | **데이터 설계도와 규칙.** 시스템 전역에서 재사용되는 데이터 틀(Domain, Data Element, Structure, Table, Table Type)과 뷰·유지보수 구조(Maintenance View, TMG, View Cluster)가 왜 분리되어 설계되었는지 정리한 문서입니다. |
| **[03.ABAP program.md](./03.ABAP%20program.md)** | **실행 로직과 메모리 흐름.** 설계도(`Data Types`)를 참조해 실제 런타임 메모리 객체(`Data Objects`: Work Area, Internal Table)를 생성하고, 내부 메모리에서의 보관·가공 협력과 디버깅 흐름을 정리한 문서입니다. |
| **[04.Open SQL.md](./04.Open%20SQL.md)** | **DB 접근 계층 (Open SQL).** ABAP 프로그램의 데이터 요청이 `Database Interface`와 `Table Buffer`를 거쳐 DB와 협력하고 프로그램 메모리(WA/ITAB)로 적재되는 파이프라인을 정리한 문서입니다. |
| **[fisrt week/problem.md](./fisrt%20week/problem.md)** | **개념 검증 및 실습 문제.** 맵으로 정리한 계층·참조·메모리 동작을 실제 코드와 시나리오에 적용해 보며, '안다는 착각'과 오개념을 점검하기 위한 문서입니다. |
| **[GUIDELINES.md](./GUIDELINES.md)** | **지식 맵 작성·확장 원칙 (SSOT).** 새로운 개념을 지도에 추가하거나 리팩터링할 때 계층과 관계가 꼬이지 않도록 유지하는 설계 기준 문서입니다. |

## 활용 방식
- 새로운 SAP 개념을 학습하거나 정리할 때는 [GUIDELINES.md](./GUIDELINES.md)의 원칙에 따라 기존 지도에 연결합니다.
- 각 문서는 독립된 요약본이 아니라 **상위 지도(`01`) → 데이터 구조(`02`) → 실행 로직(`03`) → DB 접근(`04`) → 검증(`problem`)** 순으로 맥락이 이어지도록 유지합니다.

## 웹에서 열람

GitHub Pages 주소: [SAP Knowledge Map](https://mo-bile.github.io/SAP-Knowledge-Map/)

지도별 공유 링크:

- [Comprehensive Map](https://mo-bile.github.io/SAP-Knowledge-Map/01.comprehensive%20map.html)
- [DDIC Map](https://mo-bile.github.io/SAP-Knowledge-Map/02.DDIC.html)
- [ABAP Program Map](https://mo-bile.github.io/SAP-Knowledge-Map/03.ABAP%20program.html)
- [Open SQL Map](https://mo-bile.github.io/SAP-Knowledge-Map/04.Open%20SQL.html)

최초 배포 전에는 위 주소가 열리지 않을 수 있습니다. 별도 로그인이나 프로그램 설치 없이 브라우저에서 열람합니다.

지도를 클릭하거나 키보드로 선택한 뒤 Enter/Space를 누르면 전체 화면 뷰어가 열립니다. 전체 화면은 브라우저 안의 화면 전체를 사용하는 모달입니다.

| 동작 | 조작 |
| :--- | :--- |
| 확대·축소 | 마우스 휠, 모바일 두 손가락 핀치, `+` / `−` 버튼 또는 키 |
| 이동 | 마우스 드래그, 모바일 한 손가락 드래그, 방향키 |
| 초기화·화면 맞춤 | `↻` 버튼 또는 `0` 키. 이동을 초기화하고 현재 화면에 맞는 크기(뷰어 기준 100%)로 복귀 |
| 닫기 | `✕` 버튼 또는 Escape |
| 라이트·다크 모드 | 상단 테마 전환. 모바일은 상단 메뉴에서 전환 |

화면 크기에 맞게 전체 지도를 표시하므로 작은 화면에서는 글자가 작아질 수 있습니다. 전체 화면에서 필요한 영역을 확대해 읽으세요. SVG이므로 확대해도 선과 글자가 선명합니다.

## 로컬 실행

사이트 개발에는 **Node.js 24 이상**과 npm이 필요합니다. Markdown 편집과 Obsidian 열람에는 필요하지 않습니다.

```sh
npm ci
npm run docs:dev
```

터미널에 표시되는 주소의 `/SAP-Knowledge-Map/` 경로로 접속합니다.

배포할 정적 파일을 빌드하고 확인하려면:

```sh
npm run docs:build
npm run docs:preview
```

미리보기 주소는 `http://localhost:4173/SAP-Knowledge-Map/`입니다. 산출물은 `.vitepress/dist`에 생성되며 Git에는 포함하지 않습니다. 빌드는 깨진 내부 링크도 검사합니다.

## 문서 추가 및 구조

루트의 기존 Markdown 파일이 단일 원본입니다. 웹용 문서 복사본을 만들지 않습니다. README는 웹 홈으로 연결되며, 나머지 Markdown도 원래 경로의 `.html` 페이지가 됩니다. 공백은 공유 URL에서 `%20`으로 표기합니다.

1. 기존 위치 또는 원하는 하위 폴더에 `.md` 문서를 추가합니다. Mermaid는 기존처럼 `mermaid` 코드 블록으로 작성합니다. 작성 원칙은 [GUIDELINES.md](./GUIDELINES.md)를 따릅니다.
2. 지도를 사이드바에 추가하려면 `.vitepress/maps.mjs`에 `file`, `title`, `description`을 추가합니다. 파일명과 경로는 실제 Markdown과 일치시킵니다. 일반 문서는 `.vitepress/config.mjs`의 사이드바에 추가합니다.
3. `npm run docs:build`로 링크와 빌드를 확인하고 로컬 미리보기에서 다이어그램을 확인합니다.

| 위치 | 역할 |
| :--- | :--- |
| 루트 및 기존 하위 폴더의 `.md` | Obsidian·IDE·GitHub·웹에서 공유하는 학습 원본 |
| `.vitepress/config.mjs`, `maps.mjs` | 사이트 및 탐색 설정 |
| `.vitepress/theme/` | 넓은 문서 화면 및 뷰어 스타일 |
| `.vitepress/tests/`, `playwright.config.mjs` | 원본 지도 렌더링 및 조작 회귀 테스트 |
| `.github/workflows/pages.yml` | GitHub Pages 자동 빌드·배포 |

루트의 학습 문서는 사이드바 등록 여부와 관계없이 공개 정적 페이지로 빌드됩니다. 비공개 메모는 이 저장소에 추가하지 않습니다. Obsidian에서 웹 설정 폴더가 불필요하면 `.vitepress`와 `node_modules`를 제외 목록에 추가할 수 있습니다.

### Mermaid 뷰어 선택

[`vitepress-mermaid-viewer`](https://github.com/Kassaila/vitepress-mermaid-viewer) 0.5.2를 사용합니다. 2026-11-25 npm 확인 기준 최신 배포는 2026-10-21이며, Node >=24, VitePress >=1, Mermaid >=10, Vue ^3을 명시합니다. 휠·핀치 확대, 드래그, 전체 화면, 키보드 조작과 다크 모드가 있어 별도의 pan/zoom 라이브러리나 자체 뷰어를 추가하지 않습니다. 아직 0.x인 소규모 프로젝트이므로 버전을 고정하고 업데이트 시 기존 맵을 다시 검증합니다.

VitePress는 안정 버전 1.6.4를 사용합니다. 직접 의존성 버전과 `package-lock.json`을 함께 관리하며, 업데이트 후 빌드와 브라우저 테스트를 수행합니다. 기존 Mermaid 문법은 변경하지 않고 웹 테마에서 화면 배치만 조정합니다.

### 브라우저 테스트

빌드 후 Chrome이 설치된 환경에서 실행합니다.

```sh
npm run docs:build
npm test
```

Chrome이 없으면 `npx playwright install chrome`으로 설치할 수 있습니다. 테스트는 정적 미리보기 서버를 자동으로 실행합니다. 데스크톱과 모바일 크기에서 네 맵의 실제 SVG 렌더링과 뷰어 기능을 검사합니다. 모바일 제스처 테스트는 Chromium 터치 에뮬레이션으로 수행하며 실제 기기 및 Safari 검증을 대체하지 않습니다.

## GitHub Pages 배포

1. GitHub 저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정합니다. 최초 한 번만 필요합니다.
2. 변경 사항을 검토한 뒤 `main` 브랜치에 push합니다. `.github/workflows/pages.yml`이 `npm ci`와 정적 빌드를 수행하고 Pages에 배포합니다.
3. 저장소의 **Actions**에서 실행 결과와 `github-pages` 배포 URL을 확인합니다. **Run workflow**로 수동 재배포할 수도 있습니다.

`base`는 `/SAP-Knowledge-Map/`으로 설정되어 있습니다. 저장소 이름이나 호스팅 경로가 바뀌면 `.vitepress/config.mjs`의 `base`와 이 문서의 공유 URL, `playwright.config.mjs`의 테스트 경로를 함께 수정합니다. `.html` URL을 사용하므로 별도의 서버 리라이트가 필요 없습니다.

로컬 파일 작성·빌드는 실제 배포를 수행하지 않습니다. 검토 후 workflow를 포함해 push하면 자동 배포가 시작됩니다. 배포에는 GitHub 기본 `GITHUB_TOKEN`을 사용하며 별도 토큰·서버·DB는 필요하지 않습니다.
