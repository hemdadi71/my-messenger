
import Image from 'next/image'
import React from 'react'

interface LoadingProps {
  width: number
  height: number
}

const Loading: React.FC<LoadingProps> = ({ width, height }) => {
  return (
    <Image
      src="/icons/Infinity.svg"
      width={width}
      height={height}
      alt="loading"
      priority
    />
  )
}

export default Loading
