"use client"
import React, { useCallback, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import {useForm,FieldValues,SubmitHandler} from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Input/Input';
import Button from '../Nav/Button/Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';

export default function RegisterModal() {
  const [isLoading,setIsLoading]=useState(false);
  const registerModal=useRegisterModal();
  const loginModal=useLoginModal()
  // toggle modal
  const toggleToLogin=useCallback(()=>{
    registerModal.onClose()
    loginModal.onOpen()
  },[registerModal,loginModal])
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
        registerModal.onClose()
        toast.success("User created successfully")
        loginModal.onOpen()
      })
      .catch(err=>toast.error(err.message))
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
    <Input 
    id='name'
    label='Name'
    register={register}
    errors={errors}
    required
    />
    <Input 
    id='email'
    label='Email'
    register={register}
    errors={errors}
    required
    />
    <Input 
    id='password'
    label='Password'
    type='password'
    register={register}
    errors={errors}
    required
    />
    </div>
  )
  //footer 
  const footerContent=(
    <div className="flex flex-col gap-4 mt-3">
      <Button outline icon={FcGoogle} label='Continue with google' onClick={()=>signIn("google")}/>
      <Button outline icon={AiFillGithub} label='Continue with github' onClick={()=>signIn('github')}/>
      <div className="text-center flex items-center gap-2 justify-center text-neutral-500 mt-4">
        <div className="">Already have an account?</div>
        <div onClick={toggleToLogin} className="text-neutral-800 hover:underline cursor-pointer">Login</div>
      </div>
    </div>
  )
  return (
    <Modal
    disabled={isLoading}
    isOpen={registerModal.isOpen}
    title='Register'
    actionLabel='Continue'
    onClose={registerModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}
