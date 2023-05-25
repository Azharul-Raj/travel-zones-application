import React from 'react'
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";
import ReservationClient from './ReservationClient';


const ReservationPage=async()=> {
    const currentUser=await getCurrentUser();
    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState
                 title='Unauthorized'
                 subTitle='Please login'
                />
            </ClientOnly>
        )
    }
    // 
    const reservations=await getReservations({authorId:currentUser.id})
    if(!reservations.length){
        return (
            <ClientOnly>
                <EmptyState
                 title='No reservation found'
                 subTitle='Looks like there is no reservation in your property.'
                />
            </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <ReservationClient
         reservations={reservations}
         currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default ReservationPage;