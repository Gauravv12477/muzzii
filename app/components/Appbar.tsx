"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Appbar = () => {
  const session = useSession();
  const[imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    setImgUrl( session.data?.user?.image || "");
  }, [session]);


  return (
    <div className="shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-black">
          Muzi
        </Link>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex gap-4">
            <NavigationMenuItem>
              <Link href="/" className="text-gray-700 hover:text-black">
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" className="text-gray-700 hover:text-black">
                About
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" className="text-gray-700 hover:text-black">
                Contact
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/resources"
                className="text-gray-700 hover:text-black"
              >
                Resources
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>

          {/* Dropdown for Mobile */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about">About</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact">Contact</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/resources">Resources</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </NavigationMenu>

        {/* Authentication */}
        <div>
          {session.data?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2">
                  <div className="font-semibold">hello, </div>                  
                  <Avatar>
                    
                    <AvatarImage
                      src={imgUrl}
                      alt="User Avatar"
                    />

                    <AvatarFallback className="bg-gray-300">
                      {session.data.user?.name?.[0] ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem disabled>
                  {session.data.user?.name || "Unknown User"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" onClick={() => signIn()}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appbar;
