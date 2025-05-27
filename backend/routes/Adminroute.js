const express = require("express");
const router = express.Router();
require("dotenv").config();

module.exports = (connection) => {

  // Get Nominee Data with status filtering
  
  router.get('/nominees', (req, res) => {
    const statusFilter = req.query.status || 'all';  // default filter is 'all'
  
    let query = `
SELECT 
  n.id AS nominee_id,
  n.name,
  n.age,
  n.address,
  n.contact,
  n.category,
  n.story,
  n.proofFiles,
  n.nominatedBy,
  n.nominatorName,
  n.relation,
  n.orgName,
  n.contactPerson,
  n.followupQuestionsAndAnswers,
  n.status AS nominee_status,
  n.created_at AS nominee_created_at,
  a.evaluation_result,
  a.recommended_category,
  a.reason AS evaluation_reason
FROM nominees n
LEFT JOIN awardEvaluations a ON n.id = a.nominee_id

    `;
  
    // Apply filter if status is provided
    if (statusFilter !== 'all') {
      query += ` WHERE n.status = '${statusFilter}'`;
    }
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching nominees:', err);
        res.status(500).send('Error fetching nominees');
      } else {
        res.json(results);
      }
    });
  });
  
  

  // Update nominee status (approve or reject)
  router.post('/nominees/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // Status will be "approved" or "rejected"
    
    // Validate status input
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: "Invalid status, must be 'approved' or 'rejected'" });
    }

    try {
      // Prepare update query
      const updateQuery = `
        UPDATE nominees
        SET status = ?
        WHERE id = ?`;

      const [result] = await connection.promise().query(updateQuery, [
        status, 
     
        id
      ]);

      if (result.affectedRows > 0) {
        res.json({ message: `Nominee status updated to ${status}` });
      } else {
        res.status(404).json({ error: "Nominee not found" });
      }
    } catch (error) {
      console.error("Error updating nominee status: ", error);
      res.status(500).json({ error: "Error updating status" });
    }
  });
  router.get("/winners", (req, res) => {
    const query = `
     SELECT 
  n.name,
  n.age,
  n.story,
  a.recommended_category
FROM nominees n
JOIN awardEvaluations a ON n.id = a.nominee_id
WHERE n.status = 'approved';

    `;
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching winners:", err);
        return res.status(500).json({ error: "Server error" });
      }
  
      res.json(results);
    });
  });
  return router;
}
