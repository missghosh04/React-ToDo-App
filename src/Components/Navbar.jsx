import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-cyan-950  py-2 text-white w-full gap-15'>
      <div className="logo">
        <span className='font-bold text-xl mx-8 '>STask</span>
      </div>
      <ul className='flex   mx-8 text-white gap-x-10'>
      <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
      <li className='cursor-pointer hover:font-bold transition-all '>Your Tasks</li>
    </ul>
    </nav>
  )
}

export default Navbar
