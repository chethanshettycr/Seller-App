import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/app/lib/auth"
import SharedLayout from "@/components/SharedLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CSkit",
  description: "Your all-in-one platform for the construction industry",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SharedLayout>{children}</SharedLayout>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'