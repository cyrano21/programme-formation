'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Icons } from '@/utils/icons'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import Link from 'next/link'

const registerSchema = z.object({
  name: z.string().min(2, 'Nom trop court'),
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Mot de passe trop court'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword']
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function Register() {
  const { signUpWithEmail, signInWithGoogle, error: authError, updateProfile } = useFirebaseAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      // D'abord créer le compte
      const result = await signUpWithEmail(data.email, data.password)
      
      // Ensuite mettre à jour le profil
      if (result) {
        await updateProfile(data.name)
      } else {
        // Gestion spécifique des erreurs
        if (authError?.code === 'auth/email-already-in-use') {
          setError('Un compte existe déjà avec cet email. Voulez-vous vous connecter ?')
        } else {
          setError(authError?.message || 'Impossible de créer le compte')
        }
      }
    } catch (err) {
      console.error('Erreur lors de la création du compte :', err)
      setError('Une erreur inattendue est survenue')
    } finally {
      setIsLoading(false)
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await signInWithGoogle()
      if (!result) {
        setError('Inscription Google échouée')
      }
    } catch (err) {
      console.error('Erreur d\'inscription Google :', err)
      setError('Erreur d\'inscription Google')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginRedirect = () => {
    window.location.href = '/auth/login'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">Créer un Compte</h1>
          <p className="mt-2 text-center text-sm text-gray-600">Rejoignez notre plateforme de formation</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Nom</label>
              <input 
                {...register('name')}
                id="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Votre nom"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input 
                {...register('email')}
                id="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Adresse email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <input 
                {...register('password')}
                id="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirmer le mot de passe</label>
              <input 
                {...register('confirmPassword')}
                id="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirmer le mot de passe"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-center">
              {error}
              {error === 'Un compte existe déjà avec cet email. Voulez-vous vous connecter ?' && (
                <button 
                  type="button"
                  onClick={handleLoginRedirect} 
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  Se connecter
                </button>
              )}
            </p>
          )}

          <div>
            <button 
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? 'Création en cours...' : 'Créer un compte'}
            </button>
          </div>

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
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Icons.Google className="mr-2" />
              Inscription avec Google
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Déjà un compte ? {' '}
              <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Se connecter
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
