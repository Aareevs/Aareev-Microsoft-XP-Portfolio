

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const GeminiApp = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am Gemini. How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          // Instruct the model to avoid markdown
          systemInstruction: "You are a helpful AI assistant. Please always provide your responses in plain text only. Do not use any Markdown formatting (no bold, italics, headers, or code blocks).",
        },
        history: messages.map(m => ({
           role: m.role,
           parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessageStream({ message: userMessage });
      
      let fullResponse = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]);

      for await (const chunk of result) {
        const chunkText = chunk.text;
        if (chunkText) {
            fullResponse += chunkText;
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = fullResponse;
                return newMessages;
            });
        }
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I encountered an error connecting to the service." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#131314] text-[#e3e3e3] font-sans">
      {/* Custom Header simulating the web app header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-[#2d2d2d] bg-[#1e1f20] shrink-0">
        <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-white tracking-tight">Gemini</span>
            <span className="text-xs bg-[#2d2d2d] px-2 py-0.5 rounded-full text-gray-300">2.5 Flash</span>
        </div>
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2d2d2d] flex items-center justify-center cursor-pointer hover:bg-[#3d3d3d]">
                <Sparkles size={16} className="text-blue-400" />
            </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} max-w-4xl mx-auto w-full`}>
             
             {/* Avatar */}
             <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === 'user' ? 'bg-[#2d2d2d]' : 'bg-gradient-to-br from-blue-500 to-red-500'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} className="text-white" />}
             </div>

             {/* Message Bubble */}
             <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className="font-medium text-sm text-gray-400 mb-1">{msg.role === 'user' ? 'You' : 'Gemini'}</div>
                <div className={`text-sm md:text-base leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-[#2d2d2d] px-4 py-2.5 rounded-2xl rounded-tr-sm' : 'text-gray-100'}`}>
                    {msg.text}
                    {isLoading && idx === messages.length - 1 && msg.role === 'model' && msg.text === "" && (
                        <span className="animate-pulse">Thinking...</span>
                    )}
                </div>
             </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#131314] shrink-0">
        <div className="max-w-3xl mx-auto relative">
            <div className="bg-[#1e1f20] rounded-[24px] border border-[#2d2d2d] focus-within:border-gray-500 transition-colors overflow-hidden flex items-end">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Gemini"
                    className="w-full bg-transparent text-white p-4 max-h-[200px] min-h-[56px] resize-none focus:outline-none text-base"
                    rows={1}
                />
                <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="mb-2 mr-2 p-2 rounded-full hover:bg-[#2d2d2d] disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
                >
                    <Send size={20} />
                </button>
            </div>
            <div className="text-center text-[11px] text-gray-500 mt-2">
                Gemini can make mistakes, including about people, so double-check its responses.
            </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiApp;