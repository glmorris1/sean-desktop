const intervals = [
  { label: "15s", seconds: 15, yahoo: "1m", range: "1d" },
  { label: "1m", seconds: 60, yahoo: "1m", range: "5d" },
  { label: "2m", seconds: 120, yahoo: "2m", range: "5d" },
  { label: "3m", seconds: 180, yahoo: "5m", range: "5d" },
  { label: "5m", seconds: 300, yahoo: "5m", range: "1mo" },
  { label: "10m", seconds: 600, yahoo: "15m", range: "1mo" },
  { label: "15m", seconds: 900, yahoo: "15m", range: "1mo" },
  { label: "30m", seconds: 1800, yahoo: "30m", range: "3mo" },
  { label: "1h", seconds: 3600, yahoo: "60m", range: "6mo" },
  { label: "4h", seconds: 14400, yahoo: "1h", range: "2y" },
  { label: "1D", seconds: 86400, yahoo: "1d", range: "5y" }
];

const stockCatalog = [
  { symbol: "AAPL", name: "Apple Inc.", exchange: "NASDAQ", type: "Stock" },
  { symbol: "MSFT", name: "Microsoft Corp.", exchange: "NASDAQ", type: "Stock" },
  { symbol: "NVDA", name: "NVIDIA Corp.", exchange: "NASDAQ", type: "Stock" },
  { symbol: "TSLA", name: "Tesla Inc.", exchange: "NASDAQ", type: "Stock" },
  { symbol: "META", name: "Meta Platforms", exchange: "NASDAQ", type: "Stock" },
  { symbol: "SPY", name: "SPDR S&P 500 ETF", exchange: "NYSE Arca", type: "ETF" },
  { symbol: "QQQ", name: "Invesco QQQ Trust", exchange: "NASDAQ", type: "ETF" }
];

const futuresRoots = {
  MES: { name: "Micro E-mini S&P 500 Futures", yahoo: "MES=F", exchange: "CME", tickSize: 0.25, tickValue: 1.25, pointValue: 5 },
  ES: { name: "E-mini S&P 500 Futures", yahoo: "ES=F", exchange: "CME", tickSize: 0.25, tickValue: 12.5, pointValue: 50 },
  NQ: { name: "E-mini Nasdaq 100 Futures", yahoo: "NQ=F", exchange: "CME", tickSize: 0.25, tickValue: 5, pointValue: 20 },
  MNQ: { name: "Micro E-mini Nasdaq 100 Futures", yahoo: "MNQ=F", exchange: "CME", tickSize: 0.25, tickValue: 0.5, pointValue: 2 },
  YM: { name: "E-mini Dow Futures", yahoo: "YM=F", exchange: "CBOT", tickSize: 1, tickValue: 5, pointValue: 5 },
  MYM: { name: "Micro E-mini Dow Futures", yahoo: "MYM=F", exchange: "CBOT", tickSize: 1, tickValue: 0.5, pointValue: 0.5 },
  RTY: { name: "E-mini Russell 2000 Futures", yahoo: "RTY=F", exchange: "CME", tickSize: 0.1, tickValue: 5, pointValue: 50 },
  M2K: { name: "Micro E-mini Russell 2000 Futures", yahoo: "M2K=F", exchange: "CME", tickSize: 0.1, tickValue: 0.5, pointValue: 5 }
};

const monthCodes = [
  ["H", "March"], ["M", "June"], ["U", "September"], ["Z", "December"]
];

const defaultEvents = [
  { id: "usd-nfp-2026-07-03", date: "2026-07-03", time: "08:30", timestampUtc: "2026-07-03T12:30:00Z", currency: "USD", impact: "high", title: "Non-Farm Employment Change", actual: null, forecast: "180K", previous: "139K", revised: null, source: "Forex Factory-compatible economic calendar", description: "Monthly change in non-farm payroll employment." },
  { id: "usd-unemployment-2026-07-03", date: "2026-07-03", time: "08:30", timestampUtc: "2026-07-03T12:30:00Z", currency: "USD", impact: "high", title: "Unemployment Rate", actual: null, forecast: "4.2%", previous: "4.2%", revised: null, source: "Forex Factory-compatible economic calendar", description: "Percentage of the labor force unemployed and actively seeking employment." },
  { id: "eur-cpi-2026-07-01", date: "2026-07-01", time: "05:00", timestampUtc: "2026-07-01T09:00:00Z", currency: "EUR", impact: "high", title: "CPI Flash Estimate y/y", actual: null, forecast: "2.0%", previous: "1.9%", revised: null, source: "Forex Factory-compatible economic calendar", description: "Preliminary Eurozone inflation reading." },
  { id: "gbp-boe-2026-07-02", date: "2026-07-02", time: "07:00", timestampUtc: "2026-07-02T11:00:00Z", currency: "GBP", impact: "high", title: "BOE Gov Bailey Speaks", actual: null, forecast: null, previous: null, revised: null, source: "Forex Factory-compatible economic calendar", description: "Scheduled remarks from the Bank of England Governor." },
  { id: "cad-employment-2026-07-10", date: "2026-07-10", time: "08:30", timestampUtc: "2026-07-10T12:30:00Z", currency: "CAD", impact: "high", title: "Employment Change", actual: null, forecast: "12.5K", previous: "8.8K", revised: null, source: "Forex Factory-compatible economic calendar", description: "Monthly change in employed people." }
];

const els = {
  appShell: document.querySelector(".app-shell"),
  chartStage: document.querySelector(".chart-stage"),
  canvas: document.querySelector("#chartCanvas"),
  search: document.querySelector("#symbolSearch"),
  results: document.querySelector("#searchResults"),
  watchlist: document.querySelector("#watchlistRows"),
  activeSymbol: document.querySelector("#activeSymbol"),
  activeName: document.querySelector("#activeName"),
  quoteLine: document.querySelector("#quoteLine"),
  marketStatus: document.querySelector("#marketStatus"),
  intervalButton: document.querySelector("#intervalButton"),
  intervalMenu: document.querySelector("#intervalMenu"),
  paperButton: document.querySelector("#paperButton"),
  paperTicket: document.querySelector("#paperTicket"),
  paperQty: document.querySelector("#paperQty"),
  buyButton: document.querySelector("#buyButton"),
  sellButton: document.querySelector("#sellButton"),
  toolRail: document.querySelector("#toolRail"),
  railHandle: document.querySelector("#railHandle"),
  railCollapse: document.querySelector("#railCollapse"),
  replayTab: document.querySelector("#replayTab"),
  replayBar: document.querySelector("#replayBar"),
  replayClose: document.querySelector("#replayClose"),
  replayChooser: document.querySelector("#replayChooser"),
  replayControls: document.querySelector("#replayControls"),
  selectReplayStart: document.querySelector("#selectReplayStart"),
  randomReplayStart: document.querySelector("#randomReplayStart"),
  playPause: document.querySelector("#playPause"),
  stepBack: document.querySelector("#stepBack"),
  stepForward: document.querySelector("#stepForward"),
  replaySpeed: document.querySelector("#replaySpeed"),
  replayUpdates: document.querySelector("#replayUpdates"),
  replayTime: document.querySelector("#replayTime"),
  crosshairTime: document.querySelector("#crosshairTime"),
  crosshairPrice: document.querySelector("#crosshairPrice"),
  equity: document.querySelector("#equity"),
  cash: document.querySelector("#cash"),
  openPL: document.querySelector("#openPL"),
  realizedPL: document.querySelector("#realizedPL"),
  pendingOrders: document.querySelector("#pendingOrders"),
  openPositions: document.querySelector("#openPositions"),
  tradeHistory: document.querySelector("#tradeHistory"),
  calendarCurrency: document.querySelector("#calendarCurrency"),
  calendarRange: document.querySelector("#calendarRange"),
  calendarRows: document.querySelector("#calendarRows"),
  performanceStats: document.querySelector("#performanceStats"),
  sideDrawer: document.querySelector("#sideDrawer"),
  drawerClose: document.querySelector("#drawerClose"),
  themeButton: document.querySelector("#themeButton")
};

const ctx = els.canvas.getContext("2d");

const state = {
  symbol: stockCatalog[0],
  interval: intervals.find((item) => item.label === "10m"),
  candles: [],
  renderedCandles: [],
  visibleCount: 140,
  endIndex: null,
  activeTool: "cursor",
  drawings: [],
  undoStack: [],
  selectedDrawingId: null,
  drag: null,
  crosshair: null,
  watchlist: ["AAPL", "MSFT", "NVDA", "MES1!", "ES1!"],
  replay: {
    mode: false,
    choosing: false,
    startIndex: null,
    currentIndex: null,
    playing: false,
    speed: 1,
    updates: 1,
    timer: null
  },
  paper: {
    enabled: false,
    cash: 100000,
    orders: [],
    positions: [],
    trades: []
  },
  toolbar: {
    x: null,
    y: null,
    dragging: false,
    moved: false,
    offsetX: 0,
    offsetY: 0,
    orientation: "vertical",
    collapsed: false
  }
};

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

function money(value, decimals = 2) {
  if (!Number.isFinite(value)) return "--";
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: decimals, minimumFractionDigits: decimals });
}

function priceText(value) {
  if (!Number.isFinite(value)) return "--";
  return value.toLocaleString("en-US", { maximumFractionDigits: value > 1000 ? 2 : 2, minimumFractionDigits: 2 });
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(date);
}

function marketIsOpen() {
  const now = new Date();
  const ny = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  }).formatToParts(now);
  const parts = Object.fromEntries(ny.map((part) => [part.type, part.value]));
  const day = parts.weekday;
  const minutes = Number(parts.hour) * 60 + Number(parts.minute);
  return !["Sat", "Sun"].includes(day) && minutes >= 570 && minutes < 960;
}

function buildFuturesResults(query) {
  const q = query.toUpperCase().trim();
  const roots = Object.entries(futuresRoots).filter(([root]) => root.includes(q) || q.includes(root));
  const currentYear = new Date().getFullYear();
  return roots.flatMap(([root, meta]) => {
    const continuous = [1, 2].map((monthIndex) => ({
      symbol: `${root}${monthIndex}!`,
      rootSymbol: root,
      name: `${meta.name} Continuous Contract, ${monthIndex === 1 ? "front month" : "second month"}`,
      exchange: meta.exchange,
      type: "Futures",
      contractType: "continuous",
      dataAvailability: "Historical via provider normalized candles or Yahoo continuous fallback",
      isFutures: true,
      continuousMonthIndex: monthIndex,
      ...meta
    }));
    const dated = [];
    for (let year = currentYear - 1; year <= currentYear + 2; year += 1) {
      for (const [code, month] of monthCodes) {
        dated.push({
          symbol: `${root}${code}${year}`,
          rootSymbol: root,
          name: `${meta.name} - ${month} ${year} Contract`,
          exchange: meta.exchange,
          type: "Futures",
          contractType: "dated",
          dataAvailability: "Requires backend normalized historical futures candles",
          isFutures: true,
          contractMonth: month,
          contractYear: year,
          ...meta
        });
      }
    }
    return [...continuous, ...dated].filter((item) => item.symbol.includes(q) || item.name.toUpperCase().includes(q));
  });
}

function searchSymbols(query) {
  const q = query.toUpperCase().trim();
  if (!q) return [];
  const stocks = stockCatalog.filter((item) => `${item.symbol} ${item.name}`.toUpperCase().includes(q));
  const futures = buildFuturesResults(q);
  return [...futures, ...stocks].slice(0, 40);
}

function providerSymbol(symbol) {
  if (symbol.isFutures) {
    if (symbol.contractType === "continuous") return symbol.yahoo;
    return null;
  }
  return symbol.symbol;
}

async function fetchCandles(symbol, interval) {
  const mapped = providerSymbol(symbol);
  if (!mapped) throw new Error("Specific dated futures contracts need a backend data provider.");
  const backendBase = localStorage.getItem("seanDesktop.backendBaseURL") || "";
  if (backendBase) {
    const backendUrl = `${backendBase.replace(/\/$/, "")}/candles?symbol=${encodeURIComponent(symbol.symbol)}&exchange=${encodeURIComponent(symbol.exchange || "")}&timeframe=${encodeURIComponent(interval.label)}`;
    const backendResponse = await fetch(backendUrl);
    if (backendResponse.ok) {
      const rows = await backendResponse.json();
      return rows.map((row, index) => ({
        index,
        time: new Date(row.timestamp || row.timestampUtc || row.time),
        open: Number(row.open),
        high: Number(row.high),
        low: Number(row.low),
        close: Number(row.close),
        volume: Number(row.volume || 0)
      })).filter((candle) => [candle.open, candle.high, candle.low, candle.close].every(Number.isFinite));
    }
  }

  const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(mapped)}?range=${interval.range}&interval=${interval.yahoo}&includePrePost=true&events=history`;
  let payload;
  try {
    const response = await fetch(yahooUrl);
    if (!response.ok) throw new Error("Market data request failed.");
    payload = await response.json();
  } catch (directError) {
    const bridgeUrl = `https://r.jina.ai/http://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(mapped)}?range=${interval.range}&interval=${interval.yahoo}&includePrePost=true&events=history`;
    const bridgeResponse = await fetch(bridgeUrl);
    if (!bridgeResponse.ok) throw directError;
    const text = await bridgeResponse.text();
    const jsonStart = text.indexOf("{\"chart\"");
    if (jsonStart < 0) throw directError;
    payload = JSON.parse(text.slice(jsonStart).trim());
  }
  const result = payload.chart?.result?.[0];
  const timestamps = result?.timestamp || [];
  const quote = result?.indicators?.quote?.[0] || {};
  const rows = timestamps.map((timestamp, index) => ({
    index,
    time: new Date(timestamp * 1000),
    open: quote.open?.[index],
    high: quote.high?.[index],
    low: quote.low?.[index],
    close: quote.close?.[index],
    volume: quote.volume?.[index] || 0
  })).filter((candle) =>
    [candle.open, candle.high, candle.low, candle.close].every((value) => Number.isFinite(value))
  );
  if (!rows.length) throw new Error("No historical candles returned.");
  return rows.map((candle, index) => ({ ...candle, index }));
}

function fallbackCandles(symbol, interval) {
  const count = interval.label === "1D" ? 720 : 1200;
  const seed = symbol.symbol.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const base = symbol.isFutures ? 6100 + seed : 120 + seed / 4;
  const now = Date.now();
  let last = base;
  return Array.from({ length: count }, (_, index) => {
    const wave = Math.sin(index / 17 + seed) * 0.004;
    const noise = (Math.sin(index * 13.7 + seed) + Math.cos(index * 4.1)) * 0.0025;
    const open = last;
    const close = Math.max(0.01, open * (1 + wave + noise));
    const spread = Math.abs(close - open) + open * 0.003;
    const high = Math.max(open, close) + spread * (0.4 + Math.abs(Math.sin(index)));
    const low = Math.min(open, close) - spread * (0.35 + Math.abs(Math.cos(index)));
    last = close;
    return {
      index,
      time: new Date(now - (count - index) * interval.seconds * 1000),
      open,
      high,
      low,
      close,
      volume: Math.round(5000 + Math.abs(Math.sin(index * 0.9)) * 90000)
    };
  });
}

async function loadSymbol(symbol = state.symbol) {
  state.symbol = symbol;
  els.activeSymbol.textContent = symbol.symbol;
  els.activeName.textContent = symbol.name;
  els.marketStatus.classList.toggle("open", marketIsOpen());
  try {
    state.candles = await fetchCandles(symbol, state.interval);
  } catch (error) {
    console.warn(error);
    state.candles = fallbackCandles(symbol, state.interval);
  }
  state.visibleCount = Math.min(160, Math.max(60, Math.floor(state.candles.length / 3)));
  state.endIndex = state.candles.length - 1;
  resetReplayForSymbolChange();
  updateRenderedCandles();
  updateQuote();
  renderWatchlist();
  renderPaper();
  draw();
}

function updateRenderedCandles() {
  if (state.replay.mode && Number.isInteger(state.replay.currentIndex)) {
    state.renderedCandles = state.candles.slice(0, state.replay.currentIndex + 1);
    state.endIndex = Math.min(state.endIndex ?? state.replay.currentIndex, state.replay.currentIndex);
  } else {
    state.renderedCandles = state.candles;
  }
  state.endIndex = Math.min(state.endIndex ?? state.renderedCandles.length - 1, state.renderedCandles.length - 1);
}

function visibleCandles() {
  const candles = state.renderedCandles;
  if (!candles.length) return [];
  const end = Math.min(Math.max(state.endIndex ?? candles.length - 1, 0), candles.length - 1);
  const count = Math.min(Math.max(state.visibleCount, 20), candles.length);
  const start = Math.max(0, end - count + 1);
  return candles.slice(start, end + 1);
}

function lastVisibleCandle() {
  return visibleCandles().at(-1) || state.renderedCandles.at(-1) || state.candles.at(-1);
}

function resizeCanvas() {
  const rect = els.canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  els.canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  els.canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function plotRect() {
  const rect = els.canvas.getBoundingClientRect();
  return { x: 0, y: 0, width: rect.width, height: rect.height, left: 12, right: rect.width - 76, top: 140, bottom: rect.height - 118, volumeTop: rect.height - 170, axisY: rect.height - 88 };
}

function domains() {
  const candles = visibleCandles();
  if (!candles.length) return { min: 0, max: 1 };
  const values = candles.flatMap((candle) => [candle.high, candle.low]);
  for (const drawing of state.drawings) {
    if (drawing.kind === "fib" || drawing.kind === "line" || drawing.kind === "ray" || drawing.kind === "horizontal" || drawing.kind === "rectangle") {
      values.push(...drawing.points.map((point) => point.price));
    }
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = Math.max((max - min) * 0.12, Math.abs(max) * 0.002, 0.01);
  return { min: min - pad, max: max + pad };
}

function scales() {
  const rect = plotRect();
  const candles = visibleCandles();
  const first = candles[0]?.index ?? 0;
  const last = candles.at(-1)?.index ?? 1;
  const domain = domains();
  const x = (barIndex) => rect.left + ((barIndex - first) / Math.max(1, last - first)) * (rect.right - rect.left);
  const y = (price) => rect.top + ((domain.max - price) / Math.max(0.0001, domain.max - domain.min)) * (rect.bottom - rect.top);
  const priceAt = (screenY) => domain.max - ((screenY - rect.top) / Math.max(1, rect.bottom - rect.top)) * (domain.max - domain.min);
  const barAt = (screenX) => first + ((screenX - rect.left) / Math.max(1, rect.right - rect.left)) * Math.max(1, last - first);
  return { rect, candles, first, last, domain, x, y, priceAt, barAt };
}

function draw() {
  resizeCanvas();
  const { rect, candles, domain, x, y } = scales();
  ctx.clearRect(0, 0, rect.width, rect.height);
  drawBackground(rect, domain, y);
  drawCandles(rect, candles, x, y);
  drawIndicators(rect, candles, x, y);
  drawDrawings(rect, x, y);
  drawPaper(rect, x, y);
  drawCrosshair(rect, x, y);
  updateQuote();
}

function drawBackground(rect, domain, y) {
  const gradient = ctx.createLinearGradient(0, 0, 0, rect.height);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(1, "#e9eef6");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, rect.width, rect.height);
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--grid");
  ctx.lineWidth = 1;
  ctx.font = "24px Inter, system-ui, sans-serif";
  ctx.fillStyle = "#111827";
  for (let i = 0; i <= 6; i += 1) {
    const yy = rect.top + i * ((rect.bottom - rect.top) / 6);
    ctx.beginPath();
    ctx.moveTo(0, yy);
    ctx.lineTo(rect.width, yy);
    ctx.stroke();
    const price = domain.max - i * ((domain.max - domain.min) / 6);
    ctx.fillText(priceText(price), rect.right + 14, yy + 8);
  }
  const candles = visibleCandles();
  const first = candles[0]?.index ?? 0;
  for (let index = first; index <= (candles.at(-1)?.index ?? first); index += 30) {
    const xx = scales().x(index);
    ctx.beginPath();
    ctx.moveTo(xx, 0);
    ctx.lineTo(xx, rect.height);
    ctx.stroke();
    const candle = candles.find((item) => item.index >= index);
    if (candle) {
      ctx.font = "16px Inter, system-ui, sans-serif";
      ctx.fillText(new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", month: "short", day: "numeric" }).format(candle.time), xx - 42, rect.axisY + 24);
    }
  }
  ctx.fillStyle = "rgba(0,0,0,0.92)";
  ctx.font = "72px Inter, system-ui, sans-serif";
  ctx.fillText("S", 22, rect.volumeTop + 58);
}

function candleWidth(candles, rect) {
  const slot = (rect.right - rect.left) / Math.max(1, candles.length);
  return Math.max(2, Math.min(9, slot * 0.42));
}

function drawCandles(rect, candles, x, y) {
  const width = candleWidth(candles, rect);
  const maxVolume = Math.max(...candles.map((candle) => candle.volume || 0), 1);
  for (const candle of candles) {
    const xx = x(candle.index);
    const up = candle.close >= candle.open;
    const color = up ? "#22c55e" : "#ef4444";
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = Math.max(1, Math.min(1.6, width * 0.18));
    ctx.beginPath();
    ctx.moveTo(xx, y(candle.high));
    ctx.lineTo(xx, y(candle.low));
    ctx.stroke();
    const openY = y(candle.open);
    const closeY = y(candle.close);
    ctx.fillRect(xx - width / 2, Math.min(openY, closeY), width, Math.max(1.4, Math.abs(closeY - openY)));
    const volumeHeight = ((candle.volume || 0) / maxVolume) * 86;
    ctx.globalAlpha = 0.42;
    ctx.fillRect(xx - Math.max(0.8, width * 0.35), rect.axisY - volumeHeight, Math.max(1, width * 0.7), volumeHeight);
    ctx.globalAlpha = 1;
  }
}

function movingAverage(candles, period) {
  return candles.map((_, index) => {
    if (index < period - 1) return null;
    const slice = candles.slice(index - period + 1, index + 1);
    return slice.reduce((sum, candle) => sum + candle.close, 0) / period;
  });
}

function drawSeries(candles, values, color, x, y, width = 2) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  let started = false;
  values.forEach((value, index) => {
    if (!Number.isFinite(value)) return;
    const candle = candles[index];
    if (!started) {
      ctx.moveTo(x(candle.index), y(value));
      started = true;
    } else {
      ctx.lineTo(x(candle.index), y(value));
    }
  });
  ctx.stroke();
}

function drawIndicators(rect, candles, x, y) {
  if (!candles.length) return;
  drawSeries(candles, movingAverage(candles, 20), "#168df4", x, y, 3);
  const vwap = [];
  let cumulativePV = 0;
  let cumulativeVolume = 0;
  for (const candle of candles) {
    const typical = (candle.open + candle.high + candle.low + candle.close) / 4;
    cumulativePV += typical * (candle.volume || 1);
    cumulativeVolume += candle.volume || 1;
    vwap.push(cumulativePV / cumulativeVolume);
  }
  drawSeries(candles, vwap, "#7e2f8e", x, y, 2);
}

function drawDrawings(rect, x, y) {
  for (const drawing of state.drawings) {
    ctx.save();
    ctx.strokeStyle = drawing.color || "#111827";
    ctx.fillStyle = drawing.color || "#111827";
    ctx.lineWidth = 2;
    if (drawing.kind === "horizontal") {
      const yy = y(drawing.points[0].price);
      ctx.beginPath(); ctx.moveTo(rect.left, yy); ctx.lineTo(rect.right, yy); ctx.stroke();
    } else if (drawing.kind === "line" || drawing.kind === "measure") {
      const [a, b] = drawing.points;
      ctx.beginPath(); ctx.moveTo(x(a.bar), y(a.price)); ctx.lineTo(x(b.bar), y(b.price)); ctx.stroke();
      if (drawing.kind === "measure") drawMeasureLabel(a, b, x, y);
    } else if (drawing.kind === "ray") {
      const [a, b] = drawing.points;
      const ax = x(a.bar), ay = y(a.price), bx = x(b.bar), by = y(b.price);
      const dx = bx - ax || 1;
      const dy = by - ay;
      const farX = rect.right;
      const farY = ay + dy * ((farX - ax) / dx);
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(farX, farY); ctx.stroke();
      drawHandle(ax, ay); drawHandle(bx, by);
    } else if (drawing.kind === "rectangle") {
      const [a, b] = drawing.points;
      const left = Math.min(x(a.bar), x(b.bar));
      const top = Math.min(y(a.price), y(b.price));
      const width = Math.abs(x(a.bar) - x(b.bar));
      const height = Math.abs(y(a.price) - y(b.price));
      ctx.globalAlpha = 0.12; ctx.fillRect(left, top, width, height); ctx.globalAlpha = 1;
      ctx.strokeRect(left, top, width, height);
      drawHandle(left, top); drawHandle(left + width, top); drawHandle(left, top + height); drawHandle(left + width, top + height);
    } else if (drawing.kind === "fib") {
      drawFib(drawing, rect, x, y);
    } else if (drawing.kind === "position") {
      drawPositionTool(drawing, rect, x, y);
    }
    ctx.restore();
  }
}

function drawHandle(x, y) {
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function drawMeasureLabel(a, b, x, y) {
  const midX = (x(a.bar) + x(b.bar)) / 2;
  const midY = (y(a.price) + y(b.price)) / 2;
  const pct = ((b.price - a.price) / a.price) * 100;
  const label = `${pct.toFixed(2)}% ${priceText(b.price - a.price)}`;
  ctx.font = "12px Inter, system-ui, sans-serif";
  const width = ctx.measureText(label).width + 14;
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.fillRect(midX - width / 2, midY - 24, width, 22);
  ctx.fillStyle = "#111827";
  ctx.fillText(label, midX - width / 2 + 7, midY - 8);
}

function drawFib(drawing, rect, x, y) {
  const [a, b] = drawing.points;
  const levels = [-0.618, -0.236, 0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
  ctx.font = "17px Inter, system-ui, sans-serif";
  for (const level of levels) {
    const price = a.price + (b.price - a.price) * level;
    const yy = y(price);
    ctx.strokeStyle = level === 0.618 || level === 0.786 ? "#16a34a" : "#6b7280";
    ctx.lineWidth = level === 0 || level === 1 ? 2.4 : 1.7;
    ctx.beginPath(); ctx.moveTo(rect.left, yy); ctx.lineTo(rect.right, yy); ctx.stroke();
    const levelText = level === 1 ? "1.0" : level === 0 ? "0.0" : String(level);
    const target = level === -0.236 ? " T1" : level === -0.618 ? " T2" : "";
    ctx.fillStyle = "#111827";
    ctx.fillText(`${levelText}${target}  ${priceText(price)}`, rect.left + 54, yy - 8);
  }
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = "#7a7a7a";
  ctx.beginPath(); ctx.moveTo(x(a.bar), y(a.price)); ctx.lineTo(x(b.bar), y(b.price)); ctx.stroke();
  ctx.setLineDash([]);
  drawHandle(x(a.bar), y(a.price)); drawHandle(x(b.bar), y(b.price));
}

function drawPositionTool(drawing, rect, x, y) {
  const [entry, target, stop, end] = drawing.points;
  const isLong = drawing.side === "long";
  const x1 = x(entry.bar);
  const x2 = x(end.bar);
  const entryY = y(entry.price);
  const targetY = y(target.price);
  const stopY = y(stop.price);
  const profitTop = Math.min(entryY, targetY);
  const profitBottom = Math.max(entryY, targetY);
  const lossTop = Math.min(entryY, stopY);
  const lossBottom = Math.max(entryY, stopY);
  ctx.globalAlpha = 0.24;
  ctx.fillStyle = "#22c55e"; ctx.fillRect(x1, profitTop, x2 - x1, profitBottom - profitTop);
  ctx.fillStyle = "#ef4444"; ctx.fillRect(x1, lossTop, x2 - x1, lossBottom - lossTop);
  ctx.globalAlpha = 1;
  ctx.strokeStyle = "#111827"; ctx.strokeRect(x1, Math.min(targetY, stopY), x2 - x1, Math.abs(targetY - stopY));
  lineWithLabel("Entry", entry.price, "#111827");
  lineWithLabel("TP", target.price, "#16a34a");
  lineWithLabel("SL", stop.price, "#ef4444");
  const risk = Math.abs(entry.price - stop.price);
  const reward = Math.abs(target.price - entry.price);
  const rr = risk > 0 ? reward / risk : 0;
  ctx.fillStyle = "#111827";
  ctx.font = "13px Inter, system-ui, sans-serif";
  ctx.fillText(`R:R ${rr.toFixed(2)}`, x1 + 8, Math.min(targetY, stopY) + 20);

  function lineWithLabel(title, price, color) {
    const yy = y(price);
    ctx.strokeStyle = color;
    ctx.beginPath(); ctx.moveTo(x1, yy); ctx.lineTo(x2, yy); ctx.stroke();
    ctx.fillStyle = color;
    ctx.fillText(`${title} ${priceText(price)}`, x2 + 6, yy + 4);
  }
}

function drawPaper(rect, x, y) {
  for (const order of state.paper.orders.filter((item) => item.symbol === state.symbol.symbol)) {
    drawPaperOrder(order, rect, x, y);
  }
  for (const position of state.paper.positions.filter((item) => item.symbol === state.symbol.symbol)) {
    drawTradeLine(position.side === "long" ? "Long" : "Short", position.entry, position.pl >= 0 ? "#22c55e" : "#ef4444", rect, y);
    if (position.stop) drawTradeLine("SL", position.stop, "#f59e0b", rect, y);
    if (position.target) drawTradeLine("TP", position.target, "#14b8a6", rect, y);
  }
}

function drawTradeLine(title, price, color, rect, y) {
  const yy = y(price);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.setLineDash(title === "TP" || title === "SL" ? [6, 5] : []);
  ctx.beginPath(); ctx.moveTo(rect.left, yy); ctx.lineTo(rect.right, yy); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = color;
  ctx.fillRect(rect.right - 84, yy - 14, 82, 28);
  ctx.fillStyle = "#fff";
  ctx.font = "13px Inter, system-ui, sans-serif";
  ctx.fillText(`${title} ${priceText(price)}`, rect.right - 78, yy + 5);
}

function drawPaperOrder(order, rect, x, y) {
  const color = order.side === "long" ? "#22c55e" : "#ef4444";
  drawTradeLine(order.side === "long" ? "Buy" : "Sell", order.entry, color, rect, y);
  const yy = y(order.entry);
  const pillX = rect.left + 220;
  ctx.fillStyle = "rgba(255,255,255,0.96)";
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  roundRect(pillX - 112, yy - 19, 224, 38, 11, true, true);
  ctx.fillStyle = color;
  ctx.font = "14px Inter, system-ui, sans-serif";
  ctx.fillText(`${order.side === "long" ? "Buy" : "Sell"}  ${order.qty}   0.00 USD`, pillX - 88, yy + 5);
  ctx.fillText("x", pillX + 91, yy + 5);
  if (order.entryEditable) {
    ctx.beginPath(); ctx.arc(rect.left + (rect.right - rect.left) * 0.64, yy, 6, 0, Math.PI * 2); ctx.fill();
  }
  drawTradeLine("SL", order.stop, "#f59e0b", rect, y);
  drawTradeLine("TP", order.target, "#14b8a6", rect, y);
}

function roundRect(x, y, w, h, r, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function drawCrosshair(rect, x, y) {
  if (!state.crosshair) return;
  ctx.strokeStyle = "rgba(0,0,0,0.72)";
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(0, state.crosshair.y);
  ctx.lineTo(rect.width, state.crosshair.y);
  ctx.moveTo(state.crosshair.x, 0);
  ctx.lineTo(state.crosshair.x, rect.height);
  ctx.stroke();
  ctx.setLineDash([]);
  const { priceAt, barAt, candles } = scales();
  const candle = candles.reduce((best, item) => Math.abs(item.index - barAt(state.crosshair.x)) < Math.abs(best.index - barAt(state.crosshair.x)) ? item : best, candles[0]);
  els.crosshairTime.textContent = candle ? formatDate(candle.time) : "--";
  els.crosshairTime.style.left = `${Math.min(Math.max(state.crosshair.x - 58, 10), rect.width - 130)}px`;
  els.crosshairTime.style.top = `${rect.axisY + 30}px`;
  els.crosshairPrice.textContent = priceText(priceAt(state.crosshair.y));
  els.crosshairPrice.style.left = `${rect.right + 4}px`;
  els.crosshairPrice.style.top = `${Math.min(Math.max(state.crosshair.y - 14, rect.top), rect.bottom)}px`;
  els.crosshairTime.classList.remove("hidden");
  els.crosshairPrice.classList.remove("hidden");
}

function updateQuote() {
  const candle = lastVisibleCandle();
  const first = visibleCandles()[0] || candle;
  if (!candle || !first) return;
  const change = ((candle.close - first.open) / first.open) * 100;
  els.quoteLine.textContent = `${priceText(candle.close)} ${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;
  els.quoteLine.classList.toggle("positive", change >= 0);
  els.quoteLine.classList.toggle("negative", change < 0);
}

function setTool(tool) {
  if (tool === "undo") return undo();
  state.activeTool = tool === state.activeTool ? "cursor" : tool;
  document.querySelectorAll("#toolRail [data-tool]").forEach((button) => button.classList.toggle("active", button.dataset.tool === state.activeTool));
}

function clampToolbarPosition(x, y) {
  const stage = els.chartStage.getBoundingClientRect();
  const rail = els.toolRail.getBoundingClientRect();
  return {
    x: Math.min(Math.max(0, x), Math.max(0, stage.width - rail.width)),
    y: Math.min(Math.max(0, y), Math.max(0, stage.height - rail.height))
  };
}

function applyToolbarPosition(x, y) {
  const point = clampToolbarPosition(x, y);
  state.toolbar.x = point.x;
  state.toolbar.y = point.y;
  els.toolRail.classList.add("is-positioned");
  els.toolRail.style.left = `${point.x}px`;
  els.toolRail.style.top = `${point.y}px`;
  els.toolRail.style.right = "auto";
}

function updateToolbarCollapseIcon() {
  const icon = state.toolbar.orientation === "vertical"
    ? (state.toolbar.collapsed ? "chevron-right" : "chevron-left")
    : (state.toolbar.collapsed ? "chevron-down" : "chevron-up");
  els.railCollapse.title = state.toolbar.collapsed ? "Expand toolbar" : "Collapse toolbar";
  els.railCollapse.innerHTML = `<i data-lucide="${icon}"></i>`;
  if (window.lucide) lucide.createIcons();
}

function toggleToolbarCollapse() {
  state.toolbar.collapsed = !state.toolbar.collapsed;
  els.toolRail.classList.toggle("collapsed", state.toolbar.collapsed);
  updateToolbarCollapseIcon();
  if (Number.isFinite(state.toolbar.x) && Number.isFinite(state.toolbar.y)) {
    requestAnimationFrame(() => applyToolbarPosition(state.toolbar.x, state.toolbar.y));
  }
}

function pushUndo() {
  state.undoStack.push(JSON.stringify({ drawings: state.drawings, orders: state.paper.orders }));
  if (state.undoStack.length > 80) state.undoStack.shift();
}

function undo() {
  const snapshot = state.undoStack.pop();
  if (!snapshot) return;
  const restored = JSON.parse(snapshot);
  state.drawings = restored.drawings || [];
  state.paper.orders = restored.orders || [];
  draw();
  renderPaper();
}

function pointFromEvent(event) {
  const rect = els.canvas.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function chartPoint(screen) {
  const scale = scales();
  return { bar: scale.barAt(screen.x), price: scale.priceAt(screen.y) };
}

function findPaperHit(screen) {
  const { rect, y } = scales();
  for (const order of [...state.paper.orders].reverse()) {
    if (order.symbol !== state.symbol.symbol) continue;
    const entryY = y(order.entry);
    const pillX = rect.left + 220;
    if (screen.x >= pillX + 58 && screen.x <= pillX + 126 && screen.y >= entryY - 26 && screen.y <= entryY + 26) {
      return { type: "cancelOrder", order };
    }
    if (Math.abs(screen.y - y(order.target)) <= 12) return { type: "target", order };
    if (Math.abs(screen.y - y(order.stop)) <= 12) return { type: "stop", order };
    if (Math.abs(screen.y - entryY) <= 12) return { type: "entry", order };
  }
  return null;
}

function createPaperOrder(side) {
  const candle = lastVisibleCandle();
  if (!candle) return;
  const range = Math.max(...visibleCandles().map((item) => item.high)) - Math.min(...visibleCandles().map((item) => item.low));
  const offset = Math.max(candle.close * 0.0025, range * 0.06, 0.01);
  const latest = state.candles.at(-1);
  const realtime = !state.replay.mode && latest && candle.index === latest.index;
  const order = {
    id: uid(),
    symbol: state.symbol.symbol,
    side,
    qty: Number(els.paperQty.value) || 1,
    entry: candle.close,
    stop: side === "long" ? candle.close - offset : candle.close + offset,
    target: side === "long" ? candle.close + offset : candle.close - offset,
    createdBarIndex: candle.index,
    entryEditable: realtime,
    tickSize: state.symbol.tickSize,
    tickValue: state.symbol.tickValue,
    isFutures: state.symbol.isFutures
  };
  pushUndo();
  state.paper.orders.push(order);
  renderPaper();
  draw();
}

function processPaperOnVisibleCandle() {
  const candle = lastVisibleCandle();
  if (!candle) return;
  for (const order of [...state.paper.orders]) {
    if (order.symbol !== state.symbol.symbol || candle.index <= order.createdBarIndex) continue;
    const touched = order.side === "long"
      ? candle.low <= order.entry
      : candle.high >= order.entry;
    if (touched) {
      state.paper.orders = state.paper.orders.filter((item) => item.id !== order.id);
      state.paper.positions.push({ ...order, entryTime: candle.time, last: order.entry, pl: 0 });
      notify("Paper order filled", `${order.side === "long" ? "Buy" : "Sell"} ${order.qty} ${order.symbol} filled at ${priceText(order.entry)}`);
    }
  }
  for (const position of [...state.paper.positions]) {
    if (position.symbol !== state.symbol.symbol) continue;
    position.last = candle.close;
    position.pl = plFor(position, candle.close);
    const stopHit = position.side === "long" ? candle.low <= position.stop : candle.high >= position.stop;
    const targetHit = position.side === "long" ? candle.high >= position.target : candle.low <= position.target;
    if (stopHit || targetHit) {
      closePosition(position, stopHit ? position.stop : position.target, stopHit ? "Stop Loss" : "Take Profit", candle);
    }
  }
  renderPaper();
}

function plFor(trade, exit) {
  if (trade.isFutures && trade.tickSize && trade.tickValue) {
    const ticks = trade.side === "long" ? (exit - trade.entry) / trade.tickSize : (trade.entry - exit) / trade.tickSize;
    return ticks * trade.tickValue * trade.qty;
  }
  return (trade.side === "long" ? exit - trade.entry : trade.entry - exit) * trade.qty;
}

function closePosition(position, exit, reason, candle = lastVisibleCandle()) {
  state.paper.positions = state.paper.positions.filter((item) => item.id !== position.id);
  const pl = plFor(position, exit);
  state.paper.cash += pl;
  state.paper.trades.unshift({ ...position, exit, exitTime: candle?.time || new Date(), reason, pl });
  notify(`Paper trade ${reason}`, `${position.symbol} ${reason} at ${priceText(exit)} (${money(pl)})`);
  renderPaper();
  draw();
}

function notify(title, body) {
  if (!("Notification" in window)) return;
  if (Notification.permission === "granted") new Notification(title, { body });
  else if (Notification.permission !== "denied") Notification.requestPermission();
}

function renderPaper() {
  const openPL = state.paper.positions.reduce((sum, item) => sum + (item.pl || 0), 0);
  const realized = state.paper.trades.reduce((sum, item) => sum + item.pl, 0);
  els.cash.textContent = money(state.paper.cash);
  els.equity.textContent = money(state.paper.cash + openPL);
  els.openPL.textContent = money(openPL);
  els.realizedPL.textContent = money(realized);
  els.openPL.className = openPL >= 0 ? "positive" : "negative";
  els.realizedPL.className = realized >= 0 ? "positive" : "negative";
  els.pendingOrders.innerHTML = state.paper.orders.map((order) => `<div class="list-row"><strong>${order.side === "long" ? "Buy" : "Sell"} ${order.qty} ${order.symbol}</strong><span>Entry ${priceText(order.entry)} · TP ${priceText(order.target)} · SL ${priceText(order.stop)}</span></div>`).join("") || `<div class="list-row"><span>No pending orders</span></div>`;
  els.openPositions.innerHTML = state.paper.positions.map((position) => `<div class="list-row"><strong>${position.side === "long" ? "Long" : "Short"} ${position.qty} ${position.symbol}</strong><span>Entry ${priceText(position.entry)} · P/L ${money(position.pl || 0)}</span><button data-close-position="${position.id}">Close</button></div>`).join("") || `<div class="list-row"><span>No open positions</span></div>`;
  els.tradeHistory.innerHTML = state.paper.trades.map((trade) => `<div class="list-row"><strong>${trade.symbol} ${money(trade.pl)}</strong><span>${trade.reason} · ${formatDate(new Date(trade.exitTime))}</span></div>`).join("") || `<div class="list-row"><span>No closed trades</span></div>`;
  renderStats();
}

function renderStats() {
  const trades = state.paper.trades;
  const wins = trades.filter((trade) => trade.pl >= 0);
  const losses = trades.filter((trade) => trade.pl < 0);
  const net = trades.reduce((sum, trade) => sum + trade.pl, 0);
  const winSum = wins.reduce((sum, trade) => sum + trade.pl, 0);
  const lossSum = Math.abs(losses.reduce((sum, trade) => sum + trade.pl, 0));
  const rows = [
    ["Total Trades", trades.length],
    ["Wins", wins.length],
    ["Losses", losses.length],
    ["Win Rate", trades.length ? `${((wins.length / trades.length) * 100).toFixed(1)}%` : "--"],
    ["Net P/L", money(net)],
    ["Average Win", money(wins.length ? winSum / wins.length : 0)],
    ["Average Loss", money(losses.length ? lossSum / losses.length : 0)],
    ["Profit Factor", lossSum ? (winSum / lossSum).toFixed(2) : "--"],
    ["Largest Win", money(Math.max(0, ...wins.map((trade) => trade.pl)))],
    ["Largest Loss", money(Math.min(0, ...losses.map((trade) => trade.pl)))]
  ];
  els.performanceStats.innerHTML = rows.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
}

function renderWatchlist() {
  const symbols = state.watchlist.map(resolveSymbol).filter(Boolean);
  els.watchlist.innerHTML = symbols.map((symbol) => {
    const active = symbol.symbol === state.symbol.symbol;
    return `<button class="watch-row ${active ? "active" : ""}" data-symbol="${symbol.symbol}">
      <span><strong>${symbol.symbol}</strong><span>${symbol.name}</span><small>${symbol.exchange} · ${symbol.type}</small></span>
      <span class="last"><strong>${active ? priceText(lastVisibleCandle()?.close) : "--"}</strong><small>${symbol.dataAvailability || "Historical"}</small></span>
    </button>`;
  }).join("");
}

function resolveSymbol(symbolText) {
  const stock = stockCatalog.find((item) => item.symbol === symbolText);
  if (stock) return stock;
  const future = buildFuturesResults(symbolText).find((item) => item.symbol === symbolText);
  return future || null;
}

function resetReplayForSymbolChange() {
  clearInterval(state.replay.timer);
  state.replay = { ...state.replay, mode: false, choosing: false, startIndex: null, currentIndex: null, playing: false, timer: null };
  els.replayBar.classList.add("hidden");
  els.replayTab.classList.remove("hidden");
  els.replayChooser.classList.remove("hidden");
  els.replayControls.classList.add("hidden");
}

function startReplayAt(index) {
  const clamped = Math.min(Math.max(index, 0), state.candles.length - 1);
  state.replay.mode = true;
  state.replay.choosing = false;
  state.replay.startIndex = clamped;
  state.replay.currentIndex = clamped;
  state.endIndex = clamped;
  els.replayChooser.classList.add("hidden");
  els.replayControls.classList.remove("hidden");
  updateRenderedCandles();
  updateReplayTime();
  processPaperOnVisibleCandle();
  draw();
}

function stepReplay(delta) {
  if (!state.replay.mode) return;
  const next = Math.min(Math.max(state.replay.currentIndex + delta * state.replay.updates, state.replay.startIndex ?? 0), state.candles.length - 1);
  state.replay.currentIndex = next;
  if (next >= state.candles.length - 1) stopReplayPlayback();
  updateRenderedCandles();
  state.endIndex = next;
  updateReplayTime();
  processPaperOnVisibleCandle();
  draw();
}

function startReplayPlayback() {
  stopReplayPlayback();
  state.replay.playing = true;
  els.playPause.innerHTML = `<i data-lucide="pause"></i>`;
  if (window.lucide) lucide.createIcons();
  const delay = 700 / state.replay.speed;
  state.replay.timer = setInterval(() => stepReplay(1), delay);
}

function stopReplayPlayback() {
  state.replay.playing = false;
  clearInterval(state.replay.timer);
  state.replay.timer = null;
  els.playPause.innerHTML = `<i data-lucide="play"></i>`;
  if (window.lucide) lucide.createIcons();
}

function updateReplayTime() {
  const candle = state.candles[state.replay.currentIndex];
  els.replayTime.textContent = candle ? formatDate(candle.time) : "--";
}

function renderCalendar() {
  const currencies = ["ALL", ...Array.from(new Set(defaultEvents.map((event) => event.currency))).sort()];
  els.calendarCurrency.innerHTML = currencies.map((currency) => `<option>${currency}</option>`).join("");
  function update() {
    const currency = els.calendarCurrency.value;
    const now = new Date();
    const rows = defaultEvents.filter((event) => event.impact === "high")
      .filter((event) => currency === "ALL" || event.currency === currency)
      .filter((event) => {
        const date = new Date(event.timestampUtc);
        if (els.calendarRange.value === "upcoming") return date >= now;
        const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const eventDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const diffDays = Math.round((eventDay - dayStart) / 86400000);
        if (els.calendarRange.value === "today") return diffDays === 0;
        if (els.calendarRange.value === "tomorrow") return diffDays === 1;
        if (els.calendarRange.value === "week") return diffDays >= 0 && diffDays <= 7;
        return true;
      });
    let lastDay = "";
    els.calendarRows.innerHTML = rows.map((event) => {
      const day = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(new Date(event.timestampUtc));
      const heading = day !== lastDay ? `<div class="calendar-day">${day}</div>` : "";
      lastDay = day;
      return `${heading}<div class="event-row"><strong>${event.time}</strong><strong>${event.currency}</strong><span class="folder"></span><div><strong>${event.title}</strong><small>Forecast ${event.forecast || "--"} · Previous ${event.previous || "--"} · Actual ${event.actual || "--"}</small></div></div>`;
    }).join("") || `<div class="list-row"><span>No high-impact events for this filter</span></div>`;
  }
  els.calendarCurrency.addEventListener("change", update);
  els.calendarRange.addEventListener("change", update);
  update();
}

function openPanel(tabName) {
  els.sideDrawer.classList.remove("collapsed");
  els.appShell.classList.add("drawer-open");
  document.querySelectorAll(".tabs button[data-tab]").forEach((item) => item.classList.toggle("active", item.dataset.tab === tabName));
  document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.id === `${tabName}Tab`));
}

function closePanel() {
  els.sideDrawer.classList.add("collapsed");
  els.appShell.classList.remove("drawer-open");
}

function attachEvents() {
  els.search.addEventListener("input", () => {
    const rows = searchSymbols(els.search.value);
    els.results.classList.toggle("open", rows.length > 0);
    els.results.innerHTML = rows.map((item) => `<button class="search-row" data-symbol="${item.symbol}">
      <strong>${item.symbol}</strong>
      <span><strong>${item.name}</strong><small>${item.exchange} · ${item.type} · ${item.contractType || "listed"}</small></span>
      <small>${item.dataAvailability || "Historical"}</small>
    </button>`).join("");
  });
  els.results.addEventListener("click", (event) => {
    const row = event.target.closest("[data-symbol]");
    if (!row) return;
    const symbol = searchSymbols(row.dataset.symbol).find((item) => item.symbol === row.dataset.symbol) || resolveSymbol(row.dataset.symbol);
    if (!state.watchlist.includes(symbol.symbol)) state.watchlist.push(symbol.symbol);
    els.results.classList.remove("open");
    els.search.value = "";
    loadSymbol(symbol);
  });
  els.watchlist.addEventListener("click", (event) => {
    const row = event.target.closest("[data-symbol]");
    if (!row) return;
    const symbol = resolveSymbol(row.dataset.symbol);
    if (symbol) loadSymbol(symbol);
  });
  els.intervalButton.addEventListener("click", () => els.intervalMenu.classList.toggle("open"));
  els.intervalMenu.innerHTML = intervals.map((item) => `<button data-interval="${item.label}" class="${item.label === state.interval.label ? "active" : ""}">${item.label}</button>`).join("");
  els.intervalMenu.addEventListener("click", (event) => {
    const button = event.target.closest("[data-interval]");
    if (!button) return;
    state.interval = intervals.find((item) => item.label === button.dataset.interval);
    els.intervalButton.textContent = state.interval.label;
    els.intervalMenu.classList.remove("open");
    document.querySelectorAll("#intervalMenu button").forEach((item) => item.classList.toggle("active", item.dataset.interval === state.interval.label));
    loadSymbol(state.symbol);
  });
  els.paperButton.addEventListener("click", () => {
    state.paper.enabled = !state.paper.enabled;
    els.paperTicket.classList.toggle("hidden", !state.paper.enabled);
  });
  els.buyButton.addEventListener("click", () => createPaperOrder("long"));
  els.sellButton.addEventListener("click", () => createPaperOrder("short"));
  els.toolRail.addEventListener("click", (event) => {
    const button = event.target.closest("[data-tool]");
    if (button) setTool(button.dataset.tool);
  });
  els.railCollapse.addEventListener("click", toggleToolbarCollapse);
  els.railHandle.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    els.railHandle.setPointerCapture(event.pointerId);
    const rail = els.toolRail.getBoundingClientRect();
    const stage = els.chartStage.getBoundingClientRect();
    state.toolbar.dragging = true;
    state.toolbar.moved = false;
    state.toolbar.offsetX = event.clientX - rail.left;
    state.toolbar.offsetY = event.clientY - rail.top;
    state.toolbar.x = rail.left - stage.left;
    state.toolbar.y = rail.top - stage.top;
    els.toolRail.classList.add("dragging");
  });
  els.railHandle.addEventListener("pointermove", (event) => {
    if (!state.toolbar.dragging) return;
    const stage = els.chartStage.getBoundingClientRect();
    const nextX = event.clientX - stage.left - state.toolbar.offsetX;
    const nextY = event.clientY - stage.top - state.toolbar.offsetY;
    if (Math.abs(nextX - state.toolbar.x) > 2 || Math.abs(nextY - state.toolbar.y) > 2) state.toolbar.moved = true;
    applyToolbarPosition(nextX, nextY);
  });
  els.railHandle.addEventListener("pointerup", () => {
    state.toolbar.dragging = false;
    els.toolRail.classList.remove("dragging");
  });
  els.railHandle.addEventListener("pointercancel", () => {
    state.toolbar.dragging = false;
    els.toolRail.classList.remove("dragging");
  });
  els.railHandle.addEventListener("dblclick", () => {
    if (state.toolbar.moved) return;
    state.toolbar.orientation = state.toolbar.orientation === "vertical" ? "horizontal" : "vertical";
    els.toolRail.classList.toggle("vertical", state.toolbar.orientation === "vertical");
    els.toolRail.classList.toggle("horizontal", state.toolbar.orientation === "horizontal");
    updateToolbarCollapseIcon();
    if (Number.isFinite(state.toolbar.x) && Number.isFinite(state.toolbar.y)) {
      requestAnimationFrame(() => applyToolbarPosition(state.toolbar.x, state.toolbar.y));
    }
  });
  els.replayTab.addEventListener("click", () => {
    els.replayTab.classList.add("hidden");
    els.replayBar.classList.remove("hidden");
    state.replay.mode = false;
    state.replay.choosing = true;
    els.replayChooser.classList.remove("hidden");
    els.replayControls.classList.add("hidden");
  });
  els.replayClose.addEventListener("click", () => {
    if (state.replay.mode || state.replay.choosing) {
      resetReplayForSymbolChange();
      updateRenderedCandles();
      draw();
    }
  });
  els.selectReplayStart.addEventListener("click", () => { state.replay.choosing = true; });
  els.randomReplayStart.addEventListener("click", () => {
    const threeYearsAgo = Date.now() - 365 * 3 * 86400000;
    const candidates = state.candles.filter((candle) => candle.time.getTime() >= threeYearsAgo);
    const offset = Math.floor(Math.random() * Math.max(1, candidates.length - 40));
    startReplayAt(candidates[offset]?.index ?? Math.floor(state.candles.length * 0.6));
  });
  els.playPause.addEventListener("click", () => state.replay.playing ? stopReplayPlayback() : startReplayPlayback());
  els.stepForward.addEventListener("click", () => stepReplay(1));
  els.stepBack.addEventListener("click", () => stepReplay(-1));
  [0.25, 0.5, 1, 2, 5, 10].forEach((speed) => els.replaySpeed.add(new Option(`${speed}x`, speed)));
  [1, 2, 3, 5, 10, 25].forEach((updates) => els.replayUpdates.add(new Option(String(updates), updates)));
  els.replaySpeed.value = "1";
  els.replayUpdates.value = "1";
  els.replaySpeed.addEventListener("change", () => {
    state.replay.speed = Number(els.replaySpeed.value);
    if (state.replay.playing) startReplayPlayback();
  });
  els.replayUpdates.addEventListener("change", () => { state.replay.updates = Number(els.replayUpdates.value); });
  document.querySelectorAll(".tabs button[data-tab]").forEach((button) => button.addEventListener("click", () => {
    openPanel(button.dataset.tab);
  }));
  els.drawerClose.addEventListener("click", closePanel);
  els.themeButton.addEventListener("click", () => {
    const colors = ["#f4f6f9", "#ffffff", "#fdf2f8", "#eef2ff", "#ecfeff", "#f0fdf4", "#fff7ed"];
    const current = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
    const next = colors[(colors.indexOf(current) + 1) % colors.length] || colors[0];
    document.documentElement.style.setProperty("--bg", next);
    draw();
  });
  attachCanvasEvents();
  window.addEventListener("resize", () => {
    draw();
    if (Number.isFinite(state.toolbar.x) && Number.isFinite(state.toolbar.y)) {
      applyToolbarPosition(state.toolbar.x, state.toolbar.y);
    }
  });
}

function attachCanvasEvents() {
  let longTimer = null;
  els.canvas.addEventListener("pointerdown", (event) => {
    els.canvas.setPointerCapture(event.pointerId);
    const screen = pointFromEvent(event);
    const paperHit = findPaperHit(screen);
    if (paperHit?.type === "cancelOrder") {
      pushUndo();
      state.paper.orders = state.paper.orders.filter((order) => order.id !== paperHit.order.id);
      renderPaper();
      draw();
      return;
    }
    if (paperHit) {
      state.drag = { kind: "paper", hit: paperHit };
      return;
    }
    if (state.replay.choosing && !state.replay.mode) {
      const nearest = nearestCandle(screen.x);
      if (nearest) startReplayAt(nearest.index);
      return;
    }
    if (state.activeTool !== "cursor") {
      beginDrawing(screen);
      return;
    }
    state.drag = { kind: "pan", startX: event.clientX, startEnd: state.endIndex };
    longTimer = setTimeout(() => {
      state.crosshair = screen;
      state.drag = { kind: "crosshair" };
      showCrosshairLabels();
      draw();
    }, 380);
  });
  els.canvas.addEventListener("pointermove", (event) => {
    const screen = pointFromEvent(event);
    if (state.drag?.kind !== "crosshair") clearTimeout(longTimer);
    if (!state.drag) return;
    if (state.drag.kind === "pan") {
      const dx = event.clientX - state.drag.startX;
      const moved = Math.round((-dx / Math.max(1, els.canvas.clientWidth)) * state.visibleCount);
      state.endIndex = Math.min(Math.max(state.drag.startEnd + moved, state.visibleCount - 1), state.renderedCandles.length - 1);
      draw();
    } else if (state.drag.kind === "crosshair") {
      state.crosshair = screen;
      draw();
    } else if (state.drag.kind === "paper") {
      const price = scales().priceAt(screen.y);
      const { hit } = state.drag;
      if (hit.type === "entry" && hit.order.entryEditable) hit.order.entry = price;
      if (hit.type === "stop") hit.order.stop = price;
      if (hit.type === "target") hit.order.target = price;
      renderPaper();
      draw();
    } else if (state.drag.kind === "drawing") {
      updateDrawing(screen);
      draw();
    }
  });
  els.canvas.addEventListener("pointerup", () => {
    clearTimeout(longTimer);
    if (state.drag?.kind === "drawing") finishDrawing();
    if (state.drag?.kind === "crosshair") {
      state.drag = null;
      return;
    }
    state.drag = null;
  });
  els.canvas.addEventListener("click", () => {
    if (state.crosshair && !state.drag) {
      state.crosshair = null;
      hideCrosshairLabels();
      draw();
    }
  });
  els.canvas.addEventListener("wheel", (event) => {
    event.preventDefault();
    const factor = event.deltaY > 0 ? 1.12 : 0.88;
    state.visibleCount = Math.min(Math.max(Math.round(state.visibleCount * factor), 25), state.renderedCandles.length);
    draw();
  }, { passive: false });
}

function nearestCandle(xScreen) {
  const { candles, barAt } = scales();
  if (!candles.length) return null;
  const bar = barAt(xScreen);
  return candles.reduce((best, candle) => Math.abs(candle.index - bar) < Math.abs(best.index - bar) ? candle : best, candles[0]);
}

function beginDrawing(screen) {
  pushUndo();
  const point = chartPoint(screen);
  if (state.activeTool === "eraser") {
    eraseAt(screen);
    state.activeTool = "cursor";
    return;
  }
  if (state.activeTool === "vwap") return;
  const id = uid();
  const kindMap = { trend: "line", horizontal: "horizontal", rectangle: "rectangle", measure: "measure", ray: "ray", fib: "fib" };
  if (state.activeTool === "longPosition" || state.activeTool === "shortPosition") {
    const side = state.activeTool === "longPosition" ? "long" : "short";
    const offset = Math.max(point.price * 0.01, 0.01);
    state.drawings.push({ id, kind: "position", side, points: [
      point,
      { bar: point.bar + 20, price: side === "long" ? point.price + offset : point.price - offset },
      { bar: point.bar + 20, price: side === "long" ? point.price - offset : point.price + offset },
      { bar: point.bar + 38, price: point.price }
    ]});
    state.activeTool = "cursor";
    setTool("cursor");
    draw();
    return;
  }
  const drawing = { id, kind: kindMap[state.activeTool] || "line", points: [point, point] };
  if (drawing.kind === "horizontal") drawing.points = [point];
  state.drawings.push(drawing);
  state.drag = { kind: "drawing", id };
}

function updateDrawing(screen) {
  const drawing = state.drawings.find((item) => item.id === state.drag.id);
  if (!drawing) return;
  const point = chartPoint(screen);
  if (drawing.kind === "horizontal") drawing.points[0] = point;
  else drawing.points[1] = point;
}

function finishDrawing() {
  if (!["brush"].includes(state.activeTool)) {
    state.activeTool = "cursor";
    setTool("cursor");
  }
}

function eraseAt(screen) {
  const { x, y } = scales();
  state.drawings = state.drawings.filter((drawing) => {
    return !drawing.points.some((point) => Math.hypot(x(point.bar) - screen.x, y(point.price) - screen.y) < 18);
  });
  draw();
}

function showCrosshairLabels() {
  els.crosshairTime.classList.remove("hidden");
  els.crosshairPrice.classList.remove("hidden");
}

function hideCrosshairLabels() {
  els.crosshairTime.classList.add("hidden");
  els.crosshairPrice.classList.add("hidden");
}

function init() {
  if (window.lucide) lucide.createIcons();
  updateToolbarCollapseIcon();
  attachEvents();
  renderCalendar();
  renderPaper();
  loadSymbol(stockCatalog[0]);
}

init();
