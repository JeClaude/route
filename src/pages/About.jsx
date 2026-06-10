import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { api } from "../lib/api";
import { fadeIn } from "../lib/animations";
import intermodalImage from "../assets/intermodal-port.png";

export default function About() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.getStats().then(setStats).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <section className="pt-24 pb-16 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-gray-900 dark:text-white">
              WE BUILD THE<br />
              <span className="text-primary">INFRASTRUCTURE</span><br />
              OF COMMERCE.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <p className="text-xl text-gray-700 dark:text-gray-200 font-medium leading-relaxed mb-6">
                Route Freight is a new, independent freight brokerage built by people who understand the road —
                not just the spreadsheet.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                We started because we saw a gap: big brokerages that treat shippers like ticket numbers,
                and carriers that can't scale. We sit right in the middle — the personal attention of a
                small shop with the tools and network of a modern logistics company.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                Every load we move is handled by a dispatcher who knows your name, your freight, and your
                timeline. No call centers. No confusion. Just execution.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We're new — and we're hungry to earn your business on every single shipment.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="aspect-[4/3] rounded-sm overflow-hidden border border-gray-200 dark:border-gray-700">
                <img src={intermodalImage} alt="Intermodal shipping port" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: (stats?.yearsInBusiness ?? 1) + "+", label: "Years Active" },
              { value: stats?.carriersInNetwork ? (stats.carriersInNetwork / 100).toFixed(0) + "+" : "500+", label: "Vetted Carriers" },
              { value: (stats?.onTimeRate ?? 98) + "%", label: "On-Time Rate" },
              { value: "24/7", label: "Dispatch Support" },
            ].map((s, i) => (
              <div key={i} className="card p-8 text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="text-4xl md:text-5xl font-black tracking-tighter mb-2 text-gray-900 dark:text-white">{s.value}</div>
                <div className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-5 text-gray-900 dark:text-white">Partner with Route Freight</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
            Stop worrying about capacity, visibility, and execution. Let us handle the heavy lifting.
          </p>
          <Link href="/contact">
            <button className="btn btn-primary btn-lg gap-2">Contact Us</button>
          </Link>
        </div>
      </section>
    </div>
  );
}