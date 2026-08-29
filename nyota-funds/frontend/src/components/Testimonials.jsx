import { useEffect, useState } from 'react'

const NAMES = [
  'Aisha Mwangi', 'Brian Otieno', 'Caroline Njeri', 'David Kamau',
  'Esther Wanjiku', 'Francis Odhiambo', 'Grace Akinyi', 'Hassan Mutura',
  'Irene Chebet', 'James Mutua', 'Kezia Wambua', 'Liam Ochieng',
  'Mary Adhiambo', 'Nathan Gitau', 'Olivia Nyambura', 'Patrick Omondi'
]

const MESSAGES = [
  'I never thought I would qualify this fast. Nyota Funds changed my life.',
  'The process was simple and the funds arrived quickly. Highly recommend.',
  'I used my grant to clear school fees. God bless this platform.',
  'Within 3 days I had the money. Very transparent and trustworthy.',
  'Applied in the morning, received funds by evening. Amazing!',
  'This platform is legit. My whole family is grateful.',
  'Nyota Funds helped me start my small business. Thank you!',
  'I was skeptical at first but they delivered. Will apply again.',
]

function randomAmount() {
  const amounts = [22500, 27000, 31500, 36000, 40500, 49500, 58500, 67500]
  return amounts[Math.floor(Math.random() * amounts.length)]
}

function randomTestimonial() {
  return {
    name: NAMES[Math.floor(Math.random() * NAMES.length)],
    message: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
    amount: randomAmount(),
    time: `${Math.floor(Math.random() * 23) + 1}h ago`,
  }
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(() =>
    Array.from({ length: 6 }, randomTestimonial)
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonials(prev => {
        const updated = [...prev]
        const idx = Math.floor(Math.random() * updated.length)
        updated[idx] = randomTestimonial()
        return updated
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-2">What Recipients Say</h2>
        <p className="text-purple-300 text-center mb-12">Live updates from our community</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="glass rounded-2xl p-6 transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center text-white font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-purple-400 text-xs">{t.time}</p>
                </div>
                <span className="ml-auto text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded-full">
                  KES {t.amount.toLocaleString()}
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">"{t.message}"</p>
              <div className="flex mt-3 gap-1">
                {[...Array(5)].map((_, s) => (
                  <span key={s} className="text-yellow-400 text-xs">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
