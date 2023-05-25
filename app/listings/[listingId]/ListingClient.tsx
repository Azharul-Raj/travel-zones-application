"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import ListingHead from '@/app/components/listing/ListingHead';
import { categories } from '@/app/data/data';
import { SafeListing, SafeUser } from '@/app/types';
import { Reservation } from '@prisma/client';
import ListingInfo from '@/app/components/listing/ListingInfo';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingReservation from '@/app/components/listing/ListingReservation';
import { Range } from 'react-date-range';

const initialDateRange={
    startDate:new Date(),
    endDate:new Date(),
    key:"selection"
}

interface ListingClientProps{
    reservations?:Reservation[]; 
    listing:SafeListing & {
        user:SafeUser
    }
    currentUser?:SafeUser | null;
}

function ListingClient({reservations=[],listing,currentUser}:ListingClientProps) {
    const loginModal=useLoginModal();
    const router=useRouter();
    // 
    const disabledDate=useMemo(()=>{
        let dates:Date[]=[];

        reservations.forEach((reservation)=>{
            const range=eachDayOfInterval({
                start:new Date(reservation.startDate),
                end:new Date(reservation.endDate)
            })
            dates=[...dates,...range]
        })
        return dates;
    },[reservations])

    const [isLoading,setIsLoading]=useState(false);
    const [totalPrice,setTotalPrice]=useState(listing.price);
    const [dateRange,setDateRange]=useState<Range>(initialDateRange);

    const onCreateReservation=()=>useCallback(()=>{
        if(!currentUser){
            return loginModal.onOpen();
        }
        setIsLoading(true);

        axios.post('/api/reservation',{
            totalPrice,
            startDate:dateRange.startDate,
            endDate:dateRange.endDate,
            listingId:listing?.id
        })
        .then(()=>{
            toast.success("Listing reserved");
            setDateRange(initialDateRange);
            //TODO:redirect to {trips}
            router.refresh();            
        })
        .catch((err)=>toast.error(err.message))
        .finally(()=>{
            setIsLoading(false);
        })
    },[currentUser,dateRange,listing?.id,loginModal,router])


    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate){
            const dayCount=differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )
            if(dayCount && listing.price){
                setTotalPrice(dayCount * listing.price)
            } else{
                setTotalPrice(listing.price)
            }
        }
    },[dateRange,listing.price])

    const category=useMemo(()=>{
        return categories.find(category=>category?.label===listing?.category)
    },[listing.category])    

  return (
    <div className="max-w-screen-lg py-32 mx-auto">
        <div className="flex flex-col gap-6">
            <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
            />
            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6f">
                <ListingInfo
                 user={listing.user}
                 category={category}
                 description={listing.description}
                 roomCount={listing.roomCount}
                 guestCount={listing.guestCount}
                 bathroomCount={listing.bathroomCount}
                 locationValue={listing.locationValue}
                />
                <div className="order-first mb-10 md:order-last md:col-span-3">
                    <ListingReservation
                     price={listing.price}
                     totalPrice={totalPrice}
                     onChangeDate={(value)=>setDateRange(value)}
                     dateRange={dateRange}
                     onSubmit={onCreateReservation}
                     disabled={isLoading}
                     disabledDates={disabledDate}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListingClient;