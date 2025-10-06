import React, { useEffect, useState } from 'react';
import { axiosBackend } from '../axiosInstance';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosBackend.get("/analytics/read"); // user-specific analytics
      setAnalytics(res.data);
    } catch (err) {
      console.error("Error fetching analytics", err);
      setError(err.response?.data?.message || "Failed to fetch analytics.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading analytics...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;
  if (!analytics || analytics.length === 0) return <p className="text-center mt-5">No analytics found.</p>;

  const chartData = analytics.map(a => ({
    name: a.campaign?.title || "Unnamed",
    Sent: a.sent || 0,
    Opened: a.opened || 0,
    Clicked: a.clicked || 0
  }));

  return (
    <div className="container mt-5">
      <h3 className="fw-bold text-center text-primary mb-5">📊 Campaign Analytics</h3>

      {/* Charts */}
      <div className="card shadow-sm p-4 mb-4">
        <h5 className="fw-bold mb-3">Email Performance (Bar Chart)</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Sent" fill="#8884d8" />
            <Bar dataKey="Opened" fill="#82ca9d" />
            <Bar dataKey="Clicked" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card shadow-sm p-4 mb-5">
        <h5 className="fw-bold mb-3">Trends Over Campaigns (Line Chart)</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Sent" stroke="#8884d8" />
            <Line type="monotone" dataKey="Opened" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Clicked" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Analytics List */}
      {analytics.map(a => (
        <div key={a._id} className="card shadow-sm p-4 mb-3">
          <h5 className="fw-bold">{a.campaign?.title || "Untitled Campaign"}</h5>
          <p>{a.campaign?.message || "No message content"}</p>
          <ul className="list-group mb-3">
            <li className="list-group-item">📤 Sent: {a.sent || 0}</li>
            <li className="list-group-item">📬 Opened: {a.opened || 0}</li>
            <li className="list-group-item">🔗 Clicked: {a.clicked || 0}</li>
          </ul>

          {a.failedEmails && a.failedEmails.length > 0 && (
            <div className="mb-2">
              <h6>Failed Emails:</h6>
              <ul className="list-group">
                {a.failedEmails.map((email, idx) => (
                  <li key={idx} className="list-group-item">{email}</li>
                ))}
              </ul>
            </div>
          )}

          <small className="text-muted">Last updated: {new Date(a.updatedAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default Analytics;
