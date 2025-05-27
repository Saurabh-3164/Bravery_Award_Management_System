const express = require("express");
const router = express.Router();
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // or use diskStorage if you prefer saving files

// ✅ AI Setup
// Gemini AI for Nominee Evaluation

const genAI = new GoogleGenAI(process.env.GOOGLE_API_KEY); // uses same key from .env


 
async function evaluateNomineeWithGemini(nominee) {
  const followUpQuestions = nominee.followupQuestionsAndAnswers || [];
  
  // Format the follow-up questions and answers for inclusion in the prompt
  const formattedFollowUp = followUpQuestions.map((qa, index) => {
    return `Q${index + 1}: ${qa.question}\nA: ${qa.answer}\n`;
  }).join("\n");

  const prompt = `
  You are an AI Assistant for the Bravery Award Committee. Your role is to evaluate real-life stories submitted by nominees. The evaluation must ensure the nominee meets strict award criteria and provide justification based on both the **story** and the **follow-up questions and answers**.
  
  ### **Award Criteria:**
  
  1. **Gallantry Award:**
     - The nominee's actions must involve **significant risk to their own life or physical safety**.
     - The action must be **spontaneous, courageous**, and **selfless**, with no personal gain.
  
  2. **Lifetime Achievement Award:**
     - The nominee must demonstrate **long-term dedication to bravery or social contribution**.
     - The award reflects sustained effort over time, with multiple acts or years of service.
  
  3. **Special Recognition Award:**
     - Recognizes **extraordinary acts of bravery**, especially for children, disabled individuals, or non-life-threatening but impactful actions.
  
  4. **National Bravery Award:**
     - The nominee's actions must have had **national significance**, such as protecting national security or helping in a national crisis.
  
  ### **Nominee Details:**
  - **Name**: ${nominee.name}
  - **Age**: ${nominee.age}
  - **Story of Bravery**: ${nominee.story}
  - **Nominated By**: ${nominee.nominatedBy}
  
  ### **Follow-Up Questions and Answers**:
  ${formattedFollowUp}
  
  ### **Evaluation Instructions**:
  
  1. **Check for Completeness**:
     - **If any follow-up question is blank or the answer is non-informative**, such as a simple "Yes", "No", or incomplete response like "To", **mark the nominee as ineligible**. Incomplete or non-specific answers will **invalidate the eligibility**.
  
  2. **Check for Mismatch Between Question and Answer**:
     - If the answer **does not meaningfully respond** to the question (e.g., the question asks about **risk to life**, and the answer is unrelated or does not provide sufficient explanation), mark the response as **insufficient**. The nominee must provide clear and relevant answers to each question.
  
  3. **Story Evaluation**:
     - Review the nominee’s **story** to check if it explains the situation clearly and provides sufficient context regarding the actions and motivations of the nominee.
     - Ensure the **action meets the criteria** for one of the awards listed above.
  
  4. **Eligibility Decision**:
     - Only recommend an award **if the nominee's story and answers sufficiently meet the eligibility criteria**.
     - If the answers are **too vague, incomplete, or non-specific**, disqualify the nominee from consideration.
  
  5. **Category Recommendation**:
     - If eligible, **recommend the appropriate award** based on the story and answers. Justify the recommendation by linking it to the award criteria.
     - If **not eligible**, explain why the nominee does not meet the necessary criteria, especially if the answers are missing, unclear, or unrelated.
  
  ### **Response Format**:
  Please respond in **JSON format**:
  
  {
    "eligible": true/false,
    "recommended_category": "Gallantry" | "Lifetime" | "Special" | "National" | "no award",
    "reason": "Provide a **detailed explanation** of the nominee's eligibility, referring to the story and specific answers to follow-up questions. If ineligible, explain why answers or the story did not meet the award criteria.please keep the reason in short"
  }
  `;
  

  try {
    // Instead of 'getGenerativeModel', use 'model.generateContent' directly as supported by the API
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = result.text;

    // Parse the response as JSON
    const match = text.match(/\{[\s\S]*?\}/);
    if (!match) throw new Error("No valid JSON found in response.");

    const evaluation = JSON.parse(match[0]);
    return evaluation;
  } catch (error) {
    console.error("Error evaluating nominee:", error.message);
    return {
      eligible: false,
      recommended_category: null,
      reason: "Evaluation failed due to an error.",
    };
  }
}


const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

// ✅ Parse AI questions
function parseQuestions(text) {
  return text
    .split("\n")
    .map((q) => q.trim())
    .filter((q) => q.length > 0 && /^[0-9]+\./.test(q))
    .map((q) => q.replace(/^[0-9]+\.\s*/, ""));
}

// ✅ AI generation
async function generateAiQuestions(storyDescription, category) {
  const prompt = `
You are a judge evaluating bravery award nominations.
Based on the following story, generate 5 follow-up questions that explore the nominee's actions, emotions, challenges, and motivations.
keep question length short.
Story:
"${storyDescription}"

Category: ${category}

Return the questions as a numbered list.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = response.candidates[0].content.parts[0].text;
    const questions = parseQuestions(text);
    return questions;
  } catch (error) {
    console.error("Error generating or parsing questions:", error.message);
    return null;
  }
}

// ✅ This function accepts connection and returns the router
module.exports = (connection) => {
  // 📌 Follow-up Questions Route
  router.post("/FollowupQuestions", async (req, res) => {
    const { storyDescription, category } = req.body;

    if (!storyDescription || !category) {
      return res.status(400).json({ error: "storyDescription and category are required." });
    }

    try {
      const questions = await generateAiQuestions(storyDescription, category);
      if (questions) {
        res.json({ questions });
      } else {
        res.status(500).json({ error: "Failed to generate questions." });
      }
    } catch (error) {
      console.error("Error in FollowupQuestions route:", error.message);
      res.status(500).json({ error: "Internal server error." });
    }
  });

  // 📌 Register Nominee Route
  router.post("/registernominee", upload.any(), async (req, res) => {
    const body = req.body;
    const { 
      name, 
      age, 
      address, 
      contact, 
      category, 
      story, 
      nominatorName, 
      orgName, 
      contactPerson, 
      relation, 
      followupQuestionsAndAnswers 
    } = body;
  
    // Handle proof files
    const proofFiles = req.files || [];
  
    // Parsing follow-up questions and answers
    let parsedFollowupQuestionsAndAnswers = [];
    if (followupQuestionsAndAnswers) {
      if (typeof followupQuestionsAndAnswers === 'string') {
        try {
          parsedFollowupQuestionsAndAnswers = JSON.parse(followupQuestionsAndAnswers);
        } catch (error) {
          return res.status(400).json({ error: "Invalid JSON format for follow-up questions." });
        }
      } else {
        parsedFollowupQuestionsAndAnswers = followupQuestionsAndAnswers;
      }
    }
  
    // Validation for required fields
    if (!name || !age || !address || !contact || !category || !story) {
      return res.status(400).json({ error: "All fields are required." });
    }
  
    // Insert the nominee into the 'nominees' table
    const query = `
      INSERT INTO nominees (
        name, age, address, contact, category, story, nominatorName, orgName, contactPerson, relation, followupQuestionsAndAnswers
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const values = [
      name,
      age,
      address,
      contact,
      category,
      story,
      nominatorName || orgName,  
      orgName,
      contactPerson,
      relation,
      JSON.stringify(parsedFollowupQuestionsAndAnswers)  // Store follow-up questions as JSON
    ];
  
    console.log("Inserting nominee:", query, values);
  
    // Execute query to insert nominee
    connection.query(query, values, async (err, results) => {
      if (err) {
        console.error("Error inserting nominee:", err);
        return res.status(500).json({ error: "Failed to register nominee." });
      }
  
      const nomineeId = results.insertId; // Get the nominee ID after successful insertion
  
      // Prepare the nominee data for AI evaluation
      const nomineeData = {
        name,
        age,
        story,
        nominatedBy: nominatorName || orgName,
        proofSummary: "no summary", 
        followupQuestionsAndAnswers: parsedFollowupQuestionsAndAnswers,
      };
  
      try {
        // Perform AI Evaluation
        const aiEvaluation = await evaluateNomineeWithGemini(nomineeData);
        console.log("AI Evaluation Result:", aiEvaluation);
  
        const evaluationQuery = `
          INSERT INTO awardEvaluations (
            nominee_id,
            evaluation_result,
            recommended_category,
            reason
          ) VALUES (?, ?, ?, ?)
        `;
  
        const truncatedCategory = aiEvaluation.recommended_category
          ? aiEvaluation.recommended_category.substring(0, 255)
          : null;
  
        await connection.promise().query(evaluationQuery, [
          nomineeId,
          JSON.stringify(aiEvaluation),     // Full JSON structure
          truncatedCategory,                // Safe for VARCHAR(255)
          aiEvaluation.reason || 'No reason provided'
        ]);
  
        // Respond with success message and AI evaluation result
        res.status(201).json({
          message: "Nominee registered and evaluated successfully.",
          aiEvaluation, // Include AI evaluation result
        });
      } catch (error) {
        console.error("Error with AI evaluation:", error);
        res.status(500).json({
          message: "Nominee registered, but AI evaluation failed.",
        });
      }
    });
  });
  
  
  
  
  router.post('/checkNomineeExists', (req, res) => {
    const { contact } = req.body; 
  
    const query = 'SELECT * FROM nominees WHERE contact = ?';
    connection.query(query, [contact, contact], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Database error', error: err });
      }
  
      if (results.length > 0) {
        
        // Nominee already exists
        return res.json({ exists: true });
      } else {
        console.log('Checking for nominee with contact:', typeof contact, contact);
        // Nominee doesn't exist
        return res.json({ exists: false });
      }
    });
  });
  // router.get('/nominees/pending', (req, res) => {
  //   const query = 'SELECT * FROM nominees WHERE status = "pending"';
  //   console.log("hit");
  //   connection.query(query, (err, results) => {
  //     if (err) {
  //       console.error('Error fetching pending nominees:', err);
  //       return res.status(500).json({ error: 'Database error' });
  //     }
  //     res.json(results);
  //   });
  // });
  
// router.post('/submit-score', async (req, res) => {
//   console.log("git")
//   try {
//     const { nomineeId, judgeId, scores } = req.body;

//     if (!nomineeId || !judgeId || !scores) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Calculate average score if needed
//     const averageScore =
//       (scores.courage + scores.impact + scores.risk + scores.uniqueness + scores.suggestion) / 5;

//     // Update nominee's score and status for the corresponding judge
//     const [nominee] = await connection.query('SELECT * FROM nominees WHERE id = ?', [nomineeId]);

//     if (!nominee.length) {
//       return res.status(404).json({ message: 'Nominee not found' });
//     }

//     // Determine judge index and update corresponding fields
//     const updateFields = {
//       1: { status: 'status1', score: 'score1', comment: 'comment1' },
//       2: { status: 'status2', score: 'score2', comment: 'comment2' },
//       3: { status: 'status3', score: 'score3', comment: 'comment3' },
//     };

//     const fields = updateFields[judgeId];
//     if (!fields) return res.status(400).json({ message: 'Invalid judge ID' });

//     await db.query(
//       `UPDATE nominees 
//        SET ${fields.status} = ?, ${fields.score} = ?, ${fields.comment} = ? 
//        WHERE id = ?`,
//       ['scored', averageScore, comment, nomineeId]
//     );

//     return res.json({ message: 'Score submitted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

  return router;
};
