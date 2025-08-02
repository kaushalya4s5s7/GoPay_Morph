import Image from 'next/image';

export default function LogoCarousel() {
  // Company logos with proper logo URLs
  const logos = [
    { 
      name: "Shopify", 
      logo: "https://cdn.worldvectorlogo.com/logos/shopify.svg",
      alt: "Shopify logo"
    },
    { 
      name: "Stripe", 
      logo: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg",
      alt: "Stripe logo"
    },
    { 
      name: "Slack", 
      logo: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg",
      alt: "Slack logo"
    },
    { 
      name: "Zoom", 
      logo: "https://cdn.worldvectorlogo.com/logos/zoom-communications-logo.svg",
      alt: "Zoom logo"
    },
   
    { 
      name: "Discord", 
      logo: "https://cdn.worldvectorlogo.com/logos/discord-6.svg",
      alt: "Discord logo"
    },
    { 
      name: "GitHub", 
      logo: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg",
      alt: "GitHub logo"
    },
    { 
      name: "Linear", 
      logo: "https://cdn.worldvectorlogo.com/logos/linear-1.svg",
      alt: "Linear logo"
    },
  ];

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-gray-600 mb-2">Trusted by 200+ global businesses</p>
          <h3 className="text-3xl font-bold text-black">
            Join industry leaders who choose GoPay
          </h3>
        </div>

        {/* Infinite scroll container */}
        <div className="relative">
          <div className="flex space-x-8 animate-scroll">
            {duplicatedLogos.map((company, index) => (
              <div 
                key={index}
                className="flex-none w-40 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="bg-white rounded-lg p-4 shadow-sm border w-full h-full flex items-center justify-center space-x-3">
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <Image
                      src={company.logo}
                      alt={company.alt}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 truncate">{company.name}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
}
