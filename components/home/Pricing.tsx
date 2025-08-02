import { useState } from 'react';
import { Check, X } from 'lucide-react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      description: "Perfect for getting started with small teams",
      highlighted: false,
      features: [
        { name: "Up to 5 employees", included: true },
        { name: "Basic payroll processing", included: true },
        { name: "1 country support", included: true },
        { name: "Email support", included: true },
        { name: "Advanced compliance", included: false },
        { name: "Custom integrations", included: false },
        { name: "Dedicated account manager", included: false },
        { name: "SLA guarantee", included: false }
      ],
      cta: "Get Started Free"
    },
    {
      name: "Business",
      price: { monthly: 49, annual: 39 },
      description: "Ideal for growing companies with global teams",
      highlighted: true,
      features: [
        { name: "Up to 100 employees", included: true },
        { name: "Full payroll automation", included: true },
        { name: "50+ countries support", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced compliance", included: true },
        { name: "API access", included: true },
        { name: "Dedicated account manager", included: false },
        { name: "SLA guarantee", included: false }
      ],
      cta: "Start Free Trial"
    },
    {
      name: "Enterprise",
      price: { monthly: "Custom", annual: "Custom" },
      description: "For large organizations with complex needs",
      highlighted: false,
      features: [
        { name: "Unlimited employees", included: true },
        { name: "White-label solution", included: true },
        { name: "120+ countries support", included: true },
        { name: "24/7 phone support", included: true },
        { name: "Advanced compliance", included: true },
        { name: "Custom integrations", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "99.9% SLA guarantee", included: true }
      ],
      cta: "Contact Sales"
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (typeof plan.price.monthly === 'string') return plan.price.monthly;
    const price = isAnnual ? plan.price.annual : plan.price.monthly;
    return price === 0 ? 'Free' : `$${price}`;
  };

  return (
    <section id="pricing" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your business. No hidden fees, no surprises. 
            Scale up or down as your team grows.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-900 border border-gray-700 rounded-lg p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                !isAnnual ? 'bg-white text-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all relative ${
                isAnnual ? 'bg-white text-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs px-2 py-1 rounded-full">
                20% off
              </span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 ${
                plan.highlighted 
                  ? 'border-cyan-500 shadow-2xl shadow-cyan-500/30 scale-105 ring-1 ring-cyan-500/50' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                    Best Value
                  </div>
                </div>
              )}
              
              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-black mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-black">{getPrice(plan)}</span>
                    {typeof plan.price.monthly === 'number' && plan.price.monthly > 0 && (
                      <span className="text-gray-400 ml-2">
                        /employee/{isAnnual ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  
                  {isAnnual && typeof plan.price.monthly === 'number' && typeof plan.price.annual === 'number' && plan.price.monthly > 0 && (
                    <div className="text-sm text-cyan-400 font-medium">
                      Save ${(plan.price.monthly - plan.price.annual) * 12}/employee/year
                    </div>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                        feature.included ? 'bg-cyan-500/20 ring-1 ring-cyan-500/50' : 'bg-white-800'
                      }`}>
                        {feature.included ? (
                          <Check className="text-cyan-400" size={14} />
                        ) : (
                          <X className="text-gray-200" size={14} />
                        )}
                      </div>
                      <span className={`text-sm ${
                        feature.included ? 'text-gray-600' : 'text-gray-500'
                      }`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-4 px-6 rounded-lg font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-cyan-500/25'
                    : 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700 hover:border-gray-600'
                }`}>
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-xl">🚀</span>
              </div>
              <h4 className="font-semibold text-white mb-2">14-Day Free Trial</h4>
              <p className="text-gray-400 text-sm">Try any plan risk-free for 2 weeks</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-xl">💳</span>
              </div>
              <h4 className="font-semibold text-white mb-2">No Setup Fees</h4>
              <p className="text-gray-400 text-sm">Get started immediately with no hidden costs</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-xl">📞</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Cancel Anytime</h4>
              <p className="text-gray-400 text-sm">No long-term contracts or commitments</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
