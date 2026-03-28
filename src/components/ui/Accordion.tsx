import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AccordionItem {
  number: string
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div
          key={i}
          className="border-b hover:bg-[rgba(212,255,0,0.03)] transition-colors duration-200 cursor-pointer"
          style={{ borderColor: 'rgba(212,255,0,0.1)' }}
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
        >
          <div className="flex items-center justify-between py-5 px-2 gap-4">
            <div className="flex items-start gap-4">
              <span className="text-primary font-mono text-sm opacity-50 shrink-0">{item.number}</span>
              <span className="text-foreground font-medium">{item.question}</span>
            </div>
            <motion.svg
              animate={{ rotate: openIndex === i ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0 text-primary"
            >
              <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </div>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="text-muted-foreground pb-5 px-2 pl-10 leading-relaxed">{item.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
