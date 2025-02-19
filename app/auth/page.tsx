'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Icons } from '../../utils/icons'
import { useAuth } from '../../features/auth/hooks/useAuth'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { useRouter } from 'next/navigation'

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Mot de passe trop court')
})

const registerSchema = z.object({
  name: z.string().min(2, 'Nom trop court'),
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Mot de passe trop court'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword']
})

type LoginFormData = z.infer<typeof loginSchema>
type RegisterFormData = z.infer<typeof registerSchema>

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()
  const { login, register: registerUser, signInWithGoogle, error, isLoading } = useAuth()

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      await login(data)
      router.push('/dashboard')
    } catch (err) {
      console.error('Login error', err)
    }
  }

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        email: data.email, 
        password: data.password,
        displayName: data.name
      })
      router.push('/dashboard')
    } catch (err) {
      console.error('Erreur d\'inscription', err)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.push('/dashboard')
    } catch (err) {
      console.error('Erreur de connexion Google', err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center space-x-4 mb-6">
          <Button 
            variant={isLogin ? "default" : "outline"}
            onClick={() => setIsLogin(true)}
          >
            Connexion
          </Button>
          <Button 
            variant={!isLogin ? "default" : "outline"}
            onClick={() => setIsLogin(false)}
          >
            Inscription
          </Button>
        </div>

        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? "Connectez-vous à votre compte" : "Créer un compte"}
          </h2>
        </div>
        
        {error && (
          <div className="text-red-500 text-center">
            {error}
          </div>
        )}

        {isLogin ? (
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <Input
                  {...loginForm.register('email')}
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Adresse email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                {loginForm.formState.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Mot de passe</label>
                <Input
                  {...loginForm.register('password')}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Mot de passe"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                {loginForm.formState.errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Connexion en cours...' : 'Se connecter'}
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">Nom</label>
                <Input
                  {...registerForm.register('name')}
                  id="name"
                  type="text"
                  required
                  placeholder="Votre nom"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                {registerForm.formState.errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {registerForm.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <Input
                  {...registerForm.register('email')}
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Adresse email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                {registerForm.formState.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {registerForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Mot de passe</label>
                <Input
                  {...registerForm.register('password')}
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Mot de passe"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                {registerForm.formState.errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {registerForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="sr-only">Confirmer le mot de passe</label>
                <Input
                  {...registerForm.register('confirmPassword')}
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Confirmer le mot de passe"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {registerForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Inscription en cours...' : 'Créer un compte'}
              </Button>
            </div>
          </form>
        )}

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Ou continuer avec
            </span>
          </div>
        </div>

        <div>
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full"
          >
            <Icons.Google className="w-5 h-5 mr-2" />
            {isLogin ? 'Connexion' : 'Inscription'} avec Google
          </Button>
        </div>
      </div>
    </div>
  )
}
