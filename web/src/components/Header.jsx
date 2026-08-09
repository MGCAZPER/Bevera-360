import React from 'react';
import { CalendarDays, ChevronDown, Cpu, Martini, Settings2, Activity, Sparkles, Mail, Phone } from 'lucide-react';
import { useBartender } from '../context/BartenderContext';

export const Header = () => {
  const { activeScreen, setActiveScreen, esp32Connected, hardwareMode, setHardwareMode } = useBartender();
  const nav = [['main','HOME'],['services','SERVICES'],['about','ABOUT'],['gallery','GALLERY'],['menu','MENU'],['contact','CONTACT']];
  const scroll = id => { if (id === 'main') setActiveScreen('main'); else document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); };
  return <header className="site-header">
    <button className="brand" onClick={() => setActiveScreen('main')} aria-label="Bevera 360 home"><span className="brand-mark bevera-logo"><span className="logo-ring"/><Martini size={23}/></span><span><strong>BEVERA <em>360</em></strong><small>SMART BARTENDER</small></span></button>
    <nav className="desktop-nav">{nav.map(([id,label]) => <button key={id} className={id === 'main' && activeScreen === 'main' ? 'active' : ''} onClick={() => scroll(id)}>{label}</button>)}<div className="system-nav"><button onClick={() => setActiveScreen('admin')}><Settings2 size={13}/> SYSTEM <ChevronDown size={12}/></button><div className="system-menu"><button onClick={() => setActiveScreen('admin')}><Activity size={13}/> Dashboard</button><button onClick={() => setActiveScreen('calibration')}><Cpu size={13}/> Calibration</button><button onClick={() => setActiveScreen('diagnostics')}><Settings2 size={13}/> Diagnostics</button></div></div></nav>
    <div className="header-contact"><a href="mailto:bevera360@gmail.com"><Mail size={13}/> bevera360@gmail.com</a><a href="tel:0722104960"><Phone size={13}/> 0722104960</a></div><div className="header-right"><button className="esp-toggle" onClick={() => setHardwareMode(hardwareMode === 'LIVE_ESP32' ? 'SIMULATION_DEMO' : 'LIVE_ESP32')}><span className={esp32Connected ? 'conn-dot' : 'conn-dot off'} />{hardwareMode === 'LIVE_ESP32' ? 'ESP32 LIVE' : 'DEMO'}</button><button className="header-book" onClick={() => scroll('menu')}><CalendarDays size={16}/> BOOK NOW</button></div>
  </header>;
};
