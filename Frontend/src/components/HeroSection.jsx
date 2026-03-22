import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function HeroSection() {
  const [keyword,setKeyword] = useState(""); 
  const navigate = useNavigate();
  function SearchHandler(){
    navigate(`/browse/${keyword}`)
  }
  return (
   <div className='text-center mt-5'>
        <p className='px-4 py-2 text-[#F83002] bg-gray-100 rounded-full font-medium mb-5 inline'>No. 1 Job Hunt Website</p>
        <p className='mt-10 font-bold text-5xl'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></p>
        <p className='mt-5 font-light'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati ipsam culpa impedit eos exercitationem.<br /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, placeat.</p>
        <div className=' flex w-[50%] mx-auto mt-7 shadow-lg border-1 rounded-full border-gray-200'>
            <input onChange={(e) => setKeyword(e.target.value) } value={keyword} type="text" className='w-full py-2 px-4 rounded-full outline-0' placeholder='Search for jobs' />
            <button onClick={SearchHandler} className='bg-[#6A38C2] text-white py-2 px-4 rounded-full rounded-l-none flex justify-center items-center cursor-pointer'>
              <Search />
            </button>
        </div>
   </div>
  )
}

export default HeroSection