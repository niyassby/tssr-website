import { Navbar } from "@/components/Utils/Navbar";
import React, { useEffect, useState } from "react";
import logo from "../../assets/logo1.svg";
import { Button } from "../ui/button";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiMapPin, HiPhone } from "react-icons/hi2";
import { SheetDemo } from "./SideBar";
import { Link } from "react-router-dom";
const url = import.meta.env.VITE_APP_URL

const socialIcons = [ 
  { 
    icon: FaFacebookF,
    Link: "https://www.facebook.com/share/1GTCvvGvZf/?mibextid=wwXIfr",
  },
  {
    icon: FaInstagram,
    Link: "https://www.instagram.com/tssrcouncilofficial?igsh=MWRsZzVoNG12ZjUwaA%3D%3D&utm_source=qr",
  },
  {
    icon: FaXTwitter,
    Link: "",
  },
  { 
    icon: FaWhatsapp,
    Link: "",
  }, 
];


function NavMenu() {
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          setScrolling(window.scrollY > 0);
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);
  return (
    <div className="fixed top-0 z-50 w-full ">
      <div className="w-full border-b max-lg:hidden ">
        <div className="flex justify-between max-w-[85rem] px-3 mx-auto">
          <div className="flex divide-x">
            <div className="flex items-center gap-1 text-neutral-600 pr-3 py-5">
              <HiPhone size={20} />
              <p className="text-sm">+91 9400867461</p>
            </div>
            <div className="flex items-center gap-1 text-neutral-600 pl-3 py-5">
            <HiMapPin size={20} />
              <p className="text-sm">
                TSSR Council, TSSR Bhavan, Thamarassery, Calicut, Kerala
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-neutral-600">Follow us</p>
            <div className="flex divide-x">
              {socialIcons.map((item, i) => {
                return (
                  <a
                    key={i}
                    href={item.Link}
                    className="py-5 px-5 hover:-translate-y-1 text-theme-500 transition-all"
                  >
                    <item.icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
        <div className={`${scrolling ? "fixed top-0 bg-white shadow-sm py-5" : "py-5"} w-full transition-all duration-300`}>
      <div className={`w-full max-w-[85rem] px-4 mx-auto  flex items-center gap-1 justify-between bggray-500 `}>
        <Link to='/'>
          <img className="w-32 md:w-48" src={logo} alt="Logo" />
        </Link>
        <Navbar />
        <div className="flex items-center gap-2">
          <Link to={`${url}/login`}>
          <Button className='bg-theme-400 cursor-pointer hover:bg-theme-600 max-sm:px-2 text-white' >Study Centre Login</Button>
          </Link>
          <SheetDemo/>
      
        </div>
      </div>
      </div>
    </div>
  );
}

export default NavMenu;
