import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';

// Custom hook for tilt effect
function useTilt() {
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });
  const elementRef = useRef(null);

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

  return { tiltStyle, elementRef, handleMouseMove, handleMouseLeave };
}

// Tilt Image Component
function TiltImage({ src, alt, onClick }) {
  const { tiltStyle, elementRef, handleMouseMove, handleMouseLeave } = useTilt();

  return (
    <button
      ref={elementRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="aspect-[4/3] rounded-3xl overflow-hidden relative group cursor-pointer"
      style={tiltStyle}
    >
      <Image 
        src={src} 
        alt={alt}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
    </button>
  );
}

export default function EliteGarageClub() {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close lightbox on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Video autoplay on scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((error) => {
              // Autoplay was prevented, user interaction required
              console.log('Video autoplay prevented:', error);
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.5, // Play when 50% of video is visible
        rootMargin: '0px',
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Garage 30A — Where Passion Meets Premium Car Storage</title>
        <meta name="description" content="Luxury garage condominiums reimagined for those who never settle for average. Garage 30A offers secure, customized garage offices with deeded ownership near Florida's iconic 30A corridor." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://player.vimeo.com/api/player.js"></script>
      </Head>

      <div className="bg-black text-white min-h-screen">
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-500 ${
          scrollY > 20 ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
        }`}>
          <div className="max-w-6xl mx-auto px-6 transition-all duration-500 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={`flex items-center justify-center transition-all duration-500 ${
                  scrollY > 20 ? 'w-16 h-16' : 'w-40 h-40'
                }`}>
                  <Image 
                    src="/logo.svg" 
                    alt="Garage 30A" 
                    width={scrollY > 20 ? 64 : 160} 
                    height={scrollY > 20 ? 64 : 160}
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-12">
                <a href="#location" className="text-sm font-light hover:text-white/60 transition-colors duration-300">Location</a>
                <a href="#spaces" className="text-sm font-light hover:text-white/60 transition-colors duration-300">Spaces</a>
                <a href="#community" className="text-sm font-light hover:text-white/60 transition-colors duration-300">Community</a>
                <a href="#experience" className="text-sm font-light hover:text-white/60 transition-colors duration-300">Experience</a>
                <a href="#availability" className="bg-white text-black px-8 py-3 text-sm font-medium hover:bg-white/90 transition-all duration-300 inline-block">
                  Reserve Now
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="lg:hidden mt-6 pb-6 border-t border-white/10">
                <div className="flex flex-col space-y-4 pt-6">
                  <a href="#location" className="text-sm font-light hover:text-white/60 transition-colors">Location</a>
                  <a href="#spaces" className="text-sm font-light hover:text-white/60 transition-colors">Spaces</a>
                  <a href="#community" className="text-sm font-light hover:text-white/60 transition-colors">Community</a>
                  <a href="#experience" className="text-sm font-light hover:text-white/60 transition-colors">Experience</a>
                  <a href="#availability" className="bg-white text-black px-8 py-3 text-sm font-medium hover:bg-white/90 transition-all w-fit inline-block">
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
                  title="carsof30a garage"
                />
              </div>
            </div>
            {/* Subtle overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Content - Removed text for clean video background */}

          {/* Scroll Indicator */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-xs font-light text-white/60 tracking-widest uppercase">Scroll</span>
              <svg className="w-4 h-4 text-white/60 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 border-y border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              <div className="space-y-3">
                <div className="text-5xl md:text-6xl font-thin text-white">56</div>
                <div className="text-sm font-light text-white/60 tracking-widest uppercase">Exclusive Units</div>
              </div>
              <div className="space-y-3">
                <div className="text-5xl md:text-6xl font-thin text-white">24/7</div>
                <div className="text-sm font-light text-white/60 tracking-widest uppercase">Secure Access</div>
              </div>
              <div className="space-y-3">
                <div className="text-5xl md:text-6xl font-thin text-white">5K</div>
                <div className="text-sm font-light text-white/60 tracking-widest uppercase">Sq Ft Clubhouse</div>
              </div>
              <div className="space-y-3">
                <div className="text-5xl md:text-6xl font-thin text-white">100%</div>
                <div className="text-sm font-light text-white/60 tracking-widest uppercase">Climate Control</div>
              </div>
            </div>
          </div>
        </section>

        {/* Spaces Gallery */}
        <section id="spaces" className="py-32 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-24">
              <div className="inline-block px-6 py-2 bg-black/10 backdrop-blur-sm border border-black/20 rounded-full text-black/80 text-xs font-light tracking-widest uppercase mb-8">
                Luxury Car Garages
              </div>
              <h2 className="text-4xl md:text-6xl font-thin mb-8 text-black">What is Garage 30A?</h2>
              <p className="text-lg text-black/70 max-w-3xl mx-auto font-light leading-relaxed">
                Garage 30A is a luxury garage community designed for those who value craftsmanship, privacy, and lifestyle. Each unit is individually owned, deeded, and customizable—perfect for car collectors, hobbyists, or those seeking a personal retreat. Ownership also includes access to exclusive common areas and a private members' clubhouse.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 mb-20">
              {/* Video */}
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
              <div className="aspect-[4/3] rounded-3xl overflow-hidden relative group bg-gray-100">
                <Image 
                  src="/images/map.jpg" 
                  alt="Map"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Features List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                'Insulated Walls and Ceilings',
                'Elegant Event Facility for Private Gatherings',
                'Private In-Unit Plumbing',
                'Pre-Wired High-Speed Internet',
                'Climate Controlled Interiors',
                'Custom Storage Solutions',
                'Premium Finishes',
                'Year-Round Convenience'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-all duration-300">
                  <div className="w-2 h-2 bg-black rounded-full flex-shrink-0"></div>
                  <span className="text-black/80 font-light">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* Closing Tagline */}
            <div className="text-center mt-20">
              <p className="text-2xl font-light text-black/80 leading-relaxed max-w-3xl mx-auto">
                With 24/7 gated access, wide drive aisles, and year-round convenience, Garage 30A delivers peace of mind, long-term value, and a true sense of belonging. This is more than car storage. It's ownership. It's community. It's your space, your style, your sanctuary.
              </p>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="py-32 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-24">
              <div className="inline-block px-6 py-2 bg-black/10 backdrop-blur-sm border border-black/20 rounded-full text-black/80 text-xs font-light tracking-widest uppercase mb-8">
                Prime Location
              </div>
              <h2 className="text-4xl md:text-6xl font-thin mb-8 text-black">Location</h2>
              <p className="text-lg text-black/70 max-w-3xl mx-auto font-light leading-relaxed">
                Tucked along highway 98 near Florida's iconic 30A corridor, this exclusive community offers the perfect location for your luxury garage office.
              </p>
            </div>

            {/* Google Maps Embed */}
            <div className="aspect-[21/9] rounded-3xl overflow-hidden relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47149.43145606431!2d-86.09566864174735!3d30.31679682429975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8893e5f5121632f9%3A0x421d5796fc0b6135!2s5283%20US-98%2C%20Santa%20Rosa%20Beach%2C%20FL%2032459!5e0!3m2!1sen!2sus!4v1762146064800!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-32 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-24">
              <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-xs font-light tracking-widest uppercase mb-8">
                Image Gallery
              </div>
              <h2 className="text-4xl md:text-6xl font-thin mb-8 text-white">Spaces Designed to Impress</h2>
              <p className="text-lg text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
                A community built to last.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Gallery Images - Using real images with tilt effect */}
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
              <TiltImage
                src="/images/image10.jpg"
                alt="Elite Spaces"
                onClick={() => setSelectedImage('/images/image10.jpg')}
              />
              <TiltImage
                src="/images/image13.jpg"
                alt="Premium Experience"
                onClick={() => setSelectedImage('/images/image13.jpg')}
              />
              <TiltImage
                src="/images/image12.jpg"
                alt="Exclusive Collection"
                onClick={() => setSelectedImage('/images/image12.jpg')}
              />
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="py-32 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-xs font-light tracking-widest uppercase mb-8">
                  The Community
                </div>
                <h2 className="text-4xl md:text-6xl font-thin mb-8 text-white">
                  Find Your Place.
                  <br />Meet the Community.
                </h2>
                <p className="text-lg text-white/70 mb-12 leading-relaxed font-light">
                  Each Garage 30A location features a private luxury clubhouse, perfect for events, relaxing with friends, or connecting with fellow enthusiasts. From Cars & Coffee meetups to members-only gatherings, the clubhouse is where the Garage 30A community starts. It's more than an amenity, it's an extension of the premium car storage experience.
                </p>
                <div className="space-y-8">
                  {[
                    { title: 'Monthly Cars & Coffee', description: 'Casual morning gatherings with fellow collectors' },
                    { title: 'Private Event Hosting', description: 'Exclusive venue for your special occasions' },
                    { title: 'Members-Only Gatherings', description: 'Connect with like-minded enthusiasts' }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-6">
                      <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xl font-light mb-3 text-white">{item.title}</h4>
                        <p className="text-white/60 font-light">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  {/* Clubhouse image placeholder */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-24">
              <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-xs font-light tracking-widest uppercase mb-8">
                What Sets Garage 30A Apart
              </div>
              <h2 className="text-4xl md:text-6xl font-thin mb-8 text-white">More Than Just a Place to Park</h2>
              <p className="text-lg text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
                Garage 30A is a market leader of luxury garage condominium communities built for collectors and performance enthusiasts who want more than just storage. We offer secure, customized garage offices with deeded ownership and access to an exclusive community of like-minded individuals. It's a place to protect your investment, enjoy premium car storage, and connect with people who share your passion.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-16">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  ),
                  title: 'Secure, Customized Garage Condos',
                  description: 'Individually owned units with deeded ownership and full customization options to reflect your lifestyle.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  title: 'Exclusive Shared Amenities',
                  description: 'Access to spacious gathering areas and a members-only clubhouse where community starts.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'Long-Term Value & Belonging',
                  description: 'With 24/7 gated access, wide drive aisles, and year-round convenience, Garage 30A delivers peace of mind and a true sense of belonging.'
                }
              ].map((feature, index) => (
                <div key={index} className="group text-center">
                  <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center border border-white/20 rounded-full group-hover:border-white/40 transition-all duration-300">
                    <div className="text-white/80 group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-light mb-6 text-white">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed font-light">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-32 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center p-8 rounded-3xl bg-gray-50 border border-gray-100">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop&crop=faces&auto=format&q=80"
                    alt="Mike R"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-4xl mb-6">"</div>
                <p className="text-lg text-black/80 mb-6 font-light leading-relaxed">
                  I've stored cars all over the country, and nothing compares to Garage 30A. It's not just the security or the quality of the space. It's the sense of pride and community that comes with ownership. This place was clearly built by people who get it.
                </p>
                <div className="text-black/60 font-light">
                  <div className="font-medium text-black">Mike R</div>
                  <div>The Car Collector</div>
                </div>
              </div>
              <div className="text-center p-8 rounded-3xl bg-gray-50 border border-gray-100">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces&auto=format&q=80"
                    alt="Denise T"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-4xl mb-6">"</div>
                <p className="text-lg text-black/80 mb-6 font-light leading-relaxed">
                  Garage 30A gave me more than a place to park my vehicles. It gave me a place to unwind, talk cars, and meet people who share the same passion. The monthly Cars & Coffee events are the highlight of my weekends.
                </p>
                <div className="text-black/60 font-light">
                  <div className="font-medium text-black">Denise T</div>
                  <div>Garage 30A Owner</div>
                </div>
              </div>
              <div className="text-center p-8 rounded-3xl bg-gray-50 border border-gray-100">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces&auto=format&q=80"
                    alt="Jordan M"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-4xl mb-6">"</div>
                <p className="text-lg text-black/80 mb-6 font-light leading-relaxed">
                  I wasn't sure I needed a garage office until I toured Garage 30A. Now I can't imagine not having one. It's clean, secure, and totally customizable. The ownership model just made sense.
                </p>
                <div className="text-black/60 font-light">
                  <div className="font-medium text-black">Jordan M</div>
                  <div>The First-Time Buyer</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Availability Section */}
        <section id="availability" className="py-32 bg-black">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-xs font-light tracking-widest uppercase mb-8">
              Your Trusted Partner
            </div>
            <h2 className="text-4xl md:text-6xl font-thin mb-8 text-white">
              For Garage Ownership
            </h2>
            <p className="text-lg text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed font-light">
              Ready to find your perfect space? Connect with us to discover how Garage 30A delivers more than storage. It's a lifestyle.
            </p>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-12 md:p-16">
              <h3 className="text-3xl font-light mb-12 text-black">Schedule Your Private Tour</h3>
              <form
                action="https://formspree.io/f/YOUR_FORM_ID"
                method="POST"
                className="space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-black transition-colors font-light"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-black transition-colors font-light"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-black transition-colors font-light"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-black transition-colors font-light"
                />
                <textarea
                  name="message"
                  placeholder="Tell us about your collection and interests"
                  rows={4}
                  required
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-black transition-colors resize-none font-light"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-black text-white px-8 py-4 rounded-2xl font-medium hover:bg-black/90 transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
              <p className="text-sm text-black/60 mt-8 font-light">
                Contact us for more information about our exclusive membership opportunities
              </p>
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="py-32 bg-white border-t border-black/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-thin mb-4 text-black">Car Storage across the 30A Corridor</h2>
              <p className="text-lg text-black/70 max-w-3xl mx-auto font-light leading-relaxed">
                Garage 30A offers secure, luxury garage storage with 24/7 access and premium amenities tailored to enthusiasts along Florida's premier coastal corridor.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <h3 className="text-xl font-light mb-2 text-black">Highway 98 Location</h3>
                <p className="text-black/60 font-light">Highway 98<br />Near 30A Corridor<br />Florida</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-light mb-2 text-black">Coastal Access</h3>
                <p className="text-black/60 font-light">Minutes from pristine beaches<br />Premium coastal living<br />Exclusive community</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-light mb-2 text-black">Premium Amenities</h3>
                <p className="text-black/60 font-light">24/7 secure access<br />Clubhouse & events<br />Customizable units</p>
              </div>
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
                  Tucked along highway 98 near Florida's iconic 30A corridor, this exclusive community of 56 luxury garage offices.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                    <span className="sr-only">Instagram</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                    <span className="sr-only">YouTube</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-light mb-6 text-white">Quick Links</h4>
                <ul className="space-y-3 text-white/60">
                  <li><a href="#experience" className="hover:text-white transition-colors font-light">Experience</a></li>
                  <li><a href="#spaces" className="hover:text-white transition-colors font-light">Spaces</a></li>
                  <li><a href="#community" className="hover:text-white transition-colors font-light">Community</a></li>
                  <li><a href="#location" className="hover:text-white transition-colors font-light">Location</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-light mb-6 text-white">Contact</h4>
                <ul className="space-y-3 text-white/60">
                  <li className="font-light">Highway 98, Florida</li>
                  <li className="font-light">Near 30A Corridor</li>
                  <li className="pt-2">
                    <a href="tel:+1234567890" className="hover:text-white transition-colors font-light">
                      (123) 456-7890
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
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-8 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-8 right-8 text-white hover:text-white/60 transition-colors"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
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

        /* Apple-style focus states */
        input:focus, textarea:focus, button:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
        }

        /* Subtle hover animations */
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }

        .group:hover .group-hover\\:scale-105 {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}
