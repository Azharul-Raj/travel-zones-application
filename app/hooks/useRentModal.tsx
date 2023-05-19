import {create} from 'zustand';
interface RentModalStoreProps{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}

const useRentModal=create<RentModalStoreProps>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default useRentModal;