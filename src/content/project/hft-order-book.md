---
title: "HFT Order Book Analysis"
description: "Real-time market data processing and order book visualization tool built for HFT strategy analysis using Python and React."
publishDate: "10 January 2024"
techStack: ["Python", "React", "WebSocket", "Canvas", "asyncio"]
featured: true
blogUrl: "https://gauryash.github.io/blog/order-book-visualizer/"
---

## Overview

A real-time order book visualization tool that streams market data over WebSocket and renders depth charts at 60fps. Designed to help traders and analysts read market microstructure at a glance — spotting liquidity walls, iceberg orders, and spoofing patterns faster than scanning numeric tables.

## Architecture

The system splits at the data boundary:

```
Exchange Feed → Python Aggregator (asyncio) → WebSocket → React Client (Canvas)
```

**Python Aggregator.** A lightweight asyncio server subscribes to the exchange's market data feed over TCP, normalises messages into a standard order book diff format, and pushes snapshots over WebSocket. The normalisation layer abstracts exchange-specific depth formats (full snapshots vs incremental updates) into a single schema.

**React Client.** A single-page dashboard maintaining a local copy of the order book, applying diffs as they arrive, and rendering directly to a `<canvas>` element. No charting library — the rendering loop draws directly to canvas for maximum performance control.

## Key Results

- **95% reduction in draw calls** via dirty-region rendering (only repainting changed price levels)
- **60fps rendering** on mid-range hardware with hundreds of updates per second
- **Sub-2ms latency** between exchange feed receipt and visual update

## Tech Stack

- **Python 3.11+** with asyncio for the data aggregator
- **React 18** with hooks for client state management
- **Canvas API** for direct rendering (no charting library overhead)
- **WebSocket** for real-time data transport

## Learnings

The most important insight was that most updates touch only the top few price levels. By maintaining a dirty region set and only repainting changed rows, the render cost dropped by an order of magnitude compared to redrawing the full book on every frame.

If I rebuilt this today, I'd replace the custom canvas renderer with WebGL for the depth bars to reduce CPU usage, and add a heatmap mode that colours levels by rate-of-change in size rather than absolute volume.
