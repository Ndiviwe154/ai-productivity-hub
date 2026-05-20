# 🧠 AI Workplace Productivity Assistant

> A modern, AI-powered SaaS dashboard that helps professionals automate five core workplace tasks using Claude AI.

---

## 📸 Overview

**AI Workplace Productivity Assistant** (WorkAI) is a single-page web application built as an interactive HTML artifact. It provides a professional productivity suite with a dark-themed dashboard UI, sidebar navigation, and five AI-powered tools — all powered by Anthropic's Claude API directly in the browser.

---

## ✨ Features

### 🏠 Dashboard
- Live productivity statistics (emails generated, meetings summarized, tasks planned, time saved)
- Recent activity feed
- Pending task tracker with priority labels
- Quick-launch buttons for all AI tools
- Live clock display

### 📧 Smart Email Generator
- Customize recipient, tone, email type, key points, sign-off, and length
- Tones: Professional, Friendly, Formal, Concise, Persuasive
- Email types: Follow-up, Project Update, Sales Outreach, Apology, Job Application, and more
- Editable, copyable output

### 📝 Meeting Notes Summarizer
- Input raw meeting notes, attendees, and meeting type
- Selectable output sections: Summary, Action Items, Decisions Made, Key Risks, Next Steps
- Structured, formatted output with editable text

### ✅ AI Task Planner
- Input a project goal with timeframe and team size
- Generates prioritized, time-estimated task breakdown
- Toggle options: Priority Ranking, Time Estimates, Assign Roles, Dependencies
- Editable and copyable task plan

### 🔍 AI Research Assistant
- Research any topic at configurable depth and perspective
- Perspectives: Neutral, Strategic, Technical, Risk-focused
- Selectable output formats: Key Findings, Statistics, Pros & Cons, Recommendations
- Professional research brief with editable output

### 💬 AI Chatbot Interface
- Full conversational chat with multi-turn memory
- Quick-prompt chips for common workplace questions
- New Chat / Reset functionality
- Smooth auto-scrolling messages

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| AI Backend | Anthropic Claude API (`claude-sonnet-4-20250514`) |
| Icons | Tabler Icons (webfont CDN) |
| Fonts | DM Sans + DM Mono (Google Fonts) |
| Deployment | Runs in-browser as a self-contained HTML artifact |

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- An Anthropic API key (if running outside Claude.ai)

### Running in Claude.ai
The artifact is self-contained and runs directly inside Claude.ai. The API authentication is handled automatically — no setup required.

### Running Locally

1. **Clone or save** the HTML file from the artifact
2. **Set your API key** — locate the `callAI` function and add your key to the fetch headers:
   ```javascript
   headers: {
     'Content-Type': 'application/json',
     'x-api-key': 'YOUR_ANTHROPIC_API_KEY',
     'anthropic-version': '2023-06-01'
   }
   ```
3. **Open** the `.html` file in your browser
4. Start using all five AI tools immediately

> ⚠️ **Security Note:** Never expose API keys in client-side code for production use. For production deployment, route API calls through a backend server.

---

## 🔧 Configuration

### Changing the AI Model
In the JavaScript, update the model string:
```javascript
model: 'claude-sonnet-4-20250514'  // Change to any supported Claude model
```

### Adjusting Token Limits
```javascript
max_tokens: 1000  // Increase for longer outputs (affects cost)
```

### Customizing the Theme
Edit the CSS variables in `:root` to change the color palette:
```css
:root {
  --bg: #0f1117;          /* Main background */
  --accent: #4f8ef7;      /* Primary accent color */
  --accent2: #7c6af7;     /* Secondary accent */
  --accent3: #3dd6ac;     /* Success/green accent */
}
```

---

## 📁 Project Structure

```
workAI.html
│
├── <style>                  # All CSS (design system, layout, components)
│   ├── Layout (sidebar, main, topbar)
│   ├── Component styles (cards, forms, chat bubbles, chips)
│   └── Animation (dot loading, transitions)
│
├── <nav class="sidebar">    # Navigation with 5 AI tool links + usage meter
│
├── <div class="main">       # Main content area
│   ├── .topbar              # Page title + clock + user avatar
│   ├── .disclaimer          # Responsible AI notice banner
│   └── .content             # Panel container
│       ├── #panel-dashboard
│       ├── #panel-email
│       ├── #panel-meeting
│       ├── #panel-tasks
│       ├── #panel-research
│       └── #panel-chat
│
└── <script>                 # App logic
    ├── showPanel()          # Navigation routing
    ├── callAI()             # Anthropic API fetch wrapper
    ├── generateEmail()      # Email generation handler
    ├── generateMeeting()    # Meeting notes handler
    ├── generateTasks()      # Task planner handler
    ├── generateResearch()   # Research handler
    └── Chat functions       # sendChat, addMsg, addTyping, clearChat
```

---

## ⚖️ Responsible AI Disclaimer

This application includes a persistent disclaimer banner reminding users:

> **AI-generated content may contain errors. Always review, verify, and edit outputs before use in professional settings. Do not share confidential or sensitive data.**

**Best practices for use:**
- Always review AI outputs before sending or publishing
- Do not input personally identifiable information (PII)
- Do not input confidential company data or trade secrets
- Treat AI output as a **first draft**, not a final product
- Verify any statistics or factual claims independently

---

## 🎨 Design Decisions

| Decision | Rationale |
|---|---|
| Dark theme | Reduces eye strain for extended professional use; modern SaaS aesthetic |
| DM Sans font | Clean, geometric, professional — distinct from overused Inter/Roboto |
| Sidebar navigation | Familiar SaaS UX pattern; allows fast tool switching |
| Editable output areas | Professionals need to review and adjust AI output |
| Chip selectors | Fast multi-option selection without cluttering the form |
| Disclaimer banner | Ethical responsibility in AI-powered tools |

---

## 🔒 Privacy & Security

- **No data is stored** — all inputs are sent directly to the Anthropic API per request
- **No session persistence** — refreshing the page clears all data
- **API calls are stateless** — each generation is independent
- The chat panel maintains in-memory history only for the current session

---

## 🗺️ Roadmap / Potential Enhancements

- [ ] Export outputs to PDF or Word
- [ ] Save and manage output history (localStorage)
- [ ] User authentication + cloud sync
- [ ] Team collaboration features
- [ ] Slack / email integration
- [ ] Custom prompt templates per team
- [ ] Usage analytics dashboard
- [ ] Voice input for meeting notes

---

## 📄 License

This project is provided as-is for educational and productivity purposes. Refer to [Anthropic's usage policies](https://www.anthropic.com/legal/usage-policy) for guidelines on building with Claude.

---

## 🙏 Acknowledgements

- [Anthropic](https://www.anthropic.com) — Claude AI API
- [Tabler Icons](https://tabler.io/icons) — Icon library
- [Google Fonts](https://fonts.google.com) — DM Sans & DM Mono typefaces
