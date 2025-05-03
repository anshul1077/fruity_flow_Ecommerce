
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Logo and Description */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <span className="relative inline-flex h-8 w-8">
                <span className="h-full w-full rounded-full bg-fruity-red"></span>
                <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-fruity-green"></span>
              </span>
              <span className="text-2xl font-bold text-gradient">FruityFlow</span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
              Delivering the freshest fruits and vegetables right to your doorstep. 
              We source directly from local farms to ensure quality and sustainability.
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-fruity-green transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-fruity-green transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-fruity-green transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="mailto:info@fruityflow.com" className="text-gray-400 hover:text-fruity-green transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-fruity-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-600 dark:text-gray-400 hover:text-fruity-green transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/category/fruit" className="text-gray-600 dark:text-gray-400 hover:text-fruity-green transition-colors">
                  Fruits
                </Link>
              </li>
              <li>
                <Link to="/category/vegetable" className="text-gray-600 dark:text-gray-400 hover:text-fruity-green transition-colors">
                  Vegetables
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-fruity-green transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-fruity-green transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:text-fruity-green transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 dark:text-gray-400 hover:text-fruity-green transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 dark:text-gray-400 hover:text-fruity-green transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-fruity-green transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for seasonal updates and special offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-fruity-green"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-fruity-green text-white rounded-md hover:bg-fruity-lightGreen transition-colors btn-bounce"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} FruityFlow. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/terms" className="text-gray-600 dark:text-gray-400 text-sm hover:text-fruity-green transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-gray-600 dark:text-gray-400 text-sm hover:text-fruity-green transition-colors">
                Privacy Policy
              </Link>
              <Link to="/sitemap" className="text-gray-600 dark:text-gray-400 text-sm hover:text-fruity-green transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
