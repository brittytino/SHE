import React, { useState } from 'react';
import { FiSend, FiMessageCircle, FiX } from 'react-icons/fi';

type Message = {
  sender: 'You' | 'AI';
  text: string;
};

const predefinedQA = [
  // Your predefined questions and answers
];

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'AI', text: 'Hello! I am your SHE Assistant. How are you feeling today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Basic emotion detection function
  const detectEmotion = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('happy') || lowerInput.includes('great')) {
      return 'happy';
    } else if (lowerInput.includes('sad') || lowerInput.includes('down')) {
      return 'sad';
    } else if (lowerInput.includes('angry') || lowerInput.includes('frustrated')) {
      return 'angry';
    } else if (lowerInput.includes('worried') || lowerInput.includes('scared')) {
      return 'anxious';
    }
    return 'neutral';
  };

  const getSafetyTips = (emotion: string) => {
    switch (emotion) {
      case 'happy':
        return 'I’m glad to hear you’re feeling good! Remember, staying safe is important. Always trust your instincts and reach out if you need help.';
      case 'sad':
        return 'I understand that things can be tough. It’s essential to talk about your feelings. If you ever feel unsafe, don’t hesitate to seek help or use our SHE app for safety tips.';
      case 'angry':
        return 'It’s normal to feel frustrated sometimes. Remember to take deep breaths. If you’re in a situation where you feel unsafe, use the SHE app to find quick safety tips and resources.';
      case 'anxious':
        return 'I’m here for you. It’s okay to feel anxious; it’s a natural response. Keep your phone close, and consider downloading our SHE app, which provides safety tips and support when you need it.';
      default:
        return 'Let’s talk about safety! If you have any questions or concerns, feel free to ask. You can also check our SHE app for more information.';
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim() === '') return;

    const userMessage: Message = { sender: 'You', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    const detectedEmotion = detectEmotion(input);
    const safetyMessage = getSafetyTips(detectedEmotion);

    // Simulate an AI response
    setTimeout(() => {
      const aiMessage: Message = { sender: 'AI', text: safetyMessage };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700 focus:outline-none transition-all duration-300"
      >
        {isOpen ? <FiX className="text-2xl" /> : <FiMessageCircle className="text-2xl" />}
      </button>

      {isOpen && (
        <div className="w-80 sm:w-96 h-96 bg-white shadow-lg rounded-lg flex flex-col justify-between transition-all duration-300">
          <div className="bg-purple-600 text-white p-4 rounded-t-lg">
            <h3 className="text-lg font-semibold">SHE Assistant</h3>
            <p className="text-xs">Your safety is my priority!</p>
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
              placeholder="Your message..."
              className="flex-1 p-2 rounded-lg focus:outline-none focus:ring focus:border-purple-400"
            />
            <button
              type="submit"
              className="ml-2 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 focus:outline-none transition-all duration-300"
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
