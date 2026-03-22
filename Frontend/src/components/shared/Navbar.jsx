import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar.jsx'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover.jsx'
import { Button, buttonVariants } from "../ui/button.jsx"
import { LogOut, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { setAuthUser } from '../../redux/authSlice.js'
function Navbar() {
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

   async function Logout(){
        try{
            const response = await axios.get(`http://localhost:4000/api/v1/user/logout`,{
              withCredentials: true,
          })
            toast.success(response.data.message)
            navigate("/")
            dispatch(setAuthUser(null));
          }catch(error){
            toast.error(error.response.data.message)
          }finally{
              console.log("hello")
        }
    }
  return (
    <div className="flex items-center justify-between h-[10%] bg-white ">
        <p className="text-2xl font-bold">Job<span className='text-[#EB321C]'>Hunt</span></p>
        <div className='flex gap-5 items-center font-medium'>
        {               user ?
              user.role == "student" ? 
            <>
                <Link to="/"><p>Home</p></Link>
                <Link to="/Jobs"><p>Jobs</p></Link>
                <Link to="/Browse"><p>Browse</p></Link>
            </> 
                            :
            <>
                <Link to="/admin/companies"><p>Companies</p></Link>
                <Link to="/admin/Jobs"><p>Jobs</p></Link>
            </>
                            :
            <>
                <Link to="/"><p>Home</p></Link>
                <Link to="/Jobs"><p>Jobs</p></Link>
                <Link to="/Browse"><p>Browse</p></Link>
            </> 

        }
            
            { user ?
            <Popover >
                <PopoverTrigger>
                    <Avatar className="ml-5 cursor-pointer size-10">
                        <AvatarImage src={user.profile.profilePhoto} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                    <div className='flex flex-col w-full items-start '>
                        <div className='flex justify-start gap-3 w-full items-center mb-2 '>
                            <Avatar className=" cursor-pointer size-10">
                                <AvatarImage src={user.profile.profilePhoto} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <p className=''>{user.fullname}</p>
                                <p className='text-sm font-light'>{user.profile.bio ? user.profile.bio : "No bio"}</p>
                            </div>
                        </div>
                        <Link className='w-full' to="/profile">
                        <Button className="font-light w-full border-0 px-2 cursor-pointer " variant="outline">
                            <div className='flex gap-2 items-center justify-start w-full h-full'>
                                <User className='size-5' />
                                <p>View Profile</p>
                            </div>
                        </Button>
                        </Link>
                        <Button onClick={Logout}  className="font-light w-full border-0 px-2 cursor-pointer" variant="outline">
                            <div className='flex gap-2 items-center justify-start w-full h-full'>
                                <LogOut className='size-5' />
                                <p>Logout</p>
                            </div>
                        </Button>
                    </div>

                </PopoverContent>
            </Popover> :
            <div className='flex gap-2 ml-5'>
            <Link to="/login"><Button className="cursor-pointer m-0" variant="outline">Login</Button></Link>
            <Link to="/signup"><Button className="bg-[#6a38c2] hover:bg-[#5B30A6] cursor-pointer m-0" >Signup</Button></Link>
            </div>
            }
        </div>

    </div>
  )
}

export default Navbar