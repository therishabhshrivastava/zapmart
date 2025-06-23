import React from 'react';
import galImage1 from '../../assets/gallery/gallery1.jpg';
import galImage2 from '../../assets/gallery/gallery2.gif';
import galImage3 from '../../assets/gallery/gallery3.png';
import galImage4 from '../../assets/gallery/gallery4.jpg';
import galImage5 from '../../assets/gallery/gallery5.png';
import galImage6 from '../../assets/gallery/gallery6.png';

const Gallery = () => {
  return (
    <>
        <div className='mt-10 text-center'>
            <h2 className='text-4xl font-semibold'>Gallery</h2>
        </div>
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-20 mx-auto flex flex-wrap">
                <div className="flex flex-wrap md:-m-2 -m-1">
                    <div className="flex flex-wrap w-1/2 hover:scale-75 hover:translate-x-4 hover:skew-y-3 transtion duration-500">
                        <div className="md:p-2 p-1 w-1/2">
                        <img alt="gallery" className="w-full object-cover h-full object-center block" src={galImage1} />
                        </div>
                        <div className="md:p-2 p-1 w-1/2">
                        <img alt="gallery" className="w-full object-cover h-full object-center block" src={galImage2} />
                        </div>
                        <div className="md:p-2 p-1 w-full">
                        <img alt="gallery" className="w-full h-full object-cover object-center block" src={galImage3} />
                        </div>
                    </div>
                    <div className="flex flex-wrap w-1/2 hover:scale-75 hover:translate-x-4 hover:skew-x-3 transtion duration-500">
                        <div className="md:p-2 p-1 w-full">
                        <img alt="gallery" className="w-full h-full object-cover object-center block" src={galImage4} />
                        </div>
                        <div className="md:p-2 p-1 w-1/2">
                        <img alt="gallery" className="w-full object-cover h-full object-center block" src={galImage5} />
                        </div>
                        <div className="md:p-2 p-1 w-1/2">
                        <img alt="gallery" className="w-full object-cover h-full object-center block" src={galImage6} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Gallery
