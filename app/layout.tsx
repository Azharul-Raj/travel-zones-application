
import {Poppins} from 'next/font/google';
import './globals.css'
import Nav from './components/Nav/Nav';

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
        <Nav/>
        {children}
      </body>
    </html>
  )
}
