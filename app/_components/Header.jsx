import { Button } from '@/components/ui/button';
import { LayoutGrid, Search, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function Header() {
  return (
    <header className='p-5 shadow-md flex justify-between'>
      <div className='flex items-center gap-8'>
        <Image src='/logo.png' alt='logo' width={150} height={100} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <h2 className='hidden md:flex gap-2 items-center rounded-full p-2 px-10 bg-slate-200 cursor-pointer'>
            <LayoutGrid className='h-5 w-5' />
            Category
          </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className='md:flex gap-3 items-center border rounded-full p-2 px-5 hidden'>
          <Search />
          <input 
            className='outline-none'
            type='text' 
            placeholder='Search'
          />
        </div>
      </div>
      <div className='flex gap-5 items-center'>
        <h2 className='flex gap-2 items-center text-lg'>
          <ShoppingBag />
          0
        </h2>
        <Button>Login</Button>
      </div>
    </header>
  )
}

export default Header;