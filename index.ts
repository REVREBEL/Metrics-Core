import type { RegistryCategory } from '@/types'

export const registryCategories: RegistryCategory[] = [
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Dashboard cards, GA4 widgets, performance summaries, and analytics UI patterns.',
    href: '/registry/analytics',
  },
  {
    id: 'revenue',
    title: 'Revenue',
    description: 'Hotel performance, ADR, RevPAR, pickup, pace, forecast, and budget components.',
    href: '/registry/revenue',
  },
  {
    id: 'marketing',
    title: 'Marketing',
    description: 'Campaign, source, medium, channel, and acquisition-focused components.',
    href: '/registry/marketing',
  },
  {
    id: 'social',
    title: 'Social',
    description: 'Social media cards, channel performance, and engagement widgets.',
    href: '/registry/social',
  },
  {
    id: 'ui',
    title: 'UI Primitives',
    description: 'Shared UI building blocks, tokens, buttons, badges, tables, cards, and layout primitives.',
    href: '/registry/ui',
  },
]