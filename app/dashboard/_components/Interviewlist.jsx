"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            GetInterviewList();
        }
    }, [user]);

    const GetInterviewList = async () => {
        try {
            setLoading(true);
            const result = await db
                .select()
                .from(MockInterview)
                .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(MockInterview.id));

            if (Array.isArray(result)) {
                setInterviewList(result);
            } else {
                console.error('Expected an array but got:', result);
                setInterviewList([]);
            }
        } catch (error) {
            console.error('Error fetching interviews:', error);
            setError('Error fetching interviews. Please try again later.');
            setInterviewList([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-gray-900 text-white rounded-lg">
            <h2 className='font-medium text-xl mb-4'>Previous Mock Interviews</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {interviewList.map((interview) => (
                        <InterviewItemCard key={interview.mockId} interviewInfo={interview} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default InterviewList;
