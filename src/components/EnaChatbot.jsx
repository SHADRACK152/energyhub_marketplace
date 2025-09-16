import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';


const SUGGESTIONS = [
  "What are the top solar products?",
  "How do I place an order?",
  "What payment methods are accepted?",
  "Can I track my order?",
  "How do I contact support?"
];

const EnaChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (question) => {
    const text = question || input;
    if (!text.trim()) return;
    setLoading(true);
    const userMessage = { sender: 'user', text };
    setMessages([...messages, userMessage]);
    try {
      const res = await axios.post(`${API_BASE_URL}/qna/1`, {
        question: text,
        user_id: 'chatbot-user',
      });
      setMessages(prev => [...prev, { sender: 'bot', text: res.data.answer || 'No answer found.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    }
    setInput('');
    setLoading(false);
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 bg-primary text-white rounded-full shadow-lg p-4 hover:bg-primary/90 transition-all"
        onClick={() => setOpen(o => !o)}
        aria-label="Open Ena Chatbot"
      >
        💬 Ena
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white border border-border rounded-lg shadow-xl flex flex-col">
          <div className="p-3 border-b font-bold bg-primary text-white">Ena Chatbot</div>
          <div className="p-2 border-b bg-gray-50 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs hover:bg-primary hover:text-white transition-all"
                onClick={() => handleSend(s)}
                disabled={loading}
              >{s}</button>
            ))}
          </div>
          <div className="flex-1 p-3 overflow-y-auto" style={{ maxHeight: 240 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 text-sm ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block px-2 py-1 rounded ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'}`}>{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="p-2 border-t flex">
            <input
              className="flex-1 border rounded px-2 py-1 mr-2"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              disabled={loading}
            />
            <button
              className="bg-primary text-white px-3 py-1 rounded"
              onClick={() => handleSend()}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EnaChatbot;
