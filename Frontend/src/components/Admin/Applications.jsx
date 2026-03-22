import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import {Table,TableHeader,TableBody,TableFooter,TableHead,TableRow,TableCell,TableCaption,} from "../ui/table.jsx"
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover.jsx'
import { Ellipsis, Eye } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

function Applications() {
    const [Applicants,setApplicants] = useState([]);
    const jobs = [1,23,45]
    const params = useParams();
    const jobId = params.id;

    useEffect(() => {
        const fetchApplicants = async () => {
        try{
        const response = await axios.get(`http://localhost:4000/api/v1/application/getUsers/${jobId}`,{
            withCredentials: true,
        })
        setApplicants(response.data.applications)
        }catch(error){
            console.log(error)
        }
        }
        fetchApplicants();
        
     },[])

     const handleStatus = async (_id,status)=>{
        try{
            const response = await axios.post(`http://localhost:4000/api/v1/application/updateStatus/${_id}`,{status}, {
              withCredentials: true,
          })
          
            toast.success(response.data.message)
         
          }catch(error){
            
            toast.error(error.response.data.message)
          }finally{
          }
     }
    
  return (
    <>
      <Navbar />
      <div className="mt-6">
        <p className="font-semibold text-xl">Applications ({})</p>
        <div className="mt-5">
          <Table className="border-1 border-gray-200">
            <TableCaption>A list of your recent posted jobs.</TableCaption>
            <TableHeader className="bg-gray-100">
              <TableRow className="border-gray-200">
                <TableHead > Full Name</TableHead>
                <TableHead className="w-[250px]">Email</TableHead>
                <TableHead >Contact</TableHead>
                <TableHead >Resume </TableHead>
                <TableHead >Date</TableHead>
                <TableHead className="text-right">Action</TableHead> 
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.length == 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-4">
                    <p className="flex justify-center font-semibold">
                      No Companies found
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                Applicants.map(({applicant,_id}, index) => (
                  <TableRow className="border-gray-200" key={index}>
                    <TableCell className="py-2">{applicant?.fullname}</TableCell>
                    <TableCell>{applicant?.email}</TableCell>
                    <TableCell> {applicant?.phoneNumber}</TableCell>               
        
                    <TableCell><a target="blank" href={applicant?.profile?.resume} className='text-blue-600'>{applicant?.profile?.resumeOriginalName}</a></TableCell>
                    <TableCell>{new Date(applicant?.createdAt).toLocaleDateString('en-GB').split('/').join('-')}</TableCell>
                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger>
                          <Ellipsis className="mr-4 cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent className="w-32">
                         <div className='flex flex-col '>
                            <p className="hover:bg-gray-100 cursor-pointer text-center p-1" onClick={() => handleStatus(_id,"accepted")}>Accepted</p>
                            <p className="hover:bg-gray-100 cursor-pointer text-center p-1" onClick={() => handleStatus(_id,"rejected")}>Rejected</p>
                         </div>

                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Applications