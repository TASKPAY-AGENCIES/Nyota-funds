import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import payRoutes from './routes/pay.js'
dotenv.config()
const app=express()
const PORT=process.env.PORT||5000
app.use(cors())
app.use(express.json())
app.use('/api/pay',payRoutes)
app.get('/api/health',(req,res)=>res.json({status:'ok',service:'Nyota Funds API'}))
app.listen(PORT,()=>console.log(`✅ Nyota Funds backend running on port ${PORT}`))
