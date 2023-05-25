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
    listings:SafeListing[] 
    currentUser:SafeUser | null;
}
function PropertiesClient({
    listings,
    currentUser
}:TripsClientProps) {
    const router=useRouter();
    const [deletingId,setDeletingId]=useState('');
    const onCancel=useCallback((id:string)=>{
        setDeletingId(id);
        axios.delete(`/api/listings/${id}`)
        .then(()=>{
            toast.success("listing deleted");
        })
        .catch(err=>{
            // toast.error(err?.response?.data?.error);
            console.log(err)
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
         title='My places'
         subTitle='My available places'
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {
                listings.map(listing=>(
                <ListingCard 
                key={listing.id}                 
                data={listing} 
                actionId={listing.id}
                onAction={onCancel}
                disabled={deletingId===listing.id}
                actionLabel='Delete Property'
                currentUser={currentUser}
                />))
            }
        </div>
        </div>
    </Container>
  )
}

export default PropertiesClient;