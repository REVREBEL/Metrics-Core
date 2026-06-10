/* eslint-env node */
import { NextraTheme } from './_components/nextra-theme'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { FC, ReactNode } from 'react'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  title: {
    absolute: '',
    template: '%s - Metrics-Core Docs'
  },
  description: 'Metrics Docs',
  applicationName: 'Metrics',
  generator: 'Next.js',
  appleWebApp: {
    title: 'Metrics'
  }
}

const RootLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const pageMap = await getPageMap()
  return (
    <html lang="en" dir="ltr">
      <Head faviconGlyph="✦" />
      <body style={{ margin: 0 }}>
        <NextraTheme pageMap={pageMap}>{children}</NextraTheme>
      </body>
    </html>
  )
}

export default RootLayout