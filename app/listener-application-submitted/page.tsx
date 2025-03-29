import Link from "next/link"
import { Heart, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ApplicationSubmitted() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30">
      <div className="flex items-center gap-2 mb-8">
        <Heart className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">BreathBound</span>
      </div>

      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl">Application Submitted!</CardTitle>
          <CardDescription>Thank you for applying to become a listener on BreathBound.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            We've received your application and our team will review it within the next 3-5 business days. You'll
            receive an email with the next steps once your application has been reviewed.
          </p>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">What happens next?</h3>
            <ol className="text-sm text-left space-y-2">
              <li className="flex items-start gap-2">
                <span className="bg-primary/20 text-primary font-medium rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>Application review (3-5 business days)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/20 text-primary font-medium rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>Virtual interview with our team</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/20 text-primary font-medium rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>Background check and verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/20 text-primary font-medium rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <span>Training and onboarding</span>
              </li>
            </ol>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Link href="/" className="w-full">
            <Button className="w-full">
              Return to Home
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            Have questions?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact our support team
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

