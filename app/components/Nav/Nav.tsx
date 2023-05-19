import React from 'react'
import Container from '../Container'
import Logo from './Logo/Logo'
import Search from './Search/Search'
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types'
import Categories from './Categories/Categories'

interface NavbarProps{
  currentUser?:SafeUser | null;
}

const Nav:React.FC<NavbarProps> =({currentUser})=> {
  return (
    <div className='fixed z-10 bg-white shadow-sm w-full'>
        <div className="py-4 border-b-[1px]">
       <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                <Logo/>
            <Search/>
            <UserMenu currentUser={currentUser}/>
            </div>
       </Container>
       </div>
       <Categories/>
    </div>
  )
}
export default Nav;