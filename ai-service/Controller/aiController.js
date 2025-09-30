const OpenAI = require("openai");
const jwt = require("jsonwebtoken");
const Analytics = require("../Model/Analytics");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

//  Generate full email content
exports.generateEmail = async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a professional email copywriter." },
        { role: "user", content: `Write a professional marketing email about: ${prompt}` },
      ],
    });

    const content = response.choices[0].message.content;
    res.json({ content });
  } catch (error) {
    console.error("Error in generateEmail:", error);
    res.status(500).json({ msg: error.message });
  }
};

//  Suggest subject lines
exports.subjectLines = async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert at writing catchy subject lines." },
        { role: "user", content: `Generate 10 engaging subject lines for: ${prompt}` },
      ],
    });

    const lines = response.choices[0].message.content
      .split("\n")
      .map((line) => line.replace(/^\d+[\.\)]\s*/, "").trim()) // remove numbering if added
      .filter((line) => line.length > 0);

    res.json({ subjectLines: lines });
  } catch (error) {
    console.error("Error in subjectLines:", error);
    res.status(500).json({ msg: error.message });
  }
};

//  Personalize email content
exports.personalizeEmail = async (req, res) => {
  try {
    const { content, firstName, company } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert at email personalization." },
        {
          role: "user",
          content: `Personalize this email for ${firstName || "a customer"} at ${company || "a company"}: 
          ${content}`,
        },
      ],
    });

    const personalized = response.choices[0].message.content;
    res.json({ personalized });
  } catch (error) {
    console.error("Error in personalizeEmail:", error);
    res.status(500).json({ msg: error.message });
  }
};

// suggest send time
exports.suggestSendTime = async (req, res) => {
  try {
    const userId = req.user.id; // From authMiddleware

    const analytics = await Analytics.find({ user: userId });

    if (!analytics || analytics.length === 0) {
      return res.json({
        suggestion: "Not enough data. Default: send during business hours (9 AM - 5 PM).",
      });
    }

    // Count opens per hour
    const hourMap = {};
    analytics.forEach((a) => {
      const hour = new Date(a.updatedAt).getHours();
      hourMap[hour] = (hourMap[hour] || 0) + (a.opened || 0);
    });

    const bestHour = Object.entries(hourMap)
      .sort((a, b) => b[1] - a[1])[0][0];

    res.json({ suggestion: `Your best send time is around ${bestHour}:00 hrs.` });
  } catch (error) {
    console.error("Error in suggestSendTime:", error);
    res.status(500).json({ msg: error.message });
  }
};

//  Run A/B test with AI variations
exports.runABTest = async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert in A/B testing emails." },
        { role: "user", content: `Generate 2 variations of this email for testing: ${prompt}` },
      ],
    });

    const variations = response.choices[0].message.content
      .split("\n\n")
      .filter((v) => v.trim().length > 0);

    res.json({ message: "A/B Test Variations Generated", variations });
  } catch (error) {
    console.error("Error in runABTest:", error);
    res.status(500).json({ msg: error.message });
  }
};
