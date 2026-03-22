import React, { useState } from 'react'
import { Input } from './ui/input'
import { useSelector,useDispatch } from 'react-redux';
import { Button } from './ui/button';
import { Ambulance, Loader2 } from 'lucide-react';
import { setAuthUser } from "../redux/authSlice.js";
import { X } from 'lucide-react';
import { toast } from 'sonner';

import axios from 'axios';

 function UpdateProfileDialog(props) {
    const { user } = useSelector(state => state.auth);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/profile/update`,data, {
              headers: { 'Content-Type': "multipart/form-data" },
              withCredentials: true,
          })
            dispatch(setAuthUser(response.data.user))
            toast.success(response.data.message)
          }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
          }finally{
            setLoading(false);
            props.setOpen(false);
          }
        
    }
    return (
        <div onClick={() => props.setOpen(false)} className="fixed flex z-20 items-center px-4 justify-center inset-0 bg-black/80">
        <div onClick={(e) => e.stopPropagation() } className="relative rounded-lg flex flex-col w-[50%] max-w-md h-[65vh] bg-white px-8 py-8 shadow-lg overflow-y-auto element">
            <p className='font-medium text-xl'>Update Profile</p>
            <form className='flex flex-col mt-6 gap-5' onSubmit = {handleSubmit}>
                <X onClick={()=>{props.setOpen(false)}}className='size-5 cursor-pointer absolute top-3 right-3'/>

                <div className='flex justify-center items-center'>
                    <p className='px-3.5 text-sm font-medium'>Name</p>
                    <Input name="fullname" placeholder={user ? user.fullname : "fullname"} defaultValue={user?.fullname && user.fullname} className="w-[100%] border-gray-300" />
                </div>
                <div className='flex justify-center items-center'>
                    <p className='px-4 text-sm font-medium'>Email</p>
                    <Input name="email" placeholder={user ? user.email : "abc@gmail.com"} defaultValue={user?.email && user.email} className="w-[100%] border-gray-300" />
                </div>
                <div className='flex justify-center items-center'>
                    <p className='px-2 text-sm font-medium'>Number</p>
                    <Input name="phoneNumber" placeholder={user ? user.phoneNumber : "900000000"} defaultValue={user?.phoneNumber && user.phoneNumber} className="w-[100%] border-gray-300" />
                </div>
                <div className='flex justify-center items-center'>
                    <p className='px-6 text-sm font-medium'>Bio</p>
                    <Input name="bio" placeholder={ user ? user.profile.bio : "bio"} defaultValue={user?.profile.bio && user.profile.bio} className="w-[100%] border-gray-300" />
                </div>
                <div className='flex justify-center items-center'>
                    <p className='px-4.5 text-sm font-medium'>Skills</p>
                    <Input name="skills" placeholder={ user ? user.profile.skills : "Skills"} defaultValue={user?.profile.skills && user.profile.skills} className="w-[100%] border-gray-300" />
                </div>
                <div className='flex justify-center items-center'>
                    <p className='px-2 text-sm font-medium'>Resume</p>
                    <Input name="file" accept="application/pdf" type="file" className="w-[100%] border-gray-300 cursor-pointer" />
                </div>
                <div className='flex justify-end'>
                { loading ? 
                    <Button onClick={(e)=> e.preventDefault()} className="w-[30%]" >
                    <Loader2 className="animate-spin" />
                          Please wait
                    </Button>
                      :
                    <Button type="submit"  className="w-[30%] cursor-pointer">Update</Button>

                }
                    
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateProfileDialog