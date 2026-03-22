import Company from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import { logout } from "./user.contoller.js";



export const register_company = async (req, res) => {
    try{
        const {name} = req.body;
        
        if(!name ){
            return res.status(400).json({
                message:"Company name is needed",
                sucess:false
            });
        }
        

        const companyExists = await Company.findOne({name});
        
        if(companyExists){
            return res.status(400).json({
                message:"Company already exists",
                sucess:false
            });
        }

       const company = await Company.create({
        name,
        userId:req.id

       })
       return res.status(200).json({
           message:"Company registered successfully",
           company,
           success:true
       })

    }catch(error){
        res.status(500).json({
            message:error.message,
            success:false,
        })
    }

}
//Companies made by the User
export const getCompany = async (req, res) => {
    try{
        const userId = req.id;
        const companies = await Company.find({userId});
        
        if(!companies){
            return res.status(404).json({
                message:"No companies found",
                sucess:false
            });
        }

        res.status(200).json({
            message:"Companies found",
            companies,
            success:true
        })

    }catch(error){
        res.status(500).json({
            message:error.message,
            success:false,
        })
    }


}

export const getCompanyByID = async (req, res) => {
    try{

        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if(!company){
            return res.status(404).json({
                message:"Company not found",
                sucess:false
            });
        }

        res.status(200).json({
            message:"Company found",
            company,
            success:true
        })
    }catch(error){
        res.status(500).json({
            message:error.message,
            success:false,
        })
    }


}

export const updateCompany = async (req, res) => {
    try{
        const {name,description,website,location} = req.body;
        const file = req.file;
        if(!name || !description || !website || !location){
            return res.status(400).json({
                message:"Please fill all the fields",
                sucess:false
            });
        }
        if(!file){
            return res.status(400).json({
                message:"Add a company Image",
                sucess:false
            });
        }

        //cloudinary setup
        
            const fileUri = getDataUri(file)
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content,{
                folder:"job_portal/images",
        });
        

        const updateData = {
            name,
            description,
            website,
            location,
            logo:cloudResponse.secure_url
        }

        const company = await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});

        res.status(200).json({
            message:"Company updated successfully",
            company,
            success:true,
        })
        
    }
    catch(error){
        res.status(500).json({
            message:error.message,
            success:false,
        })
    }

}