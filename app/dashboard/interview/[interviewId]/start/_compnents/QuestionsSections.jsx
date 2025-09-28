import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

function QuestionsSections({ activeQuestionIndex, mockInterViewQuestion }) {
  const textToSpeach = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, Your browser does not support text to speech (recommended browser Chrome)');
    }
  };

  // Safety check: ensure mockInterViewQuestion is an array
  if (!mockInterViewQuestion || !Array.isArray(mockInterViewQuestion) || mockInterViewQuestion.length === 0) {
    return (
      <div className='p-5 border rounded-lg my-10 border-gray-600 bg-gray-800 text-white'>
        <div className='text-center text-gray-400'>
          Loading questions...
        </div>
      </div>
    );
  }

  return (
    <div className='p-5 border rounded-lg my-10 border-gray-600 bg-gray-800 text-white'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 text-center'>
        {mockInterViewQuestion.map((question, index) => (
          <h2
            key={index + 1}
            className={`p-2 rounded-full text-xs md:text-sm cursor-pointer ${activeQuestionIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-200'}`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>
      <h2 className='my-5 text-sm md:text-lg'>
        <strong>Q.</strong> {mockInterViewQuestion[activeQuestionIndex]?.question}
      </h2>
      <Volume2
        className='cursor-pointer text-blue-400 hover:text-blue-600'
        onClick={() => textToSpeach(mockInterViewQuestion[activeQuestionIndex]?.question)}
      />
      <div className='border rounded-lg p-5 bg-blue-900 mt-20 border-blue-700'>
        <h2 className='flex gap-2 items-center text-blue-300'>
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className='my-2 text-sm text-blue-200'>
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </h2>
      </div>
    </div>
  );
}

export default QuestionsSections;
