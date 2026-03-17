# Gemini: Inclusive AI Productivity Copilot

> **An Agentic AI Assistant powered by Google Gemini models that understands voice commands, reasons about tasks, and automates multi-step productivity workflows for everyone.**

Built for the **AI for Good 2026 Hackathon** hosted by the **Connecting Dreams Foundation** 🏆

---

## 📖 Project Story

### 💡 Inspiration
In today's fast-paced digital world, productivity tools are often overly complex, creating barriers for individuals with ADHD, cognitive disabilities, or simply those who are overwhelmed by screen fatigue. We were inspired by the "AI for Good" mission to build a solution that changes lives by making digital productivity truly accessible. We wanted to create an AI copilot that feels like a real human assistant—one you can simply talk to, and it handles the cognitive load of organizing, planning, and executing tasks.

### ⚙️ What it does
Our copilot is an Agentic AI Assistant that bridges the gap between thought and action. Instead of navigating complex UIs, users can use their voice to issue natural language commands. 
- **Voice-First Interaction:** Users can simply say, "Summarize this document and create tasks for tomorrow."
- **Agentic Reasoning:** Powered by **Google Gemini 2.5 Flash**, the app detects intent, reasons about the request, and plans a multi-step execution strategy.
- **Workflow Automation:** It automatically executes steps like parsing documents, extracting action items, and saving them directly to a database without manual data entry.
- **Accessible UI:** A calming glassmorphism design with micro-animations reduces cognitive overload.

### 🛠️ How we built it
We architected the application using a modern, scalable tech stack:
- **Frontend:** React, Vite, and Tailwind CSS v4 for a highly responsive, accessible UI. We integrated the Web Speech API for seamless voice input.
- **Backend:** Node.js and Express.js to handle business logic and API routing.
- **AI Engine:** We utilized the **Google Gemini API** as the core reasoning engine for intent detection and natural language processing.
- **Database:** MongoDB Atlas to store users, tasks, and conversational memory persistently.
- **Architecture:** We designed an "Agentic Workflow" pattern that visually shows the user exactly what the AI is thinking and doing in real-time, building trust and transparency.

### ⚠️ Challenges we ran into
- **Voice API Reliability:** We struggled with the Web Speech API dropping out or throwing `no-speech` errors before users finished their sentences. We overcame this by writing custom React hooks to manage interim results, carefully controlling the microphone lifecycle to ensure continuous, reliable dictation.
- **AI Prompt Engineering:** Getting Gemini to consistently output perfectly structured JSON for the task pipeline required extensive prompt tuning and fallback mechanisms.
- **Real-time State Sync:** Ensuring that the chat interface and the live task board stayed perfectly synchronized when the AI generated new tasks in the background required a robust React state management approach.

### 🏆 Accomplishments that we're proud of
- Successfully building a multi-agent workflow where the AI plans its own steps before executing them.
- Creating a buttery-smooth, accessible user interface that feels both premium and intuitive.
- Our custom voice-hook implementation that handles browser edge-cases gracefully, allowing for a hands-free productivity experience.

### 📚 What we learned
- Deepened our understanding of Agentic AI architectures versus standard chatbots.
- Learned how to effectively integrate and orchestrate Google Gemini models within a Node.js ecosystem using Function Calling and structured outputs.
- Discovered the nuances of browser-based speech recognition and how to handle hardware-level audio permissions gracefully.

### 🚀 What's next
- **Integration with more tools:** Connecting to Google Calendar, Outlook, and Notion.
- **Advanced RAG:** Using Vertex AI Embeddings to allow users to "chat" across their entire workspace history.
- **Mobile App:** Bringing the voice-first experience to iOS and Android to help users capture tasks on the go.

---

## 🛠️ Tech Stack & Features

| Layer | Technology |
|-------|-----------|
| **AI Engine** | Google Gemini 2.5 Flash API |
| **Voice** | Web Speech API |
| **Agent Sim** | Custom Gemini Tool-Calling Workflow |
| **Frontend** | React + Vite + Tailwind CSS v4 |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Animations** | Framer Motion |

### ✨ Key Features
- **Agentic Workflow Engine:** Multi-step command execution with intent detection using Gemini's reasoning.
- **Voice-First AI Chat:** Conversational memory and live voice dictation.
- **Document Intelligence:** AI-powered document summarization and automatic task extraction.
- **Smart Task Pipeline:** AI-generated tasks saved to MongoDB with real-time sync.
- **Premium UI/UX:** Glassmorphism design with backdrop blur and responsive layout.

---

## 📂 Project Structure

```
AI-Productivity-Copilot/
├── frontend/                    # React + Vite
│   └── src/
│       ├── components/          # Navbar, ChatWindow, TaskPanel, etc.
│       ├── pages/               # Home, Dashboard, Documents, Tasks
│       ├── hooks/               # useChat, useVoiceInput
│       ├── services/            # API layer (axios)
│       └── context/             # ThemeContext
│
├── backend/                     # Node.js + Express
│   ├── server.js                # Entry point
│   └── src/
│       ├── controllers/         # aiController.js
│       ├── services/            # geminiService.js, workflowService.js
│       ├── models/              # Task.js, Conversation.js
│       ├── routes/              # aiRoutes.js
│       └── middleware/          # errorHandler.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google Cloud account with Gemini API access

### 1. Clone the repo
```bash
git clone https://github.com/rajat552/Gemini.git
cd Gemini
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file containing your MongoDB and Gemini keys:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/ai-productivity-copilot
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the server:
```bash
node server.js
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit **http://localhost:5173** 🚀

---

## 👨‍💻 Author

**Rajat Aggarwal**
- GitHub: [@rajat552](https://github.com/rajat552)

---

## 📄 License

This project is built for the AI for Good 2026 Hackathon.
