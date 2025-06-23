import React from 'react'
import HeroSection from '../../components/HeroSection/HeroSection'
import Service from '../../components/Service/Service'
import Gallery from '../../components/Gallery/Gallery'
import PopularProducts from '../../components/PopularProducts/PopularProducts'

const Home = ({AddToCart}) => {
  return (
    <>
      <HeroSection />
      <Service />
      <PopularProducts AddToCart={AddToCart} />
      <Gallery />
    </>
  )
}

export default Home
