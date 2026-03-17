const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Gemini Service handles all direct interactions with Google Gemini API.
 */
class GeminiService {
    constructor() {
        this.modelId = process.env.GEMINI_MODEL || "gemini-2.5-flash";
        
        // Initialize Gemini client
        const apiKey = process.env.GEMINI_API_KEY;
        if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY') {
            this.genAI = new GoogleGenerativeAI(apiKey);
        } else {
            this.genAI = null;
        }
    }

    get isKeyValid() {
        return !!this.genAI;
    }

    /**
     * Core function to invoke Gemini model
     */
    async invokeGemini(prompt, systemInstruction = "You are an AI Productivity Copilot.", history = []) {
        if (!this.isKeyValid) {
            console.log("⚠️ valid GEMINI_API_KEY not found... Running in Demo Mode.");
            return this.getMockResponse(prompt);
        }

        try {
            console.log("🔐 Using Gemini API...");
            const model = this.genAI.getGenerativeModel({
                model: this.modelId,
                systemInstruction: systemInstruction,
            });

            // Build multi-turn message history
            if (history && history.length > 0) {
                const formattedHistory = history.map(msg => ({
                    role: msg.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: msg.content }]
                }));
                const chat = model.startChat({ history: formattedHistory });
                const result = await chat.sendMessage(prompt);
                return result.response.text();
            } else {
                const result = await model.generateContent(prompt);
                return result.response.text();
            }
            
        } catch (error) {
            console.error("Gemini API Error (Message):", error.message);
            console.error("Gemini API Error (Status):", error.status);
            console.error("Gemini API Error (Full):", JSON.stringify(error, Object.getOwnPropertyNames(error)));
            
            // Check if it's a rate limit or quota exceeded error
            if (error.status === 429 || error.message.includes("429") || error.message.includes("Quota exceeded") || error.message.includes("quota")) {
                throw new Error("API_QUOTA_EXCEEDED: You have exceeded your Gemini free tier API quota. Please try again later or check your API billing.");
            }

            console.log("⚠️ API Call failed... Running in Demo Mode.");
            return this.getMockResponse(prompt);
        }
    }

    async generateResponse(prompt, history = []) {
        return this.invokeGemini(prompt, "You are an AI Productivity Copilot. Be helpful, concise, and actionable.", history);
    }

    async summarizeDocument(text) {
        const prompt = `Summarize the following document content concisely, highlighting key insights:\n\n${text}`;
        return this.invokeGemini(prompt, "You are an expert document analyst. Provide clear, structured summaries.");
    }

    async generateTasks(text) {
        const prompt = `Based on the following content, extract actionable tasks.
Return ONLY a valid JSON array of objects with 'title' and 'description' fields. No extra text.
Content: ${text}`;
        const response = await this.invokeGemini(prompt, "You are a task management specialist. Always respond with valid JSON only.");

        try {
            const jsonStr = response.match(/\[[\s\S]*\]/)?.[0] || response;
            return JSON.parse(jsonStr);
        } catch (e) {
            return [{ title: "Review content", description: "Analyze the provided information for action items" }];
        }
    }

    async planWorkflow(command) {
        const prompt = `Analyze this user command: "${command}".
Identify if it requires: 'summarization', 'task_generation', 'plan_schedule', 'draft_email', or 'general_chat'.
Return a JSON object: { "intents": ["intent1", "intent2"] }`;
        return this.invokeGemini(prompt, "You are a workflow architect. Respond with valid JSON only.");
    }

    getMockResponse(prompt) {
        const input = prompt.toLowerCase();

        // System / Backend specific mocks
        if (input.includes('return a json object: { "intents"')) {
            return '{ "intents": ["general_chat"] }';
        }
        if (input.includes('return only a valid json array') && input.includes('task')) {
             return '[{"title":"Finalize Frontend UI","description":"Complete the UI implementation"},{"title":"Test MongoDB connections","description":"Ensure database is connected"},{"title":"Prepare Hackathon pitch","description":"Create slides for the presentation"}]';
        }

        // Smart Responses
        if (input.includes("hello") || input.includes("hey")) {
            return "Hello! I am your AI Productivity Copilot running on Gemini. I've analyzed your current workflow and I'm ready to help you optimize your tasks. What's on your mind?";
        }
        if (input.includes("summarize") || input.includes("summary")) {
            return "Based on your recent activity, here's a summary: You have 3 high-priority tasks pending in MongoDB and your Gemini integration is currently in the final verification stage.";
        }
        if (input.includes("task") || input.includes("to-do") || input.includes("todo")) {
            return "I've generated a task list for you: 1. Finalize Frontend UI, 2. Test MongoDB connections, 3. Prepare Hackathon pitch. Shall I add these to your dashboard?";
        }

        return "I've processed your request using Gemini. Everything looks on track for your productivity goals. Is there anything specific you'd like me to automate next?";
    }
}

module.exports = new GeminiService();
