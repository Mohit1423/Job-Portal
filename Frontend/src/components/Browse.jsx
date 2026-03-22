import React from 'react'
import Navbar from './shared/Navbar.jsx'
import Job from './Job.jsx';
import { useSelector } from 'react-redux';
import useGetAllJobs from '../hooks/useGetAllJobs.js';
import { Link, useParams } from 'react-router-dom';
function Browse() {
    
  
    const keyword = useParams().keyword || "";
    
    let jobs =useSelector(state => state.job.allJobs);
    jobs = jobs?.filter((job) => job.title.toLowerCase().includes(keyword.toLowerCase()));

    
    
    
  return (
    <>
        <Navbar />
        <h1 className='mb-4 mt-5 font-bold text-lg'>Search Results ({jobs?.length})</h1>
        { jobs?.length == 0 ? <div className='bg-gray-100 h-[80vh] flex justify-center items-center font-semibold text-xl'>No jobs found</div> :
        <div className="p-6 flex-1  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[80vh] overflow-y-auto element bg-gray-100">
            { jobs?.map((job, index) => (
                <Link to={`/description/${job._id}`} >
                <Job job={job} key={index} />
                </Link>
            ))}
        </div>
        }
    </>
  )
}

export default Browse