import React from 'react'

const Footer = () => {
  return (
    <footer className='flex flex-col gap-4 px-5 pt-10'style={{backgroundColor:'rgba(23, 26, 31, 1)'}}>

      <div className='border-b-2 px-4 flex justify-between items-center pb-4'>
        <h1 className='text-4xl font-bold text-white text-center'>Campus Event Hub</h1>

        <ul className='flex justify-center space-x-4'>
          <li><a href='#' className='text-gray-400 hover:text-gray-500'>About</a></li>
          <li><a href='#' className='text-gray-400 hover:text-gray-500'>Contact</a></li>
        </ul>

      </div>

      <p className='text-sm text-gray-300 text-center'>&copy; 2023 Campus Event Hub. All rights reserved.</p>
    </footer>  
  )
}

export default Footer
