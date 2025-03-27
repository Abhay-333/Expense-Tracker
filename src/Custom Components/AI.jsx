import React, { useState } from 'react';
import { Send, Menu } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const ai = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);


  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
  
    try {
      const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: input }] }],
      });
  
      console.log('API Result:', result);
  
      const response =
        result?.response?.candidates?.[0]?.content?.parts
          ?.map((part) => part.text)
          .join('') || 'No response from AI.';
  
      setMessages((prev) => [...prev, { text: response, sender: 'ai' }]);
    } catch (error) {
      console.error('Error:', error?.response?.data || error.message);
    }
  
    setInput('');
  };
  
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 bg-gray-900 text-white p-4">
          <h2 className="text-xl font-bold mb-4">Conversations</h2>
          <ul>
            <li className="p-2 cursor-pointer hover:bg-gray-700 rounded">Chat 1</li>
            <li className="p-2 cursor-pointer hover:bg-gray-700 rounded">Chat 2</li>
          </ul>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-800">
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold">Financial Advisor</h1>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}>{msg.text}</span>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gray-900 flex">
          <input
            type="text"
            className="flex-1 p-2 rounded-l-lg bg-gray-700 text-white outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="bg-blue-500 p-3 rounded-r-lg">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
