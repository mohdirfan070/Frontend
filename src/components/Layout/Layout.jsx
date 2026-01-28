import React from 'react'
import Navbar from '../Navbar/Navbar'
import {Outlet} from  'react-router-dom';
import BottomNav from '../BottomNav/BottomNav';
export default function Layout() {
  return (
    <>
    <Navbar/>
    <main className='h-[80dvh] w-full' >
        <Outlet/>
    </main>
    <footer>
      <BottomNav/>
    </footer>
    </>      
  )
}
