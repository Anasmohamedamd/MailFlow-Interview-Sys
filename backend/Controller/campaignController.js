const Campaign = require('../Model/Campaign');

exports.getCampaign = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ user: req.user.id });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createCampaign = async (req, res) => {
  try {
    const { title, message } = req.body;

    if (!title || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newCampaign = new Campaign({
      title,
      message,
      user: req.user.id, //  Save user from token
    });

    await newCampaign.save();
    res.status(201).json(newCampaign);
    console.log("Current user:", req.user);
  } catch (error) {
    console.error("Error creating campaign:", error.message); //  log error
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

exports.updateCampaign = async (req, res) => {
 try {
    const { id } = req.params;
    const { title, message } = req.body;

    const campaign = await Campaign.findById(id);
    if (!campaign) return res.status(404).json({ msg: "Campaign not found" });

    // Ensure only the owner can update
    if (campaign.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    campaign.title = title;
    campaign.message = message;
    await campaign.save();

    res.json({ msg: "Campaign updated", campaign });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteCampaign = async (req, res) => {
   try {
    const { id } = req.params;
    const campaign = await Campaign.findByIdAndDelete(id);
    if (!campaign) return res.status(404).json({ msg: "Campaign not found" });

    res.json({ msg: "Campaign deleted successfully", campaign });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
