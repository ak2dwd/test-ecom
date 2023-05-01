import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import users from "../models/users.js";
import JWT from "jsonwebtoken";

export const register = async (req,res) => {
    try {
        const {name,email,password,phone,address} = req.body;
        if(!name) {
            return res.send({error:"name is require"});
        }
        if(!email) {
            return res.send({error:"email is require"});
        }
        if(!password) {
            return res.send({error:"password is require"});
        }
        if(!phone) {
            return res.send({error:"phone is require"});
        }
        if(!address) {
            return res.send({error:"address is require"});
        }
        // estsing user 
        const hashedPassword = await hashPassword(password);
        const existingUser = await users.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:"user is exist please login"
            });
        }
        
        const saveUser = await new users({name,email,phone,address,password:hashedPassword}).save(); 
        res.status(200).send({
            success:true,
            message:"done",
            saveUser
        })

    } catch (error) {
        res.status(500).send({
            success:false,
            message: `Registation error ${error}`,
            error: error
        })
    }
};

export const loginControllers = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            res.status(200).send({
                success:false,
                message: `email and password not found`,
            });
        }
        const user = await users.findOne({email});
        if(!user) {
            res.status(200).send({
                success:false,
                message: `email and password is wrong`,
            });
        }
        const match = await comparePassword(password,user.password);
        if(!match) {
            res.status(200).send({
                success:false,
                message: `email and password is wrong`,
            });  
        }
        const token = JWT.sign({_id:user.id},process.env.JWT_PRIVATE,{expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message: "login succussfully",
            user:{
                'email' : user.email,
                'name' : user.name,
                'address' : user.address},
            token
        }); 
        
         
    } catch (error) {
        res.status(500).send({
            success:false,
            message: `login error ${error}`,
            error: error
        })   
    }
}
