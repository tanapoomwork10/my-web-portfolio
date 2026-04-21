/* ============================================================
   TERMINAL.JS
   Interactive terminal mini-game — type 'help' to see all commands
   ============================================================ */

// ════════════════════════════════════════
//  TERMINAL — all 4 projects + extras
// ════════════════════════════════════════
(function Terminal() {
  const out = document.getElementById('termOutput');
  const inp = document.getElementById('termInput');
  if (!out || !inp) return;

  let history = [], histIdx = -1;
  const L = (text, cls='out') => `<div class="term-line ${cls}">${text}</div>`;
  const E = () => `<div class="term-line empty"></div>`;

  const CMDS = {
    help: () => [
      L('Available commands:', 'accent'), E(),
      L('  whoami                     About Tanapoom'),
      L('  ls projects/               List all projects'),
      L('  meowmood                   AI emotion classifier'),
      L('  tales                      8-bit RPG game'),
      L('  netflix                    Data analytics dashboard'),
      L('  flexzone                   UX/UI mobile app'),
      L('  skills                     Technical skills'),
      L('  education                  Academic timeline'),
      L('  certs                      Certificates'),
      L('  ping contact               Contact info'),
      L('  sudo unlock                ???'),
      L('  clear                      Clear terminal'), E(),
    ].join(''),

    whoami: () => [E(),
      L('┌─[ OPERATOR PROFILE ]──────────────────────────┐','cyan'),
      L('│  Name   : Tanapoom Srikarn (ธนภูมิ ศรีกาญจน์) │','cyan'),
      L('│  Role   : CS Student, Year 4                  │','cyan'),
      L('│  School : Bangkok University                  │','cyan'),
      L('│  From   : Phuket, Thailand 🇹🇭                │','cyan'),
      L('│  Goal   : Make Thailand #1 in Cybersecurity   │','cyan'),
      L('└────────────────────────────────────────────────┘','cyan'), E(),
    ].join(''),

    'ls projects/': () => [E(),
      L('drwxr-xr-x  <span style="color:#8B5CF6">meowmood/</span>                [AI/ML]    82.42% accuracy'),
      L('drwxr-xr-x  <span style="color:#10B981">tales-of-redemption/</span>     [Game]     37 testers, 197 pages'),
      L('drwxr-xr-x  <span style="color:#F59E0B">netflix-analytics/</span>       [Data]     3K+ insights'),
      L('drwxr-xr-x  <span style="color:#EC4899">flexzone/</span>                [UX/UI]    15 screens'), E(),
      L('Tip: type "cat &lt;name&gt;" to view project details','accent'), E(),
    ].join(''),

    'cat meowmood': () => [E(),
      L('┌─[ PROJECT: MeowMood ]──────────────────────────┐','purple'),
      L('│  Type    : AI / Machine Learning               │','purple'),
      L('│  Stack   : Python, TensorFlow, ResNet50        │','purple'),
      L('│  Dataset : 5,651 images (Roboflow v2)          │','purple'),
      L('│  Phase 1 : val_accuracy 0.7818 (head only)     │','purple'),
      L('│  Phase 2 : val_accuracy 0.8242 (fine-tuned)    │','purple'),
      L('│  Test    : F1-Score 0.80 (4 classes)           │','purple'),
      L('│  Status  : DEPLOYED ✓ Streamlit Cloud          │','purple'),
      L('│  Classes : Angry · Neutral · Relaxed · Scared  │','purple'),
      L('└─────────────────────────────────────────────────┘','purple'), E(),
    ].join(''),

    'cat tales-of-redemption': () => [E(),
      L('┌─[ PROJECT: Tales of Redemption ]───────────────┐','green'),
      L('│  Type    : Game Development (8-bit RPG)        │','green'),
      L('│  Engine  : Godot Engine + GDScript             │','green'),
      L('│  Art     : Custom Pixel Art — Pixquare on iPad │','green'),
      L('│  Audio   : Audacity + Epidemic Sound           │','green'),
      L('│  Zones   : 4 (Forest, River, Mine, Village)    │','green'),
      L('│  System  : NPC Dialog Tree + Quest Chain       │','green'),
      L('│  Ending  : Dual (ESG quiz ≥5/6 → survive)     │','green'),
      L('│  Testers : 37 playtesters                      │','green'),
      L('│  Docs    : 197-page academic report            │','green'),
      L('│  AI      : RayCast2D enemy chase + Navigation2D│','green'),
      L('└─────────────────────────────────────────────────┘','green'), E(),
    ].join(''),

    'cat netflix-analytics': () => [E(),
      L('┌─[ PROJECT: Netflix Analytics ]─────────────────┐','accent'),
      L('│  Type    : Data Analytics Dashboard            │','accent'),
      L('│  Stack   : Power BI, Python, TMDb API, DAX     │','accent'),
      L('│  Data    : 24 years of films (2000–2024)       │','accent'),
      L('│  Join    : Left Outer — TMDb ⋈ Netflix CSV     │','accent'),
      L('│  KPIs    : ROI, Profit, Trending count         │','accent'),
      L('│  Finds   : 3,000+ high-quality films not on NF │','accent'),
      L('│  Top     : Western genre avg profit ฿85.24M    │','accent'),
      L('│  Slicers : 8 (genre, year, rating, country…)   │','accent'),
      L('└─────────────────────────────────────────────────┘','accent'), E(),
    ].join(''),

    'cat flexzone': () => [E(),
      L('┌─[ PROJECT: FlexZone ]──────────────────────────┐','pink'),
      L('│  Type    : UX / UI Design                      │','pink'),
      L('│  Tool    : Figma                               │','pink'),
      L('│  Screens : 15 high-fidelity screens            │','pink'),
      L('│  Flow    : Onboarding → Browse → Checkout      │','pink'),
      L('│  Pricing : Daily / Monthly / Yearly            │','pink'),
      L('│  Checkout: 5-Step (date, address, payment)     │','pink'),
      L('│  Tiers   : Basic / Premium membership          │','pink'),
      L('│  Payment : Card, Bank Transfer, PayPal, QR     │','pink'),
      L('│  Extra   : Home Space Management (+฿650)       │','pink'),
      L('│  Workout : Content hub for members             │','pink'),
      L('└─────────────────────────────────────────────────┘','pink'), E(),
    ].join(''),

    skills: () => [E(),
      L('[ AI & ML ]','purple'),
      L('  Python · TensorFlow · Keras · ResNet50 · Transfer Learning · Streamlit'),
      E(),
      L('[ DATA & ANALYTICS ]','accent'),
      L('  Power BI · DAX · Power Query · Pandas · TMDb API · ETL'),
      E(),
      L('[ DESIGN ]','pink'),
      L('  Figma · UX/UI · Pixel Art · Pixquare · Prototyping'),
      E(),
      L('[ GAME DEV ]','green'),
      L('  Godot Engine · GDScript · TileMap · State Machine · RayCast2D'),
      E(),
      L('[ SECURITY & CLOUD ]','cyan'),
      L('  AWS Cloud · Blockchain · Crypto · Risk Assessment · Digital Assets'),
      E(),
    ].join(''),

    education: () => [E(),
      L('Academic Timeline','cyan'),
      L('────────────────────────────────────────────────'),
      L('  Phuket School    Chalerm Phra Kiat (High School)'),
      L('  2022 (Y1)        Bangkok University — CS'),
      L('  2024 (Y2-3)      FlexZone UX/UI · Forex/Crypto'),
      L('  2025             MeowMood AI · AWS Cert · Chatbot Cert'),
      L('  2025–26          Netflix Analytics Dashboard'),
      L('  2026 (Y4 NOW)    Tales of Redemption · Google UX Cert'),
      L('  FUTURE           Thailand #1 Cybersecurity 🇹🇭','accent'),
      L('────────────────────────────────────────────────'), E(),
    ].join(''),

    certs: () => [E(),
      L('[ CERTIFICATES ]','cyan'),
      L('  🟠 AWS Academy Cloud Foundations      (Nov 2025 · 20h)'),
      L('  🔵 Foundations of UX Design [Google]  (Apr 2026)'),
      L('  🟢 Build Chatbot Python+ChatGPT        (Feb 2025)'), E(),
      L('Tip: scroll to Certificates section and click to view details','accent'), E(),
    ].join(''),

    'ping contact': () => [E(),
      L('PING contact.tanapoom.srikarn ...','cyan'),
      L('Response: &lt;1ms ✓','success'), E(),
      L('📧 Contact info coming soon — add to index.html','accent'), E(),
    ].join(''),

    'sudo unlock': () => [E(),
      L('[sudo] password for tanapoom: '),
      L('Authenticating... ████████████ 100%','accent'), E(),
      L('ACCESS GRANTED ✓','success'),
      L('"Fortune favors those who dare." — T.Srikarn','cyan'),
      L('"อย่ายอมแพ้ต่ออะไรทั้งนั้น 🔥"','cyan'),
      L('"Nothing is impossible — T.Srikarn"','cyan'), E(),
    ].join(''),
  };

  function boot() {
    return [
      L('╔══════════════════════════════════════════════════╗','cyan'),
      L('║    T.SRIKARN PORTFOLIO  ·  TERMINAL v2.0         ║','cyan'),
      L('╚══════════════════════════════════════════════════╝','cyan'), E(),
      L('Type <span style="color:#00E5FF">help</span> to see all available commands.'), E(),
    ].join('');
  }

  function print(html) {
    out.insertAdjacentHTML('beforeend', html);
    out.scrollTop = out.scrollHeight;
  }

  // Aliases: allow short names without "cat"
  const ALIASES = {
    'meowmood':  'cat meowmood',
    'tales':     'cat tales-of-redemption',
    'netflix':   'cat netflix-analytics',
    'flexzone':  'cat flexzone',
    'projects':  'ls projects/',
    'unlock':    'sudo unlock',
  };

  function run(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    history.unshift(raw); histIdx = -1;

    print(`<div class="term-line"><span style="color:#00E5FF">tanapoom@portfolio</span><span style="color:#3F4E63">:~$</span> <span style="color:#F1F5F9">${raw}</span></div>`);

    if (cmd === 'clear') { out.innerHTML = boot(); return; }

    // Resolve alias first
    const resolved = ALIASES[cmd] || cmd;
    const fn = CMDS[resolved];
    if (fn) {
      print(fn());
    } else {
      // Partial match on both CMDS and ALIASES
      const closeAlias = Object.keys(ALIASES).find(k => k.startsWith(cmd) && k !== cmd);
      const closeCmd   = Object.keys(CMDS).find(k => k.includes(cmd));
      const close = closeAlias ? ALIASES[closeAlias] : closeCmd;
      if (close) {
        print(L(`Did you mean: <span style="color:#00E5FF">${ALIASES[closeAlias] || close}</span>?`, 'accent') + E());
      } else {
        print(L(`bash: ${raw}: command not found. Type <span style="color:#00E5FF">help</span>`, 'error') + E());
      }
    }
  }

  inp.addEventListener('keydown', e => {
    if (e.key === 'Enter') { run(inp.value); inp.value = ''; }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); if (histIdx < history.length-1) histIdx++; inp.value = history[histIdx] || ''; }
    else if (e.key === 'ArrowDown') { e.preventDefault(); if (histIdx > 0) histIdx--; inp.value = history[histIdx] || ''; }
    else if (e.key === 'Tab')       { e.preventDefault(); const v = inp.value.toLowerCase(); const mA = Object.keys(ALIASES).find(k => k.startsWith(v) && k !== v); const mC = Object.keys(CMDS).find(k => k.startsWith(v) && k !== v); if (mA) inp.value = mA; else if (mC) inp.value = mC; }
  });

  document.querySelectorAll('.hint-chip').forEach(c => {
    c.addEventListener('click', () => { run(c.dataset.cmd); inp.value = ''; inp.focus(); });
  });
  document.getElementById('terminalSection')?.addEventListener('click', () => inp.focus());
  out.innerHTML = boot();
})();
