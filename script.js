// ============================================================
//  TRAXIFY — script.js
//  Lost Phone Tracker | College Project
// ============================================================

// ============================================================
//  PAGE NAVIGATION
// ============================================================
function go(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Remove active from all nav links
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  // Show selected page
  document.getElementById('page-' + page).classList.add('active');
  // Set active nav link
  const navLink = document.getElementById('nl-' + page);
  if (navLink) navLink.classList.add('active');
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Load search results when search page opens
  if (page === 'search') renderResults(allData, 'all', '');
}

function toggleMenu() {
  document.getElementById('mob').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mob').classList.remove('open');
}

// ============================================================
//  TOAST NOTIFICATION
// ============================================================
function toast(msg, icon = '✅') {
  document.getElementById('t-msg').textContent = msg;
  document.getElementById('t-icon').textContent = icon;
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ============================================================
//  HELPER FUNCTIONS
// ============================================================

// Generate random Case ID
function genId(prefix) {
  return prefix + '-' + (Math.floor(Math.random() * 9000) + 1000);
}

// Validate a field and show/hide error
function valFld(id, condition, errId) {
  const el = document.getElementById(id);
  const er = document.getElementById(errId);
  if (!condition) {
    el.classList.add('err');
    er.style.display = 'block';
    return false;
  }
  el.classList.remove('err');
  er.style.display = 'none';
  return true;
}

// Clear error from a field
function clrErr(id, errId) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('err');
  const er = document.getElementById(errId);
  if (er) er.style.display = 'none';
}

// ============================================================
//  REPORT LOST PHONE FORM
// ============================================================
function submitRep() {
  const name  = document.getElementById('r-name').value.trim();
  const phone = document.getElementById('r-phone').value.trim();
  const brand = document.getElementById('r-brand').value;
  const model = document.getElementById('r-model').value.trim();
  const imei  = document.getElementById('r-imei').value.trim();
  const loc   = document.getElementById('r-loc').value.trim();
  const date  = document.getElementById('r-date').value;

  let ok = true;
  ok &= valFld('r-name',  name.length >= 2,          'e-rname');
  ok &= valFld('r-phone', /^\d{10}$/.test(phone),    'e-rphone');
  ok &= valFld('r-brand', brand !== '',               'e-rbrand');
  ok &= valFld('r-model', model.length >= 2,          'e-rmodel');
  ok &= valFld('r-imei',  /^\d{15}$/.test(imei),     'e-rimei');
  ok &= valFld('r-loc',   loc.length >= 3,            'e-rloc');
  ok &= valFld('r-date',  date !== '',                'e-rdate');

  if (!ok) {
    toast('Please fix the errors above', '⚠️');
    return;
  }

  // Generate Case ID and show success screen
  const caseId = genId('TRX');
  document.getElementById('gen-id').textContent = caseId;
  document.getElementById('rep-form').style.display = 'none';
  document.getElementById('rep-suc').style.display  = 'block';
  toast('Case registered: ' + caseId, '✅');
}

function resetRep() {
  document.getElementById('rep-form').style.display = 'block';
  document.getElementById('rep-suc').style.display  = 'none';
  // Clear all fields
  document.getElementById('rep-form')
    .querySelectorAll('input, select, textarea')
    .forEach(el => { el.value = ''; el.classList.remove('err'); });
  // Hide all error messages
  document.querySelectorAll('.err-msg').forEach(e => e.style.display = 'none');
  // Reset date to today
  document.getElementById('r-date').value = new Date().toISOString().split('T')[0];
}

// ============================================================
//  FOUND PHONE FORM
// ============================================================
function submitFnd() {
  const name  = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const loc   = document.getElementById('f-loc').value.trim();

  let ok = true;
  ok &= valFld('f-name',  name.length >= 2,       'e-fname');
  ok &= valFld('f-phone', /^\d{10}$/.test(phone), 'e-fphone');
  ok &= valFld('f-loc',   loc.length >= 3,         'e-floc');

  if (!ok) {
    toast('Please fill required fields', '⚠️');
    return;
  }

  const caseId = genId('FND');
  document.getElementById('fnd-id').textContent    = caseId;
  document.getElementById('fnd-form').style.display = 'none';
  document.getElementById('fnd-suc').style.display  = 'block';
  toast('Found phone reported: ' + caseId, '🤝');
}

function resetFnd() {
  document.getElementById('fnd-form').style.display = 'block';
  document.getElementById('fnd-suc').style.display  = 'none';
  document.getElementById('fnd-form')
    .querySelectorAll('input, select, textarea')
    .forEach(el => { el.value = ''; el.classList.remove('err'); });
}

// ============================================================
//  SEARCH DATABASE
// ============================================================

// Sample phone data
const allData = [
  { id: 'TRX-2847', model: 'Samsung Galaxy S23',  brand: 'Samsung',  color: 'Phantom Black',    imei: '352873051284756', loc: 'New Delhi, Connaught Place', date: 'Apr 18, 2025', status: 'lost'  },
  { id: 'TRX-2846', model: 'iPhone 15 Pro',        brand: 'Apple',    color: 'Natural Titanium', imei: '359812047362819', loc: 'Mumbai, Dadar Station',      date: 'Apr 17, 2025', status: 'inv'   },
  { id: 'TRX-2845', model: 'OnePlus 12',           brand: 'OnePlus',  color: 'Silky Black',      imei: '861537049182736', loc: 'Bangalore, MG Road',         date: 'Apr 16, 2025', status: 'found' },
  { id: 'TRX-2844', model: 'Redmi Note 13',        brand: 'Xiaomi',   color: 'Arctic White',     imei: '357294062948371', loc: 'Chennai, T Nagar',           date: 'Apr 15, 2025', status: 'lost'  },
  { id: 'TRX-2843', model: 'Realme 12 Pro',        brand: 'Realme',   color: 'Submarine Blue',   imei: '864729013847562', loc: 'Hyderabad, Charminar',       date: 'Apr 14, 2025', status: 'found' },
  { id: 'TRX-2842', model: 'Vivo V30',             brand: 'Vivo',     color: 'Dreamy White',     imei: '356281047392018', loc: 'Pune, FC Road',              date: 'Apr 13, 2025', status: 'inv'   },
  { id: 'TRX-2841', model: 'Nothing Phone 2',      brand: 'Nothing',  color: 'White',            imei: '863741029475836', loc: 'Ahmedabad, CG Road',         date: 'Apr 12, 2025', status: 'lost'  },
];

// Emoji map for brands
const brandEmoji = {
  'Samsung': '🖤', 'Apple': '🍎', 'OnePlus': '🔴',
  'Xiaomi': '🟡',  'Realme': '🔵', 'Vivo': '💜', 'Nothing': '⚪'
};

// Status labels and CSS classes
const statusLabel = { lost: 'Lost', found: 'Found', inv: 'Investigating' };
const statusClass = { lost: 'b-lost', found: 'b-found', inv: 'b-inv' };

let curFilter = 'all';

// Render filtered results
function renderResults(data, filter, query) {
  const container = document.getElementById('s-res');
  const filtered = data.filter(p => {
    const matchFilter = filter === 'all' || p.status === filter;
    const matchQuery  = !query
      || p.model.toLowerCase().includes(query)
      || p.imei.includes(query)
      || p.brand.toLowerCase().includes(query)
      || p.id.toLowerCase().includes(query)
      || p.loc.toLowerCase().includes(query);
    return matchFilter && matchQuery;
  });

  if (!filtered.length) {
    container.innerHTML = `
      <div class="empty">
        <div class="ei">🔍</div>
        <p>No phones found. Try a different keyword or IMEI.</p>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="res-card">
      <div class="res-thumb">${brandEmoji[p.brand] || '📱'}</div>
      <div class="res-info">
        <h4>${p.model}</h4>
        <p>📍 ${p.loc} &nbsp;·&nbsp; IMEI: ${p.imei.substring(0, 6)}•••••••••</p>
        <p style="margin-top:3px;font-size:0.74rem;color:var(--muted);">
          Case: ${p.id} &nbsp;·&nbsp; Color: ${p.color}
        </p>
      </div>
      <div class="res-meta">
        <span class="badge ${statusClass[p.status]}">${statusLabel[p.status]}</span>
        <div class="res-date">${p.date}</div>
      </div>
    </div>
  `).join('');
}

// Search button click
function doSearch() {
  const query = document.getElementById('s-inp').value.toLowerCase();
  renderResults(allData, curFilter, query);
}

// Filter chip click
function filterBy(filter, btn) {
  document.querySelectorAll('.filters .chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  curFilter = filter;
  const query = document.getElementById('s-inp')?.value.toLowerCase() || '';
  renderResults(allData, filter, query);
}

// ============================================================
//  TRACK CASE STATUS
// ============================================================

// Sample case data with timeline
const caseDB = {
  'TRX-2847': {
    id: 'TRX-2847', phone: 'Samsung Galaxy S23', loc: 'New Delhi, CP',
    date: 'Apr 18, 2025', upd: 'Today', status: 'lost',
    timeline: [
      { icon: '📝', label: 'Report Filed',      desc: 'Case registered in the system',       time: 'Apr 18, 2025 · 10:32 AM', done: true  },
      { icon: '🔍', label: 'Under Review',       desc: 'Team is verifying the details',       time: 'Apr 18, 2025 · 11:00 AM', done: true  },
      { icon: '📡', label: 'Database Search',    desc: 'IMEI cross-checked with found phones', time: 'In Progress',              act: true   },
      { icon: '📱', label: 'Phone Located',      desc: 'Waiting for match confirmation',      time: 'Pending',                  done: false },
      { icon: '✅', label: 'Case Closed',        desc: 'Phone returned to owner',             time: 'Pending',                  done: false },
    ]
  },
  'TRX-2846': {
    id: 'TRX-2846', phone: 'iPhone 15 Pro', loc: 'Mumbai, Dadar',
    date: 'Apr 17, 2025', upd: 'Yesterday', status: 'inv',
    timeline: [
      { icon: '📝', label: 'Report Filed',       desc: 'Case registered in the system',       time: 'Apr 17, 2025 · 9:15 AM',  done: true  },
      { icon: '🔍', label: 'Under Review',        desc: 'Team verified the details',           time: 'Apr 17, 2025 · 9:45 AM',  done: true  },
      { icon: '📡', label: 'Investigation Started', desc: 'Local authorities notified',        time: 'Apr 17, 2025 · 2:00 PM',  done: true  },
      { icon: '📱', label: 'Lead Identified',     desc: 'Verification pending',                time: 'In Progress',              act: true   },
      { icon: '✅', label: 'Case Closed',         desc: 'Phone returned to owner',             time: 'Pending',                  done: false },
    ]
  },
  'TRX-2845': {
    id: 'TRX-2845', phone: 'OnePlus 12', loc: 'Bangalore, MG Road',
    date: 'Apr 16, 2025', upd: 'Apr 17, 2025', status: 'found',
    timeline: [
      { icon: '📝', label: 'Report Filed',       desc: 'Case registered',                            time: 'Apr 16, 2025 · 3:22 PM',  done: true },
      { icon: '🔍', label: 'Under Review',        desc: 'Team verified the details',                  time: 'Apr 16, 2025 · 4:00 PM',  done: true },
      { icon: '📡', label: 'Match Found',         desc: 'IMEI matched with a found phone',            time: 'Apr 16, 2025 · 7:18 PM',  done: true },
      { icon: '📱', label: 'Phone Located',       desc: 'At Indiranagar Police Station',              time: 'Apr 17, 2025 · 10:00 AM', done: true },
      { icon: '✅', label: 'Case Closed',         desc: 'Owner notified. Ready for pickup.',          time: 'Apr 17, 2025 · 11:30 AM', done: true },
    ]
  }
};

function trackCase() {
  const input = document.getElementById('t-inp').value.trim().toUpperCase();
  const data  = caseDB[input];

  // Hide both result panels first
  document.getElementById('t-result').style.display   = 'none';
  document.getElementById('t-notfound').style.display = 'none';

  if (!data) {
    document.getElementById('t-notfound').style.display = 'block';
    return;
  }

  // Fill case details
  document.getElementById('t-caseid').textContent = data.id;
  document.getElementById('t-phone').textContent  = data.phone;
  document.getElementById('t-loc').textContent    = data.loc;
  document.getElementById('t-date').textContent   = data.date;
  document.getElementById('t-upd').textContent    = data.upd;

  // Status badge
  const badge = document.getElementById('t-badge');
  badge.textContent = statusLabel[data.status];
  badge.className   = 'badge ' + statusClass[data.status];

  // Build timeline HTML
  document.getElementById('t-tl').innerHTML = data.timeline.map(item => `
    <div class="tl-item">
      <div class="tl-dot ${item.done ? 'done' : ''} ${item.act ? 'act' : ''}">${item.icon}</div>
      <div class="tl-cnt">
        <h4 style="color:${item.done || item.act ? 'var(--text)' : 'var(--muted)'}">${item.label}</h4>
        <p>${item.desc}</p>
        <p class="tl-time">${item.time}</p>
      </div>
    </div>
  `).join('');

  document.getElementById('t-result').style.display = 'block';
  toast('Case found: ' + data.id, '📊');
}

// ============================================================
//  LIVE VALIDATION — Clear errors on typing
// ============================================================
const reportFields = ['r-name', 'r-phone', 'r-brand', 'r-model', 'r-imei', 'r-loc', 'r-date'];
const foundFields  = ['f-name', 'f-phone', 'f-loc'];

reportFields.forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', () => clrErr(id, 'e-' + id));
});

foundFields.forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', () => clrErr(id, 'e-' + id));
});

// ============================================================
//  INITIALISE ON PAGE LOAD
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('r-date').value = today;
  document.getElementById('f-date').value = today;
  renderResults(allData, 'all', '');
});
