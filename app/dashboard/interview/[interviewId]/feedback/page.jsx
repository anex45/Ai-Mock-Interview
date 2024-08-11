"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [avgRating, setAvgRating] = useState();
  const router = useRouter();

  useEffect(() => {
    GetFeedBack();
  }, []);

  const GetFeedBack = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
    const totalRating = result.reduce((sum, item) => sum + Number(item.rating), 0);
    setAvgRating(Math.round(totalRating / result.length));
  };

  return (
    <div className="p-10">
      {feedbackList?.length === 0 ? (
        <h2 className="font-bold text-xl text-gray-500">No Interview Feedback Record Found</h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
          <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
          <h2 className="text-lg my-3">
            Your overall interview rating:{" "}
            <strong className={avgRating < 6 ? 'text-red-600' : 'text-green-500'}>{avgRating}/10</strong>
          </h2>
          <h2 className="text-sm text-gray-200">
            Find below interview questions with correct answers, your answers, and feedback for improvement
          </h2>
          {feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="p-2 bg-gray-800 text-white rounded-lg my-2 text-left flex items-center justify-between gap-7 w-full">
                {item.question}
                <ChevronsUpDownIcon className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="p-2 bg-red-100 text-red-800 border border-red-200 rounded-lg">
                    <strong>Rating:</strong> {item.rating}
                  </h2>
                  <h2 className="p-2 bg-gray-200 text-gray-800 border border-gray-300 rounded-lg">
                    <strong>Your Answer: </strong> {item.userAns}
                  </h2>
                  <h2 className="p-2 bg-green-100 text-green-800 border border-green-200 rounded-lg mt-2">
                    <strong>Correct Answer: </strong> {item.correctAns}
                  </h2>
                  <h2 className="p-2 bg-blue-100 text-blue-800 border border-blue-200 rounded-lg mt-2">
                    <strong>Feedback: </strong> {item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}
      <Button onClick={() => router.replace('/dashboard')} className="mt-6">
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;
