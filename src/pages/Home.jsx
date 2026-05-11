import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Phone, Mail, MapPin } from "lucide-react";
import { api } from "../lib/api";
import { fadeIn, staggerContainer, slideInLeft, slideInRight } from "../lib/animations";
import { getServiceImage } from "../lib/serviceImages";
import heroImage from "../assets/hero-truck.png";

export default function Home() {
  const [stats, setStats] = useState(null);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    api.getStats().then(setStats).catch(console.error);
    api.getServices().then(setServices).catch(console.error);
    api.getTestimonials().then(setTestimonials).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left — copy */}
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="order-2 lg:order-1">
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-full mb-5">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-primary font-mono text-xs uppercase tracking-widest">New · Independent · Hungry</span>
              </motion.div>

              <motion.h1 variants={fadeIn} className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-5 leading-none text-gray-900 dark:text-white">
                FREIGHT,<br />
                <span className="text-primary">DONE RIGHT.</span>
              </motion.h1>

              <motion.p variants={fadeIn} className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-8 leading-relaxed">
                Route Freight is a small, dedicated team moving truckload, refrigerated, flatbed and specialized cargo across North America.
                Honest pricing. Real people on the phone. Every shipment treated like our first.
              </motion.p>

              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact">
                  <button className="btn btn-primary btn-lg w-full sm:w-auto gap-2">
                    Contact Us <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
                <Link href="/services">
                  <button className="btn btn-outline btn-lg w-full sm:w-auto dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                    Our Services
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — truck image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="aspect-[4/3] rounded-sm overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 relative">
                <img src={heroImage} alt="Semi truck on highway" className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3 bg-gray-900 dark:bg-black text-white px-3 py-1.5 rounded-sm font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  Dispatch Active 24/7
                </div>
              </div>
              <div className="hidden sm:block absolute -bottom-3 -right-3 w-20 h-20 bg-primary -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="py-12 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: (stats?.yearsInBusiness ?? 1) + "+", label: "Years Active" },
              { value: stats?.statesServed ?? 48, label: "States Covered" },
              { value: (stats?.onTimeRate ?? 98) + "%", label: "On-Time Pickups" },
              { value: "24/7", label: "Dispatch" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black tracking-tighter mb-1 text-gray-900 dark:text-white">{s.value}</div>
                <div className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
              <div className="section-label">What we move</div>
              <h2 className="section-title dark:text-white">CAPABILITIES</h2>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
              <Link href="/services">
                <button className="btn btn-outline gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  View All Services <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.slice(0, 6).map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link href={`/services/${service.slug}`} className="block h-full">
                  <div className="h-full card hover:border-primary transition-colors group flex flex-col overflow-hidden hover:shadow-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                    <div className="aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
                      <img
                        src={getServiceImage(service.slug)}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-sm">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                          {service.slug.replace(/-/g, " ")}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-black mb-2 tracking-tight group-hover:text-primary transition-colors text-gray-900 dark:text-white">{service.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex-1 line-clamp-3 mb-4">{service.description}</p>
                      <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-gray-700 dark:text-gray-400 group-hover:text-primary transition-colors mt-auto">
                        Details <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 border-y border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-12">
            <div className="section-label">Why Route Freight</div>
            <h2 className="section-title mb-4 dark:text-white">
              SMALL ENOUGH TO CARE.<br />
              <span className="text-primary">BIG ENOUGH TO DELIVER.</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We're new — and that's our advantage. Every customer matters, every load gets attention,
              and you talk to a real dispatcher every time you call.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { Icon: ShieldCheck, title: "Vetted Carriers", text: "Every carrier is checked for insurance, safety scores, and on-time history before they touch your freight." },
              { Icon: Phone, title: "Real People", text: "No phone trees. When you call, you talk to the same dispatcher who is actually managing your load." },
              { Icon: MapPin, title: "Honest Pricing", text: "Transparent rates with no hidden fees. We give you the number — and we stick to it." },
            ].map(({ Icon, title, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-sm flex items-center justify-center mb-5">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-black text-xl mb-3 tracking-tight text-gray-900 dark:text-white">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <div className="section-label">What shippers say</div>
              <h2 className="section-title dark:text-white">EARLY CUSTOMERS,<br />HONEST FEEDBACK.</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.slice(0, 3).map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card p-8 relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                >
                  <div className="text-primary text-6xl font-serif absolute top-2 left-5 opacity-20 leading-none">"</div>
                  <div className="flex mb-4 text-primary">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-base font-medium mb-5 relative z-10 text-gray-700 dark:text-gray-300">"{t.quote}"</p>
                  <div>
                    <div className="font-black uppercase tracking-wider text-sm text-gray-900 dark:text-white">{t.author}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}, {t.company}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="bg-primary overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_55%)]" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="font-mono text-xs uppercase tracking-widest text-white/70 mb-3">Let's move it</div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-5">
                READY TO SHIP?<br />
                <span className="opacity-90">CONTACT US.</span>
              </h2>
              <p className="text-lg text-white/90">
                Tell us about your lane, your freight, or your timeline. We'll respond within hours with a real plan and a real number.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-white dark:bg-gray-900 rounded-sm p-8 shadow-2xl border border-gray-200 dark:border-gray-700"
            >
              <div className="font-mono text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-5">Reach Dispatch</div>
              <a href="tel:+1 (479) 280-8795" className="flex items-center gap-3 mb-3 group">
                <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-sm flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500">Phone</div>
                  <div className="font-black group-hover:text-primary transition-colors text-gray-900 dark:text-white">+1 (479) 280-8795</div>
                </div>
              </a>
              <a href="mailto:gastonniyitegeka2017@gmail.com" className="flex items-center gap-3 mb-6 group">
                <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-sm flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500">Email</div>
                  <div className="font-black group-hover:text-primary transition-colors text-sm truncate text-gray-900 dark:text-white">gastonniyitegeka2017@gmail.com</div>
                </div>
              </a>
              <Link href="/contact">
                <button className="btn btn-primary w-full gap-2">
                  Contact Us <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}