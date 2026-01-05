import React from 'react'
import Banner from '../components/Home/Banner'
import Hero from '../components/Home/hero.jsx'
import Features from '../components/Home/Features.jsx'
import Testimonial from '../components/Home/Testimonial.jsx'
import Cta from '../components/Home/Cta.jsx'
import Footer from '../components/Home/Footer.jsx'

const Home = () => {
  return (
    <>
      {/* <Banner /> */}
      <Hero />
      <Features />
      <Testimonial />
      <Cta />
      <Footer />
    </>
  )
}

export default Home
