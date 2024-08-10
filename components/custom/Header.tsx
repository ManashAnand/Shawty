"use client";

import Link from "next/link";
import React from "react";
import logo from "../../public/logo.jpg";
import Image from "next/image";
import { Button } from "../ui/button";
import { LinkIcon, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useAuthenticateState } from "@/actions/zustand";
import { logout } from "@/actions/action";

const Header = () => {
  const router = useRouter();
  const isAuth = useAuthenticateState((state) => state.isAuthenticatad);
  const ToggleAuthenitcation = useAuthenticateState(
    (state) => state.ToogleAuth
  );
  const user = useAuthenticateState((state) => state.user);
  console.log(user);
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src={logo}
            className="h-16 rounded-full"
            width={70}
            height={100}
            alt="Shawty Logo"
          />
        </Link>
        <div className="flex gap-4">
          {!isAuth ? (
            <Button onClick={() => router.push("/auth")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 h-10 rounded-full ">
                <Avatar>
                  <img
                    src={user?.user?.user_metadata?.profile_pic || ""}
                    className="rounded-full overflow-hidden object-contain"
                  />
                  <AvatarFallback>PA</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard" className="flex">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    ToggleAuthenitcation(false);   
                    router.push("/");
                  }}
                  className="text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
