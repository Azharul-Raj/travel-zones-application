"use client"
import React, { useCallback, useMemo, useState } from 'react'
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import QS from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';
import useSearchModal from '@/app/hooks/useSearchModal';
import { CountrySelectValue } from '@/app/types';
import Modal from './Modal'
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import CountrySelect from '../Input/CountrySelect';
import Calendar from '../Input/Calendar';
import Counter from '../Input/Counter';

enum STEPS{
    LOCATION=0,
    DATE=1,
    INFO=2
}

function SearchModal() {
    const router=useRouter();
    const params=useSearchParams();
    const searchModal=useSearchModal(); 

    const [location,setLocation]=useState<CountrySelectValue>()
    const [step,setStep]=useState(STEPS.LOCATION);
    const [guestCount,setGuestCount]=useState(1)
    const [roomCount,setRoomCount]=useState(1)
    const [bathroomCount,setBathroomCount]=useState(1)
    const [dateRange,setDateRange]=useState<Range>({
        startDate:new Date(),
        endDate:new Date(),
        key:"selection"
    })

    const Map=useMemo(()=>dynamic(()=>import('../Map'),{
      ssr:false
    }),[location])

    // onNext 
    const onNext=useCallback(()=>{
      setStep(value=>value+1)
    },[])
    // onBack
    const onBack=useCallback(()=>{
      setStep(value=>value-1)
    },[])
    // 
    const onSubmit=useCallback(async()=>{
      if(step !== STEPS.INFO){
        return onNext()
      }
      let currentQuery={}
      if(params){
        currentQuery=QS.parse(params.toString())
      }
      const updatedQuery:any={
        ...currentQuery,
        locationValue:location?.value,
        guestCount,
        roomCount,
        bathroomCount
      }

      if(dateRange.startDate){
        updatedQuery.startDate=formatISO(dateRange.startDate)
      }
      if(dateRange.endDate){
        updatedQuery.endDate=formatISO(dateRange.endDate)
      }
      const url=QS.stringifyUrl({
        url:"/",
        query:updatedQuery
      },{skipNull:true})
 
      setStep(STEPS.LOCATION);
      searchModal.onClose();
      
      router.push(url);
    },[step,searchModal,router,guestCount,roomCount,bathroomCount,params,dateRange,onNext])
    
    //
    const actionLabel=useMemo(()=>{
      if(step===STEPS.INFO){
        return 'Search';
      }
      return 'Next';
    },[step])

    const secondaryActionLabel=useMemo(()=>{
      if(step===STEPS.LOCATION){
        return undefined;
      }
      return 'Back';
    },[step])

    let bodyContent=(
      <div className="flex flex-col gap-8">
        <Heading
         title='Where do you wanna go'
         subTitle='Select a place to go'
        />
        <CountrySelect
         value={location}
         onChange={(value)=>setLocation(value as CountrySelectValue)}
        />
        <hr />
        <Map
         center={location?.latlan}
        />
      </div>
    )
    if(step===STEPS.DATE){
      bodyContent=(
        <div className="flex flex-col gap-8">
        <Heading
         title='When are you planning to go'
         subTitle='Make sure everyone is free'
        />
        <Calendar
         onChange={(value)=>setDateRange(value.selection)}         
         value={dateRange}
        />
      </div>
      )
    }

    if(step===STEPS.INFO){
      bodyContent=(
        <div className="flex flex-col gap-8">
        <Heading
         title='More Info'
         subTitle='Find your perfect place to go'
        />
       <Counter
         title='Guests'
         subTitle='How many guests are coming?'
         value={guestCount}
         onChange={(value)=>setGuestCount(value)}
       />
       <Counter
         title='Rooms'
         subTitle='How many rooms you need?'
         value={roomCount}
         onChange={(value)=>setRoomCount(value)}
       />
       <Counter
         title='Bathrooms'
         subTitle='How many bathrooms you need?'
         value={bathroomCount}
         onChange={(value)=>setBathroomCount(value)}
       />
      </div>
      )
    }
  return (
    <Modal 
     isOpen={searchModal.isOpen}
     onClose={searchModal.onClose}
     onSubmit={onSubmit}
     title='Filters'
     actionLabel={actionLabel}
     secondaryAction={step===STEPS.LOCATION? undefined :onBack}
     secondaryActionLabel={secondaryActionLabel}
     body={bodyContent}
    />
  )
}

export default SearchModal;
