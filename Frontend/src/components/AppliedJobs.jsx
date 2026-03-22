import React, { useEffect, useState } from "react";
import {Table,TableHeader,TableBody,TableFooter,TableHead,TableRow,TableCell,TableCaption,} from "../components/ui/table.jsx"
import { Badge } from "./ui/badge.jsx";
import axios from "axios";

function AppliedJobs(props) {
  const [application,setApplication] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
    try{
    const response = await axios.get(`http://localhost:4000/api/v1/application/getJobs`,{
        withCredentials: true,
    })
    console.log(response.data)
    setApplication(response.data.applications)
    
    }catch(error){
        console.log(error)
    }
    }
    fetchAppliedJobs();
    
 },[])

    

  return (
    <Table className="border-1 border-gray-300 ">
      <TableCaption className="mb-5">A list of your applied jobs</TableCaption>
      <TableHeader className="bg-gray-100 ">
        <TableRow className="border-gray-300">
          <TableHead className="py-4">Date</TableHead>
          <TableHead>Job Role</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
            application?.length <= 0 ? <span>You haven't applied any job yet.</span> :  application?.map((item,index)=>{
                return(
                <TableRow className="border-gray-300" key={index} >
                    <TableCell className="py-4">{new Date(item?.createdAt).toLocaleDateString('en-GB').split('/').join('-')}</TableCell>
                    <TableCell>{item.job?.title}</TableCell>
                    <TableCell>{item.job?.company?.name}</TableCell>
                    <TableCell className="text-right"><Badge className={`${item?.status === "rejected" ? 'bg-red-400' : item.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'} rounded-full px-3`}>{item.status.toUpperCase()}</Badge></TableCell>
                </TableRow>)
            })
        }
      </TableBody>
    </Table>
  )
}

export default AppliedJobs;
