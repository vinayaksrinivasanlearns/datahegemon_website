# DataHegemon — Apartment Management System website

Marketing website for the **Apartment Management System**: maintenance dues, receipts and
reminders for housing societies, on WhatsApp.

🌐 **Live:** https://datahegemon.co.in · Contact: info@datahegemon.co.in

The app itself (WhatsApp bot and admin portal at `app.datahegemon.co.in`) lives in a separate
project. This repository is only the public website; it links to the app's login and privacy pages.

## What's on the page

- Features, the monthly cycle and the full flow (resident · committee · system)
- Narrated 1080p video guides for residents and admins (`public/videos/`)
- Interactive step-by-step WhatsApp guides (`public/guides/*.html`, self-contained)
- Contact form on **Netlify Forms** (form `contact`): submissions appear under Forms → contact in
  Netlify and are emailed to info@datahegemon.co.in. The hidden `<form name="contact">` in
  `index.html` must list the same fields as the form in `src/App.jsx`, or Netlify drops them.

Everything described must match the **current** app code. Features removed from the app
(e.g. the join selfie, the 2-minute chat close, Update/Remove a resident) must not appear here.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # output in dist/
```

React 19 + Vite. Page: `src/App.jsx`, styles: `src/styles.css`.

## Deploy (Netlify)

The site is the Netlify project **datahegemoncoin**, deployed manually (no Git link):

```bash
npm run build
npx netlify-cli deploy --dir dist --site bea76d44-969c-49c0-9837-4d400e7018ed --prod
```

Netlify keeps every deploy; roll back from the project's **Deploys** tab.

## Videos

`.narration/` builds the narrated videos from the guides in `public/guides/`, so after changing a
guide, rebuild the videos too (needs Python with `playwright` and `edge-tts`, and ffmpeg):

1. `npm run dev`, then `python render.py`: stills of every slide, message by message (1920×1080)
2. `python build.py ../public/videos`: voice (en-US-ChristopherNeural via edge-tts), stills timed
   to the narration, cross-fades, 1080p H.264

`script.py` has one narration line per guide slide (`full` and `short`); keep it in the same
order as the guide's slides.

## Archive

`archive/automation-studio/index.html` is the previous site (DataHegemon — Automation & Data
Engineering Studio), live until 16 Nov 2026. It is self-contained and is not deployed.
