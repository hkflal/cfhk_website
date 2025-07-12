"use client";

export default function News() {
  const newsItems = [
    {
      id: 1,
      title: "香港新設勞工輸入途徑　預計引入10,000名專業人才",
      date: "2025-05-30",
      summary: "香港政府宣布透過新的勞工輸入途徑，預計引入10,000名八個職業類別的專業人才，年齡限制由原先建議的35歲提高至40歲。",
      content: "香港勞工及福利局局長孫玉菡於5月30日宣布新勞工輸入途徑的詳情，該途徑將透過兩個現有人才入境計劃實施，並將於6月30日生效。18至40歲的非學位專業人士可透過此途徑來港工作，獲得24或36個月簽證，並可延長三年。孫玉菡表示，將年齡限制設定為40歲更為理想，預期他們來港後可工作至65歲，即至少為香港經濟貢獻25年。重點招聘領域包括升降機維修工人、電氣技術員和安老院護理員等。",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop&crop=face",
      imageAlt: "香港勞工及福利局辦公大樓",
      sourceUrl: "https://www.scmp.com/news/hong-kong/hong-kong-economy/article/3312414/age-limit-non-local-skilled-workers-seeking-jobs-hong-kong-raised-35-40"
    },
    {
      id: 2,
      title: "香港收緊工會法例　以國家安全為由加強監管",
      date: "2025-02-20",
      summary: "香港政府提出修訂《工會條例》，永久禁止被定罪的國家安全罪行人士在工會任職，並要求所有外國資助須經當局審批。",
      content: "勞工及福利局於2月20日向立法會提交修訂《工會條例》的建議，以「更好地履行維護國家安全的職責」。修訂將永久禁止被定罪的國家安全罪行人士擔任工會職員或推廣人，並賦予工會註冊處處長權力，可基於國家安全理由拒絕工會註冊申請，且不得上訴。此外，工會必須向註冊處申請批准才可接受外國資助，並須聲明資助來源和用途。自2020年國家安全法實施以來，許多工會已解散，包括支持民主的香港職工會聯盟。",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&h=300&fit=crop",
      imageAlt: "香港工會集會場景",
      sourceUrl: "https://hongkongfp.com/2025/02/20/hong-kong-seeks-to-tighten-labour-union-laws-on-national-security-grounds/"
    },
    {
      id: 3,
      title: "香港開放非本地大學生兼職工作市場",
      date: "2024-10-18",
      summary: "香港政府宣布將允許全職非本地大學生從事兼職工作，此安排原本只適用於研究生，現擴展至約20,000名本科生。",
      content: "香港當局於10月18日宣布，作為最新施政報告的一部分，將於11月1日起允許全職非本地大學生從事兼職工作。政府發言人表示，此舉旨在透過更好地利用居住在香港的潛在人才來緩解本地人力短缺問題。這項措施有助吸引更多外國學生來港升學，並為他們畢業後在香港的長期發展做好準備，從而擴大本地潛在人才庫。研究生的豁免安排於去年11月實施，政府表示該安排獲得「正面反響」，決定在檢討一年後將計劃擴展至大學生。",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=300&fit=crop",
      imageAlt: "香港大學生求職招聘會場景",
      sourceUrl: "https://www.scmp.com/news/hong-kong/hong-kong-economy/article/3282992/hong-kong-allow-non-local-undergraduate-students-work-part-time-city"
    },
    {
      id: 4,
      title: "香港應對人口老化挑戰　勞動力短缺成經濟隱憂",
      date: "2024-04-26",
      summary: "專家指出香港人口老化問題嚴重，預計2027年勞動力短缺17萬人，需要全面的人口政策來應對挑戰。",
      content: "根據勞工及福利局估計，到2027年，香港將需要374萬勞動力，但預計人力供應僅為357萬，短缺17萬人。香港的生育率在2023年降至每名婦女0.751名嬰兒，遠低於人口自然更替率2.1。政府估計65歲及以上人口將從2022年中的20.8%上升至2028年的25.3%，到2069年達到35.1%。立法會議員容海恩建議政府應成立高層次機制或專責政策局，全面檢視提升生育率、加強長者及女性勞動參與等議題。經濟學家唐繼宜強調長期人口規劃的重要性，建議政府建立榜樣，引入退休公務員階段性退出期。",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&h=300&fit=crop",
      imageAlt: "香港長者工作場景",
      sourceUrl: "https://www.chinadailyasia.com/hk/article/581865"
    },
    {
      id: 5,
      title: "非華籍香港永久居民將獲發卡式證件　便利內地通關",
      date: "2024-07-01",
      summary: "國家宣布非華籍香港永久居民將可申請卡式證件，享受自助通關便利，進一步加強粵港澳大灣區人才流動。",
      content: "香港特別行政區政府於7月1日熱烈歡迎國家宣布，非華籍香港永久居民將可申請卡式證件（《港澳居民來往內地通行證》（非中國籍人士）），以便利在內地各管制站的通關安排。國家出入境管理局將於7月10日開始簽發該證件。行政長官李家超表示，持證人士將能夠在內地管制站享用自助通關服務，大大提升通關效率。此措施不限於任何國籍或行業，充分突顯香港在「一國兩制」下的獨特地位，有助香港保持國際化特色和多元性，為全球各地公司和人才落戶香港提供重大誘因。",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
      imageAlt: "香港出入境管制站",
      sourceUrl: "https://www.info.gov.hk/gia/general/202407/01/P2024070100182.htm"
    },
    {
      id: 6,
      title: "香港2025年首季毒品濫用個案下降　「太空油」成年輕人主要濫用物質",
      date: "2025-06-12",
      summary: "香港禁毒常務委員會公布2025年首季毒品濫用統計，整體個案下降至1,644宗，但「太空油」在年輕人中的濫用情況值得關注。",
      content: "禁毒常務委員會於6月12日檢視2025年首季的中央毒品登記資料庫數據，呈報的吸毒者總數為1,644人，較2024年同期的1,738人有所下降。海洛英仍是最常被濫用的毒品，其次是可卡因和大麻。在21歲以下的呈報吸毒者中，共有285人，其中128宗涉及新興毒品「太空油」，已超越大麻成為年輕人最常濫用的物質。為應對「太空油」問題，政府已將依託咪酯及其三種類似物質列為《危險藥物條例》下的危險藥物，並計劃將分類擴展至其他依託咪酯類似物質。",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop",
      imageAlt: "香港禁毒教育宣傳活動",
      sourceUrl: "https://www.dimsumdaily.hk/hong-kong-reports-1644-drug-abuse-cases-in-q1-2025-marking-a-decline-from-1738-in-2024/"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-primary mb-6">最新消息</h1>
      <p className="text-lg mb-8">掌握香港外勞政策、勞工法規及相關政策的最新動態，為您的業務決策提供及時準確的資訊。</p>
      
      <div className="space-y-10">
        {newsItems.map((item) => (
          <article key={item.id} className="border-b border-gray-200 pb-8 last:border-b-0">
            <div className="flex flex-col md:flex-row gap-6">
              {/* News image */}
              <div className="w-full md:w-1/3 h-48 bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.imageAlt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    const img = e.target as HTMLImageElement;
                    const fallback = img.nextSibling as HTMLElement;
                    img.style.display = 'none';
                    fallback.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center text-blue-600 text-sm font-medium" style={{display: 'none'}}>
                  <div className="text-center p-4">
                    <svg className="w-12 h-12 mx-auto mb-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    {item.imageAlt}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                <h2 className="text-2xl font-bold mb-3 text-primary">{item.title}</h2>
                <p className="text-gray-700 mb-4 font-medium">{item.summary}</p>
                <div className="text-gray-800 leading-relaxed mb-4">{item.content}</div>
                {item.sourceUrl && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                      資料來源：
                      <a 
                        href={item.sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-700 underline ml-1"
                      >
                        查看原文
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      
      <div className="mt-10 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 disabled:opacity-50 disabled:pointer-events-none" disabled>
            上一頁
          </button>
          <span className="text-gray-600">第 1 頁，共 1 頁</span>
          <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 disabled:opacity-50 disabled:pointer-events-none" disabled>
            下一頁
          </button>
        </div>
      </div>
    </div>
  );
} 