import Link from 'next/link'
import { Icons } from '@/utils/icons'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">CoachVerse</h1>
        <p className="text-xl mb-8">Votre plateforme de coaching professionnel</p>
        
        <div className="flex space-x-4 justify-center">
          <Link 
            href="/auth/login" 
            className="flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition"
          >
            <Icons.LogIn className="mr-2" /> Connexion
          </Link>
          
          <Link 
            href="/auth/register" 
            className="flex items-center border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary-light transition"
          >
            <Icons.UserPlus className="mr-2" /> Inscription
          </Link>
        </div>
      </div>
    </main>
  )
}


