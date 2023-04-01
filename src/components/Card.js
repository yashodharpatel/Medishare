import React from 'react'

const Card = (props) => {
  return (
    <div className='rounded-md py-4 px-8'>
        <div className='font-bold text-2xl pb-4 text-center'>{props.heading}</div>
        <div className='text-justify'>{props.description}</div>
    </div>
  )
}

export default Card