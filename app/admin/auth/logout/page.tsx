"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch("/api/logout", { method: "POST" })
      } catch (err) {
        console.error("Logout failed", err)
      } finally {
        router.push("/auth/login")
      }
    }

    logout()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-lg text-muted-foreground">Logging you out...</p>
    </div>
  )
}
