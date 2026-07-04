---
title: 'Building a Real-Time Order Book Visualizer'
publishDate: '14 March 2024'
description: 'How I built a real-time order book dashboard that streams market data over WebSocket and renders depth charts at 60fps using React and Python.'
tags: ['python', 'react', 'hft', 'data-visualization']
---

Market data moves fast. At an HFT desk, the order book is the single source of truth for where liquidity sits, where it's moving, and where it might go next. Watching it update row by row in a terminal is functional, but you miss the shape.

I built a real-time order book visualizer to turn the level-2 feed into something you can read at a glance.

## Architecture

The stack splits at the data boundary:

```
Exchange Feed → Python Aggregator (WebSocket) → React Client (Canvas)
```

**Python aggregator.** A lightweight asyncio server subscribes to the exchange's market data feed over TCP, normalises the messages into a standard order book diff format, and pushes snapshots over a WebSocket connection. The normalisation layer is the critical piece: every exchange formats depth differently (some send full snapshots, some send incremental updates, some batch events into arrays). The aggregator abstracts that into a single `{ bids: [][2], asks: [][2], sequence: number }` schema.

**React client.** A single-page dashboard that maintains a local copy of the order book, applies diffs as they arrive, and renders the state on a `<canvas>` element at 60fps. No charting library — the rendering loop draws directly to canvas for maximum control over performance.

## Rendering loop

The naive approach is to rebuild the entire canvas on every frame. With an order book that updates hundreds of times per second, that means garbage pressure and dropped frames.

The key insight is that most updates touch only the top few price levels. Instead of redrawing the full book, the render function maintains a dirty region: it tracks which price levels changed since the last frame and only repaints those rows. For a 50-level visible window where only 2–3 levels change per update, this reduces draw calls by roughly 95%.

```python
# In practice: the dirty set tracks changed price levels
# and the render loop only redraws those rows + the midprice
dirty_levels = set()
def on_diff(update):
    for level in update.changes:
        dirty_levels.add(level.price)
    schedule_render()
```

## Visual encoding

Every row shows three values:

- **Price** — left-aligned, monospaced digits. Green for bid, red for ask.
- **Size** — a horizontal bar proportional to the cumulative volume at that level. The bar length gives an instant visual read of depth.
- **Delta** — a small label showing the size change since the last snapshot, colour-coded green (added) or red (removed).

The cumulative bar is the most useful single visualisation in the tool. A wall of liquidity at a specific price level stands out as a long bar, even if the trader isn't scanning the numbers. In practice, this catches iceberg orders and spoofing patterns faster than any numeric scan.

## WebSocket reconnection

Real-time feeds drop. Networks stall. The aggregator handles reconnection with exponential backoff capped at 30 seconds. The client shows a connection status indicator in the corner:

```
● Connected    seq: 8417293    latency: 2.1ms
○ Reconnecting... (attempt 3 / 12s)
```

When the connection drops, the client freezes the last valid book state rather than clearing it. A stale book is misleading, but a blank screen is useless. The frozen state persists with a translucent overlay warning that data is delayed.

## What I'd change

If I rebuilt this today, I'd replace the custom canvas renderer with WebGL for the depth bars. The 60fps 2D canvas loop works, but it pegs a core at 15–20% CPU on the mid-range laptop I use for development. Offloading the bar rendering to a WebGL instance would drop that to near zero.

I'd also add a heatmap mode that colours each price level by the rate of change in its size, not just the absolute value. A level that's growing rapidly is often more interesting than a level that's just large — it signals intent.
