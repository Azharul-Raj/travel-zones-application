"use client"
import React,{useState,useCallback} from 'react';
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from './Avatar/Avatar';
import MenuItem from './MenuItem/MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signIn, signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface UserMenuProps{
  currentUser?:SafeUser|null;
}

const UserMenu:React.FC<UserMenuProps> =({currentUser})=> {
  const router=useRouter();
  const registerModal=useRegisterModal();
  const LoginModal=useLoginModal();
  const rentModal=useRentModal()
  
  const [isOpen,setIsOpen]=useState(false);
  const toggleMenu=useCallback(
    () => {
      setIsOpen(value=>!value)
    },
    [],
  )
  // rent modal
  const openRentModal=useCallback(()=>{
    if(!currentUser){
     return registerModal.onOpen()
    }
    // rent modal open
    rentModal.onOpen()
  },[registerModal,currentUser,rentModal])
  const demoLogin=()=>{
    signIn('credentials',{
      email:'raj@gmail.com',
      password:'123456',
      redirect:false
    })
    .then(callback=>{
      if(callback?.ok){
        toast.success('Successfully loggedIn');
        router.refresh()
      }      
      if(callback?.error){
        toast.error(callback?.error)
      }
    })
  }
  return (
    <div className='relative'>
        <div className="flex items-center gap-3">
            <div onClick={openRentModal} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer ">
                Airbnb  your home
            </div>
            <div onClick={toggleMenu} className="p-4 md:py-1 md:px-2 transition rounded-full gap-3 border-[1px] flex flex-row items-center hover:shadow-md cursor-pointer ">
                <AiOutlineMenu/>
                <div className="hidden md:block">
                  <Avatar image={currentUser?.image}/>
                </div>
            </div>
        </div>
        {
          isOpen && (<div className="absolute rounded-xl shadow-md w-[40vh] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
            <div className="flex flex-col cursor-pointer">
              {
                currentUser? 
                (<>
                <MenuItem label='My trips' onClick={()=>router.push('/trips')}/>
                <MenuItem label='My favorites' onClick={()=>router.push('/favorites')}/>
                <MenuItem label='My reservations' onClick={()=>router.push('/reservations')}/>
                <MenuItem label='My properties' onClick={()=>router.push('/properties')}/>
                <MenuItem label='Airbnb my home' onClick={openRentModal}/>
                <hr/>
                <MenuItem label='Logout' onClick={signOut}/>
                </>)
                :
                (<>
                <MenuItem label='Login' onClick={LoginModal.onOpen}/>
              <MenuItem label='Sign Up' onClick={registerModal.onOpen}/>
              <MenuItem label='Demo Login' onClick={demoLogin}/>
                </>)
              }
            </div>
          </div>)
        }
    </div>
  )
}
export default UserMenu;