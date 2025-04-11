import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white shadow-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-blue-500 mr-2">◆</span>FinanceAdvisor
            </h3>
            <p className="text-gray-600 text-sm">
              Empowering your financial journey with smart tools and insights.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/landing-page/dashboard" className="text-gray-600 hover:text-blue-500 text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/landing-page/budget" className="text-gray-600 hover:text-blue-500 text-sm">
                  Budget
                </Link>
              </li>
              <li>
                <Link to="/landing-page/debts" className="text-gray-600 hover:text-blue-500 text-sm">
                  Debts
                </Link>
              </li>
              <li>
                <Link to="/landing-page/news" className="text-gray-600 hover:text-blue-500 text-sm">
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-500 text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-500 text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-500 text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-500 text-sm">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-600 hover:text-blue-500">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500">
                <FaTwitter size={20} />
              </a>
            </div>
            <p className="text-sm text-gray-600">
              Email: support@financeadvisor.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © {currentYear} FinanceAdvisor. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-600 hover:text-blue-500">
              Privacy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-blue-500">
              Terms
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-blue-500">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;