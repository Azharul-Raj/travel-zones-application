"use client";
import Image from 'next/image';
import React from 'react'

interface AvatarProps{
  image:string|any
}
export default function Avatar({image}:AvatarProps) {
  return (
        <Image 
        className='rounded-full'
        height={30}
        width={30}
        alt='avatar'
        src={`${image? image:'/images/placeholder.jpg'}`}
        />
  )
}
