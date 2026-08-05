"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownToLine,
  BadgeCheck,
  CalendarCheck,
  ChevronRight,
  Images,
  FileText,
  MapPin,
  MessageCircle,
  Phone,
  X,
  ShieldCheck,
} from "lucide-react";

const ease = [0.19, 1, 0.22, 1];
const slowEase = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.98, filter: "blur(6px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.095, delayChildren: 0.08 } },
};

const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 1.02,
    clipPath: "inset(8% 6% 8% 6% round 12px)",
    filter: "blur(2px) saturate(0.96)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0% round 12px)",
    filter: "blur(0px) saturate(1.08)",
  },
};

const sectionReveal = {
  hidden: { opacity: 0.72 },
  visible: { opacity: 1, transition: { staggerChildren: 0.11 } },
};

const magneticHover = {
  y: -5,
  scale: 1.015,
  transition: { duration: 0.42, ease },
};

const proofItems = [
  ["HMDA Approved", "LP No: 013076/LO/HMDA/3528/SMD/2024"],
  ["RERA Approved", "RERA No: P02400009757"],
  ["Project By", "Signature Avenues"],
  ["Community", "121 private villas across 13.6 acres"],
];

const lifestyleMoments = [
  ["06:20", "A private garden catches the first light before the city gathers speed"],
  ["13:10", "Work, lunch, and quiet calls each have room of their own"],
  ["20:45", "The evening returns to tree-lined avenues and a home that is entirely yours"],
];

const amenityNotes = [
  ["Arrival", "A composed court that slows the first minute home"],
  ["Water", "Poolside mornings with resort calm built into the week"],
  ["Lounge", "Private indoor rooms for conversations that should linger"],
  ["Play", "Children's zones held close to landscaped family life"],
  ["Garden", "Green pauses between villas, paths, and daily rituals"],
  ["Wellness", "A rhythm of movement, recovery, and unhurried evenings"],
];

const communityNotes = [
  ["Family scale", "Rooms that let generations gather without crowding the day"],
  ["Private address", "A gated villa setting that keeps everyday life comfortably your own"],
  ["Long-view ownership", "A verified villa address for families who value space, land, and clear paperwork"],
];

const locationNotes = [
  ["Airport access", "Rajiv Gandhi International Airport stays within easy reach", "Approx. 9 km"],
  ["ORR Exit 14", "Quick movement into Hyderabad and back home", "Seamless access"],
  ["Srisailam Highway", "A connected address with nature at its edge", "Tukkuguda"],
];

function Reveal({ children, className = "", delay = 0, id, as: Tag = motion.div }) {
  const reduceMotion = useReducedMotion();

  return (
    <Tag
      className={className}
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.6, ease, delay }}
    >
      {children}
    </Tag>
  );
}

function ImageReveal({ children, className = "", style }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      variants={imageReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.28 }}
      whileHover={reduceMotion ? undefined : magneticHover}
      transition={{ duration: reduceMotion ? 0.01 : 0.85, ease: slowEase }}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [submitted, setSubmitted] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [exitSeen, setExitSeen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.32], [0, -90]);
  const plateY = useTransform(scrollYProgress, [0.1, 0.65], [40, -40]);
  const pricingY = useTransform(scrollYProgress, [0.58, 0.92], [36, -36]);
  const architectureY = useTransform(scrollYProgress, [0.18, 0.5], [80, -80]);
  const communityY = useTransform(scrollYProgress, [0.38, 0.72], [70, -70]);

  useEffect(() => {
    const showExitOffer = (event) => {
      if (exitSeen || submitted || event.clientY > 18) return;
      setExitOpen(true);
      setExitSeen(true);
    };

    const showMobileOffer = () => {
      if (exitSeen || submitted || document.visibilityState !== "hidden") return;
      setExitOpen(true);
      setExitSeen(true);
    };

    const showScrollOffer = () => {
      if (exitSeen || submitted) return;
      if (window.innerWidth > 780) return;
      if (window.scrollY > 260) {
        setExitOpen(true);
        setExitSeen(true);
      }
    };

    document.addEventListener("mouseleave", showExitOffer);
    document.addEventListener("visibilitychange", showMobileOffer);
    window.addEventListener("scroll", showScrollOffer, { passive: true });
    return () => {
      document.removeEventListener("mouseleave", showExitOffer);
      document.removeEventListener("visibilitychange", showMobileOffer);
      window.removeEventListener("scroll", showScrollOffer);
    };
  }, [exitSeen, submitted]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Signature Nature's Edge home">
          <span>Signature Avenues</span>
          <strong>Nature's Edge</strong>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#residences">Villas</a>
          <a href="#gallery">Gallery</a>
          <a href="#location">Tukkuguda</a>
          <a href="#pricing">Community</a>
          <a href="#lead">Visit</a>
        </nav>
        <motion.a className="header-cta" href="#lead" whileHover={reduceMotion ? undefined : magneticHover} whileTap={{ scale: 0.98 }}>
          <CalendarCheck size={17} />
          <span>Plan My Visit</span>
        </motion.a>
      </header>

      <motion.section className="hero" id="top" initial="hidden" animate="visible" variants={sectionReveal}>
        <motion.div
          className="hero-art"
          style={{ y: reduceMotion ? 0 : heroY }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.96 }}
          transition={{ duration: reduceMotion ? 0.01 : 1.8, ease: slowEase }}
        >
          <img src="/assets/natures-edge-full-villa-hero.png" alt="Signature Nature's Edge luxury villas in a landscaped gated community" />
        </motion.div>
        <div className="hero-sun" aria-hidden="true" />
        <div className="hero-veil" />
        <motion.div className="hero-grid" variants={stagger} initial="hidden" animate="visible">
          <div className="hero-copy-block">
            <motion.p className="hero-subhead" variants={fadeUp}>
              Signature Nature's Edge, Tukkuguda
            </motion.p>
            <motion.p className="eyebrow" variants={fadeUp}>
              Signature Avenues · 121 luxury villas · 13.6 acres
            </motion.p>
            <motion.h1 variants={fadeUp}>
              Where every morning begins in your own private villa.
            </motion.h1>
            <motion.div className="hero-key-facts" variants={fadeUp}>
              <span className="hero-price-fact">
                <small>Gated community</small>
                <strong>13.6 acres</strong>
                <b>The rest is forest</b>
              </span>
              <span>
                <small>Villa collection</small>
                <strong>121 homes</strong>
                <b>Private villa community</b>
              </span>
              <span>
                <small>Villa formats</small>
                <strong>4 BHK</strong>
                <b>300 &amp; 350 sq. yds</b>
              </span>
            </motion.div>
            <motion.div className="hero-trust-badges" variants={fadeUp}>
              <span>
                <ShieldCheck size={16} />
                RERA Approved
              </span>
              <span>
                <BadgeCheck size={16} />
                HMDA Approved
              </span>
              <span>
                <MapPin size={16} />
                Tukkuguda
              </span>
            </motion.div>
          </div>

          <motion.aside
            className="hero-lead-card"
            variants={fadeIn}
            whileHover={reduceMotion ? undefined : { y: -8, scale: 1.01 }}
            transition={{ duration: reduceMotion ? 0.01 : 1.05, ease }}
          >
            <span className="hero-form-kicker">Private Access Desk</span>
            <h2>Plan your villa visit.</h2>
            <p>Get the villa details and available private visit windows.</p>
            <form
              className="hero-lead-form"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <label>
                <input type="text" name="hero-name" placeholder=" " autoComplete="name" required />
                <span>Full Name</span>
              </label>
              <label>
                <input type="tel" name="hero-mobile" placeholder=" " autoComplete="tel" inputMode="tel" required />
                <span>Mobile Number</span>
              </label>
              <label className="hero-email-field">
                <input type="email" name="hero-email" placeholder=" " autoComplete="email" inputMode="email" />
                <span>Email Address (optional)</span>
              </label>
              <motion.button className="hero-primary-submit" type="submit" whileHover={reduceMotion ? undefined : magneticHover} whileTap={{ scale: 0.98 }}>
                Request Villa Details
                <ChevronRight size={18} />
              </motion.button>
              <motion.a className="hero-secondary-action" href="#lead" whileHover={reduceMotion ? undefined : magneticHover} whileTap={{ scale: 0.98 }}>
                <CalendarCheck size={17} />
                Book Private Site Visit
              </motion.a>
            </form>
            {submitted ? (
              <small>Thank you. Your private access request is ready for follow-up.</small>
            ) : (
              <small>Priority callback. No spam, only villa details and private scheduling.</small>
            )}
          </motion.aside>
        </motion.div>
      </motion.section>

      <motion.section className="journey-section arrival-chapter" id="residences" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }} variants={sectionReveal}>
        <Reveal className="arrival-copy">
          <span className="chapter-mark">01</span>
          <span className="chapter-label">Arrival</span>
          <h2>Arrival begins in a lower register.</h2>
          <p>
            A tree-lined threshold separates city momentum from a more private,
            villa-led way of living.
          </p>
        </Reveal>
        <Reveal className="arrival-proof" delay={0.12}>
          <strong>Verified before the visit</strong>
          <span>
            <BadgeCheck size={18} />
            RERA registered
          </span>
          <span>
            <ShieldCheck size={18} />
            HMDA approved
          </span>
          <span>
            <MapPin size={18} />
            Tukkuguda address
          </span>
          <motion.a href="#lead" whileHover={reduceMotion ? undefined : magneticHover} whileTap={{ scale: 0.98 }}>
            <CalendarCheck size={17} />
            Arrange a site visit
          </motion.a>
        </Reveal>
      </motion.section>

      <motion.section className="journey-section lifestyle-chapter" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }} variants={sectionReveal}>
        <div className="lifestyle-panel">
          <Reveal>
            <span className="chapter-mark">02</span>
            <span className="chapter-label">Lifestyle</span>
            <h2>The day opens with more room around it.</h2>
          </Reveal>
          <div className="lifestyle-timeline">
            {lifestyleMoments.map(([time, copy], index) => (
              <Reveal className="timeline-line" delay={index * 0.06} key={time}>
                <strong>{time}</strong>
                <span>{copy}</span>
              </Reveal>
            ))}
          </div>
        </div>
        <ImageReveal className="lifestyle-visual" style={{ y: reduceMotion ? 0 : plateY }}>
          <img src="/assets/natures-edge-editorial-villa.png" alt="Contemporary villa exterior in a premium gated community" />
          <span className="image-caption">Villa mornings</span>
        </ImageReveal>
      </motion.section>

      <motion.section className="journey-section architecture-chapter" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }} variants={sectionReveal}>
        <ImageReveal className="architecture-frame" style={{ y: reduceMotion ? 0 : architectureY }}>
          <img src="/assets/natures-edge-editorial-arrival.png" alt="Gated arrival to a premium villa community" />
          <span className="image-caption">Private villa arrival</span>
        </ImageReveal>
        <Reveal className="architecture-copy">
          <span className="chapter-mark">03</span>
          <span className="chapter-label">Architecture</span>
          <h2>Designed around land, light, and the luxury of your own address.</h2>
          <p>
            Contemporary 4BHK villas created for natural light, meaningful
            privacy, and the everyday rituals of a larger home.
          </p>
        </Reveal>
        <Reveal className="architecture-scale" delay={0.12}>
          <span>Villa formats</span>
          <div className="architecture-scale-row">
            <div className="architecture-scale-stat">
              <strong>300</strong>
              <em>Sq. yd plot</em>
            </div>
            <div className="architecture-scale-divider" aria-hidden="true" />
            <div className="architecture-scale-stat">
              <strong>350</strong>
              <em>Sq. yd plot</em>
            </div>
          </div>
        </Reveal>
        <Reveal className="architecture-note" delay={0.18}>
          <span>4BHK villas with room for family life, calm routines, and a garden of your own.</span>
        </Reveal>
      </motion.section>

      <motion.section className="journey-section amenities-chapter" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }} variants={sectionReveal}>
        <ImageReveal className="amenities-image" style={{ y: reduceMotion ? 0 : pricingY }}>
          <img src="/assets/natures-edge-editorial-garden.png" alt="Private garden and pool setting at a luxury villa" />
        </ImageReveal>
        <Reveal className="amenities-heading">
          <span className="chapter-mark">04</span>
          <span className="chapter-label">Amenities</span>
          <h2>Luxury is the ease of not having to leave.</h2>
        </Reveal>
        <div className="amenity-orbit" aria-label="Amenity highlights">
          {amenityNotes.map(([title, copy], index) => (
            <Reveal className="amenity-point" delay={index * 0.04} key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <em>{copy}</em>
            </Reveal>
          ))}
        </div>
        <Reveal className="gallery-lead">
          <span>
            <Images size={18} />
            Gallery &amp; Floor Plans
          </span>
          <p>See the villa exteriors, streetscape, and both floor plan formats before you book a visit.</p>
          <motion.a className="secondary-btn dark" href="#gallery" whileHover={reduceMotion ? undefined : magneticHover} whileTap={{ scale: 0.98 }}>
            <Images size={18} />
            View Gallery
          </motion.a>
        </Reveal>
      </motion.section>

      <motion.section className="journey-section gallery-chapter" id="gallery" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={sectionReveal}>
        <Reveal className="gallery-heading">
          <span className="section-kicker">Gallery</span>
          <h2>See Nature&apos;s Edge for yourself.</h2>
          <p>Villa exteriors, streetscapes, and the community exactly as Signature Avenues is building it.</p>
        </Reveal>
        <div className="photo-grid">
          {[
            ["/assets/natures-edge-official-view-1.jpg", "Signature Nature's Edge villa row at dusk"],
            ["/assets/natures-edge-official-view-4.jpg", "Signature Nature's Edge villa facade and driveway"],
            ["/assets/natures-edge-official-view-3.jpg", "Landscaped seating court within the villa community"],
            ["/assets/natures-edge-official-view-2.jpg", "Aerial view of the villa avenue and children's play area"],
            ["/assets/natures-edge-official-view-5.jpg", "Row of villas along the community street"],
            ["/assets/natures-edge-official-community.jpeg", "Villa community streetscape"],
          ].map(([src, alt], index) => (
            <Reveal className="photo-tile" delay={index * 0.04} key={src}>
              <img src={src} alt={alt} loading="lazy" />
            </Reveal>
          ))}
        </div>
        <Reveal className="floorplan-heading" delay={0.1}>
          <span className="section-kicker">Floor Plans</span>
          <h3>Two villa formats, both built for family life.</h3>
        </Reveal>
        <div className="floorplan-grid">
          <Reveal className="floorplan-card" delay={0.12}>
            <img src="/assets/natures-edge-official-gallery-1.png" alt="Nature's Edge 300 sq. yd. villa floor plan across ground, first, and second floors" loading="lazy" />
            <div className="floorplan-caption">
              <strong>300 sq. yd.</strong>
              <span>East facing · Ground + 2 floors</span>
            </div>
          </Reveal>
          <Reveal className="floorplan-card" delay={0.18}>
            <img src="/assets/natures-edge-official-gallery-2.png" alt="Nature's Edge 350 sq. yd. villa floor plan across ground, first, and second floors" loading="lazy" />
            <div className="floorplan-caption">
              <strong>350 sq. yd.</strong>
              <span>East facing · Ground + 2 floors</span>
            </div>
          </Reveal>
        </div>
        <Reveal className="gallery-cta" delay={0.2}>
          <motion.a className="secondary-btn dark" href="#lead" whileHover={reduceMotion ? undefined : magneticHover} whileTap={{ scale: 0.98 }}>
            <CalendarCheck size={18} />
            Get Full Floor Plans &amp; Pricing
          </motion.a>
        </Reveal>
      </motion.section>

      <motion.section className="journey-section community-chapter" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }} variants={sectionReveal}>
        <ImageReveal className="community-image" style={{ y: reduceMotion ? 0 : communityY }}>
          <img src="/assets/natures-edge-editorial-aerial.png" alt="Low-density villa community beside a green forest edge" />
          <span className="image-caption">Garden community</span>
        </ImageReveal>
        <Reveal className="community-copy">
          <span className="chapter-mark">05</span>
          <span className="chapter-label">Community</span>
          <h2>A community for the next decade of life.</h2>
          <div className="community-lines">
            {communityNotes.map(([title, copy], index) => (
              <motion.div className="community-line" key={title} variants={fadeUp}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{title}</strong>
                <p>{copy}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </motion.section>

      <motion.section className="journey-section location-chapter" id="location" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }} variants={sectionReveal}>
        <ImageReveal className="location-panorama" style={{ y: reduceMotion ? 0 : plateY }}>
          <img src="/assets/natures-edge-editorial-aerial.png" alt="Low-density villa community beside a green forest edge" />
          <span className="image-caption">Villa community</span>
        </ImageReveal>
        <Reveal className="location-headline">
          <span className="chapter-mark">06</span>
          <span className="chapter-label">Location</span>
          <h2>Tukkuguda puts a greener everyday within reach of the city.</h2>
        </Reveal>
        <div className="location-routes">
          {locationNotes.map(([title, copy, meta], index) => (
            <Reveal className="route-line" delay={index * 0.06} key={title}>
              <span>{title}</span>
              <em>{meta}</em>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </motion.section>

      <motion.section className="journey-section investment-chapter" id="pricing" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }} variants={sectionReveal}>
        <ImageReveal className="investment-texture" style={{ y: reduceMotion ? 0 : pricingY }}>
          <img src="/assets/natures-edge-editorial-clubhouse.png" alt="Premium clubhouse pool at a gated villa community" />
        </ImageReveal>
        <Reveal className="investment-copy">
          <span className="chapter-mark">07</span>
          <span className="chapter-label">Investment</span>
          <h2>A rare balance: a private villa community with the city still close.</h2>
          <p>Nature's Edge</p>
          <strong>121</strong>
          <em>private villas</em>
          <div className="price-context">
            <span>13.6 acres of land</span>
            <span>4BHK villa formats</span>
          </div>
          <motion.a className="pricing-cta" href="#lead" whileHover={reduceMotion ? undefined : magneticHover} whileTap={{ scale: 0.98 }}>
            <CalendarCheck size={18} />
            Request Villa Details
          </motion.a>
        </Reveal>
      </motion.section>

      <motion.section className="journey-section ownership-chapter" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }} variants={sectionReveal}>
        <ImageReveal className="ownership-image image-card" style={{ y: reduceMotion ? 0 : architectureY }}>
          <img src="/assets/natures-edge-editorial-villa.png" alt="Contemporary luxury villa in a landscaped community" />
        </ImageReveal>
        <Reveal className="ownership-heading">
          <span className="chapter-mark">08</span>
          <span className="chapter-label">Ownership</span>
          <h2>Assurance is part of the finish.</h2>
        </Reveal>
        <div className="ownership-ledger">
          {proofItems.map(([title, value], index) => (
            <Reveal className="ledger-line" delay={index * 0.04} key={title}>
              <span>{title}</span>
              <strong>{value}</strong>
            </Reveal>
          ))}
        </div>
        <Reveal className="document-actions">
          <motion.a className="secondary-btn dark" href="#lead" whileHover={reduceMotion ? undefined : magneticHover} whileTap={{ scale: 0.98 }}>
            <CalendarCheck size={18} />
            Request Approval Details
          </motion.a>
        </Reveal>
        <Reveal className="ownership-seal" delay={0.16}>
          <strong>Clarity before commitment.</strong>
          <span>Approval details and a guided villa walkthrough are available for serious shortlisting.</span>
        </Reveal>
      </motion.section>

      <motion.section className="journey-section invitation-chapter" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }} variants={sectionReveal}>
        <ImageReveal className="invitation-image" style={{ y: reduceMotion ? 0 : plateY }}>
          <img src="/assets/natures-edge-editorial-arrival.png" alt="Gated arrival for a private villa site visit" />
        </ImageReveal>
        <Reveal className="invitation-copy">
          <span className="chapter-mark">09</span>
          <span className="chapter-label">Final Invitation</span>
          <h2>Experience the morning privately.</h2>
          <p>
            Receive the villa overview and available private visit windows for
            Signature Nature's Edge.
          </p>
          <div className="invitation-trust">
            <span>Villa overview</span>
            <span>Approval details</span>
            <span>Private visit slots</span>
          </div>
        </Reveal>
        <Reveal className="lead-form-wrap" id="lead">
          <span className="lead-form-label">Private appointment desk</span>
          <form
            className="lead-form"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <label>
              Full name
              <input type="text" name="name" placeholder="Your name" autoComplete="name" required />
            </label>
            <label>
              Phone number
              <input type="tel" name="phone" placeholder="+91" autoComplete="tel" inputMode="tel" required />
            </label>
            <label>
              Email address <span>optional</span>
              <input type="email" name="email" placeholder="you@example.com" autoComplete="email" inputMode="email" />
            </label>
            <motion.button type="submit" whileHover={reduceMotion ? undefined : magneticHover} whileTap={{ scale: 0.98 }}>
              Schedule Private Walkthrough
              <ChevronRight size={18} />
            </motion.button>
            {submitted ? (
              <p className="success-note">Thank you. Your request is ready for follow-up.</p>
            ) : (
              <p>By submitting, you request a project callback for Signature Nature's Edge villa details.</p>
            )}
          </form>
        </Reveal>
      </motion.section>

      <footer>
        <div>
          <strong>Signature Nature's Edge</strong>
          <span>By Signature Avenues · Tukkuguda, Hyderabad</span>
        </div>
        <motion.a className="footer-tour-cta" href="#lead" whileHover={reduceMotion ? undefined : magneticHover} whileTap={{ scale: 0.98 }}>
          <CalendarCheck size={17} />
          Book Private Tour
        </motion.a>
      </footer>

      <div className="sticky-actions" aria-label="Quick enquiry actions">
        <motion.a href="tel:+919642439988" aria-label="Request a call" whileHover={reduceMotion ? undefined : magneticHover} whileTap={{ scale: 0.98 }}>
          <Phone size={20} />
          <span>Call</span>
        </motion.a>
        <motion.a
          href="https://wa.me/919642439988?text=I%20saw%20Signature%20Nature%27s%20Edge.%20Please%20share%20villa%20details%20and%20site%20visit%20slots."
          target="_blank"
          rel="noreferrer"
          aria-label="Send WhatsApp enquiry"
          whileHover={reduceMotion ? undefined : magneticHover}
          whileTap={{ scale: 0.98 }}
        >
          <MessageCircle size={20} />
          <span>WhatsApp</span>
        </motion.a>
        <motion.a href="#lead" aria-label="Book a visit" whileHover={reduceMotion ? undefined : magneticHover} whileTap={{ scale: 0.98 }}>
          <CalendarCheck size={20} />
          <span>Book Visit</span>
        </motion.a>
      </div>

      <AnimatePresence>
        {exitOpen ? (
        <motion.div
          className="exit-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.32, ease }}
        >
          <motion.div
            className="exit-modal"
            initial={{ opacity: 0, y: 44, scale: 0.94, clipPath: "inset(10% 10% 10% 10% round 32px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0% round 32px)" }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.58, ease: slowEase }}
          >
            <button className="exit-close" type="button" aria-label="Close offer" onClick={() => setExitOpen(false)}>
              <X size={18} />
            </button>
            <div className="exit-visual">
              <img src="/assets/natures-edge-editorial-garden.png" alt="Villa garden preview" />
            </div>
            <div className="exit-copy">
              <span className="chapter-label">Private Access Desk</span>
              <h2 id="exit-title">Take the villa details with you.</h2>
              <p>Share your number and we&apos;ll send project details and visit slots as you browse.</p>
              <form
                className="exit-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                  setExitOpen(false);
                }}
              >
                <input type="text" name="exit-name" placeholder="Full name" autoComplete="name" />
                <input type="tel" name="exit-phone" placeholder="Mobile number" autoComplete="tel" inputMode="tel" />
                <motion.button type="submit" whileHover={reduceMotion ? undefined : magneticHover} whileTap={{ scale: 0.98 }}>
                  Send Villa Details
                  <ChevronRight size={17} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
