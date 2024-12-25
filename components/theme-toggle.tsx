"use client"

import { memo } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export const ThemeToggle: React.FC = memo(function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className='transition-none'
    >
      <Sun
       className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
       aria-hidden="true"
      />
      <Moon
       className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
       aria-hidden="true"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
})

