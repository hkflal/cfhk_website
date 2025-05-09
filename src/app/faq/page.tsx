"use client";

import { useState } from 'react';

// Expanded FAQ content with additional questions
const faqs = [
  {
    question: '外勞申請資格有哪些？',
    answer: '需為香港註冊公司，並符合政府規定。申請公司需證明已嘗試本地招聘但無法滿足人力需求。公司需具備良好的營運記錄和財務狀況，以確保能夠負擔僱用外勞的相關費用。',
  },
  {
    question: '外勞住宿有何要求？',
    answer: '必須提供合規住宿，詳情可諮詢我們。根據相關法規，僱主必須為外勞提供符合標準的住宿條件，包括適當的生活空間、基本設施和安全措施。住宿費用通常由僱主和僱員共同協商確定。',
  },
  {
    question: '外勞申請流程需時多久？',
    answer: '一般需時約3-4個月。申請流程包括本地招聘廣告、勞工處審批、面試安排、簽證申請等多個步驟，每個步驟都需要一定時間處理和審核。',
  },
  {
    question: '申請費用大約是多少？',
    answer: '申請費用因不同情況而異，通常包括申請手續費、簽證費、體檢費等。詳細費用清單可聯繫我們獲取最新資訊。',
  },
  {
    question: '僱主有哪些法律責任？',
    answer: '僱主需要簽訂合法僱傭合約、提供符合標準的工作條件和住宿環境、支付約定工資、購買必要保險、遵守相關勞工法例等。違反相關規定可能面臨罰款或其他法律後果。',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-primary mb-8">常見問題</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {faqs.map((faq, idx) => (
          <div key={idx} className={`border-b border-gray-100 ${idx === faqs.length - 1 ? 'border-b-0' : ''}`}>
            <button
              className="w-full text-left flex justify-between items-center p-5 font-medium text-lg hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
              onClick={() => toggleQuestion(idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-${idx}`}
            >
              <span className="pr-6">{faq.question}</span>
              <span className={`text-primary transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </button>
            <div
              id={`faq-answer-${idx}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
              aria-hidden={openIndex !== idx}
            >
              <div className="p-5 pt-0 bg-gray-50/50 text-gray-700 border-t border-gray-100">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-primary mb-4">尚有更多問題?</h2>
        <p className="mb-4">如果您有其他問題，請隨時與我們聯繫。我們的專業團隊將樂意為您提供更多資訊。</p>
        <a 
          href="/contact" 
          className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded hover:bg-primary-dark transition"
        >
          聯絡我們
        </a>
      </div>
    </div>
  );
} 