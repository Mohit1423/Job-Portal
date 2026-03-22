import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios';
import {Table,TableHeader,TableBody,TableFooter,TableHead,TableRow,TableCell,TableCaption,} from "../ui/table.jsx"
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover.jsx'
import { Edit2, Ellipsis } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
function Companies() {
    const [Usercompanies,setUserCompanies] = useState([]);
    const [Search,setSearch] = useState('');
    const navigate = useNavigate();
    let companies=[];
    useEffect(()=>{
        const getCompanies = async () => {
            try{
            const response = await axios.get(`http://localhost:4000/api/v1/company/get`,{
                withCredentials: true,
            })
            setUserCompanies(response.data.companies)
            }catch(error){
                console.log(error)
            }
            }
            getCompanies();
    },[])
   
    if(Usercompanies){
      companies =  Usercompanies.filter((company)=> company.name.toLowerCase().includes(Search.toLowerCase()))
    }
    
  return (
    <>
      <Navbar />
      <div className="mt-10 px-18">
        <div className="flex justify-between">
        <Input value={Search} onChange={(e)=> setSearch(e.target.value)} className="w-[20%] border-gray-200" placeholder="Filter by name"/>
          <Link to ="/admin/companies/create"><Button className="px-4 py-2 cursor-pointer">New Company</Button></Link>
        </div>
        <div className='mt-5'>
          <Table className="border-1 border-gray-200" >
            <TableCaption>A list of your recent registered companies.</TableCaption>
            <TableHeader className="bg-gray-100">
              <TableRow className="border-gray-200">
              
                <TableHead className="py-4 px-6">Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="px-6">Date</TableHead>
                <TableHead className="text-right"><p className='mr-3'>Action</p></TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>

              { companies.length == 0 ? 

               <TableRow>
                    <TableCell colSpan={4} className="py-4" ><p className='flex justify-center font-semibold'>No Companies found</p></TableCell>
               </TableRow>
                            :
                companies.map((company,index) => (
                <TableRow className="border-gray-200" key={index}>
                    <TableCell className="py-2">
                        <img className='h-12 w-12 mx-2 rounded-md border-1 border-gray-300 ' src={company?.logo} alt="" />
                    </TableCell>
                    <TableCell >{company?.name}</TableCell>
                    <TableCell >{ new Date(company?.createdAt).toLocaleDateString('en-GB').split('/').join('-')}</TableCell>
                    <TableCell className="text-right">
                        <Popover >
                            <PopoverTrigger>
                                <Ellipsis className='mr-4 cursor-pointer' />
                            </PopoverTrigger>
                            <PopoverContent className="w-32">
                                <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                    <Edit2 className='w-4' />
                                    <span>Edit</span>
                                </div>
                            </PopoverContent>
                                
                        </Popover>
                    </TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Companies