import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Link, useNavigate } from 'react-router-dom';
import {Table,TableHeader,TableBody,TableFooter,TableHead,TableRow,TableCell,TableCaption,} from "../ui/table.jsx"
import { Input } from '../ui/input.jsx';
import { Button } from '../ui/button.jsx';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover.jsx'
import { Ellipsis, Eye } from 'lucide-react';

import axios from 'axios';

function AdminJobs() {
  const [Search,setSearch] = useState('');
  const navigate = useNavigate();
  const [Alljobs,setAllJobs] =useState([]);
  let jobs = [];
  useEffect(()=>{
    const getJobs = async () => {
        try{
        const response = await axios.get(`http://localhost:4000/api/v1/job/getadminJobs`,{
            withCredentials: true,
        })
        setAllJobs(response.data.jobs)
        }catch(error){
            console.log(error)
        }
        }
        getJobs();
},[])

  if(Alljobs){
    jobs = Alljobs.filter((job) => job?.title.toLowerCase().includes(Search.toLowerCase()) || job?.company?.name.toLowerCase().includes(Search.toLowerCase()));
  }

  return (
    <>
    <Navbar />
    <div className="mt-10 px-18">
        <div className="flex justify-between">
        <Input value={Search} onChange={(e)=> setSearch(e.target.value)} className="w-[20%] border-gray-200" placeholder="Filter by name & role"/>
          <Link to ="/admin/jobs/create"><Button className="px-4 py-2 cursor-pointer">New Jobs</Button></Link>
        </div>
        <div className='mt-5'>
          <Table  className="border-1 border-gray-200" >
            <TableCaption>A list of your recent posted jobs.</TableCaption>
            <TableHeader className="bg-gray-100">
              <TableRow className="border-gray-200">
              
                <TableHead className="py-4 px-6">Company Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="px-6">Date</TableHead>
                <TableHead className="text-right"><p className='mr-3'>Action</p></TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>

              { jobs.length == 0 ? 

               <TableRow>
                    <TableCell colSpan={4} className="py-4" ><p className='flex justify-center font-semibold'>No Companies found</p></TableCell>
               </TableRow>
                            :
                jobs.map((job,index) => (
                <TableRow className="border-gray-200" key={index}>
                    <TableCell className="py-2">{job?.company?.name}</TableCell>
                    <TableCell >{job?.title}</TableCell>
                    <TableCell >{ new Date(job?.createdAt).toLocaleDateString('en-GB').split('/').join('-')}</TableCell>
                    <TableCell className="text-right">
                        <Popover >
                            <PopoverTrigger>
                                <Ellipsis className='mr-4 cursor-pointer' />
                            </PopoverTrigger>
                            <PopoverContent className="w-32">
                                <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                  <Eye className="size-4" />
                                  <p onClick={() => navigate(`/admin/jobs/applicants/${job._id}`)}>Applicants</p>
                                </div>
                            </PopoverContent>
                                
                        </Popover>
                    </TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default AdminJobs