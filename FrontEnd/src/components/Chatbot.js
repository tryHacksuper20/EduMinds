import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

// Placeholder function for Gemini API call (should be handled in the backend)
const sendMessageToGeminiAPI = async (userInput) => {
  // Simulate API response for demo purposes
  return `Gemini response to: ${userInput}`;
};

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle user input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Send message to Gemini (simulated in this example)
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      const response = await sendMessageToGeminiAPI(userInput);

      // Add user's message and Gemini's response to chat history
      setChatHistory((prevChat) => [
        ...prevChat,
        { type: "user", message: userInput },
        { type: "bot", message: response },
      ]);
    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  // Clear chat history
  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="flex flex-col h-full w-full max-h-screen max-w-screen mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">Edubot</h1>

      <div className="max-w-lg mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">

        {/* Chat container */}
        <div className="flex-grow overflow-y-auto rounded-lg bg-gray-50 p-4 shadow-inner">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`flex items-start mb-4 p-3 rounded-lg shadow-sm ${
                message.type === "user"
                  ? "bg-gradient-to-r from-blue-100 to-blue-200 text-gray-900"
                  : "bg-gradient-to-r from-gray-100 to-gray-200 text-blue-900"
              }`}
            >
              {message.type === "user" && (
                <span className="mr-2 font-bold text-gray-700">You:</span>
              )}
              <div className="flex-grow">
                <ReactMarkdown>{message.message}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

        {/* Input and buttons section */}
        <div className="flex mt-6">
          <input
            type="text"
            className="flex-grow px-4 py-2 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition duration-200"
            placeholder="Type your message..."
            value={userInput}
            onChange={handleUserInput}
          />
          <button
            className={`ml-2 px-4 py-2 rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:outline-none transition duration-200 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            onClick={sendMessage}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>

        <button
          className="mt-4 px-4 py-2 w-full rounded-lg bg-gray-500 text-white shadow-md hover:bg-gray-600 focus:outline-none transition duration-200"
          onClick={clearChat}
        >
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
