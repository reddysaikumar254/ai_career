"use client"

import React, { useState } from "react"
import {
  StarIcon,
  RocketIcon,
  CheckCircledIcon
} from "@radix-ui/react-icons"

const PLAN_PRICE_IDS: Record<string, string> = {
  Pro: "price_pro_123",
  Premium: "price_premium_456",
  Enterprise: "price_enterprise_789"
}

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Basic AI access to get started.",
    features: [
      "Limited AI Chat",
      "Basic Resume Analysis",
      "Limited Roadmap Generation"
    ]
  },
  {
    name: "Pro",
    price: "₹499 / month",
    popular: true,
    description: "Perfect for students and job seekers.",
    features: [
      "Unlimited AI Chat",
      "Advanced Resume Review",
      "Unlimited Roadmap Generation",
      "Faster Response Time"
    ]
  },
  {
    name: "Premium",
    price: "₹999 / month",
    description: "For serious professionals.",
    features: [
      "Everything in Pro",
      "ATS Keyword Optimization",
      "Priority AI Processing",
      "Downloadable Reports",
      "Priority Email Support"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For institutions and training centers.",
    features: [
      "Team Management",
      "Usage Analytics",
      "Dedicated Support",
      "Custom AI Integrations"
    ]
  }
]

export default function Billing() {

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

const handleSubscribe = async () => {
  if (!selectedPlan || selectedPlan === "Free") return

  try {
    setLoading(true)

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId: PLAN_PRICE_IDS[selectedPlan],
      }),
    })

    console.log("Status:", res.status)

    const text = await res.text()
    console.log("Raw Response:", text)

    const data = JSON.parse(text)

    if (data.url) {
      window.location.href = data.url
    }

  } catch (error) {
    console.error("Subscription failed:", error)
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-4">
            <RocketIcon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            <span className="text-sm font-medium bg-neutral-200 dark:bg-neutral-800 
              text-neutral-800 dark:text-neutral-200 px-4 py-1 rounded-full">
              Upgrade Anytime
            </span>
          </div>

          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            Choose Your Plan
          </h1>
        </div>

        {/* PLANS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              onClick={() => setSelectedPlan(plan.name)}
              className={`
                relative rounded-2xl p-8 border cursor-pointer
                transition-all duration-200
                ${
                  selectedPlan === plan.name
                    ? "border-neutral-900 dark:border-neutral-100 shadow-lg"
                    : "border-neutral-200 dark:border-neutral-800"
                }
                bg-white dark:bg-neutral-900 hover:shadow-md
              `}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2
                  bg-neutral-900 dark:bg-neutral-100
                  text-white dark:text-black
                  text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <StarIcon className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {plan.name}
              </h3>

              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                {plan.price}
              </p>

              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                {plan.description}
              </p>

              <ul className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircledIcon className="w-4 h-4" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SUBSCRIBE BUTTON */}
        {selectedPlan && selectedPlan !== "Free" && (
          <div className="text-center">
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="
                px-8 py-3 rounded-xl
                bg-neutral-900 text-white
                dark:bg-neutral-100 dark:text-black
                font-medium
                hover:scale-105 transition
                disabled:opacity-50
              "
            >
              {loading
                ? "Redirecting..."
                : `Subscribe to ${selectedPlan}`}
            </button>
          </div>
        )}

        {/* TRUST */}
        <div className="text-center mt-10 text-sm text-neutral-500 dark:text-neutral-400 flex justify-center items-center gap-2">
          <CheckCircledIcon className="w-4 h-4" />
          Secure payments powered by Stripe. Cancel anytime.
        </div>

      </div>
    </div>
  )
}