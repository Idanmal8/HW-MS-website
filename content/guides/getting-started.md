---
title: Getting started with Hard Will
description: Install Hard Will on Windows, sign in, connect your own AI key and add your MapleStory characters in about two minutes.
order: 1
updated: 2026-10-05
readingMinutes: 3
steps:
  - name: Download the installer
    text: Go to the Hard Will download page and download the Windows installer.
  - name: Run the installer
    text: Open the downloaded file. If Windows SmartScreen appears, choose More info, then Run anyway.
  - name: Sign in
    text: Open Hard Will and sign in with Google, Discord or email. Finish signing in in your browser, then come back to the app.
  - name: Connect your AI
    text: Paste an API key from Anthropic (Claude), OpenAI or Google (Gemini). Hard Will checks it with your provider and stores it in Windows Credential Manager.
  - name: Open MapleStory
    text: Start MapleStory in windowed mode and go to the character select screen.
  - name: Capture your characters
    text: Press Capture my characters, then flip through the pages of the character select screen. Each page is read and your characters are added to your account.
---

Hard Will turns what is on your MapleStory screen into a dashboard you can plan with. This guide takes you from download to your first character snapshot.

## What you need

- Windows 10 or 11 (64-bit)
- Global MapleStory (GMS), running in **windowed** or **borderless** mode
- An API key from [Anthropic](https://platform.claude.com/settings/keys) (Claude), [OpenAI](https://platform.openai.com/api-keys) or [Google](https://aistudio.google.com/apikey) (Gemini), which reads your screenshots. A Claude Pro, ChatGPT Plus or Gemini subscription does not include API access.

## 1. Download and install

1. Open the [download page](/download) and download the Windows installer.
2. Run it. Early-access builds are new to Microsoft SmartScreen, so you may see *Windows protected your PC*. Choose **More info → Run anyway**.
3. Hard Will opens when the install finishes. From then on it updates itself: when a new version is out, an **Update available** card appears in the sidebar.

## 2. Sign in

Sign in with **Google**, **Discord** or **email**, approve in your browser, then come back to Hard Will. Your characters, bosses and dailies are saved to your account, so they survive reinstalls and follow you between PCs. A short guide opens on your first sign in and walks you through the next two steps.

## 3. Connect your AI

Hard Will reads your game screen and answers questions with AI, using your own key. You pay your provider directly, a few cents per read.

1. Pick a provider and create an API key there (each provider card has a **Get a key** link).
2. Paste the key and choose **Check & save**. Hard Will checks it with your provider before saving it.
3. The key is stored in Windows Credential Manager on this PC. Each AI request carries it to the Hard Will API, which uses it for that request only and never stores or logs it.

The Game HUD shows how much you have spent today, for example *API today $0.04 · 6 calls*.

## 4. Capture your characters

1. Start MapleStory in **windowed** mode (full screen hides the game from captures) and go to the **character select** screen.
2. In Hard Will, press **Capture my characters**. Hard Will shrinks to a small bar at the top of your screen.
3. Flip through every page of your character list. Each page is read and its characters are added to your account.
4. Choose **Open app** in the bar to come back. Your characters are in the sidebar.

After that, open the **Game HUD** while you play to capture stats, HEXA levels and equipment.

> Hard Will only takes screenshots of the game window when you press a button. It never reads game memory, injects into the client or sends input to the game.

## Next steps

- [Record your gear](/guides/recording-items) by hovering each item.
- [Read your dashboard](/guides/reading-your-dashboard) to find your next upgrade.
