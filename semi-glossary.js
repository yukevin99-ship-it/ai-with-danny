/* 반도체소자 "현업 용어집" 데이터 — semiconductor.html(용어집 화면)과 index.html(홈 검색)이 함께 써요.
   용어를 고치거나 추가할 때는 이 파일만 고치면 두 곳에 같이 반영돼요.
   항목: [id, 용어, 검색어(영문·동의어), 관련 노트 번호, 쉬운 설명] */
window.SEMI_GLOSSARY = [
  { cat: '🧱 재료와 웨이퍼', notes: 'Note 1~2', items: [
    ['wafer', '웨이퍼', 'wafer 300mm 원판', 1, '반도체를 만드는 얇고 둥근 실리콘 원판이에요. 피자 도우처럼 이 위에 칩 수백 개를 한꺼번에 만들어요. 현업은 지름 300 mm를 써요.'],
    ['plane100', '(100)면', '100 plane orientation 결정면 방향', 1, '결정을 자르는 방향의 이름이에요. 나무도 결 방향에 따라 단면이 다르듯, 이 방향으로 자르면 산화막과의 경계 흠집(Dit)이 가장 적어서 MOSFET에 유리해요.'],
    ['notch', '노치 (notch)', 'notch flat 플랫', 1, '웨이퍼 가장자리에 낸 작은 홈이에요. 장비가 웨이퍼 방향을 맞추는 표시예요. 예전 작은 웨이퍼는 한쪽을 평평하게 깎은 flat을 썼어요.'],
    ['interface', '계면', 'interface 경계', 1, '두 물질이 맞닿은 경계예요. 반도체에서는 주로 실리콘과 산화막 사이를 말해요.'],
    ['dit', 'Dit (계면 결함 밀도)', 'dit interface trap density 계면 트랩', 1, '계면에 생긴 흠집의 개수예요. 흠집이 전자를 붙잡아 트랜지스터를 느리고 불안정하게 만들어요.'],
    ['yield', '수율', 'yield 양품률', 1, '만든 칩 중 정상인 칩의 비율이에요. 100개 중 90개가 정상이면 수율 90%예요. 반도체 회사의 돈과 바로 이어져요.'],
    ['cop', 'COP', 'cop crystal originated particle 결정 결함', 1, '결정을 키울 때 생기는 아주 작은 빈 구멍 결함이에요.'],
    ['oxyprecip', '산소 석출', 'oxygen precipitate 석출물', 1, '실리콘 속 산소가 뭉쳐서 생긴 알갱이예요. 너무 많으면 결함이 돼요.'],
    ['disloc', '선결함 (전위)', 'dislocation 전위', 1, '원자 줄이 한 줄 어긋난 결함이에요.'],
    ['power', '전력 반도체 · SiC · GaN', 'power semiconductor sic gan 탄화규소 질화갈륨 wide bandgap 와이드 밴드갭', 2, '전기차·충전기처럼 높은 전압과 큰 전류를 다루는 칩이에요. 밴드갭이 넓은 SiC(약 3.3 eV)와 GaN(3.4 eV)을 써서 높은 전압에도 버텨요.'],
    ['rf', 'RF 소자 · III-V 화합물', 'rf iii-v gaas 화합물 반도체 통신', 2, '통신처럼 아주 빠른 신호를 다루는 칩이에요. 전자가 가벼워 빠른 GaAs 같은 III-V 화합물(주기율표 3족 + 5족)을 써요.'],
    ['strain', '응력 (Strain) 기술', 'strain stress 스트레인', 2, '결정을 살짝 늘이거나 눌러서 전자·정공이 더 빨리 달리게 하는 기술이에요. 고무줄을 당기면 성질이 바뀌는 것과 비슷하고, 90 nm 세대부터 표준이 됐어요.'],
    ['dopant', '도펀트', 'dopant 도핑 불순물 인 붕소 비소 phosphorus boron arsenic', 2, '일부러 넣는 불순물이에요. n형에는 인(P)·비소(As), p형에는 붕소(B)를 써요.']
  ]},
  { cat: '🌡️ 캐리어와 온도', notes: 'Note 3~5', items: [
    ['tcad', 'TCAD', 'tcad technology cad 시뮬레이션 simulation', 3, '반도체를 실제로 만들기 전에 컴퓨터로 미리 만들어 보는 가상 실험 프로그램이에요. 공정과 소자 물리를 계산해요.'],
    ['degen', '축퇴 영역', 'degenerate 축퇴 반도체', 4, '도핑을 너무 많이 해서 쉬운 근사식(볼츠만 근사)이 안 맞는 곳이에요. 소스/드레인·컨택이 여기에 해당해서 정밀한 계산 모드를 써야 해요.'],
    ['leak', '누설 전류', 'leakage current off current 리키지', 3, '스위치를 껐는데도 새는 전류예요. 잠근 수도꼭지에서 물이 똑똑 떨어지는 것과 같아요. 온도가 오르면 지수적으로(2배, 4배, 8배…) 늘어나요.'],
    ['hotrel', '고온 신뢰성', 'reliability high temperature 신뢰성', 3, '뜨거운 환경에서도 칩이 오래 버티는지예요. 서버·차량용 반도체의 큰 숙제예요.'],
    ['refresh', 'DRAM 리프레시', 'refresh dram', 4, 'DRAM 셀의 전하가 조금씩 새니까 주기적으로(보통 64 ms마다) 데이터를 다시 써 주는 작업이에요. 뜨거우면 더 빨리 새서 더 자주 해야 해요.'],
    ['extrinsic', '외인성 영역', 'extrinsic region 온도 구간', 5, '도펀트는 전자를 다 내놓았고, 열로 생기는 전자는 아직 적은 "딱 좋은 온도 구간"이에요. 모든 소자는 여기서 일하도록 설계해요. 차량용은 −40~150 °C를 보장해야 해요.'],
    ['counter', '카운터 도핑', 'counter doping compensation 보상 도핑', 5, 'n형·p형 도펀트를 섞어서 성질을 미세하게 조절하는 기술이에요. 짠 국에 물을 조금 타서 간을 맞추는 것과 비슷해요.'],
    ['implant', '이온주입', 'ion implantation implant 임플란트', 5, '도펀트 원자를 총알처럼 웨이퍼에 쏘아 넣는 공정이에요.'],
    ['anneal', '활성화 어닐링', 'anneal activation rta 열처리', 5, '쏘아 넣은 도펀트가 제자리를 찾아 일하도록 웨이퍼를 굽는 공정이에요. 부족하면 측정 저항이 설계값과 달라져요.']
  ]},
  { cat: '🏃 전류와 속도', notes: 'Note 6~7', items: [
    ['mobility', '이동도', 'mobility μ 뮤', 6, '전자가 얼마나 잘 달리는지예요. 곧 트랜지스터 속도예요.'],
    ['nmospmos', 'NMOS · PMOS', 'nmos pmos cmos', 6, '전자가 일하는 트랜지스터(NMOS)와 정공이 일하는 트랜지스터(PMOS)예요. 정공이 더 느려서 PMOS를 빠르게 하는 기술이 따로 필요해요.'],
    ['sige', 'SiGe 압축 응력', 'sige compressive stress embedded 실리콘저마늄', 6, '실리콘-저마늄을 옆에 심어 결정을 꾹 눌러서 PMOS의 정공을 빠르게 하는 기술이에요.'],
    ['tradeoff', '트레이드오프', 'tradeoff trade-off 채널 도핑', 6, '하나를 얻으면 하나를 잃는 관계예요. 채널 도핑을 늘리면 스위치 조절은 쉬워지지만 전자가 자주 부딪혀 느려져요.'],
    ['finfet', 'FinFET · GAA', 'finfet gaa mbcfet gate all around nanosheet 나노시트', 6, '채널을 지느러미(fin)처럼 세워 게이트가 3면을 감싸는 구조(FinFET), 4면을 모두 감싸는 구조(GAA, 삼성은 MBCFET)예요. 채널을 거의 도핑하지 않아요.'],
    ['wf', '일함수', 'work function φm 워크펑션', 6, '물질에서 전자를 밖으로 꺼내는 데 필요한 에너지예요. 게이트 금속의 일함수로 트랜지스터가 켜지는 전압을 맞춰요.'],
    ['vsat', '속도 포화', 'velocity saturation vsat', 6, '전압을 올려도 전자 속도가 일정 이상(약 10⁷ cm/s) 빨라지지 않는 현상이에요. 고속도로 제한 속도와 같아요.'],
    ['rs', '면저항 · 4-point probe', 'sheet resistance rs four point probe 4포인트', 7, '얇은 막의 저항(면저항)이에요. 바늘 4개를 꽂아 재는 장비(4-point probe)로 도핑이 잘 됐는지 매일 확인해요.'],
    ['dd', '드리프트-확산 방정식', 'drift diffusion equation', 7, '"바람에 밀려 가는 전자 + 퍼져 나가는 전자"를 함께 계산하는 식이에요. TCAD의 기본 엔진이에요.'],
    ['pd', '포토다이오드 · 이미지센서', 'photodiode image sensor cis', 7, '빛을 전기로 바꾸는 소자예요. 스마트폰 카메라 이미지센서의 픽셀 하나하나가 이것이에요.']
  ]},
  { cat: '🕳️ 트랩과 메모리', notes: 'Note 8', items: [
    ['trap', '트랩', 'trap 결함 준위 함정', 8, '결정 결함이 만든 "전자 함정"이에요. 전자를 붙잡았다 놓았다 하며 전류를 새게 해요.'],
    ['midgap', 'midgap 트랩 · 금속 오염', 'midgap contamination fe cu 철 구리 srh 오염', 8, '밴드갭 한가운데 생긴 함정이에요. 전자와 정공이 징검다리처럼 건너가 사라지기 쉬워 가장 해로워요. 철·구리 같은 금속 오염이 이런 트랩을 만들어서 팹에서 철저히 관리해요.'],
    ['retention', 'DRAM 리텐션', 'retention vrt 데이터 보존', 8, '메모리 셀이 데이터를 얼마나 오래 붙잡는지예요. 리텐션 문제의 뿌리는 트랩이에요.'],
    ['qfl', '준페르미 준위', 'quasi fermi level imref', 8, '빛이나 전압 때문에 전자와 정공의 균형이 깨졌을 때 둘을 따로 계산하는 도구예요. LED·레이저·태양전지·이미지센서 설계의 기본이에요.']
  ]},
  { cat: '🚧 pn 접합과 누설', notes: 'Note 9~12', items: [
    ['esd', 'ESD 보호 다이오드', 'esd electrostatic discharge 정전기', 9, '정전기가 칩을 태우지 않게 막는 안전장치예요. pn 접합으로 만들어요.'],
    ['sce', '단채널 효과', 'short channel effect sce 숏채널', 9, '트랜지스터가 너무 작아져서 생기는 부작용들을 묶어 부르는 말이에요.'],
    ['dibl', 'DIBL', 'dibl drain induced barrier lowering', 9, '드레인 전압이 소스 쪽 벽까지 낮춰서 스위치가 저절로 살짝 켜지는 현상이에요.'],
    ['punch', '펀치스루', 'punch through punchthrough', 9, '소스와 드레인의 공핍층이 맞닿아 전류가 제멋대로 흐르는 현상이에요. 둑이 무너진 것과 같아요.'],
    ['btbt', 'BTBT (밴드간 터널링)', 'btbt band to band tunneling', 9, '전기장이 너무 세면 전자가 벽을 뚫고 지나가 새는 현상이에요.'],
    ['gidl', 'GIDL', 'gidl gate induced drain leakage', 9, '게이트와 드레인이 겹치는 곳에서 BTBT로 새는 누설이에요. DRAM 리텐션을 나쁘게 해요.'],
    ['parasitic', '기생 커패시턴스', 'parasitic capacitance 접합 커패시턴스', 10, '원하지 않았는데 저절로 생긴 커패시터예요. 신호를 느리게 해서 접합 면적을 줄여 최소화해요.'],
    ['bv', '항복 전압', 'breakdown voltage avalanche zener 애벌랜치 제너', 10, '역방향 전압을 올리다가 갑자기 전류가 터지는 한계 전압이에요. 전력 소자와 ESD 설계의 핵심 사양이에요.'],
    ['ss', '서브스레숄드 스윙 · 60 mV/dec', 'subthreshold swing ss 60mv', 11, '꺼진 트랜지스터의 전류를 10배 늘리는 데 필요한 게이트 전압이에요. 상온에서 60 mV보다 작아질 수 없어서 칩 전압을 더 낮추기 어려워요.'],
    ['tfet', 'TFET', 'tfet tunnel fet 터널 트랜지스터', 11, '터널링을 이용해 60 mV/dec 한계를 넘으려는 차세대 트랜지스터예요.'],
    ['ideality', '이상 계수', 'ideality factor', 12, '실제 다이오드가 이상적인 식에서 얼마나 벗어났는지 나타내는 숫자(1~2)예요. 1에 가까울수록 트랩이 적은 좋은 소자예요.'],
    ['bgr', '밴드갭 기준 전압 회로', 'bandgap reference bgr', 12, '온도가 변해도 늘 같은 전압을 내는 회로예요. 다이오드가 온도에 민감한 성질을 거꾸로 이용해요.'],
    ['fn', 'FN 터널링 · 플래시 메모리', 'fowler nordheim fn tunneling flash', 12, '강한 전기장으로 전자를 얇은 절연막 너머로 밀어 넣는 현상이에요. 플래시 메모리가 데이터를 쓰고 지울 때 써요.']
  ]},
  { cat: '🔌 금속과 반도체 연결', notes: 'Note 13~14', items: [
    ['schottky', '쇼트키 다이오드', 'schottky diode sbd', 13, '금속과 반도체를 붙여 만든 다이오드예요. 스위칭이 빨라서 충전기와 SiC 전력 소자에 써요.'],
    ['pinning', '페르미 레벨 피닝', 'fermi level pinning', 13, '경계면 흠집 때문에 어떤 금속을 붙여도 벽 높이가 비슷하게 고정돼 버리는 문제예요. 금속 선택만으로는 해결이 안 돼요.'],
    ['rc', '컨택 저항', 'contact resistance rc 비접촉 저항 콘택', 14, '금속 배선과 트랜지스터가 만나는 연결부의 저항이에요. 첨단 공정의 핵심 병목이고, 목표는 약 10⁻⁹ Ω·cm²(면적당 저항, 작을수록 좋음)예요.'],
    ['parasiticR', '기생 저항', 'parasitic resistance external resistance', 14, '일은 안 하고 전기만 잡아먹는 저항이에요. 칩이 작아질수록 컨택 저항이 큰 몫을 차지해요.'],
    ['silicide', '실리사이드', 'silicide nisi tisi 실리사이드', 14, '금속과 실리콘을 반응시켜 만든 합금층이에요. 연결부의 벽을 낮춰 컨택 저항을 줄여요(예전 NiSi → 요즘 Ti 계열).'],
    ['laser', '레이저 어닐', 'laser anneal millisecond anneal msa', 14, '레이저로 아주 짧게 가열해서 도펀트를 활성화하는 기술이에요. 초고농도 도핑과 함께 컨택 저항을 낮춰요.'],
    ['mis', 'MIS 컨택', 'mis contact metal insulator semiconductor', 14, '금속과 반도체 사이에 아주 얇은 절연막을 끼워 피닝을 줄이는 방법이에요.'],
    ['tlm', 'TLM', 'tlm transfer length method', 14, '컨택 저항을 재는 표준 측정 방법이에요.']
  ]},
  { cat: '🚪 MOS와 문턱 전압', notes: 'Note 15~17', items: [
    ['gox', '게이트 산화막', 'gate oxide sio2 sion 절연막', 15, '게이트와 채널 사이의 얇은 절연막이에요. 얇을수록 조종력이 좋지만 SiO₂(SiON)를 약 1.2 nm 이하로 줄이자 터널링 누설이 폭증했어요.'],
    ['highk', 'High-k · HfO₂', 'high-k highk hfo2 하프늄 고유전율', 15, '유전율이 높은 새 절연막이에요. 두께는 두껍게 유지하면서 얇은 막처럼 동작해 누설을 줄여요.'],
    ['hkmg', 'HKMG', 'hkmg high-k metal gate 금속 게이트', 15, 'High-k 절연막 + 금속 게이트 조합이에요. Intel이 45 nm(2007)에서 처음 적용했고, 다른 업체는 대체로 32/28 nm 무렵부터 도입했어요.'],
    ['eot', 'EOT (등가 산화막 두께)', 'eot equivalent oxide thickness', 15, '"SiO₂로 치면 몇 nm짜리와 같다"는 환산 두께예요. 서로 다른 재료를 같은 기준으로 비교하는 성적표예요.'],
    ['qss', '산화막 고정 전하', 'fixed oxide charge qss 계면 트랩', 16, '산화막 속에 갇힌 전하예요. 트랜지스터가 켜지는 전압(V_T)을 흔드는 주범이에요.'],
    ['multivt', 'Multi-VT', 'multi vt multiple threshold lvt svt hvt', 16, '한 칩에 켜지는 전압이 다른 트랜지스터를 섞는 기술이에요. 빠른 곳엔 낮은 V_T, 전기를 아낄 곳엔 높은 V_T를 써요. TiN·TiAl 같은 금속의 일함수로 조절해요.'],
    ['vt', 'V_T (문턱 전압)', 'vt vth threshold voltage 문턱전압', 17, '트랜지스터가 켜지는 기준 전압이에요. 칩마다 들쭉날쭉한 정도(산포)를 관리하는 게 핵심이에요.'],
    ['cv', 'C–V 측정', 'cv c-v capacitance voltage 커패시턴스', 17, '전압을 바꿔 가며 커패시턴스를 재는 "게이트 산화막 건강검진"이에요. EOT·산화막 전하·Dit·도핑을 한 번에 알아내요.'],
    ['sram', 'SRAM Vmin', 'sram vmin 캐시 cache 최소 동작 전압', 17, 'CPU 안의 빠른 임시 메모리(SRAM)가 안정적으로 동작하는 최소 전압이에요. V_T 산포가 크면 Vmin이 올라가 전력이 늘고 수율이 떨어져요.'],
    ['nand', '3D NAND · 전하 트랩', '3d nand charge trap ctf ssd flash 플래시', 17, 'SSD용 메모리예요. 셀을 아파트처럼 위로 쌓고, 전하 트랩층에 전자를 넣었다 빼서 V_T를 옮기는 것 자체로 데이터를 저장해요.']
  ]},
  { cat: '⚡ MOSFET 전체 그림', notes: 'Note 18', items: [
    ['scaling', '미세화', 'scaling shrink 공정 노드 nm', 18, '트랜지스터(채널 길이 L)를 줄여 더 작고 빠르고 싸게 만드는 것이에요. 반도체 발전 공식 I ∝ (W/L)·μ·C_ox·(V_GS − V_T)²에서 L을 줄이는 방향이에요.'],
    ['clm', '채널 길이 변조', 'channel length modulation clm λ', 18, '드레인 전압이 커지면 실제 채널이 짧아져서 포화 구간 전류가 조금씩 더 늘어나는 현상이에요.'],
    ['bsim', 'BSIM', 'bsim spice compact model 컴팩트 모델', 18, '회로 설계자가 쓰는 표준 트랜지스터 모델이에요. 실제 소자의 복잡한 특성을 수식으로 담아 회로 시뮬레이터(SPICE)에 넣어요.']
  ]}
];

/* 면접·현업에서 가장 많이 나오는 키워드 TOP 10: [용어 id, 한 줄 요약] */
window.SEMI_GLOSSARY_TOP = [
  ['yield', '정상 칩 비율. 반도체 회사 돈과 직결'],
  ['leak', '꺼져도 새는 전류. 전력과 발열의 적'],
  ['vt', '트랜지스터가 켜지는 기준 전압. 산포 관리가 핵심'],
  ['retention', '셀이 데이터를 붙잡는 시간. 트랩·GIDL이 원인'],
  ['hkmg', '누설은 줄이고 게이트 조종력은 키운 기술 (성적표는 EOT)'],
  ['finfet', '채널을 3D로 감싸는 최신 트랜지스터 구조'],
  ['rc', '연결부 저항. 미세 공정의 핵심 병목'],
  ['dibl', '작아질수록 스위치가 제대로 안 꺼지는 문제'],
  ['cv', '산화막 건강검진, 경계면 흠집(Dit)까지 측정'],
  ['nand', 'V_T를 옮겨 데이터를 저장하는 SSD 메모리']
];
