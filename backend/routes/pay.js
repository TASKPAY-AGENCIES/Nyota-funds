import express from 'express'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'
const router=express.Router()
const payments={}
router.post('/',async(req,res)=>{const{phone,amount,fullName,tierAmount}=req.body;if(!phone||!amount||!fullName)return res.status(400).json({success:false,message:'Missing required fields'});const paymentId=uuidv4();payments[paymentId]={id:paymentId,phone,amount,tierAmount,fullName,status:'pending',createdAt:new Date().toISOString()};try{const response=await axios.post(`${process.env.PAYLOR_BASE_URL}/stk-push`,{phone,amount,reference:paymentId,description:`Nyota Funds registration - ${fullName}`,callback_url:`${process.env.BACKEND_URL}/api/pay/callback`},{headers:{Authorization:`Bearer ${process.env.PAYLOR_API_KEY}`,'Content-Type':'application/json'}});if(response.data.success||response.data.status==='success'){return res.json({success:true,paymentId})}else{payments[paymentId].status='failed';return res.json({success:false,message:response.data.message||'STK push failed'})}}catch(error){console.error('Paylor error:',error.response?.data||error.message);payments[paymentId].status='failed';return res.status(500).json({success:false,message:error.response?.data?.message||'Payment initiation failed'})}})
router.post('/callback',(req,res)=>{const{reference,status}=req.body;if(reference&&payments[reference]){payments[reference].status=status==='success'?'confirmed':'failed';payments[reference].updatedAt=new Date().toISOString()}res.json({received:true})})
router.get('/status/:id',(req,res)=>{const payment=payments[req.params.id];if(!payment)return res.status(404).json({status:'not_found'});res.json({status:payment.status,payment})})
export default router
