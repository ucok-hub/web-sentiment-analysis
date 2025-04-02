import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

export function Hero() {
  return (
    <Container className="pt-20 pb-16 text-center lg:pt-32">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        Sentiment Analysis for Shopee Reviews
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        Analyze customer reviews effortlessly and gain valuable insights to
        improve your products.
      </p>
      <div className="mt-10 flex justify-center gap-x-6">
        <Button href="/register">Get Started</Button>
        <Button href="/login" variant="outline">
          Sign In
        </Button>
      </div>
    </Container>
  )
}
