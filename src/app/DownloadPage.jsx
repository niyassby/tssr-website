import PageHeader from '@/components/Utils/PageHeader'
import { Download04Icon, GoogleDocIcon, Location01Icon } from 'hugeicons-react'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import pdf1 from "../assets/pdf/Franchisee Application form format- TSSR.pdf"
import pdf2 from '../assets/pdf/FRANCHASE TERMS & CONDETION.pdf'
import pdf3 from '../assets/pdf/Franchisee Application form format- TSSR.pdf'
import pdf4 from '../assets/pdf/TSSR COURSES.pdf'
import pdf5 from '../assets/pdf/FRANCHISE REQUEST.pdf'
import pdf6 from '../assets/pdf/CHECK LIST - all Courses.pdf'
import pdf7 from '../assets/pdf/VERIFICATION REPORT FORMAT.pdf'
import pdf8 from '../assets/pdf/BROCHURE TSSR COUNCIL.pdf'
import pdf9 from '../assets/pdf/CIRCULAR TSSR.pdf'
import pdf10 from '../assets/pdf/FRANCHISE RENEWAL FORM.pdf'
import pdf11 from '../assets/pdf/REFUND-POLICY TSSR.pdf'


let categoryItemList = [
    {
        title: 'Franchise Application Form',
       link : pdf1
    },
    {
        title: 'Franchise Terms and Condition',
        link: pdf2
    },
    {
        title: 'Franchise Proposal',
        link:pdf3
    },
    {   
        title: 'Course List',
        link:pdf4

    },
    {
        title: 'Franchise Request Format',
        link: pdf5
    },
    {
        title: 'TSSR Checklist',
        link: pdf6
    },
    {
        title: 'Verification Format',
        link: pdf7
    },
    {
        title: 'Brochure',
        link:pdf8
    },
    {
        title: 'TSSR Circular',
        link: pdf9
    },
    {
        title: 'Franchise Renewal Form',
        link:pdf10
    },
    {
        title: 'TSSR Refund Policy',
        link: pdf11
    },

]
function DownloadPage() {
  return (
    <div className='w-full '>
        <PageHeader title='Downloads' subtitle='Get Franchise for starting a course at low investment to provide quality education.' />
        <div className='max-w-[85rem] py-20 mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-3 gap-8'>
            {categoryItemList.map((item, index) =>{
                return (
                    <Card   className='shadow-none bg-white hover:bg-accent hover:shadow-xl transition-all duration-300' key={index}>
                        <CardHeader>
                            <CardTitle className='text-lg'>{item.title}</CardTitle>
                            <CardDescription>Click button for download and view docs</CardDescription>
                        </CardHeader>
                        <CardFooter className='flex w-full gap-2'>
                            <a href={item.link} download={true} className='w-full'><Button className='w-full'><Download04Icon/> Download </Button></a>
                            <a href={item.link} target="_blank" className='w-full'><Button className='w-full' variant='outline' ><GoogleDocIcon/> View </Button></a>
                        </CardFooter>
                    </Card>
                )
            })}
        </div>
    </div>
  )
}

export default DownloadPage