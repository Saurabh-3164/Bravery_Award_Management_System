import React, { useState } from "react";
import "./Step3_StoryDescription.css"; // Import your CSS file for styling
const Step3_StoryDescription = ({ data, onChange, next, prev }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]); // Store answers for follow-up questions
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generated, setGenerated] = useState(false); // Track if questions are generated

  const handleStoryChange = (e) => {
    const { value } = e.target;
    onChange("story", value);
    setGenerated(false);
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    onChange("category", value);
    setGenerated(false);
  };

  const fetchFollowupQuestions = async (storyDescription, category) => {
    try {
      const response = await fetch("http://localhost:3000/api/FollowupQuestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storyDescription,
          category,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch questions from the backend");
      }

      const data = await response.json();
      return data.questions;
    } catch (error) {
      console.error("Error in fetchFollowupQuestions:", error);
      throw error;
    }
  };

  const generateQuestions = async () => {
    if (!data.story || !data.category) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const fetchedQuestions = await fetchFollowupQuestions(data.story, data.category);
      setQuestions(fetchedQuestions);
      setAnswers(new Array(fetchedQuestions.length).fill("")); // Initialize answers array
      setGenerated(true);
    } catch (error) {
      setError("Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
    onChange("followupAnswers", updatedAnswers); // Pass answers back to parent component
  };

  const handleSubmitAnswers = () => {
    // Create a mapping of questions and their answers
    const questionsWithAnswers = questions.map((question, index) => ({
      question,
      answer: answers[index],
    }));

    // Pass the question-answer mapping to the parent component
    onChange("followupQuestionsAndAnswers", questionsWithAnswers);
  };

  return (
    <div className="step-container">
      <h2>Step 3: Story Description</h2>

      <div>
        <label>Story Description</label>
        <textarea
          value={data.story}
          onChange={handleStoryChange}
          placeholder="Describe the nominee's act of bravery..."
          rows="6"
          required
        />
      </div>

      {/* <div>
        <label>Category</label>
        <select value={data.category} onChange={handleCategoryChange} required>
          <option value="">Select a Category</option>
          <option value="courage">Courage</option>
          <option value="socialWork">Social Work</option>
          <option value="lifeSaving">Life Saving</option>
        </select>
      </div> */}

      <button onClick={generateQuestions} disabled={loading}>
        {loading ? "Generating..." : "Generate Questions"}
      </button>

      {error && <p className="error">{error}</p>}

      {generated && questions.length > 0 && (
        <div className="questions-container">
          <h3>Generated Follow-Up Questions:</h3>
          <ol>
            {questions.map((question, index) => (
              <li key={index}>
                <label>{question}</label>
                <textarea
                  value={answers[index]} 
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder={`Answer the question: ${question}`}
                  rows="4"
                  required
                />
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="step-navigation">
        <button type="button" onClick={prev}>Back</button>
        <button
          type="button"
          onClick={() => {
            handleSubmitAnswers();
            next();
          }}
          disabled={answers.some((answer) => answer.trim() === "")}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default Step3_StoryDescription;