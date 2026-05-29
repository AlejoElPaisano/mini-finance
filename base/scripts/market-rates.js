// ============================================================
// market-rates.js — Cotizaciones del Mercado · Mini Finance
// APIs:
//   Conversión  → exchangerate-api.com (sin key, CORS abierto)
//   Histórico   → frankfurter.app (solo monedas del BCE)
//   Cripto      → CoinGecko
// ============================================================

// ── Constantes ───────────────────────────────────────────────

const CRYPTO_IDS = ['bitcoin', 'ethereum', 'solana', 'binancecoin'];

const CURRENCIES = {
  USD: { name: 'Dólar Estadounidense', flag: '🇺🇸', symbol: '$'  },
  EUR: { name: 'Euro',                  flag: '🇪🇺', symbol: '€'  },
  ARS: { name: 'Peso Argentino',        flag: '🇦🇷', symbol: '$'  },
  BRL: { name: 'Real Brasileño',        flag: '🇧🇷', symbol: 'R$' },
  GBP: { name: 'Libra Esterlina',       flag: '🇬🇧', symbol: '£'  },
  JPY: { name: 'Yen Japonés',           flag: '🇯🇵', symbol: '¥'  },
  MXN: { name: 'Peso Mexicano',         flag: '🇲🇽', symbol: '$'  },
  CLP: { name: 'Peso Chileno',          flag: '🇨🇱', symbol: '$'  },
  UYU: { name: 'Peso Uruguayo',         flag: '🇺🇾', symbol: '$'  },
};

// Monedas soportadas por frankfurter (historial)
// ARS, BRL, MXN, CLP, UYU no están — usamos USD como proxy
const FRANKFURTER_SUPPORTED = ['USD','EUR','GBP','JPY','CHF','CAD','AUD','SEK','NOK','DKK'];

// Referencia al chart activo para destruirlo antes de crear uno nuevo
let forexChart = null;

// ── Utilidades ───────────────────────────────────────────────

function formatNumber(n, decimals = 2) {
  if (n === null || n === undefined) return '—';
  return n.toLocaleString('es-AR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatLargeNumber(n) {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9)  return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6)  return `$${(n / 1e6).toFixed(2)}M`;
  return `$${formatNumber(n)}`;
}

function changeClass(value) {
  if (value > 0) return 'positive';
  if (value < 0) return 'negative';
  return 'neutral';
}

function changeArrow(value) {
  if (value > 0) return '▲';
  if (value < 0) return '▼';
  return '—';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Genera las últimas N fechas en formato YYYY-MM-DD
function lastNDates(n) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (n - 1 - i));
    return d.toISOString().split('T')[0];
  });
}

// ── Selectores del DOM ────────────────────────────────────────

const dom = {
  tabBtns:       () => document.querySelectorAll('.mkt-tab'),
  tabPanels:     () => document.querySelectorAll('.mkt-panel'),

  cryptoGrid:    () => document.getElementById('crypto-grid'),
  cryptoError:   () => document.getElementById('crypto-error'),
  cryptoUpdated: () => document.getElementById('crypto-updated'),

  formForex:     () => document.getElementById('forex-form'),
  inputAmount:   () => document.getElementById('forex-amount'),
  selectFrom:    () => document.getElementById('forex-from'),
  selectTo:      () => document.getElementById('forex-to'),
  btnSwap:       () => document.getElementById('forex-swap'),
  resultBox:     () => document.getElementById('forex-result'),
  forexError:    () => document.getElementById('forex-form-error'),
  forexUpdated:  () => document.getElementById('forex-updated'),
  chartSection:  () => document.getElementById('forex-chart-section'),
  chartCanvas:   () => document.getElementById('forex-chart'),
  chartTitle:    () => document.getElementById('forex-chart-title'),
  chartLoading:  () => document.getElementById('forex-chart-loading'),
  chartError:    () => document.getElementById('forex-chart-error'),

  errorAmount:   () => document.getElementById('error-amount'),
  errorFrom:     () => document.getElementById('error-from'),
  errorTo:       () => document.getElementById('error-to'),
};

// ── Tabs ──────────────────────────────────────────────────────

function initTabs() {
  const tabs   = dom.tabBtns();
  const panels = dom.tabPanels();

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabs.forEach(t => {
        t.classList.remove('mkt-tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => {
        p.hidden = true;
        p.classList.remove('mkt-panel--active');
      });

      btn.classList.add('mkt-tab--active');
      btn.setAttribute('aria-selected', 'true');

      const panel = document.getElementById(`panel-${target}`);
      if (panel) {
        panel.hidden = false;
        panel.classList.add('mkt-panel--active');
      }
    });
  });
}

// ── CRIPTO — CoinGecko ────────────────────────────────────────

async function loadCrypto() {
  const grid  = dom.cryptoGrid();
  const error = dom.cryptoError();
  if (!grid) return;

  grid.innerHTML = `
    <div class="mkt-loading" aria-live="polite">
      <span class="mkt-spinner" aria-hidden="true"></span>
      Cargando cotizaciones…
    </div>`;

  try {
    const ids = CRYPTO_IDS.join(',');
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    renderCryptoCards(data);
    if (error) error.hidden = true;

    const updated = dom.cryptoUpdated();
    if (updated) updated.textContent = `Actualizado: ${new Date().toLocaleTimeString('es-AR')}`;

  } catch (err) {
    console.error('CoinGecko error:', err);
    grid.innerHTML = '';
    if (error) {
      error.hidden = false;
      error.textContent = 'No se pudieron cargar las cotizaciones. Revisá tu conexión e intentá de nuevo.';
    }
  }
}

function renderCryptoCards(coins) {
  const grid = dom.cryptoGrid();
  if (!grid) return;
  grid.innerHTML = '';

  coins.forEach((coin, i) => {
    const change = coin.price_change_percentage_24h ?? 0;
    const cls    = changeClass(change);
    const arrow  = changeArrow(change);

    const card = document.createElement('article');
    card.className = 'card mkt-crypto-card';
    card.style.animationDelay = `${i * 80}ms`;
    card.setAttribute('aria-label', `${coin.name}: $${formatNumber(coin.current_price)} USD`);

    card.innerHTML = `
      <div class="mkt-crypto-card__header">
        <img src="${escapeHtml(coin.image)}" alt="${escapeHtml(coin.name)}"
          class="mkt-crypto-card__icon" width="32" height="32" loading="lazy"/>
        <div>
          <p class="mkt-crypto-card__name">${escapeHtml(coin.name)}</p>
          <p class="mkt-crypto-card__symbol">${escapeHtml(coin.symbol.toUpperCase())}</p>
        </div>
      </div>
      <p class="mkt-crypto-card__price">$${formatNumber(coin.current_price)}</p>
      <p class="mkt-crypto-card__change mkt-change--${cls}">
        <span aria-hidden="true">${arrow}</span>
        ${Math.abs(change).toFixed(2)}% (24h)
      </p>
      <dl class="mkt-crypto-card__meta">
        <div><dt>Cap. de mercado</dt><dd>${formatLargeNumber(coin.market_cap)}</dd></div>
        <div><dt>Volumen 24h</dt><dd>${formatLargeNumber(coin.total_volume)}</dd></div>
      </dl>`;

    grid.appendChild(card);
  });
}

// ── FOREX — Conversión (exchangerate-api.com) ─────────────────
// Esta API es pública, sin key y con CORS abierto.
// Devuelve todas las tasas desde una moneda base de una vez.

async function fetchForexRate(from, to) {
  if (from === to) return 1;

  const url = `https://api.exchangerate-api.com/v4/latest/${from}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  const rate = data.rates[to];
  if (!rate) throw new Error(`Moneda ${to} no encontrada`);
  return rate;
}

// ── FOREX — Histórico (frankfurter.app) ──────────────────────
// frankfurter solo soporta monedas del BCE.
// Si la moneda no está soportada, usamos USD como proxy
// y aclaramos en el título del gráfico.

async function loadForexHistory(from, to) {
  const chartSection = dom.chartSection();
  const chartLoading = dom.chartLoading();
  const chartError   = dom.chartError();
  const chartTitle   = dom.chartTitle();

  if (!chartSection) return;

  // Mostrar la sección del gráfico, ocultar el placeholder
  chartSection.hidden = false;
  const placeholder = document.getElementById('forex-chart-placeholder');
  if (placeholder) placeholder.hidden = true;
  if (chartLoading) chartLoading.hidden = false;
  if (chartError)   chartError.hidden   = true;

  // Destruir chart anterior si existe
  if (forexChart) {
    forexChart.destroy();
    forexChart = null;
  }

  // Decidir qué par mostrar en el historial
  const histFrom = FRANKFURTER_SUPPORTED.includes(from) ? from : 'USD';
  const histTo   = FRANKFURTER_SUPPORTED.includes(to)   ? to   : 'EUR';
  const isProxy  = histFrom !== from || histTo !== to;

  const endDate   = new Date().toISOString().split('T')[0];
  const startDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 29);
    return d.toISOString().split('T')[0];
  })();

  try {
    const url = `https://api.frankfurter.app/${startDate}..${endDate}?from=${histFrom}&to=${histTo}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const labels = Object.keys(data.rates).sort();
    const values = labels.map(date => data.rates[date][histTo]);

    // Título descriptivo
    if (chartTitle) {
      chartTitle.textContent = isProxy
        ? `Histórico ${histFrom}/${histTo} — 30 días (referencia para ${from}/${to})`
        : `Histórico ${from}/${to} — 30 días`;
    }

    renderForexChart(labels, values, histFrom, histTo);

  } catch (err) {
    console.error('Frankfurter history error:', err);
    if (chartError) {
      chartError.hidden = false;
      chartError.textContent = 'No se pudo cargar el historial del par seleccionado.';
    }
  } finally {
    if (chartLoading) chartLoading.hidden = true;
  }
}

function renderForexChart(labels, values, from, to) {
  const canvas = dom.chartCanvas();
  if (!canvas) return;

  // Formatear fechas en etiquetas cortas (DD/MM)
  const shortLabels = labels.map(d => {
    const [, month, day] = d.split('-');
    return `${day}/${month}`;
  });

  const first = values[0];
  const last  = values[values.length - 1];
  const isUp  = last >= first;

  // Color dinámico según tendencia
  const lineColor = isUp
    ? getComputedStyle(document.documentElement).getPropertyValue('--success-border').trim() || '#16a34a'
    : getComputedStyle(document.documentElement).getPropertyValue('--danger-border').trim()  || '#dc2626';

  const ctx = canvas.getContext('2d');

  // Gradiente de área bajo la línea
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.offsetHeight || 260);
  gradient.addColorStop(0, lineColor + '33');
  gradient.addColorStop(1, lineColor + '00');

  forexChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: shortLabels,
      datasets: [{
        label: `${from}/${to}`,
        data: values,
        borderColor: lineColor,
        borderWidth: 2,
        backgroundColor: gradient,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: lineColor,
        fill: true,
        tension: 0.35,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: getComputedStyle(document.documentElement)
            .getPropertyValue('--bg-surface').trim() || '#1e293b',
          borderColor: getComputedStyle(document.documentElement)
            .getPropertyValue('--border-default').trim() || 'rgba(255,255,255,0.12)',
          borderWidth: 1,
          titleColor: getComputedStyle(document.documentElement)
            .getPropertyValue('--fg-tertiary').trim() || '#94a3b8',
          bodyColor: getComputedStyle(document.documentElement)
            .getPropertyValue('--fg-primary').trim() || '#f8fafc',
          padding: 10,
          callbacks: {
            label: ctx => ` ${formatNumber(ctx.parsed.y, 4)} ${to}`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: getComputedStyle(document.documentElement)
              .getPropertyValue('--fg-muted').trim() || '#64748b',
            font: { size: 11 },
            maxTicksLimit: 8,
          },
          border: { display: false },
        },
        y: {
          position: 'right',
          grid: {
            color: getComputedStyle(document.documentElement)
              .getPropertyValue('--border-subtle').trim() || 'rgba(255,255,255,0.06)',
          },
          ticks: {
            color: getComputedStyle(document.documentElement)
              .getPropertyValue('--fg-muted').trim() || '#64748b',
            font: { size: 11 },
            callback: v => formatNumber(v, 4),
          },
          border: { display: false },
        },
      },
    },
  });
}

// ── FOREX — Validación y submit ───────────────────────────────

function validateForexForm() {
  let valid = true;

  const amount  = dom.inputAmount();
  const from    = dom.selectFrom();
  const to      = dom.selectTo();
  const errAmt  = dom.errorAmount();
  const errFrom = dom.errorFrom();
  const errTo   = dom.errorTo();

  [amount, from, to].forEach(el => {
    el?.closest('.form-group')?.classList.remove('is-error');
  });
  [errAmt, errFrom, errTo].forEach(el => { if (el) el.textContent = ''; });

  const amountVal = parseFloat(amount?.value);
  if (!amount?.value || isNaN(amountVal) || amountVal <= 0) {
    amount?.closest('.form-group')?.classList.add('is-error');
    if (errAmt) errAmt.textContent = 'Ingresá un monto válido mayor a 0.';
    valid = false;
  }

  if (!from?.value) {
    from?.closest('.form-group')?.classList.add('is-error');
    if (errFrom) errFrom.textContent = 'Seleccioná la moneda de origen.';
    valid = false;
  }

  if (!to?.value) {
    to?.closest('.form-group')?.classList.add('is-error');
    if (errTo) errTo.textContent = 'Seleccioná la moneda de destino.';
    valid = false;
  }

  if (from?.value && to?.value && from.value === to.value) {
    to?.closest('.form-group')?.classList.add('is-error');
    if (errTo) errTo.textContent = 'Elegí una moneda diferente a la de origen.';
    valid = false;
  }

  return valid;
}

async function handleForexSubmit(e) {
  e.preventDefault();
  if (!validateForexForm()) return;

  const btn    = dom.formForex()?.querySelector('button[type="submit"]');
  const result = dom.resultBox();
  const error  = dom.forexError();

  if (btn)    btn.classList.add('is-loading');
  if (result) { result.hidden = true; result.classList.remove('mkt-result--visible'); }
  if (error)  error.hidden = true;

  const amount = parseFloat(dom.inputAmount().value);
  const from   = dom.selectFrom().value;
  const to     = dom.selectTo().value;

  try {
    const rate      = await fetchForexRate(from, to);
    const converted = amount * rate;

    const fromInfo     = CURRENCIES[from] || { symbol: '', name: from };
    const toInfo       = CURRENCIES[to]   || { symbol: '', name: to };
    const toDecimals   = ['JPY', 'CLP', 'ARS'].includes(to)   ? 0 : 2;
    const fromDecimals = ['JPY', 'CLP', 'ARS'].includes(from) ? 0 : 2;

    if (result) {
      result.innerHTML = `
        <p class="mkt-result__label">Resultado de la conversión</p>
        <p class="mkt-result__conversion">
          <span class="mkt-result__from">${fromInfo.symbol}${formatNumber(amount, fromDecimals)} ${from}</span>
          <span class="mkt-result__arrow" aria-hidden="true">→</span>
          <span class="mkt-result__to">${toInfo.symbol}${formatNumber(converted, toDecimals)} ${to}</span>
        </p>
        <p class="mkt-result__rate">Tasa: 1 ${from} = ${toInfo.symbol}${formatNumber(rate, 4)} ${to}</p>`;
      result.hidden = false;
      requestAnimationFrame(() => result.classList.add('mkt-result--visible'));
    }

    const updated = dom.forexUpdated();
    if (updated) updated.textContent = `Tasa obtenida: ${new Date().toLocaleTimeString('es-AR')}`;

    // Cargar historial para el gráfico
    loadForexHistory(from, to);

  } catch (err) {
    console.error('ExchangeRate error:', err);
    if (error) {
      error.hidden = false;
      error.textContent = 'No se pudo obtener la tasa de cambio. Revisá tu conexión e intentá de nuevo.';
    }
  } finally {
    if (btn) btn.classList.remove('is-loading');
  }
}

function handleSwap() {
  const from = dom.selectFrom();
  const to   = dom.selectTo();
  if (!from || !to) return;

  [from.value, to.value] = [to.value, from.value];

  const result = dom.resultBox();
  if (result) {
    result.classList.remove('mkt-result--visible');
    setTimeout(() => { result.hidden = true; }, 250);
  }

  // Ocultar gráfico al invertir (se regenera en el próximo submit)
  const chartSection = dom.chartSection();
  if (chartSection) chartSection.hidden = true;
  if (forexChart) { forexChart.destroy(); forexChart = null; }
}

function initForexForm() {
  const form = dom.formForex();
  const swap = dom.btnSwap();
  if (form) form.addEventListener('submit', handleForexSubmit);
  if (swap) swap.addEventListener('click', handleSwap);
}

// ── Init ──────────────────────────────────────────────────────

function initMarketRates() {
  initTabs();
  loadCrypto();
  initForexForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMarketRates);
} else {
  initMarketRates();
}