import { IconSquareRoundedChevronLeftFilled } from "@tabler/icons-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui-core/card'

import ForgotPasswordForm from '@users/forgot-password/forgot-password-form'
import AuthBackgroundShape from '@icons/RebelIconsReact/AuthBackgroundShape'
import Logo from '@icons/revrebel.png'

const ForgotPassword = () => {
  return (
    <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <div className='absolute'>
        <AuthBackgroundShape />
      </div>

      <Card className='z-1 w-full border-none shadow-md sm:max-w-md'>
        <CardHeader className='gap-6'>
          <img src={Logo.src} alt='RevRebel Logo' className='h-10 w-auto' />

          <div>
            <CardTitle className='mb-1.5 text-2xl'>Forgot Password?</CardTitle>
            <CardDescription className='text-base'>
              Enter your email and we&apos;ll send you instructions to reset your password
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className='space-y-4'>
          {/* ForgotPassword Form */}
          <ForgotPasswordForm />

          <a href='#' className='group mx-auto flex w-fit items-center gap-2'>
            <IconSquareRoundedChevronLeftFilled className='size-5 transition-transform duration-200 group-hover:-translate-x-0.5' />
            <span>Back to login</span>
          </a>
        </CardContent>
      </Card>
    </div>
  )
}

export default ForgotPassword
