import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import useGetJobById from '../hooks/useGetJobById';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';


function JobDescription() {
    const dispatch = useDispatch();
    
    const params = useParams()
    const jobId = params.id;
    useGetJobById(jobId);
    const job = useSelector(state => state.job.singleJob)
    const [isApplied,setisApplied] = useState(false);
 

 async function ApplyJob(){
    
    
    try{
      const response = await axios.post(`http://localhost:4000/api/v1/application/applyJob/${jobId}`,{},{
        withCredentials: true,
    })
      setisApplied(true)
      toast.success(response.data.message)
      
    }catch(error){
      toast.error(error.response.data.message)
    }finally{
        console.log("hello")
    }
}


 useEffect(() => {
    const isApplied = async () => {
    try{
    const response = await axios.get(`http://localhost:4000/api/v1/application/isApplied/${jobId}`,{
        withCredentials: true,
    })
    setisApplied(response.data.sucess)
    }catch(error){
        console.log(error)
    }
    }
    isApplied();
    
 }, [])

  
  return (
    <>
        
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{job?.company?.name}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.Salary} LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={ApplyJob}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad] cursor-pointer'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>{job?.title}</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{job?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{job?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{job?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{job?.experience} </span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{job?.Salary} LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>291099130</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{new Date(job?.createdAt).toLocaleDateString('en-GB').split('/').join('-')}</span></h1>
            </div>
        </div>

    </>
  )
}

export default JobDescription