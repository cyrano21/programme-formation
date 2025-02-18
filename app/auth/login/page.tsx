'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Icons } from '@/utils/icons'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Mot de passe trop court')
})

type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {
  const router = useRouter()
  const { error: authError, signInWithEmail, signInWithGoogle } = useFirebaseAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await signInWithEmail(data.email, data.password)
      if (result) {
        router.push('/dashboard')
      } else {
        setError(authError?.message || 'Impossible de se connecter')
      }
    } catch (err) {
      console.error('Erreur lors de la connexion :', err)
      setError(err instanceof Error ? err.message : 'Une erreur inattendue est survenue')
    } finally {
      setIsLoading(false)
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await signInWithGoogle()
      if (result) {
        router.push('/dashboard')
      } else {
        setError(authError?.message || 'Impossible de se connecter avec Google')
      }
    } catch (err) {
      console.error('Erreur lors de la connexion Google :', err)
      setError(err instanceof Error ? err.message : 'Une erreur inattendue est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connectez-vous à votre compte
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Adresse email
              </label>
              <input
                {...register('email')}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Adresse email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <input
                {...register('password')}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? (
                <Icons.Loader className="animate-spin" />
              ) : (
                'Se connecter'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="mt-2 text-sm text-gray-600">
              Pas de compte ? {' '}
              <Link href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Inscrivez-vous
              </Link>
            </p>
          </div>

          <div className="flex items-center justify-center mt-4">
            <div className="w-full border-t border-gray-300"></div>
            <div className="px-4 text-gray-500 text-sm">Ou</div>
            <div className="w-full border-t border-gray-300"></div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Icons.Google className="mr-2" /> Se connecter avec Google
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
