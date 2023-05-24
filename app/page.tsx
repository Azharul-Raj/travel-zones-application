
// import { Inter } from 'next/font/google';

import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const isEmpty=true;
  if(isEmpty){
    return(
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {/* listings will be here  */}
        <div className=""></div>
        </div>
      </Container>
    </ClientOnly>
  )
}
