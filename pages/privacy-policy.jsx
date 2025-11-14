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

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Garage 30A</title>
        <meta name="description" content="Privacy policy for Garage 30A" />
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

        {/* Privacy Policy Section */}
        <section className="pt-32 pb-32 bg-black">
          <div className="max-w-4xl mx-auto px-6">
            <SectionReveal className="mb-16">
              <h1 className="text-4xl md:text-6xl font-thin mb-8 text-white">Privacy Policy</h1>
              <p className="text-xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed mb-4">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-lg text-white/70 max-w-4xl mx-auto font-light leading-relaxed mb-12">
                Garage 30A ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our services.
              </p>
            </SectionReveal>

            <div className="space-y-12">
              <SectionReveal delay={0.1}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Information We Collect</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed mb-4">
                    We may collect information that you provide directly to us, including:
                  </p>
                  <ul className="text-lg text-white/70 font-light leading-relaxed space-y-2 ml-6 list-disc">
                    <li>Name, email address, phone number, and mailing address</li>
                    <li>Information you provide when contacting us or requesting information</li>
                    <li>Information submitted through forms on our website</li>
                    <li>Any other information you choose to provide</li>
                  </ul>
                  <p className="text-lg text-white/70 font-light leading-relaxed mt-4">
                    We also automatically collect certain information when you visit our website, such as your IP address, browser type, device information, and usage patterns through cookies and similar tracking technologies.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">How We Use Your Information</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="text-lg text-white/70 font-light leading-relaxed space-y-2 ml-6 list-disc">
                    <li>Respond to your inquiries and provide customer service</li>
                    <li>Send you information about our properties, services, and promotions</li>
                    <li>Improve our website and services</li>
                    <li>Analyze website usage and trends</li>
                    <li>Comply with legal obligations and protect our rights</li>
                  </ul>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.3}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Information Sharing and Disclosure</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed mb-4">
                    We do not sell your personal information. We may share your information in the following circumstances:
                  </p>
                  <ul className="text-lg text-white/70 font-light leading-relaxed space-y-2 ml-6 list-disc">
                    <li>With service providers who assist us in operating our website and conducting our business</li>
                    <li>When required by law or to respond to legal process</li>
                    <li>To protect our rights, property, or safety, or that of our users or others</li>
                    <li>In connection with a business transfer, such as a merger or acquisition</li>
                    <li>With your consent or at your direction</li>
                  </ul>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.4}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Cookies and Tracking Technologies</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed mb-4">
                    We use cookies and similar tracking technologies to collect and use information about your interaction with our website. Cookies are small data files stored on your device that help us improve your experience.
                  </p>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our website.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.5}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Data Security</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.6}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Your Rights and Choices</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed mb-4">
                    Depending on your location, you may have certain rights regarding your personal information, including:
                  </p>
                  <ul className="text-lg text-white/70 font-light leading-relaxed space-y-2 ml-6 list-disc">
                    <li>The right to access and receive a copy of your personal information</li>
                    <li>The right to rectify inaccurate or incomplete information</li>
                    <li>The right to request deletion of your personal information</li>
                    <li>The right to object to or restrict certain processing activities</li>
                    <li>The right to data portability</li>
                    <li>The right to opt-out of marketing communications</li>
                  </ul>
                  <p className="text-lg text-white/70 font-light leading-relaxed mt-4">
                    To exercise these rights, please contact us using the information provided below.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.7}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Third-Party Links</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.8}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Children's Privacy</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    Our website is not intended for children under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.9}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Changes to This Privacy Policy</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our website after such changes constitutes your acceptance of the updated Privacy Policy.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={1.0}>
                <div className="border-t border-white/10 pt-8">
                  <h2 className="text-2xl font-light mb-6 text-white">Contact Us</h2>
                  <p className="text-lg text-white/70 font-light leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our privacy practices, please contact us:
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

