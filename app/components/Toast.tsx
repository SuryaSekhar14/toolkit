'use client';

import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000 }) => {
  const [showToast, setShowToast] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev - 1);
    }, duration / 100);

    setTimeout(() => {
      setAnimateOut(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    }, duration);

    return () => clearInterval(interval);
  }, [duration]);

  if (!showToast) return null;

  return (
    <div className={`fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded shadow-lg transform transition-transform duration-300 ease-in-out ${animateOut ? 'animate-toastOut' : 'animate-toastIn'}`}>
      {message}
      <div className="w-full bg-blue-700 h-1 mt-2">
        <div className="bg-blue-300 h-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default Toast;
