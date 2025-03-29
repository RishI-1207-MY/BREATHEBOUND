"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, MessageSquare, Settings, LogOut, Search, Plus, User, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for listeners
const listeners = [
  { id: 1, name: "Listener1", specialties: ["Anxiety", "Stress"], status: "Available", rating: 4.9 },
  { id: 2, name: "Listener2", specialties: ["Depression", "Grief"], status: "Available", rating: 4.8 },
  { id: 3, name: "Listener3", specialties: ["Relationships", "Family"], status: "Busy", rating: 4.7 },
  { id: 4, name: "Listener4", specialties: ["Work", "Career"], status: "Available", rating: 4.9 },
]

// Mock data for past sessions
const pastSessions = [
  { id: 1, listener: "Listener1", date: "2023-05-15", duration: "45 min" },
  { id: 2, listener: "Listener3", date: "2023-05-10", duration: "30 min" },
]

export default function Dashboard() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredListeners = listeners.filter(
    (listener) =>
      listener.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listener.specialties.some((specialty) => specialty.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BreathBound</span>
            <Badge variant="outline" className="ml-2">
              Client
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome, User</h1>

        <Tabs defaultValue="find" className="space-y-8">
          <TabsList>
            <TabsTrigger value="find">Find a Listener</TabsTrigger>
            <TabsTrigger value="sessions">My Sessions</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="find" className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by specialty or listener name..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListeners.map((listener) => (
                <Card key={listener.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{listener.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{listener.name}</CardTitle>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span className="flex items-center">★ {listener.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={listener.status === "Available" ? "outline" : "secondary"}>
                        {listener.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {listener.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      disabled={listener.status !== "Available"}
                      onClick={() => router.push(`/chat/${listener.id}`)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sessions">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Past Sessions</h2>

              {pastSessions.length > 0 ? (
                <div className="space-y-4">
                  {pastSessions.map((session) => (
                    <Card key={session.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{session.listener.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{session.listener}</h3>
                              <p className="text-sm text-muted-foreground">
                                {session.date} • {session.duration}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <User className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            <Button size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Connect Again
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground mb-4">You haven't had any sessions yet.</p>
                    <Button>Find a Listener</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Profile</CardTitle>
                  <CardDescription>Manage your personal information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarFallback className="text-2xl">U</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Username</p>
                            <p>User123</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p>user@example.com</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Member Since</p>
                            <p>May 10, 2023</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Sessions Completed</p>
                            <p>2</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Communication Preferences</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Preferred Communication</p>
                            <p>Text Chat</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Notification Settings</p>
                            <p>Email, In-app</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Change Password</Button>
                  <Button>Edit Profile</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Manage your privacy and security preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Stay Anonymous</h3>
                        <p className="text-sm text-muted-foreground">
                          Your real identity will never be revealed to listeners
                        </p>
                      </div>
                      <Badge>Enabled</Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">End-to-End Encryption</h3>
                        <p className="text-sm text-muted-foreground">All your conversations are encrypted</p>
                      </div>
                      <Badge>Enabled</Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Data Retention</h3>
                        <p className="text-sm text-muted-foreground">
                          Conversation data is automatically deleted after 30 days
                        </p>
                      </div>
                      <Badge>Enabled</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Manage Privacy Settings
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

