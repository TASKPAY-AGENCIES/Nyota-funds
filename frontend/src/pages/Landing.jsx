import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Testimonials from '../components/Testimonials'
import { GRANT_TIERS } from '../data/grantTiers'

export default function Landing() {
  return (
    <div style={{background:'#060f06',color:'#fff',fontFamily:"'Inter',sans-serif",minHeight:'100vh'}}>
      <Navbar/>

      {/* HERO */}
      <section style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'url(https://i.postimg.cc/wvYCdZG1/IMG-20260830-WA0008.jpg)',backgroundSize:'cover',backgroundPosition:'center top',zIndex:0}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(120deg,rgba(6,15,6,0.92) 45%,rgba(6,15,6,0.55) 100%)',zIndex:1}}/>
        <div style={{position:'absolute',top:0,left:0,right:0,height:'5px',background:'linear-gradient(90deg,#006600,#fff,#be0000)',zIndex:2}}/>
        <div style={{position:'relative',zIndex:2,maxWidth:'700px',padding:'120px 24px 80px'}}>
          <div style={{display:'inline-block',background:'#be0000',color:'#fff',fontSize:'11px',fontWeight:700,letterSpacing:'2px',padding:'6px 14px',marginBottom:'24px',textTransform:'uppercase'}}>Official Grant Programme · Kenya 2026</div>
          <h1 style={{fontSize:'clamp(48px,8vw,88px)',fontWeight:900,lineHeight:1,marginBottom:'16px',letterSpacing:'-2px'}}>
            NYOTA<br/>
            <span style={{color:'#d4a017'}}>FUNDS</span><br/>
            KENYA
          </h1>
          <p style={{fontSize:'20px',color:'rgba(255,255,255,0.8)',maxWidth:'480px',lineHeight:1.6,marginBottom:'12px'}}>Community-powered grants for every Kenyan. Apply today and receive up to</p>
          <div style={{fontSize:'clamp(36px,6vw,64px)',fontWeight:900,color:'#4ade80',marginBottom:'40px',letterSpacing:'-1px'}}>KES 105,000</div>
          <div style={{display:'flex',gap:'16px',flexWrap:'wrap'}}>
            <Link to="/apply" style={{background:'#be0000',color:'#fff',padding:'18px 40px',fontWeight:800,fontSize:'16px',textDecoration:'none',display:'inline-block',letterSpacing:'0.5px'}}>APPLY NOW →</Link>
            <a href="#how-it-works" style={{border:'2px solid rgba(255,255,255,0.4)',color:'#fff',padding:'18px 32px',fontWeight:600,fontSize:'16px',textDecoration:'none',display:'inline-block'}}>How It Works</a>
          </div>
        </div>
      </section>

      {/* STAT BAR */}
      <div style={{background:'#be0000',padding:'0'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(3,1fr)',textAlign:'center'}}>
          {[{value:'2,400+',label:'Grants Disbursed'},{value:'KES 48M+',label:'Total Distributed'},{value:'98%',label:'Success Rate'}].map((s,i)=>(
            <div key={i} style={{padding:'28px 16px',borderRight:i<2?'1px solid rgba(255,255,255,0.2)':'none'}}>
              <div style={{fontSize:'32px',fontWeight:900,color:'#fff'}}>{s.value}</div>
              <div style={{fontSize:'13px',color:'rgba(255,255,255,0.75)',marginTop:'4px',textTransform:'uppercase',letterSpacing:'1px'}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{padding:'100px 24px',background:'#060f06'}}>
        <div style={{maxWidth:'1000px',margin:'0 auto'}}>
          <div style={{marginBottom:'60px'}}>
            <div style={{width:'48px',height:'4px',background:'#d4a017',marginBottom:'20px'}}/>
            <h2 style={{fontSize:'42px',fontWeight:900,letterSpacing:'-1px'}}>How to Get Your Grant</h2>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:'18px',marginTop:'8px'}}>Simple. Fast. Transparent.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'2px',background:'rgba(255,255,255,0.08)'}}>
            {[
              {n:'01',title:'Fill Your Details',desc:'Name, phone, ID and county — takes under 2 minutes.'},
              {n:'02',title:'State Your Purpose',desc:'Choose the reason you need this grant.'},
              {n:'03',title:'Choose Your Amount',desc:'Select from KES 22,500 up to KES 105,000.'},
              {n:'04',title:'Pay via M-Pesa',desc:'Small registration fee confirms your application instantly.'},
            ].map((item,i)=>(
              <div key={i} style={{padding:'40px 28px',background:'#0a150a'}}>
                <div style={{fontSize:'48px',fontWeight:900,color:'rgba(212,160,23,0.25)',marginBottom:'16px',letterSpacing:'-2px'}}>{item.n}</div>
                <h3 style={{fontSize:'18px',fontWeight:700,marginBottom:'10px'}}>{item.title}</h3>
                <p style={{color:'rgba(255,255,255,0.5)',fontSize:'14px',lineHeight:1.6}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRANT TIERS */}
      <section id="tiers" style={{padding:'100px 24px',background:'#0a150a'}}>
        <div style={{maxWidth:'1000px',margin:'0 auto'}}>
          <div style={{marginBottom:'60px'}}>
            <div style={{width:'48px',height:'4px',background:'#be0000',marginBottom:'20px'}}/>
            <h2 style={{fontSize:'42px',fontWeight:900,letterSpacing:'-1px'}}>Grant Tiers</h2>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:'18px',marginTop:'8px'}}>Choose the amount that fits your need.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'2px',background:'rgba(255,255,255,0.06)'}}>
            {GRANT_TIERS.map((tier,i)=>(
              <Link key={tier.id} to="/apply" style={{display:'block',padding:'28px 20px',background:'#0a150a',textDecoration:'none',borderBottom:'3px solid transparent',transition:'border-color 0.2s'}}
                onMouseEnter={e=>e.currentTarget.style.borderBottomColor='#d4a017'}
                onMouseLeave={e=>e.currentTarget.style.borderBottomColor='transparent'}>
                <div style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'8px'}}>Tier {tier.id}</div>
                <div style={{fontSize:'22px',fontWeight:900,color:'#4ade80',marginBottom:'6px'}}>KES {tier.amount.toLocaleString()}</div>
                <div style={{fontSize:'13px',color:'rgba(255,255,255,0.4)'}}>Fee: KES {tier.fee}</div>
                <div style={{marginTop:'16px',fontSize:'12px',color:'#d4a017',fontWeight:700}}>APPLY →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials/>

      {/* CTA */}
      <section style={{padding:'100px 24px',background:'#be0000',textAlign:'center'}}>
        <div style={{maxWidth:'600px',margin:'0 auto'}}>
          <h2 style={{fontSize:'48px',fontWeight:900,marginBottom:'16px',letterSpacing:'-1px'}}>Ready to Apply?</h2>
          <p style={{fontSize:'18px',color:'rgba(255,255,255,0.8)',marginBottom:'40px'}}>Join thousands of Kenyans who have already received their grants.</p>
          <Link to="/apply" style={{background:'#fff',color:'#be0000',padding:'20px 56px',fontWeight:900,fontSize:'18px',textDecoration:'none',display:'inline-block',letterSpacing:'0.5px'}}>START APPLICATION →</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:'#030803',padding:'40px 24px',textAlign:'center',color:'rgba(255,255,255,0.3)',fontSize:'13px'}}>
        <div style={{width:'48px',height:'3px',background:'linear-gradient(90deg,#006600,#fff,#be0000)',margin:'0 auto 20px'}}/>
        <p>© 2026 Nyota Funds Kenya. All rights reserved.</p>
        <p style={{marginTop:'6px'}}>Support: nyotafunds@gmail.com</p>
      </footer>
    </div>
  )
}
