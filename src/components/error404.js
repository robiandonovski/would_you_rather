import React from 'react'
import { Link } from 'react-router-dom'

export default function error404() {
  return (
    <div className='questionNotFound center'>
      <div className='error-message'>
        404, page not found
      </div>
      <br />
      <div className='link-to-home'>
        <Link to='/'>Go to the home page</Link>
      </div>
    </div>
  )
}