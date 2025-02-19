'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Icons } from '@/utils/icons'
import { useAuth } from '@/features/auth/hooks/useAuth'

const resetPasswordSchema = z.object({
  email: z.string().email('Email invalide')
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export default function ResetPassword() {
  const { resetPassword } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema)
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true)
    setMessage(null)
    try {
      await resetPassword(data.email)
      setMessage({
        type: 'success',
        text: 'Un email de réinitialisation a été envoyé'
      })
    } catch (err) {
      setMessage({
        type: 'error',
        text: 'Impossible d\'envoyer l\'email de réinitialisation'
      })
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Réinitialiser le Mot de Passe</h1>
        <p>Entrez votre email pour recevoir un lien de réinitialisation</p>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          {message && (
            <div className={`message ${message.type}`}>
              {message.type === 'success' ? (
                <Icons.CheckCircle />
              ) : (
                <Icons.AlertCircle />
              )}
              {message.text}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              {...register('email')}
              placeholder="votre@email.com"
            />
            {errors.email && (
              <span className="error-text">{errors.email.message}</span>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-primary"
          >
            {isLoading ? (
              <><Icons.RefreshCw className="animate-spin" /> Envoi...</>
            ) : (
              <>Réinitialiser <Icons.ChevronEnd /></>
            )}
          </button>

          <div className="auth-links">
            <a href="/login">Retour à la connexion</a>
          </div>
        </form>
      </div>
    </div>
  )
}
