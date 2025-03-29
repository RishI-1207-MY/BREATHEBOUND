"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Send, Phone, Video, Info, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CallInterface } from "@/components/call-interface"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Message {
  id: number
  sender: "user" | "listener"
  text: string
  timestamp: Date
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "listener",
      text: "Hi there! I'm here to listen. How are you feeling today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
  ])
  const [activeCall, setActiveCall] = useState<"audio" | "video" | null>(null)
  const [incomingCall, setIncomingCall] = useState<"audio" | "video" | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "user",
        text: message,
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate listener response after a delay
      setTimeout(() => {
        const responseMessage: Message = {
          id: messages.length + 2,
          sender: "listener",
          text: "Thank you for sharing that with me. Can you tell me more about how that made you feel?",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, responseMessage])
      }, 3000)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Simulate incoming call after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!activeCall && !incomingCall) {
        // 50% chance of audio or video call
        const callType = Math.random() > 0.5 ? "audio" : "video"
        setIncomingCall(callType)
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [activeCall, incomingCall])

  const startCall = (type: "audio" | "video") => {
    setActiveCall(type)
    setIncomingCall(null)
  }

  const endCall = () => {
    setActiveCall(null)
  }

  const rejectCall = () => {
    setIncomingCall(null)
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <header className="border-b p-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarFallback>L1</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Listener1</div>
              <div className="flex items-center">
                <Badge variant="outline" className="text-xs">
                  Available
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => startCall("audio")} disabled={!!activeCall}>
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => startCall("video")} disabled={!!activeCall}>
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Info className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Report Concern</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">End Session</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Active Call or Chat Messages */}
      {activeCall ? (
        <div className="flex-1">
          <CallInterface callType={activeCall} callerId="user" receiverId="listener1" onEndCall={endCall} />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 bg-muted/20">
          <div className="container space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex gap-3 max-w-[80%]">
                  {msg.sender === "listener" && (
                    <Avatar>
                      <AvatarFallback>L1</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div
                      className={`rounded-lg p-3 ${
                        msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{formatTime(msg.timestamp)}</div>
                  </div>
                  {msg.sender === "user" && (
                    <Avatar>
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Message Input (hidden during call) */}
      {!activeCall && (
        <div className="border-t p-4">
          <div className="container flex gap-2">
            <Textarea
              placeholder="Type a message..."
              className="min-h-[60px] resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button className="self-end" onClick={handleSendMessage} disabled={!message.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Incoming Call Dialog */}
      <Dialog open={!!incomingCall} onOpenChange={() => incomingCall && rejectCall()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Incoming {incomingCall === "audio" ? "Audio" : "Video"} Call</DialogTitle>
            <DialogDescription>Listener1 is calling you</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">L1</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="destructive" onClick={rejectCall}>
              Decline
            </Button>
            <Button onClick={() => startCall(incomingCall as "audio" | "video")}>Accept</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

