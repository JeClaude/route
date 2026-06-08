import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { api } from "../lib/api";
import { fadeIn } from "../lib/animations";

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function validate(form) {
  const errors = {};
  if (!form.name || form.name.length < 2) errors.name = "Name is required.";
  if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errors.email = "Valid email is required.";
  if (!form.message || form.message.length < 5) errors.message = "Message must be at least 5 characters.";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus("loading");
    try {
      await api.submitContact(form);
      setStatus("success");
      setForm({ name: "", email: "", company: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <section className="pt-24 pb-10 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-4 text-gray-900 dark:text-white">
              CONTACT DISPATCH
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              General inquiries, partnership opportunities, or freight coordination. We respond within one business day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800 flex-1 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="card p-8 bg-white dark:bg-gray-900 rounded-sm">
                <h3 className="font-black text-xl mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">Headquarters</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">Route Freight LLC</div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">100 Logistics Way<br />Chicago, IL 60601</div>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-primary shrink-0" />
                    <a href="tel:+1 (479) 280-8795" className="font-bold hover:text-primary transition-colors text-gray-900 dark:text-white">+1 (479) 280-8795</a>
                  </li>
                  <li className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-primary shrink-0" />
                    <a href="mailto:gastonniyitegeka2017@gmail.com" className="font-bold hover:text-primary transition-colors text-sm text-gray-900 dark:text-white">
                      gastonniyitegeka2017@gmail.com
                    </a>
                  </li>
                  <li className="flex items-start gap-4">
                    <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">Dispatch: 24/7/365</div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">Corporate: Mon–Fri 8am–6pm CST</div>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="card p-8 bg-white dark:bg-gray-900 rounded-sm">
                {status === "success" ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <CheckCircle2 className="h-16 w-16 text-primary mb-6" />
                    <h3 className="text-3xl font-black mb-3 text-gray-900 dark:text-white">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                      Thank you for contacting Route Freight. Our team will get back to you shortly.
                    </p>
                    <button onClick={() => setStatus("idle")} className="btn btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Field label="Full Name *" error={errors.name}>
                        <input 
                          name="name" 
                          value={form.name} 
                          onChange={handleChange}
                          placeholder="John Doe" 
                          className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500" 
                        />
                      </Field>
                      <Field label="Email Address *" error={errors.email}>
                        <input 
                          name="email" 
                          type="email" 
                          value={form.email} 
                          onChange={handleChange}
                          placeholder="john@company.com" 
                          className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500" 
                        />
                      </Field>
                      <Field label="Company">
                        <input 
                          name="company" 
                          value={form.company} 
                          onChange={handleChange}
                          placeholder="Acme Inc." 
                          className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500" 
                        />
                      </Field>
                      <Field label="Phone Number">
                        <input 
                          name="phone" 
                          value={form.phone} 
                          onChange={handleChange}
                          placeholder="(555) 123-4567" 
                          className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500" 
                        />
                      </Field>
                    </div>

                    <Field label="Subject">
                      <input 
                        name="subject" 
                        value={form.subject} 
                        onChange={handleChange}
                        placeholder="How can we help?" 
                        className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500" 
                      />
                    </Field>

                    <Field label="Message *" error={errors.message}>
                      <textarea 
                        name="message" 
                        value={form.message} 
                        onChange={handleChange}
                        placeholder="Tell us about your freight needs..."
                        rows={5} 
                        className="input-field resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500" 
                      />
                    </Field>

                    {status === "error" && (
                      <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
                    )}

                    <button 
                      type="submit" 
                      disabled={status === "loading"}
                      className="btn btn-primary btn-lg w-full gap-2 disabled:opacity-60"
                    >
                      {status === "loading" ? (
                        <><Loader2 className="h-5 w-5 animate-spin" /> Sending…</>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}