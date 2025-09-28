"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSections from "./_compnents/QuestionsSections";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Import RecordAnswerSection dynamically to avoid SSR issues with speech recognition
const RecordAnswerSection = dynamic(() => import("./_compnents/RecordAnswerSection"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center flex-col bg-gray-800 text-white p-5">
      <div className="text-center text-gray-400">Loading recorder...</div>
    </div>
  )
});

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetail();
  }, []);

  /**
   * Used to Get Interview Details by MockId/Interview Id
   */
  const GetInterviewDetail = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result[0]?.jsonMockResp) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        
        // Handle different JSON formats
        let questionsArray = [];
        
        if (Array.isArray(jsonMockResp)) {
          // Direct array format
          questionsArray = jsonMockResp;
        } else if (jsonMockResp.interview_questions && Array.isArray(jsonMockResp.interview_questions)) {
          // Object with interview_questions property
          questionsArray = jsonMockResp.interview_questions;
        } else if (jsonMockResp.questions && Array.isArray(jsonMockResp.questions)) {
          // Object with questions property
          questionsArray = jsonMockResp.questions;
        }
        
        setMockInterviewQuestion(questionsArray);
        setInterviewData(result[0]);
      } else {
        console.error('No interview data found for ID:', params.interviewId);
        setMockInterviewQuestion([]);
      }
    } catch (error) {
      console.error('Error parsing interview data:', error);
      setMockInterviewQuestion([]);
    }
  };

  return (
    <div className="p-10">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionsSections
          activeQuestionIndex={activeQuestionIndex}
          mockInterViewQuestion={mockInterviewQuestion}
        />
        {/* Video/ Audio Recording */}
        <RecordAnswerSection
          activeQuestionIndex={activeQuestionIndex}
          mockInterViewQuestion={mockInterviewQuestion}
          interviewData={interviewData}
        />
      </div>

      <div className="flex justify-end gap-6 mt-6">
        <Button
          disabled={activeQuestionIndex === 0}
          onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          className="bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50"
        >
          Previous Question
        </Button>

        {activeQuestionIndex !== mockInterviewQuestion?.length - 1 ? (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Next Question
          </Button>
        ) : (
          <Link href={'/dashboard/interview/' + interviewData?.mockId + "/feedback"}>
            <Button className="bg-green-500 text-white hover:bg-green-600">
              End Interview
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
