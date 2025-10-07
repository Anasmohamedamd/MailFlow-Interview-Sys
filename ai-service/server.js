const express = require('express');
const cors = require('cors');
require('dotenv').config();
const aiRoutes = require('./Routes/aiRoutes');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/ai',aiRoutes);

mongoose.connect(process.env.MONGO_URI) .then(()=>{console.log("MongoDB Connected")})
.catch((err)=>{
    console.log("Error",err);
});

app.get("/", (req, res) => {
  res.send("MailFlow Backend is Running ✅");
});


const PORT = process.env.PORT;

app.listen(PORT,"0.0.0.0",() => {
    console.log(`AI service running on ${PORT}`);
})