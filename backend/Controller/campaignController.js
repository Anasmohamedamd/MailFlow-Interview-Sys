const Campaign = require('../Model/Campaign');
const Analytics = require('../Model/Analytics');
const Contact = require('../Model/Contact');
const User = require('../Model/User');
const sendEmail = require('../Service/emailService'); 

// Create Campaign
exports.createCampaign = async (req, res) => {
  try {
    const { title, message, recipients } = req.body;
    const campaign = await Campaign.create({
      title,
      message,
      recipients: recipients || [], 
      user: req.user.id
    });
    res.status(201).json(campaign);
  } catch (error) {
    console.error("Error creating campaign:", error);
    res.status(500).json({ msg: error.message });
  }
};

// Read all campaigns for a user
exports.getCampaign = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ user: req.user.id });
    res.json(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ msg: error.message });
  }
};

// Update Campaign
exports.updateCampaign = async (req, res) => {
  try {
    const { title, message } = req.body;
    const campaign = await Campaign.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, message },
      { new: true }
    );
    if (!campaign) return res.status(404).json({ msg: "Campaign not found" });
    res.json(campaign);
  } catch (error) {
    console.error("Error updating campaign:", error);
    res.status(500).json({ msg: error.message });
  }
};

// Delete Campaign
exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    if (!campaign) return res.status(404).json({ msg: "Campaign not found" });
    res.json({ msg: "Campaign deleted successfully" });
  } catch (error) {
    console.error("Error deleting campaign:", error);
    res.status(500).json({ msg: error.message });
  }
};

// Send Campaign
exports.sendCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    if (!campaign) return res.status(404).json({ msg: "Campaign not found" });

    // Fetch recipients from Users & Contacts
    const users = await User.find({ _id: { $in: campaign.recipients } });
    const userRecipients = users
      .filter(u => u.email)
      .map(u => ({ email: u.email, name: u.name }));

    const contacts = await Contact.find({ user: req.user.id });
    const contactRecipients = contacts
      .filter(c => c.email)
      .map(c => ({ email: c.email, name: c.name }));

    // Combine recipients & remove duplicates
    const emailMap = new Map();
    [...userRecipients, ...contactRecipients].forEach(r => {
      if (!emailMap.has(r.email)) emailMap.set(r.email, r);
    });
    const recipients = Array.from(emailMap.values());
    if (recipients.length === 0)
      return res.status(400).json({ msg: "No valid recipient emails found" });

    // Create or fetch analytics
    let analytics = await Analytics.findOne({ campaign: campaign._id, user: req.user.id });
    if (!analytics) {
      analytics = await Analytics.create({ campaign: campaign._id, user: req.user.id });
    }

    const failedEmails = [];

    // Send emails
    for (const recipient of recipients) {
      try {
        await sendEmail(
          recipient,
          campaign.title,
          `<p>${campaign.message}</p>
          <img src="http://localhost:3000/api/analytics/open/${campaign._id}?user=${req.user.id}" width="1" height="1" />
          <a href="http://localhost:3000/api/analytics/click/${campaign._id}?user=${req.user.id}&url=https://example.com">Click here</a>`
        );
      } catch (err) {
        console.error("Failed sending to:", recipient.email, err.message);
        failedEmails.push(recipient.email);
      }
    }

    // Update analytics
    analytics.sent = (analytics.sent || 0) + (recipients.length - failedEmails.length);
    if (failedEmails.length > 0) analytics.failedEmails = failedEmails;
    await analytics.save();

    res.json({
      msg: "Campaign sent successfully",
      analytics,
      failedEmails: failedEmails.length ? failedEmails : undefined
    });
  } catch (error) {
    console.error("Error sending campaign:", error);
    if (!res.headersSent) {
      res.status(500).json({ msg: error.message });
    }
  }
};
