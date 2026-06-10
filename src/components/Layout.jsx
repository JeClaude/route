import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, ArrowRight, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/route-freight-logo.png";
import markLogo from "../assets/12-1.png";
import { useDarkMode } from "../context/DarkModeContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Layout({ children }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Top bar */}
      {/* <div className="hidden md:block bg-gray-900 dark:bg-black text-white text-xs">
        <div className="container mx-auto px-4 h-9 flex items-center justify-end gap-6">
          <a href="tel:+1-479-280-8795" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone className="h-3 w-3" /> +1 (479) 280-8795
          </a>
          <a href="mailto:gastonniyitegeka2017@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Mail className="h-3 w-3" /> gastonniyitegeka2017@gmail.com
          </a>
        </div>
      </div> */}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center shrink-0">
            <div className="bg-white dark:bg-[#111827] inline-block p-1 rounded-sm transition-colors duration-300">
              <img src={isDark ? markLogo : logo} alt="Route Freight" className="h-16 w-auto object-contain" />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right side buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <Link href="/contact" className="btn btn-primary gap-2">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Dark Mode Toggle Button for Mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] overflow-hidden"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`py-3 text-base font-semibold border-b border-gray-100 dark:border-gray-800 ${
                      location === link.href ? "text-primary" : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/contact" onClick={() => setMenuOpen(false)}>
                  <button className="btn btn-primary w-full mt-4">Contact Us</button>
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page content */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-[#111827] text-white py-12 md:py-16 transition-colors duration-300">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className=" dark:bg-[#111827] inline-block p-3 rounded-sm mb-5">
              <img src={markLogo} alt="Route Freight" className="h-20 w-auto object-contain" />
            </div>
            <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
              A dedicated freight and logistics partner. We move full truckload, refrigerated, flatbed,
              and specialized cargo across North America.
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <a href="tel:+1-479-280-8795" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary" /> +1 (479) 280-8795
              </a>
              <a href="mailto:gastonniyitegeka2017@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary" /> gastonniyitegeka2017@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-sm mb-4">Services</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-400">
              {["Full Truckload", "LTL", "Refrigerated", "Flatbed", "Specialized"].map((s) => (
                <li key={s}>
                  <Link href={`/services/${s.toLowerCase().replace(/ /g, "-")}`} className="hover:text-primary transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-sm mb-4">Company</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">All Services</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Route Freight. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}