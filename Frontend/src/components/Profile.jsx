import React, { use, useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar,AvatarImage,AvatarFallback } from './ui/avatar'
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import AppliedJobs from './AppliedJobs';
import UpdateProfileDialog from './UpdateProfileDialog';
function Profile() {
    const [open,setOpen] = useState(false)
    const user = useSelector(state => state.auth.user);
    const isResume = user?.profile?.resume ? true : false;
  return (
    <>
        <Navbar />
        <div className='mt-10 w-[70%] mx-auto '>
            <div className=' p-8 border-1 border-gray-200 rounded-lg '>
                <div className='flex justify-between'>
                    <div className='flex items-center'>
                        <Avatar className=" cursor-pointer size-22">
                            <AvatarImage src={user?.profile?.profilePhoto} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col ml-4'>
                            <p className='font-medium text-xl'>{user? user.fullname : "Name"  }</p>
                            <p>{user?.profile?.bio ? user?.profile?.bio : "No bio"}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant="outline" className="cursor-pointer px-4 py-4">
                        <Pen className='size-6' />
                    </Button>
                </div>
                <div className='mt-5 flex flex-col gap-1'>
                    <div className='flex gap-4 items-center'>
                        <Mail className="size-4" />
                        <p>{user? user.email : "Email"}</p>
                    </div>

                    <div className='flex gap-4 items-center'>
                        <Contact className="size-4" />
                        <p>{user? user.phoneNumber :"Phone Number"}</p>
                    </div>
                </div>
                <div className='mt-5'>
                    <h1 className='text-md font-bold'>Skills</h1>
                    <div className='flex gap-2 mt-2'>
                            {
                                user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} className="rounded-full px-3 flex items-center justify-center ">{item}</Badge>) : <span>NA</span>
                            }
                    </div>
                </div>
                <div className='mt-5'>
                    <h1 className='text-md font-bold mb-1'>Resume</h1>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer '>{user?.profile?.resumeOriginalName}</a> : <span className=''>Not Uploaded</span>
                    }
                </div>


            </div>

            <div className='mt-12 '>
                    <h1 className='font-bold text-xl ml-5 mb-5'>Applied Jobs</h1>
                    <AppliedJobs  />
            </div>
            {
                open && <UpdateProfileDialog setOpen={setOpen} /> 
            }

        </div>
    </>
  )
}

export default Profile