# 2025 글로벌 식량위기 대응사업 중간보고 대시보드

월드비전 × 유엔세계식량계획(WFP) 다자기구협력사업의 성과를 보여주는 인터랙티브 웹 대시보드(Single Page Application).

> **현재 상태:** 디자인 + 구조 완성. 수치는 제안서(2025.03)·중간보고서(2025.12) 기준으로 채워져 있으며, **확정 실적/사진으로 교체할 수 있도록 구조화**되어 있습니다.

---

## ▶ 실행 방법 (가장 쉬움)

**`start-dashboard.cmd` 파일을 더블클릭** → 잠시 후 브라우저에서 **http://localhost:5180** 접속.
(종료: 검은 창에서 `Ctrl + C`)

명령어로 실행하려면:

```powershell
# 이 프로젝트에는 휴대용 Node가 .node 폴더에 포함되어 있습니다.
$env:Path = "$PWD\.node\node-v24.16.0-win-x64;$env:Path"
npm run dev      # 개발 서버 (http://localhost:5180)
npm run build    # 배포용 정적 파일 생성 → dist 폴더
```

---

## 기술 스택

React 18 · Vite · Tailwind CSS · React-Leaflet(자체 GeoJSON 세계지도, 외부 타일 불필요) · Recharts · lucide-react

---

## 화면 구성

1. **Hero** — 타이틀, 핵심 KPI(13개국·20개 사업·총 수혜자·예산 레버리지 약 41배)
2. **식량위기의 원인** — 분쟁 / 기후변화 / 경제적 충격 3단 카드
3. **5대 핵심 활동** — 일반식량·현금/교환권·영양실조 치료·학교 급식·생계 회복력 (탭 토글)
4. **대화형 성과 지도** — 사업국 마커 클릭 → 우측 상세 패널(KPI 배지·수행 활동·상반기 진척률·현장 사진 갤러리)

---

## ✏ 데이터 수정 방법 (확정 수치가 나오면 여기만 고치면 됩니다)

### 1) 사업별 수치 — `src/data/projects.js`

각 사업 객체에서 아래 값을 수정하세요. **금액은 모두 천원(1,000원) 단위**입니다.

| 필드 | 의미 |
|------|------|
| `pbas` | PBAS 번호 (**현재 임시값** — 실제 코드로 교체) |
| `beneficiaries` | 총 수혜자(명) |
| `wvSupport` / `wfpGrant` | 월드비전 지원 / WFP 지원금 (천원) |
| `foodTons` / `foodValue` / `cashValue` | 배분 식량(톤) / 식량 금액 / 현금 금액(천원) |
| `activities` | `{ food, cash, nutrition, school, livelihood }` — 수행 활동 true/false |
| `progress` | 상반기 실적(진척률 %, 영양 치료식 kg 등) |
| `photos` | **현장 사진 배열** (아래 참고) |

상단의 `GLOBAL_KPIS`(합계)와 `PROJECT_ISO3`(지도 하이라이트 국가)도 필요 시 수정.

### 2) 현장 사진 추가 — 각 사업의 `photos: []`

사진을 넣으면 갤러리가 **자동으로 슬라이더로 전환**됩니다(비어 있으면 플레이스홀더 표시).

```js
photos: [
  '/photos/sudan-1.jpg',                                  // 문자열(경로/URL)
  { src: '/photos/sudan-2.jpg', caption: '식량 배분 - 수단' }, // 또는 캡션 포함
]
```

- 로컬 이미지는 `public/photos/` 폴더에 넣고 `'/photos/파일명.jpg'`로 참조하세요.
- 외부 URL도 그대로 사용 가능합니다.

### 3) 설명 문구 — `src/data/content.js`

원인 카드(`CAUSES`)·핵심 활동(`INTERVENTIONS`) 텍스트와 아이콘/색상을 수정.

---

## 폴더 구조

```
src/
  data/      projects.js (사업 데이터) · content.js (설명) · world-110m.json (지도)
  components/ Hero · CausesSection · InterventionsSection · ImpactMap · DetailPanel · PhotoGallery
  lib/       format.js (숫자 포맷) · icons.jsx (아이콘)
public/photos/  ← 현장 사진을 여기에 넣으세요
```

---

## 데이터 출처

Hunger Hotspots (WFP & FAO, 2025) / 월드비전 제안서·중간보고서. 최종 실적·재무보고는 2026년 결과보고에서 확정.
문의: 인도적지원팀 조항빈 대리
