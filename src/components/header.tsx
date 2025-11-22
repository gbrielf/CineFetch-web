import React from 'react'
// @ts-ignore: allow importing image without type declarations
import logoImage from '../assets/imgs/logotipo-cinefetch.png'

export default function Header() {
  return (
    <header className='flex flex-row items-center justify-between p-8 bg-neutral-900 border-b shadow-sm'>
      <div className='flex items-center'>
        <img 
          src={logoImage} 
          alt="CineFetch Logo" 
          className='h-12 w-auto'
        />
      </div>
      
      <nav className='flex space-x-4'>
        <span className='text-white font-semibold hover:text-gray-800 cursor-pointer'>Home</span>
      </nav>
    </header>
  )
}
