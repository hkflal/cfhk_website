export default function Head() {
  return (
    <>
      <title>福建中福對外勞務合作有限公司 | 香港外勞申請專家</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="專業外勞顧問，助您合法引進內地勞工，解決人力資源短缺。商務部核准勞務企業之一，30年行業經驗，服務超過百家香港企業。" />
      <link rel="canonical" href="https://cfhk.com/" />
      <meta name="robots" content="index, follow" />
      <meta name="keywords" content="香港外勞,內地勞工,外勞申請,勞務合作,外勞配額,福建中福,香港人力資源" />
      {/* Open Graph */}
      <meta property="og:title" content="福建中福對外勞務合作有限公司 | 香港外勞申請專家" />
      <meta property="og:description" content="專業外勞顧問，助您合法引進內地勞工，解決人力資源短缺。商務部核准勞務企業之一，30年行業經驗。" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://cfhk.com/" />
      <meta property="og:locale" content="zh_Hant_HK" />
      <meta property="og:site_name" content="福建中福對外勞務合作有限公司" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="福建中福對外勞務合作有限公司 | 香港外勞申請專家" />
      <meta name="twitter:description" content="專業外勞顧問，助您合法引進內地勞工，解決人力資源短缺。" />
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: '福建中福對外勞務合作有限公司',
          url: 'https://cfhk.com/',
          logo: 'https://cfhk.com/logo.svg',
          contactPoint: [{
            '@type': 'ContactPoint',
            telephone: '+852-6148-6144',
            contactType: 'customer service',
            areaServed: 'HK',
            availableLanguage: ['zh-Hant', 'en']
          }],
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'HK',
            addressLocality: 'Hong Kong'
          },
          sameAs: [
            'https://www.facebook.com/cfhk',
            'https://www.linkedin.com/company/cfhk'
          ]
        })
      }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: '外勞申請資格有哪些？',
              acceptedAnswer: {
                '@type': 'Answer',
                text: '需為香港註冊公司，並符合政府規定。申請的僱主必須是商業運作良好的合法企業，能夠提供合乎法規的工作條件和住宿安排。'
              }
            },
            {
              '@type': 'Question',
              name: '外勞住宿有何要求？',
              acceptedAnswer: {
                '@type': 'Answer',
                text: '必須提供合規住宿，符合香港勞工處的規定。住宿必須具備適當的設施，包括足夠的空間、安全的電力供應、乾淨的飲用水和適當的衛生設備。'
              }
            },
            {
              '@type': 'Question',
              name: '外勞申請流程需時多久？',
              acceptedAnswer: {
                '@type': 'Answer',
                text: '一般需時約3-4個月。流程包括提交申請表及所需資料、刊登本地招聘（1個月）、政府審批配額（約2個月）、安排面試及挑選人選、簽約及辦理簽證（約1個月）和安排來港工作。'
              }
            }
          ]
        })
      }} />
    </>
  );
} 