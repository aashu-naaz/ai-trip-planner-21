import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const menuOptions=[
    {
        name:'Home',
        path:'/'
    },
    {   
        name:'Pricing',
        path:'/pricing'
    },
    {
        name:'Contact us',
        path:'/contact-us'
    }
]


function Header() {
  return (
    <div className='flex justify-between items-center p-4'>
        {/* Logo */}
        <div className='flex gap-2 items-center'>
            <Image src={'/logo.png'} alt='logo' width={40} height={40} /> 
            <h2 className= 'font-bold text-2xl'>AI Trip Planner </h2>
        </div>
        {/* Menu Options */}
        <div className='flex gap-8 items-center'>
             {menuOptions.map((menu, index) => (
                <Link href={menu.path} key={index}>
              <h2 className='text-lg hover:scale-105 transition-all hover:text-primary'>{menu.name}</h2>
                </Link>
             ))}
        </div>

        {/* Get Started Button */}
        <Button>Get Started</Button>
    </div>
  );
};

export default Header;
