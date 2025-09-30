import React, { useEffect, useState } from "react";
import {axiosBackend} from "../axiosInstance";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axiosBackend.get("/contact/read");
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching contacts", error);
    }
  };

  const addContact = async (e) => {
    e.preventDefault();
    if (!newContact.name.trim() || !newContact.email.trim()) return;

    try {
      const res = await axiosBackend.post("/contact/create", {
        name: newContact.name.trim(),
        email: newContact.email.trim(),
      });
      setContacts([...contacts, res.data.contact]);
      setNewContact({ name: "", email: "" }); // reset inputs
    } catch (error) {
      console.error("Error adding contact", error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axiosBackend.delete(`/contact/${id}`);
      setContacts(contacts.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting contact", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-primary">Contacts</h2>

      {/* Add Contact Form */}
      <form onSubmit={addContact} className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          required
        />
        <input
          type="email"
          className="form-control me-2"
          placeholder="Enter Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
          required
        />
        <button className="btn btn-success">Add</button>
      </form>

      {/* Contact List */}
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
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;

