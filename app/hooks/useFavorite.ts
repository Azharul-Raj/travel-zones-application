    import { useRouter } from "next/navigation";
    import { SafeUser } from "../types";
    import useLoginModal from "./useLoginModal";
    import { useCallback, useMemo } from "react";
    import axios from "axios";
    import { toast } from "react-hot-toast";

    interface UseFavoriteProps{
        listingId:string;
        currentUser?:SafeUser | null;    
    }

    const useFavorite=({listingId,currentUser}:UseFavoriteProps)=>{
        const router=useRouter();
        const loginModal=useLoginModal();

        const hasFavorite=useMemo(()=>{
            const list=currentUser?.favoriteIds || []
            return list.includes(listingId)
        },[currentUser,listingId])

        const toggleFavorite=useCallback(async(
            e:React.MouseEvent<HTMLDivElement>
        )=>{
            e.stopPropagation();
            if(!currentUser){
                return loginModal.onOpen()
            }
            try {
                let request;
                if(hasFavorite){
                    request=()=>axios.delete(`/api/favorites/${listingId}`)
                } else{
                    request=()=>axios.post(`/api/favorites/${listingId}`)
                }
                await request()
                router.refresh();
                toast.success('success')
            } catch (error:any) {
                toast.error(error.message)
            }
        },[currentUser,listingId,hasFavorite,router])

        return {
            hasFavorite,
            toggleFavorite
        }
    }

    export default useFavorite;