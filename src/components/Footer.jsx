import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'

export function Footer() {
  return (
    <footer className="py-16">
      <Container className="flex flex-col items-center justify-between md:flex-row">
        <Logo />
        <p className="mt-6 text-sm text-slate-500 md:mt-0">
          &copy; {new Date().getFullYear()} Sentiment Analysis. All rights
          reserved.
        </p>
      </Container>
    </footer>
  )
}
