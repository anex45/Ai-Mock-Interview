import { UserButton } from '@clerk/nextjs';
import React from 'react';
import AddNewInterview from './_components/AddNewInterview';
import Interviewlist from './_components/Interviewlist';

function Dashboard() {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-r from-gray-900 to-black text-white flex flex-col">
      <div className="blur-circle1 absolute left-[10%] top-[20%] w-[200px] h-[200px] bg-gradient-to-b from-pink-400 to-pink-600 rounded-full blur-[120px]"></div>
      <div className="blur-circle2 absolute right-[10%] top-[20%] w-[200px] h-[200px] bg-gradient-to-b from-purple-400 to-purple-600 rounded-full blur-[100px]"></div>

      <div className="p-4 flex-1 w-full max-w-full mx-auto">
        <h2 className="font-bold text-3xl mb-4">Dashboard</h2>
        <h3 className="text-gray-300 mb-6">Create and Start AI Mockup Interview</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-full">
          <AddNewInterview />
        </div>

        <div className="mt-8 max-w-full">
          <Interviewlist />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
