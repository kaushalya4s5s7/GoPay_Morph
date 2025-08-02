'use client';

import { ArrowRight, Shield, Zap } from 'lucide-react';
import { Globe } from '@/components/magicui/globe';



export default function Hero() {
  return (
    <>
      <style jsx>{`
        @keyframes flow {
          0% { transform: translateY(100%) scaleY(1); opacity: 0; }
          50% { transform: translateY(0%) scaleY(1.2); opacity: 0.8; }
          100% { transform: translateY(-100%) scaleY(1); opacity: 0; }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes cornerGlow {
          0%, 100% { 
            opacity: 0.5; 
            transform: scale(0.95);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.05);
          }
        }
        .bg-aurora {
          background: radial-gradient(ellipse 300px 800px at center, 
            rgba(6, 182, 212, 0.15) 0%, 
            rgba(8, 145, 178, 0.1) 40%, 
            rgba(12, 74, 110, 0.05) 70%, 
            transparent 100%);
        }
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
        .bg-noise {
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.02) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 40px 40px, 60px 60px;
        }
        .text-glow {
          text-shadow: 0 0 30px rgba(6, 182, 212, 0.3);
        }
        .flow-line {
          animation: flow 6s ease-in-out infinite;
        }
        .flow-line:nth-child(1) { animation-delay: 0s; }
        .flow-line:nth-child(2) { animation-delay: 1s; }
        .flow-line:nth-child(3) { animation-delay: 2s; }
        .flow-line:nth-child(4) { animation-delay: 3s; }
        .flow-line:nth-child(5) { animation-delay: 4s; }
        .corner-light {
          animation: cornerGlow 4s ease-in-out infinite;
          pointer-events: none;
          will-change: opacity, transform;
          mix-blend-mode: screen;
        }
      `}</style>

      <section className="relative min-h-screen flex flex-col items-center justify-center bg-black  grid-pattern overflow-hidden">
        {/* Dynamic Background Effects */}
        <div className="absolute inset-0 z-10">
          {/* Simple Uniform Corner Lights - No Animation */}
          <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/40 via-cyan-500/20 via-cyan-400/10 to-transparent blur-3xl z-10"></div>

          {/* Inner Corner Glow - Uniform */}
          
          {/* Bright Corner Accent Lights - Uniform */}
        </div>
        
        {/* Background Effects Layer */}
        <div className="absolute inset-0 z-0">
          {/* Central aurora light column */}
          <div className="absolute left-1/2 top-0 bottom-0 w-80 transform -translate-x-1/2 bg-aurora"></div>
          
          {/* Vertical data flow streaks */}
          <div className="absolute left-1/2 top-0 bottom-0 w-80 transform -translate-x-1/2 bg-gradient-to-b from-transparent to-black/30"></div>

          {/* Subtle noise texture overlay */}
       
          
          {/* Edge vignette for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col justify-center min-h-screen">
          
          {/* Top Content Section */}
         

          {/* Globe Section with Overlaid Text */}
          <div className="relative z-30 flex justify-center mb-4">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[26rem] xl:h-[26rem] 2xl:w-[28rem] 2xl:h-[28rem] mx-auto">
              {/* Enhanced glow effect around globe */}
              
              {/* Globe wrapper */}
              <div className="absolute inset-0 z-10">
                <Globe 
                  className="w-full h-full"
                  config={{
                    width: 1400,
                    height: 1400,
                    onRender: () => {},
                    devicePixelRatio: 2,
                    phi: 0,
                    theta: 0.3,
                    dark: 1,
                    diffuse: 0.6,
                    mapSamples: 16000,
                    mapBrightness: 0.6,
                    baseColor: [0.8, 0.8, 0.8],
                    markerColor: [6 / 255, 182 / 255, 212 / 255],
                    glowColor: [0.4, 0.4, 0.4],
                    markers: [
                      { location: [14.5995, 120.9842], size: 0.03 },
                      { location: [19.076, 72.8777], size: 0.1 },
                      { location: [23.8103, 90.4125], size: 0.05 },
                      { location: [30.0444, 31.2357], size: 0.07 },
                      { location: [39.9042, 116.4074], size: 0.08 },
                      { location: [-23.5505, -46.6333], size: 0.1 },
                      { location: [19.4326, -99.1332], size: 0.1 },
                      { location: [40.7128, -74.006], size: 0.1 },
                      { location: [34.6937, 135.5022], size: 0.05 },
                      { location: [41.0082, 28.9784], size: 0.06 },
                    ],
                  }}
                />
              </div>
              
              {/* Main Headlines Overlaid on Globe */}
              <div className="absolute inset-0 flex flex-col mt-4 items-center justify-center z-40 pointer-events-none">
                <div className="text-center space-y-1">
                  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white leading-[0.85] tracking-tight drop-shadow-2xl">
                    Decentralize{' '}
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent text-glow">
                      Payroll
                    </span>
                  </h1>
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-black text-white leading-[0.85] tracking-tight drop-shadow-2xl">
                    Protocol
                  </h2>
                </div>
              </div>
            </div>
          </div>
          
          {/* Single line below globe */}
          <div className="text-center mb-4">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-white leading-[0.85] tracking-tight drop-shadow-2xl">
              Transforming Global Payroll
            </h1>
          </div>

          {/* Bottom Content Section */}
          
          
        </div>
      </section>
    </>
  );
}



