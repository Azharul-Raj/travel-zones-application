
import {Poppins} from 'next/font/google';
import './globals.css'
import Nav from './components/Nav/Nav';
import Modal from './components/Model/Modal';
import ClientOnly from './components/ClientOnly';

export const metadata = {
  title: 'Travel Zones',
  description: 'Travel zones is a travel related website',
}
 
const font=Poppins({
  subsets: ["latin"],
  weight:["100","400","500","600","700","900"]
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <body className={font.className}>{children}</body> */}
      <body className={font.className}>
        <ClientOnly>
          <Modal actionLabel='MY Btn' isOpen/>
        <Nav/>
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
