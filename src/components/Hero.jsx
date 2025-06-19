'use client'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export function Hero() {
  const textRef = useRef(null)

  useEffect(() => {
    const el = textRef.current
    if (el) {
      el.style.opacity = 0
      el.style.transform = 'translateX(100px)'
      setTimeout(() => {
        el.style.transition =
          'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)'
        el.style.opacity = 1
        el.style.transform = 'translateX(0)'
      }, 100)
    }
  }, [])

  return (
    <section className="bg-gradient-to-r from-red-500 to-orange-500 py-16 text-white">
      <Container className="pt-20 pb-16 text-center lg:pt-32">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-widest text-slate-900 sm:text-7xl">
          Sentiment Analysis for <br /> E-Commerce Reviews
        </h1>
        <p
          ref={textRef}
          className="mx-auto mt-6 max-w-2xl text-lg tracking-wider text-slate-700"
        >
          Analyze customer reviews effortlessly and gain valuable insights to
          improve your products.
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <Link href="/file-upload">
            <Button>Get Started</Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}
