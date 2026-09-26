const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { v4: uuidv4 } = require('uuid');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

let analysisHistory = [];
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const AI_PROMPT_SCHEMA = `
Analyze the text/URL and return ONLY a valid JSON object matching this exact schema:
{
  "risk_level": "Low" | "Medium" | "High" | "Unknown",
  "category": "Scam category (e.g., Financial, Phishing, Safe)",
  "summary": "Brief 1-2 sentence explanation",
  "suspicious_signs": ["sign 1", "sign 2"],
  "safety_advice": ["advice 1", "advice 2"],
  "sensitive_request_flags": {
    "otp": boolean,
    "upi_pin": boolean,
    "password": boolean,
    "money": boolean,
    "personal_information": boolean
  },
  "limitations": "Standard disclaimer about AI accuracy"
}`;

app.post('/api/analyze', async (req, res) => {
    try {
        const { type, content } = req.body;
        if (!content || content.trim() === '') return res.status(400).json({ error: "Input cannot be empty" });

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", generationConfig: { responseMimeType: "application/json" } });
        const prompt = `Task: Analyze this ${type} for scams, phishing, or threats.\nContent: "${content}"\n\n${AI_PROMPT_SCHEMA}`;
        
        const result = await model.generateContent(prompt);
        const aiResponse = JSON.parse(result.response.text());

        const record = {
            id: uuidv4(),
            input_type: type,
            input_preview: content.substring(0, 50) + '...',
            risk_level: aiResponse.risk_level,
            category: aiResponse.category,
            summary: aiResponse.summary,
            created_at: new Date().toISOString()
        };
        analysisHistory.unshift(record);

        res.json({ success: true, data: aiResponse, recordId: record.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to analyze content." });
    }
});

app.get('/api/history', (req, res) => res.json(analysisHistory));
app.get('/api/stats', (req, res) => {
    res.json({
        total: analysisHistory.length,
        low: analysisHistory.filter(h => h.risk_level === 'Low').length,
        medium: analysisHistory.filter(h => h.risk_level === 'Medium').length,
        high: analysisHistory.filter(h => h.risk_level === 'High').length,
    });
});
app.delete('/api/history/:id', (req, res) => {
    analysisHistory = analysisHistory.filter(h => h.id !== req.params.id);
    res.json({ success: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));