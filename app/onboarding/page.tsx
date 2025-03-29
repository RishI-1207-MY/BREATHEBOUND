"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Onboarding() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [reason, setReason] = useState("")
  const [preferredCommunication, setPreferredCommunication] = useState("text")

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      setIsLoading(true)
      // Simulate completion
      setTimeout(() => {
        setIsLoading(false)
        router.push("/dashboard")
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30">
      <div className="flex items-center gap-2 mb-8">
        <Heart className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">BreathBound</span>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Let's Get Started</CardTitle>
          <CardDescription className="text-center">
            Step {step} of 3:{" "}
            {step === 1 ? "Why You're Here" : step === 2 ? "Communication Preferences" : "Privacy Settings"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                To help us match you with the right listener, please tell us why you're seeking support today.
              </p>
              <Textarea
                placeholder="I'm feeling..."
                className="min-h-[150px]"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">How would you prefer to communicate with listeners?</p>
              <RadioGroup
                defaultValue={preferredCommunication}
                onValueChange={setPreferredCommunication}
                className="space-y-3"
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="text" id="text" />
                  <Label htmlFor="text" className="font-normal">
                    <span className="font-medium">Text Chat</span>
                    <p className="text-sm text-muted-foreground">Type messages back and forth with your listener.</p>
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="voice" id="voice" />
                  <Label htmlFor="voice" className="font-normal">
                    <span className="font-medium">Voice Call</span>
                    <p className="text-sm text-muted-foreground">
                      Speak directly with your listener through an encrypted voice call.
                    </p>
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="video" id="video" />
                  <Label htmlFor="video" className="font-normal">
                    <span className="font-medium">Video Call</span>
                    <p className="text-sm text-muted-foreground">
                      Connect face-to-face with your listener through an encrypted video call.
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Your privacy is our top priority. Choose your privacy settings below.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="anonymous" className="font-normal">
                    <span className="font-medium">Stay Anonymous</span>
                    <p className="text-sm text-muted-foreground">
                      Your real identity will never be revealed to listeners.
                    </p>
                  </Label>
                  <div className="bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded">Default</div>
                </div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="encryption" className="font-normal">
                    <span className="font-medium">End-to-End Encryption</span>
                    <p className="text-sm text-muted-foreground">
                      All your conversations are encrypted and cannot be accessed by anyone else.
                    </p>
                  </Label>
                  <div className="bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded">Default</div>
                </div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="data" className="font-normal">
                    <span className="font-medium">Data Retention</span>
                    <p className="text-sm text-muted-foreground">
                      Conversation data is automatically deleted after 30 days.
                    </p>
                  </Label>
                  <div className="bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded">Default</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleNext} className="w-full" disabled={(step === 1 && !reason) || isLoading}>
            {isLoading ? "Finalizing..." : step === 3 ? "Complete Setup" : "Continue"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-6 flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`h-2 w-2 rounded-full ${i === step ? "bg-primary" : "bg-muted-foreground/30"}`} />
        ))}
      </div>
    </div>
  )
}

