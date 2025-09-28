
// Client-side function that calls our API route
export const generateContent = async (prompt) => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate content');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};
  
   
  