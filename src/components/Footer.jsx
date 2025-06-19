import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'

export function Footer() {
  return (
    <footer className="border-t border-orange-200 bg-white/60 py-10 shadow-inner backdrop-blur-lg">
      <Container className="flex flex-col items-center justify-between md:flex-row">
        <Logo />
        <p className="mt-6 text-sm font-semibold text-orange-700 md:mt-0">
          &copy; {new Date().getFullYear()} Sentiment Analysis. All rights
          reserved.
        </p>
      </Container>
    </footer>
  )
}
