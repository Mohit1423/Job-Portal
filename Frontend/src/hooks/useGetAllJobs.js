import { useEffect } from "react";
import axios from "axios";
import {setAllJobs} from "../redux/jobsSlice"
import { useDispatch } from "react-redux";

function useGetAllJobs(keyword = "") {
 const dispatch = useDispatch();
 
  useEffect(  () => {
    const fetchAllJobs = async () => {
    try{
        const response = await axios.get("http://localhost:4000/api/v1/job/get",{withCredentials:true})
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

