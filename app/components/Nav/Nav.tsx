import React from 'react'
import Container from '../Container'
import Logo from './Logo/Logo'


export default function Nav():JSX.Element {
  return (
    <div className='fixed z-10 bg-white shadow-sm w-full'>
        <div className="py-4 border-b-[1px]">
       <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                <Logo/>
            </div>
       </Container>
       </div>
    </div>
  )
}
