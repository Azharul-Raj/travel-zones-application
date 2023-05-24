"use client"
import React, { useMemo, useState } from 'react'
import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../Heading';
import { categories } from '@/app/data/data';
import CategoryInput from '../Input/CategoryInput';
import { FieldValues, useForm } from 'react-hook-form';
import CountrySelect from '../Input/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../Input/Counter';
import ImageUpload from '../Input/ImageUpload';

enum STEPS{
  CATEGORY=0,
  LOCATION=1,
  INFO=2,
  IMAGES=3,
  DESCRIPTION=4,
  PRICE=5
}

function RentModal() {
  const rentModal=useRentModal()
  const [step,setStep]=useState(STEPS.CATEGORY)
  // on back action
  const onBack=()=>{
    setStep(previous=>previous-1)
  }
  // on next action
  const onNext=()=>{
    setStep(previous=>previous+1)
  }
  /**
   * ACTION LABEL
   */
  const actionLabel=useMemo(()=>{
    if(step===STEPS.PRICE){
      return "Create"
    }
    return 'Next'
  },[step])
  const secondaryActionLabel=useMemo(()=>{
    if(step===STEPS.CATEGORY){
      return undefined
    }
    return 'Back'
  },[step])

  /**
   * Form elements
   */
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState:{
      errors
    }    
  }=useForm<FieldValues> ({
    defaultValues:{
      category:"",
      location:null,
      roomCount:1,
      guestCount:1,
      bathroomCount:1,
      imageSrc:"",
      price:1,
      title:'',
      description:''
    }
  })

  const category=watch('category');
  const location=watch('location');
  const guestCount=watch('guestCount');
  const roomCount=watch('roomCount');
  const bathroomCount=watch('bathroomCount');
  const imageSrc=watch('imageSrc');

  const Map=useMemo(()=>dynamic(()=>import('../Map'),{
    ssr:false
  }),[location])

  const setCustomValue=(id:string,value:any)=>{
    setValue(id,value,{
      shouldValidate:true,
      shouldDirty:true,
      shouldTouch:true
    })
  }
  /**
   * Form elements
   */
  // body content
  let bodyContent=(
    <div className="flex flex-col gap-8">
      <Heading title='Which of these best describes your place?'
      subTitle='Pick one'
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {
          categories.map((item,i)=> (
            <div key={i} className="col-span-1">
              <CategoryInput 
              onClick={(category)=>{
                setCustomValue('category',category)
              }} 
              selected={category===item.label} icon={item.icon} label={item.label} />
            </div>
          ))
        }
      </div>
    </div>
  )

  if(step===STEPS.LOCATION){
    bodyContent=(
      <div className="flex flex-col gap-8">
        <Heading title='Where is your place located?' subTitle='Help guests find you' />
        <CountrySelect value={location} onChange={(value)=>setCustomValue('location',value)}/>
        <Map center={location?.latlan}/>
      </div>
    )
  }

  if(step===STEPS.INFO){
    bodyContent=(
      <div className="flex flex-col gap-8">
        <Heading
          title='Share something about your place'
          subTitle='What amenities do you have ?'
        />
        <Counter 
        title='Guests' subTitle='How many guest do you allow?' 
        value={guestCount} 
        onChange={(value)=>setCustomValue('guestCount',value)}/>
        <hr/>
        <Counter 
        title='Rooms' subTitle='How many room do you have?' 
        value={roomCount} 
        onChange={(value)=>setCustomValue('roomCount',value)}/>
        <hr/>
        <Counter 
        title='Bathrooms' subTitle='How many guest bathroom do you have?' 
        value={bathroomCount} 
        onChange={(value)=>setCustomValue('bathroomCount',value)}/>
      </div>
    )
  }

  if(step===STEPS.IMAGES){
    bodyContent=(
      <div className="flex flex-col gap-8">
        <Heading
          title='Add a photo of your place'
          subTitle='Show guests how your place looks like!!'
        />
        <ImageUpload value={imageSrc} onChange={(value)=>setCustomValue('imageSrc',value)}/>
      </div>
    )
  }
  return (
    <Modal
    isOpen={rentModal.isOpen}
    onClose={rentModal.onClose}
    onSubmit={onNext}
    actionLabel={actionLabel}
    secondaryAction={step===STEPS.CATEGORY? undefined : onBack}
    secondaryActionLabel={secondaryActionLabel}
    title='Rent the property'
    body={bodyContent}
    />
  )
}

export default RentModal;