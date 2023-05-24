"use client"
import React, { useCallback, useMemo } from 'react';
import useCountries from '@/app/hooks/useCountries';
import { SafeListing, SafeUser } from '@/app/types';
import {  Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import {format} from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Nav/Button/Button';

interface ListingCardProps{
    data:SafeListing;
    reservation?:Reservation;
    onAction?:(id:string)=>void;
    disabled?:boolean;
    actionLabel?:string;
    actionId?:string;
    currentUser?:SafeUser | null;
}

function ListingCard({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId='',
    currentUser
}:ListingCardProps) {
    const router=useRouter();
    const {getByValue}=useCountries();

    const  location=getByValue(data?.locationValue);

    const handleCancel=useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
        if(disabled) return null;
        onAction?.(actionId)
    },[disabled,onAction,actionId])

    const price=useMemo(()=>{
        if(reservation){
            return reservation.totalPrice;
        }
        return data.price;
    },[reservation,data.price])

    const reservationDate=useMemo(()=>{
        if(!reservation){
            return null;
        }
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);
        return `${format(start,'PP')} - ${format(end,'PP')}`
    },[reservation])

  return (
    <div 
    onClick={()=>router.push(`/listings/${data.id}`)}
    className="col-span-1 cursor-pointer group">
        <div className="flex flex-col gap-2 w-full">
            <div className="aspect-square overflow-hidden relative rounded-xl w-full">
                <Image 
                fill
                className='w-full h-full group-hover:scale-110 transition'
                alt='Listing'
                src={data.imageSrc}
                />
                <div className="absolute top-3 right-3">
                    <HeartButton listingId={data.id} currentUser={currentUser}/>
                </div>
            </div>  
            <div className=" font-semibold">
            {location?.region}, {location?.label}  
            </div>    
            <div className="text-neutral-500">{reservationDate || data.category}</div>      
            <div className="flex items-center gap-1">
                <div className="font-semibold">
                    ${price}
                </div>
                {
                    !reservation && (
                        <div className="font-normal">night</div>
                    )
                }
            </div>
            {onAction && actionLabel && (
                <Button
                disabled={disabled}
                small
                label={actionLabel}
                onClick={handleCancel}
                />
            )}
        </div>
    </div>
  )
}

export default ListingCard;