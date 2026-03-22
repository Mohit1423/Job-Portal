import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
function CreateJobs() {
    const [Usercompanies,setUserCompanies] = useState([]);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        const getCompanies = async () => {
            try{
            const response = await axios.get(`http://localhost:4000/api/v1/company/get`,{
                withCredentials: true,
            })
            if(response.data.companies.length == 0){
                console.log("hello")
                toast.error("No companies found ! Cannot Create Job Without Registering Company First");
                navigate("/admin/companies");
            }else{

                setUserCompanies(response.data.companies)
            }
            }catch(error){
                console.log(error)
            }
            }
            getCompanies();
            

    },[])

   

    const SubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data)
        try{
            const response = await axios.post(`http://localhost:4000/api/v1/job/post`,data, {
              withCredentials: true,
          })
          
            toast.success(response.data.message)
            navigate('/admin/Jobs')
          }catch(error){
            
            toast.error(error.response.data.message)
          }finally{
            setLoading(false);
          }
        
    }
    
  return (
    <>
    <Navbar />
    <form onSubmit={SubmitHandler}>

        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium">Title</label>
                <Input name="title" placeholder="Enter job title" />
            </div>
            <div>
                <label className="block text-sm font-medium">Description</label>
                <Input name="description" placeholder="Enter job description" />
            </div>
            <div>
                <label className="block text-sm font-medium">Requirements</label>
                <Input name="requirments" placeholder="Enter job requirements" />
            </div>
            <div>
                <label className="block text-sm font-medium">Salary (in LPA)</label>
                <Input name="Salary" placeholder="Enter salary" type="number" min="0"  />
            </div>
            <div>
                <label className="block text-sm font-medium">Location</label>
                <Input name ="location" placeholder="Enter job location" />
            </div>
            <div>
                <label className="block text-sm font-medium">Job Type</label>
                <Input name="jobType" placeholder="Enter job type" />
            </div>
            <div>
                <label className="block text-sm font-medium">Experience Level (in years)</label>
                <Input name="experience" placeholder="Enter experience level" type="number" />
            </div>
            <div>
                <label className="block text-sm font-medium">No of Positions</label>
                <Input name="position" placeholder="Enter number of positions" type="number" defaultValue={0} min="0"  />
            </div>
        </div>
        <div className="mt-4">
            <label className="block text-sm font-medium">Select a Company</label>
            <Select name="company_id">
            <SelectTrigger>
                <SelectValue placeholder="Select a Company" />
            </SelectTrigger>
            <SelectContent >
              {Usercompanies.map((company) => (
                <SelectItem key={company._id} value={company._id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
            </Select>
        </div>

        <Button type="submit" className="w-full mt-4 bg-black cursor-pointer text-white">Post New Job</Button>
        </div>
    </form>
    </>
  )
}

export default CreateJobs