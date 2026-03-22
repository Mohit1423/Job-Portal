import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import geturi from "../utils/datauri.js"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const register = async (req, res) => {
    try{
       const  {fullname,phoneNumber,email, password,role} = req.body;
       const file = req.file;

        if(!fullname || !phoneNumber || !email || !password || !role){
            return res.status(400).json({
                message:"Please fill all the fields",
                sucess:false
            });
        }

        if(!file){
            return res.status(400).json({
                message:"Add a profile Image",
                sucess:false
            });
        }
        
        const query = {
            $or: [
                { email:   email   },
                { phoneNumber:   phoneNumber },
            ]
        }

        const user = await User.findOne(query);

        if(user){
            return res.status(400).json({
                message:"User already exists",
                sucess:false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content,{
                folder:"job_portal/images",
        });
        const profile = {
            profilePhoto:cloudResponse.secure_url,
            
        }
        



        await User.create({
            fullname,
            phoneNumber,
            email,
            password:hashedPassword,
            role,
            profile
        });
        

        res.status(200).json({
            message:"Account registered successfully",
            sucess:true
        });

         
    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message:err.message
        })
    }
}

export const login = async (req, res) => {
    try{
        const {email,password,role} = req.body;

        if(!email || !password || !role){
            res.status(400).json({
                message:"Please fill all the fields",
                sucess:false
            });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message:"Email not Found",
                sucess:false
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials",
                sucess:false
            });
        }

        if(user.role !== role){
            return res.status(400).json({
                message:"Account does not exist with current role",
                sucess:false
            });
        }

        const tokenData = {
            userId:user._id,
        }

        const token = jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:"1d"});

       
        
        res.status(200).cookie("token",token,{
            httpOnly: true,  
            secure: true,    
            sameSite: "Strict", 
            maxAge: 1*24*60*60*1000,
        }).json({
            message:`Welcome back ${user.fullname}`,
            sucess:true,
            user,
        })
    }catch(err){
            console.log(err.message);
    }
}

export const logout = async (req, res) => {
    try{
        res.status(200).clearCookie("token").json({
            message:"Logged out successfully",
            sucess:true
        });
    }catch(err){
        console.log(err.message);
    }
}

export const updateProfile = async (req, res) => {
    try{
        const {email,fullname,phoneNumber,bio,skills} = req.body;
        const userId = req.id;
        let file = req.file;
        let user = await User.findById(userId);
        const skillsArray = skills.split(",");

        
        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = skillsArray;

        if(file){
            user.profile.resumeOriginalName = file.originalname;
            const fileUri = getDataUri(file)
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content,{
                folder:"job_portal/resume",
            });
            user.profile.resume = cloudResponse.secure_url 
            
            
            
        }
        
    
       

       await user.save();
       res.status(200).json({
        message:"Profile updated successfully",
        user,
        sucess:true
       })



    }catch(err){
        res.status(500).json({
            message:err.message,
            success:false
            
        })
    } 
}
