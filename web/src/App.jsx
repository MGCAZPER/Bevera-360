import React, { useRef } from 'react';
import { BartenderProvider, useBartender } from './context/BartenderContext';
import { Header } from './components/Header';
import { DrinkSelectionGrid } from './components/DrinkSelectionGrid';
import { CustomizationPanel } from './components/CustomizationPanel';
import { OrderSummaryCard } from './components/OrderSummaryCard';
import { MachineStatusPanel } from './components/MachineStatusPanel';
import { PreparationScreen } from './components/PreparationScreen';
import { CompletionScreen } from './components/CompletionScreen';
import { AdminDashboard } from './components/AdminDashboard';
import { SystemCalibration } from './components/SystemCalibration';
import { ManualDiagnostics } from './components/ManualDiagnostics';
import { FigmaBoard } from './components/FigmaBoard';
import { BartenderQueue } from './components/BartenderQueue';
import { CustomerMenu } from './components/CustomerMenu';
import { RoboDashboard } from './components/RoboDashboard';
import { PresentationBoard } from './components/PresentationBoard';
import { DrinkCustomizerModal } from './components/DrinkCustomizerModal';
import { DrinkWeightCustomizer } from './components/DrinkWeightCustomizer';
import { DispenseStatusModal } from './components/DispenseStatusModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ArrowRight, PlayCircle, Martini, UsersRound, Award, CalendarDays, MapPin, Phone, Mail, Cpu, Gauge, ShieldCheck, Zap, Droplets, Activity, RefreshCw } from 'lucide-react';

function MainPage() {
  const { activeScreen, setActiveScreen, selectedDrink, liquidParameters, flowRates, cupDetected, esp32Connected, hardwareMode, currentLiquidMl, totalLiquidMl, activePumpIdx, pumpsState, pollEsp32, grossWeightGrams, netWeightGrams, scaleFactor, tareScale } = useBartender();
  const menuRef = useRef(null);
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  if (activeScreen === 'weight_customizer') return <DrinkWeightCustomizer />;
  if (activeScreen === 'admin') return <AdminDashboard />;
  if (activeScreen === 'calibration') return <SystemCalibration />;
  if (activeScreen === 'diagnostics') return <ManualDiagnostics />;
  if (activeScreen === 'preparation') return <PreparationScreen />;
  if (activeScreen === 'completion') return <CompletionScreen />;
  if (activeScreen === 'figma_board') return <FigmaBoard />;
  if (activeScreen === 'queue') return <BartenderQueue />;
  if (activeScreen === 'customer_menu') return <CustomerMenu onSelectOrder={() => setActiveScreen('preparation')} />;
  if (activeScreen === 'robo_dashboard') return <RoboDashboard />;
  if (activeScreen === 'presentation') return <PresentationBoard />;
  if (activeScreen === 'customizer') return <DrinkCustomizerModal inline={true} onClose={() => setActiveScreen('main')} />;

  return <div className="site-page">
    <section className="hero" id="home">
      <div className="hero-bg" />
      <div className="hero-motion" aria-hidden="true"><span className="orb orb-a"/><span className="orb orb-b"/><span className="orb orb-c"/><span className="pour-stream"/><span className="motion-ring ring-a"/><span className="motion-ring ring-b"/></div>
      <div className="hero-content"><div className="hero-copy">
        <div className="eyebrow"><span /> PROFESSIONAL BARTENDING <span /></div>
        <h1>CRAFTING DRINKS<br />CREATING MEMORIES</h1>
        <p>Choose your drink, tune the liquid parameters and let the ESP32-controlled dispensing system prepare it with sensor-verified precision.</p>
        <div className="hero-actions">
          <button className="gold-btn" onClick={() => scrollTo('menu')}>BOOK NOW <ArrowRight size={18} /></button>
          <button className="outline-btn" onClick={() => scrollTo('system')}><PlayCircle size={18} /> WATCH SYSTEM</button>
        </div>
      </div></div>
    </section>

    <section className="feature-strip" id="services">
      <div className="feature"><div className="feature-icon"><Martini /></div><div><b>SMART RECIPES</b><p>Drink recipes with exact liquid volumes and pump mapping.</p></div></div>
      <div className="feature"><div className="feature-icon"><Gauge /></div><div><b>LIQUID PARAMETERS</b><p>Flow rate, target ml and dispense time per pump.</p></div></div>
      <div className="feature"><div className="feature-icon"><UsersRound /></div><div><b>ESP32 CONTROL</b><p>Live hardware status with API polling and command control.</p></div></div>
      <div className="feature"><div className="feature-icon"><ShieldCheck /></div><div><b>LOAD CELL SENSING</b><p>Real-time HX711 scale measures exact poured drink weight.</p></div></div>
    </section>

    <section className="about-section" id="about">
      <div className="about-image"><img src="/images/robo_machine.png" alt="Automated bartender machine" /></div>
      <div className="about-copy"><div className="section-kicker">ABOUT US <i /></div><h2>PASSION FOR PRECISION</h2><p>More than a cocktail interface, this is a complete smart beverage control surface: recipes, customization, liquid parameters, ESP32 connectivity, IR cup detection, load cell weight measuring, pump control, calibration, diagnostics and order tracking.</p><div className="signature">Cheers!</div><span>The Bartender Team</span></div>
      <div className="stats"><div><strong>500+</strong><span>Events Completed</span></div><div><strong>1000+</strong><span>Happy Clients</span></div><div><strong>5+</strong><span>Years Experience</span></div></div>
    </section>

    <section className="menu-section" id="menu" ref={menuRef}>
      <div className="menu-heading"><div><div className="section-kicker">SIGNATURE COCKTAILS <i /></div><h2>OUR DRINKS</h2><p>Select a recipe to see ingredients, volumes, customization and machine parameters.</p></div><div className="availability">04 AVAILABLE</div></div>
      <DrinkSelectionGrid />
    </section>

    <section className="order-section" id="contact">
      <div className="custom-box"><div className="box-title"><div><span>PERSONALIZATION</span><h3>MAKE IT YOURS</h3></div><Zap /></div><CustomizationPanel /></div>
      <div className="order-box"><div className="box-title"><div><span>CHECKOUT</span><h3>YOUR ORDER</h3></div><Activity /></div><OrderSummaryCard /></div>
    </section>

    <section className="system-section" id="system">
      <div className="system-heading"><div><div className="section-kicker">HARDWARE MONITOR <i /></div><h2>ESP32 + LIQUID & LOAD CELL SENSORS</h2><p>Live sensor detection, weight measurement scale, pump activation and exact liquid parameters.</p></div><button className="system-refresh" onClick={pollEsp32}><RefreshCw size={15} /> REFRESH ESP32</button></div>
      <div className="system-grid">
        <div className="system-card sensor-card">
          <div className="system-card-head"><span>ESP32 CONNECTION</span><span className={esp32Connected ? 'online-dot' : 'offline-dot'}>{esp32Connected ? 'ONLINE' : 'OFFLINE'}</span></div>
          <div className="sensor-main"><Cpu size={30} /><div><strong>{hardwareMode === 'LIVE_ESP32' ? 'LIVE ESP32' : 'SIMULATION DEMO'}</strong><small>{esp32Connected ? 'API status polling active' : 'Check IP / Wi-Fi and ESP32 API'}</small></div></div>
          <div className="sensor-row"><span>IR CUP SENSOR</span><b className={cupDetected ? 'ok' : 'danger'}>{cupDetected ? 'DETECTED / LOW' : 'EMPTY / HIGH'}</b></div>
          <div className="sensor-row"><span>HX711 LOAD CELL</span><b className="ok">{grossWeightGrams.toFixed(1)} g GROSS</b></div>
          <div className="sensor-row" style={{ marginTop: '6px' }}><span>NET DRINK WEIGHT</span><b style={{ color: '#dca43a' }}>{netWeightGrams.toFixed(1)} g POURED</b></div>
          <button style={{ marginTop: '10px', padding: '4px 10px', fontSize: '11px', background: 'rgba(220,164,58,0.2)', border: '1px solid #dca43a', borderRadius: '4px', color: '#fff', cursor: 'pointer' }} onClick={tareScale}>TARE LOAD CELL</button>
        </div>
        <div className="system-card liquid-card"><div className="system-card-head"><span>LIQUID PARAMETERS · {selectedDrink.name}</span><span>{currentLiquidMl.toFixed(0)} / {totalLiquidMl.toFixed(0)} ML</span></div><div className="liquid-list">{liquidParameters.map(p => <div className="liquid-row" key={p.pump}><div><b>P{p.pump} · {p.ingredient}</b><small>{p.targetMl} ml target · {p.flowMlSec.toFixed(1)} ml/s · {p.seconds.toFixed(1)}s</small></div><span>{p.targetMl} ML</span></div>)}</div></div>
        <div className="system-card pump-card"><div className="system-card-head"><span>7-RELAY HARDWARE ACTIVITY</span><span>{activePumpIdx >= 0 ? `RELAY ${activePumpIdx + 1} ACTIVE` : 'IDLE'}</span></div><div className="pump-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>{pumpsState.map((p, i) => <div key={p.id} className={`pump-tile ${p.status === 'ON' ? 'pump-on' : ''}`}><Droplets size={14} /><b>R{i + 1}</b><small>{i < 5 ? `T${i + 1}` : i === 5 ? 'MIX' : 'CUP'}</small></div>)}</div><div className="pump-note">{activePumpIdx >= 0 ? `Active: ${pumpsState[activePumpIdx]?.name || `Relay ${activePumpIdx + 1}`}` : 'Relays 1–5: Tanks -> Mixer | Relay 6: Mixer Motor | Relay 7: Mixer -> Cup (Load Cell Verified).'}</div></div>
      </div>
    </section>

    <section className="contact-band" id="gallery"><div><div className="section-kicker">LET'S CELEBRATE <i /></div><h2>MAKE YOUR NEXT EVENT<br /><em>UNFORGETTABLE.</em></h2></div><div className="contact-details"><span><CalendarDays /> Book your date</span><span><MapPin /> Events across Sri Lanka</span><a href="tel:0722104960"><Phone /> 0722104960</a><a href="mailto:bevera360@gmail.com"><Mail /> bevera360@gmail.com</a></div></section>
  </div>;
}

function AppContent() {
  const { isCustomizerModalOpen, setIsCustomizerModalOpen } = useBartender();
  return (
    <>
      <Header />
      <main><MainPage /></main>
      <MobileBottomNav />
      <DispenseStatusModal />
      {isCustomizerModalOpen && (
        <DrinkCustomizerModal onClose={() => setIsCustomizerModalOpen(false)} />
      )}
    </>
  );
}

function App() {
  return (
    <BartenderProvider>
      <AppContent />
    </BartenderProvider>
  );
}

export default App;

