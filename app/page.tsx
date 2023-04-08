import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Nav from './components/Nav/Nav'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="">
      <Nav/>
    </div>
  )
}
