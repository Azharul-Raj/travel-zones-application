"use client"

import Error from "next/error"
import { useEffect } from "react"
import EmptyState from "./components/EmptyState"

interface ErrorProps{
    error:Error
}

const ErrorPage=({error}:ErrorProps)=>{
    useEffect(()=>{
        console.log(error)
    },[error]);

    return(
        <EmptyState
         title="OOH NOOOO!"
         subTitle="Something went wrong"
        />
    )
}

export default ErrorPage;