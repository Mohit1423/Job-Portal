import React from 'react'
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setFilter } from '../redux/jobsSlice'
function FilterJobs() {
    const fitlerData = [
        {
            fitlerType: "Location",
            array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
        },
        {
            fitlerType: "Industry",
            array: ["Frontend Developer", "Backend Developer", "Graphic Designer"]
        },
        {
            fitlerType: "Salary",
            array: ["0 to 10L", "10L to 30L", "30L to 70L"]
        },
    ]
    const dispatch = useDispatch();
    let filter = useSelector(state => state.job.filter);

    function ClickHandler(e){
        
        filter = {...filter, [e.target.name]: e.target.value}
        dispatch(setFilter(filter));
    }

  return (
    <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3 mb-3' />
            <RadioGroup >
                {
                    fitlerData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            <div className="flex flex-col mb-3 mt-3 ">
                            {
                                data.array.map((item, index) => {
                                    
                                    return (
                                        <label  key={index} className="flex items-center cursor-pointer  space-x-2">
                                            <input
                                                onClick={ClickHandler}
                                                name={data.fitlerType}
                                                type="radio"
                                                value={item}
                                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <span className=" font-semibold">{item}</span>
                                         </label>
                                    )
                                })
                            }
                            </div>
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
  )
}

export default FilterJobs