const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST chat message
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a string'
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        success: false,
        error: 'Message is too long. Maximum 1000 characters allowed.'
      });
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'Gemini API key not configured'
      });
    }

    // Get the generative model (using latest available model)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Create a context-aware prompt for car dealership
    const contextPrompt = `You are a helpful AI assistant for Argar Wheels, a premium car dealership. 
You help customers with questions about cars, pricing, services, test drives, and general automotive advice.
Be friendly, professional, and concise in your responses.

Customer question: ${message}

Your response:`;

    // Generate response
    const result = await model.generateContent(contextPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      reply: text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    // Handle specific error types
    if (error.message?.includes('API key')) {
      return res.status(500).json({
        success: false,
        error: 'Invalid API key configuration'
      });
    }

    if (error.message?.includes('quota') || error.message?.includes('limit')) {
      return res.status(429).json({
        success: false,
        error: 'Service temporarily unavailable. Please try again later.'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to generate response. Please try again.',
      details: error.message // Add error details for debugging
    });
  }
});

module.exports = router;
