"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import { IconType } from 'react-icons';
import QS from 'query-string';

interface CategoryBoxProps{
    Icon:IconType;
    label:string;
    description?:string;
    selected?:boolean;
}

function CategoryBox({Icon,label,selected}:CategoryBoxProps) {
    const router=useRouter();
    const params=useSearchParams();

    const handleClick=useCallback(()=>{
        let currentQuery={};
        if(params){
            currentQuery=QS.parse(params.toString())
        }
        const updateQuery:any={
            ...currentQuery,
            category:label
        }
        if(params?.get('category')===label){
            delete updateQuery.category;
        }
        const url=QS.stringifyUrl({
            url:"/",
            query:updateQuery
        },{skipNull:true})
        router.push(url)
    },[router,params,label])
  return (
    <div onClick={handleClick} className={`flex flex-col justify-center items-center gap-2 p-3 border-b-2 transition cursor-pointer hover:text-neutral-800 ${selected? "border-b-neutral-800 text-neutral-800":"border-transparent text-neutral-500"}`}>
        <Icon size={26}/>
        <p className="font-medium text-sm">
            {label}
        </p>
    </div>
  )
}

export default CategoryBox;