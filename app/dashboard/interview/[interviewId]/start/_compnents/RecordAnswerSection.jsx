"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { generateContent } from "@/utils/GeminiAIModel";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAnswerSection({ activeQuestionIndex, mockInterViewQuestion, interviewData }) {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  
  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (error) {
      toast(error);
    }
  }, [error]);

  useEffect(() => {
    results.forEach((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswerInDb();
    }
  }, [userAnswer]);

  const UpdateUserAnswerInDb = async () => {
    setLoading(true);
    
    // Safety check: ensure mockInterViewQuestion is available and is an array
    if (!mockInterViewQuestion || !Array.isArray(mockInterViewQuestion) || !mockInterViewQuestion[activeQuestionIndex]) {
      toast('Error: Question data not available');
      setLoading(false);
      return;
    }
    
    const feedbackPrompt = `Question: ${mockInterViewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Based on the question and the user's answer, please provide a rating 1 to 10 for the answer and feedback in the form of areas for improvement, if any. The feedback should be in JSON format only with fields for rating and feedback only, in just 3 to 5 lines.`;
    
    try {
      const result = await generateContent(feedbackPrompt);
      const mockJsonResp = result.text
        .replace("```json", "")
        .replace("```", "");

      const JsonFeedbackResp = JSON.parse(mockJsonResp);
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterViewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterViewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy')
      });

      if (resp) {
        toast('User answer recorded successfully!');
        setUserAnswer('');
        setResults([]);
      }
    } catch (error) {
      console.error('Error updating user answer:', error);
      toast('Error recording answer. Please try again.');
    } finally {
      setResults([]);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col bg-gray-800 text-white p-5">
      <div className="flex flex-col mt-20 justify-center items-center relative">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          alt="Webcam frame overlay"
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: "50vh",
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button 
        disabled={loading} 
        variant="outline" 
        onClick={StartStopRecording} 
        className={`my-10 ${isRecording ? 'border-red-600 text-red-600 hover:bg-red-700' : 'border-blue-500 text-blue-500 hover:bg-blue-600'} border-2 rounded-lg`}
      >
        {isRecording ? (
          <h2 className="flex items-center justify-center gap-2">
            <StopCircle />
            Recording...
          </h2>
        ) : (
          <h2 className="flex items-center justify-center gap-2">
            <Mic />
            Start Recording
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
