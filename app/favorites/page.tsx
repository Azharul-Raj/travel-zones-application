import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const FavoritePage=async()=>{
    const currentUser=await getCurrentUser();
    const listings=await getFavoriteListings();
    if(!listings.length){
        return(
            <ClientOnly>
                <EmptyState
                 title="No favorites found"
                 subTitle="Looks like you don't have any favorites listing"
                />
            </ClientOnly>
        )
    }
    return(
        <ClientOnly>
            <FavoritesClient
             listings={listings}
             currentUser={currentUser}
            />
        </ClientOnly>
    )
}
export default FavoritePage;