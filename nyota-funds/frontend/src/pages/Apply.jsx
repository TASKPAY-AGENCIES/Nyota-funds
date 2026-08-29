import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import StepIndicator from '../components/StepIndicator'
import { GRANT_TIERS } from '../data/grantTiers'

const PURPOSES = [
  'Education & School Fees',
  'Medical Emergency',
  'Business Startup',
  'House Rent Arrears',
  'Agricultural Input',
  'Family Emergency',
  'Other',
]

export default function Apply() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    idNumber: '',
    county: '',
    purpose: '',
    description: '',
    selectedTier: null,
  })

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const next = () => { setError(''); setStep(s => s + 1) }
  const back = () => { setError(''); setStep(s => s - 1) }

  const validateStep = () => {
    if (step === 1) {
      if (!form.fullName.trim()) return 'Please enter your full name'
      if (!form.phone.match(/^(07|01)\d{8}$/)) return 'Enter a valid Safaricom number (07xx or 01xx)'
      if (!form.idNumber.trim()) return 'Please enter your ID number'
      if (!form.county.trim()) return 'Please enter your county'
    }
    if (step === 2) {
      if (!form.purpose) return 'Please select a purpose'
      if (form.description.trim().length < 20) return 'Please describe your need (at least 20 characters)'
    }
    if (step === 3) {
      if (!form.selectedTier) return 'Please select a grant tier'
    }
    return null
  }

  const handleNext = () => {
    const err = validateStep()
    if (err) { setError(err); return }
    next()
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const tier = GRANT_TIERS.find(t => t.id === form.selectedTier)
      const res = await axios.post('/api/pay', {
        phone: form.phone,
        amount: tier.fee,
        tierAmount: tier.amount,
        fullName: form.fullName,
      })
      if (res.data.success) {
        navigate('/success', { state: { phone: form.phone, tier } })
      } else {
        setError(res.data.message || 'Payment failed. Please try again.')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const selectedTierData = GRANT_TIERS.find(t => t.id === form.selectedTier)

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #16023a 50%, #0d001f 100%)' }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Apply for a Grant</h1>
          <p className="text-purple-300 mt-2">Complete all steps to submit your application</p>
        </div>

        <StepIndicator current={step} />

        <div className="glass rounded-3xl p-8">
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-white mb-6">Personal Information</h2>
              {[
                { label: 'Full Name', field: 'fullName', placeholder: 'e.g. Jane Wanjiku' },
                { label: 'M-Pesa Phone Number', field: 'phone', placeholder: 'e.g. 0712345678' },
                { label: 'National ID Number', field: 'idNumber', placeholder: 'e.g. 12345678' },
                { label: 'County', field: 'county', placeholder: 'e.g. Nairobi' },
              ].map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label className="block text-purple-300 text-sm font-medium mb-2">{label}</label>
                  <input
                    type="text"
                    value={form[field]}
                    onChange={e => update(field, e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 placeholder-gray-500"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Grant Purpose */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-white mb-6">Grant Purpose</h2>
              <div>
                <label className="block text-purple-300 text-sm font-medium mb-3">Why do you need this grant?</label>
                <div className="grid grid-cols-2 gap-3">
                  {PURPOSES.map(p => (
                    <button
                      key={p}
                      onClick={() => update('purpose', p)}
                      className={`text-left px-4 py-3 rounded-xl text-sm transition border
                        ${form.purpose === p
                          ? 'bg-purple-600 border-purple-500 text-white'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-purple-300 text-sm font-medium mb-2">Describe your situation</label>
                <textarea
                  value={form.description}
                  onChange={e => update('description', e.target.value)}
                  rows={4}
                  placeholder="Briefly explain why you need this grant and how you will use it..."
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 placeholder-gray-500 resize-none"
                />
                <p className="text-gray-500 text-xs mt-1">{form.description.length} characters</p>
              </div>
            </div>
          )}

          {/* Step 3: Select Tier */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Select Grant Tier</h2>
              <div className="grid grid-cols-2 gap-3">
                {GRANT_TIERS.map(tier => (
                  <button
                    key={tier.id}
                    onClick={() => update('selectedTier', tier.id)}
                    className={`text-left p-4 rounded-xl border transition
                      ${form.selectedTier === tier.id
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}
                  >
                    <p className="text-xs opacity-60 mb-1">Tier {tier.id}</p>
                    <p className="font-bold">KES {tier.amount.toLocaleString()}</p>
                    <p className="text-xs mt-1 opacity-70">Fee: KES {tier.fee}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: M-Pesa Payment */}
          {step === 4 && selectedTierData && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Confirm & Pay</h2>
              <div className="bg-purple-900/30 border border-purple-500/30 rounded-2xl p-6 mb-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Applicant</span>
                  <span className="text-white font-medium">{form.fullName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Phone</span>
                  <span className="text-white font-medium">{form.phone}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Grant Amount</span>
                  <span className="text-green-400 font-bold">KES {selectedTierData.amount.toLocaleString()}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-gray-400">Registration Fee</span>
                  <span className="text-white font-bold text-lg">KES {selectedTierData.fee}</span>
                </div>
              </div>
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4 mb-6 text-sm text-blue-300">
                📱 An M-Pesa STK Push will be sent to <strong>{form.phone}</strong>. Enter your PIN to complete payment.
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition"
              >
                {loading ? 'Sending M-Pesa prompt...' : `Pay KES ${selectedTierData.fee} via M-Pesa`}
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button onClick={back} className="text-purple-300 hover:text-white transition text-sm">
                ← Back
              </button>
            ) : <div />}

            {step < 4 && (
              <button
                onClick={handleNext}
                className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-xl font-semibold transition ml-auto"
              >
                Continue →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
