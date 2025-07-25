import React from 'react';
import { Languages, Home, BarChart3, Info, Mail, Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  currentPage: 'home' | 'dashboard';
  onPageChange: (page: 'home' | 'dashboard') => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="text-white font-bold text-xl animate-pulse-soft">EXHAIR</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <button
              onClick={() => onPageChange('home')}
              className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                currentPage === 'home'
                  ? 'text-blue-600 bg-blue-50 shadow-md'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{t('nav.home')}</span>
            </button>
            
            <button
              onClick={() => onPageChange('dashboard')}
              className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                currentPage === 'dashboard'
                  ? 'text-blue-600 bg-blue-50 shadow-md'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>{t('nav.dashboard')}</span>
            </button>
            
            <a href="#contact" className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105">
              <Mail className="w-4 h-4" />
              <span>{t('nav.contact')}</span>
            </a>
          </nav>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-100 hover:to-green-100 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
            >
              <Languages className="w-4 h-4" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2 animate-fade-in">
            <button
              onClick={() => {
                onPageChange('home');
                setIsMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{t('nav.home')}</span>
            </button>
            
            <button
              onClick={() => {
                onPageChange('dashboard');
                setIsMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'dashboard'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>{t('nav.dashboard')}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;