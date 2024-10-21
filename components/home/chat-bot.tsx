import React, { useState } from 'react';
import axios from 'axios';
import { FiSend, FiMessageCircle, FiX } from 'react-icons/fi';

// Define types for message
type Message = {
  sender: 'You' | 'AI';
  text: string;
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'AI', text: 'Hello! I am your assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Assuming you will have a valid Gemini API Key for your project
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

  const getGeminiResponse = async (userInput: string) => {
    // Replace with the actual Gemini API URL when it's available
    const endpoint = 'https://api.gemini.com/v1/chat'; // Replace with actual endpoint

    try {
      const response = await axios.post(
        endpoint,
        {
          model: 'gemini-large', // Hypothetical model name (adjust once API is released)
          messages: [
            { role: 'system', content: 'You are a helpful assistant specializing in women’s safety and basic health.' },
            { role: 'user', content: userInput },
          ],
          max_tokens: 100,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const aiResponse = response.data.choices[0].message.content.trim();
      return aiResponse;
    } catch (error) {
      console.error('Error fetching Gemini response:', error);
      // Provide a more informative error message to the user
      return 'An error occurred while contacting the assistant. Please try again later.';
    }
  };

  // Handle sending a message
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim() === '') return;

    const userMessage: Message = { sender: 'You', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    setIsLoading(true);

    // Fetch Gemini AI response
    const aiResponse = await getGeminiResponse(input);
    const aiMessage: Message = { sender: 'AI', text: aiResponse };

    setMessages((prevMessages) => [...prevMessages, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700 focus:outline-none"
      >
        {isOpen ? <FiX className="text-2xl" /> : <FiMessageCircle className="text-2xl" />}
      </button>

      {isOpen && (
        <div className="w-80 sm:w-96 h-96 bg-white shadow-lg rounded-lg flex flex-col justify-between transition-all duration-300 transform translate-y-0 animate-slideUp">
          <div className="bg-purple-600 text-white p-4 rounded-t-lg">
            <h3 className="text-lg font-semibold">SHE Assistant</h3>
            <p className="text-xs">Here to help with safety and health tips!</p>
          </div>

          <div className="p-4 flex-1 overflow-y-auto space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`${
                    message.sender === 'You'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 text-gray-900'
                  } p-2 rounded-lg max-w-xs`}
                >
                  <span className="text-sm">{message.text}</span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-center text-gray-500 text-sm mt-2">
                Typing...
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-2 bg-gray-100 border-t border-gray-300 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about safety or health..."
              className="flex-1 p-2 rounded-lg focus:outline-none focus:ring focus:border-purple-400"
            />
            <button
              type="submit"
              className="ml-2 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 focus:outline-none"
            >
              <FiSend className="text-lg" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
