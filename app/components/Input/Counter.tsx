import React,{useCallback} from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterProps{
    title:string;
    subTitle:string;
    value:number;
    onChange:(value:number)=>void;
}
function Counter({title,subTitle,value,onChange}:CounterProps) {
    // increase the counter value
    const onIncrease=useCallback(()=>{
        onChange(value+1)
    },[value,onChange])
    // decrease the counter value
    const onDecrease=useCallback(()=>{
        if(value===1) return;
        onChange(value-1)
    },[value,onChange])
  return (
    <div className="flex items-center justify-between">
        {/* left */}
        <div className="flex flex-col">
            <div className="font-medium">
                {title}
            </div>
            <div className="text-gray-600">
                {subTitle}
            </div>
        </div>
        {/* right */}
        <div className="flex items-center gap-4">
            <div 
            onClick={onDecrease} 
            className="h-10 w-10 flex justify-center items-center rounded-full border-[1px] border-neutral-400 text-neutral-700 hover:opacity-80  cursor-pointer">
                <AiOutlineMinus/> 
            </div>
                <div className="text-xl text-neutral-600">{value}</div>
            <div 
            onClick={onIncrease} 
            className="h-10 w-10 flex justify-center items-center rounded-full border-[1px] border-neutral-400 text-neutral-700 hover:opacity-80  cursor-pointer">
                <AiOutlinePlus/> 
            </div>
        </div>
    </div>
  )
}

export default Counter;