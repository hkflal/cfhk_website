export default function News() {
  const newsItems = [
    {
      id: 1,
      title: "2024年香港外勞政策最新動向",
      date: "2024-07-20",
      summary: "香港特別行政區政府最近公佈了2024年度的外勞政策調整方案，重點放在簡化申請流程和擴大配額範圍。",
      content: "香港特別行政區政府勞工處於本月初公佈了2024年度外勞政策的調整方案。新政策將於9月1日起正式實施，主要變化包括：簡化申請流程，縮短審批時間；擴大行業配額範圍，增加製造業和服務業的配額；調整最低薪資標準，確保外勞得到合理報酬。這些調整旨在緩解香港勞動力短缺問題，同時維護本地勞工就業權益。",
      imageAlt: "香港勞工處大樓"
    },
    {
      id: 2,
      title: "外勞住宿規定更新與常見問題",
      date: "2024-07-10",
      summary: "為確保外勞有適當的生活條件，香港勞工處更新了住宿規定。本文詳細解析新規定及常見問題。",
      content: "香港勞工處近期對外勞住宿規定進行了更新，新規定要求僱主必須提供符合安全和衛生標準的住宿環境。每位外勞的居住空間不得少於7平方米，必須配備基本生活設施，包括床鋪、衣櫃、飲用水設備和衛生間。僱主需在申請外勞前準備好住宿場所，並接受勞工處的檢查。我們整理了僱主最常問的問題，包括如何準備住宿檢查、費用分擔和責任界定等。",
      imageAlt: "標準外勞宿舍示例"
    },
    {
      id: 3,
      title: "重要通知：福建中福對外勞務合作有限公司辦公室搬遷",
      date: "2024-06-25",
      summary: "本公司香港辦事處已於6月25日正式搬遷至新址，提供更便捷的服務環境。",
      content: "為了提供更優質的服務，福建中福對外勞務合作有限公司香港辦事處已於2024年6月25日正式搬遷至香港中環金融街8號國際金融中心二期。新辦公室交通便利，環境寬敞，能夠更好地接待客戶和提供諮詢服務。辦公時間維持不變，為週一至週五上午9時至下午6時，週六上午9時至下午1時。歡迎各位客戶蒞臨指導。",
      imageAlt: "公司新辦公室外觀"
    },
    {
      id: 4,
      title: "如何提高外勞申請成功率？專家分享經驗",
      date: "2024-06-15",
      summary: "本公司資深顧問分析近期外勞申請案例，分享提高申請成功率的關鍵因素。",
      content: "根據我們過去半年處理的外勞申請案例分析，申請成功率與幾個關鍵因素密切相關。首先，企業需提供完整準確的申請材料，特別是財務證明和業務證明；其次，合理說明為何需要外勞而非本地勞工；第三，符合行業薪資標準和工作條件要求；最後，提前規劃申請時間，預留充足的審批期。本文詳細分析了這些因素，並提供實用的申請技巧，幫助企業提高申請成功率。",
      imageAlt: "申請文件整理示例"
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-primary mb-6">新聞中心</h1>
      <p className="text-lg mb-8">瀏覽最新香港外勞政策、行業動態及公司消息，掌握第一手資訊。</p>
      
      <div className="space-y-10">
        {newsItems.map((item) => (
          <article key={item.id} className="border-b border-gray-200 pb-8 last:border-b-0">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Placeholder for image */}
              <div className="w-full md:w-1/3 h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                {item.imageAlt}
              </div>
              <div className="w-full md:w-2/3">
                <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                <h2 className="text-2xl font-bold mb-3 text-primary">{item.title}</h2>
                <p className="text-gray-700 mb-4">{item.summary}</p>
                <div className="text-gray-800">{item.content}</div>
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