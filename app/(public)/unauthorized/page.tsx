import Link from 'next/link'
import { Icons } from '@/utils/icons'

export default function Unauthorized() {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <Icons.AlertOctagon className="unauthorized-icon" />
        <h1>Accès Non Autorisé</h1>
        <p>Vous n&apos;avez pas les permissions nécessaires pour accéder à cette page.</p>
        
        <div className="unauthorized-actions">
          <Link href="/dashboard" className="btn-primary">
            <Icons.Home /> Retour au Tableau de Bord
          </Link>
          
          <Link href="/contact" className="btn-secondary">
            <Icons.MessageCircle /> Contacter le Support
          </Link>
        </div>
      </div>
    </div>
  )
}


