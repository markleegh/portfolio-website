from flask import Flask, render_template, request, jsonify
import datetime

app = Flask(__name__)

# --- Portfolio Data (edit this to personalize) ---
PORTFOLIO = {
    "name": "Mark Lee",
    "title": "Full-Stack Developer and Technical Recruiter",
    "tagline": "I build things that live on the internet.",
    "about": (
        "I'm a developer with 5+ years of experience crafting web applications, "
        "APIs, and interactive experiences. I care deeply about clean code, "
        "thoughtful design, and building tools that actually help people."
    ),
    "email": "yeelee5652@gmail.com",
    "github": "https://github.com/markleegh",
    "linkedin": "https://www.linkedin.com/in/mark-lee-609425285/",
    "location": "Manila, Philippines",
    "skills": [
        {"category": "Languages", "list": ["Python", "JavaScript", "TypeScript", "SQL", "Bash"]},
        {"category": "Frameworks", "list": ["Flask", "FastAPI", "React", "Next.js", "Node.js"]},
        {"category": "Tools", "list": ["Docker", "PostgreSQL", "Redis", "Git", "AWS"]},
        {"category": "Practices", "list": ["REST APIs", "CI/CD", "TDD", "Agile", "System Design"]},
    ],
    "projects": [
        {
            "title": "Morse Code Converter",
            "description": "A Python-powered CLI tool and web API that converts text to Morse code and back, with audio playback support.",
            "tags": ["Python"],
            "github": "https://github.com/markleegh/python-projects/tree/main/Morsecode",
            "live": None,
            "featured": True,
        },
        {
            "title": "Task Automation Suite",
            "description": "A collection of automation scripts that saved 10+ hours/week of manual work for a 50-person team.",
            "tags": ["Python", "Selenium", "Pandas"],
            "github": "#",
            "live": None,
            "featured": True,
        },
        {
            "title": "Real-Time Dashboard",
            "description": "WebSocket-powered analytics dashboard with live charts and alerting system.",
            "tags": ["React", "Node.js", "WebSocket", "D3"],
            "github": "#",
            "live": "#",
            "featured": True,
        },
        {
            "title": "Open Source CLI Tool",
            "description": "A developer-focused command-line utility for managing environment variables across projects.",
            "tags": ["Python", "Click", "Open Source"],
            "github": "#",
            "live": None,
            "featured": False,
        },
        {
            "title": "Portfolio API",
            "description": "RESTful API built with FastAPI serving portfolio data with automatic OpenAPI docs.",
            "tags": ["FastAPI", "Python", "OpenAPI"],
            "github": "#",
            "live": "#",
            "featured": False,
        },
        {
            "title": "Browser Extension",
            "description": "Chrome extension that streamlines code review workflows with keyboard shortcuts and integrations.",
            "tags": ["JavaScript", "Chrome APIs"],
            "github": "#",
            "live": "#",
            "featured": False,
        },
    ],
    "experience": [
        {
            "company": "TechCorp Inc.",
            "role": "Senior Software Engineer",
            "period": "2022 – Present",
            "points": [
                "Led backend architecture for a platform serving 200k+ users",
                "Reduced API response time by 40% through caching and query optimization",
                "Mentored 3 junior engineers and ran weekly code review sessions",
            ],
        },
        {
            "company": "StartupXYZ",
            "role": "Full-Stack Developer",
            "period": "2020 – 2022",
            "points": [
                "Built core product features from 0 → 10k users",
                "Owned the entire frontend codebase in React + TypeScript",
                "Integrated payment systems and third-party APIs",
            ],
        },
        {
            "company": "Freelance",
            "role": "Web Developer",
            "period": "2018 – 2020",
            "points": [
                "Delivered 20+ client projects across e-commerce, SaaS, and portfolio sites",
                "Specialized in Python backends and responsive frontend design",
            ],
        },
    ],
}


@app.route("/")
def index():
    return render_template("index.html", p=PORTFOLIO, year=datetime.datetime.now().year)


@app.route("/api/projects")
def api_projects():
    tag = request.args.get("tag")
    projects = PORTFOLIO["projects"]
    if tag:
        projects = [proj for proj in projects if tag in proj["tags"]]
    return jsonify(projects)


@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()

    if not all([name, email, message]):
        return jsonify({"success": False, "error": "All fields are required."}), 400

    # In production: send an email or store to DB here
    print(f"[CONTACT] From: {name} <{email}>\nMessage: {message}")
    return jsonify({"success": True, "message": "Thanks! I'll get back to you soon."})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
