import React, { useState } from 'react';
import { Send, Menu } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  // Function to format the AI response
  const formatAIResponse = (text) => {
    // Split response into paragraphs
    const paragraphs = text.split('\n');
    
    return paragraphs.map((paragraph, index) => {
      // Check if it's a list item
      if (paragraph.trim().startsWith('-') || paragraph.trim().match(/^\d+\./)) {
        return `<li class="ml-4 mb-2">${paragraph.trim().replace(/^-|\d+\./, '')}</li>`;
      }
      // Check if it's a heading (contains : at the end)
      else if (paragraph.trim().endsWith(':')) {
        return `<h3 class="font-bold text-lg mt-3 mb-2">${paragraph}</h3>`;
      }
      // Regular paragraph
      else if (paragraph.trim()) {
        return `<p class="mb-2">${paragraph}</p>`;
      }
      return '';
    }).join('');
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add system prompt to structure the response
    const systemPrompt = `
    Please provide your response in a structured format using:
    - Clear headings followed by colons
    - Bullet points where appropriate
    - Short, focused paragraphs
    - Numbered lists for steps or sequences
    - Keep the response concise and well-organized
    
    Respond to: ${input}
    `;

    setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
  
    try {
      const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
      });
  
      console.log('API Result:', result);
  
      const response =
        result?.response?.candidates?.[0]?.content?.parts
          ?.map((part) => part.text)
          .join('') || 'No response from AI.';
  
      setMessages((prev) => [...prev, { 
        text: response,
        sender: 'ai',
        formatted: true
      }]);
    } catch (error) {
      console.error('Error:', error?.response?.data || error.message);
    }
  
    setInput('');
  };
  
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      {/* {sidebarOpen && (
        <div className="w-64 bg-gray-900 text-white p-4">
          <h2 className="text-xl font-bold mb-4">Conversations</h2>
          <ul>
            <li className="p-2 cursor-pointer hover:bg-gray-700 rounded">Chat 1</li>
            <li className="p-2 cursor-pointer hover:bg-gray-700 rounded">Chat 2</li>
          </ul>
        </div>
      )} */}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {/* <Menu className="w-6 h-6" /> */}
          </button>
          <h1 className="text-lg font-bold">Financial Advisor</h1>
        </div>
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div 
                className={`inline-block p-4 rounded-lg max-w-[80%] ${
                  msg.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-800 shadow-md'
                }`}
              >
                {msg.formatted ? (
                  <div 
                    className="ai-response"
                    dangerouslySetInnerHTML={{ __html: formatAIResponse(msg.text) }}
                  />
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gray-700 flex">
          <input
            type="text"
            className="flex-1 p-2 rounded-l-lg bg-gray-800 text-white outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button 
            onClick={sendMessage} 
            className="bg-blue-500 p-3 rounded-r-lg hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
