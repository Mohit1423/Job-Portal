import React, { use, useEffect } from 'react'
import Navbar from './shared/Navbar'
import {Badge} from './ui/badge'
import { Button } from './ui/button'
import { Bookmark } from "lucide-react";
import FilterJobs from './FilterJobs';
import Job from './Job';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setFilter } from '../redux/jobsSlice'
import {motion, AnimatePresence} from "framer-motion";
function Jobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFilter({Location: "", Industry: "", Salary: ""}))
  },[])
  let jobs = useSelector(state => state.job.allJobs);
  const filter = useSelector(state => state.job.filter);
  function Salary_Check(Salary){
    if(filter.Salary == "0 to 10L"){
      return Salary >= 0 && Salary <= 10;
    }else if(filter.Salary == "10L to 30L"){
      return Salary >= 10 && Salary <= 30;
    }else if(filter.Salary == "30L to 70L"){
      return Salary >= 30 && Salary <= 70;
    }
  }
  if(jobs){
    jobs = jobs.filter((job)=> job.title.toLowerCase().includes(filter.Industry.toLowerCase()) && job.location.toLowerCase().includes(filter.Location.toLowerCase()) && (filter.Salary == "" ? true : Salary_Check(job.Salary)))
  }
  return (
    <>
      <Navbar />
      <div className='flex'>
        <div className='w-[25%] bg-gray-100 py-8 px-3'>
            <FilterJobs />
        </div>

            { jobs.length == 0 ? <div className='bg-gray-100 flex-1 h-[88vh] flex justify-center items-center font-semibold text-xl'>No jobs found</div> :

          <div className="p-6 flex-1  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[88vh] overflow-y-auto element bg-gray-100">
          {
              jobs?.map((job, index) => (
                <Link to={`/description/${job._id}`} key={index}>
                  <motion.div
                   initial={{ opacity:0 }}
                   animate={{ opacity:1 }}>
                  <Job job={job} />
                  </motion.div>
                </Link>
            ))
          }
          </div>
            }
    </div>
    </>
  );
}

export default Jobs