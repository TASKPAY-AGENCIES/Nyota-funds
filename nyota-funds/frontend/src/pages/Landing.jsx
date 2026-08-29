import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Testimonials from '../components/Testimonials'
import { GRANT_TIERS } from '../data/grantTiers'

export default function Landing() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #16023a 50%, #0d001f 100%)' }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm px-4 py-2 rounded-full mb-6">
            🌟 Kenya's Trusted Community Grant Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Get a Grant Up to<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              KES 105,000
            </span>
          </h1>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Nyota Funds Kenya connects you with community-funded grants. Simple application, 
            fast disbursement, transparent process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/apply"
              className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl text-lg font-bold transition shadow-lg shadow-purple-900/50"
            >
              Apply for a Grant →
            </Link>
            <a
              href="#how-it-works"
              className="glass text-white px-8 py-4 rounded-xl text-lg font-semibold transition hover:bg-white/10"
            >
              How it Works
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { value: '2,400+', label: 'Grants Disbursed' },
            { value: 'KES 48M+', label: 'Total Distributed' },
            { value: '98%', label: 'Success Rate' },
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl p-6">
              <p className="text-3xl font-extrabold text-purple-300">{s.value}</p>
              <p className="text-gray-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-2">How It Works</h2>
          <p className="text-purple-300 text-center mb-12">Four simple steps to receive your grant</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Fill Your Details', desc: 'Provide your personal information and phone number.' },
              { step: '02', title: 'State Your Purpose', desc: 'Tell us why you need this grant.' },
              { step: '03', title: 'Choose Your Tier', desc: 'Select a grant amount that fits your needs.' },
              { step: '04', title: 'Pay Registration Fee', desc: 'Pay a small fee via M-Pesa to confirm your application.' },
            ].map((item, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center">
                <div className="text-purple-400 text-3xl font-black mb-3">{item.step}</div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grant Tiers */}
      <section id="tiers" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-2">Grant Tiers</h2>
          <p className="text-purple-300 text-center mb-12">Choose the grant amount that suits you</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GRANT_TIERS.map((tier) => (
              <Link
                key={tier.id}
                to="/apply"
                className="glass rounded-xl p-4 hover:bg-purple-500/20 transition group text-center"
              >
                <p className="text-purple-300 text-xs mb-1">Tier {tier.id}</p>
                <p className="text-white font-bold text-lg">KES {tier.amount.toLocaleString()}</p>
                <p className="text-gray-400 text-xs mt-1">Fee: KES {tier.fee}</p>
                <span className="mt-3 inline-block text-purple-400 text-xs group-hover:text-purple-200 transition">Apply →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto glass rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Apply?</h2>
          <p className="text-gray-300 mb-8">Join thousands of Kenyans who have received grants through Nyota Funds.</p>
          <Link
            to="/apply"
            className="bg-purple-600 hover:bg-purple-500 text-white px-10 py-4 rounded-xl text-lg font-bold transition inline-block"
          >
            Start Your Application →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 text-center text-gray-500 text-sm">
        <p>© 2024 Nyota Funds Kenya. All rights reserved.</p>
        <p className="mt-1">For support: nyotafunds@gmail.com</p>
      </footer>
    </div>
  )
}
