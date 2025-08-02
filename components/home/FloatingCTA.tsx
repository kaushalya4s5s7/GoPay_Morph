import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating CTA after scrolling 50vh
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded form */}
      {isExpanded && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 mb-4 w-80 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-black">Book a Demo</h3>
            <button 
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            See how GoPay can streamline your global payroll in 15 minutes.
          </p>
          
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <input
              type="email"
              placeholder="Work email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Company name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <button 
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              Schedule Demo
            </button>
          </form>
          
          <div className="text-xs text-gray-500 mt-3 text-center">
            No spam. Unsubscribe anytime.
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 flex items-center ${
          isExpanded ? 'w-12 h-12' : 'w-auto h-12 px-4'
        }`}
      >
        <MessageCircle size={20} className="flex-shrink-0" />
        {!isExpanded && (
          <span className="ml-2 font-semibold whitespace-nowrap">Book Demo</span>
        )}
      </button>
      
      {/* Notification dot */}
      {!isExpanded && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      )}
    </div>
  );
}
