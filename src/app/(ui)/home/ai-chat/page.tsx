"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Add welcome message when component mounts
  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm your health assistant. Describe your symptoms, and I'll help you identify potential conditions and recommend appropriate specialists.",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  }, []);
  
  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSend = () => {
    if (input.trim()) {
      const newUserMessage: Message = {
        id: Date.now().toString(),
        text: input,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newUserMessage]);
      setInput('');
      setIsLoading(true);
      
      // Simulate AI response
      setTimeout(() => {
        let response = "I understand you're experiencing these symptoms. ";
        
        // Simple keyword matching for demo purposes
        if (input.toLowerCase().includes('headache')) {
          response += "You might be experiencing a tension headache, migraine, or cluster headache. Based on your symptoms, I recommend consulting with a Neurologist. Dr. Michael Chen specializes in this area.";
        } else if (input.toLowerCase().includes('chest pain')) {
          response += "Chest pain could indicate several conditions, from muscle strain to more serious cardiac issues. I recommend seeing a Cardiologist like Dr. Sarah Johnson as soon as possible.";
        } else if (input.toLowerCase().includes('cough') || input.toLowerCase().includes('fever')) {
          response += "These symptoms could indicate a respiratory infection. I recommend consulting with a Pulmonologist or General Physician.";
        } else {
          response += "Based on your symptoms, I'd recommend consulting with a General Physician for a proper diagnosis.";
        }
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      <div className="bg-white p-4 shadow-sm border-b">
        <h1 className="text-xl font-semibold text-center text-black">Health Assistant AI</h1>
        <p className="text-gray-500 text-center text-sm">Describe your symptoms for personalized health guidance</p>
      </div>
      
      <div className="flex-1 overflow-auto p-4 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                flex max-w-[80%] items-start
                ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}
              `}>
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mx-2
                  ${message.sender === 'user' ? 'bg-blue-100' : 'bg-green-100'}
                `}>
                  {message.sender === 'user' ? 
                    <User size={16} className="text-blue-600" /> : 
                    <Bot size={16} className="text-green-600" />
                  }
                </div>
                <div className={`
                  px-4 py-3 rounded-lg
                  ${message.sender === 'user' ? 
                    'bg-blue-600 text-white rounded-tr-none' : 
                    'bg-white shadow-sm border text-black rounded-tl-none'}
                `}>
                  <p className="mb-1">{message.text}</p>
                  <p className={`
                    text-xs mt-1
                    ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}
                  `}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-lg shadow-sm border rounded-tl-none max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-4 bg-white border-t">
        <div className="max-w-3xl mx-auto flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe your symptoms..."
            className="flex-1 p-2 border rounded-l-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`
              bg-blue-600 text-white p-2 rounded-r-md flex items-center justify-center
              ${(!input.trim() || isLoading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}
            `}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}