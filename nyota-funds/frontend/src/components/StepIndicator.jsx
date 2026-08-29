const STEPS = ['Personal Info', 'Grant Purpose', 'Select Tier', 'M-Pesa Payment']

export default function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {STEPS.map((label, i) => {
        const step = i + 1
        const done = current > step
        const active = current === step
        return (
          <div key={i} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all
                ${done ? 'bg-green-500 text-white' : active ? 'bg-purple-500 text-white ring-4 ring-purple-500/30' : 'bg-white/10 text-gray-400'}`}>
                {done ? '✓' : step}
              </div>
              <span className={`text-xs mt-1 hidden md:block ${active ? 'text-purple-300' : 'text-gray-500'}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-8 md:w-16 h-0.5 mb-4 ${done ? 'bg-green-500' : 'bg-white/10'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
