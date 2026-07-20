# DataHegemon — Company Website

Marketing website for **DataHegemon**, an automation & data engineering studio.

🌐 **Live:** https://datahegemon.co.in

## About

A single-page, fully self-contained website — plain HTML, CSS, and vanilla JavaScript with **no build step and no dependencies**. It showcases DataHegemon's automation capabilities and case studies, with a working contact form and a reels-style interactive project gallery.

The logo, all styles, and all scripts are embedded directly in the HTML, so the entire site is one portable file.

## Structure

```
deploy/
└── index.html   # the entire website (styles, scripts, and logo embedded)
```

## Hosting & deployment

The site is hosted on **Netlify**.

- **Manual deploy:** drag the `deploy/` folder onto the site's **Deploys** tab in Netlify.
  (Do not use the `app.netlify.com/drop` page — that creates a new site each time.)
- **Contact form:** handled by **Netlify Forms**. Submissions appear under **Forms → contact**
  in the Netlify dashboard and are emailed to `info@datahegemon.co.in`.
- **HTTPS:** free Let's Encrypt certificate, auto-renewed by Netlify.

## Editing

Everything lives in `deploy/index.html`. Open it, make your changes, then redeploy the
`deploy/` folder to Netlify.

## Contact

📧 info@datahegemon.co.in
