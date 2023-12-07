const express =require('express');
const { signup, singin } = require('../Controller/useController');
const useRouter=express.Router();

useRouter.post("/signup",signup)
useRouter.post("/signin",singin)

module.exports=useRouter;