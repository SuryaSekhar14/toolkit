'use client';

import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [progress, setProgress] = useState(100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setIdea('');
    setProgress(100);
    setTimeout(() => {
      setAnimateOut(true);
      setTimeout(() => {
        setShowToast(false);
        setAnimateOut(false);
      }, 1000);
    }, 2000);
  };

  useEffect(() => {
    if (showToast) {
      const interval = setInterval(() => {
        setProgress((prev) => prev - 1);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [showToast]);

  return (
    <footer className="text-center p-5 bg-gray-100 dark:bg-gray-800 dark:text-white mt-10">
      <p className="mb-4">Have any ideas? We'd love to hear from you! Submit your ideas to us.</p>
      <form className="flex items-center justify-center" onSubmit={handleSubmit}>
        <input
          type="text"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Your idea"
          className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition duration-200"
        >
          Submit
        </button>
      </form>
      {showToast && (
        <div className={`fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded shadow-lg transform transition-transform duration-300 ease-in-out ${animateOut ? 'animate-toastOut' : 'animate-toastIn'}`}>
          Thank you for your idea!
          <div className="w-full bg-blue-700 h-1 mt-2">
            <div className="bg-blue-300 h-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 flex flex-col md:flex-row justify-center items-center">
        &copy; {new Date().getFullYear()} Surya's Toolkit. All rights reserved. 
        <span className="md:ml-2">
          With <span className="text-red-500">&hearts;</span> by <a href="https://github.com/SuryaSekhar14" className="underline">SuryaSekhar14</a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
