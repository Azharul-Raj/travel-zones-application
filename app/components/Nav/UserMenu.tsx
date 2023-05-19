"use client"
import React,{useState,useCallback} from 'react';
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from './Avatar/Avatar';
import MenuItem from './MenuItem/MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';

interface UserMenuProps{
  currentUser?:SafeUser|null;
}

const UserMenu:React.FC<UserMenuProps> =({currentUser})=> {
  const registerModal=useRegisterModal();
  const LoginModal=useLoginModal();
  const [isOpen,setIsOpen]=useState(false);
  const toggleMenu=useCallback(
    () => {
      setIsOpen(value=>!value)
    },
    [],
  )
  console.log("from 24",currentUser)
  return (
    <div className='relative'>
        <div className="flex items-center gap-3">
            <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer ">
                Airbnb  your home
            </div>
            <div onClick={toggleMenu} className="p-4 md:py-1 md:px-2 transition rounded-full gap-3 border-[1px] flex flex-row items-center hover:shadow-md cursor-pointer ">
                <AiOutlineMenu/>
                <div className="hidden md:block">
                  <Avatar/>
                </div>
            </div>
        </div>
        {
          isOpen && (<div className="absolute rounded-xl shadow-md w-[40vh] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
            <div className="flex flex-col cursor-pointer">
              {
                currentUser? 
                (<>
                <MenuItem label='My trips' onClick={()=>{}}/>
                <MenuItem label='My favorites' onClick={()=>{}}/>
                <MenuItem label='My reservations' onClick={()=>{}}/>
                <MenuItem label='My properties' onClick={()=>{}}/>
                <MenuItem label='Airbnb my home' onClick={()=>{}}/>
                <hr/>
                <MenuItem label='Logout' onClick={signOut}/>
                </>)
                :
                (<>
                <MenuItem label='Login' onClick={LoginModal.onOpen}/>
              <MenuItem label='Sign Up' onClick={registerModal.onOpen}/>
                </>)
              }
            </div>
          </div>)
        }
    </div>
  )
}
export default UserMenu;