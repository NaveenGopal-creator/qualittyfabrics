const IMG = 'https://www.qualittyfabrics.in/u/1541541623923348/g/i/';
const CERT = {
  bci:    IMG+'bci-certified-textile-fabrics-manufacturers-in-perundurai-erode-tamilnadu-india.webp',
  oeko:   IMG+'oeko-tex-certified-textile-fabrics-manufacturers-in-perundurai-erode-tamilnadu-india.webp',
  supima: IMG+'supima-certified-textile-fabrics-manufacturers-in-perundurai-erode-tamilnadu-india.webp',
  gots:   IMG+'gots-organic-certified-textile-fabrics-manufacturers-in-perundurai-erode-tamilnadu-india.webp',
  logo:   IMG+'qualitty-fabrics-logo.webp',
};

/* ── NAV ── */
function buildNav(activePage) {
  const pages = [
    { href:'index.html',    label:'Home' },
    { href:'about.html',    label:'About Us' },
    { href:'products.html', label:'Products' },
    { href:'gallery.html',  label:'Gallery' },
    { href:'contact.html',  label:'Contact Us' },
  ];
  const links = pages.map(p =>
    `<li><a href="${p.href}" class="${activePage===p.label?'active':''} ${p.label==='Contact Us'?'nav-cta':''}">${p.label}</a></li>`
  ).join('');
  return `
  <nav id="navbar">
    <a href="index.html" class="nav-logo">
      <img src="${CERT.logo}" alt="Qualitty Fabrics Logo" onerror="this.style.display='none'">
      Qualitty <span>Fabrics</span>
    </a>
    <ul class="nav-links" id="navLinks">${links}</ul>
    <div class="hamburger" onclick="document.getElementById('navLinks').classList.toggle('open')">
      <span></span><span></span><span></span>
    </div>
  </nav>`;
}

/* ── FOOTER ── */
function buildFooter() {
  return `
  <footer>
    <div class="footer-grid">
      <div>
        <a href="index.html" class="footer-logo">
          <img src="${CERT.logo}" alt="logo" onerror="this.style.display='none'">
          Qualitty <span>Fabrics</span>
        </a>
        <p class="footer-tagline">Leading textile fabric manufacturer in Perundurai, Erode, Tamil Nadu — serving global markets with certified quality since 2004.</p>
        <div style="margin-top:1.5rem;display:flex;gap:.8rem;align-items:center;flex-wrap:wrap;">
          <img src="${CERT.bci}"    alt="BCI"     style="height:40px;border-radius:4px;" onerror="this.style.display='none'">
          <img src="${CERT.oeko}"   alt="OEKO-TEX" style="height:40px;border-radius:4px;" onerror="this.style.display='none'">
          <img src="${CERT.supima}" alt="Supima"   style="height:40px;border-radius:4px;" onerror="this.style.display='none'">
          <img src="${CERT.gots}"   alt="GOTS"     style="height:40px;border-radius:4px;" onerror="this.style.display='none'">
        </div>
      </div>
      <div>
        <div class="footer-heading">Products</div>
        <ul class="footer-links">
          <li><a href="products.html#multilayer">MultiLayer Fabrics</a></li>
          <li><a href="products.html#dobby">Dobby Fabrics</a></li>
          <li><a href="products.html#jacquard">Jacquard Fabrics</a></li>
          <li><a href="products.html#yarndyed">Yarn Dyed Fabrics</a></li>
          <li><a href="products.html#stripesatin">Stripe Satin Fabrics</a></li>
          <li><a href="products.html#satin">Satin Fabrics</a></li>
          <li><a href="products.html#special">Special Fabrics</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-heading">Company</div>
        <ul class="footer-links">
          <li><a href="about.html">About Us</a></li>
          <li><a href="about.html#certs">Certifications</a></li>
          <li><a href="gallery.html">Gallery</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-heading">Contact</div>
        <ul class="footer-links">
          <li>108–C, Railway Station Road,<br>Perundurai, TN – 638052</li>
          <li style="margin-top:.5rem"><a href="tel:+919715988111">📞 +91 97159 88111</a></li>
          <li><a href="https://wa.me/919715988111" target="_blank">💬 WhatsApp</a></li>
          <li><a href="mailto:info@qualittyfabrics.in">✉️ info@qualittyfabrics.in</a></li>
          <li style="margin-top:.5rem"><a href="contact.html" class="btn-primary" style="font-size:.75rem;padding:.5rem 1rem;">Get a Quote</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Qualitty Fabrics, Perundurai, Tamil Nadu, India. All rights reserved.</span>
      <span><a href="https://www.qualittyfabrics.in" style="color:inherit;">www.qualittyfabrics.in</a></span>
    </div>
  </footer>`;
}

/* ══════════════════════════════════════════
   AI CHAT WIDGET — draggable, Claude-powered
   ══════════════════════════════════════════ */
function buildAIChat() {
  return `
  <style>
    /* ── AI CHAT CONTAINER ── */
    #qf-chat-wrap {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
      user-select: none;
    }

    /* ── CHAT WINDOW ── */
    #qf-chat-window {
      width: 360px;
      background: #0f1f38;
      border: 1px solid rgba(201,168,76,.35);
      border-radius: 16px;
      box-shadow: 0 24px 60px rgba(0,0,0,.55);
      display: none;
      flex-direction: column;
      overflow: hidden;
      max-height: 520px;
      animation: qfSlideUp .25s ease;
      cursor: default;
    }
    #qf-chat-window.open { display: flex; }
    @keyframes qfSlideUp {
      from { opacity:0; transform:translateY(12px); }
      to   { opacity:1; transform:none; }
    }

    /* ── HEADER (drag handle) ── */
    #qf-chat-header {
      background: linear-gradient(135deg, #0a1628, #162646);
      border-bottom: 1px solid rgba(201,168,76,.2);
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: grab;
      flex-shrink: 0;
    }
    #qf-chat-header:active { cursor: grabbing; }
    .qf-avatar {
      width: 36px; height: 36px;
      background: linear-gradient(135deg, #c9a84c, #e2c97e);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
    }
    .qf-header-info { flex: 1; }
    .qf-header-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1rem; font-weight: 700;
      color: #fff; line-height: 1.2;
    }
    .qf-header-status {
      font-size: .68rem; color: rgba(255,255,255,.55);
      display: flex; align-items: center; gap: .3rem;
    }
    .qf-status-dot {
      width: 7px; height: 7px;
      border-radius: 50%; background: #4ade80;
      animation: qfPulseGreen 2s infinite;
    }
    @keyframes qfPulseGreen {
      0%,100% { opacity:1; } 50% { opacity:.4; }
    }
    .qf-close-btn {
      background: none; border: none; color: rgba(255,255,255,.5);
      font-size: 1.2rem; cursor: pointer; padding: 0 2px;
      line-height: 1; transition: color .2s;
    }
    .qf-close-btn:hover { color: #c9a84c; }

    /* ── QUICK CHIPS ── */
    #qf-chips {
      padding: 10px 14px 0;
      display: flex; gap: 6px; flex-wrap: wrap;
      flex-shrink: 0;
    }
    .qf-chip {
      background: rgba(201,168,76,.12);
      border: 1px solid rgba(201,168,76,.3);
      color: #c9a84c;
      font-size: .7rem; font-weight: 600;
      padding: .3rem .7rem;
      border-radius: 20px;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      transition: background .2s, color .2s;
      white-space: nowrap;
    }
    .qf-chip:hover { background: #c9a84c; color: #0a1628; }

    /* ── MESSAGES ── */
    #qf-messages {
      flex: 1;
      overflow-y: auto;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      scroll-behavior: smooth;
    }
    #qf-messages::-webkit-scrollbar { width: 4px; }
    #qf-messages::-webkit-scrollbar-track { background: transparent; }
    #qf-messages::-webkit-scrollbar-thumb { background: rgba(201,168,76,.3); border-radius: 4px; }

    .qf-msg {
      display: flex;
      gap: 8px;
      align-items: flex-end;
      animation: qfMsgIn .2s ease;
    }
    @keyframes qfMsgIn {
      from { opacity:0; transform:translateY(6px); }
      to   { opacity:1; transform:none; }
    }
    .qf-msg.user { flex-direction: row-reverse; }
    .qf-msg-avatar {
      width: 28px; height: 28px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: .75rem; flex-shrink: 0;
    }
    .qf-msg.bot .qf-msg-avatar  { background: linear-gradient(135deg,#c9a84c,#e2c97e); }
    .qf-msg.user .qf-msg-avatar { background: rgba(255,255,255,.12); color:#fff; }
    .qf-bubble {
      max-width: 80%;
      padding: 9px 13px;
      border-radius: 14px;
      font-size: .82rem;
      line-height: 1.6;
      font-family: 'Inter', sans-serif;
    }
    .qf-msg.bot  .qf-bubble { background: rgba(255,255,255,.07); color: #f0eee9; border-bottom-left-radius: 4px; }
    .qf-msg.user .qf-bubble { background: #c9a84c; color: #0a1628; font-weight: 500; border-bottom-right-radius: 4px; }
    .qf-typing {
      display: flex; align-items: center; gap: 4px;
      padding: 10px 13px;
      background: rgba(255,255,255,.07);
      border-radius: 14px; border-bottom-left-radius: 4px;
      width: fit-content;
    }
    .qf-typing span {
      width: 6px; height: 6px;
      border-radius: 50%; background: #c9a84c;
      animation: qfBounce 1.2s infinite;
    }
    .qf-typing span:nth-child(2) { animation-delay: .2s; }
    .qf-typing span:nth-child(3) { animation-delay: .4s; }
    @keyframes qfBounce {
      0%,60%,100% { transform:translateY(0); }
      30%          { transform:translateY(-5px); }
    }

    /* ── INPUT ── */
    #qf-input-row {
      border-top: 1px solid rgba(255,255,255,.07);
      padding: 10px 12px;
      display: flex;
      gap: 8px;
      align-items: center;
      flex-shrink: 0;
    }
    #qf-input {
      flex: 1;
      background: rgba(255,255,255,.07);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 22px;
      padding: 9px 14px;
      color: #fff;
      font-size: .82rem;
      font-family: 'Inter', sans-serif;
      outline: none;
      transition: border-color .2s;
    }
    #qf-input:focus { border-color: #c9a84c; }
    #qf-input::placeholder { color: rgba(255,255,255,.35); }
    #qf-send-btn {
      width: 36px; height: 36px;
      background: #c9a84c;
      border: none; border-radius: 50%;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      transition: background .2s, transform .15s;
    }
    #qf-send-btn:hover { background: #e2c97e; transform: scale(1.08); }
    #qf-send-btn svg { width:16px; height:16px; fill:#0a1628; }

    /* ── TOGGLE BUTTON ── */
    #qf-toggle {
      width: 58px; height: 58px;
      background: linear-gradient(135deg, #c9a84c, #e2c97e);
      border: none; border-radius: 50%;
      cursor: grab;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 6px 24px rgba(201,168,76,.45);
      transition: transform .2s, box-shadow .2s;
      position: relative;
      font-size: 1.5rem;
    }
    #qf-toggle:active { cursor: grabbing; }
    #qf-toggle:hover { transform: scale(1.1); box-shadow: 0 8px 32px rgba(201,168,76,.6); }
    .qf-toggle-badge {
      position: absolute;
      top: -4px; right: -4px;
      width: 18px; height: 18px;
      background: #4ade80;
      border-radius: 50%;
      border: 2px solid #0a1628;
      animation: qfPulseGreen 2s infinite;
    }

    @media(max-width:420px){
      #qf-chat-window { width: calc(100vw - 32px); }
      #qf-chat-wrap { right: 16px; bottom: 16px; }
    }
  </style>

  <div id="qf-chat-wrap">
    <!-- Chat window -->
    <div id="qf-chat-window">
      <div id="qf-chat-header">
        <div class="qf-avatar">🧵</div>
        <div class="qf-header-info">
          <div class="qf-header-name">Qualitty Fabrics AI</div>
          <div class="qf-header-status"><span class="qf-status-dot"></span> Online — Ask anything</div>
        </div>
        <button class="qf-close-btn" onclick="qfToggleChat()">✕</button>
      </div>

      <!-- Quick chips -->
      <div id="qf-chips">
        <span class="qf-chip" onclick="qfChip(this)">Our fabric types</span>
        <span class="qf-chip" onclick="qfChip(this)">Certifications</span>
        <span class="qf-chip" onclick="qfChip(this)">Get a sample</span>
        <span class="qf-chip" onclick="qfChip(this)">Minimum order</span>
        <span class="qf-chip" onclick="qfChip(this)">Export & shipping</span>
      </div>

      <!-- Messages -->
      <div id="qf-messages">
        <div class="qf-msg bot">
          <div class="qf-msg-avatar">🧵</div>
          <div class="qf-bubble">👋 Hello! Welcome to <strong>Qualitty Fabrics</strong>.<br><br>I'm your AI assistant — I can answer questions about our fabrics, certifications, pricing, samples, and more. How can I help you today?</div>
        </div>
      </div>

      <!-- Input -->
      <div id="qf-input-row">
        <input id="qf-input" type="text" placeholder="Ask about our fabrics..." autocomplete="off"
          onkeydown="if(event.key==='Enter')qfSend()">
        <button id="qf-send-btn" onclick="qfSend()">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>

    <!-- Toggle button -->
    <button id="qf-toggle" onclick="qfToggleChat()" title="Chat with Qualitty Fabrics AI">
      🧵
      <span class="qf-toggle-badge"></span>
    </button>
  </div>`;
}

/* ── AI CHAT LOGIC ── */

// ═══════════════════════════════════════════════════
//  🔑 YOUR GOOGLE GEMINI API KEY — HARDCODED BELOW
//  Get free key: https://aistudio.google.com/app/apikey
// ═══════════════════════════════════════════════════
// API calls go through /api/chat (Vercel serverless function)
// Key lives in Vercel Environment Variables — safe to push to GitHub
const QF_CHAT_ENDPOINT = '/api/chat';

const QF_SYSTEM = `You are a helpful AI customer assistant for Qualitty Fabrics, a premium textile manufacturer in Perundurai, Erode, Tamil Nadu, India.

COMPANY:
- Address: 108-C Railway Station Road, Perundurai, Erode, TN 638052
- Phone: +91 97159 88111
- Email: info@qualittyfabrics.in
- Founded: 2004 | 20+ years experience
- Looms: Sulzer Looms and Airjet Looms

FABRICS WE MAKE:
1. MultiLayer Fabrics - 2 to 5 layers, custom GSM, technical and industrial use
2. Dobby Fabrics - 100% cotton or blends, 60 to 200 GSM, geometric woven patterns
3. Jacquard Fabrics - intricate woven motifs, multi-color, luxury grade
4. Yarn Dyed Fabrics - high color fastness, checks stripes plaids, reactive dyed
5. Stripe Satin Fabrics - high sheen, soft hand feel, bedding and fashion
6. Satin Fabrics - 300 to 600 thread count, fluid drape, luxury bedding and eveningwear
7. Textile Special Fabrics - custom constructions for specialist applications

CERTIFICATIONS:
- BCI Member No: 1003786
- OEKO-TEX No: 1801001 Centexbel
- Supima License: R38FWHT1
- GOTS Organic No: EGL/217560/GOTS

RULES:
- Be warm, helpful, professional and concise
- For pricing say it depends on quantity and specs, ask them to contact us
- For samples say they are available and direct to contact form or phone
- For orders say minimum order quantities vary by fabric type, contact us for details
- Never invent prices or delivery times
- Always suggest a next step at the end`;

let qfHistory  = [];
let qfIsOpen   = false;
let qfIsTyping = false;

/* ── RATE LIMIT: stay under 15 req/min free tier ── */
const qfReqLog   = [];
const QF_MAX_RPM = 13;
const QF_WIN_MS  = 62000;

function qfThrottle() {
  const now = Date.now();
  while (qfReqLog.length && now - qfReqLog[0] > QF_WIN_MS) qfReqLog.shift();
  if (qfReqLog.length < QF_MAX_RPM) return 0;
  return (QF_WIN_MS - (now - qfReqLog[0])) + 500;
}
function qfRecordReq() { qfReqLog.push(Date.now()); }

function qfShowCountdown(ms) {
  qfRemoveTyping();
  const msgs = document.getElementById('qf-messages');
  const div  = document.createElement('div');
  div.className = 'qf-msg bot';
  div.id = 'qf-typing-indicator';
  div.innerHTML = '<div class="qf-msg-avatar">🧵</div>'
    + '<div class="qf-bubble" style="background:rgba(201,168,76,.1);color:#c9a84c;font-size:.8rem">'
    + '⏳ Just a moment — replying in <strong id="qf-cd">' + Math.ceil(ms/1000) + '</strong>s…'
    + '</div>';
  msgs.appendChild(div);
  qfScrollBottom();
  const end  = Date.now() + ms;
  const tick = setInterval(() => {
    const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
    const el   = document.getElementById('qf-cd');
    if (el) el.textContent = left;
    if (left <= 0) { clearInterval(tick); qfRemoveTyping(); qfShowTyping(); }
  }, 500);
}

function qfToggleChat() {
  const win = document.getElementById('qf-chat-window');
  qfIsOpen = !qfIsOpen;
  win.classList.toggle('open', qfIsOpen);
  if (qfIsOpen) {
    setTimeout(() => { const i = document.getElementById('qf-input'); if(i) i.focus(); }, 300);
    qfScrollBottom();
  }
}

function qfChip(el) {
  const t = el.textContent.trim();
  const inp = document.getElementById('qf-input');
  if (inp) inp.value = t;
  qfSend();
}

function qfScrollBottom() {
  const m = document.getElementById('qf-messages');
  if (m) m.scrollTop = m.scrollHeight;
}

function qfAddMessage(role, html) {
  const msgs = document.getElementById('qf-messages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = 'qf-msg ' + role;
  div.innerHTML = '<div class="qf-msg-avatar">' + (role === 'bot' ? '🧵' : '👤') + '</div>'
    + '<div class="qf-bubble">' + html + '</div>';
  msgs.appendChild(div);
  qfScrollBottom();
}

function qfShowTyping() {
  const msgs = document.getElementById('qf-messages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = 'qf-msg bot';
  div.id = 'qf-typing-indicator';
  div.innerHTML = '<div class="qf-msg-avatar">🧵</div><div class="qf-typing"><span></span><span></span><span></span></div>';
  msgs.appendChild(div);
  qfScrollBottom();
}

function qfRemoveTyping() {
  const el = document.getElementById('qf-typing-indicator');
  if (el) el.remove();
}

async function qfCallGemini(contents) {
  console.log('[QF] Calling proxy:', QF_CHAT_ENDPOINT);

  let res, data;
  try {
    res  = await fetch(QF_CHAT_ENDPOINT, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ contents })
    });
    data = await res.json();
  } catch (netErr) {
    console.error('[QF] Network error:', netErr.message);
    throw new Error('NETWORK_ERROR');
  }

  console.log('[QF] Proxy response HTTP', res.status, data);

  // Rate limited — show countdown and signal caller to retry
  if (res.status === 429) {
    const wait = (data.retryAfter || 65) * 1000;
    qfReqLog.length = 0;
    qfRemoveTyping();
    qfShowCountdown(wait);
    await new Promise(r => setTimeout(r, wait));
    qfShowTyping();
    // Auto-retry once after wait
    try {
      const r2   = await fetch(QF_CHAT_ENDPOINT, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ contents })
      });
      const d2 = await r2.json();
      if (r2.ok && d2.reply) return { reply: d2.reply };
    } catch(e2) { /* fall through */ }
    return { rateLimited: true };
  }

  if (res.status === 403) throw new Error('INVALID_API_KEY');
  if (!res.ok || data.error) throw new Error(data.error || 'HTTP ' + res.status);
  if (!data.reply)           throw new Error('Empty response from proxy');

  return { reply: data.reply };
}

async function qfSend() {
  const input = document.getElementById('qf-input');
  const text  = input ? input.value.trim() : '';
  if (!text || qfIsTyping) return;

  // Key is stored server-side — no check needed here

  input.value = '';
  qfAddMessage('user', text);
  qfHistory.push({ role: 'user', content: text });
  qfIsTyping = true;

  // Throttle check
  const wait = qfThrottle();
  if (wait > 0) {
    qfShowCountdown(wait);
    await new Promise(r => setTimeout(r, wait));
  } else {
    qfShowTyping();
  }

  // Build contents array for Gemini
  const contents = [
    { role: 'user',  parts: [{ text: QF_SYSTEM + '\n\nPlease confirm you are ready to help.' }] },
    { role: 'model', parts: [{ text: 'Ready! I am the Qualitty Fabrics AI assistant.' }] }
  ];
  qfHistory.slice(0, -1).forEach(m => {
    contents.push({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] });
  });
  contents.push({ role: 'user', parts: [{ text: text }] });

  // Call with up to 3 retries
  let attempts = 0;
  while (attempts < 3) {
    attempts++;
    try {
      qfRecordReq();
      const result = await qfCallGemini(contents);

      // rateLimited is now handled inside qfCallGemini with auto-retry
      if (result && result.rateLimited) {
        // Shouldn't reach here, but just in case
        qfRemoveTyping();
        qfAddMessage('bot', 'Still rate limited. Please wait a minute and try again.');
        break;
      }

      qfRemoveTyping();
      const reply = result.reply;
      qfAddMessage('bot', reply.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>'));
      qfHistory.push({ role: 'assistant', content: reply });
      if (qfHistory.length > 14) qfHistory = qfHistory.slice(-14);
      break;

    } catch (err) {
      console.error('[QF] Attempt', attempts, 'failed:', err.message);
      if (attempts < 3) {
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }
      qfRemoveTyping();
      let errMsg = 'Sorry, something went wrong. Please contact us at <strong>info@qualittyfabrics.in</strong> or call <strong>+91 97159 88111</strong>.';
      if (err.message === 'INVALID_API_KEY' || err.message.includes('403')) {
        errMsg = '⚠️ Invalid API key. Please check your key at <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:#c9a84c">AI Studio</a>.';
      } else if (err.message === 'ALL_MODELS_FAILED') {
        errMsg = 'Our AI is temporarily unavailable. Please contact us directly at <strong>info@qualittyfabrics.in</strong> or call <strong>+91 97159 88111</strong>.';
      } else if (err.message === 'NETWORK_ERROR' || err.message.includes('fetch') || err.message.includes('Failed')) {
        errMsg = '⚠️ Network error. Check your internet connection and try again.';
      }
      qfAddMessage('bot', errMsg);
    }
  }

  qfIsTyping = false;
}

/* ── DRAGGABLE ── */
function initDraggable() {
  const wrap   = document.getElementById('qf-chat-wrap');
  const toggle = document.getElementById('qf-toggle');
  const header = document.getElementById('qf-chat-header');

  let dragging = false, startX, startY, startRight, startBottom;

  function dragStart(e) {
    dragging = true;
    const touch = e.touches ? e.touches[0] : e;
    startX = touch.clientX;
    startY = touch.clientY;
    const rect = wrap.getBoundingClientRect();
    startRight  = window.innerWidth  - rect.right;
    startBottom = window.innerHeight - rect.bottom;
    e.preventDefault();
  }

  function dragMove(e) {
    if (!dragging) return;
    const touch = e.touches ? e.touches[0] : e;
    const dx = startX - touch.clientX;
    const dy = startY - touch.clientY;
    const newRight  = Math.max(8, Math.min(window.innerWidth  - 66, startRight  + dx));
    const newBottom = Math.max(8, Math.min(window.innerHeight - 66, startBottom + dy));
    wrap.style.right  = newRight  + 'px';
    wrap.style.bottom = newBottom + 'px';
  }

  function dragEnd() { dragging = false; }

  // Drag from toggle button
  toggle.addEventListener('mousedown',  dragStart);
  toggle.addEventListener('touchstart', dragStart, { passive: false });

  // Drag from chat header too
  if (header) {
    header.addEventListener('mousedown',  dragStart);
    header.addEventListener('touchstart', dragStart, { passive: false });
  }

  document.addEventListener('mousemove', dragMove);
  document.addEventListener('touchmove', dragMove, { passive: false });
  document.addEventListener('mouseup',   dragEnd);
  document.addEventListener('touchend',  dragEnd);
}

/* ── INIT PAGE ── */
function initPage(activePage) {
  document.getElementById('nav-slot').innerHTML    = buildNav(activePage);
  document.getElementById('footer-slot').innerHTML = buildFooter();
  // Replace wa-slot with AI chat widget
  const waSlot = document.getElementById('wa-slot');
  if (waSlot) waSlot.outerHTML = buildAIChat();
  else document.body.insertAdjacentHTML('beforeend', buildAIChat());

  // Scroll reveal
  const obs = new IntersectionObserver(
    e => e.forEach(x => x.isIntersecting && x.target.classList.add('visible')),
    { threshold: .1 }
  );
  document.querySelectorAll('.reveal').forEach(r => obs.observe(r));

  // Nav scroll effect
  window.addEventListener('scroll', () => {
    const n = document.getElementById('navbar');
    if (n) n.style.background = window.scrollY > 60 ? 'rgba(10,22,40,.99)' : 'rgba(10,22,40,.96)';
  });

  // Init draggable after DOM ready
  setTimeout(initDraggable, 100);
}
