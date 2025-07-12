"use client";

import { useState, useEffect } from 'react';

// Phone Icon SVG (Handset style)
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

// Instagram Icon SVG
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.055 1.805.248 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.168.422.36 1.057.413 2.228.057 1.266.07 1.646.07 4.85s-.013 3.583-.07 4.85c-.054 1.17-.246 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.82.679-1.382.896-.421.168-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.583-.013-4.85-.07c-1.17-.054-1.805-.246-2.227-.413-.562-.217-.96-.477-1.382.896-.419-.42-.679-.82-1.381-.896-.168-.421-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.013-3.583.07-4.85c.054-1.17.246-1.805.413-2.227.217-.562.477.96.896-1.382.42-.419.819-.679 1.381-.896.422-.168 1.057-.36 2.228-.413 1.266-.057 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 5.696.132 4.746.347 3.929.676c-.833.332-1.481.747-2.123 1.389C1.001 2.79.586 3.437.258 4.27c-.328.817-.538 1.766-.6 3.122C-.014 8.656 0 9.064 0 12s.014 3.344.072 4.624c.062 1.356.272 2.305.6 3.122.328.833.747 1.481 1.389 2.123.642.642 1.29.057 2.123.258.817.328 1.766.538 3.122.6 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.356-.062 2.305-.272 3.122-.6.833-.328 1.481-.747 2.123-1.389.642-.642.057-1.29.258-2.123.328-.817.538-1.766.6-3.122.058-1.28.072-1.688.072-4.947s-.014-3.344-.072-4.624c-.062-1.356-.272-2.305-.6-3.122-.328-.833-.747-1.481-1.389-2.123C21.21.586 20.563.171 19.73.008c-.817-.328-1.766-.538-3.122-.6C15.321-.014 14.913 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441S18.203 2.714 17.497 2.714z"/>
  </svg>
);

// WhatsApp Icon SVG (standardized size)
const WhatsAppSvgIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24" // Standardized to 24
    height="24" // Standardized to 24
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);


export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // New WhatsApp number
  const whatsAppNumber = "63963660"; // No leading + or country code for wa.me
  const instagramProfile = "hkflal_official";
  const phoneNumber = "+85263963660"; // Full number for tel:

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col-reverse items-center transition-all duration-300 ease-in-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      } md:bottom-8 md:right-8`} // Removed space-y-3
    >
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsAppNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] hover:bg-[#128C7E] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="聯繫我們的WhatsApp"
      >
        <WhatsAppSvgIcon />
      </a>

      {/* Instagram Button - Mobile Only */}
      <a
        href={`https://www.instagram.com/${instagramProfile}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 hover:opacity-80 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform md:hidden mb-3" // Added mb-3
        aria-label="追蹤我們的Instagram"
      >
        <InstagramIcon />
      </a>
      
      {/* Phone Button - Mobile Only */}
      <a
        href={`tel:${phoneNumber}`}
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform md:hidden mb-3" // Added mb-3
        aria-label="致電我們"
      >
        <PhoneIcon />
      </a>
    </div>
  );
} 