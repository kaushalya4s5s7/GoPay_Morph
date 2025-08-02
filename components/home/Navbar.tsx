import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
      const service = { path: "/pages/auth?mode=payroll" };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm text-black' : 'bg-transparent '
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <Image 
                src="/GoPay-removebg-preview.png" 
                alt="GoPay Logo" 
                width={32} 
                height={32}
                className="w-8 h-8"
              />
              <div className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-black' : 'text-white'
              }`}>GoPay</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className={`transition-colors duration-300 hover:opacity-75 ${
              isScrolled ? 'text-black' : 'text-white'
            }`}>Features</a>
            <a href="#pricing" className={`transition-colors duration-300 hover:opacity-75 ${
              isScrolled ? 'text-black' : 'text-white'
            }`}>Pricing</a>
            <a href="#security" className={`transition-colors duration-300 hover:opacity-75 ${
              isScrolled ? 'text-black' : 'text-white'
            }`}>Security</a>
            <a href="#contact" className={`transition-colors duration-300 hover:opacity-75 ${
              isScrolled ? 'text-black' : 'text-white'
            }`}>Contact</a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button className={`transition-colors duration-300 hover:opacity-75 ${
              isScrolled ? 'text-black' : 'text-white'
            }`}>Sign In</button>
           <LiquidButton
                    onClick={() => router.push(service.path)}
                    style={{ animationDelay: '1.8s' }}
                    className={`transition-colors duration-300 ${
                      isScrolled ? 'text-black' : 'text-white'
                    }`}
                >
                    Get's Started
                </LiquidButton>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-colors duration-300 hover:opacity-75 ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-black">Features</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-black">Pricing</a>
              <a href="#security" className="block px-3 py-2 text-gray-700 hover:text-black">Security</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-black">Contact</a>
              <div className="px-3 py-2">
                <button className="w-full bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  Get Started Free
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
