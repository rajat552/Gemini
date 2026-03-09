const workflowService = require('../services/workflowService');
const Task = require('../models/Task');
const pdf = require('pdf-parse');
const Conversation = require('../models/Conversation');

exports.handleChat = async (req, res, next) => {
    const { message } = req.body;
    try {
        // 1. Retrieve last 6 messages for context
        const history = await Conversation.find()
            .sort({ timestamp: -1 })
            .limit(6)
            .then(docs => docs.reverse());

        // 2. Execute workflow with context
        const result = await workflowService.executeAgentWorkflow(message, "", history);

        // 3. Persist new interaction
        await Conversation.create({ role: 'user', content: message, intents: result.workflowExecuted });
        await Conversation.create({ role: 'assistant', content: result.reply });

        res.json(result);
    } catch (error) {
        next(error);
    }
};

exports.handleUpload = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        let text = '';

        if (req.file.mimetype === 'application/pdf') {
            try {
                const data = await pdf(req.file.buffer);
                text = data.text;
            } catch (pdfError) {
                console.warn('PDF parse failed, using raw text:', pdfError.message);
                text = req.file.buffer.toString('utf-8').replace(/[^\x20-\x7E\n]/g, ' ');
            }
        } else {
            text = req.file.buffer.toString('utf-8');
        }

        if (!text || text.trim().length < 10) {
            text = `Document uploaded: ${req.file.originalname}. Please analyze this file.`;
        }

        const result = await workflowService.executeAgentWorkflow(
            "Summarize this document and create tasks",
            text
        );

        res.json({
            filename: req.file.originalname,
            analysis: result.reply,
            ...result
        });
    } catch (error) {
        console.error('Upload handler error:', error);
        next(error);
    }
};


exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

exports.toggleTaskStatus = async (req, res, next) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        task.status = task.status === 'completed' ? 'pending' : 'completed';
        await task.save();
        res.json(task);
    } catch (error) {
        next(error);
    }
};
