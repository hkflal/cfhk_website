"use client";

import React, { useState, useEffect } from 'react';
import Slider from "react-slick";

// Import react-slick styles
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/theme.css";

// Placeholder SVG logos - Copied from Partners.tsx for standalone use
const logoPlaceholders = {
  "國泰航空": (
    <svg className="w-full h-full" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="60" rx="4" fill="#004273" />
      <path d="M40 30C40 25.0294 44.0294 21 49 21H151C155.971 21 160 25.0294 160 30C160 34.9706 155.971 39 151 39H49C44.0294 39 40 34.9706 40 30Z" fill="#007A33" />
      <path d="M84.6875 30L94.6875 25V35L84.6875 30Z" fill="white" />
      <path d="M100 25H130V35H100V25Z" fill="white" />
    </svg>
  ),
  "大家樂": (
    <svg className="w-full h-full" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="60" rx="4" fill="#CB0000" />
      <circle cx="100" cy="30" r="15" fill="white" />
      <path d="M88 30C88 23.3726 93.3726 18 100 18C106.627 18 112 23.3726 112 30C112 36.6274 106.627 42 100 42C93.3726 42 88 36.6274 88 30Z" stroke="black" strokeWidth="2" />
    </svg>
  ),
  "新鴻基地產": (
    <svg className="w-full h-full" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="60" rx="4" fill="#F4F4F4" />
      <path d="M70 20H130V40H70V20Z" fill="#CC0033" />
      <path d="M85 28H115V32H85V28Z" fill="white" />
      <path d="M98 22H102V38H98V22Z" fill="white" />
    </svg>
  ),
  "香港電訊": (
    <svg className="w-full h-full" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="60" rx="4" fill="#F4F4F4" />
      <path d="M75 25H125V35H75V25Z" fill="#680070" />
      <path d="M80 30L90 25V35L80 30Z" fill="white" />
      <path d="M95 27H120V33H95V27Z" fill="white" />
    </svg>
  ),
  "恒生銀行": (
    <svg className="w-full h-full" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="60" rx="4" fill="#E60012" />
      <rect x="70" y="20" width="60" height="20" rx="2" fill="white" />
      <path d="M80 25H120V35H80V25Z" fill="#E60012" />
    </svg>
  ),
  "太古集團": (
    <svg className="w-full h-full" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="60" rx="4" fill="#043673" />
      <path d="M85 20H115V40H85V20Z" fill="white" />
      <path d="M90 25H110V35H90V25Z" fill="#043673" />
    </svg>
  )
};

type Partner = {
  name: string;
  logo: string; // Path, currently unused due to placeholders
  industry: string;
};

const partnersData: Partner[] = [
  { name: "國泰航空", logo: "/partners/cathay-pacific.svg", industry: "航空" },
  { name: "大家樂", logo: "/partners/cafe-de-coral.svg", industry: "餐飲" },
  { name: "新鴻基地產", logo: "/partners/sun-hung-kai.svg", industry: "房地產" },
  { name: "香港電訊", logo: "/partners/hkt.svg", industry: "電信" },
  { name: "恒生銀行", logo: "/partners/hang-seng-bank.svg", industry: "金融" },
  { name: "太古集團", logo: "/partners/swire.svg", industry: "綜合企業" }
  // Add more partners if needed
];

export function PartnerCarousel() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true); // Slider requires client-side rendering
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    autoplay: true,
    autoplaySpeed: 0, 
    cssEase: 'linear',
    slidesToShow: 5,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 600, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } }
    ]
  };

  if (!isClient) return null; // Prevent server-side rendering of slider

  return (
    <section className="py-12 sm:py-16 bg-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-inter">
            我們的合作夥伴
          </h2>
          <p className="mt-3 text-md sm:text-lg text-neutral-600 max-w-2xl mx-auto">
            我們很榮幸能與以下及眾多香港企業合作，提供專業可靠的外勞招聘服務。
          </p>
        </div>
        <Slider {...settings}>
          {partnersData.map((partner) => (
            <div key={partner.name} className="px-3">
              <div className="bg-white h-24 flex items-center justify-center p-4 rounded-lg shadow-sm opacity-80 hover:opacity-100 transition-opacity duration-200">
                {/* Use placeholder SVG */}
                {logoPlaceholders[partner.name as keyof typeof logoPlaceholders] 
                  ? React.cloneElement(logoPlaceholders[partner.name as keyof typeof logoPlaceholders], { className: "max-h-12 w-auto" }) 
                  : <span className="text-neutral-400 text-sm">{partner.name}</span>} 
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
} 