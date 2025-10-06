import React, { useEffect, useState } from "react";
import { axiosBackend } from "../axiosInstance";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  // Fetch contacts
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await axiosBackend.get("/contact/read");
      const data = Array.isArray(res.data) ? res.data : res.data.contacts || [];
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts", error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Add new contact
  const addContact = async (e) => {
    e.preventDefault();
    if (!newContact.name.trim() || !newContact.email.trim()) return;

    setLoading(true);
    try {
      const res = await axiosBackend.post("/contact/create", {
        name: newContact.name.trim(),
        email: newContact.email.trim(),
      });
      const added = res.data.contact || res.data;
      setContacts([...contacts, added]);
      setNewContact({ name: "", email: "" });
    } catch (error) {
      console.error("Error adding contact", error);
      alert("Failed to add contact.");
    } finally {
      setLoading(false);
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    setLoading(true);
    try {
      await axiosBackend.delete(`/contact/${id}`);
      setContacts(contacts.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting contact", error);
      alert("Failed to delete contact.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-center text-primary mb-4">👥 My Contacts</h2>

      {/* Add Contact Form */}
      <div className="card p-4 shadow-sm mb-4">
        <form onSubmit={addContact} className="d-flex gap-2 flex-wrap">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            required
          />
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={newContact.email}
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
            required
          />
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Saving..." : "Add Contact"}
          </button>
        </form>
      </div>

      {/* Contact List */}
      <div className="card p-4 shadow-sm">
        {contacts.length > 0 ? (
          <ul className="list-group">
            {contacts.map((c) => (
              <li
                key={c._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{c.name}</strong> — <span className="text-muted">{c.email}</span>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteContact(c._id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-danger mb-0">⚠️ No contacts available.</p>
        )}
      </div>
    </div>
  );
};

export default Contacts;
