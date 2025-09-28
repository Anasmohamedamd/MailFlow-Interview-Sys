import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [contacts, setContacts] = useState([]); 
  const [formData, setFormData] = useState({ title: "", message: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCampaigns();
    fetchContacts(); // 👈 NEW
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await axiosInstance.get("/campaign/read");
      setCampaigns(res.data);
    } catch (error) {
      console.error("Error fetching campaigns", error);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await axiosInstance.get("/contact/read");
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching contacts", error);
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

  const handleSend = async (campaignId) => {
    try {
      await axiosInstance.post(`/campaign/send/${campaignId}`);
      alert("Campaign sent successfully!");
    } catch (error) {
      console.error("Error sending campaign", error);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="fw-bold text-center text-primary mb-4">Campaigns</h3>

      {/* Contacts Preview */}
      <div className="card p-3 shadow-sm mb-4">
        <h5>Contacts (will receive campaign):</h5>
        {contacts.length > 0 ? (
          <ul>
            {contacts.map((c) => (
              <li key={c._id}>
                {c.name} - <span className="text-muted">{c.email}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-danger">No contacts available. Add some first!</p>
        )}
      </div>

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
          </div>

      {/* Campaign List */}
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
                    className="btn btn-danger me-2"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleSend(c._id)}
                  disabled={contacts.length === 0} // prevent sending if no contacts
                >
                  Send Campaign
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaign;

