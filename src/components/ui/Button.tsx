import React from 'react'

type Variant = 'hero' | 'secondary'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export function Button({ variant = 'hero', className = '', ...props }: ButtonProps) {
  const base = 'rounded-full px-6 py-3 text-base font-semibold transition-all duration-200 cursor-pointer'
  const variants: Record<Variant, string> = {
    hero: 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(212,255,0,0.4)] hover:shadow-[0_0_30px_rgba(212,255,0,0.6)] hover:brightness-110',
    secondary: 'liquid-glass text-foreground hover:bg-white/5',
  }
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}
