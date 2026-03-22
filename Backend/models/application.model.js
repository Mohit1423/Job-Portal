import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({      //Will create when user apply for a job
    job:{                                          //Will save the job id
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Job',
        required:true
    },
    applicant:{                                  // will save the application id and after that will save the application id in the job so that i can acess the applicant details from the recruiter side also in the user model i will update the company place with the applicant id so i can have the job details he has applied to 
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{                                  
        type:String,
        enum:['pending', 'accepted', 'rejected'],
        default:'pending'
    }
},{timestamps:true});

export default mongoose.model("Application", applicationSchema);