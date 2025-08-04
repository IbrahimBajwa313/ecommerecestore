"use client"

import { useState, useEffect } from "react"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface Contact {
  _id: string
  name: string
  email: string
  subject: string
  category: string
  message: string
  createdAt: string
}

export function ContactManagement() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contact")
      if (response.ok) {
        const data = await response.json()
        setContacts(data.data || [])
      } else {
        throw new Error("Failed to fetch contact messages")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch contact messages",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-lg sm:text-2xl">Contact Submissions</CardTitle>
            <Input
              placeholder="Search by name, email or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-80"
            />
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="min-w-[150px]">Message</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.length === 0 && !isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No contact submissions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContacts.map((contact) => (
                    <TableRow key={contact._id}>
                      <TableCell>{contact.name}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.subject}</TableCell>
                      <TableCell className="capitalize">{contact.category}</TableCell>
                      <TableCell>
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {contact.message}
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedContact(contact)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md sm:max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Contact Details</DialogTitle>
                              <DialogDescription>
                                Full message submitted by user
                              </DialogDescription>
                            </DialogHeader>
                            {selectedContact && (
                              <div className="space-y-3 text-sm leading-relaxed">
                                <div>
                                  <strong>Name:</strong> {selectedContact.name}
                                </div>
                                <div>
                                  <strong>Email:</strong> {selectedContact.email}
                                </div>
                                <div>
                                  <strong>Subject:</strong> {selectedContact.subject}
                                </div>
                                <div>
                                  <strong>Category:</strong> {selectedContact.category}
                                </div>
                                <div>
                                  <strong>Submitted:</strong>{" "}
                                  {new Date(selectedContact.createdAt).toLocaleString()}
                                </div>
                                <div>
                                  <strong>Message:</strong>
                                  <div className="whitespace-pre-wrap mt-1 bg-muted p-3 rounded-md border">
                                    {selectedContact.message}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
