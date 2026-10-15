import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Instagram, Menu, Play, X, Youtube } from "lucide-react";
import "./styles/App.css";

const instagramUrl = "https://www.instagram.com/mr.gearheadintelugu/";
const youtubeUrl = "https://www.youtube.com/@Mr.Gearheadintelugu";

const images = {
  hero: "https://images.unsplash.com/photo-1661050629760-9c927d20ea79?auto=format&fit=crop&w=1800&q=85",
  pdi: "https://images.unsplash.com/photo-1643701079732-3b1c7a797e3d?auto=format&fit=crop&w=1200&q=85",
  delivery: "https://images.unsplash.com/photo-1587893143231-ebba3bedb2ea?auto=format&fit=crop&w=1200&q=85",
  camera: "https://images.unsplash.com/photo-1595340298390-8113ab27284a?auto=format&fit=crop&w=1200&q=85",
};

function BookingModal({ onClose }) {
  const [selected, setSelected] = useState("PDI enquiry");
  const options = ["PDI enquiry", "Delivery shoot", "Reels & editing", "Brand collaboration"];
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" onClick={(e) => e.stopPropagation()} data-testid="booking-modal">
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close booking enquiry" data-testid="booking-modal-close"><X size={20} /></button>
        <span className="eyebrow">Start a conversation</span>
        <h2 id="booking-title">Tell me what<br /><em>you’re driving.</em></h2>
        <p className="modal-copy">Choose what you’re looking for. I’ll take you to Instagram DM to discuss the details.</p>
        <div className="option-list" data-testid="booking-service-options">
          {options.map((option) => <button key={option} className={`option ${selected === option ? "selected" : ""}`} onClick={() => setSelected(option)} data-testid={`booking-option-${option.toLowerCase().replaceAll(" ", "-")}`}><span>{option}</span>{selected === option && <Check size={16} />}</button>)}
        </div>
        <a className="button button-red modal-cta" href={instagramUrl} target="_blank" rel="noreferrer" data-testid="booking-instagram-link">Continue to Instagram <ArrowUpRight size={17} /></a>
        <p className="micro-note">Bookings & collaborations are handled through Instagram DM.</p>
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Mr. Gearhead in Telugu — PDI & Car Delivery Films";
    const description = "PDI services, car delivery shoots, reels and automotive content by Mr. Gearhead in Telugu — Hyderabad, Vijayawada and Vizag.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = description;
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <div className="site-shell">
      <header className="topbar" data-testid="site-header">
        <button className="wordmark" onClick={() => scrollTo("home")} data-testid="brand-home-link"><span className="mark">MG</span><span>MR. GEARHEAD<br /><b>IN TELUGU</b></span></button>
        <nav className={`main-nav ${menuOpen ? "open" : ""}`} data-testid="main-navigation">
          <button onClick={() => scrollTo("services")} data-testid="nav-services-link">Services</button>
          <button onClick={() => scrollTo("work")} data-testid="nav-work-link">Work</button>
          <button onClick={() => scrollTo("about")} data-testid="nav-about-link">About</button>
          <button className="nav-cta" onClick={() => setModalOpen(true)} data-testid="nav-booking-button">Book an enquiry <ArrowUpRight size={15} /></button>
        </nav>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" data-testid="mobile-menu-button">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero" id="home" data-testid="hero-section">
          <div className="hero-image" style={{ backgroundImage: `url(${images.hero})` }} />
          <div className="hero-shade" />
          <div className="hero-grid" />
          <div className="hero-content">
            <div className="hero-kicker"><span className="pulse-dot" /> Automotive content, made personal</div>
            <h1>Know the car.<br /><span>Feel the moment.</span></h1>
            <p className="hero-lede">PDI peace of mind. Cinematic delivery films. Automotive stories in Telugu — from someone who speaks your language.</p>
            <div className="hero-actions"><button className="button button-red" onClick={() => setModalOpen(true)} data-testid="hero-pdi-button">Book a PDI enquiry <ArrowUpRight size={17} /></button><button className="text-link light" onClick={() => scrollTo("work")} data-testid="hero-work-link">See the work <span>↓</span></button></div>
          </div>
          <div className="hero-stamp" data-testid="hero-location-stamp"><span>HYD</span><i>•</i><span>VJA</span><i>•</i><span>VIZAG</span><small>Service locations</small></div>
          <div className="hero-scroll">Scroll to explore <span>↓</span></div>
        </section>

        <section className="ticker" aria-label="Service locations" data-testid="location-ticker"><div>PRE-DELIVERY INSPECTION <b>✦</b> DELIVERY FILMS <b>✦</b> AUTOMOTIVE STORIES <b>✦</b> HYDERABAD · VIJAYAWADA · VIZAG <b>✦</b></div></section>

        <section className="intro section-pad" id="services" data-testid="services-section">
          <div className="section-label"><span>01</span><span>What I do</span></div>
          <div className="intro-copy"><h2>The car you choose<br />deserves a <em>closer look.</em></h2><p>Buying a car is a big feeling. I help you protect that feeling — with a thorough pre-delivery inspection, and capture the handover as a memory worth keeping.</p></div>
          <div className="service-grid">
            <article className="service-card pdi-card" data-testid="pdi-service-card"><div className="service-image" style={{ backgroundImage: `url(${images.pdi})` }} /><div className="service-number">01 / 02</div><div className="service-content"><span className="eyebrow">For new car buyers</span><h3>Pre-delivery<br /><em>inspection.</em></h3><p>A careful look before you sign, so you can take delivery with clarity.</p><div className="service-foot"><span>Hyderabad · Vijayawada · Vizag</span><button className="circle-arrow" onClick={() => setModalOpen(true)} aria-label="Enquire about PDI" data-testid="pdi-enquiry-button"><ArrowUpRight size={19} /></button></div></div></article>
            <article className="service-card shoot-card" data-testid="delivery-service-card"><div className="service-image" style={{ backgroundImage: `url(${images.delivery})` }} /><div className="service-number">02 / 02</div><div className="service-content"><span className="eyebrow">For the big handover</span><h3>Delivery day,<br /><em>your way.</em></h3><p>Car delivery shoots, reels and edits that make the moment feel like yours.</p><div className="service-foot"><span>Film · Reels · Edit</span><button className="circle-arrow" onClick={() => setModalOpen(true)} aria-label="Enquire about delivery shoots" data-testid="delivery-enquiry-button"><ArrowUpRight size={19} /></button></div></div></article>
          </div>
        </section>

        <section className="work-section section-pad" id="work" data-testid="work-section"><div className="section-label"><span>02</span><span>Selected work</span></div><div className="work-heading"><h2>Cars, captured<br /><em>with feeling.</em></h2><div className="work-links"><a href={instagramUrl} target="_blank" rel="noreferrer" data-testid="instagram-profile-link"><Instagram size={17} /> Instagram <ArrowUpRight size={14} /></a><a href={youtubeUrl} target="_blank" rel="noreferrer" data-testid="youtube-profile-link"><Youtube size={17} /> YouTube <ArrowUpRight size={14} /></a></div></div><div className="portfolio-grid"><a className="portfolio-item tall" href={instagramUrl} target="_blank" rel="noreferrer" style={{ backgroundImage: `url(${images.delivery})` }} data-testid="portfolio-delivery-link"><div className="portfolio-overlay"><span>Delivery shoots</span><ArrowUpRight size={18} /></div></a><a className="portfolio-item wide" href={youtubeUrl} target="_blank" rel="noreferrer" style={{ backgroundImage: `url(${images.camera})` }} data-testid="portfolio-video-link"><div className="portfolio-overlay"><span>Reviews · News · Tips</span><span className="play-icon"><Play size={13} fill="currentColor" /></span></div></a><a className="portfolio-item square" href={instagramUrl} target="_blank" rel="noreferrer" style={{ backgroundImage: `url(${images.hero})` }} data-testid="portfolio-reels-link"><div className="portfolio-overlay"><span>Reels & edits</span><ArrowUpRight size={18} /></div></a></div></section>

        <section className="about-section" id="about" data-testid="about-section"><div className="about-photo" style={{ backgroundImage: `url(${images.camera})` }} /><div className="about-copy"><div className="section-label"><span>03</span><span>Behind the wheel</span></div><h2>Not just about<br />the <em>spec sheet.</em></h2><p>Mr. Gearhead in Telugu is an automotive content creator focused on the details that matter — the ones you notice when you’re about to make a big decision, and the moments you want to remember after.</p><p className="muted-copy">Reviews, news, tips and car culture — in a language that feels like home.</p><a className="text-link" href={instagramUrl} target="_blank" rel="noreferrer" data-testid="about-instagram-link">Follow along on Instagram <ArrowUpRight size={16} /></a></div></section>

        <section className="final-cta" data-testid="final-cta-section"><div className="cta-mark">MG</div><div><span className="eyebrow">Ready when you are</span><h2>Make your next<br /><em>car moment count.</em></h2></div><button className="button button-red" onClick={() => setModalOpen(true)} data-testid="final-booking-button">Start an enquiry <ArrowUpRight size={17} /></button></section>
      </main>

      <footer className="footer" data-testid="site-footer"><div className="footer-brand"><span className="mark">MG</span><span>MR. GEARHEAD<br /><b>IN TELUGU</b></span></div><p>Automotive stories, inspections<br />and delivery day memories.</p><div className="footer-socials"><a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" data-testid="footer-instagram-link"><Instagram size={18} /></a><a href={youtubeUrl} target="_blank" rel="noreferrer" aria-label="YouTube" data-testid="footer-youtube-link"><Youtube size={18} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Mr. Gearhead in Telugu</span><span>Private concept · Pending creator approval</span></div></footer>
      {modalOpen && <BookingModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}

export default App;