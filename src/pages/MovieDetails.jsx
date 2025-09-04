import React from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {

    const { id } = useParams();

  return (
    <div className='p-6'>
        <h1 className='text-3xl font-bold'>Movie Details for ID: {id}</h1>
    </div>
  )
}