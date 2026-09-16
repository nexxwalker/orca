import { useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  Bot,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Eye,
  EyeOff,
  FolderKanban,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  Play,
  Plus,
  Puzzle,
  Radio,
  Settings2,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Agent = { name: string; model: string; status: string; color: string }

const agents: Agent[] = [
  { name: 'Atlas', model: 'Claude Sonnet 4', status: 'Working', color: 'bg-chart-4' },
  { name: 'Sage', model: 'GPT-4.1', status: 'Ready', color: 'bg-chart-2' },
  { name: 'Scout', model: 'Gemini 2.5 Pro', status: 'Ready', color: 'bg-chart-1' }
]

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Agents', icon: Bot },
  { label: 'Tasks', icon: TerminalSquare },
  { label: 'Integrations', icon: Puzzle },
  { label: 'Activity', icon: Activity }
]

export function EmberspackStudio(): React.JSX.Element {
  const [collapsed, setCollapsed] = useState(false)
  const [activeNav, setActiveNav] = useState('Overview')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState(agents[0])
  const [prompt, setPrompt] = useState('')
  const [running, setRunning] = useState(false)
  const [showKey, setShowKey] = useState(false)

  const runTask = () => {
    if (!prompt.trim()) return
    setRunning(true)
    window.setTimeout(() => setRunning(false), 2400)
  }

  return (
    <div className="min-h-dvh bg-[#151414] text-[#f4f0ea] font-sans selection:bg-[#d94841]/30">
      <div className="flex min-h-dvh">
        <aside className={cn('hidden shrink-0 border-r border-white/[0.07] bg-[#191817] transition-all duration-200 md:flex md:flex-col', collapsed ? 'w-[76px]' : 'w-[230px]')}>
          <div className={cn('flex h-[76px] items-center border-b border-white/[0.07]', collapsed ? 'justify-center' : 'gap-3 px-5')}>
            <div className="grid size-9 place-items-center rounded-xl bg-[#c94139] shadow-[0_0_24px_rgba(201,65,57,.25)]"><Sparkles className="size-[18px] text-white" /></div>
            {!collapsed && <span className="text-[15px] font-semibold tracking-[0.16em] text-[#f7ece4]">EMBERSPACK</span>}
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-3">
            <div className={cn('mb-5 flex items-center rounded-lg border border-[#cf8e47]/20 bg-[#cf8e47]/[0.07] px-3 py-2.5', collapsed ? 'justify-center px-0' : 'gap-3')}>
              <div className="grid size-7 place-items-center rounded-md bg-[#c98143]/20 text-[#e4a568]"><FolderKanban className="size-4" /></div>
              {!collapsed && <div className="min-w-0"><p className="truncate text-xs font-medium">Emberspack</p><p className="truncate text-[10px] text-white/40">Personal workspace</p></div>}
              {!collapsed && <ChevronDown className="ml-auto size-3.5 text-white/35" />}
            </div>
            {!collapsed && <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">Workspace</p>}
            {navItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => setActiveNav(label)} title={collapsed ? label : undefined} className={cn('flex items-center rounded-lg px-3 py-2.5 text-left text-[13px] transition-colors', collapsed ? 'justify-center' : 'gap-3', activeNav === label ? 'bg-white/[0.08] text-white' : 'text-white/45 hover:bg-white/[0.04] hover:text-white/75')}><Icon className="size-[17px]" />{!collapsed && label}</button>)}
            <div className="mt-auto flex flex-col gap-1 border-t border-white/[0.07] pt-3">
              <button title={collapsed ? 'Settings' : undefined} className={cn('flex items-center rounded-lg px-3 py-2.5 text-[13px] text-white/45 hover:bg-white/[0.04] hover:text-white/75', collapsed ? 'justify-center' : 'gap-3')}><Settings2 className="size-[17px]" />{!collapsed && 'Settings'}</button>
              <button title={collapsed ? 'Help' : undefined} className={cn('flex items-center rounded-lg px-3 py-2.5 text-[13px] text-white/45 hover:bg-white/[0.04] hover:text-white/75', collapsed ? 'justify-center' : 'gap-3')}><CircleHelp className="size-[17px]" />{!collapsed && 'Help center'}</button>
            </div>
          </nav>
          <button aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={() => setCollapsed(!collapsed)} className="absolute bottom-5 ml-[calc(100%-12px)] grid size-6 place-items-center rounded-full border border-white/10 bg-[#282422] text-white/60 hover:text-white">{collapsed ? <ChevronRight className="size-3.5" /> : <ChevronLeft className="size-3.5" />}</button>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex h-[76px] items-center justify-between border-b border-white/[0.07] px-5 sm:px-8">
            <div className="flex items-center gap-3"><button className="md:hidden" aria-label="Open navigation"><Menu className="size-5 text-white/60" /></button><div><p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#d58b54]">Workspace / {activeNav}</p><h1 className="mt-1 text-[19px] font-semibold tracking-[-0.02em]">Good morning, Alex</h1></div></div>
            <div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-full border border-white/[0.08] px-3 py-1.5 text-[11px] text-white/50 sm:flex"><span className="size-1.5 rounded-full bg-[#67b58d]" /> All systems operational</div><button onClick={() => setDrawerOpen(true)} className="flex items-center gap-2 rounded-lg bg-[#c94139] px-3.5 py-2 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(201,65,57,.2)] transition hover:bg-[#dc5148]"><KeyRound className="size-3.5" /> <span className="hidden sm:inline">Connect provider</span></button><div className="grid size-8 place-items-center rounded-full bg-[#d58b54] text-xs font-bold text-[#251914]">AS</div></div>
          </header>

          <div className="mx-auto max-w-[1320px] px-5 py-7 sm:px-8 lg:px-10">
            <section className="grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
              <div className="relative overflow-hidden rounded-2xl border border-[#d58b54]/20 bg-[#211d1b] p-6 sm:p-8"><div className="pointer-events-none absolute -right-12 -top-20 size-72 rounded-full bg-[#c94139]/10 blur-3xl" /><div className="relative"><div className="mb-5 flex items-center gap-2 text-[#e2a36c]"><Radio className="size-4" /><span className="text-[11px] font-semibold uppercase tracking-[0.15em]">Studio command center</span></div><h2 className="max-w-lg text-3xl font-semibold tracking-[-0.045em] text-[#fff8f2] sm:text-[38px] sm:leading-[1.08]">Build with agents,<br /><span className="text-[#d58b54]">ship with confidence.</span></h2><p className="mt-4 max-w-md text-[13px] leading-6 text-white/50">Orchestrate your AI workspace from one calm, focused surface. Start a task, inspect the stream, and keep moving.</p><button onClick={() => document.getElementById('task-composer')?.focus()} className="mt-7 flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/[0.1]">Start a new task <ArrowUpRight className="size-3.5" /></button></div></div>
              <div className="rounded-2xl border border-white/[0.08] bg-[#1c1a19] p-6"><div className="flex items-center justify-between"><div><p className="text-[11px] uppercase tracking-[0.14em] text-white/35">This week</p><p className="mt-2 text-3xl font-semibold">28<span className="ml-2 text-sm font-normal text-white/35">runs</span></p></div><div className="grid size-10 place-items-center rounded-xl bg-[#67b58d]/10 text-[#67b58d]"><Activity className="size-5" /></div></div><div className="mt-7 flex h-20 items-end gap-1.5">{[34,48,42,68,53,76,62,88,72,92,81,100].map((height, index) => <div key={index} className="flex-1 rounded-t-sm bg-[#c94139]/55" style={{ height: `${height}%` }} />)}</div><div className="mt-3 flex justify-between text-[10px] text-white/25"><span>Mon</span><span>Today</span></div></div>
            </section>

            <section className="mt-7 grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
              <div className="rounded-2xl border border-white/[0.08] bg-[#1c1a19] p-5 sm:p-6"><div className="flex items-center justify-between"><div><h3 className="text-[15px] font-semibold">Run a task</h3><p className="mt-1 text-xs text-white/40">Give an agent a clear objective to work on.</p></div><MoreHorizontal className="size-5 text-white/25" /></div><div className="mt-5 rounded-xl border border-white/[0.1] bg-[#151414] p-3 focus-within:border-[#d58b54]/50"><textarea id="task-composer" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="What should your agent build today?" rows={3} className="w-full resize-none bg-transparent text-sm text-white outline-none placeholder:text-white/25" /><div className="mt-3 flex items-center justify-between border-t border-white/[0.07] pt-3"><button className="flex items-center gap-2 text-[11px] text-white/40 hover:text-white/70"><Bot className="size-3.5" /> {selectedAgent.name}<ChevronDown className="size-3" /></button><button onClick={runTask} disabled={running || !prompt.trim()} className="flex items-center gap-2 rounded-md bg-[#d58b54] px-3 py-2 text-[11px] font-semibold text-[#251914] disabled:cursor-not-allowed disabled:opacity-40">{running ? <><span className="size-3 animate-spin rounded-full border-2 border-[#251914]/30 border-t-[#251914]" /> Running</> : <><Play className="size-3" /> Run task</>}</button></div></div></div>
              <div className="rounded-2xl border border-white/[0.08] bg-[#1c1a19] p-5 sm:p-6"><div className="flex items-center justify-between"><div><h3 className="text-[15px] font-semibold">Your agents</h3><p className="mt-1 text-xs text-white/40">3 agents in this workspace</p></div><button className="grid size-7 place-items-center rounded-md border border-white/10 text-white/50 hover:text-white" aria-label="Add agent"><Plus className="size-4" /></button></div><div className="mt-5 flex flex-col gap-2">{agents.map((agent) => <button key={agent.name} onClick={() => setSelectedAgent(agent)} className={cn('flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition', selectedAgent.name === agent.name ? 'border-[#d58b54]/35 bg-[#d58b54]/[0.07]' : 'border-transparent hover:bg-white/[0.04]')}><span className={cn('size-2 rounded-full', agent.color)} /><span className="min-w-0 flex-1"><span className="block text-xs font-medium">{agent.name}</span><span className="block truncate text-[10px] text-white/35">{agent.model}</span></span><span className="text-[10px] text-white/35">{agent.status}</span>{selectedAgent.name === agent.name && <Check className="size-3.5 text-[#d58b54]" />}</button>)}</div></div>
            </section>

            <section className="mt-7 rounded-2xl border border-white/[0.08] bg-[#1c1a19] p-5 sm:p-6"><div className="flex items-center justify-between"><div><h3 className="text-[15px] font-semibold">Recent activity</h3><p className="mt-1 text-xs text-white/40">Your latest task runs and agent events.</p></div><button className="text-[11px] font-medium text-[#d58b54] hover:text-[#edb27f]">View all</button></div><div className="mt-5 grid gap-2 md:grid-cols-3">{[['Atlas','Refactor authentication flow','12 min ago','bg-chart-4'],['Sage','Review API error handling','1 hr ago','bg-chart-2'],['Scout','Generate test coverage report','Yesterday','bg-chart-1']].map(([name, task, time, color]) => <div key={task} className="flex items-center gap-3 rounded-xl border border-white/[0.06] px-3 py-3"><span className={cn('grid size-8 place-items-center rounded-lg text-[10px] font-semibold text-[#161313]', color)}>{name[0]}</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium">{task}</p><p className="mt-1 text-[10px] text-white/35">{name} · {time}</p></div><Check className="size-3.5 text-[#67b58d]" /></div>)}</div></section>
          </div>
        </main>
      </div>

      {drawerOpen && <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onMouseDown={(event) => event.target === event.currentTarget && setDrawerOpen(false)}><section role="dialog" aria-modal="true" aria-labelledby="provider-title" className="h-full w-full max-w-[430px] overflow-y-auto border-l border-white/10 bg-[#1c1a19] p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between"><div><div className="mb-4 grid size-10 place-items-center rounded-xl bg-[#c94139]/15 text-[#df6c61]"><LockKeyhole className="size-5" /></div><h2 id="provider-title" className="text-xl font-semibold">Connect a provider</h2><p className="mt-2 text-xs leading-5 text-white/45">Credentials are stored securely in your workspace vault. This prototype models the secure state only.</p></div><button aria-label="Close provider drawer" onClick={() => setDrawerOpen(false)} className="rounded-md p-2 text-white/40 hover:bg-white/[0.06] hover:text-white"><X className="size-5" /></button></div><div className="mt-8 flex flex-col gap-5"><label className="flex flex-col gap-2 text-xs font-medium text-white/70">Provider<select className="rounded-lg border border-white/10 bg-[#151414] px-3 py-2.5 text-sm text-white outline-none focus:border-[#d58b54]"><option>Anthropic</option><option>OpenAI</option><option>Google Gemini</option></select></label><label className="flex flex-col gap-2 text-xs font-medium text-white/70">API key<div className="flex items-center rounded-lg border border-white/10 bg-[#151414] focus-within:border-[#d58b54]"><input type={showKey ? 'text' : 'password'} defaultValue="sk-proj-emberspack-demo" className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-none" /><button type="button" aria-label={showKey ? 'Hide API key' : 'Show API key'} onClick={() => setShowKey(!showKey)} className="px-3 text-white/40 hover:text-white">{showKey ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div></label><div className="flex items-start gap-3 rounded-lg border border-[#67b58d]/20 bg-[#67b58d]/[0.06] p-3"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#67b58d]" /><p className="text-[11px] leading-5 text-white/55">Key status: <span className="font-medium text-[#67b58d]">Ready to connect</span><br />Your key will be masked after saving.</p></div></div><div className="mt-10 flex gap-3"><button onClick={() => setDrawerOpen(false)} className="flex-1 rounded-lg border border-white/10 px-4 py-2.5 text-xs font-semibold text-white/65 hover:bg-white/[0.05]">Cancel</button><button onClick={() => setDrawerOpen(false)} className="flex-1 rounded-lg bg-[#c94139] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#dc5148]">Save securely</button></div></section></div>}
    </div>
  )
}

export default EmberspackStudio

// Neon boundary placeholder: server persistence can replace this local prototype state.
export type StudioAgentRecord = { id: string; name: string; provider: string; model: string; userId: string }
export type StudioTaskRecord = { id: string; agentId: string; prompt: string; status: 'queued' | 'running' | 'completed'; userId: string }
export type StudioCredentialState = { provider: string; maskedKey: string; status: 'missing' | 'ready' | 'revoked'; userId: string }
