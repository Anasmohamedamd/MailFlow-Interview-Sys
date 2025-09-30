import React, { useEffect, useState } from "react";
import { axiosBackend, axiosAI } from "../axiosInstance";

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ title: "", message: "" });
  const [editingId, setEditingId] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  // AI Outputs
  const [sendTimeSuggestion, setSendTimeSuggestion] = useState("");
  const [subjectLines, setSubjectLines] = useState([]);
  const [personalizedEmail, setPersonalizedEmail] = useState("");
  const [abTestVariations, setABTestVariations] = useState([]);

  useEffect(() => {
    fetchCampaigns();
    fetchContacts();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await axiosBackend.get("/campaign/read");
      setCampaigns(res.data);
    } catch (error) {
      console.error("Error fetching campaigns", error);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await axiosBackend.get("/contact/read");
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching contacts", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear previous AI outputs
    if(e.target.name === "title") setSendTimeSuggestion("");
    setSubjectLines([]);
    setPersonalizedEmail("");
    setABTestVariations([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axiosBackend.put(`/campaign/update/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axiosBackend.post("/campaign/create", formData);
      }
      setFormData({ title: "", message: "" });
      fetchCampaigns();
    } catch (error) {
      console.error("Error saving campaign", error);
      alert("Error saving campaign.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosBackend.delete(`/campaign/delete/${id}`);
      fetchCampaigns();
    } catch (error) {
      console.error("Error deleting campaign", error);
      alert("Error deleting campaign.");
    }
  };

  const handleEdit = (c) => {
    setFormData({ title: c.title, message: c.message });
    setEditingId(c._id);
  };

  const handleSend = async (campaignId) => {
    try {
      await axiosBackend.post(`/campaign/send/${campaignId}`);
      alert("Campaign sent successfully!");
    } catch (error) {
      console.error("Error sending campaign", error);
      alert("Error sending campaign.");
    }
  };

  // ---------- AI Features ----------

  const generateEmailContent = async () => {
    setLoadingAI(true);
    try {
      const res = await axiosAI.post("/generate-email", {
        prompt: formData.title || "Marketing campaign",
      });
      setFormData({ ...formData, message: res.data.content });
    } catch (error) {
      console.error("Error generating content", error);
      alert("Failed to generate email content.");
    } finally {
      setLoadingAI(false);
    }
  };

  const suggestSubjectLines = async () => {
    setLoadingAI(true);
    try {
      const res = await axiosAI.post("/subject-lines", {
        prompt: formData.message || "Email Campaign",
      });
      setSubjectLines(res.data.subjectLines);
    } catch (error) {
      console.error("Error suggesting subject lines", error);
      setSubjectLines(["Failed to suggest subject lines."]);
    } finally {
      setLoadingAI(false);
    }
  };

  const personalizeEmail = async () => {
    setLoadingAI(true);
    try {
      const res = await axiosAI.post("/personalize", {
        content: formData.message,
        firstName: "John",
        company: "TechCorp",
      });
      setPersonalizedEmail(res.data.personalized);
      setFormData({ ...formData, message: res.data.personalized });
    } catch (error) {
      console.error("Error personalizing email", error);
      setPersonalizedEmail("Failed to personalize email.");
    } finally {
      setLoadingAI(false);
    }
  };

  const suggestSendTime = async () => {
  setLoadingAI(true);
  try {
    const token = localStorage.getItem("token"); 
    if (!token) {
      alert("User not logged in.");
      setLoadingAI(false);
      return;
    }

    const res = await axiosAI.post(
      "/suggest-send-time",
      {}, // no body needed, backend uses JWT
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSendTimeSuggestion(res.data.suggestion);
  } catch (error) {
    console.error("Error suggesting send time", error);
    alert("Failed to suggest send time.");
  } finally {
    setLoadingAI(false);
  }
};


  const runABTest = async () => {
    setLoadingAI(true);
    try {
      const res = await axiosAI.post("/run-ab-test", {
        prompt: formData.message || "Default email message",
      });
      setABTestVariations(res.data.variations);
    } catch (error) {
      console.error("Error running A/B Test", error);
      setABTestVariations(["Failed to run A/B Test."]);
    } finally {
      setLoadingAI(false);
    }
  };

  
  return (
    <div className="container mt-5">
      <h3 className="fw-bold text-center text-primary mb-5">📢 Campaigns</h3>

      {/* Contacts */}
      <div className="card p-4 shadow-sm mb-5">
        <h5 className="mb-3">👥 Contacts:</h5>
        {contacts.length > 0 ? (
          <ul className="list-unstyled ms-3">
            {contacts.map((c) => (
              <li key={c._id} className="mb-2">
                <strong>{c.name}</strong> - <span className="text-muted">{c.email}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-danger">⚠️ No contacts available.</p>
        )}
      </div>

      {/* Campaign Form */}
      <div className="card shadow-sm p-4 mb-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-semibold">Campaign Title</label>
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
          <div className="mb-4">
            <label className="form-label fw-semibold">Message</label>
            <textarea
              name="message"
              className="form-control"
              rows="5"
              placeholder="Write Your Email Message..."
              onChange={handleChange}
              value={formData.message}
              required
            />
          </div>

          {/* AI Buttons */}
          <div className="d-flex flex-wrap gap-3 mb-4">
            <button type="button" className="btn btn-secondary" onClick={generateEmailContent} disabled={loadingAI}>
               Generate Content
            </button>
            <button type="button" className="btn btn-info" onClick={suggestSubjectLines} disabled={loadingAI}>
               Suggest Subject Lines
            </button>
            <button type="button" className="btn btn-success" onClick={personalizeEmail} disabled={loadingAI}>
               Personalize Email
            </button>
            <button type="button" className="btn btn-primary" onClick={suggestSendTime} disabled={loadingAI}>
               Suggest Send Time
            </button>
            <button type="button" className="btn btn-dark" onClick={runABTest} disabled={loadingAI}>
               Run A/B Test
            </button>
          </div>

          {/* AI Results */}
          <div className="mb-4">
            {sendTimeSuggestion && <div className="alert alert-info">{sendTimeSuggestion}</div>}
            {subjectLines.length > 0 && (
              <div className="alert alert-warning">
                <strong>Subject Lines:</strong>
                <ul className="mb-0">{subjectLines.map((line, idx) => <li key={idx}>{line}</li>)}</ul>
              </div>
            )}
            {personalizedEmail && <div className="alert alert-success"><strong>Personalized Email:</strong> <p>{personalizedEmail}</p></div>}
            {abTestVariations.length > 0 && (
              <div className="alert alert-dark">
                <strong>A/B Test Variations:</strong>
                <ul className="mb-0">{abTestVariations.map((v, idx) => <li key={idx}>{v}</li>)}</ul>
              </div>
            )}
          </div>

          <button className="btn btn-primary px-4 py-2">{editingId ? "Update Campaign" : "Create Campaign"}</button>
        </form>
      </div>

      {/* Campaign List */}
      <div className="row g-4">
        {campaigns.map((c) => (
          <div className="col-md-6" key={c._id}>
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{c.title}</h5>
                <p className="card-text flex-grow-1">{c.message}</p>
                <div className="d-flex gap-2 mt-3">
                  <button className="btn btn-warning" onClick={() => handleEdit(c)}> Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(c._id)}> Delete</button>
                  <button className="btn btn-success" onClick={() => handleSend(c._id)} disabled={contacts.length === 0}> Send</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaign;

