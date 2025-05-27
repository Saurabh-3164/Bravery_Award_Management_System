import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [nominees, setNominees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchNominees = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/nominees?status=${filter}`
        );
        setNominees(response.data);
      } catch (error) {
        console.error("Error fetching nominees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNominees();
  }, [filter]);

  const handleStatusChange = (id, status) => {
    axios
      .post(`http://localhost:3000/api/nominees/${id}/status`, { status })
      .then((response) => {
        setNominees((prevNominees) =>
          prevNominees.map((nominee) =>
            nominee.nominee_id === id ? { ...nominee, nominee_status: status } : nominee
          )
        );
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleLogout = () => {
    // Perform logout logic here (e.g., clearing tokens, redirecting to login page)
    console.log("Logout clicked");
    // Clear session storage or local storage if needed
    sessionStorage.clear();
    localStorage.clear();
    // Redirect to login page and clear history stack
    window.location.replace("/AdminLogin");
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="filter-container">
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <p>Loading nominees...</p>
      ) : (
        <div className="table-scroll">
          <table className="nominee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Recommended Category</th>
                <th>AI Responses</th>
                <th>Actions</th>
                <th>Nominee Details</th>
              </tr>
            </thead>
            <tbody>
              {nominees.map((nominee) => (
                <tr key={nominee.nominee_id}>
                  <td>{nominee.name}</td>
                  <td>{nominee.category}</td>
                  <td>{nominee.nominee_status}</td>
                  <td>{nominee.recommended_category || "N/A"}</td>
                  <td>
                    {nominee.evaluation_result || "No response"} AI Response
                  </td>
                  <td>
                    {nominee.nominee_status === "pending" && (
                      <>
                        <button
                          className="approve-btn"
                          onClick={() =>
                            handleStatusChange(nominee.nominee_id, "approved")
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() =>
                            handleStatusChange(nominee.nominee_id, "rejected")
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                  <td>
                    <div>
                      <strong>Story:</strong> {nominee.story}
                    </div>
                    <div>
                      <strong>Follow-up Questions:</strong>{" "}
                      {nominee.followupQuestionsAndAnswers
                        ? nominee.followupQuestionsAndAnswers.map((item, index) => (
                            <div key={index}>
                              <strong>{item.question}:</strong> {item.answer}
                            </div>
                          ))
                        : "No follow-up questions"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
