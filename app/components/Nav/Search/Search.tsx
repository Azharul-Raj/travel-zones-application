"use client";
import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react'
 import {BiSearch} from 'react-icons/bi'
export default function Search() {
    const searchModal=useSearchModal();
    const params=useSearchParams()
    const {getByValue}=useCountries();

    const locationValue=params?.get('locationValue');
    const guestCount=params?.get('guestCount');
    const startDate=params?.get('startDate');
    const endDate=params?.get('endDate');

    const locationLabel=useMemo(()=>{
        if(locationValue){
            return getByValue(locationValue as string)?.label;
        }
        return 'Anywhere'
    },[getByValue,locationValue]);

    const durationLabel=useMemo(()=>{
        if(startDate && endDate){
            const start= new Date(startDate);
            const end=new Date(endDate);
            let difference=differenceInDays(end,start);
            if(difference===0){
                difference=1
            }
            return `${difference} Days`
        }
        return 'Any week';
    },[startDate,endDate])

    const guestLabel=useMemo(()=>{
        if(guestCount){
            return `${guestCount} Guests`
        }
        return 'Add guests';
    },[guestCount])
  return (
    <div
    onClick={searchModal.onOpen}
    className='border-[1px] w-full md:w-auto py-2 shadow-sm cursor-pointer rounded-full hover:shadow-md transition'>
        <div className="flex justify-between items-center">
            <p className="text-sm font-semibold px-6 ">
                {locationLabel}
            </p>
            <p className="hidden sm:block text-sm font-semibold px-6 flex-1 text-center border-x-[1px]">
                {durationLabel}
            </p>
            <div className="flex pl-6 pr-2 items-center text-sm">
                <p className="hidden sm:block">{guestLabel}</p>
                <div className="bg-red-500 ml-2 p-2 rounded-full text-white">
                    <BiSearch size={18}/>
                </div>
            </div>
        </div>
    </div>
  )
}
