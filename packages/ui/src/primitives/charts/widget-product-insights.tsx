'use client'

import { Bar, BarChart } from 'recharts'

import { Card, CardContent, CardHeader } from '@ui-core/card'
import { type ChartConfig, ChartContainer } from './chart'
import { Separator } from '@ui-core/separator'

import { cn } from '@/lib/utils'

// Product reached data
const productReachChartData = [
  { month: 'January', reached: 168 },
  { month: 'February', reached: 305 },
  { month: 'March', reached: 213 },
  { month: 'April', reached: 330 },
  { month: 'May', reached: 305 }
]

const productReachChartConfig = {
  reached: {
    label: 'Reached',
    color: 'var(--primary)'
  }
} satisfies ChartConfig

// Order placed data
const orderPlacedChartData = [
  { month: 'January', orders: 168 },
  { month: 'February', orders: 305 },
  { month: 'March', orders: 213 },
  { month: 'April', orders: 330 },
  { month: 'May', orders: 305 }
]

const orderPlacedChartConfig = {
  orders: {
    label: 'Orders',
    color: 'color-mix(in oklab, var(--primary) 10%, transparent)'
  }
} satisfies ChartConfig

interface ProductInsightsCardProps {
  className?: string
  title?: string
  publishedDate?: string
  productImage?: string
  reachedCount?: string | number
  ordersCount?: string | number
  reachedData?: { month: string; reached: number }[]
  ordersData?: { month: string; orders: number }[]
}

const DEFAULT_PRODUCT_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="82" height="82" viewBox="0 0 82 82" fill="none"><rect width="82" height="82" rx="8" fill="%23F3F4F6"/><rect x="21" y="21" width="40" height="40" rx="6" fill="%236366F1" fill-opacity="0.1"/><path d="M41 31L51 48H31L41 31Z" fill="%236366F1"/><circle cx="41" cy="38" r="4" fill="%23FFF"/></svg>'

const ProductInsightsCard = ({
  className,
  title = 'Product insight',
  publishedDate = 'Published on 12 MAY 2025 - 6:10 PM',
  productImage = DEFAULT_PRODUCT_IMAGE,
  reachedCount = '21,153',
  ordersCount = '2,123',
  reachedData = productReachChartData,
  ordersData = orderPlacedChartData
}: ProductInsightsCardProps) => {
  return (
    <Card className={cn('gap-4', className)}>
      <CardHeader className='flex justify-between'>
        <div className='flex flex-col gap-1'>
          <span className='text-lg font-semibold'>{title}</span>
          <span className='text-muted-foreground text-sm'>{publishedDate}</span>
        </div>
        <img
          src={productImage}
          alt={title}
          className='w-20.5 rounded-md'
        />
      </CardHeader>
      <CardContent className='space-y-4'>
        <Separator />
        <div className='flex items-center justify-between gap-1'>
          <div className='flex flex-col gap-1'>
            <span className='text-xs'>Product reached</span>
            <span className='text-2xl font-semibold'>{reachedCount}</span>
          </div>
          <ChartContainer config={productReachChartConfig} className='min-h-13 max-w-18'>
            <BarChart accessibilityLayer data={reachedData} barSize={8}>
              <Bar dataKey='reached' fill='var(--color-reached)' radius={2} />
            </BarChart>
          </ChartContainer>
        </div>

        <div className='flex items-center justify-between gap-1'>
          <div className='flex flex-col gap-1'>
            <span className='text-xs'>Order placed </span>
            <span className='text-2xl font-semibold'>{ordersCount}</span>
          </div>
          <ChartContainer config={orderPlacedChartConfig} className='min-h-13 max-w-18'>
            <BarChart accessibilityLayer data={ordersData} barSize={8}>
              <Bar dataKey='orders' fill='var(--color-orders)' radius={2} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductInsightsCard
export type { ProductInsightsCardProps }
