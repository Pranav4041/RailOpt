import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, MessageSquare, User } from 'lucide-react'
import AssistantPanel from './AssistantPanel'
import ThemeToggle from '@/components/common/ThemeToggle'
import { useAppState } from '@/state/AppState'

/**
 * The portal frame: one compact top bar and the page beneath it.
 *
 * There is deliberately no left-hand navigation. Every entry in the old
 * sidebar pointed at the same screen, so it added width and clutter without
 * adding a single place to go. The three things in it that actually do
 * something — the assistant, the signed-in user, and sign-out — are now
 * controls in this bar. Theme switching lives here too, since the portal
 * needs to work in both themes and had no way to change between them.
 */
export default function PortalLayout({ children, role }) {
  const navigate = useNavigate()
  const { currentUser, logout } = useAppState()
  const [isAssistantOpen, setIsAssistantOpen] = useState(false)

  const home = role === 'admin' ? '/admin' : `/${role}`

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-base font-sans text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-surface">
        <div className="mx-auto flex max-w-[1480px] flex-wrap items-center gap-x-4 gap-y-2 px-6 py-3">
          <Link to={home} className="flex items-baseline gap-3 rounded" aria-label="RailOpt home">
            <span className="flex items-center gap-2 text-[17px] font-bold uppercase tracking-tight">
              <span className="inline-block h-3.5 w-3.5 rounded-sm bg-merge" aria-hidden="true" />
              RailOpt
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-widest text-faint md:inline">
              Railway Maintenance Management Portal
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAssistantOpen(true)}
              className="btn-quiet px-3 py-1.5 text-[12px] font-medium"
            >
              <MessageSquare size={14} aria-hidden="true" />
              <span className="hidden sm:inline">RailOpt Assistant</span>
              <span className="sm:hidden">Assistant</span>
            </button>

            <ThemeToggle />

            <div className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden="true" />

            <div className="flex items-center gap-2 px-1">
              <span className="flex h-8 w-8 items-center justify-center rounded border border-line bg-raised text-muted">
                <User size={15} aria-hidden="true" />
              </span>
              <span className="hidden text-[13px] font-medium leading-tight sm:block">
                {currentUser?.label || 'Officer'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="btn-quiet px-3 py-1.5 text-[12px] font-medium hover:border-danger/40 hover:text-danger"
            >
              <LogOut size={14} aria-hidden="true" />
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1480px] px-6 py-6">{children}</main>

      <AssistantPanel isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </div>
  )
}
