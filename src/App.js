import { useEffect, useState } from "react";
import {
  ArrowUpRight, Check, ChevronDown, ClipboardCheck, Copy, Instagram,
  MapPin, Menu, MessageCircle, Phone, Play, Send, X,
} from "lucide-react";
import "./styles/App.css";
import { business, demoPricing, images, locations, services, seo } from "./config";

const pages = {
  home: { title: seo.defaultTitle, description: seo.defaultDescription },
  pdi: { title: "New Car PDI in Hyderabad | Dev Automotiv", description: "Book a new car pre-delivery inspection in Hyderabad. Review visible concerns and discuss them before accepting delivery." },
  "used-car-inspection": { title: "Used Car Inspection in Hyderabad | Dev Automotiv", description: "Make a more informed pre-owned car decision with a used car inspection enquiry in Hyderabad." },
  work: { title: "PDI Inspection Work | Dev Automotiv Hyderabad", description: "See Dev Automotiv PDI inspection examples and customer Reel links from Hyderabad." },
  contact: { title: "Book a Car Inspection in Hyderabad | Dev Automotiv", description: "Submit an enquiry for a new car PDI or pre-owned car inspection in Hyderabad." },
};

const pdiAreas = [
  ["01", "Exterior and paint condition"], ["02", "Body panels and alignment"],
  ["03", "Tyres and wheels"], ["04", "Interior condition"],
  ["05", "Electrical functions"], ["06", "Engine bay and visible components"],
  ["07", "Vehicle identification and documents"],
];

const usedAreas = [
  ["01", "Previous repairs or damage"], ["02", "Engine and mechanical condition"],
  ["03", "Tyre and brake condition"], ["04", "Interior and electrical functions"],
  ["05", "Vehicle documents and service history"], ["06", "Potential repair costs"],
];

const featuredReelUrl = "https://www.instagram.com/reel/DbvjnCjPuNh/";
const customerReviewReelUrl = "https://www.instagram.com/reel/DcTogg0vZKY/?utm_source=ig_web_copy_link&vrfl=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==";
const tataSierraPdiReelUrl = "https://www.instagram.com/reel/Dc_ltLfTxhr/?utm_source=ig_web_copy_link&vrfl=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==";
const mahindraXuvPdiReelUrl = "https://www.instagram.com/reel/DcObcqcsfcA/?utm_source=ig_web_copy_link&psln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==";

const workItems = [
  { title: "Mahindra BE 6 Batman Limited Edition", image: "https://cdn-s3.autocarindia.com/legacy/cdni/Galleries/20250814093658_Mahindra_BE6_Batman_Edition_front_head_on.jpg?w=1200&q=85", href: featuredReelUrl, featured: true },
  { title: "Customer review", image: "/customer-review-reel.png", href: customerReviewReelUrl, reel: true },
  { title: "Tata Sierra EV · New Car PDI", image: images.pdi, href: tataSierraPdiReelUrl, reel: true },
  { title: "Mahindra XUV · PDI", image: "/mahindra-xuv-pdi-reel.png", href: mahindraXuvPdiReelUrl, reel: true },
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
  return <section className={`page-intro ${image ? "" : "page-intro-no-image"}`}>
    <div className="page-intro-copy"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div>
    {image && <div className="page-intro-image" style={{ backgroundImage: `url(${image})` }} />}
  </section>;
}

function BookingForm({ initialService = services.newCar, compact = false }) {
  const [form, setForm] = useState({ name: "", phone: "", service: initialService, car: "", city: "Hyderabad", date: "", requirements: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => setForm((current) => ({ ...current, service: initialService })), [initialService]);
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    ["name", "phone", "service", "car", "city", "date"].forEach((field) => {
      if (!form[field].trim()) nextErrors[field] = "Please provide this detail.";
    });
    if (form.phone && !/^[0-9+\s()-]{8,}$/.test(form.phone)) nextErrors.phone = "Enter a valid phone number.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const nextMessage = `Hi Dev, I’m ${form.name}. I’d like to enquire about a ${form.service} for my ${form.car} in ${form.city} on ${form.date}.${form.requirements ? ` Additional requirements: ${form.requirements}` : ""} My phone number is ${form.phone}.`;
    setMessage(nextMessage);
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
  const openWhatsApp = () => window.open(`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  const field = (name, label, type = "text", placeholder = "") => (
    <label className="form-field"><span>{label}</span><input name={name} type={type} value={form[name]} onChange={update} placeholder={placeholder} />{errors[name] && <small>{errors[name]}</small>}</label>
  );
  return <div className={`booking-panel ${compact ? "compact" : ""}`}>
    <div className="booking-heading"><span className="eyebrow">Inspection enquiry</span><h2>Let’s get the<br /><em>details right.</em></h2><p>Share the vehicle and timing. Availability and final pricing are confirmed directly.</p></div>
    <form className="booking-form" onSubmit={submit} noValidate>
      <div className="form-grid">{field("name", "Customer name *", "text", "Your name")}{field("phone", "Mobile number *", "tel", "+91")}</div>
      <div className="form-grid"><label className="form-field"><span>Inspection type *</span><select name="service" value={form.service} onChange={update}><option>{services.newCar}</option><option>{services.usedCar}</option></select>{errors.service && <small>{errors.service}</small>}</label>{field("car", "Car brand and model *", "text", "e.g. Hyundai Creta")}</div>
      <div className="form-grid"><label className="form-field"><span>Location within Hyderabad *</span><select name="city" value={form.city} onChange={update}>{locations.map((location) => <option key={location}>{location}</option>)}</select>{errors.city && <small>{errors.city}</small>}</label>{field("date", "Preferred inspection date *", "date")}</div>
      <label className="form-field"><span>Additional requirements</span><textarea name="requirements" value={form.requirements} onChange={update} placeholder="Anything useful to know?" rows="4" /></label>
      <Button className="button-red" type="submit">Prepare WhatsApp enquiry <Send size={16} /></Button>
    </form>
    {message && <div className="message-preview"><span className="eyebrow">Ready to send</span><p>{message}</p><div className="preview-actions"><Button className="button-red" onClick={openWhatsApp}><MessageCircle size={15} /> Open WhatsApp</Button><Button className="button-outline" onClick={copyMessage}><Copy size={15} /> {copied ? "Copied" : "Copy message"}</Button></div></div>}
  </div>;
}

function CtaStrip({ title, onBook }) {
  return <section className="final-cta"><div><span className="eyebrow">Ready when you are</span><h2>{title}</h2></div><Button className="button-red" onClick={onBook}>Start an enquiry <ArrowUpRight size={17} /></Button></section>;
}

function ServiceCard({ image, number, eyebrow, title, copy, onBook }) {
  return <article className="service-card"><div className="service-image" style={{ backgroundImage: `url(${image})` }} /><div className="service-number">{number} / 02</div><div className="service-content"><span className="eyebrow">{eyebrow}</span><h3>{title}</h3><p>{copy}</p><div className="service-foot"><span>{demoPricing.startingFrom}<small>{demoPricing.label}</small></span><button className="circle-arrow" onClick={onBook} aria-label={`Enquire about ${title}`}><ArrowUpRight size={17} /></button></div></div></article>;
}

function WorkGrid() {
  return <div className="portfolio-grid">{workItems.map((item, index) => {
    const content = <div className={`portfolio-item ${index === 0 ? "tall" : index === 1 ? "wide" : ""}`} style={{ backgroundImage: `url(${item.image})` }}><div className="portfolio-overlay"><span>{item.title}{item.featured || item.reel ? <small className="reel-label"><Instagram size={11} /> Instagram Reel · Watch now</small> : null}</span>{item.featured || item.reel ? <span className="reel-play"><Play size={13} fill="currentColor" /></span> : <ClipboardCheck size={18} />}</div></div>;
    return item.href ? <a key={item.title} href={item.href} target="_blank" rel="noreferrer">{content}</a> : <span key={item.title}>{content}</span>;
  })}</div>;
}

function Home({ onBook }) {
  return <main>
    <section className="hero"><div className="hero-image" style={{ backgroundImage: `url(${images.hero})` }} /><div className="hero-shade" /><div className="hero-grid" /><div className="hero-content"><div className="hero-kicker"><span className="pulse-dot" /> Dev Automotiv · Hyderabad</div><h1>Know your car<br /><span>before you buy.</span></h1><p className="hero-lede">New car PDI and pre-owned car inspection services in Hyderabad. Get your vehicle checked and understand its condition before making an important decision.</p><div className="hero-actions"><Button className="button-red" onClick={() => onBook(services.newCar)}>Book an inspection <ArrowUpRight size={17} /></Button><button className="text-link light" onClick={() => navigate("pdi")}>Explore services <span>↓</span></button></div><p className="hero-proof">Certified PDI services · Detailed PDI reports · Hyderabad</p></div><div className="hero-stamp"><span>DEV</span><i>•</i><span>HYD</span><small>Dev (Petrolhead)</small></div><div className="hero-scroll">Scroll to explore <span>↓</span></div></section>
    <section className="ticker"><div>NEW CAR PDI <b>✦</b> PRE-OWNED CAR INSPECTION <b>✦</b> DETAILED PDI REPORTS <b>✦</b> HYDERABAD, TELANGANA <b>✦</b></div></section>
    <section className="intro section-pad" id="services"><div className="section-label"><span>01</span><span>Inspection services</span></div><div className="intro-copy"><h2>Make a considered<br /><em>car decision.</em></h2><p>Inspection is a practical way to understand a vehicle before a major purchase or before accepting new-car delivery.</p></div><div className="service-grid"><ServiceCard image={images.pdi} number="01" eyebrow="For new car buyers" title={<>New car<br /><em>PDI.</em></>} copy="Inspect before you accept delivery and discuss visible concerns with the dealership." onBook={() => onBook(services.newCar)} /><ServiceCard image={images.used} number="02" eyebrow="For pre-owned buyers" title={<>Used car<br /><em>inspection.</em></>} copy="Get another informed perspective on a pre-owned vehicle before making a purchase decision." onBook={() => onBook(services.usedCar)} /></div></section>
    <section className="dark-copy section-pad"><div className="split-copy"><div><span className="eyebrow">Why it matters</span><h2>Clarity before<br /><em>commitment.</em></h2></div><div><p>A quick showroom walkaround may not reveal every visible concern. An inspection gives you a structured opportunity to look, document findings and discuss concerns before a decision is final.</p><p>Findings can inform your next conversation; they are not a promise that every hidden defect will be found or that vehicle condition is guaranteed.</p><Button className="button-red" onClick={() => onBook(services.newCar)}>Enquire now <ArrowUpRight size={17} /></Button></div></div></section>
    <section className="work-section section-pad home-work"><div className="section-label"><span>02</span><span>Selected work</span></div><div className="work-heading"><h2>Real cars.<br /><em>Real checks.</em></h2><button className="text-link" onClick={() => navigate("work")}>View all work <ArrowUpRight size={15} /></button></div><WorkGrid /></section>
    <section className="quick-trust"><span>Certified PDI services</span><span>Detailed PDI reports</span><span>Hyderabad, Telangana</span></section>
    <section className="location-band"><div><span className="eyebrow">Ready to check your car?</span><h2>Book your inspection.</h2></div><Button className="button-red" onClick={() => onBook(services.newCar)}>Start an enquiry <ArrowUpRight size={17} /></Button></section>
  </main>;
}

function InspectionPage({ used = false, onBook }) {
  const title = used ? <>Buy a used car<br /><em>with more confidence.</em></> : <>Your new car<br /><em>deserves a proper inspection.</em></>;
  const copy = used ? "Inspecting a pre-owned vehicle before purchase can help you understand its visible condition, ask better questions and consider potential repair costs." : "A pre-delivery inspection gives new car buyers an opportunity to review the vehicle, document visible concerns and discuss them with the dealership before accepting delivery.";
  const areas = used ? usedAreas : pdiAreas;
  return <main><PageIntro eyebrow={used ? "02 / Pre-owned inspection" : "01 / New car PDI"} title={title} copy={copy} image={used ? images.used : images.pdi} />
    <section className="paper-section section-pad"><div className="section-label"><span>{used ? "Considerations" : "Education"}</span><span>{used ? "Before you purchase" : "Inspect before you accept delivery"}</span></div><div className="intro-copy"><h2>{used ? <>A second look<br /><em>can help.</em></> : <>Look closer<br /><em>before handover.</em></>}</h2><p>{used ? "These are general considerations when assessing a pre-owned vehicle, not a guaranteed list of Dev’s inspection procedures." : "A quick showroom walkaround may not reveal every visible concern. Inspect the vehicle, document issues and discuss concerns with the dealership before accepting delivery."}</p></div><div className="scope-grid">{areas.map(([number, title]) => <article className="scope-card" key={number}><span>{number}</span><h3>{title}</h3><p>{used ? "A general consideration to discuss during a vehicle inspection." : "An educational example of an area that may be considered."}</p></article>)}</div><p className="disclaimer">{used ? "These considerations do not promise detection of all hidden defects, verified accident history or guaranteed vehicle condition." : "Detailed checklist and exact scope are subject to confirmation for the vehicle, access and service booked. No item is guaranteed for every inspection."}</p></section>
    <CtaStrip title={used ? "Thinking about a pre-owned car?" : "Want clarity before delivery?"} onBook={() => onBook(used ? services.usedCar : services.newCar)} />
  </main>;
}

function WorkPage() {
  return <main><PageIntro eyebrow="03 / Our work" title={<>Focused on<br /><em>the details.</em></>} copy="Explore automotive inspection imagery and Reel links from the official Dev Automotiv Instagram profile." /><section className="work-section section-pad"><div className="section-label"><span>Inspection imagery</span><span>Instagram Reels</span></div><WorkGrid /><div className="social-links"><a className="button button-outline" href={business.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={16} /> Visit official Instagram</a></div></section></main>;
}

function ContactPage({ initialService }) {
  return <main><PageIntro eyebrow="04 / Contact & booking" title={<>Tell us about<br /><em>the vehicle.</em></>} copy="Send an enquiry for a new car PDI or pre-owned car inspection in Hyderabad. Final availability, scope and pricing are confirmed directly." /><section className="paper-section section-pad contact-layout"><BookingForm initialService={initialService} /><aside className="contact-aside"><span className="eyebrow">Direct contact</span><h2>Keep the<br /><em>conversation easy.</em></h2><p>Contact details are taken from the public Dev Automotiv Instagram bio. WhatsApp availability is not independently confirmed for this demo.</p><a className="text-link" href={`tel:${business.phone.replace(/\s/g, "")}`}><Phone size={16} /> Call {business.phone} <ArrowUpRight size={15} /></a><div className="contact-detail"><MapPin size={18} /><div><b>Service location</b><span>Hyderabad, Telangana</span></div></div><div className="contact-detail"><Instagram size={18} /><div><b>Instagram</b><a href={business.instagramUrl} target="_blank" rel="noreferrer"><span>@dev_automotiv</span></a></div></div></aside></section></main>;
}

function App() {
  const currentPath = () => window.location.pathname.replace(/^\/|\/$/g, "") || "home";
  const [path, setPath] = useState(currentPath);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingService, setBookingService] = useState(services.newCar);
  useEffect(() => { const onPopState = () => setPath(currentPath()); window.addEventListener("popstate", onPopState); return () => window.removeEventListener("popstate", onPopState); }, []);
  useEffect(() => {
    const page = pages[path] || pages.home;
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
    setMeta('meta[property="og:site_name"]', "property", seo.siteName);
    setMeta('meta[property="og:locale"]', "property", "en_IN");
    setMeta('meta[property="og:url"]', "property", `${window.location.origin}${window.location.pathname}`);
    setMeta('meta[property="og:image"]', "property", seo.image);
    setMeta('meta[name="twitter:card"]', "name", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", page.title);
    setMeta('meta[name="twitter:description"]', "name", page.description);
    setMeta('meta[name="twitter:image"]', "name", seo.image);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `${window.location.origin}${window.location.pathname}`;
    let structuredData = document.head.querySelector("#site-structured-data");
    if (!structuredData) { structuredData = document.createElement("script"); structuredData.id = "site-structured-data"; structuredData.type = "application/ld+json"; document.head.appendChild(structuredData); }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${window.location.origin}/#business`,
      name: business.name,
      alternateName: business.publicName,
      description: seo.defaultDescription,
      url: window.location.origin,
      telephone: business.phone,
      areaServed: { "@type": "City", name: "Hyderabad" },
      address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" },
      sameAs: [business.instagramUrl],
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: services.newCar } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: services.usedCar } },
      ],
    });
    window.scrollTo(0, 0);
  }, [path]);
  const onBook = (service) => { setBookingService(service || services.newCar); navigate("contact"); setMenuOpen(false); };
  const nav = [["home", "Home"], ["pdi", "New Car PDI"], ["used-car-inspection", "Used Car"], ["work", "Our Work"], ["contact", "Contact"]];
  const page = path === "pdi" ? <InspectionPage onBook={onBook} /> : path === "used-car-inspection" ? <InspectionPage used onBook={onBook} /> : path === "work" ? <WorkPage /> : path === "contact" ? <ContactPage initialService={bookingService} /> : <Home onBook={onBook} />;
  return <div className="site-shell"><header className="topbar"><button className="wordmark" onClick={() => navigate("home")}><span className="mark">DA</span><span>DEV AUTOMOTIV<br /><b>DEV (PETROLHEAD)</b></span></button><nav className={`main-nav ${menuOpen ? "open" : ""}`}>{nav.map(([key, label]) => <button key={key} className={path === key ? "active" : ""} onClick={() => { navigate(key); setMenuOpen(false); }}>{label}</button>)}<Button className="nav-cta" onClick={() => onBook(services.newCar)}>Book an inspection <ArrowUpRight size={15} /></Button></nav><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button></header>{page}<footer className="footer"><div className="footer-brand"><span className="mark">DA</span><span>DEV AUTOMOTIV<br /><b>DEV (PETROLHEAD)</b></span></div><p>Certified PDI services<br />and vehicle inspections in Hyderabad.</p><div className="footer-socials"><a href={business.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a><a href={`tel:${business.phone.replace(/\s/g, "")}`} aria-label="Call Dev Automotiv"><Phone size={18} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Dev Automotiv</span><span>Contact for pricing</span></div></footer><div className="mobile-contact-bar" aria-label="Contact options"><a className="mobile-contact-button" href={`tel:${business.phone.replace(/\s/g, "")}`}><Phone size={17} /><span><b>Call Dev</b><small>{business.phone}</small></span></a><button className="mobile-contact-button" onClick={() => onBook(services.newCar)}><MessageCircle size={17} /><span><b>Book online</b><small>Inspection enquiry</small></span></button></div></div>;
}

export default App;
