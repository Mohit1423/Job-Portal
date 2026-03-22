import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
function EditCompany() {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const params = useParams();
  const companyId = params.id;
  const [company,setCompany] = useState({});

  useEffect(() => {
    const getCompanyData = async () => {
    try{

      const response = await axios.get(`http://localhost:4000/api/v1/company/get/${companyId}`,{
          withCredentials: true,
      })
      setCompany(response.data.company)
      }catch(error){
          console.log(error)
      }
      }
      getCompanyData();
  },[])

  

  async function Submit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try{
      const response = await axios.post(`http://localhost:4000/api/v1/company/update/${companyId}`,data, {
        headers: { 'Content-Type': "multipart/form-data" },
        withCredentials: true,
    })
    
      toast.success(response.data.message)
      navigate('/admin/companies')
    }catch(error){
      
      toast.error(error.response.data.message)
    }finally{
      setLoading(false);
    }
  }
  return (
    <>
        <Navbar/>
        <div className="w-[50%] mx-auto mt-10 p-8 py-12 border-1 border-gray-200 bg-white rounded-lg shadow-lg relative">
            <div className=" mb-10 w-full">
              <button onClick={() => navigate(-1)} className="mr-2 flex items-center gap-2 absolute top-6 left-6 cursor-pointer ">
                <ArrowLeft className="h-6 w-6" />
                <p>Back</p>
              </button>
            <h2 className=" ml-5 text-2xl font-bold flex w-full justify-center">Company Setup</h2>
        </div>

      <form onSubmit={Submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className='flex gap-2 flex-col'>
            <Label htmlFor="companyName" >Company Name</Label>
            <Input defaultValue={company.name} name="name" id="companyName" placeholder="Microsoft" />
          </div>
          <div className='flex gap-2 flex-col'>
            <Label htmlFor="description">Description</Label>
            <Input defaultValue={company.description} name="description" id="description" placeholder="Enter company description" />
          </div>
          <div className='flex gap-2 flex-col'>
            <Label htmlFor="website">Website</Label>
            <Input defaultValue={company.website} name="website" id="website" placeholder="https://example.com" />
          </div>
          <div className='flex gap-2 flex-col'>
            <Label htmlFor="location">Location</Label>
            <Input defaultValue={company.location} name="location" id="location" placeholder="Enter location" />
          </div>
          <div className=" flex gap-2 flex-col col-span-2">
            <Label htmlFor="logo">Logo</Label>
            <Input name="file" id="logo" accept="image/*" type="file" />
          </div>
        </div>

        <div className="mt-6">
        { loading ?
          <Button onClick={(e)=> e.preventDefault()} className=" w-full opacity-100" >
              <Loader2 className="animate-spin" />
                    Please wait
          </Button>
              :
          <Button type="submit"  className="w-full cursor-pointer">
            Update
          </Button>
        }
        </div>
      </form>
    </div>
    </>
  )
}

export default EditCompany