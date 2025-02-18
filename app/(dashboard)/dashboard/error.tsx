'use client'

import { Icons } from '@/utils/icons'
import { useEffect } from 'react'

export default function DashboardError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="error-container">
      <div className="error-content">
        <Icons.AlertTriangle className="error-icon" />
        <h2>Oups ! Quelque chose s'est mal passé</h2>
        <p>Impossible de charger le tableau de bord</p>
        <div className="error-actions">
          <button onClick={() => reset()} className="btn-retry">
            <Icons.RefreshCw /> Réessayer
          </button>
        </div>
      </div>
    </div>
  )
}


