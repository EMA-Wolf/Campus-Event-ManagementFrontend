import React from 'react'
import { Hourglass } from 'react-loader-spinner'

const CancelDialoguebox = ({onClick, onClose, isDeleted }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-gray-300 p-4 rounded-md h-64 w-5/12 flex flex-col justify-center items-center gap-4'>
        <h1 className='text-black text-2xl font-bold'>Are you sure you want to cancel the RSVP?</h1>
        <div className='flex justify-center items-center gap-4'>
            <button disabled={isDeleted} onClick={onClick} className='bg-red-600 text-white px-10 py-3 rounded-md text-3xl'>{isDeleted ? < Hourglass
                                visible={true}
                                height="32 "
                                width="32"
                                ariaLabel="hourglass-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                colors={['#306cce', '#72a1ed']} /> : "Yes"}</button>
            <button onClick={onClose} className='bg-black text-white px-10 py-3 rounded-md text-3xl'>No</button>
        </div>
      </div>
    </div>
  )
}

export default CancelDialoguebox
