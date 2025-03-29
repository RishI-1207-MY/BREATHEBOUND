"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, MicOff, Video, VideoOff, PhoneOff, MonitorSmartphone } from "lucide-react"
import { cn } from "@/lib/utils"

interface CallInterfaceProps {
  callType: "audio" | "video"
  callerId: string
  receiverId: string
  onEndCall: () => void
}

export function CallInterface({ callType, callerId, receiverId, onEndCall }: CallInterfaceProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [callDuration, setCallDuration] = useState(0)

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  // Simulate call connection
  useEffect(() => {
    const connectTimer = setTimeout(() => {
      setIsConnected(true)

      // If this is a video call, simulate video streams
      if (callType === "video" && localVideoRef.current) {
        // In a real implementation, this would use WebRTC to get user media
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream
            }
            // In a real implementation, the remote video would come from WebRTC
            if (remoteVideoRef.current) {
              // This is just for demo purposes - in a real app, this would be the remote peer's stream
              setTimeout(() => {
                if (remoteVideoRef.current) {
                  remoteVideoRef.current.srcObject = stream
                }
              }, 1000)
            }
          })
          .catch((err) => {
            console.error("Error accessing media devices:", err)
          })
      }
    }, 2000)

    return () => {
      clearTimeout(connectTimer)

      // Clean up media streams when component unmounts
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [callType])

  // Call timer
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isConnected])

  // Format call duration as MM:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)

    // In a real implementation, this would mute the audio track
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream
      stream.getAudioTracks().forEach((track) => {
        track.enabled = isMuted
      })
    }
  }

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff)

    // In a real implementation, this would disable the video track
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream
      stream.getVideoTracks().forEach((track) => {
        track.enabled = isVideoOff
      })
    }
  }

  const toggleScreenShare = () => {
    if (!isScreenSharing) {
      navigator.mediaDevices
        .getDisplayMedia({ video: true })
        .then((stream) => {
          setIsScreenSharing(true)
          if (localVideoRef.current) {
            // Save the current video track to restore later
            const currentStream = localVideoRef.current.srcObject as MediaStream
            const videoTrack = currentStream.getVideoTracks()[0]

            // Replace with screen share track
            currentStream.removeTrack(videoTrack)
            currentStream.addTrack(stream.getVideoTracks()[0])

            // When screen sharing stops
            stream.getVideoTracks()[0].onended = () => {
              setIsScreenSharing(false)
              // Restore camera
              if (localVideoRef.current) {
                navigator.mediaDevices.getUserMedia({ video: true }).then((camStream) => {
                  const currentStream = localVideoRef.current!.srcObject as MediaStream
                  const screenTrack = currentStream.getVideoTracks()[0]
                  currentStream.removeTrack(screenTrack)
                  currentStream.addTrack(camStream.getVideoTracks()[0])
                })
              }
            }
          }
        })
        .catch((err) => {
          console.error("Error sharing screen:", err)
          setIsScreenSharing(false)
        })
    } else {
      setIsScreenSharing(false)
      // In a real implementation, stop screen sharing and restore camera
      if (localVideoRef.current) {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          const currentStream = localVideoRef.current!.srcObject as MediaStream
          const screenTrack = currentStream.getVideoTracks()[0]
          currentStream.removeTrack(screenTrack)
          currentStream.addTrack(stream.getVideoTracks()[0])
        })
      }
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 relative bg-black">
        {/* Call status overlay */}
        {!isConnected && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-medium">
            Connecting...
          </div>
        )}

        {/* Call timer */}
        {isConnected && (
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {formatDuration(callDuration)}
          </div>
        )}

        {/* Video containers */}
        {callType === "video" ? (
          <div className="h-full w-full relative">
            {/* Remote video (full screen) */}
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className={cn("h-full w-full object-cover", isVideoOff && "hidden")}
            />

            {/* Local video (picture-in-picture) */}
            <div className="absolute bottom-4 right-4 w-1/4 max-w-[200px] aspect-video rounded-lg overflow-hidden border-2 border-white shadow-lg">
              <video ref={localVideoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
            </div>
          </div>
        ) : (
          // Audio call display
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center">
                <div className="text-4xl font-bold text-primary">{receiverId.charAt(0).toUpperCase()}</div>
              </div>
              <h2 className="text-xl font-medium text-white mb-2">{isConnected ? "Connected" : "Calling..."}</h2>
              {isConnected && <p className="text-white/70">{formatDuration(callDuration)}</p>}
            </div>
          </div>
        )}
      </div>

      {/* Call controls */}
      <Card className="p-4 flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className={cn(isMuted && "bg-destructive text-destructive-foreground")}
          onClick={toggleMute}
        >
          {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>

        {callType === "video" && (
          <>
            <Button
              variant="outline"
              size="icon"
              className={cn(isVideoOff && "bg-destructive text-destructive-foreground")}
              onClick={toggleVideo}
            >
              {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              className={cn(isScreenSharing && "bg-primary text-primary-foreground")}
              onClick={toggleScreenShare}
            >
              <MonitorSmartphone className="h-5 w-5" />
            </Button>
          </>
        )}

        <Button variant="destructive" size="icon" onClick={onEndCall}>
          <PhoneOff className="h-5 w-5" />
        </Button>
      </Card>
    </div>
  )
}

