'use client'

import { Button } from '@/components/Button'

export function CallToAction() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 px-6 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Analyze Your Reviews Now
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/80">
            Unlock valuable insights from Shopee COD reviews with our AI-powered
            tool.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              variant="white"
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
