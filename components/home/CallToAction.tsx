import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function CallToAction() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image 
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80" 
          alt="Happy diverse team" 
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/80"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-black mb-6 leading-tight">
            Start Paying Your Global Team{' '}
            <span className="text-gradient">in Minutes</span>
          </h2>

          <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
            Join thousands of companies who've eliminated payroll stress with GoPay. 
            Set up your first international payroll run today.
          </p>

          {/* Benefits List */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center justify-center sm:justify-start">
              <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={20} />
              <span className="text-gray-700">14-day free trial</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start">
              <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={20} />
              <span className="text-gray-700">No setup fees</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start">
              <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={20} />
              <span className="text-gray-700">Cancel anytime</span>
            </div>
          </div>

          {/* Email Signup Form */}
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="flex-1 px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
              <button
                type="submit"
                disabled={isSubmitted}
                className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center group disabled:opacity-50"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="mr-2" size={20} />
                    Sent!
                  </>
                ) : (
                  <>
                    Get Demo
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Alternative CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-black hover:text-black transition-all duration-300">
              Schedule a Call
            </button>
            <span className="text-gray-400">or</span>
            <button className="text-black font-semibold hover:underline">
              Explore Features First →
            </button>
          </div>

          {/* Social Proof */}
          <div className="text-center text-gray-600">
            <p className="mb-4">Trusted by 200+ companies worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <span className="font-semibold">TechFlow</span>
              <span className="font-semibold">GlobalDynamics</span>
              <span className="font-semibold">RemoteFirst</span>
              <span className="font-semibold">ScaleUp</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-black/5 rounded-full animate-float hidden lg:block"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-black/5 rounded-full animate-float hidden lg:block" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-black/5 rounded-full animate-float hidden lg:block" style={{ animationDelay: '4s' }}></div>
    </section>
  );
}