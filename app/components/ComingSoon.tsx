import React from 'react';

const ComingSoon: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 dark:bg-gray-900 dark:text-white">
            <h1 className="text-6xl mb-4">Coming Soon</h1>
            <p className="text-2xl">We are working hard to bring you this feature. Stay tuned!</p>
        </div>
    );
};

export default ComingSoon;
