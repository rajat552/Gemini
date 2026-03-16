const workflowService = require('../services/workflowService');
const Task = require('../models/Task');
const pdf = require('pdf-parse');
const Conversation = require('../models/Conversation');
const { successResponse, errorResponse } = require('../utils/responseHandler');

exports.handleChat = async (req, res, next) => {
    const { message } = req.body;
    const userId = req.user?.id || 'demo-user';

    if (!message || typeof message !== 'string' || !message.trim()) {
        return errorResponse(res, 'Message is required and must be a non-empty string', 400);
    }

    try {
        console.log(`[CHAT]: User ${userId} sent: "${message}"`);
        // 1. Load history
        const history = await Conversation.find({ userId }).sort({ timestamp: -1 }).limit(10).then(docs => docs.reverse());

        // Save User Message
        await Conversation.create({
            userId,
            role: 'user',
            content: message
        });

        // 2. Execute workflow
        console.log('[CHAT]: Starting workflow execution...');
        const result = await workflowService.executeAgentWorkflow(message, "", history);
        console.log('[CHAT]: Workflow complete.');

        // Save Agent Reply
        if (result && result.reply) {
            await Conversation.create({
                userId,
                role: 'assistant',
                content: result.reply,
                intents: result.workflowExecuted || []
            });
        }

        return successResponse(res, result);
    } catch (error) {
        console.error('[CHAT]: Error in handleChat:', error);
        
        if (error.message?.includes('API_QUOTA_EXCEEDED')) {
            return errorResponse(res, error.message, 429);
        }
        
        next(error);
    }
};

exports.handleUpload = async (req, res, next) => {
    if (!req.file) {
        return errorResponse(res, 'No file uploaded', 400);
    }

    try {
        let text = '';

        if (req.file.mimetype === 'application/pdf') {
            try {
                const parser = new pdf.PDFParse({ data: req.file.buffer });
                const data = await parser.getText();
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

        return successResponse(res, {
            filename: req.file.originalname,
            analysis: result.reply,
            ...result
        });
    } catch (error) {
        console.error('Upload handler error:', error);
        
        if (error.message?.includes('API_QUOTA_EXCEEDED')) {
            return errorResponse(res, error.message, 429);
        }
        
        next(error);
    }
};


exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        return successResponse(res, tasks);
    } catch (error) {
        next(error);
    }
};

exports.createTask = async (req, res, next) => {
    const { title } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
        return errorResponse(res, 'Task title is required', 400);
    }

    try {
        const task = await Task.create({ title: title.trim(), description: req.body.description || '', status: 'pending' });
        return successResponse(res, task, 201);
    } catch (error) {
        next(error);
    }
};

exports.toggleTaskStatus = async (req, res, next) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) return errorResponse(res, 'Task not found', 404);

        task.status = task.status === 'completed' ? 'pending' : 'completed';
        await task.save();
        return successResponse(res, task);
    } catch (error) {
        next(error);
    }
};

exports.getHistory = async (req, res, next) => {
    const userId = req.user?.id || 'demo-user';
    try {
        const history = await Conversation.find({ userId }).sort({ timestamp: 1 }).limit(50);
        return successResponse(res, history);
    } catch (error) {
        next(error);
    }
};

exports.deleteTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) return errorResponse(res, 'Task not found', 404);
        return successResponse(res, { message: 'Task deleted successfully' });
    } catch (error) {
        next(error);
    }
};
