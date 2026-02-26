# Reza — IT Specialist & Web Developer Portfolio

A fully responsive, animated **5-page personal portfolio** built with pure
**HTML5 · CSS3 · Vanilla JavaScript** — zero frameworks, zero dependencies.
Ready for VS Code + Live Server and instant GitHub Pages deployment.

---

## Project Structure

```
reza-portfolio/
│
├── index.html                  ← Single entry point (all 5 pages inside)
│
├── css/
│   ├── variables.css           ← Design tokens (colors, spacing, typography)
│   ├── base.css                ← CSS reset, body, cursor, grain overlay
│   ├── layout.css              ← Navigation, page system, container, footer
│   ├── components.css          ← Buttons, cards, badges, forms, toast, modal
│   └── pages.css               ← Per-page section styles (hero, about, etc.)
│
├── js/
│   ├── main.js                 ← Router, nav, hamburger, scroll reveal
│   └── interactions.js         ← Modal, contact form, project filter, toast
│
├── pages/                      ← HTML reference partials (documentation only)
│   ├── home.html
│   ├── about.html
│   ├── services.html
│   ├── portfolio.html
│   ├── projects.html           ← Page 5: Projects & Testing Results
│   └── contact.html
│
├── assets/
│   ├── pdf/
│   │   └── Reza-CV.pdf         ← PUT YOUR CV PDF FILE HERE (rename to Reza-CV.pdf)
│   ├── img/                    ← Add your profile photo here
│   └── icons/                  ← Add custom icons here
│
└── README.md
```

---

## How to Run Locally (VS Code)

1. Unzip the folder anywhere on your computer
2. Open the folder in VS Code (File > Open Folder)
3. Install extension: Live Server (by Ritwick Dey)
4. Right-click index.html > Open with Live Server
5. Browser opens at http://127.0.0.1:5500

Or just double-click index.html to open directly in browser.

---

## Deploy to GitHub Pages (Free)

1. Create a new GitHub repository (e.g. reza-portfolio)
2. Upload all project files to the root
3. Settings > Pages > Source: Deploy from branch > main / root > Save
4. Wait 1-2 minutes. Live at: https://yourgithubusername.github.io/reza-portfolio/

---

## Customization

### Add Your CV (PDF) - IMPORTANT
- Create your CV in Canva, Word, or Google Docs → export as PDF
- Rename it exactly: Reza-CV.pdf
- Place it in: assets/pdf/Reza-CV.pdf
- All download buttons already point to this path automatically!

### Update Contact Info (in index.html, use Ctrl+H to Find & Replace)
- your@email.com → your real email
- yourusername → your LinkedIn username
- +62 xxx xxxx xxxx → your phone

### Update Prices
Search "Starting at $" in index.html and change amounts to your rates.

### Add Your Photo
Place photo in assets/img/your-photo.jpg, then in index.html replace
the emoji in .avatar-circle with an img tag.

---

## Features
- 6 navigation pill buttons (no dropdowns)
- Scroll reveal animations (fade-up, left, right)
- Custom glowing cursor
- Animated hero with floating skill chips
- Animated skill bars (About page)
- Order modal popup per service
- Project filter by category (Page 5)
- Contact form with toast notification
- CV PDF direct download
- Fully mobile responsive with hamburger menu
- Zero frameworks — pure HTML/CSS/JS
