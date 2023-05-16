"use client"
import React, { useState } from 'react'
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import {useForm,FieldValues,SubmitHandler} from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Inputs from '../Input/Inputs';
import Button from '../Nav/Button/Button';

export default function RegisterModal() {
  const [isLoading,setIsLoading]=useState(false);
  const RegisterModal=useRegisterModal();
  const {
    register,
    handleSubmit,
    formState:
    {
      errors
    }
  }=useForm<FieldValues>({
    defaultValues:{
      name:"",
      email:"",
      password:""
    }
  })

  const onSubmit:SubmitHandler<FieldValues> =(data)=>{
    setIsLoading(true);
    axios.post("/api/register",data)
      .then(()=>{
        RegisterModal.onClose()
      })
      .catch(err=>console.log(err))
      .finally(()=>{
        setIsLoading(false);
      })
  }
  // body content
  const bodyContent=(
    <div className="flex flex-col gap-4">
      <Heading 
    title='Welcome to Travel Zones' 
      subTitle='Create an account'
    />
    <Inputs 
    id='name'
    label='Name'
    register={register}
    errors={errors}
    required
    />
    <Inputs 
    id='email'
    label='Email'
    register={register}
    errors={errors}
    required
    />
    <Inputs 
    id='password'
    label='Password'
    register={register}
    errors={errors}
    required
    />
    </div>
  )
  //footer 
  const footerContent=(
    <div className="flex flex-col gap-4 mt-3">
      <Button outline icon={FcGoogle} label='Continue with google' onClick={()=>{}}/>
      <Button outline icon={AiFillGithub} label='Continue with github' onClick={()=>{}}/>
      <div className="text-center flex items-center gap-2 justify-center text-neutral-500 mt-4 font-light">
        <div className="">Already have an account?</div>
        <div className="text-neutral-800 hover:underline cursor-pointer">Login</div>
      </div>
    </div>
  )
  return (
    <Modal
    disabled={isLoading}
    isOpen={RegisterModal.isOpen}
    title='Register'
    actionLabel='Continue'
    onClose={RegisterModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}
