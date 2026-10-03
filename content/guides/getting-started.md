---
title: Getting started with Hard Will
description: Install Hard Will on Windows, sign in with Discord, add your Claude key and take your first MapleStory character snapshot in about two minutes.
order: 1
updated: 2026-10-03
readingMinutes: 3
steps:
  - name: Download the installer
    text: Go to the Hard Will download page and download the Windows installer.
  - name: Run the installer
    text: Open the downloaded file. If Windows SmartScreen appears, choose More info, then Run anyway.
  - name: Sign in with Discord
    text: Open Hard Will and choose Continue with Discord. Finish signing in in your browser, then come back to the app.
  - name: Add your Claude API key
    text: Open Settings and paste your Anthropic API key. Hard Will checks it with Anthropic and stores it in Windows Credential Manager.
  - name: Open MapleStory
    text: Start MapleStory and log in to the character you want to track, in windowed or borderless mode.
  - name: Take a character snapshot
    text: In Hard Will, press Character snapshot. Your name, class, level and EXP appear in a new dashboard.
---

Hard Will turns what is on your MapleStory screen into a dashboard you can plan with. This guide takes you from download to your first character snapshot.

## What you need

- Windows 10 or 11 (64-bit)
- Global MapleStory (GMS), running in **windowed** or **borderless** mode
- An [Anthropic API key](https://console.anthropic.com/) for Claude, which reads your screenshots

## 1. Download and install

1. Open the [download page](/download) and download the Windows installer.
2. Run it. Early-access builds are new to Microsoft SmartScreen, so you may see *Windows protected your PC*. Choose **More info → Run anyway**.
3. Hard Will opens when the install finishes.

## 2. Sign in with Discord

Choose **Continue with Discord**, approve in your browser, then come back to Hard Will. Your characters, bosses and dailies are saved to your account, so they survive reinstalls and follow you between PCs.

## 3. Add your Claude API key

Hard Will reads screenshots with Claude, using your own key.

1. Open **Settings** from the sidebar.
2. Paste your Anthropic API key. Hard Will checks it with Anthropic before saving it.
3. The key is stored in Windows Credential Manager on this PC and is only ever sent to Anthropic, never to Hard Will's servers.

The Game HUD shows how much you have spent today, for example *API today $0.04 · 6 calls*.

## 4. Take your first snapshot

1. Start MapleStory and log in to the character you want to track.
2. In Hard Will, press **Character snapshot**.
3. Hard Will captures the game window and reads your name, class, level and EXP, then matches the character with the Nexon rankings. A dashboard for that character appears in the sidebar.

Take a snapshot whenever you want a new point on your progress history, for example after a bossing run or at the end of a leveling session.

> Hard Will only takes screenshots of the game window when you press a button. It never reads game memory, injects into the client or sends input to the game.

## Next steps

- [Record your gear](/guides/recording-items) by hovering each item.
- [Read your dashboard](/guides/reading-your-dashboard) to find your next upgrade.
