import { useEffect } from "react";
import axios from "axios";
import {setAllJobs} from "../redux/jobsSlice"
import { useDispatch } from "react-redux";

function useGetAllJobs(keyword = "") {
 const dispatch = useDispatch();
 
  useEffect(  () => {
    const fetchAllJobs = async () => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/job/get`,{withCredentials:true})
        if(response.data.success){
            
            dispatch(setAllJobs(response.data.jobs));
        }
    }catch(error){
        console.log(error)
    }}

    fetchAllJobs();
  },[])

}


export default useGetAllJobs

