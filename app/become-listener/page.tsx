"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export default function BecomeListener() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      setIsLoading(true)
      // Simulate submission
      setTimeout(() => {
        setIsLoading(false)
        router.push("/listener-application-submitted")
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30">
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="flex items-center gap-2 mb-8">
        <Heart className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">BreathBound</span>
      </div>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Become a Listener</CardTitle>
          <CardDescription className="text-center">
            Step {step} of 3:{" "}
            {step === 1 ? "Basic Information" : step === 2 ? "Experience & Skills" : "Commitment & Agreement"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter your phone number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, Country" required />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Relevant Experience</Label>
                <Textarea
                  id="experience"
                  placeholder="Describe any relevant experience you have in counseling, psychology, or related fields..."
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motivation">Motivation</Label>
                <Textarea
                  id="motivation"
                  placeholder="Why do you want to become a listener on BreathBound?"
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Areas of Expertise (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    "Anxiety",
                    "Depression",
                    "Stress",
                    "Grief",
                    "Relationships",
                    "Family Issues",
                    "Work/Career",
                    "Self-Esteem",
                    "Trauma",
                    "LGBTQ+",
                  ].map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox id={area.toLowerCase().replace(/\s+/g, "-")} />
                      <Label htmlFor={area.toLowerCase().replace(/\s+/g, "-")} className="font-normal">
                        {area}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Time Commitment</h3>
                <p className="text-sm text-muted-foreground">
                  As a listener, we ask that you commit to at least 5 hours per week to support our community.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="availability">Weekly Availability</Label>
                  <Textarea
                    id="availability"
                    placeholder="Please indicate which days and times you are typically available..."
                    className="min-h-[80px]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Code of Conduct</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p>Maintain confidentiality and respect user privacy at all times.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p>Provide non-judgmental support and create a safe space for users.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p>Recognize the limits of your expertise and refer users to professional help when necessary.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p>Complete required training and participate in ongoing education.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-start space-x-2">
                  <Checkbox id="agreement" required />
                  <Label htmlFor="agreement" className="text-sm font-normal">
                    I agree to abide by the BreathBound Code of Conduct and understand that my application will be
                    reviewed before I can become a listener.
                  </Label>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <Button onClick={handleNext} disabled={isLoading}>
            {isLoading ? "Submitting..." : step === 3 ? "Submit Application" : "Continue"}
            {!isLoading && step !== 3 && <ArrowRight className="ml-2 h-4 w-4" />}
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

