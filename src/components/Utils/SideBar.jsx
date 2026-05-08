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
import { navlinks } from "./Navbar";


export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button variant="outline" size={"icon"} className="group">
          <Menu02Icon className="transition-transform group-hover:scale-110" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[320px] sm:w-[380px] p-0 border-l-0 shadow-2xl">
        <SheetHeader className="p-6 border-b border-border/50 bg-muted/10 text-left">
          <SheetTitle className="text-2xl font-bold tracking-tight text-primary">Menu</SheetTitle>
          <SheetDescription className="text-sm mt-1">
            Navigate through our programs and services.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto pb-6 px-4 h-[calc(100vh-120px)] scrollbar-hide">
          <SheetClose asChild>
            <Link
              to="/"
              className="flex items-center justify-between text-sm font-medium py-3 px-4 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-200"
            >
              Home
              <ChevronRight size={16} className="text-muted-foreground opacity-50" />
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              to="/about"
              className="flex items-center justify-between text-sm font-medium py-3 px-4 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-200"
            >
              About
              <ChevronRight size={16} className="text-muted-foreground opacity-50" />
            </Link>
          </SheetClose>

          {navlinks.map((item, index) => (
            <Collapsible key={index} className="group/collapsible">
              <CollapsibleTrigger asChild>
                <button className="w-full outline-none flex items-center justify-between text-sm font-medium py-3 px-4 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-200">
                  {item.title}
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/50 text-muted-foreground group-hover/collapsible:bg-accent group-data-[state=open]/collapsible:bg-accent transition-colors">
                    <Plus
                      size={14}
                      className="group-data-[state=open]/collapsible:hidden transition-transform"
                    />
                    <Minus
                      size={14}
                      className="group-data-[state=closed]/collapsible:hidden transition-transform"
                    />
                  </div>
                </button>
              </CollapsibleTrigger>
              {item.items?.length ? (
                <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                  <div className="ml-6 pl-2 border-l pb-2 mt-1 ">
                    {item.items.map((subItem) => {
                      if (subItem.open) {
                        return (
                          <SheetClose asChild key={subItem.name}>
                            <a
                              href={subItem.link}
                              target="_blank"
                              rel="noreferrer"
                              className="block"
                            >
                              <div className="text-sm py-2.5 px-4 font-medium   hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors">
                                {subItem.name}
                              </div>
                            </a>
                          </SheetClose>
                        );
                      }
                      return (
                        <SheetClose asChild key={subItem.name}>
                          <Link
                            to={subItem.link}
                            className="block"
                          >
                            <div className="text-sm py-2.5 px-4 font-medium  hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors">
                              {subItem.name}
                            </div>
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              ) : null}
            </Collapsible>
          ))}

          <SheetClose asChild>
            <Link
              to="/contact"
              className="flex items-center justify-between text-sm font-medium py-3 px-4 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-200"
            >
              Contact
              <ChevronRight size={16} className="text-muted-foreground opacity-50" />
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
