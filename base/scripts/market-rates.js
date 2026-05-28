// ============================================================
// market-rates.js — Cotizaciones del Mercado · Mini Finance
// Consumo de APIs: CoinGecko (cripto) + frankfurter.app (forex)
// ============================================================

// ── Constantes ───────────────────────────────────────────────

const CRYPTO_IDS = ['bitcoin', 'ethereum', 'solana', 'binancecoin'];

const CURRENCIES = {
  USD: { name: 'Dólar Estadounidense', flag: '🇺🇸', symbol: '$' },
  EUR: { name: 'Euro',                  flag: '🇪🇺', symbol: '€' },
  ARS: { name: 'Peso Argentino',        flag: '🇦🇷', symbol: '$' },
  BRL: { name: 'Real Brasileño',        flag: '🇧🇷', symbol: 'R$' },
  GBP: { name: 'Libra Esterlina',       flag: '🇬🇧', symbol: '£' },
  JPY: { name: 'Yen Japonés',           flag: '🇯🇵', symbol: '¥' },
  MXN: { name: 'Peso Mexicano',         flag: '🇲🇽', symbol: '$' },
  CLP: { name: 'Peso Chileno',          flag: '🇨🇱', symbol: '$' },
  UYU: { name: 'Peso Uruguayo',         flag: '🇺🇾', symbol: '$' },
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

function changeClass(value) {
  if (value > 0)  return 'positive';
  if (value < 0)  return 'negative';
  return 'neutral';
}

function changeArrow(value) {
  if (value > 0)  return '▲';
  if (value < 0)  return '▼';
  return '—';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ── Selectores del DOM ────────────────────────────────────────

const dom = {
  tabBtns:        () => document.querySelectorAll('.mkt-tab'),
  tabPanels:      () => document.querySelectorAll('.mkt-panel'),
  cryptoGrid:     () => document.getElementById('crypto-grid'),
  cryptoError:    () => document.getElementById('crypto-error'),
  cryptoUpdated:  () => document.getElementById('crypto-updated'),

  // Formulario forex
  formForex:      () => document.getElementById('forex-form'),
  inputAmount:    () => document.getElementById('forex-amount'),
  selectFrom:     () => document.getElementById('forex-from'),
  selectTo:       () => document.getElementById('forex-to'),
  btnSwap:        () => document.getElementById('forex-swap'),
  resultBox:      () => document.getElementById('forex-result'),
  forexError:     () => document.getElementById('forex-form-error'),
  forexUpdated:   () => document.getElementById('forex-updated'),

  // Errores de campo
  errorAmount:    () => document.getElementById('error-amount'),
  errorFrom:      () => document.getElementById('error-from'),
  errorTo:        () => document.getElementById('error-to'),
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

  // Estado de carga
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
    if (updated) {
      updated.textContent = `Actualizado: ${new Date().toLocaleTimeString('es-AR')}`;
    }

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
    const delay  = i * 80;

    const card = document.createElement('article');
    card.className = 'card mkt-crypto-card';
    card.style.animationDelay = `${delay}ms`;
    card.setAttribute('aria-label', `${coin.name}: $${formatNumber(coin.current_price)} USD`);

    card.innerHTML = `
      <div class="mkt-crypto-card__header">
        <img
          src="${escapeHtml(coin.image)}"
          alt="${escapeHtml(coin.name)}"
          class="mkt-crypto-card__icon"
          width="32"
          height="32"
          loading="lazy"
        />
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
        <div>
          <dt>Cap. de mercado</dt>
          <dd>${formatLargeNumber(coin.market_cap)}</dd>
        </div>
        <div>
          <dt>Volumen 24h</dt>
          <dd>${formatLargeNumber(coin.total_volume)}</dd>
        </div>
      </dl>
    `;

    grid.appendChild(card);
  });
}

// ── FOREX — frankfurter.app ───────────────────────────────────

// Frankfurter no soporta ARS/BRL/MXN/CLP/UYU como base.
// Cuando la moneda origen es una de esas, hacemos el cruce via USD.
const INDIRECT_BASES = ['ARS', 'BRL', 'MXN', 'CLP', 'UYU'];

async function fetchForexRate(from, to) {
  if (from === to) return 1;

  // Si la moneda base es indirecta, primero obtenemos USD->from y USD->to
  if (INDIRECT_BASES.includes(from)) {
    const targets = [from, to].filter(c => c !== 'USD').join(',');
    const url = `https://api.frankfurter.app/latest?from=USD&to=${targets}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const rateUSDtoFrom = from === 'USD' ? 1 : data.rates[from];
    const rateUSDtoTo   = to   === 'USD' ? 1 : data.rates[to];

    // from → USD → to
    return rateUSDtoTo / rateUSDtoFrom;
  }

  const url = `https://api.frankfurter.app/latest?from=${from}&to=${to}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  return data.rates[to] ?? null;
}

function validateForexForm() {
  let valid = true;

  const amount   = dom.inputAmount();
  const from     = dom.selectFrom();
  const to       = dom.selectTo();
  const errAmt   = dom.errorAmount();
  const errFrom  = dom.errorFrom();
  const errTo    = dom.errorTo();

  // Limpiar errores previos
  [amount, from, to].forEach(el => {
    if (el) el.closest('.form-group')?.classList.remove('is-error');
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
    if (errTo) errTo.textContent = 'Elegí una moneda destino diferente a la de origen.';
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

  // Estado cargando
  if (btn) btn.classList.add('is-loading');
  if (result) {
    result.hidden = true;
    result.classList.remove('mkt-result--visible');
  }
  if (error) error.hidden = true;

  const amount = parseFloat(dom.inputAmount().value);
  const from   = dom.selectFrom().value;
  const to     = dom.selectTo().value;

  try {
    const rate      = await fetchForexRate(from, to);
    const converted = amount * rate;

    const fromInfo = CURRENCIES[from] || { symbol: '', name: from };
    const toInfo   = CURRENCIES[to]   || { symbol: '', name: to };

    const toDecimals   = ['JPY', 'CLP', 'ARS'].includes(to)   ? 0 : 2;
    const fromDecimals = ['JPY', 'CLP', 'ARS'].includes(from) ? 0 : 2;

    if (result) {
      result.innerHTML = `
        <p class="mkt-result__label">Resultado de la conversión</p>
        <p class="mkt-result__conversion">
          <span class="mkt-result__from">
            ${fromInfo.symbol}${formatNumber(amount, fromDecimals)} ${from}
          </span>
          <span class="mkt-result__arrow" aria-hidden="true">→</span>
          <span class="mkt-result__to">
            ${toInfo.symbol}${formatNumber(converted, toDecimals)} ${to}
          </span>
        </p>
        <p class="mkt-result__rate">
          Tasa: 1 ${from} = ${toInfo.symbol}${formatNumber(rate, 4)} ${to}
        </p>
      `;
      result.hidden = false;
      // Pequeño timeout para que la transición CSS se dispare
      requestAnimationFrame(() => result.classList.add('mkt-result--visible'));
    }

    const updated = dom.forexUpdated();
    if (updated) {
      updated.textContent = `Tasa obtenida: ${new Date().toLocaleTimeString('es-AR')}`;
    }

  } catch (err) {
    console.error('Frankfurter error:', err);
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

  // Limpiar resultado anterior al invertir
  const result = dom.resultBox();
  if (result) {
    result.classList.remove('mkt-result--visible');
    setTimeout(() => { result.hidden = true; }, 250);
  }
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