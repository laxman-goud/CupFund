import React from "react";
import Link from "next/link";

const Footer = () => {
  // Get the current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800">
      {/* Main footer container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* =========================== */}
        {/*       LEFT: BRANDING        */}
        {/* =========================== */}
        <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
          
          {/* Brand name */}
          <h2 className="text-lg font-semibold text-white">☕ CupFund</h2>

          {/* Short description */}
          <p className="text-sm text-gray-400">
            Support your favorite creators, one chai at a time!
          </p>

          {/* Copyright */}
          <p className="text-xs text-gray-500">
            © {currentYear} CupFund. All rights reserved.
          </p>

          {/* Creator note */}
          <p className="text-xs text-gray-500">Made with ❤️ by Laxman</p>
        </div>

        {/* =========================== */}
        {/*       RIGHT: QUICK LINKS    */}
        {/* =========================== */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          
          {/* Section title */}
          <h3 className="text-sm font-semibold text-white mb-3">Quick Links</h3>

          {/* Navigation links */}
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>

            <li>
              <Link href="/privacy-policy" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link href="/terms&conditions" className="hover:text-white transition">
                Terms & Conditions
              </Link>
            </li>

            <li>
              <Link href="/cancellation&refund" className="hover:text-white transition">
                Cancellation & Refund
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
