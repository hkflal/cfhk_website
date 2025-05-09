"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  // Adjusted: text-primary-500 (using new dark blue) for hover/active states if appropriate
  // For the main nav, let's use a subtle color change or just bold for active
  const navLinkBaseClasses = "text-neutral-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out";
  const navLinkHoverClasses = "hover:text-primary-600 hover:bg-primary-50";
  const navLinkActiveClasses = "font-bold text-primary-600 bg-primary-100"; // Bold for active, with a light primary background

  // Mobile styles
  const mobileNavLinkBaseClasses = "block px-3 py-2 rounded-md text-base font-medium text-neutral-700";
  const mobileNavLinkHoverClasses = "hover:text-primary-600 hover:bg-primary-50";
  const mobileNavLinkActiveClasses = "font-bold text-primary-600 bg-primary-100";

  const navItems = [
    { href: "/", label: "首頁" },
    { href: "/about", label: "關於我們" },
    { href: "/faq", label: "常見問題" },
    { href: "/news", label: "最新消息" },
  ];

  return (
    // Note: The parent div in layout.tsx provides the sticky, bg-white/80, backdrop-blur, shadow
    // This header can be simpler, focusing on its content layout.
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link href="/" className="flex-shrink-0 flex items-center">
            {/* Show full title on md and larger screens */}
            <span className="hidden md:inline font-playfair font-bold text-xl text-primary-600">福建中福對外勞務合作有限公司</span>
            
            {/* Show shorter title and logo below md screens */}
            <div className="md:hidden flex items-center">
              <img src="/images/logo.png" alt="福建中福 Logo" className="h-8 w-auto mr-2" />
              <span className="font-playfair font-bold text-lg text-primary-600">中福(香港)</span>
            </div>
          </Link>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`${navLinkBaseClasses} ${isActive(item.href) ? navLinkActiveClasses : navLinkHoverClasses}`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="-mr-2 flex md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
            className="bg-neutral-100 inline-flex items-center justify-center p-2 rounded-md text-neutral-500 hover:text-primary-600 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-100 focus:ring-primary-500"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {/* Icon when menu is closed. */}
            <svg className={`h-6 w-6 ${menuOpen ? 'hidden' : 'block'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* Icon when menu is open. */} 
            <svg className={`h-6 w-6 ${menuOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`${mobileNavLinkBaseClasses} ${isActive(item.href) ? mobileNavLinkActiveClasses : mobileNavLinkHoverClasses}`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 