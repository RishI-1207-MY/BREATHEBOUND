import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Shield, MessageSquare, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BreathBound</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#for-listeners" className="text-sm font-medium hover:text-primary">
              For Listeners
            </Link>
            <Link href="#enterprise" className="text-sm font-medium hover:text-primary">
              Enterprise
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">A Safe Space to Share Your Thoughts</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mb-10">
            Connect anonymously with empathetic listeners who are here to support you through life's challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/become-listener">
              <Button size="lg" variant="outline">
                Become a Listener
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-16">Core Features</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Anonymous & Secure</h3>
              <p className="text-muted-foreground">
                Share your thoughts without revealing your identity. All communications are end-to-end encrypted.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-6">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Communication</h3>
              <p className="text-muted-foreground">
                Connect via text, voice, or video calls with listeners who are ready to support you.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Driven Matching</h3>
              <p className="text-muted-foreground">
                Our system pairs you with listeners who best match your needs and communication style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold mb-6">
                1
              </div>
              <h3 className="text-lg font-semibold mb-3">Create an Account</h3>
              <p className="text-muted-foreground">Sign up anonymously with just a username and password.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold mb-6">
                2
              </div>
              <h3 className="text-lg font-semibold mb-3">Share Your Needs</h3>
              <p className="text-muted-foreground">
                Tell us what's on your mind so we can match you with the right listener.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold mb-6">
                3
              </div>
              <h3 className="text-lg font-semibold mb-3">Connect with a Listener</h3>
              <p className="text-muted-foreground">
                Get matched with an empathetic listener who understands your situation.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold mb-6">
                4
              </div>
              <h3 className="text-lg font-semibold mb-3">Start Your Journey</h3>
              <p className="text-muted-foreground">
                Begin your conversation and take the first step toward feeling better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Be Heard?</h2>
          <p className="text-xl max-w-2xl mb-10 text-primary-foreground/90">
            Join thousands of people who have found support and connection on BreathBound.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started Now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 mt-auto">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Heart className="h-5 w-5 text-primary" />
              <span className="font-bold">BreathBound</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About Us
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground mt-8">
            © {new Date().getFullYear()} BreathBound. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

