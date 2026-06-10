import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { api } from "../lib/api";
import { fadeIn, staggerContainer } from "../lib/animations";
import { getServiceImage } from "../lib/serviceImages";
import flatbedImage from "../assets/flatbed-cargo.png";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getServices()
      .then(setServices)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <section className="pt-24 pb-16 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden">
        {/* Background image with REDUCED opacity - changed from 15% to 8% */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-17 pointer-events-none">
          <img src={flatbedImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-50 dark:to-gray-800" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-3xl">
            <div className="section-label">What we offer</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none text-gray-900 dark:text-white">
              OUR CAPABILITIES
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Comprehensive transportation solutions tailored to your freight. From standard LTL to complex
              oversized loads — every truck pictured is a service we run.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service cards */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-sm border border-gray-200 dark:border-gray-700" />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {services.map((service) => (
                <motion.div key={service.id} variants={fadeIn} className="h-full">
                  <Link href={`/services/${service.slug}`} className="block h-full">
                    <div className="h-full card hover:border-primary/50 transition-colors group flex flex-col overflow-hidden hover:shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <div className="aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
                        <img
                          src={getServiceImage(service.slug)}
                          alt={service.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 dark:from-black/20 to-transparent pointer-events-none" />
                        <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-sm">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                            {service.slug.replace(/-/g, " ")}
                          </span>
                        </div>
                      </div>

                      <div className="p-7 flex flex-col flex-1">
                        <h3 className="text-2xl font-black mb-1 tracking-tight group-hover:text-primary transition-colors text-gray-900 dark:text-white">{service.name}</h3>
                        <div className="font-mono text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">{service.tagline}</div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">{service.description}</p>

                        <ul className="space-y-1.5 mb-6 text-sm text-gray-600 dark:text-gray-400">
                          {service.features.slice(0, 3).map((f, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mt-2 shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-gray-700 dark:text-gray-400 group-hover:text-primary transition-colors">
                          View Service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}