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
        <div className={`text-xl font-bold`}>
            {title}
        </div>
        <div className={`font-normal text-gray-800`}>
            {subTitle}
        </div>
    </div>
  )
}

export default Heading;