# 🧠 NEURO-SCAN: Headless Axe-Core Accessibility Engine

> **NEURO-SCAN** is a full-stack AI-assisted accessibility auditing platform that automatically analyzes websites against **WCAG (Web Content Accessibility Guidelines)** using a headless Chrome browser powered by **Selenium** and **Axe-core**. The system performs deep semantic and structural accessibility inspections, visualizes violations through an interactive dashboard, and generates professional PDF reports for developers, designers, and accessibility engineers.

---

# 🚀 Overview

Building accessible web applications is no longer optional—it's essential. Manual accessibility testing is time-consuming, inconsistent, and often misses hidden issues embedded within the DOM.

**NEURO-SCAN** automates this process by launching a headless browser, executing comprehensive accessibility audits using Axe-core, and presenting findings through an intuitive React dashboard. From missing ARIA labels to insufficient color contrast and semantic HTML issues, the engine helps developers identify, understand, and resolve accessibility violations efficiently.

Designed for developers, QA engineers, UI/UX designers, and accessibility researchers, NEURO-SCAN streamlines compliance with WCAG standards while promoting inclusive digital experiences.

---

# ✨ Features

## ♿ Automated WCAG Accessibility Auditing

Performs comprehensive accessibility scans using the industry-standard **Axe-core** engine.

Detects violations related to:

- Missing alternative text
- ARIA attribute misuse
- Keyboard accessibility
- Form labeling issues
- Color contrast failures
- Semantic HTML violations
- Landmark structure problems
- Heading hierarchy inconsistencies
- Focus management issues

---

## 🌐 Headless Browser Automation

Launches a fully automated **Google Chrome** instance using Selenium WebDriver to render and inspect modern web applications, including JavaScript-heavy websites.

Supports:

- Dynamic content rendering
- Single Page Applications (SPA)
- React applications
- Vue applications
- Angular applications

---

## 📊 Interactive Dashboard

Scan results are presented through a clean and responsive interface built with React.

Dashboard includes:

- Accessibility score
- Total violations
- Severity categorization
- Rule descriptions
- Impact levels
- Affected HTML elements
- Suggested fixes

---

## 📄 Automated PDF Report Generation

Generate professional accessibility reports with a single click.

Reports include:

- Scan summary
- Accessibility score
- WCAG violation breakdown
- Severity analysis
- Detailed remediation guidance
- Timestamped audit information

Powered by **jsPDF**.

---

## ⚡ REST API Architecture

A FastAPI backend exposes lightweight endpoints for accessibility scanning, enabling easy integration with external applications, CI/CD pipelines, or automation workflows.

---

# 🏗️ System Architecture

```
                 User Input (Target URL)
                          │
                          ▼
                  React Dashboard (Vite)
                          │
                    HTTP Request
                          │
                          ▼
                 FastAPI REST Backend
                          │
                          ▼
              Selenium WebDriver Engine
                          │
                          ▼
             Headless Google Chrome Browser
                          │
                          ▼
               Axe-Core Accessibility Audit
                          │
                          ▼
              Accessibility Violations JSON
                          │
        ┌─────────────────┴─────────────────┐
        ▼                                   ▼
 React Interactive Dashboard         PDF Report Generator
                                            │
                                            ▼
                                  Downloadable Report
```

---

# ⚙️ Technology Stack

## Backend

- Python
- FastAPI
- Uvicorn
- Selenium WebDriver

---

## Accessibility Engine

- Axe-core
- axe-selenium-python

---

## Frontend

- React
- Vite
- Tailwind CSS
- Lucide React Icons

---

## Reporting

- jsPDF

---

# 📂 Project Structure

```
NEURO-SCAN/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── scanner.py
│   ├── utils.py
│   └── services/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── reports/
│
├── screenshots/
│
├── README.md
│
└── .gitignore
```

---

# 🛠️ Installation

## Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/NEURO-SCAN.git

cd NEURO-SCAN
```

---

# Backend Setup

## Create Virtual Environment

### Windows

```bash
python -m venv venv

venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv

source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Run FastAPI Server

```bash
uvicorn main:app --reload --port 8000
```

Backend will be available at:

```
http://127.0.0.1:8000
```

---

# Frontend Setup

Navigate to the frontend directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

# 🔬 Accessibility Scan Pipeline

```
User Enters URL
        │
        ▼
React Dashboard
        │
        ▼
FastAPI Endpoint
        │
        ▼
Selenium Launches Headless Chrome
        │
        ▼
Website Fully Rendered
        │
        ▼
Axe-Core Accessibility Audit
        │
        ▼
Violation Extraction
        │
        ▼
Severity Classification
        │
        ▼
Interactive Dashboard
        │
        ▼
PDF Report Generation
```

---

# 📊 Example Scan Output

```
Accessibility Summary
──────────────────────────

Accessibility Score
87 / 100

Violations Found
18

Critical
4

Serious
6

Moderate
5

Minor
3

Most Common Issues

✖ Missing Image Alt Text

✖ Low Color Contrast

✖ Missing Form Labels

✖ Improper Heading Order

✖ Empty Buttons

✖ Invalid ARIA Attributes
```

---

# 🎯 Key Capabilities

- WCAG 2.1 accessibility auditing
- Automated browser-based testing
- JavaScript-rendered page analysis
- Headless Chrome execution
- REST API architecture
- Interactive accessibility dashboard
- Downloadable PDF reports
- Severity-based issue classification
- Developer-friendly remediation guidance

---

# 📈 Future Enhancements

- WCAG 2.2 support
- Lighthouse integration
- Accessibility score history
- Multi-page crawling
- Scheduled accessibility monitoring
- Authentication support
- Screenshot annotation
- CI/CD pipeline integration
- Docker deployment
- Export to CSV and Excel
- AI-powered accessibility recommendations

---

# 🌍 Use Cases

- Accessibility Compliance Audits
- UI/UX Quality Assurance
- Government Website Validation
- Enterprise Accessibility Testing
- Educational Accessibility Research
- Continuous Integration Pipelines
- Frontend Development Workflows
- Inclusive Design Verification

---

# 🤝 Contributing

Contributions are always welcome!

To contribute:

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---
