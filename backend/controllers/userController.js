const generateToken = require("../config/generateToken");
const  User = require("../models/userModel")
const asyncHandler = require("express-async-handler");


const registerUser = asyncHandler( async(req , res)=>{
    const { name , email , password , pic } = req.body;
    if (!name || !email || !password ) {
        res.status(400)
        throw new Error('Please Enter All Fields')
    }

    let user = await User.findOne({email})
    if (user) {
        res.status(400)
        throw new Error("User Already Exists")
    }

    user = await User.create({
        name,email,password , pic
    })

    if (user) {
        res.status(201).json({
            user, token:generateToken(user._id),
            success:true
        })
    }else{
        res.status(400)
        throw new Error("failed to Create User")
    }
})      

const loginUser = asyncHandler( async(req , res)=>{
    const {email , password} = req.body;
    const user = await User.findOne({email})
    if (user && ( await user.matchPassword(password))) {
        res.json({
            _id : user._id,
            name: user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),
            success:true
        })
    }else{
        res.status(401)
        throw new Error ('Invalid Email or Password')
    }
})

const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });  // check it again please
    res.send(users);
  });

module.exports = {registerUser , loginUser ,allUsers }