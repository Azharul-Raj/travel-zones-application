"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import Heading from './Heading';
import Button from './Nav/Button/Button';

interface EmptyStateProps{
    title?:string;
    subTitle?:string;
    showReset?:boolean;
}
function EmptyState({
    showReset,
    subTitle="Try changing or removing some filters",
    title="No Exact matches"
}:EmptyStateProps) {
    const router=useRouter()
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
        <Heading
        center
        title={title}
        subTitle={subTitle}
        />
        <div className="w-48 mt-4">
            {showReset && (
                <Button 
                outline
                label='Remove all filters'
                onClick={()=>router.push('/')}
                />
            )}
        </div>
    </div>
  )
}

export default EmptyState;