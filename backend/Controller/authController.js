const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Model/User');

exports.register = async(req,res) => {
   try {
     const{name,email,password} = req.body;
    const exists = await User.findOne({email});
    if(exists) return res.status(400).json({msg:"User already existing"});

    const hashed = await bcrypt.hash(password,10);
    const user = await User.create({name,email,password:hashed});
    res.status(200).json({msg:'User Registered',user})
   } catch (error) {
    res.status(400).json({msg:error.message});
   }
}

exports.login = async(req,res) => {
    try {
        const{email,password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg:"Invalid User"});

        const match = await bcrypt.compare(password,user.password);
        if(!match)  return res.status(401).json({msg:"Invalid Password"});
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'5h'});
        res.json({msg:'Login Successfully',user:{name:user.name,email:user.email},token})
    } catch (error) {
        res.status(401).json({msg:error.msg});
    }
}

exports.getUsers = async(req,res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({msg:error.msg});
    }
}

exports.getUser = async(req,res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

exports.updateUser = async(req,res) => {
    try {
        const{name,email,password} = req.body;
        let updateData = {name,email};
        if(password){
            updateData.password = await bcrypt.hash(password,10);
        }

        const user = await User.findByIdAndUpdate(req.params.id,updateData,{new:true}).select('-password');
        if(!user) return res.status(404).json({msg:'User not found'});
        res.json({msg:'User Updated',user});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

exports.deleteUser = async(req,res) => {
    try{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user) return res.status(404).json({msg:'User not found'});
    res.json({msg:'User Deleted',user});
    } catch(error){
        res.status(500).json({msg:error.message});
    }
}