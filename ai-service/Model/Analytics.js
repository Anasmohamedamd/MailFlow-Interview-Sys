const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    campaign : { type:mongoose.Schema.Types.ObjectId, ref:"Campaign",required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sent:{type:Number,default:0},
    opened:{type:Number,default:0},
    clicked:{type:Number,default:0},
},{timestamps:true});

module.exports = mongoose.model('Analytics',analyticsSchema);