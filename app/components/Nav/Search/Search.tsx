"use client";
import React from 'react'
 import {BiSearch} from 'react-icons/bi'
export default function Search() {
  return (
    <div className='border-[1px] w-full md:w-auto py-2 shadow-sm cursor-pointer rounded-full hover:shadow-md transition'>
        <div className="flex justify-between items-center">
            <div className="text-sm font-semibold px-6 ">
                Anywhere
            </div>
            <div className="hidden sm:block text-sm font-semibold px-6 flex-1 text-center border-x-[1px]">
                Anything
            </div>
            <div className="flex pl-6 pr-2 items-center text-sm">
                <div className="hidden sm:block">Add Guests</div>
                <div className="bg-red-500 ml-2 p-2 rounded-full text-white">
                    <BiSearch size={18}/>
                </div>
            </div>
        </div>
        {/* <input type="text" name="" id="" /> */}
    </div>
  )
}
