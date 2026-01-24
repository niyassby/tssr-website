import * as React from "react"
import { NavLink, useNavigate } from "react-router-dom"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import calenderPdf from '../../assets/pdf/ACADEMIC-CALENDARS  TSSR.pdf'
import studentAfv from '../../assets/pdf/STUDENT_AFFIDEVIT_tssr.pdf'
import MarkList from '../../assets/pdf/mark list.pdf'
import certificate from '../../assets/pdf/certificate.pdf'


const Lists = [
   
    {
        title: 'Courses',
        items: [
            {
                name: "Academic Calendar",
                open: true,
                link:calenderPdf
            },
            {
                name: "TSSR Courses",
                open: false,
                link: "/course"
            },
            {
                name: "Student Affidavit",
                open: true,
                link: studentAfv
            },
        ]
    },
   
    {
        title: 'Examination',
        items: [
            // {
            //     name: "Online Examination",
            //     open: false,
            //     link: "/"
            // },
            {
                name: "Download Hall Ticket",
                open: false,
                link: "/hall-ticket"
            },
            {
                name: "Check Result",
                open: false,
                link: "/check-result"
            },
            // {
            //     name: "Download Result",
            //     open: false,
            //     link: "/download-result"
            // },
        ]
    },
    {
        title: 'Services',
        items: [
            {
                name: "Franchise",
                open: false,
                link: "/franchise"
            },
            {
                name: "State Franchise",
                open: false,
                link: "/stage-franchise"
            },
            {
                name: "Accreditations",
                open: false,
                link: "/accreditation"
            },
            {
                name: "Certificate Verification",
                open: false,
                link: "/certificate-verification"
            },
            {
                name: "Authorized Study Centres",
                open: false,
                link: "/atc-verification"
            },
            {
                name: "ATC Registration",
                open: false,
                link: "/atc-req"
            },
            {
                name: "Gallery",
                open: false,
                link: "/gallery"
            },
            {
                name: "Downloads",
                open: false,
                link: "/downloads"
            },
            {
                name: "Sample Mark List",
                open: true,
                link: MarkList
            },
            {
                name: "Sample Certificate",
                open: true,
                link: certificate
            },
        ]
    },
]

export function Navbar() {
  const navigate = useNavigate()
  return (
    <NavigationMenu className='max-lg:hidden' viewport={false}>
      <NavigationMenuList>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger className='bg-transparent '>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">
                      TSSR 
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">
                      TSCC 
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}

<NavigationMenuItem >
          <NavigationMenuTrigger className='bg-transparent '>Home</NavigationMenuTrigger>
          <NavigationMenuContent  >
            <ul className="grid w-[220px] gap-4">
              <li>
                {[{name: "TSSR", link: "/"}, {name: "TSCC", link: "/tscc"}].map((Links, i)=>{
                  return (
                <NavigationMenuLink key={i} asChild>
                  <div onClick={()=>navigate(Links.link)} className="cursor-pointer">
                    <div className="font-medium">{Links.name}</div>
                  </div>
                </NavigationMenuLink>
                  )
                })
                }
                
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem >
          <NavigationMenuLink  asChild className={navigationMenuTriggerStyle()}>
            <div onClick={()=>navigate('/about')} className="cursor-pointer">About Us</div>
          </NavigationMenuLink>
        </NavigationMenuItem>

        
        
        {Lists.map((item, index)=>{
          return (
        <NavigationMenuItem key={index}>
          <NavigationMenuTrigger className='bg-transparent '>{item.title}</NavigationMenuTrigger>
          <NavigationMenuContent  >
            <ul className="grid w-[220px] gap-4">
              <li className={'NavLink'}>
                {item.items.map((Links, i)=>{
                  if(Links.open ){
                    return (
                      <NavigationMenuLink key={i} asChild>
                  <a disabled href={Links.link} target="_blank" className="cursor-pointer">
                    <div className="font-medium">{Links.name}</div>
                  </a>
                </NavigationMenuLink>
                    )
                  }
                  return (
                <NavigationMenuLink  key={i} asChild>
                  <NavLink to={Links.link} className="cursor-pointer">
                    <div className="font-medium">{Links.name}</div>
                  </NavLink>
                </NavigationMenuLink>
                  )
                })
                }
                
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
          )
        })}

<NavigationMenuItem >
          <NavigationMenuLink  asChild className={navigationMenuTriggerStyle()}>
            <div onClick={()=>navigate('/contact')} className="cursor-pointer">Contact Us</div>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        
      </NavigationMenuList>
    </NavigationMenu>
  )
}
