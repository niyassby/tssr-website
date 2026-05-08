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


export const navlinks = [

  {
    title: 'Courses',
    items: [
      {
        name: "Academic Calendar",
        open: true,
        link: calenderPdf
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
      {
        name: "Events",
        open: false,
        link: "/events"
      },
    ]
  },
]

export function Navbar() {
  const navigate = useNavigate()
  return (
    <NavigationMenu className='max-lg:hidden' viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem >
          <NavigationMenuTrigger className='bg-transparent '>Home</NavigationMenuTrigger>
          <NavigationMenuContent  >
            <ul className="grid w-[220px] gap-4">
              <li>
                {[{ name: "TSSR", link: "/" }, { name: "TSCC", link: "/tscc" }].map((Links, i) => {
                  return (
                    <NavigationMenuLink key={i} asChild>
                      <div onClick={() => navigate(Links.link)} className="cursor-pointer">
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
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <div onClick={() => navigate('/about')} className="cursor-pointer">About Us</div>
          </NavigationMenuLink>
        </NavigationMenuItem>



        {navlinks.map((item, index) => {
          return (
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger className='bg-transparent '>{item.title}</NavigationMenuTrigger>
              <NavigationMenuContent  >
                <ul className="grid w-[220px] gap-4">
                  <li className={'NavLink'}>
                    {item.items.map((Links, i) => {
                      if (Links.open) {
                        return (
                          <NavigationMenuLink key={i} asChild>
                            <a disabled href={Links.link} target="_blank" className="cursor-pointer">
                              <div className="font-medium">{Links.name}</div>
                            </a>
                          </NavigationMenuLink>
                        )
                      }
                      return (
                        <NavigationMenuLink key={i} asChild>
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
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <div onClick={() => navigate('/contact')} className="cursor-pointer">Contact Us</div>
          </NavigationMenuLink>
        </NavigationMenuItem>


      </NavigationMenuList>
    </NavigationMenu>
  )
}
