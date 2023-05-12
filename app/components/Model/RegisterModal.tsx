"use client"
import React, { useState } from 'react'
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import {useForm,FieldValues,SubmitHandler} from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';

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
  return (
    <Modal
    disabled={isLoading}
    isOpen={RegisterModal.isOpen}
    title='Register'
    actionLabel='Continue'
    onClose={RegisterModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    />
  )
}
