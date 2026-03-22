import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
function CategoryCarousel() {
  const array = ["Frontend Developer","Backend Developer","Data Engineer","Data Science ","Graphic Designer","UI Developer"]

  return (
    <div className='mt-12 flex justify-center w-[50%] mx-auto'>
      <Carousel className="w-full ">
      <CarouselContent className="-ml-1">
          {array.map((data,index)=>{
            return(
            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
              <div className='flex justify-center items-center'>
                <Link to={`/browse/${data}`}><Button variant={"outline"} className='border-gray-300 cursor-pointer font-medium border-1 px-4 py-2 rounded-full'>{data}</Button></Link>
              </div>
            </CarouselItem>
            )
          })}
      </CarouselContent>
      <CarouselPrevious className="cursor-pointer" />
      <CarouselNext className="cursor-pointer" />
    </Carousel>
    </div>
  )
}

export default CategoryCarousel