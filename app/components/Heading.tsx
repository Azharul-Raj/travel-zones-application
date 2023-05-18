"use client"
import React from 'react';

interface headingProps{
    title:string;
    subTitle:string;
    center?:boolean;
}

function Heading({
    title,
    subTitle,
    center
}:headingProps) {

  return (
    <div
   className={`${center? 'text-center':"text-start"}`} 
    >
        <div className={`text-2xl font-bold`}>
            {title}
        </div>
        <div className={`font-light text-neutral-500`}>
            {subTitle}
        </div>
    </div>
  )
}

export default Heading;