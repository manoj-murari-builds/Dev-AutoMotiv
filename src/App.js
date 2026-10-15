import { useEffect, useState } from "react";
import {
  ArrowUpRight, Camera, Check, ChevronDown, ClipboardCheck, Copy, Film,
  Instagram, MapPin, Menu, MessageCircle, Phone, Play, Send, X, Youtube,
} from "lucide-react";
import "./styles/App.css";
import { contact, images, instagramUrl, locations, pricing, seo, youtubeUrl } from "./config";

const pages = {
  home: { title: seo.defaultTitle, description: seo.defaultDescription },
  pdi: { title: "PDI Services in Hyderabad, Vijayawada & Vizag | Mr. Gearhead", description: "Learn about pre-delivery inspection categories, process, pricing and booking options for new car buyers." },
  content: { title: "Car Delivery Shoots, Reels & Editing | Mr. Gearhead", description: "Car delivery photography, cinematic videos, Instagram reels, editing and automotive content collaborations." },
  portfolio: { title: "Automotive Portfolio | Mr. Gearhead in Telugu", description: "Explore automotive delivery stories, reviews, news, tips and reels from Mr. Gearhead in Telugu." },
  pricing: { title: "PDI & Car Content Pricing | Mr. Gearhead", description: "View draft pricing for PDI inspections, delivery shoots, reels, editing and the PDI plus delivery-shoot combo." },
  contact: { title: "Contact & Booking | Mr. Gearhead in Telugu", description: "Send a booking enquiry for a PDI, delivery shoot, reels or editing service in Hyderabad, Vijayawada or Vizag." },
};

const pdiAreas = [
  ["01", "Exterior condition", "Body panels, alignment, door hinges, bumpers, hood and boot alignment."],
  ["02", "Paint and finish", "Scratches, visible repairs and paint-thickness testing where available."],
  ["03", "Tyres and wheels", "Manufacturing dates, tread depth, wheel condition and spare tyre."],
  ["04", "Interior", "Upholstery, dashboard, seatbelts, trim and general cabin condition."],
  ["05", "Electrical systems", "Lights, indicators, power windows, wipers, horn and accessible controls."],
  ["06", "Air conditioning", "Climate controls and air-conditioning operation."],
  ["07", "Engine bay", "Visible fluids, battery and accessible components."],
  ["08", "Brakes and steering", "Brakes, steering and visible suspension components."],
  ["09", "Underbody", "Underbody and exhaust condition where safely accessible."],
  ["10", "Diagnostics", "OBD-II diagnostics if supported by the actual service booked."],
  ["11", "Vehicle identity", "VIN, manufacturing information and available vehicle documents."],
  ["12", "Delivery items", "Accessories, spare keys, toolkit, manuals and delivery kit."],
];

const portfolioItems = [
  { title: "Delivery day stories", image: images.delivery, href: instagramUrl, type: "Instagram" },
  { title: "Reviews · news · tips", image: images.camera, href: youtubeUrl, type: "YouTube" },
  { title: "Reels and edits", image: images.hero, href: instagramUrl, type: "Instagram" },
  { title: "The inspection detail", image: images.pdi, href: instagramUrl, type: "Instagram" },
];

function navigate(path) {
  const nextPath = path === "home" ? "/" : `/${path}`;
  if (window.location.pathname !== nextPath) {
    window.history.pushState({}, "", nextPath);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function Button({ children, onClick, className = "", href, ...props }) {
  if (href) return <a className={`button ${className}`} href={href} {...props}>{children}</a>;
  return <button className={`button ${className}`} onClick={onClick} {...props}>{children}</button>;
}

function PageIntro({ eyebrow, title, copy, image }) {
  return (
    <section className="page-intro">
      <div className="page-intro-copy"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div>
      <div className="page-intro-image" style={{ backgroundImage: `url(${image})` }} />
    </section>
  );
}

function BookingForm({ initialService = "PDI", compact = false }) {
  const [form, setForm] = useState({ name: "", phone: "", service: initialService, city: "Hyderabad", car: "", date: "", requirements: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => setForm((current) => ({ ...current, service: initialService })), [initialService]);

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    ["name", "phone", "service", "city", "car", "date"].forEach((field) => {
      if (!form[field].trim()) nextErrors[field] = "Please provide this detail.";
    });
    if (form.phone && !/^[0-9+\s()-]{8,}$/.test(form.phone)) nextErrors.phone = "Enter a valid phone number.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setMessage(`Hi Mr. Gearhead, I’m ${form.name}. I’d like to enquire about a ${form.service} for my ${form.car} in ${form.city} on ${form.date}. Please let me know availability, the final package price and next steps.${form.requirements ? ` Additional requirements: ${form.requirements}` : ""} My phone number is ${form.phone}.`);
    setCopied(false);
  };
  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };
  const field = (name, label, type = "text", placeholder = "") => (
    <label className="form-field"><span>{label}</span><input name={name} type={type} value={form[name]} onChange={update} placeholder={placeholder} />{errors[name] && <small>{errors[name]}</small>}</label>
  );

  return (
    <div className={`booking-panel ${compact ? "compact" : ""}`}>
      <div className="booking-heading"><span className="eyebrow">Booking enquiry</span><h2>Let’s plan your<br /><em>car moment.</em></h2><p>Share a few details and get a ready-to-send enquiry. Final availability and pricing are confirmed directly.</p></div>
      <form className="booking-form" onSubmit={submit} noValidate>
        <div className="form-grid">{field("name", "Name *", "text", "Your name")}{field("phone", "Phone number *", "tel", "+91")}</div>
        <div className="form-grid"><label className="form-field"><span>Requested service *</span><select name="service" value={form.service} onChange={update}><option>PDI</option><option>Delivery shoot</option><option>Reels/editing</option><option>Combo</option></select>{errors.service && <small>{errors.service}</small>}</label><label className="form-field"><span>City *</span><select name="city" value={form.city} onChange={update}>{locations.map((location) => <option key={location}>{location}</option>)}<option>Other</option></select>{errors.city && <small>{errors.city}</small>}</label></div>
        <div className="form-grid">{field("car", "Car make and model *", "text", "e.g. Hyundai Creta")}{field("date", "Preferred date *", "date")}</div>
        <label className="form-field"><span>Additional requirements</span><textarea name="requirements" value={form.requirements} onChange={update} placeholder="Anything useful to know?" rows="4" /></label>
        <Button className="button-red" type="submit">Generate WhatsApp enquiry <Send size={16} /></Button>
      </form>
      {message && <div className="message-preview"><span className="eyebrow">Demo mode · contact not configured</span><p>{message}</p><div className="preview-actions"><Button className="button-outline" onClick={copyMessage}><Copy size={15} /> {copied ? "Copied" : "Copy message"}</Button><span>Once a real number is added, this can open WhatsApp directly.</span></div></div>}
    </div>
  );
}

function PricingCards({ onBook }) {
  return <div className="pricing-grid">{Object.values(pricing).map((item) => <article className="pricing-card" key={item.service}><span className="eyebrow">{item.label}</span><strong>{item.price}</strong><p>Draft demonstration pricing, pending confirmation by the creator.</p><Button className={item.service === "Combo" ? "button-red" : "button-outline"} onClick={() => onBook(item.service)}>{item.service === "PDI" ? "Book a PDI" : item.service === "Combo" ? "Enquire about combo" : "Enquire about shoot"} <ArrowUpRight size={16} /></Button></article>)}</div>;
}

function Home({ onBook }) {
  return <main>
    <section className="hero" id="home"><div className="hero-image" style={{ backgroundImage: `url(${images.hero})` }} /><div className="hero-shade" /><div className="hero-grid" /><div className="hero-content"><div className="hero-kicker"><span className="pulse-dot" /> Automotive content, made personal</div><h1>Know the car.<br /><span>Feel the moment.</span></h1><p className="hero-lede">PDI peace of mind. Cinematic delivery films. Automotive stories in Telugu — from someone who speaks your language.</p><div className="hero-actions"><Button className="button-red" onClick={() => onBook("PDI")}>Book a PDI <ArrowUpRight size={17} /></Button><button className="text-link light" onClick={() => navigate("portfolio")}>See the work <span>↓</span></button></div><p className="hero-proof">Trusted automotive inspections and stories across Hyderabad, Vijayawada and Vizag.</p></div><div className="hero-stamp"><span>HYD</span><i>•</i><span>VJA</span><i>•</i><span>VIZAG</span><small>Service locations</small></div><div className="hero-scroll">Scroll to explore <span>↓</span></div></section>
    <section className="ticker"><div>PRE-DELIVERY INSPECTION <b>✦</b> DELIVERY FILMS <b>✦</b> AUTOMOTIVE STORIES <b>✦</b> HYDERABAD · VIJAYAWADA · VIZAG <b>✦</b></div></section>
    <section className="intro section-pad" id="services"><div className="section-label"><span>01</span><span>What I do</span></div><div className="intro-copy"><h2>The car you choose<br />deserves a <em>closer look.</em></h2><p>Protect the feeling of buying a car with a considered inspection, then capture the handover as a memory worth keeping.</p></div><div className="service-grid"><article className="service-card" style={{ backgroundImage: `url(${images.pdi})` }}><div className="service-number">01 / 02</div><div className="service-content"><span className="eyebrow">For new car buyers</span><h3>Pre-delivery<br /><em>inspection.</em></h3><p>A careful look before you sign, so you can take delivery with clarity.</p><Button className="button-red" onClick={() => onBook("PDI")}>Book a PDI <ArrowUpRight size={16} /></Button></div></article><article className="service-card" style={{ backgroundImage: `url(${images.delivery})` }}><div className="service-number">02 / 02</div><div className="service-content"><span className="eyebrow">For the big handover</span><h3>Delivery day,<br /><em>your way.</em></h3><p>Photography, reels and edits that make the moment feel like yours.</p><Button className="button-red" onClick={() => onBook("Delivery shoot")}>Book a shoot <ArrowUpRight size={16} /></Button></div></article></div></section>
    <section className="dark-copy section-pad"><div className="split-copy"><div><span className="eyebrow">Why it matters</span><h2>Before the keys<br /><em>change hands.</em></h2></div><div><p>A new vehicle can still need a careful look before acceptance. Completing a PDI gives you a chance to discuss visible concerns with the dealer while the delivery process is still underway.</p><p>It is a practical second set of eyes — not a promise that every issue can be found or that a vehicle is mechanically certified.</p><Button className="button-red" onClick={() => onBook("PDI")}>Book a PDI <ArrowUpRight size={17} /></Button></div></div></section>
    <section className="trust-strip" aria-label="Mr. Gearhead experience and results"><div><strong>2.5+</strong><span>Years of experience</span></div><div><strong>1,000+</strong><span>Cars inspected</span></div><div><strong>1,000+</strong><span>Happy customers</span></div></section>
    <section className="work-section section-pad"><div className="section-label"><span>02</span><span>Selected work</span></div><div className="work-heading"><h2>Cars, captured<br /><em>with feeling.</em></h2><div className="work-links"><a href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram <ArrowUpRight size={14} /></a><a href={youtubeUrl} target="_blank" rel="noreferrer"><Youtube size={17} /> YouTube <ArrowUpRight size={14} /></a></div></div><div className="portfolio-grid">{portfolioItems.slice(0, 3).map((item, index) => <a className={`portfolio-item ${index === 0 ? "tall" : index === 1 ? "wide" : "square"}`} key={item.title} href={item.href} target="_blank" rel="noreferrer" style={{ backgroundImage: `url(${item.image})` }}><div className="portfolio-overlay"><span>{item.title}</span>{item.type === "YouTube" ? <span className="play-icon"><Play size={13} fill="currentColor" /></span> : <ArrowUpRight size={18} />}</div></a>)}</div></section>
    <section className="paper-section section-pad"><div className="section-label"><span>03</span><span>Draft pricing</span></div><div className="work-heading"><h2>Clear starting points.<br /><em>No guesswork.</em></h2><button className="text-link" onClick={() => navigate("pricing")}>View all pricing <ArrowUpRight size={15} /></button></div><PricingCards onBook={onBook} /></section>
    <section className="location-band"><div><span className="eyebrow">Currently serving</span><h2>Hyderabad · Vijayawada · Vizag</h2></div><Button className="button-red" onClick={() => onBook("PDI")}>Start an enquiry <ArrowUpRight size={17} /></Button></section>
  </main>;
}

function PdiPage({ onBook }) {
  return <main><PageIntro eyebrow="01 / PDI services" title={<>Inspect before<br /><em>you accept.</em></>} copy="A practical pre-delivery inspection for new car buyers in Hyderabad, Vijayawada and Vizag. The exact scope depends on the service booked." image={images.pdi} /><section className="paper-section section-pad"><div className="section-label"><span>Scope</span><span>Inspection categories</span></div><div className="scope-grid">{pdiAreas.map(([number, title, copy]) => <article className="scope-card" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div><p className="disclaimer">Inspection categories are examples of what may be reviewed. Availability depends on the vehicle, access, time and service booked. No item is guaranteed for every package.</p></section><section className="paper-section section-pad"><div className="split-copy"><div><span className="eyebrow">Simple process</span><h2>Plan. Inspect.<br /><em>Take delivery.</em></h2></div><div className="steps"><p><b>01</b> Tell us your city, car and preferred date.</p><p><b>02</b> Confirm availability and the final package price.</p><p><b>03</b> Complete the agreed inspection before accepting delivery.</p></div></div><div className="faq-list"><details><summary>When should I book a PDI? <ChevronDown size={17} /></summary><p>Before your delivery appointment, with enough notice to confirm availability.</p></details><details><summary>Is every inspection area included? <ChevronDown size={17} /></summary><p>No. The exact scope depends on the service booked, the vehicle and what is safely accessible.</p></details><details><summary>Where is the service available? <ChevronDown size={17} /></summary><p>Hyderabad, Vijayawada and Vizag are the current service locations.</p></details></div></section><CtaStrip title="Want clarity before delivery?" onBook={() => onBook("PDI")} /></main>;
}

function ContentPage({ onBook }) {
  const services = [["New-car delivery photography", "Thoughtful stills from the handover, made for a memory you can revisit.", Camera], ["Cinematic delivery videos", "A moving record of the day, shaped around your car and your people.", Film], ["Reels and short-form videos", "Short, social-ready edits for delivery moments and automotive stories.", Play], ["Video editing and collaborations", "Editing support and automotive content conversations for brands and creators.", MessageCircle]];
  return <main><PageIntro eyebrow="02 / Content services" title={<>Make the handover<br /><em>feel like yours.</em></>} copy="Photography, video, reels and editing for delivery days, automotive stories and brand collaborations." image={images.delivery} /><section className="dark-copy section-pad"><div className="section-label"><span>Services</span><span>Delivery day, your way</span></div><div className="content-service-grid">{services.map(([title, copy, Icon]) => <article key={title}><Icon size={24} /><h3>{title}</h3><p>{copy}</p><button className="text-link" onClick={() => onBook("Delivery shoot")}>Enquire about this <ArrowUpRight size={15} /></button></article>)}</div></section><section className="paper-section section-pad"><div className="section-label"><span>Approach</span><span>Made for your moment</span></div><div className="intro-copy"><h2>Useful, personal,<br /><em>never generic.</em></h2><p>Share the moment you want to remember, the platform you want to publish on and the kind of story you want to tell. We will confirm the practical details together.</p></div><div className="portfolio-grid">{portfolioItems.slice(0, 3).map((item) => <a className="portfolio-item" key={item.title} href={item.href} target="_blank" rel="noreferrer" style={{ backgroundImage: `url(${item.image})` }}><div className="portfolio-overlay"><span>{item.title}</span><ArrowUpRight size={18} /></div></a>)}</div></section><CtaStrip title="Have a delivery day coming up?" onBook={() => onBook("Delivery shoot")} /></main>;
}

function PortfolioPage() {
  return <main><PageIntro eyebrow="03 / Portfolio" title={<>Stories from<br /><em>the road.</em></>} copy="Explore the latest automotive stories, delivery moments, reviews, news and tips on the creator’s real social channels." image={images.camera} /><section className="work-section section-pad"><div className="section-label"><span>Selected work</span><span>Follow the real channels</span></div><div className="portfolio-grid portfolio-large">{portfolioItems.map((item) => <a className="portfolio-item" key={item.title} href={item.href} target="_blank" rel="noreferrer" style={{ backgroundImage: `url(${item.image})` }}><div className="portfolio-overlay"><span>{item.title}<small>{item.type}</small></span><ArrowUpRight size={18} /></div></a>)}</div><div className="social-links"><a className="button button-outline" href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={16} /> Follow on Instagram</a><a className="button button-outline" href={youtubeUrl} target="_blank" rel="noreferrer"><Youtube size={16} /> Watch on YouTube</a></div></section></main>;
}

function PricingPage({ onBook }) {
  return <main><PageIntro eyebrow="04 / Pricing" title={<>Start with the<br /><em>right fit.</em></>} copy="Draft demonstration pricing is shown below. Final scope, availability and price are confirmed by the creator before booking." image={images.hero} /><section className="paper-section section-pad"><div className="section-label"><span>Draft rates</span><span>Pending creator confirmation</span></div><PricingCards onBook={onBook} /><p className="disclaimer">Prices shown are proposed starting points for this demonstration. There are no implied discounts, savings or fixed inclusions.</p></section><CtaStrip title="Not sure which option fits?" onBook={() => onBook("PDI")} /></main>;
}

function ContactPage({ initialService }) {
  return <main><PageIntro eyebrow="05 / Contact & booking" title={<>Tell me what<br /><em>you’re driving.</em></>} copy="Use the enquiry form for availability, final pricing and next steps. WhatsApp contact is in demo mode until the creator provides a real number." image={images.camera} /><section className="paper-section section-pad contact-layout"><BookingForm initialService={initialService} /><aside className="contact-aside"><span className="eyebrow">Other ways to connect</span><h2>Keep the<br /><em>conversation easy.</em></h2><p>Prefer a direct message? Instagram is open for bookings and collaborations.</p><a className="text-link" href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={16} /> Message on Instagram <ArrowUpRight size={15} /></a><div className="contact-detail"><MapPin size={18} /><div><b>Service locations</b><span>Hyderabad<br />Vijayawada<br />Vizag</span></div></div><div className="contact-detail"><MessageCircle size={18} /><div><b>WhatsApp</b><span>{contact.displayPhone}<br />Demo contact — not configured</span></div></div></aside></section></main>;
}

function CtaStrip({ title, onBook }) {
  return <section className="final-cta"><div><span className="eyebrow">Ready when you are</span><h2>{title}</h2></div><Button className="button-red" onClick={onBook}>Start an enquiry <ArrowUpRight size={17} /></Button></section>;
}

function MobileContactBar({ onBook }) {
  return <div className="mobile-contact-bar" aria-label="Contact options">
    <button type="button" className="mobile-contact-button" onClick={() => onBook("PDI")}><Phone size={17} /><span><b>Call</b></span></button>
    <button type="button" className="mobile-contact-button" onClick={() => onBook("PDI")}><MessageCircle size={17} /><span><b>WhatsApp</b></span></button>
  </div>;
}

function App() {
  const currentPath = () => window.location.pathname.replace(/^\/|\/$/g, "") || "home";
  const [path, setPath] = useState(currentPath);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingService, setBookingService] = useState(null);
  useEffect(() => { const onPopState = () => setPath(currentPath()); window.addEventListener("popstate", onPopState); return () => window.removeEventListener("popstate", onPopState); }, []);
  useEffect(() => {
    const page = pages[path] || pages.home;
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    document.title = page.title;
    const setMeta = (selector, attribute, value) => {
      let element = document.head.querySelector(selector);
      if (!element) { element = document.createElement("meta"); element.setAttribute(attribute, selector.match(/"([^"]+)"/)[1]); document.head.appendChild(element); }
      element.content = value;
    };
    setMeta('meta[name="description"]', "name", page.description);
    setMeta('meta[property="og:title"]', "property", page.title);
    setMeta('meta[property="og:description"]', "property", page.description);
    setMeta('meta[property="og:type"]', "property", "website");
    setMeta('meta[property="og:url"]', "property", canonicalUrl);
    setMeta('meta[property="og:image"]', "property", seo.image);
    setMeta('meta[name="twitter:card"]', "name", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", page.title);
    setMeta('meta[name="twitter:description"]', "name", page.description);
    setMeta('meta[name="twitter:image"]', "name", seo.image);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = canonicalUrl;
    let structuredData = document.head.querySelector("#site-structured-data");
    if (!structuredData) { structuredData = document.createElement("script"); structuredData.id = "site-structured-data"; structuredData.type = "application/ld+json"; document.head.appendChild(structuredData); }
    structuredData.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "ProfessionalService", name: seo.siteName, description: seo.defaultDescription, areaServed: locations, sameAs: [instagramUrl, youtubeUrl], url: window.location.origin });
    window.scrollTo(0, 0);
  }, [path]);
  const onBook = (service = "PDI") => { setBookingService(service); navigate("contact"); setMenuOpen(false); };
  const nav = [["home", "Home"], ["pdi", "PDI Services"], ["content", "Delivery & Reels"], ["portfolio", "Portfolio"], ["pricing", "Pricing"], ["contact", "Contact"]];
  const page = path === "pdi" ? <PdiPage onBook={onBook} /> : path === "content" ? <ContentPage onBook={onBook} /> : path === "portfolio" ? <PortfolioPage /> : path === "pricing" ? <PricingPage onBook={onBook} /> : path === "contact" ? <ContactPage initialService={bookingService || "PDI"} /> : <Home onBook={onBook} />;
  return <div className="site-shell"><header className="topbar"><button className="wordmark" onClick={() => navigate("home")}><span className="mark">MG</span><span>MR. GEARHEAD<br /><b>IN TELUGU</b></span></button><nav className={`main-nav ${menuOpen ? "open" : ""}`}>{nav.map(([key, label]) => <button key={key} className={path === key ? "active" : ""} onClick={() => { navigate(key); setMenuOpen(false); }}>{label}</button>)}<Button className="nav-cta" onClick={() => onBook("PDI")}>Book an enquiry <ArrowUpRight size={15} /></Button></nav><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button></header>{page}<footer className="footer"><div className="footer-brand"><span className="mark">MG</span><span>MR. GEARHEAD<br /><b>IN TELUGU</b></span></div><p>Automotive stories, inspections<br />and delivery day memories.</p><div className="footer-socials"><a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a><a href={youtubeUrl} target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={18} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Mr. Gearhead in Telugu</span><span>Draft concept · Pending creator approval</span></div></footer><MobileContactBar onBook={onBook} /></div>;
}

export default App;
