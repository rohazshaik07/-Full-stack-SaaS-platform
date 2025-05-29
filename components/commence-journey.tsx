"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown, ArrowRight, Sparkles, ExternalLink } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    id: "basic",
    name: "Basic Plan",
    priceMonthly: 0,
    priceYearly: 0,
    period: "forever",
    description: "Perfect for getting started",
    icon: Star,
    features: [
      "Basic resume builder",
      "3 resume downloads per month",
      "Basic ATS scoring",
      "Email support",
      "Community access",
    ],
    cta: "Get Started Free",
    popular: false,
    paymentUrl: null,
  },
  {
    id: "pro",
    name: "Pro Plan",
    priceMonthly: 199,
    priceYearly: 1999,
    originalYearly: 2388, // 199 * 12
    period: "per month",
    description: "Perfect for individual job seekers",
    icon: Zap,
    features: [
      "Advanced resume builder",
      "Unlimited downloads",
      "Advanced ATS optimization",
      "Interview simulator",
      "Job market analysis",
      "Cover letter generator",
      "Priority email support",
    ],
    cta: "Start Pro Plan",
    popular: true,
    paymentUrl: "https://payments.cashfree.com/forms/tnemyapnoitacilppasaaS",
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    priceMonthly: 499,
    priceYearly: 3999,
    originalYearly: 5988, // 499 * 12
    period: "per month",
    description: "For teams and organizations",
    icon: Crown,
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Custom branding",
      "API access",
      "Advanced analytics",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Get Enterprise",
    popular: false,
    paymentUrl: "https://payments.cashfree.com/forms/tnemyapnoitacilppasaaS",
  },
]

export function CommenceJourney() {
  const [isVisible, setIsVisible] = useState(false)
  const [isYearly, setIsYearly] = useState(false)
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

  const handlePlanClick = (plan: (typeof plans)[0]) => {
    if (plan.paymentUrl) {
      window.open(plan.paymentUrl, "_blank", "noopener,noreferrer")
    }
  }

  const getDisplayPrice = (plan: (typeof plans)[0]) => {
    if (plan.priceMonthly === 0) return "₹0"

    if (isYearly) {
      return `₹${plan.priceYearly}`
    }

    return `₹${plan.priceMonthly}`
  }

  const getSavingsAmount = (plan: (typeof plans)[0]) => {
    if (!plan.originalYearly || plan.priceMonthly === 0) return 0
    const savings = plan.originalYearly - plan.priceYearly
    return Math.round((savings / plan.originalYearly) * 100)
  }

  return (
    <section ref={sectionRef} id="pricing" className="py-24 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 70%, rgba(0, 255, 102, 0.08) 0%, rgba(0, 255, 102, 0.02) 60%, transparent 90%)`,
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
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6">
            <Sparkles className="w-4 h-4 text-[#15cb5e] mr-2" />
            <span className="text-[#15cb5e] text-sm font-medium">Flexible Pricing</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Commence your{" "}
            <span className="bg-gradient-to-r from-[#15cb5e] to-[#00ff66] bg-clip-text text-transparent">
              AI Journey
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Select from our flexible pricing plans to access powerful AI tools, seamless integrations, and dedicated
            support tailored to fit your business needs and budget.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <Button
              variant="outline"
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                !isYearly
                  ? "border-[#15cb5e] bg-[#15cb5e] text-black"
                  : "border-white/20 text-gray-300 hover:bg-white/10"
              }`}
            >
              Monthly
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                isYearly
                  ? "border-[#15cb5e] bg-[#15cb5e] text-black"
                  : "border-white/20 text-gray-300 hover:bg-white/10"
              }`}
            >
              Yearly
              <Badge className="ml-2 bg-green-500/20 text-green-300 border-green-500/30">Save up to 33%</Badge>
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-white/5 backdrop-blur-md border transition-all duration-500 hover:scale-105 group rounded-2xl ${
                plan.popular
                  ? "border-[#15cb5e]/50 ring-2 ring-[#15cb5e]/20 bg-white/10"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-[#15cb5e] text-black px-4 py-1 font-medium">Most Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                    plan.popular ? "bg-[#15cb5e]/20" : "bg-white/10"
                  }`}
                >
                  <plan.icon className={`w-8 h-8 ${plan.popular ? "text-[#15cb5e]" : "text-gray-400"}`} />
                </div>

                <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>
                <p className="text-gray-400 mb-4">{plan.description}</p>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{getDisplayPrice(plan)}</span>
                  <span className="text-gray-400 ml-2">
                    {plan.priceMonthly === 0 ? plan.period : isYearly ? "per year" : plan.period}
                  </span>

                  {isYearly && plan.originalYearly && plan.priceMonthly > 0 && (
                    <div className="text-sm text-[#15cb5e] mt-1">
                      Save {getSavingsAmount(plan)}% annually
                      <div className="text-xs text-gray-500 line-through">₹{plan.originalYearly}</div>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {plan.id === "basic" ? (
                  <Link href="/auth/signup">
                    <Button
                      className="w-full mb-8 transition-all duration-300 transform hover:scale-105 rounded-xl bg-[#15cb5e] hover:bg-[#12b854] text-black"
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={() => handlePlanClick(plan)}
                    className={`w-full mb-8 transition-all duration-300 transform hover:scale-105 rounded-xl ${
                      plan.popular
                        ? "bg-[#15cb5e] hover:bg-[#12b854] text-black"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                )}

                <div className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <Check className="w-5 h-5 text-[#15cb5e] mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-500 ${
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
