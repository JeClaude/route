import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { api } from "../lib/api";
import { fadeIn } from "../lib/animations";
import { getServiceImage } from "../lib/serviceImages";

export default function ServiceDetail() {
  const [, params] = useRoute("/services/:slug");
  const slug = params?.slug;

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getServices()
      .then(setServices)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const service = services.find((s) => s.slug === slug);
  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400 dark:text-gray-500 font-mono uppercase tracking-widest text-sm bg-white dark:bg-gray-900">
        Loading…
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-gray-900">
        <h2 className="text-4xl font-black mb-4 text-gray-900 dark:text-white">Service Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">The service you're looking for doesn't exist.</p>
        <Link href="/services">
          <button className="btn btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">Back to Services</button>
        </Link>
      </div>
    );
  }

  const heroImage = getServiceImage(service.slug);

  return (
    <div className="flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero with background truck image */}
      <section className="relative pt-24 pb-20 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt={service.name} className="w-full h-full object-cover opacity-31 dark:opacity-17" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 dark:from-gray-800 via-gray-50/90 dark:via-gray-800/90 to-gray-50/50 dark:to-gray-800/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-3xl">
            <Link href="/services" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-400 dark:text-gray-500 hover:text-primary transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" /> Back to Services
            </Link>
            <div className="section-label">Service · {service.slug.replace(/-/g, " ")}</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4 text-gray-900 dark:text-white">{service.name}</h1>
            <div className="font-mono text-base text-primary uppercase tracking-widest mb-6">{service.tagline}</div>
            <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">{service.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Full-width image strip */}
      <section className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 -mt-12 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="aspect-[21/9] overflow-hidden rounded-sm bg-gray-100 dark:bg-gray-800"
          >
            <img src={heroImage} alt={service.name} className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Features + sidebar */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Features grid */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-black mb-8 tracking-tight text-gray-900 dark:text-white">Key Features &amp; Capabilities</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-4 p-5 card bg-white dark:bg-gray-800 rounded-sm"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar CTA */}
            <aside>
              <div className="card p-8 lg:sticky lg:top-28 bg-white dark:bg-gray-800 rounded-lg">
                <div className="section-label">Move it with us</div>
                <h3 className="text-2xl font-black mb-3 tracking-tight text-gray-900 dark:text-white">Ready to move?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                  Contact our dispatch team for a precise quote on your{" "}
                  {service.name.toLowerCase()} shipment.
                </p>
                <Link href="/contact">
                  <button className="btn btn-primary w-full mb-3 gap-2">
                    Contact Us <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="btn btn-outline w-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">Talk to Dispatch</button>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Other services */}
      {others.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-10 text-gray-900 dark:text-white">Also in our fleet</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((other) => (
                <Link key={other.id} href={`/services/${other.slug}`} className="block group">
                  <div className="card overflow-hidden transition-colors bg-white dark:bg-gray-900 rounded-sm hover:shadow-md">
                    <div className="aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={getServiceImage(other.slug)}
                        alt={other.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-black text-xl tracking-tight group-hover:text-primary transition-colors text-gray-900 dark:text-white">{other.name}</h3>
                      <div className="font-mono text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 mt-1">{other.tagline}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}