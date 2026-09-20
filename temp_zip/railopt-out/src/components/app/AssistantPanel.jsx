import { useState } from 'react'
import { MessageSquare, X, Send } from 'lucide-react'
import { useAppState } from '@/state/AppState'

export default function AssistantPanel({ isOpen, onClose }) {
  const { currentUser } = useAppState()
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `Hello. I am the RailOpt Operational Assistant. I can help with information related to ${currentUser?.label || 'all departments'}.` }
  ])
  const [input, setInput] = useState('')

  const quickQuestions = [
    "What are today's important issues?",
    "Why is this issue high priority?",
    "What should I inspect first?",
    "Which tasks need attention?",
    "What happened in this section?",
    "What should my department do?"
  ]

  const getDemoResponse = () => {
    let deptName = currentUser?.label || 'All departments'
    if (currentUser?.id === 'admin') deptName = 'The railway network'

    return (
      <div className="space-y-3">
        <p className="text-sm text-ink">{deptName} has 2 high-priority issues today.</p>
        <p className="text-sm text-ink">The most urgent issue is a track maintenance request in Section XYZ.</p>
        <p className="text-sm font-medium text-ink">Recommended action:<br/>Inspect the section and review the maintenance window.</p>
        
        <div className="mt-3 pt-3 border-t border-line">
          <span className="text-[10px] uppercase tracking-wider text-faint font-bold block mb-1">BASED ON</span>
          <ul className="text-xs text-muted space-y-0.5">
            <li>• Task information</li>
            <li>• Alert information</li>
            <li>• Maintenance history</li>
          </ul>
        </div>
      </div>
    )
  }

  const handleSend = (text) => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { role: 'user', text }])
    setInput('')
    
    // Simulate delay
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: getDemoResponse() }])
    }, 600)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-96 max-w-full flex-col border-l border-line bg-surface text-ink shadow-2xl">
      <div className="flex items-center justify-between border-b border-line bg-bar px-5 py-4 text-onbar">
        <div>
          <h2 className="font-semibold tracking-wide uppercase flex items-center gap-2">
            <MessageSquare size={16} />
            RAILOPT ASSISTANT
          </h2>
          <span className="mt-0.5 block text-[10px] uppercase tracking-widest text-barmuted">Demo Assistant</span>
        </div>
        <button type="button" onClick={onClose} aria-label="Close assistant" className="text-barmuted transition-colors hover:text-onbar">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto bg-base p-5">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded p-3 text-sm ${msg.role === 'user' ? 'bg-merge text-deep' : 'border border-line bg-surface text-ink'}`}>
              {msg.text || msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-line bg-surface p-4">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {quickQuestions.map((q, i) => (
            <button 
              type="button"
              key={i} 
              onClick={() => handleSend(q)}
              className="rounded border border-line bg-raised px-2 py-1 text-left text-[10px] uppercase tracking-wider text-muted transition-colors hover:border-merge hover:text-ink"
            >
              {q}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Ask a question..." aria-label="Ask the assistant a question"
            className="field flex-1"
          />
          <button 
            type="button"
            onClick={() => handleSend(input)}
            aria-label="Send question" className="btn-primary px-3 py-2"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
