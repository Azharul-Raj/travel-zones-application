"use client"
import React, { useCallback, useState } from 'react'
import axios from 'axios';
import { SafeListing, SafeReservation, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/listing/ListingCard';

interface TripsClientProps{
    reservations:SafeReservation[] 
    currentUser:SafeUser | null;
}
function TripsClient({
    reservations,
    currentUser
}:TripsClientProps) {
    const router=useRouter();
    const [deletingId,setDeletingId]=useState('');
    const onCancel=useCallback((id:string)=>{
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success("Reservation canceled")
        })
        .catch(err=>{
            toast.error(err?.response?.data?.error);
            router.refresh()
        })
        .finally(()=>{
            setDeletingId('')
        })
    },[router])
  return (
    <Container>
        <div className="pt-28">

        <Heading
         title='Your trips'
         subTitle='Where you are in and where are you going?'
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {
                reservations.map(reservation=>(
                <ListingCard 
                data={reservation.listing} 
                key={reservation.id} 
                reservation={reservation}
                actionId={reservation.id}
                actionLabel='Cancel reservation'
                onAction={onCancel}
                disabled={deletingId===reservation.id}
                currentUser={currentUser}
                />))
            }
        </div>
        </div>
    </Container>
  )
}

export default TripsClient;