const userModel=require("../models/user");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const SecretKey="NOTEAPI"

const signup=async(req,res)=>{
        const {username,email,password}=req.body;
        try {
            const existinguser=await userModel.findOne({email:email});
            if(existinguser){
                 return res.status(400).json({message:"User already exist"});
            }
            const hashedPassword=await bcrypt.hash(password,10);

            const result=await userModel.create({
                email:email,
                password:hashedPassword,
                username:username
            });

            const token=jwt.sign({email:result.email,id:result._id},SecretKey);
            res.status(201).json({user:result,token:token})
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Something went wrong"})
        }
}
const singin=async(req,res)=>{
      const {email,password}=req.body;
      try {
        const existinguser=await userModel.findOne({email:email});
            if(!existinguser){
                 return res.status(404).json({message:"User not found"});
            }
            const matchPassword=await bcrypt.compare(password,existinguser.password);
            if(!matchPassword){
                return res.status(404).json({message:"Invalid credentials"})
            }
            const token=jwt.sign({email:existinguser.email,id:existinguser._id},SecretKey);
            res.status(201).json({user:existinguser,token:token})
      } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
        
      }
}

module.exports={singin,signup}