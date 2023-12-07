const express=require("express");
const app=express();
const env=require("dotenv").config();
const noteRouter=require("./src/routes/noteRouter");
const useRouter=require("./src/routes/useRouter");


const mongoose=require("mongoose");
app.use(express.json())
app.use("/users",useRouter);
app.use("/note",noteRouter);
app.get("/",(req,res)=>{
    res.send("Hello")
})
// const Port=process.env.PORT || 3000
mongoose.connect(process.env.MONGO).then(()=>{
    app.listen(5000,()=>{
        console.log("Server connected at 5000")
    })
}).catch((err)=>{
    console.log(err)
})