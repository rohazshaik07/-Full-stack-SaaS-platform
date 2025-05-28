import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { PracticeInterviews } from "@/components/practice-interviews"
import { ResumeBuilder } from "@/components/resume-builder"
import { InterviewSimulator } from "@/components/interview-simulator"
import { FAQs } from "@/components/faqs"
import { CommenceJourney } from "@/components/commence-journey"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Features />
      <PracticeInterviews />
      <ResumeBuilder />
      <InterviewSimulator />
      <FAQs />
      <CommenceJourney />
      <Footer />
    </main>
  )
}
