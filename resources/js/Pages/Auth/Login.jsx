import { useEffect, useState } from 'react'

import { Head, Link, useForm } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card'
import { Button } from '@/Components/ui/button'
import { Label } from '@/Components/ui/label'
import { Input } from '@/Components/ui/input'
import { GitBranchPlusIcon, LucidePersonStanding } from 'lucide-react'
import InputError from '@/Components/InputError'
import ApplicationLogo from '@/Components/ApplicationLogo'
import Beams from '@/Components/Beams'
import Checkbox from '@/Components/Checkbox'

export default function Login({ status, canResetPassword }) {
  const [isLoading, setIsLoading] = useState(false)
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  useEffect(() => {
    return () => {
      reset('password')
    }
  }, [])

  const submit = (e) => {
    e.preventDefault()

    post(route('login'))
  }

  return (
    <GuestLayout>
      <Head title="Login" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}

      <form
        onSubmit={submit}
        className="flex items-center z-50 justify-center flex-col gap-3 min-h-screen bg-gray-100"
      >
        <ApplicationLogo className="w-16 h-16 z-50" />
        <Card className="w-[500px] bg-white/30 border border-t-brand border-opacity-25 h-1/2 p-3">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription className="text-sm">
              Selamat datang kembali, masukkan kredensial Anda untuk
              melanjutkan.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="welcome@rata.com"
                name="email"
                value={data.email}
                className={`mt-1 block w-full ${
                  errors.email && 'border-red-500'
                }`}
                autoComplete="username"
                isFocused={true}
                onChange={(e) => setData('email', e.target.value)}
              />
                <InputError message={errors.email} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={data.password}
                className={`mt-1 block w-full ${
                  errors.password && 'border-red-500'
                }`}
                autoComplete="current-password"
                onChange={(e) => setData('password', e.target.value)}
              />
              <InputError message={errors.password} />
            </div>
          </CardContent>
          <label className="flex items-center px-3">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
            />
            <span className="ms-2 text-sm text-gray-600">Remember me</span>
          </label>

          <div className="flex items-center justify-between px-3 mb-3 mt-6">
            <Button variant="link">
              <Link href={'/register'}> Register</Link>
            </Button>
            <Button type="submit">
              {isLoading && (
                <LucidePersonStanding className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </Button>
          </div>
        </Card>
      </form>
    </GuestLayout>
  )
}
