import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import {Link} from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-linear-to-br from-slate-950 via-slate-900 to-gray-950 text-white pt-20 pb-10 border-t border-gray-800">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-4 mb-5">

          <div className="w-14 h-14 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-2xl shadow-lg">
            G
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">
                Grihita
            </h2>

            <p className="tracking-[5px] text-xs text-amber-400">
                PROPERTIES
            </p>
          </div>

          </div>

          <p className="tracking-[4px] text-sm text-gray-400 mb-6">
            PROPERTIES
          </p>

          <p className="text-gray-300 leading-7">
            Curated homes, commercial spaces, land &
            farmhouses across India. Every square foot
            brings you one step closer to your dream home.
          </p>

          <a
            href="https://wa.me/919953515274"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-gray-500 hover:bg-green-500 transition"
          >
            <FaWhatsapp size={22} />
          </a>
        </div>

        {/* Explore */}
        <div className="hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-xl font-semibold mb-6">
            Explore
          </h3>

          <ul className="space-y-3 text-gray-300">

            <li>
                <Link to="/" className="hover:text-amber-400 transition">
                Home
                </Link>
            </li>

            <li>
                <Link to="/" className="hover:text-amber-400 transition">
                Properties
                </Link>
            </li>

            <li>
                <Link to="/" className="hover:text-amber-400 transition">
                Cities
                </Link>
            </li>

            <li>
                <Link to="/login" className="hover:text-amber-400 transition">
                Login
                </Link>
            </li>

            <li>
                <Link to="/signup" className="hover:text-amber-400 transition">
                Sign Up
                </Link>
            </li>

            </ul>
        </div>

        {/* Categories */}
        <div className="hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-xl font-semibold mb-6">
            Categories
          </h3>

          <ul className="space-y-3 text-gray-300">
            <li>Residential</li>
            <li>Commercial</li>
            <li>Land</li>
            <li>Farmhouse</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="hover:-translate-y-1 transition-all duration-300">

          <h3 className="text-xl font-semibold mb-6">
            Contact
          </h3>

          <div className="space-y-5">

            <div className="flex gap-3">
              <FaPhoneAlt className="mt-1 text-amber-400" />
              <a
                href="tel:+919953515274"
                className="hover:text-amber-400"
              >
                +91 99535 15274
              </a>
            </div>

            <div className="flex gap-3">
              <FaEnvelope className="mt-1 text-amber-400" />
              <a
                href="mailto:contactgrihita@gmail.com"
                className="hover:text-amber-400"
              >
                contactgrihita@gmail.com
              </a>
            </div>

            <div className="flex gap-3">
              <FaWhatsapp className="mt-1 text-green-500" />
              <a
                href="https://wa.me/919953515274"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-400"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="flex gap-3">
              <FaMapMarkerAlt className="mt-1 text-red-400" />
              <span>
                India
              </span>
            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">

        © 2026 Grihita Properties. Crafted with ❤️ in India.

      </div>

    </footer>
  );
}

export default Footer;