import React from 'react'
import { TiStar, TiStarHalf, TiStarHalfOutline } from 'react-icons/ti'
import img1 from '../../assets/Images/TTC.jpg'
import img2 from '../../assets/Images/HUMEN RESORSE.jpg'
import img4 from '../../assets/Images/Paramedical.jpg'
import img3 from '../../assets/Images/skill.jpg'
import img5 from '../../assets/Images/ayu.jpg'
import img6 from '../../assets/Images/management.jpg'
import { Button } from '../ui/button'
import pdf from '../../assets/pdf/TSSR COURSES.pdf'

const courseList = [
    {
      imgUrl: img1,
      title: 'Teachers Training Course',
      description: 'Learn modern teaching methodologies, classroom management, and curriculum planning to become a certified educator.',
    },
    {
      imgUrl: img2,
      title: 'Human Resources Development',
      description: 'Develop essential HR skills including recruitment, employee management, training, and labor law fundamentals.',
    },
    {
      imgUrl: img4,
      title: 'PARAMEDICAL / HEALTH RELATED COURSES',
      description: 'Understand spinal alignment, posture correction, and holistic chiropractic practices rooted in Indian tradition.',
    },
    {
      imgUrl: img3,
      title: 'SKILL DEVELOPMENT COURSES',
      description: 'Gain hands-on experience in various technical trades and vocational skills for industry-ready employment.',
    },
    {
      imgUrl: img5,
      title: 'AYURVEDHA COURSES',
      description: 'Explore natural healing techniques based on ancient Ayurveda and Siddha systems for wellness and therapy.',
    },
    {
      imgUrl: img6,
      title: 'MANAGEMENT COURSES',
      description: 'Master essential computer skills from basics to advanced software, networking, and IT tools.',
    },
  ];
  
export default function Course() {
  return (
    <div><div className='w-full min-h-screen py-20 flex items-center justify-center bg-[#fff9f1]'>
    <div className='mx-auto max-w-[85rem] px-4 '>
        <div data-aos="fade-up" className='text-center space-y-1'>
            <h1 className='text-lg'>Featured Courses</h1>
            <h1 className='text-3xl md:text-4xl font-bold'>Pick A Course To Get Started</h1>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-14'>
            {courseList.map((item, i)=>{
                return (
                    <div data-aos="fade-up" className='w-full p-3 shadow-lg bg-white border group rounded-xl   overflow-hidden'>
                        <div className='w-full h-60 overflow-hidden rounded-lg'>

                        <img src={item.imgUrl} className='w-full h-full object-cover group-hover:scale-105 transition-all duration-300' alt="" />
                        </div>
                        <div className='py-6 px-2'>
                            <div className='flex mt-2 items-center text-theme-500'>
                                <TiStar size={20} /><TiStar size={20} /><TiStar size={20} /><TiStar size={20} /> <TiStarHalf size={20}/>
                            </div>
                            <h1 className='text-2xl font-bold group-hover:text-blue-900 transition-all capitalize'>{item.title?.toLocaleLowerCase()}</h1>
                            <p className='text-sm mt-2 text-neutral-600'>{item.description}</p>
                            <Button size='sm' className='text-sm font-medium hover:underline mt-2 bg-theme-500 hover:bg-theme-600'>Readmore</Button>
                        </div>
                       
                    </div>
                )
            })}
        </div>
        <div className='mt-12 flex justify-center'>
          <a href={pdf} target='_blank'>

            <Button data-aos="fade-up" className='bg-theme-500 hover:bg-theme-600'>Browse All Categories</Button>
          </a>
        </div>
    </div>
</div></div>
  )
}
