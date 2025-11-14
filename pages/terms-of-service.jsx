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

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service — Garage 30A</title>
        <meta name="description" content="Terms of service for Garage 30A" />
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

        {/* Terms of Service Section */}
        <section className="pt-32 pb-32 bg-black">
          <div className="max-w-4xl mx-auto px-6">
            <SectionReveal className="mb-16">
              <h1 className="text-4xl md:text-6xl font-thin mb-8 text-white">Terms of Service</h1>
              <p className="text-xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed mb-4">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-lg text-white/70 max-w-4xl mx-auto font-light leading-relaxed mb-12">
                Please read these Terms of Service ("Terms") carefully before using the Garage 30A website. By accessing or using our website, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our website.
              </p>
            </SectionReveal>

            <div className="space-y-12">
              <SectionReveal delay={0.1}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Acceptance of Terms</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Use License</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed mb-4">
                    Permission is granted to temporarily access the materials on Garage 30A's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="text-lg text-white/70 font-light leading-relaxed space-y-2 ml-6 list-disc">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                    <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                  </ul>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.3}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Disclaimer</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed mb-4">
                    The materials on Garage 30A's website are provided on an 'as is' basis. Garage 30A makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    Further, Garage 30A does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.4}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Limitations</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    In no event shall Garage 30A or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Garage 30A's website, even if Garage 30A or a Garage 30A authorized representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.5}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Accuracy of Materials</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    The materials appearing on Garage 30A's website could include technical, typographical, or photographic errors. Garage 30A does not warrant that any of the materials on its website are accurate, complete, or current. Garage 30A may make changes to the materials contained on its website at any time without notice.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.6}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Links</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed mb-4">
                    Garage 30A has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Garage 30A of the site. Use of any such linked website is at the user's own risk.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.7}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Modifications</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    Garage 30A may revise these Terms of Service at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Service.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.8}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Governing Law</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    These terms and conditions are governed by and construed in accordance with the laws of the State of Florida and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.9}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">User Conduct</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed mb-4">
                    You agree not to use the website to:
                  </p>
                  <ul className="text-lg text-white/70 font-light leading-relaxed space-y-2 ml-6 list-disc">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe upon the rights of others</li>
                    <li>Transmit any harmful, offensive, or inappropriate content</li>
                    <li>Interfere with or disrupt the website or servers</li>
                    <li>Attempt to gain unauthorized access to any portion of the website</li>
                  </ul>
                </div>
              </SectionReveal>

              <SectionReveal delay={1.0}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Intellectual Property</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    All content, features, and functionality of the website, including but not limited to text, graphics, logos, images, and software, are the property of Garage 30A or its content suppliers and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property laws.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={1.1}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Termination</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    We reserve the right to terminate or suspend your access to our website immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the website will immediately cease.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={1.2}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Contact Information</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    Garage 30A<br />
                    5283 Hwy 98 E<br />
                    Santa Rosa Beach, FL 32459<br />
                    Email: info@garage30a.com<br />
                    Phone: (214) 991-6966
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

