import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

function InterviewItemCard({ interviewInfo }) {
  const router = useRouter();
  
  const onStart = () => {
    router.push(`/dashboard/interview/${interviewInfo?.mockId}`);
  };
  
  const onFeedback = () => {
    router.push(`/dashboard/interview/${interviewInfo.mockId}/feedback`);
  };
  
  return (
    <div className='border border-gray-700 shadow-sm rounded-lg p-4 bg-gray-800 text-white'>
      <h2 className='font-bold text-lg'>{interviewInfo?.jobPosition}</h2>
      <h2 className='text-sm text-gray-400'>{interviewInfo?.jobExperience} Years of Experience</h2>
      <h2 className='text-xs text-gray-500'>Created At: {interviewInfo.createdAt}</h2>
      <div className='flex justify-between mt-4 gap-3'>
        <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700" onClick={onFeedback}>
          Feedback
        </Button>
        <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
