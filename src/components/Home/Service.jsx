import React from 'react'
import { TiStar, TiStarHalf, TiStarHalfOutline } from "react-icons/ti";

const categoryList = [
    {
      imgUrl: 'https://img.freepik.com/free-photo/businessman-with-tablet-after-closing-deal_1098-3372.jpg',
      imgAlt: "category ",
      title: "Affiliation ",
      cate: "We TSSR Council provide affiliation to institutions who provide skilled training and other short term courses to maintain quality education.",
    },
    {
      imgUrl: "https://img.freepik.com/free-photo/graduation-diploma-certificate-laptop_23-2148769704.jpg",
      imgAlt: "category ",
      title: "Certification",
      cate: "TSSR Council provide iso and other authorities sanctioned certificates to students who complete the course provided by TSSR Council.",
    },
    {
      imgUrl: 'https://img.freepik.com/free-vector/female-student-listening-webinar-online_74855-6461.jpg',
      imgAlt: "category ",
      title: "1400+ Courses",
      cate: "TSSR provide about 1400+ courses in various displines such as Technical, Computer, Aviation, Counselling, Paramedical, and many more.",
    },
    {
      imgUrl: 'https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041847.jpg',
      imgAlt: " category",
      title: "Online Verification",
      cate: "TSSR Council does the online verification of documents. We are trustable and reliable in the field. Therefore, our verification is acceptable world wide.",
    },
  
    {
      imgUrl: 'https://img.freepik.com/free-photo/standard-quality-control-collage_23-2149631012.jpg',
      imgAlt: "category ",
      title: "Quality Education",
      cate: "Our all courses are designed in such a way that it provide quality education which capable students to attain jobs. Most of our certified students are working.",
    },
    {
      imgUrl: 'https://img.freepik.com/premium-photo/businessman-working-with-sign-top-service-quality-assurance-guarantee-standards-iso_186616-707.jpg',
      imgAlt: "category",
      title: "Accreditations",
      cate: "Our Courses are accredicted and approved by iso standards and many other goverment agencies. Hence our courses are acceptable world wide all over.",
    },
  ];

function Service() {
  return (
    <div className='w-full min-h-screen py-20 flex items-center justify-center'>
        <div className='mx-auto max-w-[85rem] px-4 '>
            <div data-aos="fade-up" className='text-center space-y-1'>
                <h1 className='text-lg'>Our Services</h1>
                <h1 className='text-3xl font-bold'>What We Do</h1>
            </div>
            <div className='flex flex-wrap justify-center gap-4 md:gap-6 mt-8'>
                {categoryList.map((item, i)=>{
                    return (
                        <div data-aos="fade-up" className='w-full max-w-[300px]  border group rounded-xl shadow hover:shadow-lg overflow-hidden'>
                            <div className='w-full h-40 overflow-hidden'>

                            <img src={item.imgUrl} className='w-full h-full object-cover group-hover:scale-105 transition-all duration-300' alt="" />
                            </div>
                            <div className='px-3 py-6'>
                                <h1 className='text-xl font-semibold group-hover:text-blue-900 transition-all'>{item.title}</h1>
                                <p className='text-sm mt-2 text-neutral-700'>{item.cate}</p>
                                <div className='flex mt-2 text-amber-500'>
                                    <TiStar /><TiStar /><TiStar /><TiStar /><TiStarHalfOutline />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Service