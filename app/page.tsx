
// import { Inter } from 'next/font/google';

import getCurrentUser from "./actions/getCurrentUser";
import { getListings } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listing/ListingCard";
import { ListingProps } from "./types";

interface HomeProps{
  searchParams:ListingProps;
}

const Home=async({searchParams}:HomeProps)=> {
  const listings=await getListings(searchParams);
  const currentUser=await getCurrentUser()
  if(!listings.length){
    return(
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className="pt-52 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {/* listings will be here  */}
        {/* <div className=""> */}
          {
            listings.map((listing,i)=>(
              <ListingCard key={i} data={listing} currentUser={currentUser}/>
            ))
          }
        {/* </div> */}
        </div>
      </Container>
    </ClientOnly>
  )
}
export default Home;