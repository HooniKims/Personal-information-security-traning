export type SlideKind =
  | "title"
  | "impact"
  | "law"
  | "checklist"
  | "compare"
  | "destruction"
  | "apm-dashboard"
  | "apm-encrypt"
  | "apm-delete"
  | "apm-exception"
  | "mistakes"
  | "actions"
  | "outro";

export type Slide = {
  id: string;
  section: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  kind: SlideKind;
  bullets?: string[];
  tags?: string[];
  asset?: string;
  alt?: string;
  backdrop?: string;
  element?: string;
  elementAlt?: string;
  textFx?: "surge" | "alarm" | "check" | "split" | "erase" | "scan" | "lock" | "final";
  sfx:
    | "secure-open"
    | "risk-alert"
    | "legal-hit"
    | "check-sequence"
    | "reject-buzz"
    | "split-route"
    | "shred-vortex"
    | "degauss-pulse"
    | "login-unlock"
    | "scan-beeps"
    | "zero-complete"
    | "exception-review"
    | "mistake-alert"
    | "incident-stop"
    | "golden-rise"
    | "final-chime";
};

export const slides: Slide[] = [
  {
    id: "opening",
    section: "기",
    eyebrow: "2026 교직원 필수 연수",
    title: "개인정보보호\n및 정보보안",
    subtitle: "학생 정보는 행정 자료이기 전에\n학생의 현재와 미래가 담긴 교육 기록입니다.",
    kind: "title",
    bullets: ["오늘의 목표\n수집부터 파기까지 흐름으로 이해하기", "현장 기준\n보내기 전 확인, 자리 비움 잠금, 불필요 파일 영구삭제"],
    tags: ["5분 집중", "실무 기준", "APM 실습"],
    backdrop: "/assets/bg_opening_flow.png",
    element: "/assets/element_opening_core.png",
    elementAlt: "암호화 데이터 코어 오브젝트",
    textFx: "lock",
    sfx: "secure-open",
  },
  {
    id: "impact",
    section: "기",
    eyebrow: "왜 중요한가",
    title: "작은 실수가\n학생 정보 전체의 위험이 됩니다",
    subtitle: "학교에는 연락처, 성적, 생활기록부, 상담 기록처럼\n한 번 유출되면 되돌리기 어려운 정보가 모여 있습니다.",
    kind: "impact",
    bullets: ["성적 유출\n학생 간 비교와 낙인으로 이어질 수 있음", "연락처 오배송\n보호자 민원과 2차 피해가 발생할 수 있음", "생활기록부 유출\n진학·진로에 영향을 주는 민감한 기록이 노출됨"],
    backdrop: "/assets/generated_incident.png",
    element: "/assets/element_risk_leak.png",
    elementAlt: "개인정보 유출 위험 오브젝트",
    textFx: "alarm",
    sfx: "risk-alert",
  },
  {
    id: "law",
    section: "기",
    eyebrow: "법적 책임",
    title: "법 위반 시\n5년 이하 징역 또는\n5,000만원 이하 벌금",
    subtitle: "개인정보보호는 선택 사항이 아니라\n모든 교직원이 지켜야 하는 법적 의무입니다.",
    kind: "law",
    bullets: ["업무상 편의보다 법적 기준이 우선", "개인정보 처리 목적과 범위를 넘기면 위험", "사고 발생 시 학교와 담당자 모두 설명 책임"],
    backdrop: "/assets/bg_law.png",
    element: "/assets/element_legal_gavel.png",
    elementAlt: "법적 책임을 상징하는 의사봉과 증거 폴더",
    textFx: "alarm",
    sfx: "legal-hit",
  },
  {
    id: "collection",
    section: "승",
    eyebrow: "STEP 1 수집",
    title: "수집할 때는 네가지를\n반드시 고지합니다",
    subtitle: "신청서, 설문, 체험학습, 대회 접수처럼\n학생·보호자 정보를 받는 모든 순간에 적용됩니다.",
    kind: "checklist",
    bullets: ["수집 목적\n왜 필요한지 구체적으로 알립니다", "수집 항목\n이름, 학년, 연락처 등 필요한 항목만 받습니다", "보유 및 이용 기간\n언제까지 보관하고 언제 파기할지 밝힙니다", "동의 거부 권리와 불이익\n거부 가능성과 제한 사항을 함께 안내합니다"],
    tags: ["필요 최소한", "보호자 동의", "만 14세 미만 주의"],
    backdrop: "/assets/bg_collection.png",
    element: "/assets/element_collection_check.png",
    elementAlt: "수집 고지 체크리스트 오브젝트",
    textFx: "check",
    sfx: "check-sequence",
  },
  {
    id: "over-collection",
    section: "승",
    eyebrow: "수집 점검",
    title: "필요하지 않은 정보는\n처음부터 받지 않습니다",
    subtitle: "나중에 쓸 수도 있다는 이유만으로\n주민번호, 가족 정보, 건강 정보 등을 넓게 받으면 위험합니다.",
    kind: "checklist",
    bullets: ["목적에 필요한가\n행사 안내에 주민번호는 필요하지 않습니다", "대체 가능한가\n생년월일 대신 학번이나 반 번호로 충분한지 봅니다", "민감정보인가\n건강, 상담, 징계 관련 정보는 더 엄격하게 판단합니다"],
    tags: ["과잉 수집 금지", "목적 명확화", "민감정보 주의"],
    backdrop: "/assets/bg_over_collection.png",
    element: "/assets/element_overcollect_filter.png",
    elementAlt: "과잉 수집 차단 필터 오브젝트",
    textFx: "alarm",
    sfx: "reject-buzz",
  },
  {
    id: "provision-consignment",
    section: "승",
    eyebrow: "제공과 위탁",
    title: "제3자 제공과\n업무 위탁은 책임 구조가 다릅니다",
    kind: "compare",
    bullets: ["제3자 제공: 외부 기관이 자기 목적을 위해 사용\n별도 동의와 제공 내역 관리가 필요", "업무 위탁: 학교 업무를 대신 처리\n계약 조항과 관리·감독 책임이 학교에 남음"],
    tags: ["목적이 누구에게 있는가", "동의가 필요한가", "감독 책임은 어디에 있는가"],
    backdrop: "/assets/bg_compare.png",
    element: "/assets/element_compare_routes.png",
    elementAlt: "제3자 제공과 업무 위탁 분기 오브젝트",
    textFx: "split",
    sfx: "split-route",
  },
  {
    id: "destruction",
    section: "승",
    eyebrow: "파기 원칙",
    title: "보유기한이 끝나면\n즉시 파기합니다",
    subtitle: "문서와 파일은 보관 기간이 끝나는 순간\n업무 자료가 아니라 위험 자산이 됩니다.",
    kind: "destruction",
    bullets: ["종이 문서\n파쇄함 투입 후 실제 파쇄 여부까지 확인", "전자 파일\n휴지통 삭제가 아니라 복구 불가능한 방식으로 삭제", "공유 폴더\n담당자 PC만 지우고 공용 저장소를 놓치지 않기"],
    tags: ["보유기간 경과", "즉시 파기", "파기 기록"],
    backdrop: "/assets/generated_degauss.png",
    element: "/assets/element_destroy_vortex.png",
    elementAlt: "문서와 파일 파기 소용돌이 오브젝트",
    textFx: "erase",
    sfx: "shred-vortex",
  },
  {
    id: "degaussing",
    section: "승",
    eyebrow: "저장매체 폐기",
    title: "포맷은 파기가 아닙니다\n저장매체는 물리적으로 끝냅니다",
    subtitle: "하드디스크, SSD, USB, 외장하드에는\n삭제 후에도 복구 가능한 흔적이 남을 수 있습니다.",
    kind: "destruction",
    bullets: ["단순 포맷\n목록만 지워지고 데이터 흔적이 남을 수 있음", "디가우징\n강한 자기장으로 저장 정보를 무력화", "물리 파쇄\n매체 자체를 파괴해 재사용과 복구를 차단"],
    tags: ["디가우징", "물리 파쇄", "복구 방지"],
    backdrop: "/assets/bg_media_disposal.png",
    element: "/assets/element_degauss.png",
    elementAlt: "디가우징 자기장 오브젝트",
    textFx: "erase",
    sfx: "degauss-pulse",
  },
  {
    id: "apm-dashboard",
    section: "전",
    eyebrow: "APM 실습 1~2",
    title: "삭제 방법 안내와\nAPM 실행·암호 입력",
    subtitle: "시작 안내문, 아이콘 실행, 암호 생성 또는 입력을\n한 화면에서 먼저 확인합니다.",
    kind: "apm-dashboard",
    asset: "/assets/apm_steps_1_2.png",
    alt: "개인정보 암호화 및 삭제 방법 1~2번 안내 화면",
    bullets: ["1. APM 아이콘 클릭", "2. 암호 생성 또는 입력", "안내 문구의 매일 조치 기준 확인"],
    tags: ["삭제 방법", "1~2번 절차", "실행"],
    backdrop: "/assets/bg_apm_launch.png",
    element: "/assets/element_apm_login.png",
    elementAlt: "APM 실행과 암호 입력 오브젝트",
    textFx: "scan",
    sfx: "login-unlock",
  },
  {
    id: "apm-encrypt",
    section: "전",
    eyebrow: "APM 실습 3~4",
    title: "위험도 막대를 열고\n파일을 선택합니다.",
    subtitle: "위험, 경고, 주의 막대를 더블클릭한 뒤\n파일 리스트에서 처리할 항목을 체크합니다.",
    kind: "apm-encrypt",
    asset: "/assets/apm_steps_3_4.png",
    alt: "개인정보 암호화 및 삭제 방법 3~4번 안내 화면",
    bullets: ["3. 위험·경고·주의 막대 더블클릭", "4. 파일 리스트 체크박스 선택", "완전 삭제 또는 처리 방법 선택"],
    tags: ["3~4번 절차", "위험도", "체크박스"],
    backdrop: "/assets/bg_apm_scan.png",
    element: "/assets/element_apm_risk_scan.png",
    elementAlt: "APM 위험도 스캔 오브젝트",
    textFx: "scan",
    sfx: "scan-beeps",
  },
  {
    id: "apm-delete",
    section: "전",
    eyebrow: "APM 실습 5~6",
    title: "업무 파일은 암호화\n불필요 파일은 0건까지 정리",
    subtitle: "업무에 사용 중인 파일은 암호화로 보호하고\n위험·경고·주의가 모두 0건이 되도록 마무리합니다.",
    kind: "apm-delete",
    asset: "/assets/apm_steps_5_6.png",
    alt: "개인정보 암호화 및 삭제 방법 5~6번 안내 화면",
    bullets: ["5. 업무 사용 파일은 암호화", "6. 위험·경고·주의 모두 0건 확인", "예외 처리는 오탐일 때만 신중하게"],
    tags: ["5~6번 절차", "암호화", "0건"],
    backdrop: "/assets/bg_apm_complete.png",
    element: "/assets/element_apm_zero.png",
    elementAlt: "암호화와 0건 정리 오브젝트",
    textFx: "erase",
    sfx: "zero-complete",
  },
  {
    id: "apm-exception",
    section: "전",
    eyebrow: "APM 실습 4",
    title: "예외 처리도\n기록을 남기고\n정리합니다",
    subtitle: "예외 파일은 방치하지 않고\n사유, 담당자, 조치 상태를 확인해야 합니다.",
    kind: "apm-exception",
    asset: "/assets/apm_exception_full.png",
    alt: "APM 예외 처리 안내 전체 화면",
    bullets: ["예외 사유 확인\n업무상 보관 필요가 명확한지 봅니다", "기간 설정\n무기한 예외가 되지 않도록 관리합니다", "재점검\n다음 검색 때 다시 조치 대상인지 확인합니다"],
    tags: ["예외 처리", "사유 확인", "재점검"],
    backdrop: "/assets/bg_apm_exception.png",
    element: "/assets/element_exception_review.png",
    elementAlt: "APM 예외 처리 검토 오브젝트",
    textFx: "scan",
    sfx: "exception-review",
  },
  {
    id: "mistakes",
    section: "전",
    eyebrow: "현장 실수",
    title: "가장 많이 발생하는\n세 가지 장면을 줄입니다",
    subtitle: "보안 사고는 해킹보다\n일상적인 클릭과 전송 실수에서 자주 시작됩니다.",
    kind: "mistakes",
    bullets: ["메신저 동명이인 오발송\n이름이 같으면 소속과 대화방을 다시 확인", "USB 방치\n교탁, 회의실, 복사기 주변에 저장매체를 남기지 않기", "전화번호 노출\n칠판, 게시물, 단체 채팅에서 뒷자리라도 주의"],
    backdrop: "/assets/bg_mistakes.png",
    element: "/assets/element_mistakes.png",
    elementAlt: "현장 실수 세 가지 위험 오브젝트",
    textFx: "alarm",
    sfx: "mistake-alert",
  },
  {
    id: "incident-response",
    section: "결",
    eyebrow: "사고 대응",
    title: "의심되면\n혼자 덮지 말고 즉시 보고합니다",
    subtitle: "빠른 보고는 책임 회피가 아니라\n피해 확산을 줄이는 첫 번째 조치입니다.",
    kind: "checklist",
    bullets: ["멈추기\n추가 전송, 추가 삭제, 임의 수정 중단", "확인하기\n무엇이 누구에게 언제 갔는지 사실관계 기록", "보고하기\n개인정보 담당자와 관리자에게 즉시 공유"],
    tags: ["즉시 보고", "증거 보존", "확산 차단"],
    backdrop: "/assets/bg_incident_response.png",
    element: "/assets/element_incident_response.png",
    elementAlt: "사고 대응 절차 오브젝트",
    textFx: "check",
    sfx: "incident-stop",
  },
  {
    id: "golden-actions",
    section: "결",
    eyebrow: "우리의 약속",
    title: "3대 골든 액션",
    subtitle: "오늘 연수 뒤 바로 실천할 행동을\n세 가지로 압축합니다.",
    kind: "actions",
    bullets: ["수신자 3번 확인\n받는 사람, 첨부파일, 공개 범위를 전송 전 확인", "자리를 비울 때 Win + L\n교실, 교무실, 상담실 어디서든 화면 잠금", "불필요한 파일은 APM 영구삭제\n보관 종료 파일은 복구 불가능하게 파기"],
    backdrop: "/assets/generated_actions.png",
    element: "/assets/element_golden_actions.png",
    elementAlt: "3대 골든 액션 오브젝트",
    textFx: "surge",
    sfx: "golden-rise",
  },
  {
    id: "outro",
    section: "결",
    eyebrow: "2026학년도 정보보안 캠페인",
    title: "작은 실천이\n아이들의 미래를 지킵니다",
    subtitle: "안전한 학교 정보보안은\n오늘의 확인 습관에서 시작됩니다.",
    kind: "outro",
    bullets: ["확인하고 보내기", "잠그고 자리 비우기", "끝난 파일은 완전 파기"],
    tags: ["확인", "잠금", "영구삭제"],
    backdrop: "/assets/bg_outro.png",
    element: "/assets/element_outro_future.png",
    elementAlt: "안전한 미래를 상징하는 기록과 빛의 길",
    textFx: "final",
    sfx: "final-chime",
  },
];
