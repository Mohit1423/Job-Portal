import React, { useState } from "react";
import Navbar from "./shared/Navbar.jsx";
import {Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent,} from "./ui/card.jsx";
import { Input } from "./ui/input.jsx";
import { Button, buttonVariants } from "./ui/button.jsx"
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'sonner';

import axios from "axios"
import { useDispatch, useSelector } from "react-redux";

import { Loader2 } from "lucide-react";

function SignUp() {
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const [loading,setLoading] = useState(false);

     async function handleSubmit(e){
       e.preventDefault();
       setLoading(true);
       const formData = new FormData(e.target);
       const data = Object.fromEntries(formData.entries());
       
       console.log(data);
        try{
          const response = await axios.post("http://localhost:4000/api/v1/user/register",data, {
            headers: { 'Content-Type': "multipart/form-data" },
            withCredentials: true,
        })
          toast.success(response.data.message)
          navigate("/login")
        }catch(error){
          toast.error(error.response.data.message)
        }finally{
          setLoading(false);
        }
        
      }
      

  return (
    <>
      <Navbar />
      
      <div className="w-[55%] m-auto mt-5">
        <Card className="border-[rgb(0,0,0,0.2)]">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Sign Up</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}  >
              <div className="mb-4">
                <p className="mb-2 font-semibold">Full Name</p>
                <Input name="fullname" placeholder="Full Name"></Input>
              </div>

              <div className="mb-4">
                <p className="mb-2 font-semibold">Email</p>
                <Input name="email" placeholder="abc@gmail.com"></Input>
              </div>

              <div className="mb-4">
                <p className="mb-2 font-semibold">Phone Number</p>
                <Input name="phoneNumber" placeholder="+9199000000"></Input>
              </div>

              <div className="mb-4">
                <p className="mb-2 font-semibold">Password</p>
                <Input name ="password" placeholder="Enter a safe password"></Input>
              </div>

              <div className="flex justify-between">
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
                <div className="flex items-center space-x-2 ">
                  <label
                    htmlFor="profile"
                    className="font-semibold"
                  >
                    Profile
                  </label>
                  <div className="border-1 border-[#CDCDCD] rounded-lg">
                    <input
                        type="file"
                        id="profile"
                        className="block w-full text-sm text-gray-500 
                                    file:py-2 file:px-2 
                                    file:border-
                                    file:text-sm file:font-semibold
                                    file:
                                    hover:file:bg-gray-100 cursor-pointer"
                        name="file"
                        accept="image/*"
                    />
                  </div>
                </div>
              </div>
              { loading ? 
                  <Button onClick={(e)=> e.preventDefault()} className="mt-8 w-full opacity-100" >
                      <Loader2 className="animate-spin" />
                          Please wait
                   </Button>
                      :
                <Button type="submit" className="mt-8 w-full cursor-pointer">Sign Up</Button>

                }
              <p className="mt-5 ">Already have an account? <Link to="/login"><span className="text-blue-400 underline cursor-pointer">Login</span></Link></p>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default SignUp;
