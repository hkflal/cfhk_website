"use client";

import LogoIcon from '../components/LogoIcon';
import React, { useState, useEffect, ChangeEvent, FormEvent, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Partners } from '@/components/Partners';
import emailjs from '@emailjs/browser';

// Retained Icon: CheckBadgeIcon
const CheckBadgeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Define interfaces for Contact Form
interface ContactFormData {
  name: string;
  phone: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  phone?: string;
  message?: string;
}

export default function Home() {
  const applicationProcessStepsOriginal = useMemo(() => [
    {
      title: "提交申請表及所需資料",
      timeline: "第1週",
      description: "僱主需要提供完整的公司資料、業務性質說明、擬聘外勞職位描述、薪酬待遇及住宿安排等資料。我們會協助準備所需文件，確保申請材料符合勞工處要求。",
      requirements: ["有效的商業登記證", "公司財務證明", "僱主身份證明文件", "擬聘職位的詳細工作描述", "提供的薪酬和福利詳情", "住宿安排證明"]
    },
    {
      title: "勞工處初步甄別及本地招聘準備",
      timeline: "第2-3週",
      description: "勞工處會對申請進行初步審核，確認基本資格。同時，我們將協助僱主準備本地招聘廣告，內容需符合勞工處規定。",
      requirements: ["確認公司及職位符合申請資格", "準備招聘廣告稿件", "釐清招聘途徑"]
    },
    {
      title: "進行本地公開招聘",
      timeline: "第4-7週",
      description: "按勞工處規定，僱主須在指定媒體刊登招聘廣告，進行為期至少四周的本地招聘，並記錄招聘結果，證明未能在本地聘得合適人手。",
      requirements: ["刊登招聘廣告", "收集本地求職者申請", "進行面試並記錄結果", "準備本地招聘報告"]
    },
    {
      title: "遞交「補充勞工優化計劃」正式申請",
      timeline: "第8週",
      description: "完成本地招聘程序後，僱主需向勞工處遞交「補充勞工優化計劃」的正式申請表格，並附上所有證明文件，包括本地招聘報告。",
      requirements: ["填寫正式申請表格", "提交商業登記及公司文件", "提交本地招聘結果證明", "提交擬輸入勞工住宿證明"]
    },
    {
      title: "勞工顧問委員會審批及政府部門協調",
      timeline: "第9-16週",
      description: "勞工處會將申請轉交勞工顧問委員會審批。此階段可能涉及多個政府部門的協調，並可能要求僱主提供補充資料。",
      requirements: ["耐心等候審批結果", "按勞工處要求迅速提供補充資料", "與個案主任保持溝通"]
    },
    {
      title: "獲批配額及申請工作簽證",
      timeline: "第17-20週",
      description: "申請獲批後，勞工處會發出原則上批准通知書。之後，我們將協助僱主為指定勞工向入境事務處申請工作簽證。",
      requirements: ["接收原則上批准通知書", "為指定勞工準備簽證申請文件", "向入境事務處遞交簽證申請", "繳付相關簽證費用"]
    },
    {
      title: "安排來港工作",
      timeline: "第21週後",
      description: "簽證獲批後，我們將協助安排勞工來港事宜，包括交通、抵港接待和住宿安排。抵港後還需完成勞工處的報到手續。",
      requirements: ["安排往來交通", "確保住宿場所已準備就緒", "協助勞工辦理抵港後的各項手續", "向勞工處提交抵港報告", "為勞工提供工作崗位培訓"]
    }
  ].map(step => ({ ...step, requirements: step.requirements || [], id: step.title })), []); // Added id based on title

  const getWeeksFromTimeline = (timelineStr: string): number => {
    if (!timelineStr) return 0;
    const match = timelineStr.match(/第(\d+)/);
    return match && match[1] ? parseInt(match[1], 10) : 0;
  };

  const enrichedApplicationProcessSteps = useMemo(() => {
    const today = new Date();
    return applicationProcessStepsOriginal.map(step => {
      const weeksToAdd = getWeeksFromTimeline(step.timeline);
      const projectedDate = new Date(today);
      // Adjust so "第1週" means starting from today/this week, not one week from today.
      projectedDate.setDate(today.getDate() + (weeksToAdd > 0 ? (weeksToAdd - 1) * 7 : 0));
      
      const year = projectedDate.getFullYear();
      const month = projectedDate.getMonth() + 1;
      const day = projectedDate.getDate();
      const projectedStartDateStringFull = `${year}年${month}月${day}日`;
      const projectedStartDateStringShort = `${month}月${day}日`;
      
      return {
        ...step,
        projectedStartDateStringFull,
        projectedStartDateStringShort,
      };
    });
  }, [applicationProcessStepsOriginal]);

  const servicesData = useMemo(() => [
    {
      id: "quota",
      title: "外勞配額申請",
      description: "為香港企業申請引進內地勞工的配額，包括評估企業資格、準備申請文件、與勞工處溝通及跟進申請進度。",
      features: [
        "企業資格評估",
        "申請文件準備",
        "本地招聘廣告安排",
        "政府部門溝通",
        "申請進度跟進",
        "配額審批結果分析"
      ]
    },
    {
      id: "interview",
      title: "勞工面試與招聘",
      description: "與內地官方指定勞工輸出機構合作，篩選合格勞工，安排面試，確保僱主能選到最合適的人選。",
      features: [
        "勞工篩選及推薦",
        "面試安排（現場或視頻）",
        "勞工背景核查",
        "技能評估和測試",
        "勞工培訓及崗前指導",
        "僱傭合同準備"
      ]
    },
    {
      id: "visa",
      title: "簽證與入境安排",
      description: "協助辦理香港工作簽證、內地出境證件，安排交通、住宿及抵港報到等事宜，確保勞工順利來港工作。",
      features: [
        "香港工作簽證申請",
        "內地出境證件辦理",
        "交通安排",
        "住宿協助",
        "抵港接待",
        "法定報到手續辦理"
      ]
    }
  ], []);

  const pricingTiersData = useMemo(() => [
    {
      name: "基礎方案",
      price: "HKD 5,000起",
      description: "適合有經驗的企業，僅需辦理配額申請和基本手續的服務。",
      features: [
        "外勞配額申請",
        "基礎文件準備",
        "本地招聘廣告安排",
        "申請進度跟進",
        "電話諮詢服務"
      ],
      notIncluded: [
        "面試安排",
        "簽證辦理",
        "住宿安排",
        "抵港接待"
      ],
      highlighted: false,
    },
    { 
      name: "全包方案", // Formerly the highlighted "雇主限時方案", now reverting
      price: "HKD 10,000起", // Original price for this tier
      description: "提供從申請到勞工抵港的核心服務，性價比高，適合多數企業需求。", // Standard description
      features: [ 
        "外勞配額申請",
        "全套文件準備",
        "本地招聘廣告安排",
        "申請進度跟進",
        "勞工篩選及推薦",
        "面試安排",
        "簽證辦理",
        "7×24小時諮詢服務"
      ],
      notIncluded: [
        "住宿安排",
        "抵港接待"
      ],
      highlighted: false, // No longer highlighted
      // countdownTarget is removed
    },
    { 
      name: "雇主限時方案", // This is now the 15k package, highlighted and free
      originalPrice: "HKD 15,000起",
      price: "HKD 0",
      description: "限時免費尊享全包服務！從申請到勞工抵港，我們為您一站式辦妥，助您輕鬆解決人手問題。",
      features: [
        "外勞配額申請",
        "全套文件準備",
        "本地招聘廣告安排",
        "申請進度跟進",
        "勞工篩選及推薦",
        "面試安排",
        "簽證辦理",
        "住宿安排",
        "抵港接待",
        "培訓協助",
        "專屬顧問服務"
      ],
      notIncluded: [],
      highlighted: true, 
      countdownTarget: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
    }
  ], []);

  const [countdown, setCountdown] = useState<Record<string, string | number>>({});
  const [activeCountdownTierName, setActiveCountdownTierName] = useState<string | null>(null);
  
  // Initialize useRouter INSIDE the component function
  const router = useRouter();
  
  // Correctly typed Contact Form State
  const [contactFormData, setContactFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    message: ''
  });
  const [contactFormErrors, setContactFormErrors] = useState<ContactFormErrors>({});
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // State for the large pop-out date display
  // const [activePopOutDate, setActivePopOutDate] = useState<{ text: string; key: string } | null>(null);

  useEffect(() => {
    const highlightedTier = pricingTiersData.find(tier => tier.highlighted && tier.countdownTarget);
    if (highlightedTier) {
      setActiveCountdownTierName(highlightedTier.name); // Store name to match in JSX
      const targetDate = new Date(highlightedTier.countdownTarget!).getTime();

      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
          clearInterval(interval);
          setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: '優惠已結束' });
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [pricingTiersData]);

  const handleContactChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData((prev: ContactFormData) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateContactForm = (): boolean => {
    const newErrors: ContactFormErrors = {};
    if (!contactFormData.name.trim()) newErrors.name = '請輸入您的姓名';
    if (!contactFormData.phone.trim()) newErrors.phone = '請輸入您的電話號碼';
    if (!contactFormData.message.trim()) newErrors.message = '請輸入您的查詢內容';
    setContactFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateContactForm()) {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        // EmailJS configuration from environment variables
        const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
        const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

        // Template parameters for EmailJS
        const templateParams = {
          to_email: 'info@zf-hk.com',
          from_name: contactFormData.name,
          from_phone: contactFormData.phone,
          message: contactFormData.message,
          reply_to: contactFormData.phone, // Use phone as reply-to since no email field
        };

        // Send email using EmailJS
        await emailjs.send(serviceID, templateID, templateParams, publicKey);

        // Success - show success message
        setContactFormSubmitted(true);
        setContactFormData({ name: '', phone: '', message: '' });
        setTimeout(() => {
          setContactFormSubmitted(false); 
          router.push('/'); 
        }, 3000);
        
      } catch (error) {
        console.error('Email send failed:', error);
        setSubmitError('發送失敗，請稍後再試或直接聯絡我們。');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Framer Motion Variants
  const stepCardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  const ovalDateLabelVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { delay: 0.4, duration: 0.4, ease: "easeOut" } 
    }
  };
  // Keep popOutDateVariants defined but unused
  const popOutDateVariants = {
    initial: { opacity: 0, scale: 0.5, x: "-50%", y: "-50%" },
    animate: { opacity: 1, scale: 1.3, transition: { duration: 0.4, ease: "backOut" } },
    exit: { opacity: 0, scale: 0.7, transition: { duration: 0.3, ease: "backIn" } }
  };

  const titleDropBoomVariants = {
    hidden: { opacity: 0, y: -80, scale: 0.3 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 260, // Adjusted for a slightly softer boom
        damping: 15,      // Adjusted for a bit of bounce
        delay: 0.1       // Slight delay before animation starts
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 font-sans antialiased">
      {/* Fixed Pop-Out Date Display - Temporarily Commented Out */}
      {/* 
      <AnimatePresence mode="wait">
        {activePopOutDate && (
          <motion.div
            key={activePopOutDate.key}
            className="fixed top-1/2 left-16 sm:left-20 lg:left-24 transform -translate-y-1/2 z-50 p-4 bg-transparent pointer-events-none"
            variants={popOutDateVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <span className="text-6xl sm:text-8xl font-bold text-orange-600 whitespace-nowrap">
              {activePopOutDate.text}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      */}

      {/* Hero Section - Updated to use logo.png */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <img 
          src="/images/Hero.jpg"
          alt="Hero background placeholder" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            {/* Replaced LogoIcon SVG with img tag for logo.png */}
            <img src="/images/logo.png" alt="福建中福對外勞務合作有限公司 Logo" className="hidden xl:block h-24 w-auto" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight font-playfair">中福(香港)有限公司</h1>
          <p className="text-sm sm:text-base max-w-3xl mx-auto mt-4 leading-relaxed text-center">
            勞工處職業介紹所牌照號碼：76430<br />
            內地輸香港勞務經營證書編號: LW35002005006
          </p>
          <p className="text-xl sm:text-2xl max-w-2xl mx-auto mt-4 text-neutral-200 font-bold tracking-wide">
            <span className="text-2xl sm:text-3xl">14間之一</span><br />
            <span className="text-base sm:text-lg">商務部批准內地輸港勞務經營公司</span>
          </p>
        </div>
      </section>

      {/* MODIFIED: Our Core Services Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight font-inter">
              一步到位的服務
            </h2>
            <p className="mt-5 text-lg text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              我們提供外勞配額申請、面試勞工、簽證辦理、住宿安排等一站式專業服務，協助企業合法引進內地勞工。憑藉三十年的行業經驗和深厚的政府關係，我們能夠高效處理各種複雜申請。
            </p>
          </div>

          {/* Services Grid - Updated Card Styling and Added Framer Motion */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 sm:mb-20 lg:mb-24">
            {servicesData.map((service, index) => {
              // const Icon = service.icon; // Icon variable no longer needed as it's not used
              return (
                <motion.div
                  key={service.id}
                  className="bg-neutral-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 border-t-4 border-primary-600 p-8 flex flex-col text-white relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                >
                  <img 
                    src={`/images/service-card${index + 1}.jpg`}
                    alt={`${service.title} background`}
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold mb-3 text-center tracking-tight font-inter">{service.title}</h3>
                    <p className="text-sm leading-relaxed mb-4 flex-grow text-center text-neutral-300">{service.description}</p>
                    <div className="mt-auto pt-4 border-t border-neutral-700">
                      <h4 className="font-semibold text-sm mb-2 text-center">主要服務內容：</h4>
                      <ul className="space-y-1 text-sm text-neutral-300">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg className="h-4 w-4 text-neutral-300 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pricing Section */}
          <div className="mb-16 sm:mb-20 lg:mb-24">
            <div className="text-center mb-12 sm:mb-16">
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-inter">服務方案與價格</h3>
                <p className="mt-4 text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                    我們提供多種靈活的服務方案以滿足不同企業的需求和預算。所有方案均可根據您的具體情況進行客製化調整。
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {pricingTiersData.map((tier) => (
                <div
                  key={tier.name}
                  className={`bg-neutral-50 rounded-xl p-6 flex flex-col h-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 ${
                    tier.highlighted
                      ? 'border-2 border-[#25D366] relative'
                      : 'border border-neutral-200'
                  } ${
                    tier.highlighted ? '' : 'hidden md:flex'
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 bg-[#25D366] text-white text-xs font-semibold py-1 px-3 rounded-full shadow-md">
                      {tier.price === "HKD 0" ? "限時免費" : "限時優惠"}
                    </div>
                  )}
                  <div className="mb-auto">
                    <h4 className="text-xl font-semibold text-neutral-800 mb-1 font-inter">{tier.name}</h4>
                    <div className="text-2xl font-bold text-primary-600 mb-3">
                      {tier.originalPrice && tier.price === "HKD 0" ? (
                        <>
                          <span className="line-through text-neutral-400 text-lg mr-2">{tier.originalPrice}</span>
                          <span className="text-[#25D366]">{tier.price}</span>
                        </>
                      ) : (
                        tier.price
                      )}
                    </div>
                    <p className="text-neutral-600 text-sm mb-4 flex-grow">{tier.description}</p>

                    {tier.highlighted && tier.countdownTarget && activeCountdownTierName === tier.name && (
                       <div className="my-4 p-3 bg-orange-100 border border-orange-300 rounded-md text-center">
                         <p className="text-sm font-medium text-orange-700">優惠倒計時:</p>
                         {countdown.ended ? (
                           <p className="text-lg font-bold text-red-600">{countdown.ended}</p>
                         ) : (
                           <p className="text-lg font-bold text-orange-600">
                             {countdown.days !== undefined ? `${countdown.days}天 ${countdown.hours}小時 ${countdown.minutes}分鐘 ${countdown.seconds}秒` : '載入中...'}
                           </p>
                         )}
                       </div>
                    )}
                  </div>
                  
                  <div className="mt-auto space-y-4">
                    <div>
                        <h5 className="font-semibold text-xs uppercase text-neutral-500 mb-2 tracking-wider">包含服務</h5>
                        <ul className="space-y-1 text-sm text-neutral-700">
                        {tier.features.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                            <svg className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>{feature}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                    
                    {tier.notIncluded && tier.notIncluded.length > 0 && (
                      <div className={`${tier.highlighted ? '' : 'hidden md:block'}`}>
                        <h5 className="font-semibold text-xs uppercase text-neutral-500 mb-2 tracking-wider">不包含服務</h5>
                        <ul className="space-y-1 text-sm text-neutral-700">
                          {tier.notIncluded.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <svg className="h-4 w-4 text-neutral-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <a
                    href="#contact-section-merged" // Point to the merged contact section
                    className={`block w-full py-3 px-4 rounded-lg text-center font-semibold mt-6 transition-all duration-300 text-md ${
                      tier.highlighted
                        ? 'bg-[#25D366] text-white hover:bg-[#128C7E] shadow-md'
                        : 'bg-neutral-200 text-primary-600 hover:bg-neutral-300 hover:text-primary-700'
                    }`}
                  >
                    查詢詳情及報價
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* UPDATED: Application Process Section - Simplified Animation Logic */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold text-neutral-900 tracking-tight font-inter"
              variants={titleDropBoomVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="text-orange-600 font-semibold text-[4.05rem] sm:text-[5.4rem] leading-tight mr-1 sm:mr-2">全港最快 ! 21週</span>外勞申請流程
            </motion.h2>
          </div>
          
          <div className="space-y-12 relative">
            <div className="absolute top-0 bottom-0 left-5 w-0.5 bg-neutral-300 transform -translate-x-1/2 md:left-6" style={{ minHeight: '100%' }}></div>
            {enrichedApplicationProcessSteps.map((step, index) => (
              <motion.div 
                key={step.id}
                className="relative pl-16 md:pl-20 py-3"
                variants={stepCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1, margin: "-100px" }} // Adjusted viewport trigger amount and added margin
                transition={{ duration: 0.4, delay: index * 0.15 }} // Reduced delay between steps
              >
                {/* Oval Date Label - Simplified Animation */}
                <motion.div 
                  className="absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 w-auto md:left-6 z-10"
                  variants={ovalDateLabelVariants}
                  initial="hidden" 
                  animate="visible"
                  transition={{ delay: 0.2, duration: 0.3 }} // Reduced delay and duration
                >
                  <div className="bg-orange-600 text-white text-sm sm:text-base font-semibold px-3.5 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                    {step.projectedStartDateStringShort}
                  </div>
                </motion.div>
                  
                <div className="p-6 bg-neutral-50 rounded-xl shadow-xl hover:shadow-2xl transition-colors duration-300 border border-neutral-200 ml-4 md:ml-2 relative z-0">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                      <h3 className="text-xl font-semibold text-neutral-800 font-inter mb-1 sm:mb-0">{step.title}</h3>
                      <span className="text-xs sm:text-sm text-neutral-500 font-medium bg-primary-100 text-primary-700 px-3 py-1 rounded-full self-start sm:self-center mt-1 sm:mt-0">
                        {step.timeline}
                      </span>
                  </div>
                  <p className="text-neutral-600 leading-relaxed mb-4">{step.description}</p>
                  
                  {step.requirements && step.requirements.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-neutral-200">
                      <h4 className="font-semibold text-md mb-3 text-primary-600 font-inter">所需文件及注意事項：</h4>
                      <ul className="space-y-2 text-sm text-neutral-700">
                        {step.requirements.map((req: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <svg className="h-4 w-4 text-primary-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESTORED: Supplementary Labour Optimisation Scheme Details Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight font-inter">
              「補充勞工優化計劃」詳情
            </h2>
            <p className="mt-5 text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              了解更多關於申請資格、流程、僱主責任及最新政策資訊。
            </p>
          </div>

          <div className="space-y-12">
            {/* Subsection 1: 補充勞工優化計劃：僱主須知 */}
            <div className="p-8 bg-blue-50 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-neutral-800 mb-6 tracking-tight">補充勞工優化計劃：僱主須知</h3>
              <ul className="list-disc list-outside space-y-3 text-neutral-700 leading-relaxed pl-5">
                <li>「補充勞工優化計劃」旨在協助在香港經營業務且確實未能在本地招聘到技術員級別或以下合適人手的僱主。</li>
                <li>此計劃適用於技術員級別或以下的職位類別。</li>
                <li>不適用範圍：計劃不接受「院舍輸入護理員特別計劃」及其他行業輸入勞工計劃（建造業及運輸業）所涵蓋行業及職位類別的輸入勞工申請。</li>
                <li>僱主必須優先聘請本地工人並致力培訓他們，以填補職位空缺。</li>
                <li>輸入勞工不能取代原來在職的本地工人。如需裁員，僱主應先裁減輸入勞工。</li>
                <li>僱主獲准輸入勞工的批准不可自動續期。如果僱主在輸入勞工約滿時仍需繼續聘用，必須提前重新遞交申請。</li>
                <li>所有申請會按個別情況考慮，例如僱主是否確實需要輸入勞工及在職本地僱員數目等。政府會考慮僱主為培訓本地工人所作出的努力。</li>
                <li>不批准的常見情況：
                  <ul className="list-disc list-outside space-y-2 text-neutral-700 leading-relaxed pl-5 mt-2">
                    <li>僱主受勞工處行政制裁，不獲准參與計劃。</li>
                    <li>僱主提供的薪金低於每月中位工資。</li>
                    <li>僱主設定有限制性或不合理的招聘條件（如年齡、性別、教育、經驗或技能等）。</li>
                    <li>僱主沒有誠意優先聘用或培訓本地工人。</li>
                    <li>申請者或其獨資經營者／合夥人在遞交申請前兩年內有相關定罪紀錄（包括違反《僱傭條例》、《僱員補償條例》、《入境條例》和職業安全及健康法例），或現正被勞工處施加行政制裁，其申請一般不會獲處理／批准。</li>
                  </ul>
                </li>
                <li>僱主必須確保所有業務活動合法，並持有經營業務所需的所有有效證明文件（包括但不限於相關牌照、許可證和豁免書）。勞工處如合理懷疑活動可能違法，可轉交執法部門跟進。</li>
                <li>僱主必須確認有足夠經濟能力僱用輸入勞工，並會履行支付工資及其他合約和法定權益的責任。</li>
                <li>為加強申請資訊發放，勞工處會為僱主舉辦簡介會，解釋申請程序和注意事項。</li>
              </ul>
            </div>

            {/* Subsection 2: 申請流程與所需文件 */}
            <div className="p-8 bg-yellow-50 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-neutral-800 mb-6 tracking-tight">申請流程與所需文件</h3>
              <p className="text-neutral-700 leading-relaxed mb-4">申請流程包括：初步甄別 → 本地招聘 → 申請評估及結果。</p>
              <p className="text-neutral-700 leading-relaxed mb-4">申請者須根據申請的職位類別，填妥<strong>「常見職位申請表」（表格 ESLS-1A）或「非常見職位申請表」（表格 ESLS-1B）</strong>。</p>
              <ul className="list-disc list-outside space-y-3 text-neutral-700 leading-relaxed pl-5 mb-6">
                <li>申請文件必須由僱主或其授權代表簽署；如由授權代表簽署，須提交授權書（附頁三）證明。</li>
                <li>請務必填妥申請表並連同所有所需證明文件一併遞交。</li>
                <li>如果申請表資料不全或欠缺所需證明文件，勞工處會退還表格而不作處理。</li>
                <li>提交申請文件前，請參閱「所需文件清單及遞交申請方法」。</li>
              </ul>
              <h4 className="text-xl font-semibold text-neutral-800 mb-3 tracking-tight">部分申請所需文件（如適用）包括：</h4>
              <ul className="list-disc list-outside space-y-3 text-neutral-700 leading-relaxed pl-5 mb-6">
                <li>商業登記證副本。</li>
                <li>最新的「商業登記冊內資料的摘錄的核證本」副本（如適用）。</li>
                <li>有限公司／法團註冊證明書副本（如適用）。</li>
                <li>「補充資料聲明書」（只適用於獨資經營或合夥業務）（附頁一）。</li>
                <li>「全職本地僱員資料報表」（附頁二）。</li>
                <li>授權書（由獨資經營者／董事／獲授權合夥人簽署及申請者蓋印）（附頁三）（如適用）。</li>
                <li>「輸入勞工資料報表」（附頁四）（如適用）。</li>
                <li>「輸入勞工的理據」（附頁五）。</li>
                <li>「合法經營業務所需牌照／批准資料報表」（附頁六）（如適用）。</li>
              </ul>
              <ul className="list-disc list-outside space-y-3 text-neutral-700 leading-relaxed pl-5">
                <li>請將申請文件提交至勞工處補充勞工科辦事處。</li>
                <li>勞工處不會處理重複遞交的申請。如需終止現有申請並重新提交，請先聯絡個案主任撤銷原有申請。</li>
                <li>勞工處處理時間受多項因素影響，包括資料是否足夠、是否要求更改申請詳情等。如有需要，勞工處會要求補充資料或建議修訂要求。如申請者拒絕建議或未按時回覆，勞工處會中止處理。</li>
              </ul>
            </div>

            {/* ... other subsections of Supplementary Labour Scheme remain the same ... */}
            
            {/* Subsection 10: 聯絡及參考資源 */}
            <div className="p-8 bg-green-50 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-neutral-800 mb-6 tracking-tight">聯絡及參考資源</h3>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 text-neutral-700 leading-relaxed">
                <div>
                  <h4 className="text-lg font-semibold text-neutral-800 mb-2">聯絡資訊</h4>
                  <p>香港九龍旺角彌敦道707-713號</p>
                  <p>銀高國際大廈9樓A室</p>
                  <p>電話: +852 6148 6144</p>
                  <p>電郵: info@cfhk.com</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-800 mb-2">入境事務處輸入勞工組</h4>
                  <p>地址：新界將軍澳寶邑路 61 號入境事務處總部行政大樓 4 樓</p>
                  <p>電話：2829 3220</p>
                  <p>傳真：3902 3167 / 3902 3167 (終止合約通知書)</p>
                  <p>網址：www.immd.gov.hk</p>
                </div>
              </div>
              <div className="mt-6">
                 <h4 className="text-lg font-semibold text-neutral-800 mb-2">參考網站：</h4>
                 <ul className="list-disc list-outside space-y-1 text-neutral-700 leading-relaxed pl-5">
                    <li>勞工處網站：提供計劃背景、申請資格、計劃簡介等資訊。</li>
                    <li>国家商務部網站：提供獲批准對香港特區勞務合作經營資格的勞務企業名單。</li>
                 </ul>
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-neutral-800 mb-3">參考文件：</h4>
                <ul className="list-disc list-outside space-y-1 text-neutral-700 leading-relaxed pl-5 text-sm">
                  <li>「如何根據補充勞工優化計劃輸入勞工」小冊子</li>
                  <li>「補充勞工優化計劃」－ 常見職位表</li>
                  <li>標準僱傭合約（LD 294 (7/2024)）樣本</li>
                  <li>各申請表格及附頁 (ESLS-1A, ESLS-1B, Appendices 1-6)</li>
                  <li>聲明及授權書 (ESLS-11 (Rev. 3/2025))</li>
                  <li>內地輸香港特別行政區勞務合作共同聲明書 (ESLS-12 (Rev. 3/2025))</li>
                  <li>輸入勞工終止僱傭合約通知書 (ESLS-13)</li>
                  <li>本地公開招聘期內刊登招聘廣告的規定</li>
                  <li>「補充勞工優化計劃」常見問題與答案</li>
                  <li>勞務企業或其關聯企業在香港經營安排內地勞工赴港工作業務的持牌職業介紹所名單</li>
                </ul>
              </div>
            </div>

            {/* NEW SUBSECTION: 申請不獲處理或批准的常見情況 */}
            <div className="p-8 bg-red-50 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-neutral-800 mb-6 tracking-tight">申請不獲處理或批准的常見情況</h3>
              <p className="text-neutral-700 leading-relaxed mb-4">
                根據提供的來源，在「補充勞工優化計劃」下，輸入勞工申請在以下情況下通常不獲處理或批准：
              </p>
              <ul className="list-disc list-outside space-y-3 text-neutral-700 leading-relaxed pl-5 mb-6">
                <li>申請表資料不全或欠缺所需證明文件，勞工處會退還表格而不作處理。</li>
                <li>在初步甄別階段，如申請者拒絕接納勞工處建議補充資料／證明文件或修訂申請職位要求，或未能於指定時間內回覆，勞工處會中止處理有關申請，不作另行通知。</li>
                <li>通過初步甄別後，申請職位的職責範圍、入職要求或其他招聘條件不可更改。如申請者作出更改，勞工處會終止處理其申請。</li>
                <li>無合理理由拒絕聘用本地公開招聘期間應徵的合資格本地求職者，勞工處會終止處理其申請。</li>
                <li>違反公開招聘的規定（例如以低於勞工處同意或最新調整的中位工資聘請本地工人），政府會即時中止處理有關申請。</li>
                <li>僱主受勞工處行政制裁，不獲准參與「補充勞工優化計劃」。違反相關法定條文或計劃規定會導致批准被撤銷及隨後兩年內不得參與計劃。</li>
                <li>僱主提供的薪金低於當時市場相類職位的每月中位工資。如申請職位的月工資低於最新發布的中位工資，勞工處會上調，如僱主不同意，勞工處將未能處理該申請。</li>
                <li>僱主設定有限制性規定或超越工作需求的不合理招聘條件，如年齡、性別、教育、經驗或技能等。在本地公開招聘期間，廣告不可包括任何年齡、性別等限制性要求。</li>
                <li>僱主沒有誠意優先聘用或培訓本地工人，填補職位空缺。</li>
                <li>在遞交申請當日之前兩年內，曾有相關定罪紀錄（包括《僱傭條例》、《僱員補償條例》、《入境條例》和職業安全及健康法例）。</li>
                <li>因違反「補充勞工優化計劃」／「標準僱傭合約」的相關規定而正被勞工處施加行政制裁。</li>
                <li>簽證／進入許可申請逾期遞交，概不受理，有關的輸入勞工原則性批准亦告無效。</li>
                <li>如擬輸入勞工為內地居民，未能符合招聘要求（例如必須經由勞務企業招聘輸入勞工）及／或提交的文件（ESLS-11 和 ESLS-12）資料不全或不正確，入境事務處不會處理涉及的簽證／進入許可申請。</li>
                <li>僱主曾剝削或苛待輸入勞工，其替補申請將不獲批准。</li>
                <li>重複遞交申請，勞工處不會處理。</li>
              </ul>
              <p className="text-neutral-700 leading-relaxed">
                請注意，即使已符合上述要求及完成有關程序，僱主亦不應假設其輸入勞工申請會自動獲得批准。政府會考慮多項因素，包括僱主是否確實需要輸入勞工、在職本地僱員的數目等，按個別情況考慮所有申請。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section - ADDED BACKGROUND PLACEHOLDER */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight font-inter">
              關於我們
            </h2>
            <p className="mt-5 text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              福建中福對外勞務合作有限公司是14家經國家商務部批准,1從事對外勞務合作的企業之一我們致力於為香港及海外雇主提供全面、高效、合規的人力資源解決方案。
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl shadow-2xl overflow-hidden">
              <img src="/images/about-us.jpg" alt="公司團隊現代化會議場景" className="aspect-[4/3] object-cover w-full" />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight">我們的使命與價值</h3>
              <p className="text-neutral-600 leading-relaxed">
                憑藉多年的行業經驗和專業團隊，我們成功為眾多企業引進了高素質的內地勞工，涵蓋建築、護理、餐飲、零售等多個行業。我們深信，專業的服務和誠信的態度是建立長期合作夥伴關係的基石。
              </p>
              <ul className="space-y-4">
                {[ "專業合規", "高效匹配", "全程跟進", "客戶至上" ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckBadgeIcon className="flex-shrink-0 h-7 w-7 text-primary-500 mr-3 mt-0.5" />
                    <span className="text-neutral-700 font-medium text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-orange-500 tracking-tight font-inter">
              300+ 港澳合作伙伴
            </h2>
          </div>
          <Partners />
        </div>
      </section>

      {/* MERGED CONTACT US SECTION */}
      <section id="contact-section-merged" className="py-16 sm:py-20 lg:py-24 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="bg-neutral-50 p-8 rounded-xl shadow-xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-600 mb-6 tracking-tight font-inter">聯絡我們</h2>
              <p className="mb-6 text-neutral-600 leading-relaxed">如果您對我們的服務有任何疑問，或想了解更多關於香港外勞政策的資訊，歡迎隨時聯絡我們。</p>
              
              <div className="mb-8 space-y-4">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500 mr-3 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div className="text-neutral-700">
                    <strong className="block text-neutral-800">電話:</strong>
                    <div>香港: 6396 3660</div>
                    <div>澳門: 6396 3713</div>
                    <div>中國: 17207217872</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500 mr-3 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div className="text-neutral-700">
                    <strong className="block text-neutral-800">電郵:</strong>
                    info@zf-hk.com
                  </div>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500 mr-3 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div className="text-neutral-700">
                    <strong className="block text-neutral-800">地址:</strong>
                    香港銅鑼灣渣甸街54至58號富盛商業大廈12樓A室
                  </div>
                </div>
              </div>
              
              <div className="border border-neutral-300 rounded-lg overflow-hidden h-64 md:h-80 shadow-inner">
                <iframe
                  title="公司地址地圖"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.9643604210114!2d114.1832309758891!3d22.279339843653705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340400541ceead3b%3A0xfb7aa67297e746d2!2s58%20%E5%8F%B7%2C%20Prosperous%20Commercial%20Building%2C%2054-58%20Jardine&#39;s%20Bazaar%2C%20Causeway%20Bay%2C%20Hong%20Kong!5e0!3m2!1sen!2sus!4v1747155104419!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-neutral-50 p-8 rounded-xl shadow-xl">
              {contactFormSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center h-full flex flex-col justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h2 className="text-2xl font-bold text-green-800 mb-2">感謝您的查詢</h2>
                  <p className="text-green-700 text-lg">我們已收到您的留言，將盡快與您聯絡。</p>
                  <p className="text-sm text-neutral-500 mt-4">正在返回首頁...</p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleContactSubmit}>
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-6 tracking-tight font-inter">發送即時查詢</h2>
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-neutral-700">姓名</label>
                    <input 
                      type="text" 
                      name="name"
                      id="name"
                      value={contactFormData.name}
                      onChange={handleContactChange}
                      className={`w-full border ${contactFormErrors.name ? 'border-red-500' : 'border-neutral-300'} rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm`} 
                      placeholder="請輸入您的姓名" 
                    />
                    {contactFormErrors.name && <p className="text-red-600 text-sm mt-1.5">{contactFormErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-neutral-700">電話號碼</label>
                    <input 
                      type="text" 
                      name="phone"
                      id="phone"
                      value={contactFormData.phone}
                      onChange={handleContactChange}
                      className={`w-full border ${contactFormErrors.phone ? 'border-red-500' : 'border-neutral-300'} rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm`} 
                      placeholder="請輸入您的電話號碼" 
                    />
                    {contactFormErrors.phone && <p className="text-red-600 text-sm mt-1.5">{contactFormErrors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-neutral-700">訊息內容</label>
                    <textarea 
                      name="message"
                      id="message"
                      value={contactFormData.message}
                      onChange={handleContactChange}
                      className={`w-full border ${contactFormErrors.message ? 'border-red-500' : 'border-neutral-300'} rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm`} 
                      rows={5} 
                      placeholder="請輸入您的查詢內容" 
                    />
                    {contactFormErrors.message && <p className="text-red-600 text-sm mt-1.5">{contactFormErrors.message}</p>}
                  </div>
                  {submitError && (
                    <div className="p-3 bg-red-100 border border-red-300 rounded-md text-center">
                      <p className="text-red-700 text-sm">{submitError}</p>
                    </div>
                  )}
                  
                  <div className="flex gap-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex-1 bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? '發送中...' : '立即提交'}
                    </button>
                    <a 
                      href="https://wa.me/85263963660"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#128C7E] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 shadow-md flex items-center justify-center gap-2"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      WHATSAPP
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 