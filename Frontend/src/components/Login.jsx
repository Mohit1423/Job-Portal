import React, { useState } from 'react'
import Navbar from './shared/Navbar.jsx'
import {Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent,} from "./ui/card.jsx";
import { Input } from "./ui/input.jsx";
import { Button, buttonVariants } from "./ui/button.jsx"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser} from '../redux/authSlice.js';
import axios from "axios";
import { toast } from 'sonner';
import { Loader2 } from "lucide-react";

 function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
 
  async function handleSubmit(e){
    setLoading(true)
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
     
    try{
      
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/login`,data,{ withCredentials: true })
      toast.success(response.data.message);
      dispatch(setAuthUser(response.data.user))
      if(response.data.user.role === "recruiter"){
        setTimeout(() => navigate("/admin/companies"), 300);
      }else{
        setTimeout(() => navigate("/"), 300);
      }
        
    }
    catch(error){
      toast.error(error.response.data.message)
    } finally{
      setLoading(false)
     

    }
    
  }
  
  return (
    <>
      <Navbar />
      <div>Login</div>
      <div className="w-[55%] m-auto mt-5">
        <Card className="border-[rgb(0,0,0,0.2)]">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Login</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
            
              <div className="mb-4">
                <p className="mb-2 font-semibold">Email</p>
                <Input name="email"  placeholder="abc@gmail.com"></Input>
              </div>

              <div className="mb-4">
                <p className="mb-2 font-semibold">Password</p>
                <Input name="password" placeholder="Enter a safe password"></Input>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    defaultChecked
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className=" font-semibold">Students</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="t font-semibold">Recruiter</span>
                </label>
              </div>
                { loading ? 
                  <Button onClick={(e)=> e.preventDefault()} className="mt-8 w-full opacity-100" >
                      <Loader2 className="animate-spin" />
                          Please wait
                   </Button>
                      :
                <Button type="submit" className="mt-8 w-full cursor-pointer">Login</Button>

                }

              <p className="mt-5 ">Already have an account? <Link to="/login"><span className="text-blue-400 underline cursor-pointer">Login</span></Link></p>

            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Login  