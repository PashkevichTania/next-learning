"use client"

import { useEffect, useState } from "react"
import { FaCameraRetro } from "react-icons/fa"
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs"
import { Theme } from "@/types"

export default function ThemeButton() {
  const [theme, setTheme] = useState<Theme>("dark")

  const toggleTheme = () => {
    switch (theme) {
      case "dark":
        setTheme("light")
        break
      case "light":
        setTheme("retro")
        break
      case "retro":
        setTheme("dark")
        break
      default:
        return null
    }
  }

  useEffect(() => {
    document.getElementsByTagName("html")[0].setAttribute("data-theme", theme)
  }, [theme])

  const renderIcon = () => {
    switch (theme) {
      case "dark":
        return <BsFillMoonStarsFill />
      case "light":
        return <BsFillSunFill />
      case "retro":
        return <FaCameraRetro />
      default:
        return null
    }
  }
  return (
    <button className="btn" onClick={toggleTheme}>
      {renderIcon()}
    </button>
  )
}
