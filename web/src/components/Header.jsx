import React from 'react';
import { CalendarDays, ChevronDown, Cpu, Martini, Settings2, Activity, Sparkles, Mail, Phone, Layers, LayoutDashboard, SlidersHorizontal, MonitorPlay, GlassWater, Scale } from 'lucide-react';
import { useBartender } from '../context/BartenderContext';

export const Header = () => {
  const { activeScreen, setActiveScreen, esp32Connected, hardwareMode, setHardwareMode, setIsCustomizerModalOpen } = useBartender();
  const nav = [
    ['main', 'HOME'],
    ['weight_customizer', 'WEIGHT STUDIO'],
    ['robo_dashboard', 'ROBO HUB'],
    ['customer_menu', 'MENU'],
    ['queue', 'QUEUE']
  ];
  const scroll = id => {
    if (['main', 'weight_customizer', 'robo_dashboard', 'customer_menu', 'queue'].includes(id)) {
      setActiveScreen(id);
    } else {
      if (activeScreen !== 'main') {
        setActiveScreen('main');
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  return <header className="site-header">
    <button className="brand" onClick={() => setActiveScreen('main')} aria-label="Bevera 360 home">
      <span className="brand-mark bevera-logo"><span className="logo-ring"/><Martini size={23}/></span>
      <span><strong>BEVERA <em>360</em></strong><small>SMART BARTENDER</small></span>
    </button>
    <nav className="desktop-nav">
      {nav.map(([id, label]) => <button key={id} className={activeScreen === id ? 'active' : ''} onClick={() => scroll(id)}>{label}</button>)}
      <button className="mixology-lab-btn" onClick={() => setIsCustomizerModalOpen(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(220, 164, 58, 0.15)', border: '1px solid #dca43a', color: '#dca43a', borderRadius: '20px', padding: '4px 10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
        <Sparkles size={12} /> LAB
      </button>
      <div className="system-nav">
        <button onClick={() => setActiveScreen('admin')}><Settings2 size={13}/> SYSTEM <ChevronDown size={12}/></button>
        <div className="system-menu">
          <button onClick={() => setActiveScreen('weight_customizer')}><Scale size={13}/> Drink Weight Studio</button>
          <button onClick={() => setActiveScreen('admin')}><Activity size={13}/> Telemetry Dashboard</button>
          <button onClick={() => setActiveScreen('calibration')}><Cpu size={13}/> Flow Calibration</button>
          <button onClick={() => setActiveScreen('diagnostics')}><Settings2 size={13}/> Hardware Bench</button>
          <button onClick={() => setActiveScreen('queue')}><Layers size={13}/> Queue & Tank Inventory</button>
          <button onClick={() => setActiveScreen('customer_menu')}><GlassWater size={13}/> Customer Mixology Menu</button>
          <button onClick={() => setActiveScreen('robo_dashboard')}><LayoutDashboard size={13}/> Robo Pro Hub</button>
          <button onClick={() => setActiveScreen('figma_board')}><SlidersHorizontal size={13}/> Figma Mockup Board</button>
          <button onClick={() => setActiveScreen('presentation')}><MonitorPlay size={13}/> 4K Presentation Canvas</button>
        </div>
      </div>
    </nav>
    <div className="header-contact"><a href="mailto:bevera360@gmail.com"><Mail size={13}/> bevera360@gmail.com</a><a href="tel:0722104960"><Phone size={13}/> 0722104960</a></div>
    <div className="header-right">
      <button className="esp-toggle" onClick={() => setHardwareMode(hardwareMode === 'LIVE_ESP32' ? 'SIMULATION_DEMO' : 'LIVE_ESP32')}>
        <span className={esp32Connected ? 'conn-dot' : 'conn-dot off'} />{hardwareMode === 'LIVE_ESP32' ? 'ESP32 LIVE' : 'DEMO'}
      </button>
      <button className="header-book" onClick={() => scroll('menu')}><CalendarDays size={16}/> BOOK NOW</button>
    </div>
  </header>;
};

