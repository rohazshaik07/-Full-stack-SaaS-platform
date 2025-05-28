"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Star, Zap, Crown, ArrowRight } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    icon: Star,
    features: [
      { name: "Basic resume builder", included: true },
      { name: "3 resume downloads", included: true },
      { name: "Basic ATS scoring", included: true },
      { name: "Email support", included: true },
      { name: "Advanced AI optimization", included: false },
      { name: "Interview simulator", included: false },
      { name: "Job market analysis", included: false },
      { name: "Priority support", included: false },
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For serious job seekers",
    icon: Zap,
    features: [
      { name: "Advanced resume builder", included: true },
      { name: "Unlimited downloads", included: true },
      { name: "Advanced ATS optimization", included: true },
      { name: "Interview simulator", included: true },
      { name: "Job market analysis", included: true },
      { name: "Cover letter generator", included: true },
      { name: "Priority email support", included: true },
      { name: "Custom branding", included: false },
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "per month",
    description: "For teams and organizations",
    icon: Crown,
    features: [
      { name: "Everything in Pro", included: true },
      { name: "Team collaboration", included: true },
      { name: "Custom branding", included: true },
      { name: "API access", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Dedicated support", included: true },
      { name: "Custom integrations", included: true },
      { name: "SLA guarantee", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="pricing" className="py-24 px-6 relative bg-black">
      {/* Grid Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <Crown className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-gray-300 text-sm font-medium">Flexible Pricing</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Plan</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Start free and upgrade as you grow. All plans include our core features with varying levels of AI-powered
            assistance.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-lg ${!isAnnual ? "text-white" : "text-gray-400"}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-8 rounded-full transition-colors ${isAnnual ? "bg-blue-500" : "bg-gray-600"}`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  isAnnual ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-lg ${isAnnual ? "text-white" : "text-gray-400"}`}>
              Annual
              <Badge className="ml-2 bg-green-500/20 text-green-300 border-green-500/30">Save 20%</Badge>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-white/5 backdrop-blur-sm border transition-all duration-500 hover:scale-105 group ${
                plan.popular
                  ? "border-blue-500/50 ring-2 ring-blue-500/20 bg-white/10"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                      : "bg-gradient-to-r from-gray-600 to-gray-700"
                  }`}
                >
                  <plan.icon className="w-8 h-8 text-white" />
                </div>

                <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>
                <p className="text-gray-400 mb-4">{plan.description}</p>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">
                    {plan.price === "$0"
                      ? "$0"
                      : isAnnual
                        ? `$${Number.parseInt(plan.price.slice(1)) * 10}`
                        : plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">
                    {plan.price === "$0" ? plan.period : isAnnual ? "per year" : plan.period}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <Button
                  className={`w-full mb-8 transition-all duration-300 transform hover:scale-105 ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
                  size="lg"
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>

                <div className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                      )}
                      <span className={feature.included ? "text-gray-300" : "text-gray-500"}>{feature.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div
          className={`text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-2xl font-bold text-white mb-4">Questions?</h3>
          <p className="text-gray-400 mb-6">Our team is here to help you choose the right plan for your needs.</p>
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-white/10 transition-all duration-300"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  )
}
