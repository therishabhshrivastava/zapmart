import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const SingleProduct = ({AddToCart}) => {

  const { productId } = useParams();
  const [singleProduct, setSingleProduct] = useState([]);
  
  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const res = await axios(`https://fakestoreapi.com/products/${productId}`);
        setSingleProduct(res.data);
        // console.log(res.data)
      } catch (err) {
        toast.error(err.message)
      }
      
    }

    fetchSingleProduct();

  },[productId])


  const singleProductAddToCart = () => {
    AddToCart(singleProduct);
    toast.success('Product Added')
  }

  const goTOProducts = useNavigate();

  return (
    <>
      <div>
        <div
          className="w-[60%] mx-auto mt-4 mb-[5px]"
          onClick={() => goTOProducts('/products')}
        >
          <p
            className="flex items-center font-semibold text-indigo-600 text-lg mt-10 cursor-pointer" // Added items-center for vertical alignment
            onClick={() => navigate("/products")}
          >
            <svg
              className="fill-current mr-2 text-indigo-600 w-6 h-6" // Arrow size
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971-4.411 40.971-16.971V296z" />
            </svg>
            Back
          </p>
        </div>
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img alt="ecommerce" className="lg:w-1/4 w-1/3  h-45 object-cover object-center rounded" src={singleProduct.image} />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 ml-5">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">{singleProduct.category}</h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{singleProduct.title}</h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                  {singleProduct?.rating ? (
                      <>
                        <span className="text-gray-600 ml-3">{singleProduct.rating.rate}</span>
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 text-indigo-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <span className="text-gray-600 ml-3">{singleProduct.rating.count} Reviews</span>
                      </>
                    ) : (
                      <p>Loading product details...</p>
                    )}

                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a className="text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">{singleProduct.description}</p>
                <span className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></span>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">Rs. {singleProduct.price}</span>
                  <button onClick={singleProductAddToCart} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>      
    </>
  )
}

export default SingleProduct;
