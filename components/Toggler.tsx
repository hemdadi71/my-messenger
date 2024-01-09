'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Circle from './Circle'
import { IoSunny } from 'react-icons/io5'
import { FaMoon } from 'react-icons/fa'
import Tooltip from './Tooltip'
export function Toggler() {
  const { setTheme, theme } = useTheme()
  const hendleToggleTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark')
  }
  return (
    <>
      <Tooltip title={theme === 'dark' ? 'Light' : 'Dark'}>
        <div onClick={hendleToggleTheme}>
          {theme === 'dark' ? <IoSunny size={20} /> : <FaMoon size={20} />}
        </div>
      </Tooltip>
    </>
  )
}
