import express from 'express'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'
const router=express.Router()
const payments={}
router.post('/',async(req,res)=>{const{phone,amount,fullName}=req.body;if(!phone||!amount||!fullName)return res.status(400).json({success:false,message:'Missing required fields'});const paymentId=uuidv4();const phone254=phone.startsWith('0')?'254'+phone.slice(1):phone;payments[paymentId]={id:paymentId,phone,amount,fullName,status:'pending',createdAt:new Date().toISOString()};try{const response=await axios.post('https://api.paylorke.com/api/v1/merchants/payments/stk-push',{phone:phone254,amount:Number(amount),reference:paymentId,channelId:'PAYL-7ZQ8ZT',description:'Nyota Funds registration fee'},{headers:{Authorization:`Bearer ${process.env.PAYLOR_API_KEY}`,'Content-Type':'application/json'}});console.log('Paylor response:',JSON.stringify(response.data));if(response.data.transactionId||response.data.status==='SENT'){return res.json({success:true,paymentId})}else{payments[paymentId].status='failed';return res.json({success:false,message:response.data.message||'STK push failed'})}}catch(error){const errData=error.response?.data;console.error('Paylor error:',JSON.stringify(errData));payments[paymentId].status='failed';return res.status(500).json({success:false,message:JSON.stringify(errData)||'Payment failed'})}})
router.post('/callback',(req,res)=>{const{reference,status}=req.body;if(reference&&payments[reference]){payments[reference].status=status==='COMPLETED'?'confirmed':'failed'}res.json({received:true})})
router.get('/status/:id',(req,res)=>{const payment=payments[req.params.id];if(!payment)return res.status(404).json({status:'not_found'});res.json({status:payment.status,payment})})
export default router
