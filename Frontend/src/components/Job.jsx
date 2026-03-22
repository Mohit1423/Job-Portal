import React from 'react'
import {Badge} from './ui/badge'
import { Button } from './ui/button'
import { Bookmark } from "lucide-react";
import { Link } from 'react-router-dom';
function Job(props) {
    
    const daysAgoFunction = (mongodbTime) => {
        
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
  return (
    <div className='p-5 mt-2.5   rounded-md shadow-xl bg-white border border-gray-100 hover:scale-102 h-[320px]'>
                <div className='flex justify-between items-center'>
                    <p className='text-sm text-gray-500'>{daysAgoFunction(props?.job?.createdAt) === 0 ? "Today" : daysAgoFunction(props?.job?.createdAt) + " days ago"} </p>
                    <Button variant="outline" className="rounded-full p-2 cursor-pointer bg-gray-100" size="icon large"><Bookmark className='size-6' /></Button>
                </div>
                <div className='flex items-center '>
                    <img className='h-12 w-12 rounded-md border-1 border-gray-300 ' src={props?.job?.company?.logo} alt="" />
                    <div className='m-2'>
                        <h1 className='font-medium text-lg'>{props?.job?.company?.name}</h1>
                        <p className='text-sm text-gray-500'>{props?.job?.location}</p>
                    </div>
                </div>
                <div>
                    <h1 className='font-bold text-lg my-2'>{props?.job?.title}</h1>
                    <p className='text-sm text-gray-600'>{props?.job?.description}</p>
                </div>
                <div className='flex items-center gap-2 mt-4'>
                    <Badge className={'text-blue-700 font-bold'} variant="ghost">{props?.job?.position} Positions</Badge>
                    <Badge className={'text-[#F83002] font-bold'} variant="ghost">{props?.job?.jobType}</Badge>
                    <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{props?.job?.Salary} LPA</Badge>
                </div>
                <div className="flex justify-between items-center w-[65%] mt-5 gap-2">
                <Link to={`/description/${props?.job?._id}`}><Button variant="outline" className="text-sm cursor-pointer">Details</Button></Link>
                <Button className="text-sm bg-[#6A38C2] hover:bg-[#5B30A6] cursor-pointer">Save For Later</Button>
                </div>
            </div>
  )
}

export default Job