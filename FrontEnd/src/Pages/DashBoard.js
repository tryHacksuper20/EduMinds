import React, { useState } from "react";
import Videos from "../components/Videos";
import Article from "../components/Article";
import ProgressBar from "../components/ProgressBar";

const DashBoard = () => {
  const [view, setView] = useState("video"); // State to track the view

  const toggleView = () => {
    setView(view === "video" ? "article" : "video");
  };

  return (
    <main className="bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen py-8">
      <section className="container mx-auto flex flex-col lg:flex-row items-start mt-10">

        {/* Left section - Video/Article */}
        <article className="flex-1 p-4 bg-gray-800 border border-gray-600 rounded-lg shadow-lg">
          {/* Toggle Switch */}
          <label className="flex items-center mb-4 justify-center relative cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={view === "article"}
              onChange={toggleView}
            />
            <div className="w-40 h-10 bg-gray-700 rounded-full relative shadow-md transition duration-300 flex items-center">
              <div
                className={`absolute w-1/2 h-full bg-gradient-to-r from-yellow-400 to-teal-500 rounded-full transition duration-300 ${
                  view === "article" ? "translate-x-full" : "translate-x-0"
                }`}
              />
              <div className="flex justify-between w-full text-white text-sm font-semibold p-2">
                <span className="flex items-center">Video</span>
                <span className="flex items-center">Article</span>
              </div>
              <div
                className={`absolute left-2 w-8 h-8 bg-gray-800 rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 transform ${
                  view === "article" ? "translate-x-28" : "translate-x-0"
                }`}
              >
                <span className="text-white font-semibold">
                  {view === "video" ? "▶️" : "📰"}
                </span>
              </div>
            </div>
          </label>

          {/* Conditional Rendering based on the selected view */}
          <div className="text-center text-white">
            {view === "video" ? <Videos /> : <Article />}
          </div>
        </article>

        {/* Right section - Progress Bar */}
        <aside className="w-full lg:w-1/4 p-4">
          <ProgressBar />
        </aside>

      </section>
    </main>
  );
};

export default DashBoard;
