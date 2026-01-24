import React from 'react'
import bgImg from '../assets/Images/01.jpg'
import logo from '../assets/tscc.png'
import Tilt from 'react-parallax-tilt';
import { useNavigate } from 'react-router-dom';

function TSCC() {
  const navigate = useNavigate()
  return (
    <div>
      <div style={{backgroundImage: `url(${bgImg})`}} className='w-full h-screen overflow-hidden  bg-no-repeat md:bg-center bg-cover'>
      <div className='w-full h-full'>
        <div className='max-w-[85rem] h-full mx-auto px-4 grid md:grid-cols-2 max-md:grid-rows-2 gap-3'>
            <div className='w-full h-full flex flex-col gap-3  md:justify-center order-2 md:order-1'>
                <h1 data-aos="fade-up" className='text-3xl xl:text-6xl font-bold max-md:mt-3'>India's Leading & Largest Certification Body</h1>
                <p data-aos-delay="50" data-aos="fade-up" className='md:text-lg leading-6 max-w-md text-neutral-600'>Take the test of efficiency to learn aptitudes required by a genius and prove you are</p>
                <div data-aos-delay="100" data-aos="fade-up" className='mt-5 inline-flex  gap-2 '>
                    <button className='py-3 px-4 text-white font-medium  bg-[#003185]'>Get Admission</button>
                    <button  onClick={()=>navigate('/certificate-verification')}  className='py-3 px-4 text-white font-medium  bg-amber-500'>Verify Certificate</button>
                </div>
            </div>
            <div className='w-full h-full flex md:items-center max-md:items-end justify-center  order-1 md:order-2 '>
            <Tilt className="w-full "
                perspective={700}
                glareEnable={false}
                scale={1.02}
                trackOnWindow={true}>
                <img className='w-full aspect-square max-w-xl max-[1450px]:max-w-[500px] mt-8 max-md:w-72' src={logo} alt="" />
            </Tilt>
            </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default TSCC
