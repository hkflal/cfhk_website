"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

type Partner = {
  name: string;
  logo: string;
  industry: string;
};

const partners: Partner[] = [
  {
    name: "國泰航空",
    logo: "/partners/cathay-pacific.svg",
    industry: "航空"
  },
  {
    name: "大家樂",
    logo: "/partners/cafe-de-coral.svg",
    industry: "餐飲"
  },
  {
    name: "新鴻基地產",
    logo: "/partners/sun-hung-kai.svg",
    industry: "房地產"
  },
  {
    name: "香港電訊",
    logo: "/partners/hkt.svg",
    industry: "電信"
  },
  {
    name: "恒生銀行",
    logo: "/partners/hang-seng-bank.svg",
    industry: "金融"
  },
  {
    name: "太古集團",
    logo: "/partners/swire.svg",
    industry: "綜合企業"
  }
];

// Placeholder SVG logos for demo purposes
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

export default function Partners() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="py-16 px-4 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-neutral-900">信任我們的合作夥伴</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">我們為眾多香港知名企業提供專業的外勞服務，助力解決人力資源挑戰</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner) => (
            <div 
              key={partner.name}
              className="bg-white p-4 rounded-xl shadow-soft flex flex-col items-center justify-center aspect-video relative group hover-lift"
            >
              <div className="w-full h-16 relative flex items-center justify-center">
                {isClient ? logoPlaceholders[partner.name as keyof typeof logoPlaceholders] : null}
              </div>
              <div className="mt-3 text-center">
                <p className="font-medium text-neutral-900">{partner.name}</p>
                <p className="text-sm text-neutral-500">{partner.industry}</p>
              </div>
              
              <div className="absolute inset-0 bg-neutral-900/80 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex items-center justify-center p-4">
                <div className="text-center">
                  <p className="font-medium">{partner.name}</p>
                  <p className="text-sm mt-1">成功合作{Math.floor(Math.random() * 5) + 1}年</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 