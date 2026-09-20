import { Link } from 'react-router-dom'
import { useAppState } from '@/state/AppState'

export default function AccessRestricted() {
  const { currentUser } = useAppState()
  
  const getDashboardPath = () => {
    if (!currentUser) return '/login'
    return `/${currentUser.id}`
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-base p-4 font-sans text-ink">
      <div className="w-full max-w-md rounded border border-line bg-surface p-8 text-center shadow-sm">
        <h1 className="text-xl tracking-tight font-medium uppercase text-danger mb-2">ACCESS RESTRICTED</h1>
        <p className="text-sm text-muted mb-8">You do not have permission to view this department.</p>
        
        <Link 
          to={getDashboardPath()} 
          className="btn-primary px-6 py-2 text-sm"
        >
          RETURN TO MY DASHBOARD
        </Link>
      </div>
    </div>
  )
}
