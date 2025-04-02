import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { CallToAction } from '@/components/CallToAction'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
