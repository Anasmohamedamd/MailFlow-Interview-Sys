const Contact = require('../Model/Contact');


// Get contacts for logged-in user
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Add new contact
exports.addContact = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ msg: "Email is required" });

    const exist = await Contact.findOne({ email, user: req.user.id });
    if (exist) return res.status(400).json({ msg: "Contact already exists" });

    const contact = await Contact.create({ email, user: req.user.id });
    res.status(201).json({ msg: "Contact added", contact });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete contact
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    if (contact.user.toString() !== req.user.id)
      return res.status(403).json({ msg: "Not authorized" });

    await contact.deleteOne();
    res.json({ msg: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
