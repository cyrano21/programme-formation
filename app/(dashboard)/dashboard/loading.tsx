import { Icons } from '@/utils/icons'

export default function DashboardLoading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <Icons.Loader className="animate-spin" />
        <p>Chargement du tableau de bord...</p>
      </div>
    </div>
  )
}


