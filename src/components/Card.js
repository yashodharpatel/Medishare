import React from 'react'

const Card = (props) => {
  return (
    <div className='rounded-md w-1/2 '>
        <div className='font-bold text-2xl py-4'>{props.heading}</div>
        <div>{props.description}</div>
    </div>
  )
}

export default Card