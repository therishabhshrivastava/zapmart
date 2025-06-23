import React from 'react';
import Banner from '../../assets/banner.png'

const HeroSection = () => {
  return (
    <div className='relative'>
      <div>
        <img src={Banner}
        alt="" 
        className='w-full bg-gray-50 object-cover object-center'
         />
      </div>
      <div className='absolute top-[30%] left-[50%]'>
        <h1 className='text-1xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-red-500'>
            Discover Your Next Adventure!
        </h1>
        <p className='text-[10px] lg:text-2xl mt-2 lg:mt-5 font-semibold'>
            Shop Our Latest Arrival & Unleash Your Style
        </p>
      </div>
    </div>
  )
}

export default HeroSection
