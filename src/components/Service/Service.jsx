import React from 'react'
import { FaShippingFast } from 'react-icons/fa'
import { MdOutlinePayment, MdProductionQuantityLimits } from 'react-icons/md'
import { TbTruckReturn } from 'react-icons/tb'

const Service = () => {
  return (
    <>
        <div className='container mx-auto px-5 flex pt-20 gap-10 items-center justify-center flex-wrap'>
            <div className='bg-red-500 py-3 px-5 rounded text-white flex gap-2 flex-col items-center w-[220px] hover:scale-110 transition duration-500'>
                <FaShippingFast size={30} />
                <p>FREE SHIPPING</p>
            </div>

            <div className='bg-red-500 py-3 px-5 rounded text-white flex gap-2 flex-col items-center w-[220px] hover:scale-110 transition duration-500'>
                <MdProductionQuantityLimits size={30} />
                <p>AUTHENTIC PRODUCT</p>
            </div>

            <div className='bg-red-500 py-3 px-5 rounded text-white flex gap-2 flex-col items-center w-[220px] hover:scale-110 transition duration-500'>
                <TbTruckReturn size={30} />
                <p>EASY RETURN</p>
            </div>

            <div className='bg-red-500 py-3 px-5 rounded text-white flex gap-2 flex-col items-center w-[220px] hover:scale-110 transition duration-500'>
                <MdOutlinePayment size={30} />
                <p>SECURE PAYMENT</p>
            </div>
        </div>
    </>
  )
}

export default Service
