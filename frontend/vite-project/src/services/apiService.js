// apiService.js
const API_URL = 'http://localhost:3000';  // Change this URL to your backend URL

// Function to request generated questions from the backend
export const fetchFollowupQuestions = async (storyDescription, category) => {
  try {
    const response = await fetch(`${API_URL}/FollowupQuestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storyDescription,
        category,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch questions from the backend');
    }

    const data = await response.json();
    return data.questions;  // Return the questions from the response
  } catch (error) {
    console.error('Error in fetchFollowupQuestions:', error);
    throw error;
  }
};
