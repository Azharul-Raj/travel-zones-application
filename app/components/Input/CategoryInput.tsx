import React from 'react'
import { IconType } from 'react-icons';

interface CategoryInputProps{
    icon:IconType;
    label:string;
    selected?:boolean;
    onClick:(value:string)=>void;
    description?:string
}
function CategoryInput({icon:Icon,label,selected,onClick}:CategoryInputProps) {
  
  return (
    <div 
    onClick={()=>onClick(label)}
    className={`flex flex-col gap-3 p-2 border-2 rounded-xl transition cursor-pointer hover:border-black ${selected?"border-black":"border-neutral-200"}`}
    >
      <Icon size={30}/>
      <div className="font-semibold">
        {
          label
        }
      </div>
    </div>
  )
}

export default CategoryInput;