import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-red-500 to-orange-500 py-16 text-white">
      <Container className="pt-20 pb-16 text-center lg:pt-32">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
          Sentiment Analysis for <br /> E-Commerce Reviews
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
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
