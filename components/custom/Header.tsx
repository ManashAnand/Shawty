"use client";

import Link from "next/link";
import React from "react";
import logo from "../../public/logo.jpg";
import Image from "next/image";
import { Button } from "../ui/button";
import {LinkIcon, LogOut} from "lucide-react";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";

const Header = () => {
  const router = useRouter();
  const user = true;
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
          {!user ? (
            <Button onClick={() => router.push("/auth")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <img src="../../public/logo.jpg" />
                  <AvatarFallback>PA</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  { "Manash"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard" className="flex">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                //   onClick={() => {
                //     fnLogout().then(() => {
                //       fetchUser();
                //       navigate("/auth");
                //     });
                //   }}
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
      {/* {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />} */}
    </>
  );
};

export default Header;
