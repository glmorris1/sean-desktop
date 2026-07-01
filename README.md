# Sean Desktop Backtesting

Sean Desktop is a static GitHub Pages trading/backtesting workspace inspired by TradingView workflows. It includes:

- Candlestick chart with wicks, volume, dynamic price axis, pan, zoom, and crosshair
- Time intervals from `15s` through `1D`
- Watchlist and TradingView-style symbol search for stocks and futures roots such as `MES`
- Futures metadata for continuous contracts such as `MES1!`, `ES1!`, `NQ1!`, and dated contract search results
- Backtest Replay with select-start, random start, play/pause, step forward/back, speed, and update interval
- Paper Trading orders with Buy/Sell ticket, quantity, entry/TP/SL lines, locked historical entries, and P/L tracking
- Drawing tools including trend line, horizontal line, rectangle, measure, ray, fib retracement, long/short position, VWAP display, eraser, and undo
- Explore tab with high-impact economic calendar rows using normalized event data

## Run Locally

```sh
python3 -m http.server 4188
```

Then open `http://localhost:4188`.

## Data

The app is built to consume a normalized backend if available. Set this in browser devtools:

```js
localStorage.setItem("seanDesktop.backendBaseURL", "https://your-backend.example.com")
```

The backend candle endpoint should return JSON from:

```txt
GET /candles?symbol=AAPL&exchange=NASDAQ&timeframe=10m
```

Expected candle fields:

```json
{
  "symbol": "MES1!",
  "exchange": "CME",
  "timeframe": "5m",
  "timestamp": "2026-06-29T14:35:00Z",
  "open": 6125.25,
  "high": 6128.00,
  "low": 6123.75,
  "close": 6126.50,
  "volume": 1842
}
```

If no backend is configured, the static page attempts public historical chart data and uses a generated fallback only if network access fails.

## GitHub Pages

This repo is designed to publish from the root of the `main` branch.
