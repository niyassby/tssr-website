import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Menu02Icon } from "hugeicons-react";
import calenderPdf from "../../assets/pdf/ACADEMIC-CALENDARS  TSSR.pdf";
import studentAfv from "../../assets/pdf/STUDENT_AFFIDEVIT_tssr.pdf";
import MarkList from "../../assets/pdf/mark list.pdf";
import certificate from "../../assets/pdf/certificate.pdf";

const Lists = [
  {
    title: "Courses",
    items: [
      {
        name: "Academic Calendar",
        open: true,
        link: calenderPdf,
      },
      {
        name: "TSSR Courses",
        open: false,
        link: "/course",
      },
      {
        name: "Student Affidavit",
        open: true,
        link: studentAfv,
      },
    ],
  },

  {
    title: "Examination",
    items: [
      // {
      //     name: "Online Examination",
      //     open: false,
      //     link: "/"
      // },
      {
        name: "Download Hall Ticket",
        open: false,
        link: "/hall-ticket",
      },
      {
        name: "Check Result",
        open: false,
        link: "/check-result",
      },
      {
        name: "Download Result",
        open: false,
        link: "/download-result",
      },
    ],
  },
  {
    title: "Services",
    items: [
      {
        name: "Franchise",
        open: false,
        link: "/franchise",
      },
      {
        name: "State Franchise",
        open: false,
        link: "/stage-franchise",
      },
      {
        name: "Accreditations",
        open: false,
        link: "/accreditation",
      },
      {
        name: "Certificate Verification",
        open: false,
        link: "/certificate-verification",
      },
      {
        name: "Authorized Study Centres",
        open: false,
        link: "/atc-verification",
      },
      {
        name: "ATC Registration",
        open: false,
        link: "/atc-req",
      },
      {
        name: "Gallery",
        open: false,
        link: "/gallery",
      },
      {
        name: "Downloads",
        open: false,
        link: "/downloads",
      },
      {
        name: "Sample Mark List",
        open: true,
        link: MarkList,
      },
      {
        name: "Sample Certificate",
        open: true,
        link: certificate,
      },
    ],
  },
];

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden" asChild>
        <Button variant="outline" size={"icon"}>
          <Menu02Icon />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[340px] ">
        <SheetHeader>
          <SheetTitle>Nav Links</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-2 px-4">
          <Link
            to="/"
            className="flex text-sm font-medium items-center justify-between bg-accent py-2 px-4 rounded-md"
          >
            Home{" "}
            <div>
              <ChevronRight size={20} />
            </div>
          </Link>
          <Link
            to="/about"
            className="flex text-sm font-medium items-center justify-between bg-accent py-2 px-4 rounded-md"
          >
            About{" "}
            <div>
              <ChevronRight size={20} />
            </div>
          </Link>
          {Lists.map((item, index) => (
            <Collapsible key={index} className="group/collapsible">
              <CollapsibleTrigger asChild>
                <div className="flex text-sm font-medium items-center justify-between bg-accent py-2 px-4 rounded-md">
                  {item.title}{" "}
                  <Plus
                    size={20}
                    className=" group-data-[state=open]/collapsible:hidden"
                  />
                  <Minus
                    size={20}
                    className=" group-data-[state=closed]/collapsible:hidden"
                  />
                </div>
              </CollapsibleTrigger>
              {item.items?.length ? (
                <CollapsibleContent>
                  <div className="ml-5 py-2">
                    {item.items.map((item) => {
                      if (item.open) {
                        return (
                          <a href={item.link} target="_blank">
                            <div className=" text-sm  py-2 font-medium hover:bg-accent px-4 rounded-md">
                              {item.name}
                            </div>
                          </a>
                        );
                      }
                      return (
                        <Link
                          to={item.link}
                          key={item.name}
                          className="text-sm "
                        >
                          <div className="py-2 font-medium hover:bg-accent px-4 rounded-md">
                            {item.name}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              ) : null}
            </Collapsible>
          ))}
          <Link
            to="/contact"
            className="flex text-sm font-medium items-center justify-between bg-accent py-2 px-4 rounded-md"
          >
            Contact{" "}
            <div>
              <ChevronRight size={20} />
            </div>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
