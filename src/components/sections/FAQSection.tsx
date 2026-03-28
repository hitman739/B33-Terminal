import { motion, useReducedMotion } from 'framer-motion'
import { Accordion } from '../ui/Accordion'

const faqItems = [
  {
    number: '01',
    question: 'What is B33?',
    answer: 'B33 is an execution layer for on-chain trading that lets you operate across multiple wallets from a single interface.',
  },
  {
    number: '02',
    question: 'Is everything automated?',
    answer: 'You control the setup. Execution, positioning and profit-taking can be fully automated once configured.',
  },
  {
    number: '03',
    question: 'How does B33 protect against snipers?',
    answer: 'B33 is designed to secure better positioning at launch by distributing execution across multiple wallets.',
  },
  {
    number: '04',
    question: 'Can I take profits automatically?',
    answer: 'Yes. You can define profit-taking strategies that execute without manual intervention.',
  },
  {
    number: '05',
    question: 'How does the wallet system work?',
    answer: 'You can connect and manage multiple wallets, distribute capital and execute across them simultaneously.',
  },
  {
    number: '06',
    question: 'What advantage does B33 give traders?',
    answer: 'Faster execution, better positioning and the ability to operate across multiple wallets at once.',
  },
  {
    number: '07',
    question: 'How many wallets can I bundle?',
    answer: 'Up to 100 wallets per bundle.',
  },
]

export default function FAQSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="faq"
      className="section-scroll py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col gap-6"
        >
          <h2
            className="font-semibold leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            <span className="text-foreground block">QUESTIONS /</span>
            <span className="gradient-text block">ANSWERED.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-sm">
            Everything you need to know about B33. Can't find an answer? Reach out on Telegram — we're there.
          </p>
          <a
            href="#"
            className="font-mono text-primary tracking-[0.08em] text-sm hover:underline transition-all duration-200 w-fit"
          >
            JOIN TELEGRAM →
          </a>
        </motion.div>

        {/* Right — Accordion */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <Accordion items={faqItems} />
        </motion.div>
      </div>
    </section>
  )
}
