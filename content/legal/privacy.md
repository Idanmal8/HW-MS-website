---
title: Privacy policy
description: What Hard Will collects, where it is kept, who it is shared with, and how to get it deleted.
updated: 2026-10-07
---

Hard Will is a free desktop companion for MapleStory, made by an independent developer based in Israel. This policy covers the Hard Will desktop app, the Hard Will API that the app talks to, and this website. It says exactly what we handle and why, in plain words.

## The short version

- Your **account data** (your characters, their gear and progress, your boss and daily trackers) is stored in our database so it follows you between PCs.
- **Screenshots of the game window** are read by the AI provider *you* choose, with *your* API key. We pass them through and do not keep them.
- **Your AI key** stays on your PC, encrypted. It travels with each AI request and is never stored or logged on our side.
- If you connect Google to export to Sheets, Hard Will can only see the files it creates in your Drive, and that connection also stays on your PC.
- We do not sell data, show ads or use analytics or tracking cookies.
- You can delete your account and everything in it at any time, in the app: **Settings > Delete account**.

## What we collect and why

### Your account
When you sign in with Google, Discord or email, we receive and store a unique account id from our sign-in provider (Firebase Authentication, run by Google), your email address and your display name if the provider gives one. We use them only to sign you in and to keep your data separate from everyone else's.

### Your game data
Everything you track in Hard Will is saved to your account: character names, worlds, classes and levels, EXP history, recorded equipment and its stats, HEXA and liberation plans, boss and daily setups and what you have checked off. This is the point of the app, so it works on any PC you sign in from.

### Screenshots and AI requests
When you take a snapshot, record items, scan your character list or HEXA, the app captures the MapleStory window (only that window, and only while you use one of those features). It sends the image through the Hard Will API to the AI provider that your key belongs to (Anthropic, OpenAI or Google), which reads it and returns the values. The same goes for questions you ask the AI search.

- The Hard Will API **does not store** the images, your questions or the answers. It records only which kind of read it was, the provider and model, and how many tokens it used, so problems can be diagnosed.
- Screenshots can show whatever is on the game screen at that moment, for example other players' names or chat. Avoid capturing what you would not want an AI provider to see.
- The provider handles the request under **its own terms and privacy policy**, under your account with them. Some providers' free tiers (for example, Google AI Studio's free tier) may use inputs to improve their products. Check your provider's terms.
- The app also keeps the captured images on your PC (see below).

### Your AI key
Your API key is stored only on your PC, encrypted for your Windows user. Each AI request carries it to the Hard Will API, which uses it for that single request to call your provider and then forgets it. It is never written to our database or our logs. You pay your provider directly.

### Google account (Sheets export)
If you choose **Connect Google** in Settings to export to Google Sheets, you sign in to Google in your browser and allow two things: access to **files Hard Will creates** in your Google Drive (Google's `drive.file` permission; Hard Will cannot see or change any other file), and your **email address**, shown in Settings so you know which account is connected.

- The connection (a Google token) is stored only on your PC, encrypted for your Windows user. It is never sent to Hard Will's servers.
- When you export, the app writes your Hard Will data (characters, gear, bosses, dailies, EXP) from your PC straight into a spreadsheet called *hard-will-progression-sheet* in your Drive. Our servers are not involved and keep no copy.
- **Disconnect** in Settings revokes the connection with Google and deletes it from your PC; uninstalling deletes it too. The spreadsheet stays in your Drive until you delete it. You can also remove Hard Will's access at any time in your Google Account settings, under third-party connections.
- Hard Will's use of information received from Google APIs adheres to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements: the data is used only to write your export, is not transferred to anyone, and is not used for advertising.

### Search
Guide search looks through an index we build from public pages of Grandis Library, the MapleStory Wiki and Nexon's news. Your searches are not saved by the app.

### Server logs
Like any web service, our hosting (Google Cloud) automatically keeps request logs: your IP address, the time, the address requested (which for a search includes the search words) and the response status. They are used to keep the service running and secure and are deleted automatically, normally within 30 days.

### Supporters
If you support Hard Will on Patreon, Patreon shares your name, tier and pledge status with us. Names of supporters in the credited tier are shown on the [supporters page](/supporters). Patreon handles payments; we never see card details.

## Data on your PC

The app keeps a folder on your PC (`%LOCALAPPDATA%\Hard Will` for the website installer) with: captured screenshots and item tooltips, item icons and character pictures, your layout choices, an error log, a record of your daily AI spending, and your sign-in, AI key and Google connection (if any), encrypted. **Uninstalling Hard Will deletes this folder.** It never leaves your PC except for the AI requests described above.

## Other services the app contacts directly

To fill in your dashboards, the app downloads public data straight from:

- **Nexon** (nexon.com): the public rankings for your characters' names (avatar, class, rank), server status and maintenance times.
- **maplestory.io**: item icons, looked up by item name.
- **maplehub.app**: skill icons.

These requests come from your PC, so those services see your IP address, under their own policies.

## Where data is kept

Your account and game data are stored with Supabase in the European Union (Ireland). The Hard Will API and installer downloads run on Google Cloud in the European Union (Belgium). Sign-in uses Firebase Authentication (Google). This website is hosted by Vercel. AI providers process requests where they operate, which may be the United States.

## Who we share data with

Only the service providers above, each for the purpose described: Google (sign-in, hosting, logs, and your own Drive if you export to Sheets), Supabase (database), Vercel (website), the AI provider you choose (screen reading and AI search, with your key) and Patreon (if you support). We do not sell or rent personal data, and we do not share it for advertising.

## How long we keep it

Account and game data are kept until you delete it or your account. Deleting your account removes it from our database immediately, along with your sign-in. Server logs are deleted automatically, normally within 30 days.

## Your choices and rights

You can view and change your data in the app, delete characters at any time, and **delete your whole account** in **Settings > Delete account**: your characters and everything recorded for them, your trackers and planners, and your sign-in are deleted for good. Uninstalling the app removes everything stored on your PC. You can also ask us to export or correct your data, or to delete it for you, by contacting us (below); we will do it within 30 days. Depending on where you live (for example under the EU GDPR or Israel's Privacy Protection Law) you may have further rights, including complaining to your local data protection authority.

## Children

Hard Will is not meant for children under 13, and we do not knowingly collect data from them. If you believe a child under 13 has an account, contact us and we will delete it.

## This website

This website has no analytics, ads or tracking cookies. It remembers your light or dark theme choice in your browser. Its host, Vercel, keeps standard request logs.

## Changes

If this policy changes, we will update this page and the date at the top. For significant changes we will also say so in the app.

## Contact

Questions, data requests or deletion requests: send a message through our [Patreon page](https://www.patreon.com/cw/IdanMalka/membership), which you can do without supporting.
