const Analytics = require('../Model/Analytics');
const mongoose = require('mongoose');

//track email opening
exports.trackOpen = async(req,res) => {
    try {
        const{campaignId} = req.params;
        const{user} = req.query;

          console.log("Tracking open for:", { campaignId, user });

        await Analytics.findOneAndUpdate(
            {campaign:campaignId,user},
            {$inc:{opened:1}},
            {upsert:true}
        );

           res.set('Content-Type', 'image/gif');
           res.send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==', 'base64'));
    } catch (error) {
       res.status(500).send(); 
    }
};

//Track click on links
exports.trackClick = async (req,res) => {
    try {
        const {campaignId} = req.params;
        const {user,url} = req.query;
        await Analytics.findOneAndUpdate(
            {campaign:campaignId,user},
            {$inc:{clicked:1}},
            {upsert:true}
        );
        res.redirect(url);
    } catch (error) {
        res.status(500).send();
    }
}
 //get analytics for logged in user
// Get analytics for a specific campaign OR all campaigns for the user
exports.getAnalytics = async (req, res) => {
  try {
    let query = { user: new mongoose.Types.ObjectId(req.user.id) };

    // If campaignId is passed, filter by it, else return all campaigns for this user
    if (req.params.campaignId) {
      query.campaign = new mongoose.Types.ObjectId(req.params.campaignId);
    }

    const analytics = await Analytics.find(query)
      .populate("campaign", "title message");

    if (!analytics || analytics.length === 0) {
      return res.status(404).json({ msg: "No analytics found" });
    }

    res.json(analytics);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};