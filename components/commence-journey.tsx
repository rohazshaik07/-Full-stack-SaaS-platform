"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    id: "free",
    name: "Free Plan",
    priceMonthly: "₹0",
    priceYearly: "₹0",
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
  },
  {
    id: "basic",
    name: "Basic Plan",
    priceMonthly: "₹4,999",
    priceYearly: "₹49,990",
    originalYearly: "₹59,988",
    period: "per month",
    description: "Perfect for individual job seekers",
    icon: Star,
    features: [
      "Access to core AI features",
      "Basic data analytics and reporting",
      "Limited automation workflows",
      "Standard customer support",
      "User-friendly dashboard and interface",
      "Secure data storage",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    id: "teams",
    name: "Teams Plan",
    priceMonthly: "₹14,999",
    priceYearly: "₹149,990",
    originalYearly: "₹179,988",
    period: "per month",
    description: "Everything in basic",
    icon: Zap,
    features: [
      "Collaborative Workspaces",
      "Advanced Analytics",
      "Customizable Dashboards",
      "Integration Capabilities",
      "Monthly Reports",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: "Custom",
    priceYearly: "Custom",
    period: "contact sales",
    description: "For large organizations",
    icon: Crown,
    features: [
      "Everything in Teams",
      "Custom integrations",
      "Dedicated support",
      "Advanced security",
      "Custom training",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
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
            <span className="text-[#15cb5e] text-sm font-medium">Our Integrations</span>
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
              <Badge className="ml-2 bg-green-500/20 text-green-300 border-green-500/30">Save 17%</Badge>
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 delay-300 ${
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
                  <span className="text-4xl font-bold text-white">
                    {plan.priceMonthly === "₹0" || plan.priceMonthly === "Custom"
                      ? plan.priceMonthly
                      : isYearly
                        ? plan.priceYearly
                        : plan.priceMonthly}
                  </span>
                  {plan.priceMonthly === "₹0" ? (
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  ) : plan.priceMonthly === "Custom" ? (
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  ) : (
                    <span className="text-gray-400 ml-2">{isYearly ? "per year" : plan.period}</span>
                  )}

                  {isYearly && plan.originalYearly && plan.priceMonthly !== "₹0" && plan.priceMonthly !== "Custom" && (
                    <div className="text-sm text-gray-500 line-through mt-1">{plan.originalYearly}</div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {plan.id === "free" ? (
                  <Link href="/auth/signup">
                    <Button
                      className={`w-full mb-8 transition-all duration-300 transform hover:scale-105 rounded-xl ${
                        plan.popular
                          ? "bg-[#15cb5e] hover:bg-[#12b854] text-black"
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                ) : plan.id === "enterprise" ? (
                  <Button
                    className="w-full mb-8 transition-all duration-300 transform hover:scale-105 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    size="lg"
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                ) : (
                  <Link href="/auth/signup">
                    <Button
                      className={`w-full mb-8 transition-all duration-300 transform hover:scale-105 rounded-xl ${
                        plan.popular
                          ? "bg-[#15cb5e] hover:bg-[#12b854] text-black"
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
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
      </div>
    </section>
  )
}
