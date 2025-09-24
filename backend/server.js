const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();
 const authRoutes = require('./Routes/authRoutes');

const app = express();

app.use(cors());

app.use(express.json());
 app.use('/api/auth',authRoutes);

mongoose.connect(process.env.MONGO_URI) .then(()=>{console.log("MongoDB Connected")})
.catch((err)=>{
    console.log("Error",err);
});

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
