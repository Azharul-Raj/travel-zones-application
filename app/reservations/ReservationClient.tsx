"use client"
import React, { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast';
import { SafeReservation, SafeUser } from '../types';
import ClientOnly from '../components/ClientOnly';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ListingCard from '../components/listing/ListingCard';
import Container from '../components/Container';

interface ReservationClientProps{
    reservations:SafeReservation;
    currentUser:SafeUser | null;
}
function ReservationClient({reservations,currentUser}:ReservationClientProps) {
    const router=useRouter();
    const [deletingId,setDeletingId]=useState('');

    const oncancel=useCallback((id:string)=>{
        setDeletingId(id);
        axios.delete(`/api/reservation/${id}`)
        .then(()=>{
            toast.success("Reservation deleted successfully")
            router.refresh();            
        })
        .catch((err)=>{
            toast.error('Something went wrong')
        })
        .finally(()=>{
            setDeletingId('')
        })
    },[])
  return (
    <ClientOnly>
        <Container>
        <div className="pt-28">
            <Heading
             title='Reservation'
             subTitle='Reservation on your properties'
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {
                    reservations.map((reservation:SafeReservation)=>(
                        <ListingCard
                         key={reservation.id}
                         data={reservation.listing}
                         reservation={reservation}
                         actionId={reservation.id}
                         onAction={oncancel}
                         disabled={deletingId===reservation.id}
                         actionLabel='Cancel guest reservation'
                         currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </div>
        </Container>
    </ClientOnly>
  )
}

export default ReservationClient;