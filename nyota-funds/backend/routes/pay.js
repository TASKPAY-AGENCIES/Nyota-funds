import express from 'express'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// In-memory payment store (no database needed)
const payments = {}

// POST /api/pay - Trigger Paylor STK Push
router.post('/', async (req, res) => {
  const { phone, amount, fullName, tierAmount } = req.body

  if (!phone || !amount || !fullName) {
    return res.status(400).json({ success: false, message: 'Missing required fields' })
  }

  const paymentId = uuidv4()

  // Store payment as pending
  payments[paymentId] = {
    id: paymentId,
    phone,
    amount,
    tierAmount,
    fullName,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  try {
    // TODO: Replace with actual Paylor STK Push endpoint from their docs
    const response = await axios.post(
      `${process.env.PAYLOR_BASE_URL}/stk-push`, // ← confirm this URL from Paylor docs
      {
        phone,
        amount,
        reference: paymentId,
        description: `Nyota Funds registration fee - ${fullName}`,
        callback_url: `${process.env.BACKEND_URL}/api/pay/callback`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYLOR_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (response.data.success || response.data.status === 'success') {
      return res.json({ success: true, paymentId })
    } else {
      payments[paymentId].status = 'failed'
      return res.json({ success: false, message: response.data.message || 'STK push failed' })
    }
  } catch (error) {
    console.error('Paylor STK Push error:', error.response?.data || error.message)
    payments[paymentId].status = 'failed'
    return res.status(500).json({
      success: false,
      message: error.response?.data?.message || 'Payment initiation failed',
    })
  }
})

// POST /api/pay/callback - Paylor webhook
router.post('/callback', (req, res) => {
  const { reference, status } = req.body

  console.log('Paylor callback received:', req.body)

  if (reference && payments[reference]) {
    payments[reference].status = status === 'success' ? 'confirmed' : 'failed'
    payments[reference].updatedAt = new Date().toISOString()
  }

  res.json({ received: true })
})

// GET /api/pay/status/:id - Frontend polls this
router.get('/status/:id', (req, res) => {
  const { id } = req.params
  const payment = payments[id]

  if (!payment) {
    return res.status(404).json({ status: 'not_found' })
  }

  res.json({ status: payment.status, payment })
})

export default router
