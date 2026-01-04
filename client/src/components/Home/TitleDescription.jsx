import React from 'react'

const TitleDescription = ({title, desc}) => {
  return (
    <div>
      <h1 className='text-3xl font-semibold text-center mx-auto my-4 text-gray-900'>{title}</h1>
      <p className='text-xl text-gray-600 max-w-5xl mx-auto'>{desc}</p>
    </div>
  )
}

export default TitleDescription
