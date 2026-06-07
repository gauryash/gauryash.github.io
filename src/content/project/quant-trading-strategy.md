---
title: "Quantitative Trading Strategy"
description: "An algorithmic trading bot with a backtesting engine for evaluating intraday strategies on historical order-book data."
publishDate: "15 June 2023"
techStack: ["Python", "Pandas", "NumPy", "PostgreSQL", "Redis"]
featured: true
---

## Overview

A backtesting framework and live trading bot designed to evaluate intraday trading strategies against historical order-book data. The system simulates fills, tracks P&L, and generates performance metrics — all without requiring a live market connection during the research phase.

## Architecture

The system has three layers:

```
Historical Data → Backtesting Engine → Strategy Module → Performance Analysis
```

**Data Layer.** Historical order-book snapshots are stored in a PostgreSQL database with time-series optimisations. A Redis cache layer speeds up repeated access to commonly queried date ranges during strategy iteration.

**Backtesting Engine.** The core engine replays market data through a strategy's entry/exit logic at configurable tick granularity. It simulates fills based on available liquidity at each price level — no assumption of infinite slippage, no unrealistic fill guarantees.

**Strategy Module.** Strategies are defined as composable Python classes with `on_tick`, `on_signal`, and `on_order_update` hooks. This makes it straightforward to test variations by modifying individual components rather than rewriting entire strategies.

## Key Results

- **60% reduction** in end-of-day settlement review time through automated reconciliation reports
- **Backtested 50+ strategy variants** across 2 years of historical data in under 4 hours
- **Zero false fill assumptions** — every backtested trade accounts for available order-book liquidity

## Tech Stack

- **Python 3.11** with Pandas and NumPy for data analysis
- **PostgreSQL** with TimescaleDB extension for time-series market data
- **Redis** for caching frequently accessed data slices
- **Custom event-loop** for tick-by-tick replay without live market connection

## Learnings

The hardest problem wasn't the strategy logic — it was data quality. Exchange feeds have gaps, duplicate messages, and out-of-order sequences. Building a robust normalisation layer that could handle these edge cases without silently corrupting backtest results took more engineering effort than the strategy engine itself.

A useful design decision was making strategies composable rather than monolithic. Separating signal generation from order management from risk checks meant we could test each component independently and swap implementations without touching the rest of the pipeline.
