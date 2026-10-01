// 카트 위치 추적 공통 설정 (index.html, driver.html 이 함께 사용)

// Firebase 콘솔 → 프로젝트 설정 → 내 앱(웹)에서 복사한 값 (where-is-my-cart-project2)
// 공개돼도 되는 값이에요. 보안은 Firebase 보안 규칙(database.rules.json)이 담당해요.
// null 로 두면 지도는 뜨지만 "위치 서버 준비 중" 상태로 표시돼요.
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDDER9dhQlsdNYDrvF5v_P72mUD2Yq6QaU",
  authDomain: "where-is-my-cart-project2.firebaseapp.com",
  databaseURL: "https://where-is-my-cart-project2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "where-is-my-cart-project2",
  storageBucket: "where-is-my-cart-project2.firebasestorage.app",
  messagingSenderId: "843618294476",
  appId: "1:843618294476:web:a0b3644b1de5eecac9c069"
};

export const FIREBASE_SDK = "https://www.gstatic.com/firebasejs/10.12.2";

// 경희대 국제캠퍼스 (대략값: 캠퍼스를 한 바퀴 돌며 driver.html 로그 좌표로 조정하세요)
// ⚠️ CAMPUS_BOUNDS 를 바꾸면 Firebase 보안 규칙의 lat/lng 범위도 같은 값으로 바꿔 주세요.
export const CAMPUS_CENTER = [37.2403, 127.0822];   // 2026-09-28 현장 테스트 8개 지점의 평균 (지도 첫 화면 중심)
export const CAMPUS_BOUNDS = { minLat: 37.2360, maxLat: 37.2475, minLng: 127.0740, maxLng: 127.0865 };

// ───────── 판매 정보 (판매 히트맵 · 안내 챗봇이 함께 사용) ─────────
// ✏️ 실제 판매 상품으로 바꿔 주세요. id 는 영어 소문자·숫자·-·_ 만 (보안 규칙이 검사해요).
export const MENU = [
  { id: "gacha", name: "가챠", price: 2000 }
];

// ✏️ 운영 시간 안내 문구 (챗봇이 그대로 안내해요)
export const HOURS = "2026년 9월 28일(월) 오후 4시~오후 8시 (예상)";

// 카트가 자주 서는 곳 (2026-09-28 현장 테스트 좌표). 챗봇의 "어디야?", "언제 와?" 답변과
// 판매 히트맵의 "많이 팔린 곳" 이름표에 써요.
export const PLACES = [
  { name: "노천극장",               lat: 37.239490, lng: 127.084143 },
  { name: "예술디자인대학",         lat: 37.241083, lng: 127.083949 },
  { name: "사색 주차장",            lat: 37.240760, lng: 127.083338 },
  { name: "사색의 광장",            lat: 37.240813, lng: 127.081482 },
  { name: "중앙도서관",             lat: 37.240843, lng: 127.080228 },
  { name: "중앙도서관 오른쪽",      lat: 37.240337, lng: 127.080185 },
  { name: "국제대·전정대 나들목",   lat: 37.239984, lng: 127.082115 },
  { name: "카트 제작 위치",         lat: 37.238959, lng: 127.083304 }
];
