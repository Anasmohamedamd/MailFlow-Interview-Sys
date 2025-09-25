import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [formData, setFormData] = useState({ title: "", message: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await axiosInstance.get("/campaign/read");
      setCampaigns(res.data);
    } catch (error) {
      console.error("Error fetching campaigns", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axiosInstance.put(`/campaign/update/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axiosInstance.post("/campaign/create", formData);
      }

      setFormData({ title: "", message: "" });
      fetchCampaigns();
    } catch (error) {
      console.error("Error saving campaign", error);
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting id:", id); 
    try {
      await axiosInstance.delete(`/campaign/delete/${id}`);
      fetchCampaigns();
    } catch (error) {
      console.error("Error deleting campaign", error);
    }
  };

  const handleEdit = (c) => {
    setFormData({ title: c.title, message: c.message });
    setEditingId(c._id);
  };

  return (
    <div className="container mt-5">
      <h3 className="fw-bold text-center text-primary mb-4">Campaigns</h3>

      <div className="card shadow-sm p-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Campaign Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter Title"
              onChange={handleChange}
              value={formData.title}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Messages</label>
            <textarea
              name="message"
              className="form-control"
              rows="4"
              placeholder="Write Your Email Message..."
              onChange={handleChange}
              value={formData.message}
              required
            ></textarea>
          </div>
          <button className="btn btn-primary">
            {editingId ? "Update Campaign" : "Create Campaign"}
          </button>
        </form>

        <div className="row mt-4">
          {campaigns.map((c) => (
            <div className="col-md-5 mb-4" key={c._id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{c.title}</h5>
                  <p className="card-text">{c.message}</p>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Campaign;
