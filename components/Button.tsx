import React from 'react'
import Loading from './Loading'
import clsx from 'clsx'

interface ButtonProps {
  type?: 'submit' | 'button'
  disabled?: boolean
  title: string
  isLoading?: boolean
  primary?: boolean
  danger?: boolean
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  type,
  disabled,
  title,
  isLoading,
  primary,
  danger,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isLoading}
      className={clsx(
        'w-full flex items-center gap-2 relative justify-center py-1 text-gray-900 rounded-full my-3 addTransition',
        primary && 'bg-blue-300 hover:bg-blue-400',
        danger && 'bg-red-400 hover:bg-red-500'
      )}>
      <div className="flex items-center gap-2">
        {isLoading ? (
          <Loading width={25} height={10} />
        ) : (
          <p className="font-semibold">{title}</p>
        )}
      </div>
    </button>
  )
}

export default Button
