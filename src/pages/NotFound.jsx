import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        {/* 404 Number */}
        <div className="text-8xl md:text-9xl font-black text-primary mb-4 tracking-tighter">
          404
        </div>
        
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-gray-900 dark:text-white">
          PAGE NOT FOUND
        </h1>
        
        {/* Description */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Sorry, we couldn't find the page you're looking for. 
          It might have been moved, deleted, or never existed.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="btn btn-primary btn-lg gap-2">
              <Home className="h-5 w-5" /> Back to Home
            </button>
          </Link>
          <Link href="/contact">
            <button className="btn btn-outline btn-lg gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
              Contact Support <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
        
        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Or try these pages:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/services">
              <span className="text-sm text-primary hover:underline cursor-pointer">Services</span>
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link href="/about">
              <span className="text-sm text-primary hover:underline cursor-pointer">About Us</span>
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link href="/contact">
              <span className="text-sm text-primary hover:underline cursor-pointer">Contact</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}