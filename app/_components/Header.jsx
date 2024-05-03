'use client';

import { Button } from '../../components/ui/button';
import { CircleUserRound, LayoutGrid, Search, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState, useContext } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import GlobalApi from '../_utils/GlobalApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UpdateCartContext } from '../_context/UpdateCartContext';
import { CartItemList } from '../_components/CartItemList';
import { toast } from 'sonner';

function Header() {

  const user = JSON.parse(sessionStorage.getItem('user'));
  const jwt = sessionStorage.getItem('jwt');
  const [categoryList, setCategoryList] = useState([]);
  const isLogin = jwt ? true : false;
  const [totalCartItem, setTotalCartItem] = useState(0);
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    let total = 0
    cartItemList.forEach(element => {
      total = total + element.amount
    })
    setSubtotal(total.toFixed(2));
  },[cartItemList]);

  useEffect(() => {
    getCategoryList();
  },[]);

  useEffect(() => {
    getCartItems();
  },[updateCart]);

  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      setCategoryList(resp.data.data);
    })
  };

  const getCartItems = async () => {
    if (!user) {
      return
    }
    const cartItemList = await GlobalApi.getCartItems(user.id, jwt);
    setTotalCartItem(cartItemList?.length);
    setCartItemList(cartItemList);
  };

  const onSignOut = () => {
    sessionStorage.clear();
    router.push('/sign-in');
  };

  const onDeleteCartItem = (id) => {
    GlobalApi.deleteCartItem(id, jwt).then(resp => {
      toast('Item removed!');
      getCartItems();
      setUpdateCart(!updateCart);
    })
  };

  return (
    <header className='p-5 shadow-md flex justify-between'>
      <div className='flex items-center gap-8'>
        <Link href={'/'}>
          <Image src='/logo.png' alt='logo' width={150} height={100} />
        </Link>
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
            {categoryList.map((category, index) => (
              <Link href={`/products-category/${category.attributes.name}`} key={index}>
                <DropdownMenuItem className='gap-x-4 cursor-pointer' key={index}>
                  <Image 
                    src={category.attributes.image}
                    alt='icon'
                    width={30}
                    height={30}
                    unoptimized
                  />
                  <h2 className='text-lg'>{category?.attributes?.name}</h2> 
                </DropdownMenuItem>
              </Link>
            ))}
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

        <Sheet>
          <SheetTrigger>
          <h2 className='flex gap-2 items-center text-lg'>
            <ShoppingBasket className='w-7 h-7 cursor-pointer' />
            <span className='bg-primary text-white px-2 w-7 h-7 rounded-full'>{totalCartItem}</span>
          </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className='bg-primary text-white font-bold text-lg p-2'>My Cart</SheetTitle>
              <SheetDescription>
                <CartItemList cartItemList={cartItemList} onDeleteCartItem={onDeleteCartItem} />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className="absolute w-[90%] bottom-6 flex flex-col bg-white">
                <h2 className="text-lg font-bold flex justify-between">
                  Subtotal
                  <span>${subtotal}</span>
                </h2>
                <Button 
                  onClick={() => router.push(jwt ? '/checkout' : '/sign-in')}
                  disabled={totalCartItem === 0}
                >
                  Checkout
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {!isLogin ?
          <Link href={'/sign-in'}>
            <Button>Login</Button>
          </Link>
          :
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound className='h-10 w-10 bg-green-100 text-primary p-2 rounded-full' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSignOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>
    </header>
  )
}

export default Header;