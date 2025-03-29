"use client"

import { useState } from "react"
import {
  Heart,
  Settings,
  LogOut,
  Users,
  Calendar,
  DollarSign,
  BarChart,
  Shield,
  CheckCircle,
  XCircle,
  ChevronRight,
  Search,
  AlertTriangle,
  UserCheck,
  UserX,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for pending therapist applications
const pendingTherapists = [
  {
    id: 1,
    name: "Dr. Jane Smith",
    email: "jane.smith@example.com",
    specialty: "Anxiety, Depression",
    experience: "5 years",
    appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: 2,
    name: "Dr. John Doe",
    email: "john.doe@example.com",
    specialty: "Trauma, PTSD",
    experience: "8 years",
    appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
]

// Mock data for reported issues
const reportedIssues = [
  {
    id: 1,
    reportedBy: "User123",
    reportedUser: "Listener456",
    issue: "Inappropriate behavior during session",
    severity: "High",
    reportedDate: new Date(Date.now() - 1000 * 60 * 60 * 12),
    status: "Pending",
  },
  {
    id: 2,
    reportedBy: "User789",
    reportedUser: "Listener234",
    issue: "Unresponsive to messages",
    severity: "Medium",
    reportedDate: new Date(Date.now() - 1000 * 60 * 60 * 36),
    status: "Investigating",
  },
]

// Mock data for users
const users = [
  { id: 1, name: "User1", role: "Client", joinDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), status: "Active" },
  {
    id: 2,
    name: "Listener1",
    role: "Listener",
    joinDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25),
    status: "Active",
  },
  {
    id: 3,
    name: "User2",
    role: "Client",
    joinDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
    status: "Inactive",
  },
  {
    id: 4,
    name: "Listener2",
    role: "Listener",
    joinDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    status: "Active",
  },
  { id: 5, name: "User3", role: "Client", joinDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), status: "Active" },
]

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Filter users based on search and role filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = filterRole === "all" || user.role.toLowerCase() === filterRole.toLowerCase()
    return matchesSearch && matchesRole
  })

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BreathBound</span>
            <Badge variant="destructive" className="ml-2">
              Admin
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage platform users, therapists, and reports</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <span className="text-2xl font-bold">1,245</span>
              </div>
              <h3 className="mt-2 font-medium">Total Users</h3>
              <p className="text-sm text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <span className="text-2xl font-bold">856</span>
              </div>
              <h3 className="mt-2 font-medium">Sessions</h3>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-primary/10 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <span className="text-2xl font-bold">$8,245</span>
              </div>
              <h3 className="mt-2 font-medium">Revenue</h3>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-primary/10 p-2 rounded-full">
                  <BarChart className="h-5 w-5 text-primary" />
                </div>
                <span className="text-2xl font-bold">92%</span>
              </div>
              <h3 className="mt-2 font-medium">Satisfaction</h3>
              <p className="text-sm text-muted-foreground">Average rating</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="therapists" className="space-y-8">
          <TabsList>
            <TabsTrigger value="therapists">Therapist Applications</TabsTrigger>
            <TabsTrigger value="reports">Reported Issues</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="therapists" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Pending Therapist Applications</h2>
              <Button>View All Applications</Button>
            </div>

            {pendingTherapists.length > 0 ? (
              <div className="space-y-4">
                {pendingTherapists.map((therapist) => (
                  <Card key={therapist.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarFallback>{therapist.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{therapist.name}</h3>
                            <p className="text-sm text-muted-foreground">{therapist.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{therapist.specialty}</Badge>
                              <span className="text-xs">{therapist.experience} experience</span>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Applied: {formatDate(therapist.appliedDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 self-end md:self-center">
                          <Button variant="outline" size="sm">
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button variant="secondary" size="sm">
                            View Details
                            <ChevronRight className="h-4 w-4 ml-1" />
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
                  <p className="text-muted-foreground mb-4">No pending applications at the moment.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Reported Issues</h2>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Issues</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {reportedIssues.length > 0 ? (
              <div className="space-y-4">
                {reportedIssues.map((issue) => (
                  <Card key={issue.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-red-100 p-2 rounded-full">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">Report #{issue.id}</h3>
                              <Badge
                                variant={
                                  issue.severity === "High"
                                    ? "destructive"
                                    : issue.severity === "Medium"
                                      ? "default"
                                      : "outline"
                                }
                              >
                                {issue.severity}
                              </Badge>
                              <Badge variant="outline">{issue.status}</Badge>
                            </div>
                            <p className="mt-1 text-sm">{issue.issue}</p>
                            <div className="mt-2 text-xs text-muted-foreground">
                              <span>Reported by: {issue.reportedBy}</span>
                              <span className="mx-2">•</span>
                              <span>Against: {issue.reportedUser}</span>
                              <span className="mx-2">•</span>
                              <span>Date: {formatDate(issue.reportedDate)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 self-end md:self-center">
                          <Button variant="outline" size="sm">
                            Dismiss
                          </Button>
                          <Button size="sm">Investigate</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-4">No reported issues at the moment.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-xl font-semibold">User Management</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-10 w-full md:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-full md:w-[150px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="client">Clients</SelectItem>
                    <SelectItem value="listener">Listeners</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Add User</Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {user.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.role === "Client" ? "outline" : "secondary"}>{user.role}</Badge>
                        </TableCell>
                        <TableCell>{formatDate(user.joinDate)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <div
                              className={`h-2 w-2 rounded-full ${user.status === "Active" ? "bg-green-500" : "bg-gray-300"}`}
                            ></div>
                            <span>{user.status}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Shield className="h-4 w-4" />
                              <span className="sr-only">Permissions</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              {user.status === "Active" ? (
                                <UserX className="h-4 w-4 text-destructive" />
                              ) : (
                                <UserCheck className="h-4 w-4 text-green-500" />
                              )}
                              <span className="sr-only">Toggle Status</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                              <span className="sr-only">View Details</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredUsers.length} of {users.length} users
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Platform Analytics</h2>
              <Select defaultValue="month">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last 7 days</SelectItem>
                  <SelectItem value="month">Last 30 days</SelectItem>
                  <SelectItem value="quarter">Last 90 days</SelectItem>
                  <SelectItem value="year">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>New user registrations over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would go here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Session Activity</CardTitle>
                  <CardDescription>Number of sessions conducted</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would go here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue</CardTitle>
                  <CardDescription>Platform revenue over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would go here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Retention</CardTitle>
                  <CardDescription>User retention rates</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would go here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

