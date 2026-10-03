---
title: How the star force calculator works
description: How Hard Will estimates star force cost in GMS v.271, including Safeguard, MVP discounts, 30% off events, boom reduction and Enhancement Mode.
order: 4
updated: 2026-10-03
readingMinutes: 5
---

Hard Will's star force calculator estimates the **expected meso cost** and **expected booms** to take an item from one star to another in Global MapleStory, using the rates current as of **v.271**.

## What changed recently

- **v.264**: star force cap raised to **30★**. Failures at 15★ and above keep the star instead of dropping. Safeguard costs +200% and works from 15★ to 17★.
- **v.269**: **Enhancement Mode** added for 15★ → 21★, with four levels.
- **v.271**: Star Catching removed. Its +5% relative success bonus is now built into the base rates.

## Max stars by item level

| Item level | Max stars |
| --- | --- |
| Below 95 | 5 |
| 95 to 107 | 8 |
| 108 to 117 | 10 |
| 118 to 127 | 15 |
| 128 to 137 | 20 |
| 138+ | 30 |

## Options you can toggle

- **Safeguard 15 to 17**: prevents booms at those stars for +200% of the base cost.
- **30% off** events (the discount does not apply to the Safeguard premium).
- **MVP discounts**: Silver 3%, Gold 5%, Diamond 10%, for stars up to 16.
- **30% fewer booms** events.
- **Enhancement Mode** for 15★ → 21★.

## How expected cost is computed

Instead of simulating thousands of random runs, Hard Will solves the expected cost exactly. Each star is a state; from it you can succeed, fail and stay, or boom and drop back to a lower star (plus the cost of replacing the item). Solving that system gives the average meso and boom count. With **Cheapest** selected, Hard Will also picks the cheapest option per star, for example whether Safeguard pays off.

Rates for Enhancement Mode are community-measured and may change as more data comes in.
