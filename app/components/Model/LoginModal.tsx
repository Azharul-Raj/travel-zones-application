"use client"
import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import {useForm,FieldValues,SubmitHandler} from 'react-hook-form'
import Modal from './Modal';
import Heading from '../Heading';
import Inputs from '../Input/Inputs';
import Button from '../Nav/Button/Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation';

export default function LoginModal() {
    const router =useRouter()
  const [isLoading,setIsLoading]=useState(false);
  const LoginModal=useLoginModal();
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
    signIn('credentials',{
        ...data,
        redirect:false
    })
    .then((callback)=>{
        setIsLoading(false)
        if(callback?.ok){
            toast.success("successfully logged in")
            router.refresh()
            LoginModal.onClose()
        }
        if(callback?.error){
            toast.error(callback?.error)
        }
    })
  }
  // body content
  const bodyContent=(
    <div className="flex flex-col gap-4">
      <Heading 
    title='Welcome back' 
      subTitle='Login to your account'
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
    isOpen={LoginModal.isOpen}
    title='Login'
    actionLabel='Login'
    onClose={LoginModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}
