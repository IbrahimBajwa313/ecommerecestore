"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UserBasicInfo {
  name: string
  email: string
}

export default function UserListClient() {
  const [users, setUsers] = useState<UserBasicInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/auth/user_basic_info")
        const data = await res.json()
        if (res.ok) setUsers(data.data)
      } catch (err) {
        console.error("Failed to load users:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Customers</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-gray-500 text-center py-4">Loading...</div>
        ) : users.length === 0 ? (
          <div className="text-gray-500 text-center py-4">No users found.</div>
        ) : (
          <div className="space-y-4">
            {users.map((user, index) => (
              <div key={index} className="border p-4 rounded-lg bg-muted/40">
                <div className="font-medium text-lg">{user.name}</div>
                <div className="text-muted-foreground">{user.email}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
