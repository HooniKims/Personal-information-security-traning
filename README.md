# 개인정보보호 및 정보보안 연수 발표 웹사이트

영락의료과학고등학교 교직원 개인정보보호 및 정보보안 연수용 발표 웹사이트입니다.

웹페이지에서 PPT처럼 장면을 넘기며 발표할 수 있고, Vercel 정적 배포를 전제로 구성했습니다.

## Vercel 배포 설정

현재 저장소 루트가 바로 Vite 앱입니다. Vercel에서 프로젝트를 가져올 때는 별도 Root Directory를 지정하지 않아도 됩니다.

| 항목 | 값 |
| --- | --- |
| Framework Preset | Vite |
| Root Directory | 비워둠 |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

## 로컬 실행

```powershell
npm install
npm run dev
```

브라우저에서 표시되는 로컬 주소로 접속하면 발표 화면을 볼 수 있습니다.

## 발표 조작

- `Enter` 또는 `F`: 전체화면 시작/종료
- `Esc`: 전체화면 종료
- 오른쪽 방향키, PageDown, Space: 다음 장면
- 왼쪽 방향키, PageUp: 이전 장면
- Home: 처음 장면
- End: 마지막 장면
- 전체화면에서 마우스 클릭: 다음 장면

## 포함 내용

- 개인정보보호 및 정보보안 연수 슬라이드
- APM 개인정보 암호화 및 삭제 방법 실습 화면
- 교표, 파비콘, 배경 이미지, 장면별 오브젝트
- 슬라이드별 텍스트 효과와 오브젝트 애니메이션
- 장면별 Web Audio 합성 효과음

## 업로드 제외 대상

아래 항목은 GitHub와 Vercel 배포에 필요하지 않아 제외합니다.

- `node_modules`
- `dist`
- `video-render`
- 작업용 원본 이미지
- 로그 파일

배포 시 `dist`는 Vercel이 `npm run build` 과정에서 자동 생성합니다.
