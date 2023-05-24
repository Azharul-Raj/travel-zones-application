
// import { Inter } from 'next/font/google';

import { getListings } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listing/ListingCard";

// const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const listings=await getListings()
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
            listings.map(listing=>(
              <ListingCard data={listing}/>
            ))
          }
        {/* </div> */}
        </div>
      </Container>
    </ClientOnly>
  )
}
