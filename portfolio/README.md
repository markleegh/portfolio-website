# Portfolio Website

A dark, terminal-aesthetic developer portfolio built with Python & Flask.

## Project Structure

```
portfolio/
├── app.py                  # Flask app & portfolio data
├── requirements.txt
├── templates/
│   └── index.html          # Main HTML template (Jinja2)
└── static/
    ├── css/
    │   └── style.css       # All styles
    └── js/
        └── main.js         # Interactions (filter, form, scroll)
```

## Quick Start

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run the dev server
python app.py
```

Open http://localhost:5000 in your browser.

## Personalization

Edit the `PORTFOLIO` dictionary at the top of `app.py`:

- **name / title / tagline / about** — your intro copy
- **email / github / linkedin / location** — your links
- **skills** — add/remove categories and items
- **projects** — add your real projects (set `featured: True` for top picks)
- **experience** — your work history

## Features

- **Project filter** — filter by technology tag (Python, React, etc.)
- **Contact form** — `/api/contact` endpoint (add email sending in production)
- **Projects API** — `/api/projects?tag=Python` returns JSON
- **Scroll animations** — cards fade in as you scroll
- **Active nav** — highlights current section while scrolling

## Production Deployment

For production, use Gunicorn instead of the built-in dev server:

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

Deploy to: Render, Railway, Fly.io, or any Python hosting platform.
