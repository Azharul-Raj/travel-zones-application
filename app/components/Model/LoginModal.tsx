"use client"
import React, { useCallback, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import {useForm,FieldValues,SubmitHandler} from 'react-hook-form'
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Input/Input';
import Button from '../Nav/Button/Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation';
import useRegisterModal from '@/app/hooks/useRegisterModal';

export default function LoginModal() {
    const router =useRouter()
  const [isLoading,setIsLoading]=useState(false);
  const loginModal=useLoginModal();
  const registerModal=useRegisterModal()
// toggle modal
  const toggleToRegister=useCallback(()=>{
    loginModal.onClose()
    registerModal.onOpen()
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
            loginModal.onClose()
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
      <Button outline icon={AiFillGithub} label='Continue with github' onClick={()=>signIn("github")}/>
      <div className="text-center flex items-center gap-2 justify-center text-neutral-500 mt-4t">
        <div className="">New here?</div>
        <div onClick={toggleToRegister} className="text-neutral-800 hover:underline cursor-pointer">Create an account</div>
      </div>
    </div>
  )
  return (
    <Modal
    disabled={isLoading}
    isOpen={loginModal.isOpen}
    title='Login'
    actionLabel='Login'
    onClose={loginModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}
