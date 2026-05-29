# 개인정보보호 연수 발표 슬라이드

웹사이트와 GitHub Pages 배포를 전제로 만든 React/Vite 발표용 슬라이드입니다.

## Vercel 배포 설정

이 프로젝트를 GitHub 저장소 루트의 하위 폴더로 올린 경우, Vercel에서 다음처럼 설정합니다.

| 항목 | 값 |
| --- | --- |
| Framework Preset | Vite |
| Root Directory | `privacy-training-slides` |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

## 실행

```powershell
npm install
npm run dev
```

## 배포 빌드

```powershell
npm run build
```

빌드 결과는 `dist` 폴더에 생성됩니다. 정적 호스팅에는 `dist` 폴더 내용을 올리면 됩니다.

## 발표 조작

- 일반 화면: 오른쪽 패널의 `처음`, `이전`, `다음`, `전체화면` 버튼을 사용합니다.
- 전체화면: `Enter` 또는 `F`로 진입/종료합니다.
- 전체화면 중 클릭, 스페이스, 오른쪽 방향키, PageDown은 다음 장면으로 이동합니다.
- 왼쪽 방향키와 PageUp은 이전 장면, Home은 처음, End는 마지막 장면으로 이동합니다.
- Esc는 브라우저 전체화면을 종료합니다.

## 포함된 자료

- Pretendard Variable 폰트: `public/fonts/PretendardVariable.woff2`
- 생성형 배경 이미지: `public/assets/generated_*.png`
- 페이지별 배경 이미지: `public/assets/bg_*.png`
- 중심 오브젝트 이미지: `public/assets/element_*.png`
- APM PDF 컷 이미지: `public/assets`
- 발표 효과음: 파일을 반복 재생하지 않고 Web Audio로 장면별 합성 효과음을 생성합니다.
- 파비콘: `public/favicon.png`, `public/favicon.ico`

## 원본 참고

APM 화면 이미지는 다음 PDF에서 필요한 영역을 확인하며 추출했습니다.

`..\..\privacy-training\raw\개인정보 암호화 및 삭제 방법.pdf`

배경과 중심 오브젝트 이미지는 `$imagegen`으로 만든 뒤 프로젝트의 `public/assets`에 복사했습니다. 슬라이드에서는 배경 이미지가 천천히 확대/이동하고, 자물쇠 방패, 파쇄 오브젝트, 디가우징 오브젝트, 스캔 라인, 포인트 마커가 움직이도록 CSS 애니메이션을 적용했습니다.
