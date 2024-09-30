import React, { useState, useEffect } from "react";
import axios from "axios";
import Videos from "../components/Videos";
import Article from "../components/Article";
import ProgressBar from "../components/ProgressBar";

const DashBoard = () => {
  const [view, setView] = useState("video"); // State to track the view
  const [courses, setCourses] = useState([]); // State to store fetched courses
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Fetch courses from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:1000/course");
        setCourses(response.data); // Update state with the fetched courses
        console.log(response.data); // Log the fetched data
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to fetch courses. Please try again later."); // Update state with error message
      }
    };

    fetchCourses();
  }, []); 

  return (
    <main className="bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen py-8">
      <section className="container mx-auto flex flex-col lg:flex-row gap-8 items-start mt-10 px-4">

        {/* Left section - Video/Article */}
        <article className="flex-1 p-6 bg-gray-800 border border-gray-600 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
          {/* Toggle Switch */}
          <label className="flex items-center mb-6 justify-center relative cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={view === "article"}
              onChange={() => setView(view === "video" ? "article" : "video")}
            />
            <div className="w-48 h-12 bg-gray-700 rounded-full relative shadow-lg transition duration-500 ease-in-out flex items-center">
              <div
                className={`absolute w-1/2 h-full bg-gradient-to-r from-yellow-400 to-teal-500 rounded-full transition duration-500 ease-in-out ${
                  view === "article" ? "translate-x-full" : "translate-x-0"
                }`}
              />
              <div className="flex justify-between w-full text-white text-sm font-semibold p-2">
                <span className="flex items-center">Video</span>
                <span className="flex items-center">Article</span>
              </div>
              <div
                className={`absolute left-2 w-10 h-10 bg-gray-800 rounded-full shadow-lg flex items-center justify-center transition-transform duration-500 ease-in-out transform ${
                  view === "article" ? "translate-x-36" : "translate-x-0"
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
            {view === "video" ? <Videos  courses={courses}/> : <Article courses={courses} />}
          </div>

          {/* Display fetched courses */}
          <div className="mt-6">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <ul className="text-white">
                {courses.map((course) => (
                  <li key={course.id} className="mb-2">
                    {course.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>

        {/* Right section - Progress Bar */}
        <aside className="w-full lg:w-1/4 p-6 bg-gray-800 border border-gray-600 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
          <ProgressBar />
        </aside>

      </section>
    </main>
  );
};

export default DashBoard;
