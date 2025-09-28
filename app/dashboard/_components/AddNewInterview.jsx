"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateContent } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [JsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const route = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const InputPromt = `Generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION} interview questions and answers in JSON format based on the following: Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Only return the JSON, without any additional text.`;
      const result = await generateContent(InputPromt);
      const MockJsonResp = result.text
        .replace("```json", "")
        .replace("```", "");

      setJsonResponse(JSON.parse(MockJsonResp));
      
      if (MockJsonResp) {
        const resp = await db.insert(MockInterview).values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        }).returning({ mockId: MockInterview.mockId });
        console.log("Insert ID:", resp);
        if (resp) {
          route.push('/dashboard/interview/' + resp[0].mockId);
          setOpenDialog(false);
        }
      } else {
        console.log("ERROR");
      }
    } catch (error) {
      console.error("Error creating interview:", error);
      // Handle error appropriately
    } finally {
      setLoading(false);
      console.log(JsonResponse);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-gray-800 text-white hover:scale-105 hover:shadow-md cursor-pointer transition-all delay-100"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add new</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
        <DialogContent className="bg-gray-900 text-white max-w-2xl border border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about your job interviewing</DialogTitle>
            <DialogDescription className="text-gray-400">
              Add Details about your job position/role, Job description, and years of experience
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="space-y-6 mt-4">

                  <div className="mt-4">
                    <label className="block text-gray-300 mb-2">Job Role/Job Position</label>
                    <Input
                      onChange={(event) => setJobPosition(event.target.value)}
                      placeholder="Ex. Full Stack Developer"
                      required
                      className="bg-gray-700 text-white border-gray-700 focus:border-gray-600 focus:ring-0"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-300 mb-2">Job Description/Tech Stack (In Short)</label>
                    <Textarea
                      onChange={(event) => setJobDesc(event.target.value)}
                      placeholder="Ex. React, Angular, NodeJs, NextJs etc."
                      required
                      className="bg-gray-700 text-white border-gray-700 focus:border-gray-600 focus:ring-0"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-300 mb-2">Years of Experience</label>
                    <Input
                      onChange={(event) => setJobExperience(event.target.value)}
                      placeholder="Ex. 5"
                      type="number"
                      max="50"
                      required
                      className="bg-gray-700 text-white border-gray-700 focus:border-gray-600 focus:ring-0"
                    />
                  </div>
                </div>

                <div className="flex gap-5 justify-end mt-6">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                    className="text-gray-300 border border-gray-600 hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit" className="bg-blue-500 hover:bg-blue-600">
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
