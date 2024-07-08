const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const userSchema = mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{type:String , require:true},
    email:{type:String , require:true, unique:true},
    password:{type:String , require:true},
    pic:{type:String , default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chat'  
    }
},   
{
    timestamps:true,
}
)


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword , this.password)
}


userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }
    const  salt  = await  bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt)
})


const User = mongoose.model("User", userSchema);
module.exports = User;









