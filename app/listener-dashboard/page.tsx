"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Heart,
  Settings,
  LogOut,
  Users,
  MessageSquare,
  Clock,
  User,
  Bell,
  CheckCircle,
  XCircle,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for client requests
const clientRequests = [
  {
    id: 1,
    username: "User1",
    topic: "Anxiety",
    message: "I've been feeling anxious about my upcoming job interview...",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: "pending",
  },
  {
    id: 2,
    username: "User2",
    topic: "Stress",
    message: "Work has been really stressful lately and I'm having trouble coping...",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    status: "pending",
  },
]

// Mock data for active sessions
const activeSessions = [
  {
    id: 1,
    username: "User3",
    topic: "Depression",
    lastActive: new Date(Date.now() - 1000 * 60 * 5),
    duration: "45 min",
  },
]

// Mock data for upcoming sessions
const upcomingSessions = [
  {
    id: 1,
    username: "User4",
    topic: "Relationships",
    scheduledTime: new Date(Date.now() + 1000 * 60 * 60 * 2),
    duration: "30 min",
  },
  {
    id: 2,
    username: "User5",
    topic: "Family Issues",
    scheduledTime: new Date(Date.now() + 1000 * 60 * 60 * 24),
    duration: "60 min",
  },
]

export default function ListenerDashboard() {
  const router = useRouter()
  const [isAvailable, setIsAvailable] = useState(true)
  const [selectedTimeZone, setSelectedTimeZone] = useState("UTC")

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Calculate time ago
  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    let interval = seconds / 31536000
    if (interval > 1) return Math.floor(interval) + " years ago"

    interval = seconds / 2592000
    if (interval > 1) return Math.floor(interval) + " months ago"

    interval = seconds / 86400
    if (interval > 1) return Math.floor(interval) + " days ago"

    interval = seconds / 3600
    if (interval > 1) return Math.floor(interval) + " hours ago"

    interval = seconds / 60
    if (interval > 1) return Math.floor(interval) + " minutes ago"

    return Math.floor(seconds) + " seconds ago"
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BreathBound</span>
            <Badge variant="outline" className="ml-2">
              Listener
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
              <AvatarFallback>L1</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Listener Dashboard</h1>
            <p className="text-muted-foreground">Manage your sessions and help those in need</p>
          </div>

          <Card className="w-full md:w-auto">
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${isAvailable ? "bg-green-500" : "bg-red-500"}`}></div>
                <Label htmlFor="availability-toggle">{isAvailable ? "Available" : "Unavailable"}</Label>
              </div>
              <Switch id="availability-toggle" checked={isAvailable} onCheckedChange={setIsAvailable} />
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <span className="text-2xl font-bold">12</span>
              </div>
              <h3 className="mt-2 font-medium">Total Clients</h3>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <span className="text-2xl font-bold">28</span>
              </div>
              <h3 className="mt-2 font-medium">Sessions</h3>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <span className="text-2xl font-bold">42h</span>
              </div>
              <h3 className="mt-2 font-medium">Hours Listened</h3>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-primary/10 p-2 rounded-full">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <span className="text-2xl font-bold">4.9</span>
              </div>
              <h3 className="mt-2 font-medium">Rating</h3>
              <p className="text-sm text-muted-foreground">Average</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="requests" className="space-y-8">
          <TabsList>
            <TabsTrigger value="requests">Client Requests</TabsTrigger>
            <TabsTrigger value="active">Active Sessions</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="availability">My Availability</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Pending Requests</h2>
              <Select defaultValue={selectedTimeZone} onValueChange={setSelectedTimeZone}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                  <SelectItem value="CST">Central Time (CST)</SelectItem>
                  <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {clientRequests.length > 0 ? (
              <div className="space-y-4">
                {clientRequests.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarFallback>{request.username.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{request.username}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{request.topic}</Badge>
                              <span className="text-xs text-muted-foreground">{timeAgo(request.timestamp)}</span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{request.message}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 self-end md:self-center">
                          <Button variant="outline" size="sm">
                            <XCircle className="h-4 w-4 mr-1" />
                            Decline
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Accept
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
                  <p className="text-muted-foreground mb-4">No pending requests at the moment.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <h2 className="text-xl font-semibold">Active Sessions</h2>

            {activeSessions.length > 0 ? (
              <div className="space-y-4">
                {activeSessions.map((session) => (
                  <Card key={session.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarFallback>{session.username.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{session.username}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{session.topic}</Badge>
                              <Badge variant="secondary">In Progress</Badge>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Last active: {timeAgo(session.lastActive)} • Duration: {session.duration}
                            </p>
                          </div>
                        </div>
                        <Button onClick={() => router.push(`/chat/${session.id}`)}>
                          Continue Session
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-4">No active sessions at the moment.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <h2 className="text-xl font-semibold">Upcoming Sessions</h2>

            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarFallback>{session.username.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{session.username}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{session.topic}</Badge>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Scheduled: {formatDate(session.scheduledTime)} at {formatTime(session.scheduledTime)} •
                              Duration: {session.duration}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 self-end md:self-center">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button size="sm">Start Session</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-4">No upcoming sessions scheduled.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">My Availability</h2>
              <Button>Update Schedule</Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Weekly Schedule</h3>
                    <div className="space-y-4">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <div key={day} className="flex items-center justify-between">
                          <span>{day}</span>
                          <div className="text-sm">
                            {day === "Saturday" || day === "Sunday" ? (
                              <span className="text-muted-foreground">Not Available</span>
                            ) : (
                              "9:00 AM - 5:00 PM"
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Time Off</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Vacation</span>
                        <span className="text-sm">Jun 15 - Jun 22, 2023</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-medium mb-4">Specialties</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge>Anxiety</Badge>
                        <Badge>Depression</Badge>
                        <Badge>Stress</Badge>
                        <Badge>Relationships</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

