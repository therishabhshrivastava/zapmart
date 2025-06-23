import React from 'react';
import { FaFacebook, FaInstagramSquare, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div>
      <footer className="bg-black text-white">
        <div className="container px-5 py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">

          <div className="w-64 md:mx-0 mx-auto text-center md:text-left">
            <h3 className="font-bold text-2xl">Zap<span className='text-red-500'>Mart</span></h3>         
          </div>

          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center"> 

            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium tracking-widest text-lg mb-3">MENU</h2>
              <ul className="list-none mb-10">
                <li>Features</li>
                <li className="mt-1">Information</li>
                <li className="mt-1">News</li>
                <li className="mt-1">Login</li>
              </ul>
            </div>

            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium tracking-widest text-lg mb-3">COMPANY</h2>
              <ul className="list-none mb-10">
                <li className="mt-1">About Us</li>
                <li className="mt-1">Privacy Policy</li>
                <li className="mt-1">Terms & Condition</li>
              </ul>
            </div>

            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium tracking-widest text-lg mb-3">CONTACT</h2>
              <ul className="list-none mb-10">
                <li>Features</li>
                <li className="mt-1">Contact Sales</li>
                <li className="mt-1">+91 6542189462</li>
                <li className="mt-1">help@zapmart.com</li>
              </ul>
            </div>

            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium tracking-widest text-lg mb-3">TECH SUPPORT</h2>
              <ul className="list-none mb-10">
                <li className="mt-1">Information</li>
                <li className="mt-1">tech@zapmart.com</li>
                <li className="mt-1">Contact Manager</li>
              </ul>
            </div>


          </div>

        </div>

        <div className="bg-red-500 text-white">
          <div className="container mx-auto py-1 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-sm text-center sm:text-left">
              ©2024 ZapMart -<span>@copyright</span>
            </p>
            <p className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <FaFacebook className="mr-2" size={25} />
              <FaInstagramSquare className="mr-2" size={25} />
              <FaTwitter className="mr-2" size={25} />
            </p>
          </div>

        </div>
      </footer>
    </div>
  )
}

export default Footer
