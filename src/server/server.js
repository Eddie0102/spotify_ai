// import { GoogleGenerativeAI } from "@google/generative-ai";

const express = require('express');
const axios = 'axios';

const app = express();

const PORT = 5000;

app.use(express.json());

const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
async function run() {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const chat = model.startChat({
        history: [
            {
                role: 'user',
                parts: [{ text: '안녕, 내 이름은 cotnmin이야' }],
            },
            {
                role: 'model',
                parts: [{ text: '안녕하세요! cotnmin씨' }],
            },
        ],
    });

    const result = await chat.sendMessage('내 이름이 뭐라고?');
    const response = result.response;
    const text = response.text();
    console.log(text);
}

run();

app.listen(PORT, () => {
    console.log(`http://localhost${PORT}`);
});
