// 카트 사실 정리 · 판매 집계 · 기본 안내(규칙) 답변
// index.html 의 판매 히트맵과 안내 챗봇이 써요. 방문자 브라우저 안에서만 계산해서 서버 비용이 없어요.
// DOM, Firebase 에 의존하지 않는 순수 함수만 둬서 node 로도 바로 테스트할 수 있어요.

export const STALE_MS = 2 * 60 * 1000;   // 2분 넘게 소식이 없으면 "신호 확인 중"
const CART_SPEED_MPS = 1.0;              // 카트 이동 속도 (사람이 밀고 걷는 속도, 약 3.6km/h)
const SPOT_RADIUS_M = 60;                // 판매 지점을 이름 붙은 장소로 묶는 반경

// 시간대 필터 (판매 히트맵)
export const SLOTS = {
  all:     { label: "하루 전체", from: 0,  to: 24 },
  morning: { label: "오전",      from: 0,  to: 11 },
  lunch:   { label: "점심",      from: 11, to: 14 },
  after:   { label: "오후",      from: 14, to: 17 },
  evening: { label: "저녁",      from: 17, to: 24 }
};
export const PERIODS = {
  today: { label: "오늘" },
  week:  { label: "최근 7일" },
  all:   { label: "전체 기간" }
};

// 두 좌표 사이 거리(m), 하버사인 공식
export function distM(a, b) {
  const R = 6371000, r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function nearestPlace(p, places) {
  let best = null;
  for (const pl of places) {
    const d = distM(p, pl);
    if (!best || d < best.dist) best = { name: pl.name, dist: d };
  }
  return best;
}

// 한국 시간 기준 날짜·시각 (서버가 해외에 있어도 같은 값)
const KST = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit",
  hour: "2-digit", minute: "2-digit", hourCycle: "h23", weekday: "short"
});
export function kstParts(ts) {
  const o = {};
  for (const p of KST.formatToParts(new Date(ts))) o[p.type] = p.value;
  return { day: `${o.year}-${o.month}-${o.day}`, hour: +o.hour, text: `${o.year}-${o.month}-${o.day}(${o.weekday}) ${o.hour}:${o.minute}` };
}

export function liveState(live, now) {
  if (!live) return "none";
  if (live.status === "closed") return "closed";
  return now - live.ts > STALE_MS ? "stale" : "open";
}
const STATE_KO = { open: "운행 중", stale: "신호 확인 중 (잠시 위치가 안 들어오고 있음)", closed: "오늘 운행 종료", none: "아직 운행 전" };

// 판매 기록 필터: 기간(오늘/7일/전체) + 시간대
export function filterSales(sales, { now, period = "all", slot = "all" }) {
  const today = kstParts(now).day;
  const weekAgo = now - 7 * 24 * 3600 * 1000;
  const s = SLOTS[slot] || SLOTS.all;
  return sales.filter((x) => {
    const k = kstParts(x.ts);
    if (period === "today" && k.day !== today) return false;
    if (period === "week" && x.ts < weekAgo) return false;
    return k.hour >= s.from && k.hour < s.to;
  });
}

// 판매 집계: 상품별, 장소별, 시간대별
export function summarizeSales(sales, { menu, places }) {
  const names = Object.fromEntries(menu.map((m) => [m.id, m]));
  const byItem = new Map(), bySpot = new Map(), byHour = new Array(24).fill(0);
  let qty = 0, revenue = 0;
  for (const x of sales) {
    qty += x.qty;
    const m = names[x.item];
    if (m) revenue += m.price * x.qty;
    byItem.set(x.item, (byItem.get(x.item) || 0) + x.qty);
    const near = nearestPlace(x, places);
    const spot = near && near.dist <= SPOT_RADIUS_M ? near.name : `기타 위치 (${near ? near.name + " 근처" : "캠퍼스"})`;
    bySpot.set(spot, (bySpot.get(spot) || 0) + x.qty);
    byHour[kstParts(x.ts).hour] += x.qty;
  }
  const sortDesc = (m) => [...m.entries()].sort((a, b) => b[1] - a[1]);
  return {
    count: sales.length, qty, revenue,
    topItems: sortDesc(byItem).map(([id, q]) => ({ name: names[id]?.name || id, qty: q })),
    topSpots: sortDesc(bySpot).map(([name, q]) => ({ name, qty: q })),
    busiestHours: byHour.map((q, h) => ({ hour: h, qty: q })).filter((h) => h.qty).sort((a, b) => b.qty - a.qty)
  };
}

// ───────── 지금 갈 곳 추천 (운전자 화면) ─────────
// 지금 시각 ±windowH 시간대에 팔린 기록을 이름 붙은 장소별로 모아 많이 팔린 순으로 추천해요.
// 이 시간대 기록이 minQty 개보다 적으면 전체 기록으로 대신 추천해요.
export function recommendSpots(sales, { now, places, here = null, windowH = 1, minQty = 5 }) {
  const h = kstParts(now).hour;
  const qtyOf = (list) => list.reduce((a, s) => a + s.qty, 0);
  let pool = sales.filter((s) => Math.abs(kstParts(s.ts).hour - h) <= windowH);
  let basis = "window";
  if (qtyOf(pool) < minQty) { pool = sales; basis = "all"; }
  if (!pool.length) return { basis: "none", hour: h, windowH, spots: [] };

  const score = new Map();
  for (const s of pool) {
    const n = nearestPlace(s, places);
    if (n && n.dist <= SPOT_RADIUS_M) score.set(n.name, (score.get(n.name) || 0) + s.qty);
  }
  const days = new Set(pool.map((s) => kstParts(s.ts).day)).size;
  const spots = [...score.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([name, qty]) => {
    const p = places.find((x) => x.name === name);
    const o = { name, qty, perDay: Math.round((qty / days) * 10) / 10, lat: p.lat, lng: p.lng };
    if (here) {
      o.distM = Math.round(distM(here, p));
      o.moveMin = Math.max(1, Math.ceil(o.distM / CART_SPEED_MPS / 60));
    }
    return o;
  });
  return { basis, hour: h, windowH, days, spots };
}

// ───────── 카트 불러요 요청 ─────────
export const REQ_WINDOW_MS = 30 * 60 * 1000;   // 최근 30분 요청만 보여요
export const REQ_COOLDOWN_MS = 5 * 60 * 1000;  // 한 사람당 5분에 1번 (보안 규칙과 같은 값)

export const recentRequests = (reqs, now) => reqs.filter((r) => now - r.ts < REQ_WINDOW_MS && now - r.ts > -60 * 1000);
// 아직 처리 중인 요청 (대기 중이거나 "가는 중"). "도착"·"못 가요"로 끝난 요청은 빼요.
export const openRequests = (reqs, now) => recentRequests(reqs, now).filter((r) => !r.status || r.status === "going");

// 요청 상태 (운전자가 driver.html 에서 바꿔요)
export const REQ_STATUS = { going: "가는 중", done: "도착", cannot: "못 가요" };

// 고객 화면에 보여 줄 "내 요청" 안내 문구
export function myRequestNotice(req, now) {
  if (!req) return null;
  const ageMin = Math.max(0, Math.round((now - req.ts) / 60000));
  const expired = now - req.ts >= REQ_WINDOW_MS;
  const at = req.statusTs ? kstParts(req.statusTs).text.slice(-5) : "";
  if (req.status === "done")   return { tone: "ok",   text: `카트가 도착했어요! 🛒 (${at})` };
  if (req.status === "cannot") return { tone: "sorry", text: `이번엔 가기 어려워요. 미안해요 🙏 (${at}) 지도에서 카트 위치를 확인하거나, 조금 뒤에 다시 요청해 주세요.` };
  if (expired) return { tone: "sorry", text: "시간 안에 가지 못했어요. 미안해요 🙏 지도에서 카트 위치를 확인하거나 다시 요청해 주세요." };
  if (req.status === "going")  return { tone: "go",   text: `카트가 가는 중이에요! 🛒 (${at} 출발) 판매하며 이동해서 조금 걸릴 수 있어요.` };
  return { tone: "wait", text: `요청 접수됨 · 운전자가 확인하기를 기다리는 중이에요 (${ageMin}분 전 요청, 30분 동안 유효)` };
}

// 최근 요청을 가까운 장소별로 묶어 많은 순으로 정리해요 (운전자 화면)
export function summarizeRequests(reqs, { now, places, here = null }) {
  const recent = openRequests(reqs, now);
  const groups = new Map();
  for (const r of recent) {
    const n = nearestPlace(r, places);
    const name = n && n.dist <= SPOT_RADIUS_M ? n.name : `기타 위치 (${n ? n.name + " 근처" : "캠퍼스"})`;
    const g = groups.get(name) || { name, count: 0, going: 0, keys: [], latest: 0, lat: 0, lng: 0 };
    g.count += 1; g.latest = Math.max(g.latest, r.ts); g.lat += r.lat; g.lng += r.lng;
    if (r.status === "going") g.going += 1;
    if (r.key) g.keys.push(r.key);
    groups.set(name, g);
  }
  const list = [...groups.values()].map((g) => {
    const c = { lat: g.lat / g.count, lng: g.lng / g.count };   // 요청들의 가운데 지점
    const o = { name: g.name, count: g.count, going: g.going, keys: g.keys, lastMin: Math.max(0, Math.round((now - g.latest) / 60000)), ...c };
    if (here) { o.distM = Math.round(distM(here, c)); o.moveMin = Math.max(1, Math.ceil(o.distM / CART_SPEED_MPS / 60)); }
    return o;
  }).sort((a, b) => b.count - a.count || a.lastMin - b.lastMin);
  return { total: recent.length, groups: list };
}

// 재고·공지는 "오늘(한국 시간)" 올린 것만 유효하게 봐요. 어제 값이 남아 있어도 안내하지 않아요.
const isToday = (v, now) => v && Number.isFinite(v.ts) && kstParts(v.ts).day === kstParts(now).day;
export function todayStock(stock, now) {
  return isToday(stock, now) && Number.isInteger(stock.count) && stock.count >= 0 ? stock : null;
}
export function todayNotice(notice, now) {
  return isToday(notice, now) && typeof notice.text === "string" && notice.text.trim() ? notice : null;
}

// 챗봇이 답할 때 쓰는 "확인된 사실" 묶음
export function buildFacts({ live, now, sales = [], menu, hours, places, stock = null, notice = null }) {
  const state = liveState(live, now);
  const cart = { state: STATE_KO[state] };
  if (live) {
    const near = nearestPlace(live, places);
    cart.lastUpdate = kstParts(live.ts).text;
    cart.lastUpdateAgoMin = Math.max(0, Math.round((now - live.ts) / 60000));
    cart.nearestPlace = near.name;
    cart.nearestPlaceDistM = Math.round(near.dist);
    if (state === "open" || state === "stale") {
      cart.placesFromCart = places
        .map((p) => { const d = distM(live, p); return { name: p.name, distM: Math.round(d), etaMin: Math.max(1, Math.ceil(d / CART_SPEED_MPS / 60)) }; })
        .sort((a, b) => a.distM - b.distM);
    }
  }
  const week = summarizeSales(filterSales(sales, { now, period: "week" }), { menu, places });
  const st = todayStock(stock, now), nt = todayNotice(notice, now);
  return {
    now: kstParts(now).text,
    cart,
    hours,
    stock: st ? { count: st.count, updated: kstParts(st.ts).text } : null,
    notice: nt ? { text: nt.text, posted: kstParts(nt.ts).text } : null,
    menu: menu.map((m) => ({ name: m.name, price: m.price })),
    places: places.map((p) => p.name),
    salesLast7Days: {
      totalQty: week.qty,
      topItems: week.topItems.slice(0, 3),
      topSpots: week.topSpots.slice(0, 3),
      busiestHours: week.busiestHours.slice(0, 3).map((h) => `${h.hour}시대 ${h.qty}개`)
    },
    notes: [
      "도착 예상 시간(etaMin)은 카트가 쉬지 않고 이동한다고 가정한 대략값이에요. 멈춰서 판매하면 더 걸려요.",
      "카트는 정해진 노선 없이 움직여서, 다음 목적지는 알 수 없어요."
    ]
  };
}

// ───────── 안내 챗봇 답변 (규칙 기반, 무료) ─────────
const won = (n) => n.toLocaleString("ko-KR") + "원";
const squash = (s) => s.replace(/\s+/g, "");

function findPlace(message, places) {
  const m = squash(message);
  // 긴 이름부터 비교해서 "중앙도서관 오른쪽"이 "중앙도서관"보다 먼저 잡히게 해요
  return [...places].sort((a, b) => b.name.length - a.name.length)
    .find((p) => m.includes(squash(p.name)) || squash(p.name).split(/[·]/).some((w) => w.length >= 2 && m.includes(w)));
}

export function ruleAnswer(message, facts, places) {
  const m = squash(message);
  const c = facts.cart;
  const running = c.state === STATE_KO.open || c.state === STATE_KO.stale;
  const where = () => {
    if (!c.nearestPlace) return "오늘은 아직 카트가 운행을 시작하지 않았어요.";
    if (!running) return `오늘 운행은 끝났어요. 마지막 위치는 ${c.nearestPlace} 근처였어요 (${c.lastUpdate}).`;
    const stale = c.state === STATE_KO.stale ? ` 다만 ${c.lastUpdateAgoMin}분째 새 위치가 안 들어오고 있어요.` : "";
    const dist = c.nearestPlaceDistM < 20 ? "바로 앞" : `근처(약 ${c.nearestPlaceDistM}m)`;
    return `카트는 지금 ${c.nearestPlace} ${dist}에 있어요.${stale} 위 지도에서 주황 점을 확인해 보세요.`;
  };

  const place = findPlace(message, places);
  if (place && /언제|얼마나|몇분|오나|와요|와\?|오니|도착|걸려|걸리/.test(m)) {
    if (!running) return `${where()} 운행 중일 때 다시 물어봐 주세요.`;
    const p = c.placesFromCart.find((x) => x.name === place.name);
    if (p.distM < 40) return `카트가 지금 ${place.name} 바로 근처에 있어요!`;
    return `지금 위치에서 ${place.name}까지 약 ${p.distM}m라서, 바로 간다면 ${p.etaMin}분 정도 걸려요. 중간에 멈춰서 판매하면 더 걸릴 수 있고, 카트가 그쪽으로 간다는 보장은 없어요.`;
  }
  // "어디서 제일 많이 팔려?"처럼 위치 단어가 섞인 인기 질문을 먼저 잡아요
  if (/인기|많이팔|잘팔|추천|잘나가/.test(m)) {
    const s = facts.salesLast7Days;
    if (!s.totalQty) return "아직 판매 기록이 없어서 인기 정보를 알려 드릴 수 없어요.";
    const items = s.topItems.map((x) => `${x.name}(${x.qty}개)`).join(", ");
    const spots = s.topSpots.map((x) => x.name).join(", ");
    return `최근 7일 인기 메뉴는 ${items}이고, 많이 팔린 곳은 ${spots}이에요.`;
  }
  if (/재고|남았|남은|남아|품절|매진|몇개/.test(m)) {
    const st = facts.stock;
    if (!st) return "오늘 남은 수량은 아직 안내되지 않았어요. 카트에서 직접 확인해 주세요.";
    if (st.count === 0) return `아쉽지만 오늘은 품절이에요. (${st.updated} 기준)`;
    return `남은 ${facts.menu[0]?.name || "상품"}는 ${st.count}개예요. (${st.updated} 기준)`;
  }
  if (/불러|부르|부를|요청|와줘|와주세요|오게|호출/.test(m)) {
    return "지도 위의 \"여기로 와 주세요\" 버튼을 누르면 지금 위치로 카트를 부를 수 있어요. 요청은 운전자 화면에 모여서 보이고, 5분에 한 번 보낼 수 있어요. 꼭 온다는 약속은 아니에요.";
  }
  if (/공지|알림|소식|안내사항|어디로가|어디로갈|어디갈|다음에어디/.test(m)) {
    return facts.notice ? `오늘 공지: ${facts.notice.text} (${facts.notice.posted})` : "오늘 올라온 공지는 없어요.";
  }
  if (/어디|위치|있어|있나|찾|근처/.test(m)) return where();
  if (/뭐팔|메뉴|가격|얼마|팔아|파나|파는|상품/.test(m))
    return `판매 메뉴는 ${facts.menu.map((x) => `${x.name} ${won(x.price)}`).join(", ")}이에요.`;
  if (/언제|몇시|시간|운영|열어|쉬|영업/.test(m))
    return `운영 시간은 ${facts.hours}이에요. 지금은 ${c.state} 상태예요.`;
  if (/안녕|하이|hello|hi/i.test(m)) return "안녕하세요! 카트 위치, 메뉴, 남은 수량, 공지, 운영 시간, 도착 예상 시간을 물어보세요.";
  return "저는 카트 안내만 도와드릴 수 있어요. \"카트 어디야?\", \"뭐 팔아?\", \"노천극장까지 얼마나 걸려?\"처럼 물어봐 주세요.";
}
