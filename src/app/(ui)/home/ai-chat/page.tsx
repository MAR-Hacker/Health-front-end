"use client";
import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
};

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { userId } = useAuth();

  // Add welcome message when component mounts
  useEffect(() => {
    setMessages([
      {
        id: "1",
        text: "Hello! I'm your health assistant. Describe your symptoms, and I'll provide recommendations.",
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      const newUserMessage: Message = {
        id: Date.now().toString(),
        text: input,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newUserMessage]);
      setInput("");
      setIsLoading(true);

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/symptom-chat`,
          {
            userId: userId,
            userInput: input,
          }
        );

        // Access recommendations from response
        const data = res.data;
        const formattedReply =
          data.recommendations || "No recommendations available.";

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: formattedReply,
          sender: "ai",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error("API error:", error);
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I couldn't process your request. Please try again.",
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-gray-100">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 shadow-md">
        <h1 className="text-xl font-semibold text-center text-white">
          Health Assistant AI
        </h1>
        <p className="text-blue-100 text-center text-sm">
          Describe your symptoms for personalized recommendations
        </p>
      </div>

      <div className="flex-1 overflow-auto p-6 bg-gray-100">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`
                flex max-w-[80%] items-start
                ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}
              `}
              >
                <div
                  className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mx-2
                  ${message.sender === "user" ? "bg-blue-200" : "bg-green-200"}
                `}
                >
                  {message.sender === "user" ? (
                    <User size={16} className="text-blue-700" />
                  ) : (
                    <Bot size={16} className="text-green-700" />
                  )}
                </div>
                <div
                  className={`
                  px-4 py-3 rounded-2xl shadow-sm
                  ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-white border border-gray-200 text-black rounded-tl-none"
                  }
                `}
                >
                  <p className="mb-1 text-sm">{message.text}</p>
                  <p
                    className={`
                    text-xs mt-1
                    ${
                      message.sender === "user"
                        ? "text-blue-200"
                        : "text-gray-500"
                    }
                  `}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-200 rounded-tl-none max-w-[80%]">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
                    style={{ animationDelay: "200ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
                    style={{ animationDelay: "400ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Describe your symptoms..."
            className="flex-1 p-3 border border-gray-300 rounded-l-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`
              bg-blue-600 text-white p-3 rounded-r-lg flex items-center justify-center
              ${
                !input.trim() || isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }
            `}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
