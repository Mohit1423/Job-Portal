import React, { useEffect } from 'react'
import axios from 'axios'
import {Badge} from './ui/badge'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
function LatestJobs() {
  
  
  const jobs = useSelector(state => state.job.allJobs);
  
  
  
  return (
    <div className='w-full mt-16'>
      <p className='text-3xl font-bold'><span className='text-[#6A38C2]'>Latest and Top</span> Job Openings</p>
      <div className='grid grid-cols-3 gap-5 grid-rows-2 overflow-hidden my-5 p-4'>
      { jobs?.length == 0 ?

        <h1>No jobs found</h1>
              :
        jobs?.slice(0,6).map((Job,index)=>{
         return( 
          <Link to={`/description/${Job?._id}`} key={index}>
          <div  className='p-5  rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:scale-102'>
          
              <div>
                <h1 className='font-medium text-lg'>{Job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{Job?.location}</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{Job?.title}</h1>
                <p className='text-sm text-gray-600'>{Job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{Job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{Job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost"> {Job?.Salary} LPA</Badge>
            </div>
          </div>
          </Link>
          
         
         
         )
        })
      }
            
      </div>
    </div>
  )
}

export default LatestJobs