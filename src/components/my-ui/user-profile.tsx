'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar"
interface User {
  name: string,
  email: string,
  image: string,
}

import { ExitIcon, } from "@radix-ui/react-icons"
import { HomeIcon, UserRound, Cog, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
export function UserProfile() {
  const [data, setData] = React.useState<User | null>(null);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth");
      const data = await res.json();
      setData(data.user);
    } catch (error) {
      console.error(error);
    }
  }
  const toggle = () => {
    setOpen(!open);
    console.log(open);
  }
   const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }
  React.useEffect(() => {
    fetchUser();
  }, []);


  return (
    <DropdownMenu
    onOpenChange={toggle}
    >
      <DropdownMenuTrigger
      asChild>
        {data &&
         <div
         
         className=' flex gap-2 z-50 justify-start items-center cursor-pointer'
         >
           <Avatar
            className=" cursor-pointer"
          >
            <AvatarImage
              className=""
              src={data.image}
              alt="صورة الملف الشخصي للمستخدم"
            />
            <AvatarFallback>
              {data.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
         <div
         className='flex-flex-col gap-2'
         >
          <p
          className="text-sm font-semibold"
          >
            {data.name}
          </p>
          <p
          className="text-xs"
          >
            {data.email}
          </p>
          </div>
            
            <ChevronDown
            className={`w-4 h-4 transform duration-500 select-none transition-all ease-in-out ${open ? 'rotate-180' : 'rotate-0'}`}
            />
         
         </div>
        }
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>حسابي</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard">
            <DropdownMenuItem>
              الصفحة الرئيسية
              <DropdownMenuShortcut>
                <HomeIcon
                  className="w-4 h-4"
                />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/profile">
            <DropdownMenuItem>
              الملف الشخصي
              <DropdownMenuShortcut>
                <UserRound
                  className="w-4 h-4"
                />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/settings">
            <DropdownMenuItem>
              الإعدادات
              <DropdownMenuShortcut>
                <Cog
                  className="w-4 h-4"
                />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem
          onClick={logout}
          >
              تسجيل الخروج
            <DropdownMenuShortcut>
              <ExitIcon />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
