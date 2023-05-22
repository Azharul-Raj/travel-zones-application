"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Logo() {
    const router=useRouter();
  return (
    <Image
    className='cursor-pointer'
    onClick={()=>router.push('/')}
    alt='logo'
    height={100}
    width={100}
    src="/images/logo.png"
    />
  )
}
