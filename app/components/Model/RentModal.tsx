"use client"
import React, { useMemo, useState } from 'react'
import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../Heading';
import { categories } from '@/app/data/data';
import CategoryInput from '../Input/CategoryInput';
import { FieldValues, useForm } from 'react-hook-form';
import CountrySelect from '../Input/CountrySelect';

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
              <CategoryInput onClick={(category)=>{
                setCustomValue('category',category)
              }} selected={category===item.label} icon={item.icon} label={item.label} />
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
        <CountrySelect/>
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