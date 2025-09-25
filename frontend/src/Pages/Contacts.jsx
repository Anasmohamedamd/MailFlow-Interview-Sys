import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axiosInstance.get("/contact/read");
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching contacts", error);
    }
  };

  const addContact = async (e) => {
    e.preventDefault();
    if (!newContact.trim()) return;

    try {
      const res = await axiosInstance.post("/contact/create", {
        email: newContact.trim(),
      });
      setContacts([...contacts, res.data.contact]);
      setNewContact("");
    } catch (error) {
      console.error("Error adding contact", error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axiosInstance.delete(`/contact/${id}`);
      setContacts(contacts.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting contact", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-primary">Contacts</h2>

      <form onSubmit={addContact} className="d-flex mb-3">
        <input
          type="email"
          className="form-control me-2"
          placeholder="Enter Email"
          value={newContact}
          onChange={(e) => setNewContact(e.target.value)}
          required
        />
        <button className="btn btn-success">Add</button>
      </form>

      <ul className="list-group">
        {contacts.map((c) => (
          <li
            key={c._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {c.email}
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
