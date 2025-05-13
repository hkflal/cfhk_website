"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Partner = {
  name: string;
  logo: string;
  description: string;
};

const partners = [
  {
    name: "國泰航空",
    logo: "/images/partner/國泰航空.png",
    description: "香港主要航空公司"
  },
  {
    name: "HAS機場公司",
    logo: "/images/partner/HAS機場公司.png",
    description: "香港機場管理局"
  },
  {
    name: "新濠天地",
    logo: "/images/partner/新濠天地.png",
    description: "澳門綜合度假村"
  },
  {
    name: "永利澳門",
    logo: "/images/partner/永利澳門.png",
    description: "澳門豪華度假村"
  },
  {
    name: "信德集團",
    logo: "/images/partner/信德集團.png",
    description: "香港綜合企業集團"
  },
  {
    name: "銀河娛樂",
    logo: "/images/partner/銀河娛樂.png",
    description: "澳門娛樂度假村"
  }
];

export const Partners = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="w-full h-32 relative mb-4 flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-sm font-bold text-neutral-800 text-center">{partner.name}</h3>
              <p className="text-xs text-neutral-600 text-center mt-1">{partner.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 