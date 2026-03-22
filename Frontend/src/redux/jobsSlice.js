import { createSlice } from "@reduxjs/toolkit";
import { Search } from "lucide-react";


const jobsSlice = createSlice({
    name: "jobs",
    initialState: {
        allJobs:null,
        singleJob:null, 
        filter:{
            Location: "",
            Industry: "",
            Salary: "",
    
        },
    },
    reducers:{
        //actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        
        setSingleJob: (state,action) =>{
            state.singleJob = action.payload
        },
        setFilter: (state,action) => {
            state.filter = action.payload
        },

       

    }
}

)

export const {setAllJobs,setSingleJob,setFilter} = jobsSlice.actions
export default jobsSlice.reducer