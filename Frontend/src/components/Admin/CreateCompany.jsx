import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import axios from 'axios'

function CreateCompany() {
    const [companyName, setCompanyName] = useState("")
    const navigate = useNavigate()

   async  function registerNewCompany() {
       
        try{
        
            const response = await axios.post("http://localhost:4000/api/v1/company/register",{name:companyName}, {
              withCredentials: true,
          })
            console.log(response)
            toast.success(response.data.message)
            navigate(`/admin/companies/${response.data.company._id}`)
          }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
          }
    
}

  return (
    <>
    <Navbar/>
    <div className='max-w-4xl mx-auto'>
        <div className='mt-10'>
            <h1 className='font-bold text-2xl my-2'>Your Company Name</h1>
            <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
        </div>

                <p className='font-semibold mt-6'>Company Name</p>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="JobHunt, Microsoft etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                    value={companyName}
                    
                />
                <div className='flex items-center gap-2 mt-8'>
                    <Link><Button className="cursor-pointer" variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button></Link>
                    <Button className="cursor-pointer" disabled={!companyName} onClick={registerNewCompany}>Continue</Button>
                </div>
    </div>
    </>
  )
}

export default CreateCompany