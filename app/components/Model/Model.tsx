
import React from 'react'

interface modelProps{
    isOpen:boolean;
    onClose:()=>void;
    onSubmit:()=>void;
    actionLabel:string;
    title?:string;
    body?:React.ReactElement;
    footer?:React.ReactElement;
    disabled?:boolean;
    secondaryAction?:()=>void;
    secondaryLabel?:string;
}
const  Model:React.FC<modelProps> =({
    isOpen,
onClose,
onSubmit,
actionLabel,
title,
body,
footer,
disabled,
secondaryAction,
secondaryLabel
})=> {
  return (
    <div>Model</div>
  )
}
export default Model;