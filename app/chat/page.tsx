"use client";

import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Здравствуйте! Я ваш помощник по демографическим процессам Казахстана. Чем могу помочь?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Функция для вызова API Gemini AI
  const getGeminiAIResponse = async (input: string): Promise<string> => {
    try {
      const response = await fetch("https://api.gemini.com/v1/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        body: JSON.stringify({
          query: input,
          context: "Казахстан, демографические процессы, экономика, прогнозы",
        }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка API Gemini: ${response.status}`);
      }

      const data = await response.json();
      return data.response || "Я не смог найти ответ на ваш запрос.";
    } catch (error) {
      console.error("Ошибка при запросе к Gemini AI:", error);
      return "Произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте позже.";
    }
  };

  // Обработка отправки сообщения
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await getGeminiAIResponse(userMessage);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Произошла ошибка. Пожалуйста, повторите попытку.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen text-white pt-20">
      <div className="flex flex-col w-full max-w-4xl mx-auto p-4">
        <Card className="flex-grow flex flex-col bg-[#112240] border-[#1e3a8a] overflow-hidden">
          <div className="p-4 border-b border-[#1e3a8a]">
            <h1 className="text-xl font-bold text-white">Demographfy-AI</h1>
            <p className="text-sm text-gray-200">
              Задайте вопрос о демографических и экономических процессах Казахстана
            </p>
          </div>

          <ScrollArea className="flex-grow p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <Bot size={20} />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 text-gray-200 ${
                      message.role === "user"
                        ? "bg-blue-500"
                        : "bg-[#1e3a8a]"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-[#1e3a8a] flex items-center justify-center">
                      <User size={20} />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-gray-200">
                  <Bot size={20} />
                  <span>Печатает...</span>
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="p-4 border-t border-[#1e3a8a]">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Введите ваш вопрос..."
                className="flex-grow bg-[#0a192f] border-[#1e3a8a] text-white"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send size={20} />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}