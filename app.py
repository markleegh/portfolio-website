"""
app.py
Main Flask entry point for the personal portfolio website.
"""

from flask import Flask, render_template, request, flash, redirect, url_for

app = Flask(__name__)
app.secret_key = "dev-secret-key-change-this-in-production"

PROJECTS = [
    {
        "title": "Realtime Chat Application",
        "description": (
            "A WebSocket-based chat platform supporting multiple rooms, "
            "typing indicators, and message persistence backed by Redis "
            "pub/sub for horizontal scaling."
        ),
        "skills": ["Python", "Flask-SocketIO", "Redis", "PostgreSQL"],
        "github_url": "https://github.com/yourusername/realtime-chat-app",
    },
    {
        "title": "E-Commerce Inventory Dashboard",
        "description": (
            "An internal analytics dashboard that visualizes stock levels, "
            "sales velocity, and reorder alerts using interactive charts "
            "and a REST API layer."
        ),
        "skills": ["Python", "Flask", "Chart.js", "SQLAlchemy"],
        "github_url": "https://github.com/yourusername/inventory-dashboard",
    },
    {
        "title": "Automated Resume Parser",
        "description": (
            "A document-processing microservice that extracts structured "
            "candidate data from PDF and DOCX resumes using NLP entity "
            "recognition."
        ),
        "skills": ["Python", "spaCy", "PyPDF2", "Docker"],
        "github_url": "https://github.com/yourusername/resume-parser",
    },
    {
        "title": "Personal Finance Tracker API",
        "description": (
            "A RESTful budgeting API with JWT authentication, recurring "
            "transaction rules, and monthly spending reports delivered "
            "via scheduled email digests."
        ),
        "skills": ["Python", "Flask-RESTful", "JWT", "Celery"],
        "github_url": "https://github.com/yourusername/finance-tracker-api",
    },
    {
        "title": "Markdown Blog Engine",
        "description": (
            "A lightweight static-site-generator style blogging engine "
            "that converts Markdown posts into cached HTML with full-text "
            "search support."
        ),
        "skills": ["Python", "Flask", "Markdown2", "SQLite"],
        "github_url": "https://github.com/yourusername/markdown-blog-engine",
    },
    {
        "title": "Weather Forecast CLI + Web App",
        "description": (
            "A dual-interface weather tool sharing a common backend "
            "service layer, offering both a command-line client and a "
            "browser-based dashboard with geolocation."
        ),
        "skills": ["Python", "Flask", "Click", "OpenWeather API"],
        "github_url": "https://github.com/markleegh/python-projects",
    },
]


@app.route("/")
def index():
    """Home / landing page."""
    return render_template("index.html", active_page="home")


@app.route("/projects")
def projects():
    """Projects page - renders the PROJECTS list into a bento-style grid."""
    return render_template(
        "projects.html", projects=PROJECTS, active_page="projects"
    )


@app.route("/contact", methods=["GET", "POST"])
def contact():
    """Contact page - handles GET (render form) and POST (process form)."""
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        message = request.form.get("message", "").strip()

        errors = []
        if not name:
            errors.append("Please enter your name.")
        if not email or "@" not in email or "." not in email.split("@")[-1]:
            errors.append("Please enter a valid email address.")
        if not message or len(message) < 10:
            errors.append("Please enter a message of at least 10 characters.")

        if errors:
            for error in errors:
                flash(error, "error")
            return redirect(url_for("contact"))

        app.logger.info(
            "New contact form submission from %s <%s>: %s", name, email, message
        )

        flash(
            f"Thanks, {name}! Your message has been received. "
            "I'll get back to you shortly.",
            "success",
        )
        return redirect(url_for("contact"))

    return render_template("contact.html", active_page="contact")


if __name__ == "__main__":
    app.run(debug=True)