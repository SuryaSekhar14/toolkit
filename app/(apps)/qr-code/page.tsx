"use client";

import { useState, useRef, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleInputChange = (value: string) => {
    setError("");
    const debouncedSetText = debounce((value: string) => {
      try {
        if (value.length >= 1500) {
          setError("Text too long for QR code. Please reduce length.");
          return;
        }
        setText(value);
      } catch (err) {
        setError("An error occurred generating the QR code.");
      }
    }, 300);
    debouncedSetText(value);
  };

  const downloadQRCode = () => {
    if (qrRef.current) {
      const svg = qrRef.current.querySelector("svg");
      const svgData = new XMLSerializer().serializeToString(svg!);
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.svg";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="p-5 text-center bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-5">QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter text or link to encode"
        onChange={(e) => handleInputChange(e.target.value)}
        className="p-2 w-72 border border-gray-300 rounded mb-5 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
        maxLength={1500}
      />
      {error && <div className="text-red-500 mb-3">{error}</div>}
      <div ref={qrRef} className="mb-5">
        {text && !error && <QRCodeSVG value={text} size={256} className="mx-auto" />}
      </div>
      {text && !error && (
        <button
          onClick={downloadQRCode}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Download QR Code
        </button>
      )}
    </div>
  );
}
