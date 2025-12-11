import React, { Children } from 'react'

const Spanner = ({text}) => {
  return (
    <span className='bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent font-bold'>
        {text}
    </span>
  )
}

export default Spanner