import React from 'react'
import { SafeListing, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listing/ListingCard';

interface FavoritesClientProps{
    listings:SafeListing[];
    currentUser?:SafeUser | null;
}
function FavoritesClient({listings,currentUser}:FavoritesClientProps) {
  return (
    <Container>
        <div className="pt-28">
            <Heading
             title='Favorites'
             subTitle='List of places you have favorited'
            />
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {
                listings.map(listing=>(
                <ListingCard 
                data={listing} 
                key={listing.id} 
                currentUser={currentUser}
                />))
            }
        </div>
    </Container>
  )
}

export default FavoritesClient;