import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Section - Branding */}
        <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
          <h2 className="text-lg font-semibold text-white">☕ CupFund</h2>
          <p className="text-sm text-gray-400">
            Support your favorite creators, one chai at a time!
          </p>
          <p className="text-xs text-gray-500">
            © {currentYear} CupFund. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">Made with ❤️ by Laxman</p>
        </div>

        {/* Right Section - Quick Links */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <h3 className="text-sm font-semibold text-white mb-3">Quick Links</h3>
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
