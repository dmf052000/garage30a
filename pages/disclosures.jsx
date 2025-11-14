import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

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

export default function Disclosures() {
  return (
    <>
      <Head>
        <title>Disclosures — Garage 30A</title>
        <meta name="description" content="Website disclosures and legal notice for Garage 30A" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-black text-white min-h-screen">
        {/* Navigation */}
        <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-6">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center">
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
              </Link>
              
              <Link 
                href="/"
                className="text-sm font-light hover:text-white/60 transition-colors duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </nav>

        {/* Disclosures Section */}
        <section className="pt-32 pb-32 bg-black">
          <div className="max-w-4xl mx-auto px-6">
            <SectionReveal className="mb-16">
              <h1 className="text-4xl md:text-6xl font-thin mb-8 text-white">Website Disclosures & Legal Notice</h1>
              <p className="text-xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed mb-12">
                The information, renderings, images, descriptions, prices, specifications, and other materials presented on this Website are provided for illustrative and informational purposes only. They are not intended to form the basis of any contract or guarantee. Please review the disclosures below carefully.
              </p>
            </SectionReveal>

            <div className="space-y-12">
              <SectionReveal delay={0.1}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Conceptual Drawings & Renderings</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed mb-4">
                    All drawings, layouts, floor plans, elevations, site plans, and visual representations on this Website are artist's conceptual renderings. They are based on current development plans, which are subject to change without notice.
                  </p>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    No guarantees or representations are made that any depicted features, amenities, finishes, or views will be constructed, or if constructed, that they will be of the same type, color, size, location, or nature as shown.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Dimensions, Measurements & Specifications</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed mb-4">
                    All dimensions, square footages, ceiling heights, and measurements are approximate and may vary due to construction tolerances, design changes, code requirements, or field conditions.
                  </p>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    Features, materials, and specifications are subject to substitution with items of equal or greater quality at the developer's sole discretion.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.3}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Prices & Availability</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed mb-4">
                    All prices, incentives, unit availability, and features are subject to change without notice.
                  </p>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    Nothing on this Website shall be construed as an offer to sell real property in jurisdictions where prior registration or qualification is required.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.4}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Offering Documents Control</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed mb-4">
                    This offering is made only by the purchase contract and official offering documents applicable to each unit or lot.
                  </p>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    No statement, image, rendering, or description on this Website may be relied upon if it is not expressly included in your purchase contract or offering materials.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.5}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Amenities & Future Development</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed mb-4">
                    Amenities, community features, and improvements shown or described—including but not limited to clubhouses, common areas, parking layouts, landscaping, and exterior elements—are planned features that may be modified, relocated, substituted, or eliminated at any time.
                  </p>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    There is no guarantee that proposed amenities will be completed, or if completed, that they will reflect the depictions shown here.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.6}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Views</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    Any statements or depictions regarding views—current or future—are not guaranteed. Views may change with future development, landscaping, neighboring construction, or other factors outside the developer's control.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.7}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Photography & Lifestyle Imagery</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    Photographs may include stock images or represent lifestyle concepts intended for mood and marketing impact. They do not necessarily reflect actual conditions, people, or improvements within the project.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.8}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Errors & Omissions</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    This Website may contain inadvertent errors, inaccuracies, or outdated information. Developer reserves the right to correct, update, or modify content at any time without notice.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={1.0}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">No Legal, Financial, or Investment Advice</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    Information contained on this Website should not be interpreted as legal, tax, or investment advice. Prospective purchasers should consult their own advisors before entering into any transaction.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={1.1}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">For the Most Accurate Information</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    Please refer to your purchase contract, community documentation, and official offering materials, which take precedence over any information displayed on this Website.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-16 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
              <p className="font-light">&copy; 2024 Garage 30A. All rights reserved.</p>
              <div className="flex space-x-8 mt-4 md:mt-0">
                <Link href="/privacy-policy" className="hover:text-white transition-colors font-light">Privacy Policy</Link>
                <Link href="/disclosures" className="hover:text-white transition-colors font-light">Disclosures</Link>
                <Link href="/terms-of-service" className="hover:text-white transition-colors font-light">Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

