
import {Poppins} from 'next/font/google';
import './globals.css'
import Nav from './components/Nav/Nav';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/Model/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/Model/LoginModal';
import getCurrentUser from './actions/getCurrentUser';

export const metadata = {
  title: 'Travel Zones',
  description: 'Travel zones is a travel related website',
}
 
const font=Poppins({
  subsets: ["latin"],
  weight:["100","400","500","600","700","900"]
})
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser= await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}
      suppressHydrationWarning={true}
      >
        <ClientOnly>
          <ToasterProvider/>
          <RegisterModal/>
          <LoginModal/>
        <Nav currentUser={currentUser}/>
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
