const mongoose=require("mongoose");


const userShema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    }
},{timeStamps :true})
module.exports=mongoose.model("users",userShema);