const Contact = require("../Model/Contact");

// Create Contact
exports.addContact = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ msg: "Name and Email are required" });
    }

     const existingContact = await Contact.findOne({ email });
        if (existingContact) {
            return res.status(409).json({ 
                msg: "Contact with this email already exists", 
                contact: existingContact 
            });
        }

    const contact = new Contact({ 
      user:req.user.id,
      name,
      email
       });
    await contact.save();

    res.status(201).json({ msg: "Contact created", contact });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ msg: error.message });
  }
};

// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({user:req.user.id});
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete contact
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete({
     _id:req.params.id,
      user:req.user.id
    });
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    res.json({ msg: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
