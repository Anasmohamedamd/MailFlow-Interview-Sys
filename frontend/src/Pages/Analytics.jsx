import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import {LineChart,Line,BarChart,Bar,XAxis,YAxis,Tooltip,Legend,CartesianGrid,ResponsiveContainer} from 'recharts';

const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axiosInstance.get("/analytics/read"); // all campaigns for user
        setAnalytics(res.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Error fetching analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <p>Loading analytics...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!analytics || analytics.length === 0) return <p>No analytics found</p>;

  // Prepare chart data
  const chartData = analytics.map((a) => ({
    name: a.campaign?.title || "Unnamed",
    Sent: a.sent,
    Opened: a.opened,
    Clicked: a.clicked
  }));

  return (
    <div className='container mt-5'>
      <h3 className='fw-bold text-center text-primary mb-4'>Campaign Analytics</h3>

      {/* Bar Chart */}
      <div className='card shadow-sm p-3 mb-4'>
        <h5 className='fw-bold'>Email Performance</h5>
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

      {/* Line Chart */}
      <div className="card shadow-sm p-3 mb-4">
        <h5 className="fw-bold">Trends Over Campaigns</h5>
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

      {/* Detailed List */}
      {analytics.map((a) => (
        <div key={a._id} className="card shadow-sm p-3 mb-3">
          <h5>{a.campaign?.title}</h5>
          <p>{a.campaign?.message}</p>
          <ul className="list-group mb-2">
            <li className="list-group-item">📤 Sent: {a.sent}</li>
            <li className="list-group-item">📬 Opened: {a.opened}</li>
            <li className="list-group-item">🔗 Clicked: {a.clicked}</li>
          </ul>

          {/* Failed Emails if any */}
          {a.failedEmails && a.failedEmails.length > 0 && (
            <div className="mb-2">
              <h6>Failed Emails:</h6>
              <ul>
                {a.failedEmails.map((email, index) => (
                  <li key={index}>{email}</li>
                ))}
              </ul>
            </div>
          )}

          <small className="text-muted">
            Last updated: {new Date(a.updatedAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
};

export default Analytics;
