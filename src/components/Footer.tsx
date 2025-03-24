
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-start">
              <img 
                src="/lovable-uploads/d849df61-aa8c-4eff-b202-94645c6f1e46.png" 
                alt="KIIT Logo" 
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Helping the KIIT community reunite with their lost belongings through a simple, elegant platform.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-kiit-green transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-kiit-green transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-kiit-green transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-base mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-kiit-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/lost" className="text-gray-600 dark:text-gray-400 hover:text-kiit-green transition-colors">
                  Lost Items
                </Link>
              </li>
              <li>
                <Link to="/found" className="text-gray-600 dark:text-gray-400 hover:text-kiit-green transition-colors">
                  Found Items
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-gray-600 dark:text-gray-400 hover:text-kiit-green transition-colors">
                  Report Item
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-base mb-4">Help & Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-kiit-green transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-kiit-green transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-kiit-green transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-kiit-green transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-base mb-4">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-kiit-green mr-3 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">lostandfound@kiit.ac.in</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-kiit-green mr-3 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">+91 1234 567890</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-sm text-center text-gray-600 dark:text-gray-400">
          <p>© {year} KIIT Lost & Found. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
