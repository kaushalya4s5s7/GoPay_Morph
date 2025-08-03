'use client';

import { useEffect, useState } from 'react';
import { SpinningLogosDemo } from '@/components/home/SpinningLogos';

type Counters = {
  payouts: number;
  countries: number;
  compliance: number;
  customers: number;
};

export default function LiveStats() {
  const [counters, setCounters] = useState<Counters>({
    payouts: 0,
    countries: 0,
    compliance: 0,
    customers: 0,
  });

  const finalValues: Counters = {
    payouts: 12000000,
    countries: 120,
    compliance: 99.8,
    customers: 20000,
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setCounters((prev) => ({
        payouts: Math.min(prev.payouts + finalValues.payouts / steps, finalValues.payouts),
        countries: Math.min(prev.countries + finalValues.countries / steps, finalValues.countries),
        compliance: Math.min(prev.compliance + finalValues.compliance / steps, finalValues.compliance),
        customers: Math.min(prev.customers + finalValues.customers / steps, finalValues.customers),
      }));
    }, interval);

    const timeout = setTimeout(() => {
      clearInterval(timer);
      setCounters(finalValues);
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, []);

  const formatNumber = (num: number, suffix = '') => {
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(1)}M${suffix}`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K${suffix}`;
    return `${Math.floor(num)}${suffix}`;
  };

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Trusted by Teams Worldwide</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real numbers from real companies using GoPay to manage their global payroll operations.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-2">
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-cyan-400 mb-2">
              {formatNumber(counters.payouts)}
            </div>
            <div className="text-gray-300 text-lg">Total Payouts</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-cyan-400 mb-2">
              {Math.floor(counters.countries)}+
            </div>
            <div className="text-gray-300 text-lg">Countries</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-cyan-400 mb-2">
              {counters.compliance.toFixed(1)}%
            </div>
            <div className="text-gray-300 text-lg">Compliance Rate</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-cyan-400 mb-2">
              {formatNumber(counters.customers)}+
            </div>
            <div className="text-gray-300 text-lg">Active Customers</div>
          </div>
        </div>

        {/* Spinning Logos Section */}
        <div className="flex justify-center mb-1">
          <SpinningLogosDemo />
        </div>

        <div className="text-center mt-1">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-6 py-3 rounded-full">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Live data updating every minute</span>
          </div>
        </div>
      </div>
    </section>
  );
}
