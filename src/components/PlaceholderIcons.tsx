import React from 'react';

export const LogoIcon = ({ className = "" }: { className?: string }) => (
  <div className={`bg-white rounded-full p-2 ${className}`}>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="60" fill="#1e3a8a" />
      <text x="60" y="65" textAnchor="middle" fill="white" fontWeight="bold" fontSize="20">LOGO</text>
    </svg>
  </div>
);

export const HeroBackground = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 ${className}`}>
    <svg width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="1920" height="1080" fill="#1e3a8a" />
      <path d="M0 0L1920 0L1920 1080L0 1080L0 0Z" fill="#1e3a8a" />
      <path fill="#2563eb" fillOpacity="0.1" d="M0 0C0 0 202 844 960 844C1718 844 1920 0 1920 0V1080H0V0Z" />
    </svg>
  </div>
);

export const QuotaIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="8" fill="#3b82f6" />
    <rect x="16" y="16" width="32" height="8" rx="2" fill="white" />
    <rect x="16" y="28" width="32" height="8" rx="2" fill="white" />
    <rect x="16" y="40" width="32" height="8" rx="2" fill="white" />
  </svg>
);

export const InterviewIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="8" fill="#3b82f6" />
    <circle cx="24" cy="24" r="10" fill="white" />
    <circle cx="40" cy="24" r="10" fill="white" fillOpacity="0.6" />
    <rect x="14" y="38" width="36" height="8" rx="4" fill="white" />
  </svg>
);

export const VisaIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="8" fill="#3b82f6" />
    <rect x="16" y="16" width="32" height="24" rx="2" fill="white" />
    <circle cx="32" cy="28" r="6" fill="#3b82f6" />
    <rect x="24" y="42" width="16" height="6" rx="1" fill="white" />
  </svg>
);

export const FAQIcon = ({ number = 1, className = "" }: { number?: number, className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="16" fill="#3b82f6" />
    <text x="16" y="21" textAnchor="middle" fill="white" fontWeight="bold" fontSize="16">
      {number}
    </text>
  </svg>
);

export const NewsIcon = ({ number = 1, className = "" }: { number?: number, className?: string }) => (
  <svg className={className} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="14" fill="#3b82f6" />
    <rect x="7" y="7" width="14" height="3" rx="1" fill="white" />
    <rect x="7" y="12" width="14" height="2" rx="1" fill="white" />
    <rect x="7" y="16" width="14" height="2" rx="1" fill="white" />
    <rect x="7" y="20" width="8" height="2" rx="1" fill="white" />
  </svg>
); 