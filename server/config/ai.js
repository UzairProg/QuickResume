import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY (or GEMINI_API_KEY) environment variable for AI requests");
}

const ai = new OpenAI({
    apiKey,
    baseURL: process.env.OPENAI_BASE_URL,
});

export default ai;
