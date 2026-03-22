import { useEffect } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { setSingleJob } from "../redux/jobsSlice";
function useGetJobById(id) {
    const dispatch = useDispatch();
    useEffect(  () => {
      const fetchAllJobs = async () => {
  
      try{
          const response = await axios.get(`http://localhost:4000/api/v1/job/get/${id}`,{withCredentials:true})
          if(response.data.sucess){
              dispatch(setSingleJob(response.data.job));
          }
      }catch(error){
          console.log(error)
      }}
  
      fetchAllJobs();
    },[id])
    
}



export default useGetJobById