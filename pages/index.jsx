import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// FAQ Accordion Component with Framer Motion
function FAQAccordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="border-b border-white/10 last:border-b-0"
      initial={false}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-6 flex justify-between items-center group"
        aria-expanded={isOpen}
        whileHover={{ opacity: 0.9 }}
      >
        <h3 className="text-lg font-light text-white pr-8 group-hover:text-white/80 transition-colors">
          {question}
        </h3>
        <motion.svg
          className="w-5 h-5 text-white/60 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-white/70 font-light leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// FAQ Data for structured data
const FAQ_DATA = [
  {
    question: 'Can I add a mezzanine or climate control?',
    answer: 'Yes—both are popular options. Our team can help you customize your unit with a mezzanine for lounges, offices, or display areas, and climate control options to protect your collection.'
  },
  {
    question: 'Are leases or subleases allowed?',
    answer: 'No—this is ownership only. Each unit is individually owned with deeded ownership, giving you full equity and the ability to resell like any other real estate when you\'re ready.'
  },
  {
    question: 'What do HOA fees cover?',
    answer: 'HOA fees cover security systems, landscaping, clubhouse maintenance, and common-area upkeep. This ensures your investment remains pristine and the community stays exclusive.'
  },
  {
    question: 'How do I get more info?',
    answer: 'Tap "Reserve Now" anywhere on the site, or contact Chip McCraney directly at (214) 991-6966.'
  },
  {
    question: 'What can I store?',
    answer: 'Garage 30A is purpose-built for car and motorcycle collections. (Not for RVs or boats.)'
  }
];

// Section Reveal Component
function SectionReveal({ children, className = "", delay = 0 }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

// Count Up Component for Specs
function CountUp({ end, duration = 2, suffix = "" }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Tilt Image Component with Framer Motion
function TiltImage({ src, alt, onClick }) {
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });
  const elementRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleMouseMove = (e) => {
    if (!elementRef.current) return;
    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: 'none'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out'
    });
  };

  return (
    <motion.button
      ref={(node) => {
        elementRef.current = node;
        ref(node);
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="aspect-[4/3] rounded-3xl overflow-hidden relative group cursor-pointer"
      style={tiltStyle}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Image 
        src={src} 
        alt={alt}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
    </motion.button>
  );
}

export default function Garage30A() {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formStatus, setFormStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoRef = useRef(null);
  const amenitiesRef = useRef(null);
  
  // Register GSAP ScrollTrigger
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      window.gsap = gsap;
    }
  }, []);

  // GSAP ScrollTrigger for Amenities Section
  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !amenitiesRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = amenitiesRef.current.querySelectorAll('.amenity-card');
    
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none none",
          },
          delay: index * 0.15,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((error) => {
              console.log('Video autoplay prevented:', error);
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5, rootMargin: '0px' }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  const handleFormSubmit = async (e, formType = 'contact') => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const formspreeUrl = 'https://formspree.io/f/xovpoldj';

    // Track CTA click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', `form_submit_${formType}`, {
        event_category: 'engagement',
        event_label: formType
      });
    }

    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ ...data, formType })
      });

      if (response.ok) {
        setFormStatus({ type: 'success', message: 'Thank you! We\'ll be in touch soon.' });
        form.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Something went wrong. Please try again or call us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const trackCTA = (action) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: 'cta',
        event_label: action
      });
    }
  };

  const faqData = FAQ_DATA;

  return (
    <>
      <Head>
        <title>Garage 30A — Luxury Car Condominiums on Florida's 30A</title>
        <meta name="description" content="Luxury car condominiums for collectors and adventurers on Florida's scenic 30A. Individually owned garage condos with deeded ownership, members-only clubhouse, and 24/7 secure access. Pricing from the mid-$500Ks." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="luxury garage, car condominiums, 30A, Florida, car storage, garage condo, Santa Rosa Beach, Grayton Beach" />
        <link rel="canonical" href="https://garage30a.verve.app" />
        <script src="https://player.vimeo.com/api/player.js"></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Garage 30A",
              "description": "Luxury car condominiums for collectors and adventurers",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "5283 Hwy 98 E",
                "addressLocality": "Santa Rosa Beach",
                "addressRegion": "FL",
                "postalCode": "32459",
                "addressCountry": "US"
              },
              "telephone": "+1-214-991-6966",
              "url": "https://garage30a.verve.app",
              "priceRange": "$$$"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": FAQ_DATA.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </Head>

      <div className="bg-black text-white min-h-screen">
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-500 ${
          scrollY > 20 ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
        }`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-500 py-3 sm:py-6">
            <div className="flex justify-between items-center">
              <a href="#hero" className="flex items-center">
                <div className="flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40">
                  <Image 
                    src="/logo.svg" 
                    alt="Garage 30A" 
                    width={160} 
                    height={160}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>
              </a>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-12">
                <a href="#hero" className="text-sm font-light hover:text-white/60 transition-colors duration-300">Home</a>
                <a href="#vision" className="text-sm font-light hover:text-white/60 transition-colors duration-300">About</a>
                <a href="#ownership" className="text-sm font-light hover:text-white/60 transition-colors duration-300">Ownership</a>
                <a href="#location" className="text-sm font-light hover:text-white/60 transition-colors duration-300">Location</a>
                <a href="#faq" className="text-sm font-light hover:text-white/60 transition-colors duration-300">FAQ</a>
                <a href="#contact" className="text-sm font-light hover:text-white/60 transition-colors duration-300">Contact</a>
                <a 
                  href="#contact" 
                  onClick={() => trackCTA('cta_request_pricing')}
                  className="bg-white text-black px-6 py-2.5 text-sm font-medium hover:bg-white/90 transition-all duration-300"
                >
                  Reserve Now
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 -mr-2 touch-manipulation"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <svg className={`w-7 h-7 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="lg:hidden mt-4 pb-4 border-t border-white/10 animate-fadeIn">
                <div className="flex flex-col space-y-1 pt-4">
                  <a 
                    href="#hero" 
                    className="text-base font-light py-3 px-2 hover:text-white/60 hover:bg-white/5 transition-colors rounded-lg touch-manipulation" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </a>
                  <a 
                    href="#vision" 
                    className="text-base font-light py-3 px-2 hover:text-white/60 hover:bg-white/5 transition-colors rounded-lg touch-manipulation" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </a>
                  <a 
                    href="#ownership" 
                    className="text-base font-light py-3 px-2 hover:text-white/60 hover:bg-white/5 transition-colors rounded-lg touch-manipulation" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Ownership
                  </a>
                  <a 
                    href="#location" 
                    className="text-base font-light py-3 px-2 hover:text-white/60 hover:bg-white/5 transition-colors rounded-lg touch-manipulation" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Location
                  </a>
                  <a 
                    href="#faq" 
                    className="text-base font-light py-3 px-2 hover:text-white/60 hover:bg-white/5 transition-colors rounded-lg touch-manipulation" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    FAQ
                  </a>
                  <a 
                    href="#contact" 
                    className="text-base font-light py-3 px-2 hover:text-white/60 hover:bg-white/5 transition-colors rounded-lg touch-manipulation" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </a>
                  <a 
                    href="#contact" 
                    onClick={(e) => { trackCTA('cta_request_pricing'); setIsMenuOpen(false); }}
                    className="bg-white text-black px-6 py-3.5 text-base font-medium hover:bg-white/90 transition-all mt-2 rounded-lg text-center touch-manipulation"
                  >
                    Reserve Now
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
                <iframe 
                  src="https://player.vimeo.com/video/1123270710?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1" 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    transform: 'scale(1.2)',
                    transformOrigin: 'center center'
                  }}
                  title="Garage 30A"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70"></div>
          </div>

          {/* Hero Content */}
          <motion.div 
            className="relative z-10 max-w-4xl mx-auto px-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-thin mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            >
              Luxury Car Garages
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl font-light text-white/90 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
            >
              Where luxury meets coastal lifestyle.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
            >
              <motion.a 
                href="#contact" 
                onClick={() => trackCTA('cta_request_pricing')}
                className="bg-white text-black px-10 py-4 text-base font-medium hover:bg-white/90 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reserve Now
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-xs font-light text-white/60 tracking-widest uppercase">Scroll</span>
              <motion.svg 
                className="w-4 h-4 text-white/60" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </motion.svg>
            </div>
          </motion.div>
        </section>

        {/* What is Garage 30A Section */}
        <section id="vision" className="py-32 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <SectionReveal className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-thin mb-8 text-white">What is Garage 30A</h2>
              <p className="text-xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed mb-8">
                Beyond storage. Ownership.
              </p>
              <p className="text-lg text-white/70 max-w-4xl mx-auto font-light leading-relaxed">
              Garage 30A is a collection of privately owned, individually designed luxury garages for your cars and hobbies. Each owner enjoys access to exclusive common areas and a private clubhouse—fostering a true community of enthusiasts.
              </p>
            </SectionReveal>

            <div className="grid md:grid-cols-2 gap-16 mb-20">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden relative group">
                <video
                  ref={videoRef}
                  src="/videos/robbie.mov"
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden relative group bg-gray-100 cursor-pointer" onClick={() => setSelectedImage('/images/units.jpg')}>
                <img
                  src="/images/units.jpg"
                  alt="Unit Map"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="py-32 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <SectionReveal className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-thin mb-8 text-black">Location</h2>
              <p className="text-xl text-black/80 max-w-4xl mx-auto font-light leading-relaxed mb-4">
                In the heart of the Emerald Coast.
              </p>
              <p className="text-lg text-black/70 max-w-4xl mx-auto font-light leading-relaxed mb-8">
                Find us at <strong>5283 Hwy 98 E, Santa Rosa Beach, Florida</strong>—minutes from Grayton, Blue Mountain, WaterColor, Alys, and Rosemary Beach. Enjoy the convenience of Highway 98 with the exclusivity of the 30A lifestyle.
              </p>
              <motion.a 
                href="https://maps.apple.com/?q=5283+Hwy+98+E,+Santa+Rosa+Beach,+FL+32459"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-black text-black px-8 py-3 text-base font-medium hover:bg-black hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Open Map
              </motion.a>
            </SectionReveal>

            {/* Apple Maps Embed */}
            <SectionReveal delay={0.2}>
              <motion.div 
                className="aspect-[21/9] rounded-3xl overflow-hidden relative group cursor-pointer"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
              <a
                href="https://maps.apple.com/?q=5283+Hwy+98+E,+Santa+Rosa+Beach,+FL+32459"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src="/images/map2.jpg"
                  alt="Garage 30A Location"
                  fill
                  className="object-cover object-top group-hover:opacity-90 transition-opacity"
                  style={{ objectPosition: 'center top' }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-black font-medium">Open in Apple Maps</span>
                  </div>
                </div>
              </a>
              </motion.div>
            </SectionReveal>
          </div>
        </section>

        {/* Features & Customization Section */}
        <section className="pt-32 pb-24 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <SectionReveal className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-thin mb-8 text-white">Features & Customization</h2>
              <p className="text-2xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed">
                Luxury. By Design.
              </p>
            </SectionReveal>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div>
                <h3 className="text-2xl font-light mb-6 text-white">Luxury</h3>
                <ul className="space-y-4 text-white/70 font-light">
                  <li className="flex items-start gap-3">
                    <span className="text-white/60 mt-1">•</span>
                    <span>30' x 40' units with 25 ft. soaring ceilings </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white/60 mt-1">•</span>
                    <span>Optional mezzanines for lounges, offices, or display</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white/60 mt-1">•</span>
                    <span>Designer finishes: epoxy floors, premium LED lighting</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-light mb-6 text-white">Design</h3>
                <ul className="space-y-4 text-white/70 font-light">
                  <li className="flex items-start gap-3">
                    <span className="text-white/60 mt-1">•</span>
                    <span>Climate control options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white/60 mt-1">•</span>
                    <span>Lifts, custom cabinets, entertainment setups</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white/60 mt-1">•</span>
                    <span>Complimentary consultation with our architect & designer</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="pt-0 pb-32 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TiltImage
                src="/images/image2.jpg"
                alt="Luxury Interiors"
                onClick={() => setSelectedImage('/images/image2.jpg')}
              />
              <TiltImage
                src="/images/image3.jpg"
                alt="Climate Control"
                onClick={() => setSelectedImage('/images/image3.jpg')}
              />
              <TiltImage
                src="/images/image14.jpg"
                alt="Premium Storage"
                onClick={() => setSelectedImage('/images/image14.jpg')}
              />
              <TiltImage
                src="/images/image11.jpg"
                alt="Modern Design"
                onClick={() => setSelectedImage('/images/image11.jpg')}
              />
              <TiltImage
                src="/images/image15.jpg"
                alt="Custom Layouts"
                onClick={() => setSelectedImage('/images/image15.jpg')}
              />
              <TiltImage
                src="/images/image5.jpg"
                alt="Luxury Features"
                onClick={() => setSelectedImage('/images/image5.jpg')}
              />
            </div>
          </div>
        </section>

        {/* Ownership Benefits Section */}
        <section id="ownership" className="py-32 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <SectionReveal className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-thin mb-8 text-black">Ownership Benefits</h2>
              <p className="text-2xl text-black/80 max-w-4xl mx-auto font-light leading-relaxed mb-4">
                Own your space. Join the community.
              </p>
              <p className="text-lg text-black/70 max-w-4xl mx-auto font-light leading-relaxed">
                24/7 access, equity growth, and a thriving network of car lovers. Customize now, enjoy forever, and resell like any other real estate investment.
              </p>
            </SectionReveal>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center p-8 rounded-3xl bg-black border border-white/20">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-white/20 rounded-full">
                  <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-light mb-4 text-white">24/7 Access</h3>
                <p className="text-white/70 font-light">Secure, convenient access whenever you need it</p>
              </div>

              <div className="text-center p-8 rounded-3xl bg-black border border-white/20">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-white/20 rounded-full">
                  <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-light mb-4 text-white">Equity Growth</h3>
                <p className="text-white/70 font-light">Real estate ownership with potential appreciation</p>
              </div>

              <div className="text-center p-8 rounded-3xl bg-black border border-white/20">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-white/20 rounded-full">
                  <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-light mb-4 text-white">Thriving Network</h3>
                <p className="text-white/70 font-light">Connect with fellow car enthusiasts and collectors</p>
              </div>
            </div>
          </div>
        </section>

        {/* Amenities Section */}
        <section className="py-32 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <SectionReveal className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-thin mb-4 text-white">Amenities</h2>
              <p className="text-2xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed mb-4">Exclusive Perks for Garage 30A Owners.</p>
            </SectionReveal>

            <div ref={amenitiesRef} className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Access to Premier Events */}
              <div className="amenity-card bg-gray-900 rounded-3xl overflow-hidden relative flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/golf.png"
                    alt="Premier Events"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="px-6 pt-6 pb-8 text-center flex-grow flex flex-col">
                  <h3 className="text-xl font-light mb-3 text-white">Access to Premier Events</h3>
                  <p className="text-white/80 font-light text-sm leading-relaxed">Private access to elite automotive and sporting events—from track days to VIP experiences.</p>
                </div>
              </div>

              {/* Private Jet Charter */}
              <div className="amenity-card bg-gray-900 rounded-3xl overflow-hidden relative flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/plane.jpg"
                    alt="Private Jet"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="px-6 pt-6 pb-8 text-center flex-grow flex flex-col">
                  <h3 className="text-xl font-light mb-3 text-white">Private Jet Charter</h3>
                  <p className="text-white/80 font-light text-sm leading-relaxed">Exclusive private air travel for members, with preferred rates and flexible scheduling.</p>
                </div>
              </div>

              {/* Members-Only App */}
              <div className="amenity-card bg-gray-900 rounded-3xl overflow-hidden relative flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/app.jpg"
                    alt="Mobile App"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="px-6 pt-6 pb-8 text-center flex-grow flex flex-col">
                  <h3 className="text-xl font-light mb-3 text-white">Members-Only App</h3>
                  <p className="text-white/80 font-light text-sm leading-relaxed">Manage access, book experiences, and connect with fellow owners—all in one place.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-32 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <SectionReveal className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-thin mb-8 text-black">FAQ</h2>
              <p className="text-2xl text-black/80 max-w-4xl mx-auto font-light leading-relaxed mb-4">Frequently Asked Questions</p>
            </SectionReveal>

            <div className="bg-black rounded-3xl p-8 md:p-12">
              {faqData.map((faq, index) => (
                <FAQAccordion key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 bg-black">
          <div className="max-w-4xl mx-auto px-6">
            <SectionReveal className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-thin mb-8 text-white">Now Accepting Limited Reservations</h2>
              <p className="text-lg text-white/70 font-light mb-8">
                Get in touch to reserve your unit
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <a 
                  href="tel:+12149916966" 
                  onClick={() => trackCTA('cta_phone_call')}
                  className="text-white/80 hover:text-white transition-colors font-light"
                >
                  Chip McCraney • (214) 991-6966
                </a>
              </div>
            </SectionReveal>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-12 md:p-16">
              {formStatus.message && (
                <div className={`mb-8 p-4 rounded-2xl ${
                  formStatus.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {formStatus.message}
                </div>
              )}
              <form
                onSubmit={(e) => handleFormSubmit(e, 'tour')}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-black transition-colors font-light text-black"
                    aria-label="First Name"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-black transition-colors font-light text-black"
                    aria-label="Last Name"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-black transition-colors font-light text-black"
                  aria-label="Email Address"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-black transition-colors font-light text-black"
                  aria-label="Phone Number"
                />
                <textarea
                  name="message"
                  placeholder=""
                  rows={4}
                  required
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-black transition-colors resize-none font-light text-black"
                  aria-label="Message"
                ></textarea>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white px-8 py-4 rounded-2xl font-medium hover:bg-black/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-16 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Image 
                      src="/logo.svg" 
                      alt="Garage 30A" 
                      width={32} 
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xl font-light tracking-wider">GARAGE 30A</span>
                </div>
                <p className="text-white/60 mb-8 max-w-md font-light leading-relaxed">
                  5283 Hwy 98 E, Santa Rosa Beach, Florida 32459
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300" aria-label="Instagram">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-light mb-6 text-white">Quick Links</h4>
                <ul className="space-y-3 text-white/60">
                  <li><a href="#vision" className="hover:text-white transition-colors font-light">About</a></li>
                  <li><a href="#ownership" className="hover:text-white transition-colors font-light">Ownership</a></li>
                  <li><a href="#location" className="hover:text-white transition-colors font-light">Location</a></li>
                  <li><a href="#faq" className="hover:text-white transition-colors font-light">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-light mb-6 text-white">Contact</h4>
                <ul className="space-y-3 text-white/60">
                  <li className="font-light">5283 Hwy 98 E</li>
                  <li className="font-light">Santa Rosa Beach, FL 32459</li>
                  <li className="pt-2">
                    <a href="tel:+12149916966" className="hover:text-white transition-colors font-light">
                      (214) 991-6966
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@garage30a.com" className="hover:text-white transition-colors font-light">
                      info@garage30a.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
              <p className="font-light">&copy; 2024 Garage 30A. All rights reserved.</p>
              <div className="flex space-x-8 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors font-light">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors font-light">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white hover:text-white/60 transition-colors p-2 touch-manipulation z-10"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            <img 
              src={selectedImage} 
              alt="Gallery" 
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1.2s ease-out;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-8px) translateX(-50%);
          }
        }

        .animate-bounce {
          animation: bounce 3s infinite;
        }

        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #000000;
        }

        ::-webkit-scrollbar-thumb {
          background: #ffffff;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #ffffff;
        }

        input:focus, textarea:focus, button:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
        }

        input[type="text"]:focus, input[type="email"]:focus, input[type="tel"]:focus, textarea:focus {
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
        }

        /* Mobile optimizations */
        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        @media (max-width: 640px) {
          /* Prevent horizontal scroll on mobile */
          body {
            overflow-x: hidden;
          }
          
          /* Improve tap targets on mobile */
          a, button {
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* Subtle background patterns */
        .pattern-dots {
          background-image: radial-gradient(circle, rgba(0, 0, 0, 0.08) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .pattern-grid {
          background-image: 
            linear-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.06) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .pattern-diagonal {
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.05) 10px,
            rgba(255, 255, 255, 0.05) 20px
          );
        }

        .pattern-dots-dark {
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .pattern-grid-dark {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </>
  );
}
