import Job from "../models/job.model.js";

export const post_job = async (req, res) => {

    try {
        const {title,description,requirments,Salary,location,jobType,experience,position,company_id} = req.body;
        const userId = req.id;

        if(!title || !description || !requirments || !Salary || !location || !jobType || !experience || !position || !company_id){
            return res.status(400).json({
                message:"Please fill all the fields",
                sucess:false
            });
        }
        
        const job = await Job.create({
            title,
            description,
            requirments:requirments.split(","),
            Salary:Number(Salary),
            location,
            jobType,
            experience,
            position,
            created_by:userId,
            company:company_id
        })

        res.status(200).json({
            message:"Job posted successfully",
            job,
            sucess:true
        })

    } catch (error) {
        res.status(500).json({
            message:error.message,
            sucess:false
        })
    }
};

export const getAllJobs = async (req, res) => {

    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }
        const Jobs = await Job.find(query).populate("company").sort({ createdAt: -1 });

        // if(Jobs.length == 0){
        //     return res.status(404).json({
        //         message:"No jobs found",
        //         success:false
        //     });
        // }

        res.status(200).json({
            message:"Jobs found",
            jobs:Jobs,
            success:true
        })
    }catch(error){
        res.status(500).json({
            message:error.message,
            success:false
        })
    }

}

export const getJobByID = async (req, res) => {
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate("company");
        
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                sucess:false
            });
        }

        res.status(200).json({
            message:"Job found",
            job,
            sucess:true
        })
    }catch(error){
        res.status(500).json({
            message:error.message,
            sucess:false
        })
    }


}

export const getJobsByUser = async (req, res) => {
    try{
        const userId = req.id;
        const jobs = await Job.find({created_by:userId}).populate("company");    

        if(jobs.length == 0){
            return res.status(404).json({
                message:"No jobs found",
                sucess:false
            });
        }

        res.status(200).json({
            message:"Jobs found",
            jobs,
            sucess:true
        })
    }catch(error){
        res.status(500).json({
            message:error.message,
            sucess:false
        })
    }

}

