"use client"
import React from 'react';
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from '../Avatar/Avatar';

export default function UserMenu() {
  return (
    <div className='relative'>
        <div className="flex items-center gap-3">
            <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer ">
                Arbnb  your home
            </div>
            <div className="p-4 md:py-1 md:px-2 transition rounded-full gap-3 border-[1px] flex flex-row items-center hover:shadow-md cursor-pointer ">
                <AiOutlineMenu/>
                <div className="hidden md:block">
                  <Avatar/>
                </div>
            </div>
        </div>
    </div>
  )
}
