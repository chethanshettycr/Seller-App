"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { LogIn, LogOut, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/app/lib/auth"

const SharedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [darkMode, setDarkMode] = useState(false)

  // Check if we're on the login page
  const isLoginPage = pathname === "/seller/login"

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true"
    setDarkMode(isDarkMode)
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())
    document.documentElement.classList.toggle("dark", newDarkMode)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      {!isLoginPage && (
        <header className="bg-background border-b border-border transition-colors duration-300 ease-in-out">
          <div className="container mx-auto flex justify-between items-center p-4">
            <Link href="/" className="text-2xl font-bold text-foreground transition-colors duration-300 ease-in-out">
              CSkit Seller
            </Link>
            <div className="flex items-center space-x-4">
              <Button onClick={toggleDarkMode} variant="outline" size="icon" className="text-foreground">
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
              {user ? (
                <Button onClick={handleLogout} variant="ghost" className="text-foreground">
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </Button>
              ) : (
                <Button onClick={() => router.push("/seller/login")} variant="ghost" className="text-foreground">
                  <LogIn className="mr-2 h-5 w-5" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </header>
      )}
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-background border-t border-border text-foreground transition-colors duration-300 ease-in-out p-4">
        <div className="container mx-auto text-center">
          &copy; 2025 CSkit Seller Platform. All rights reserved. Created by Chethan Shetty
        </div>
      </footer>
    </div>
  )
}

export default SharedLayout

