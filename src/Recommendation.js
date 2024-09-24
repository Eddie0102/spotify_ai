import React, { useState } from 'react';
import axios from 'axios';

const Recommendation = () => {
    const [question, setQuestion] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/recommend', {
                question,
            });
            setRecommendations(response.data);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };
    return (
        <div>
            <h1>음악 추천</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="질문을 입력하세요"
                />
                <button type="submit">추천받기</button>
            </form>
            <ul>
                {recommendations.map((item, index) => (
                    <li key={index}>
                        {item.title} - {item.artist}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Recommendation;
