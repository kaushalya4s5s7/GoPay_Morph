import Link from 'next/link';
import React from 'react';

// Data for the footer links to keep the JSX clean
const footerSections = [
  {
    title: 'Learn',
    links: [
      { name: 'Docs', href: '#' },
      { name: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { name: 'APIs', href: '#' },
      { name: 'Tools', href: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { name: 'Forum', href: '#' },
      { name: 'Telegram', href: '#' },
      { name: 'Twitter', href: '#' },
      { name: 'Discord', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '#' },
      { name: 'Contact us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Brand Kit', href: '#' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Note: The faint geometric lines in the image are a background design element.
        For best results, this would be an SVG background on the parent container.
      */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        
        {/* --- "IT'S MORPHING TIME!" Section --- */}
        <div className="pb-24 md:pb-32"> {/* Adds spacing between this text and the footer links */}
          <h1 className="
              font-black 
              text-6xl 
              md:text-8xl 
              lg:text-9xl 
              text-[#99f6e4] /* Light teal/aqua color */
              leading-none /* Tight line height */
              tracking-tighter /* Tight letter-spacing */
            "
          >
            <span>IT'S</span><br/>
            <span>PAYROLL</span><br/>
            <span>TIME!</span>
          </h1>
        </div>

        {/* --- Original Footer Links Section --- */}
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Copyright Section */}
          <div className="space-y-8 xl:col-span-1">
            <span className="text-sm text-gray-400">© 2025 Morph. All rights reserved</span>
          </div>

          {/* Links Section Grid */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2 md:grid-cols-4">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold leading-6 text-gray-200">{section.title}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {section.links.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;