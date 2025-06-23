import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const PopularProducts = ({AddToCart}) => {
    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
        const fetchPopularProduct = async () => {
          try {
            const res = await axios(`https://dummyjson.com/products`);
            setPopularProducts(res.data.products);
            console.log(popularProducts)
          } catch (err) {
            toast.error(err.message)
          }
          
        }
    
        fetchPopularProduct();
    
      },[])

    

  return (
    <>
      <div>
        <div className='mt-10 text-center'>
            <h2 className='text-4xl font-semibold'>Popular Products</h2>
        </div>
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {
                        popularProducts.slice(0, 4).map((popularItem) => (
                            <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={popularItem.id}>
                                <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={popularItem.thumbnail} />
                                </a>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{popularItem.category}</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">{popularItem.title}</h2>
                                    <p className="mt-1 text-[20px] font-semibold">Rs. {popularItem.price}</p>
                                    <button onClick={() => AddToCart(popularItem)} className="text-white bg-indigo-500 border-0 py-1 px-1 md:px-3 focus:outline-none hover:bg-indigo-600 rounded mt-2">Add to Cart</button>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
      </div>
    </>
  )
}

export default PopularProducts
