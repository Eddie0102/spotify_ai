import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const propmt =
        '해질무렵 드라이브 할 때의 선선한 바람같지만 아련하고 리드미컬한 노래 하나 추천해줘. 다만 json형식으로 {title: 노래제목,artist:가수이름}의 형식으로 줘';

    const result = await model.generateContent(propmt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

run();
