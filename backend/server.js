const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();
const authRoutes = require('./Routes/authRoutes');
const campaignRoutes = require('./Routes/campaignRoutes');
const contactRoutes = require('./Routes/contactRoutes');
const auth = require('./MiddleWare/authMiddleware');
const analyticalRoutes = require('./Routes/analyticalRoutes');

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/campaign',auth,campaignRoutes);
app.use('/api/contact',contactRoutes);
app.use('/api/analytics',analyticalRoutes);


mongoose.connect(process.env.MONGO_URI) .then(()=>{console.log("MongoDB Connected")})
.catch((err)=>{
    console.log("Error",err);
});

app.get("/", (req, res) => {
  res.send("MailFlow Backend is Running ✅");
});


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
