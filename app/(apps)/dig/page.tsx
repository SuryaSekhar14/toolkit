'use client';

import React, { useState } from 'react';

const DigPage = () => {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/dig?domain=${domain}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching DNS records:', error);
      setResult(null);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg w-full">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white text-center">Dig Tool</h1>
        <p className="text-gray-700 dark:text-gray-300 text-center mb-6">Fetch DNS records for a domain.</p>
        <input 
          type="text" 
          placeholder="Enter domain name" 
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={fetchRecords}
          className="w-full p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-200"
        >
          {loading ? 'Fetching...' : 'Fetch Records'}
        </button>
        {result && (
          <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
            <pre className="text-gray-800 dark:text-white whitespace-pre-wrap break-words">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigPage;
