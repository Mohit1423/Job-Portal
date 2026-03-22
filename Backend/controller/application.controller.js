//Create application(isme tu dalega student_id(from cookie) and job_id(from params) this will be runned when the user applies for a job set status to pending,
// Search application by student_id and job_id (isme tu student_id ke corresponding Job_id lega and usko show krega) and (isme tu job_id ke corresponding student_id lega and usko show krega) ab tu chaiye toh tu isse job id ke correpsonding applicns wale secition main user_id ko save kar sakta hain yaah kuch bhi but i dont suggest data duplication like this mf did 
//Update application status to reject and update application status to accepted
//Currently lets just follow this mf and see what to do

import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const applyJob = async (req, res) => {

    try{
        const student_id = req.id;
        const job_id = req.params.id;

        if(!student_id){
            res.status(400).json({
                message:"student_id is required",
                sucess:false
            })
        }
        if(!job_id){
            res.status(400).json({
                message:"job_id is required",
                sucess:false
            })
        }

        // Check if user has applied already or not
        const existingApplication = await Application.findOne({job:job_id,applicant:student_id});

        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this job",
                sucess:false
            })
        }
        

        const application = await Application.create({job:job_id,applicant:student_id});

        //Now he is updating the application in the job model so that the recruiter can see the applications of the student which is a very very bad practice cause it just leads to data duplication a better way is to create another controller where we can acess all the applications of a student related to the job but whatever
        //Not doing this cause i am not dumb 
        res.status(200).json({
            message:"Application created successfully",
            sucess:true
        })



    }catch(error){
        res.status(500).json({
            message:error.message,
            sucess:false
        })
   }


}

// For student section
export const getJobAppliedByUser = async (req, res) => {

    try{

        const student_id = req.id;

        if(!student_id){
            res.status(400).json({
                message:"student_id is required",
                sucess:false
            })
        }

        const applications = await Application.find({applicant:student_id}).sort({createdAt:-1}).populate({
            path: "job",
            populate: {
                path: "company",
            }
        });;

        if(applications.length == 0){
            return res.status(404).json({
                message:"No applications found",
                sucess:false
            })
        }
        
        

        res.status(200).json({
            message:"Applications found",
            success: true,
            applications // Return the populated jobs
          });
        
        

    }catch(error){
        res.status(500).json({
            message:error.message,
            sucess:false
        })
    }

}

//For recruiter Section 

export const getUserAppliedJob = async (req, res) => {

    try{

        const Job_id = req.params.id;
        

        const applications = await Application.find({job:Job_id}).populate("applicant");

        if(applications.length == 0){
            return res.status(404).json({
                message:"No applications found",
                sucess:false
            })        
        }

      

        res.status(200).json({
            message:"Applications found",
            success: true,
            applications
        })
        
    }catch(error){
        res.status(500).json({
            message:error.message,
            sucess:false
        })
    }


}

export const updateStatus = async (req, res) => {

    try{

        const applicationId = req.params.id;
        const {status} = req.body;

        if(!status){
            return res.status(400).json({
                message:"status is required",
                sucess:false
            })
        }
       
        
        const application = await Application.findById(applicationId);

        if(!application){
            return res.status(404).json({
                message:"Application not found",
                sucess:false
            })
        }

        application.status = status;

        await application.save();

        return res.status(200).json({
            message:"Application status updated successfully",
            success: true,
            application
        })

    }catch(error){
        res.status(500).json({
            message:error.message,
            sucess:false
        })
    }


}

export const isApplied  = async (req, res) => {

    const student_id = req.id;
    const job_id = req.params.id;

    if(!student_id){
        res.status(400).json({
            message:"student_id is required",
            sucess:false
        })
    }
    if(!job_id){
        res.status(400).json({
            message:"job_id is required",
            sucess:false
        })
    }

    const application = await Application.findOne({job:job_id,applicant:student_id});

    if(application){
        res.status(200).json({
            message:"You have already applied for this job",
            sucess:true,
        })
    }else{
        res.status(200).json({
            message:"You have not applied for this job",
            sucess:false,
        })
    }
}