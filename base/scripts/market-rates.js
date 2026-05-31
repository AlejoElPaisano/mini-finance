// ============================================================
// market-rates.js — Cotizaciones del Mercado · Mini Finance
// APIs:
//   Conversión  → exchangerate-api.com (sin key, CORS abierto)
//   Cripto      → CoinGecko
//   Historial   → FastForex /time-series (API key en env.js)
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

// ── FastForex — dashboard histórico ──────────────────────────

const FASTFOREX_BASE = 'https://api.fastforex.io';
const HISTORY_DAYS   = 30;

// Referencias vivas para re-renderizar el gráfico al cambiar de tema
let historyChart   = null;
let historyContext = null;
let discoveredMaxDays = null; // tope de días que permite el plan (trial = 14)
let historyRequestId  = 0;    // descarta respuestas de cargas que quedaron viejas

// Locale español para los ejes y tooltips de ApexCharts
const APEX_LOCALE_ES = {
  name: 'es',
  options: {
    months: ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
    shortMonths: ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'],
    days: ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'],
    shortDays: ['dom','lun','mar','mié','jue','vie','sáb'],
    toolbar: {
      exportToSVG: 'Descargar SVG', exportToPNG: 'Descargar PNG', exportToCSV: 'Descargar CSV',
      menu: 'Menú', selection: 'Selección', selectionZoom: 'Zoom', zoomIn: 'Acercar',
      zoomOut: 'Alejar', pan: 'Desplazar', reset: 'Restablecer',
    },
  },
};

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

// Decimales adaptativos según la magnitud de la tasa
function rateDecimals(value) {
  const abs = Math.abs(value);
  if (abs >= 100) return 2;
  if (abs >= 1)   return 4;
  return 6;
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
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

// Lee un token CSS desde body (donde vive la clase .dark-mode)
function cssVar(name, fallback) {
  const value = getComputedStyle(document.body).getPropertyValue(name).trim();
  return value || fallback;
}

// ── Selectores del DOM ────────────────────────────────────────

const dom = {
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

  errorAmount:   () => document.getElementById('error-amount'),
  errorFrom:     () => document.getElementById('error-from'),
  errorTo:       () => document.getElementById('error-to'),
};

const historyDom = {
  panel:   () => document.getElementById('history-panel'),
  data:    () => document.getElementById('history-data'),
  eyebrow: () => document.querySelector('#history-data .mkt-history__eyebrow'),
  rate:    () => document.getElementById('history-rate'),
  pair:    () => document.getElementById('history-pair'),
  delta:   () => document.getElementById('history-delta'),
  chart:   () => document.getElementById('history-chart'),
  foot:    () => document.getElementById('history-foot'),
  loading: () => document.getElementById('history-loading'),
  error:   () => document.getElementById('history-error'),
  message: () => document.getElementById('history-message'),
};

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

// ── FOREX — Conversión ────────────────────────────────────────

async function fetchForexRate(from, to) {
  if (from === to) return 1;
  const res  = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const rate = data.rates[to];
  if (!rate) throw new Error(`Moneda ${to} no encontrada`);
  return rate;
}

// ── HISTORIAL — Estados del panel ─────────────────────────────

// mode: 'data' | 'loading' | 'error' | 'message'
function showHistory(mode) {
  const blocks = {
    data:    historyDom.data(),
    loading: historyDom.loading(),
    error:   historyDom.error(),
    message: historyDom.message(),
  };
  Object.values(blocks).forEach(el => { if (el) el.hidden = true; });
  if (blocks[mode]) blocks[mode].hidden = false;
}

function showHistoryMessage(text, variant) {
  showHistory('message');
  const message = historyDom.message();
  if (!message) return;
  message.className = 'mkt-history__state' + (variant ? ` mkt-history__state--${variant}` : '');
  message.textContent = text;
}

function getApiKey() {
  const key = window.MINI_FINANCE_ENV && window.MINI_FINANCE_ENV.FASTFOREX_API_KEY;
  if (!key || key === 'TU_API_KEY_AQUI') return null;
  return key;
}

function buildHistoryUrl(from, to, days, apiKey) {
  const end   = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);
  return `${FASTFOREX_BASE}/time-series`
    + `?from=${encodeURIComponent(from)}`
    + `&to=${encodeURIComponent(to)}`
    + `&start=${isoDate(start)}&end=${isoDate(end)}`
    + `&interval=P1D`
    + `&api_key=${encodeURIComponent(apiKey)}`;
}

// Aborta el pedido si tarda demasiado, para no quedar atascados en "cargando"
function fetchWithTimeout(url, ms = 12000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
}

// ── HISTORIAL — Carga FastForex /time-series ──────────────────

async function loadHistory(from, to) {
  if (!historyDom.panel()) return;

  if (from === to) {
    historyContext = null;
    showHistoryMessage('Elegí dos monedas distintas para ver el historial.', 'info');
    return;
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    historyContext = null;
    showHistoryMessage(
      'Configurá tu API key de FastForex en base/scripts/env.js para ver el historial real de cotizaciones.',
      'config',
    );
    return;
  }

  showHistory('loading');
  const requestId = ++historyRequestId;

  // El plan trial de FastForex limita el rango histórico (14 días). Pedimos el
  // objetivo (30) y, si la API lo rechaza, detectamos el tope y reintentamos una vez.
  let days   = discoveredMaxDays ? Math.min(HISTORY_DAYS, discoveredMaxDays) : HISTORY_DAYS;
  let capped = discoveredMaxDays !== null && discoveredMaxDays < HISTORY_DAYS;

  try {
    let res = await fetchWithTimeout(buildHistoryUrl(from, to, days, apiKey));

    if (res.status === 403) {
      const limit = (await res.text()).match(/limited to (\d+) days/i);
      if (limit) {
        discoveredMaxDays = Number(limit[1]);
        days   = Math.min(HISTORY_DAYS, discoveredMaxDays);
        capped = discoveredMaxDays < HISTORY_DAYS;
        res = await fetchWithTimeout(buildHistoryUrl(from, to, days, apiKey));
      }
    }

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // Si entró una carga más nueva mientras esperábamos, descartamos esta
    if (requestId !== historyRequestId) return;

    const raw = data && data.results && data.results[to];
    if (!raw || typeof raw !== 'object') throw new Error('Respuesta sin datos para el par solicitado');

    const series = Object.entries(raw)
      .map(([date, rate]) => ({ t: new Date(date).getTime(), y: Number(rate) }))
      .filter(point => Number.isFinite(point.t) && Number.isFinite(point.y))
      .sort((a, b) => a.t - b.t);

    if (series.length < 2) throw new Error('Datos insuficientes para graficar');

    historyContext = { from, to, series, days, capped };
    renderHistory();

  } catch (err) {
    if (requestId !== historyRequestId) return; // error de una carga vieja: lo ignoramos
    console.error('FastForex error:', err);
    historyContext = null;
    showHistory('error');
    const error = historyDom.error();
    if (error) {
      const motivo = err.name === 'AbortError' ? 'tiempo de espera agotado' : err.message;
      error.textContent =
        `No se pudo cargar el historial (${motivo}). Verificá tu API key, los límites del plan, o una extensión/bloqueador de red que frene las solicitudes a la API.`;
    }
  }
}

// ── HISTORIAL — Render del panel + gráfico ────────────────────

function renderHistory() {
  if (!historyContext) return;
  const { from, to, series, days, capped } = historyContext;

  showHistory('data');

  const values   = series.map(point => point.y);
  const first     = values[0];
  const last      = values[values.length - 1];
  const min       = Math.min(...values);
  const max       = Math.max(...values);
  const deltaPct  = ((last - first) / first) * 100;
  const isUp      = last >= first;
  const decimals  = rateDecimals(last);

  const eyebrow = historyDom.eyebrow();
  if (eyebrow) eyebrow.textContent = `Historial · últimos ${days} días`;

  const rateEl = historyDom.rate();
  if (rateEl) rateEl.textContent = formatNumber(last, decimals);

  const pairEl = historyDom.pair();
  if (pairEl) pairEl.textContent = `1 ${from} = ${formatNumber(last, decimals)} ${to}`;

  const deltaEl = historyDom.delta();
  if (deltaEl) {
    deltaEl.className = `mkt-history__delta mkt-change--${isUp ? 'positive' : 'negative'}`;
    deltaEl.textContent = `${isUp ? '▲' : '▼'} ${Math.abs(deltaPct).toFixed(2)}%`;
    deltaEl.title = `Variación en ${HISTORY_DAYS} días`;
  }

  const foot = historyDom.foot();
  if (foot) {
    const trial = capped ? ` · trial: máx ${days} días` : '';
    foot.textContent =
      `Mín ${formatNumber(min, decimals)} · Máx ${formatNumber(max, decimals)} ${to} · Fuente: FastForex${trial}`;
  }

  const chartEl = historyDom.chart();
  if (chartEl) {
    chartEl.setAttribute(
      'aria-label',
      `Evolución de 1 ${from} en ${to} durante los últimos ${days} días. ` +
      `Tendencia ${isUp ? 'al alza' : 'a la baja'} de ${Math.abs(deltaPct).toFixed(2)} por ciento.`,
    );
  }

  drawHistoryChart(series, from, to, isUp, decimals);
}

function drawHistoryChart(series, from, to, isUp, decimals) {
  const el = historyDom.chart();
  if (!el || typeof ApexCharts === 'undefined') return;

  const isDark    = document.body.classList.contains('dark-mode');
  const lineColor = isUp
    ? cssVar('--success-border', '#16a34a')
    : cssVar('--danger-border', '#dc2626');
  const axisColor = cssVar('--fg-muted', '#94a3b8');
  const gridColor = cssVar('--border-subtle', 'rgba(148,163,184,0.15)');
  const fontBody  = cssVar('--font-body', 'system-ui, sans-serif');

  const data = series.map(point => [point.t, point.y]);

  const options = {
    chart: {
      type: 'area',
      height: 260,
      fontFamily: fontBody,
      background: 'transparent',
      locales: [APEX_LOCALE_ES],
      defaultLocale: 'es',
      toolbar: { show: false },
      zoom: { enabled: false },
      parentHeightOffset: 0,
      animations: { enabled: true, easing: 'easeout', speed: 500 },
    },
    series: [{ name: `${from} → ${to}`, data }],
    colors: [lineColor],
    stroke: { curve: 'smooth', width: 2.5, lineCap: 'round' },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0, stops: [0, 100] },
    },
    dataLabels: { enabled: false },
    markers: { size: 0, strokeWidth: 0, hover: { size: 5 } },
    grid: {
      borderColor: gridColor,
      strokeDashArray: 0,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { top: 0, right: 8, bottom: 0, left: 8 },
    },
    xaxis: {
      type: 'datetime',
      tooltip: { enabled: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        datetimeUTC: false,
        format: 'dd MMM',
        style: { colors: axisColor, fontSize: '11px' },
      },
      crosshairs: { stroke: { color: axisColor, width: 1, dashArray: 3 } },
    },
    yaxis: {
      opposite: true,
      tickAmount: 4,
      labels: {
        style: { colors: axisColor, fontSize: '11px' },
        formatter: value => formatNumber(value, decimals),
      },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      x: { format: 'dd MMM yyyy' },
      y: { formatter: value => `${formatNumber(value, decimals)} ${to}` },
    },
    legend: { show: false },
  };

  if (historyChart) { historyChart.destroy(); historyChart = null; }
  historyChart = new ApexCharts(el, options);
  historyChart.render();
}

// Re-render del gráfico cuando cambia el tema o la paleta accesible
function observeThemeChanges() {
  const observer = new MutationObserver(() => {
    if (historyContext && historyChart) renderHistory();
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
}

// ── FOREX — Validación ────────────────────────────────────────

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

// ── FOREX — Submit ────────────────────────────────────────────

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

  // El dashboard histórico se carga en paralelo, independiente de la conversión
  loadHistory(from, to);

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

  loadHistory(from.value, to.value);
}

function initForexForm() {
  const form = dom.formForex();
  const swap = dom.btnSwap();
  if (form) form.addEventListener('submit', handleForexSubmit);
  if (swap) swap.addEventListener('click', handleSwap);
}

function initHistory() {
  if (!historyDom.panel()) return;
  observeThemeChanges();
  const from = dom.selectFrom()?.value || 'USD';
  const to   = dom.selectTo()?.value   || 'EUR';
  loadHistory(from, to);
}

// ── Init ──────────────────────────────────────────────────────

function initMarketRates() {
  loadCrypto();
  initForexForm();
  initHistory();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMarketRates);
} else {
  initMarketRates();
}
