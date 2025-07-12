import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_TC, Playfair_Display, Inter } from 'next/font/google';
import { NavigationBar } from '@/components/NavigationBar';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoSansTC = Noto_Sans_TC({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-tc',
});

const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: '福建中福對外勞務合作有限公司 | 香港外勞招聘專家',
  description: '福建中福對外勞務合作有限公司專門為香港雇主提供專業的外籍勞工招聘服務。我們幫助您簡化申請流程，提供高質量的勞務輸出方案。',
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant-HK" className={`${notoSansTC.variable} ${playfairDisplay.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-neutral-100 text-neutral-700 font-sans antialiased">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
          <NavigationBar />
        </div>
        <div className="pt-16 flex-grow">
          <main className="flex-grow">{children}</main>
        </div>
        <footer className="bg-neutral-900 text-neutral-300 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 mb-10">
              <div>
                <h3 className="text-xl font-playfair font-bold text-white mb-5">福建中福對外勞務合作</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  專業的香港外勞招聘服務機構，為香港雇主提供優質的外籍勞工招聘解決方案，解決各行業人力短缺問題。
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-5 tracking-wide">快捷連結</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="#services" className="hover:text-primary-400 transition-colors duration-150">服務方案</a></li>
                  <li><a href="#process" className="hover:text-primary-400 transition-colors duration-150">申請流程</a></li>
                  <li><a href="#about" className="hover:text-primary-400 transition-colors duration-150">關於我們</a></li>
                  <li><a href="#contact-section-merged" className="hover:text-primary-400 transition-colors duration-150">聯絡我們</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-5 tracking-wide">聯絡資訊</h3>
                <address className="text-sm text-neutral-400 not-italic space-y-3">
                  <p>香港銅鑼灣渣甸街54至58號<br/>富盛商業大廈12樓A室</p>
                  <p>電話: <a href="tel:+85244130760" className="hover:text-primary-400 transition-colors duration-150">+852 4413 0760</a></p>
                  <p>電郵: <a href="mailto:info@zf-hk.com" className="hover:text-primary-400 transition-colors duration-150">info@zf-hk.com</a></p>
                </address>
              </div>
            </div>
            <div className="border-t border-neutral-700 pt-8 text-center text-neutral-500 text-xs">
              <p>&copy; {new Date().getFullYear()} 福建中福對外勞務合作有限公司. 版權所有.</p>
              <p className="mt-1">香港職業介紹所牌照號碼：[在此處插入牌照號碼]</p> 
            </div>
          </div>
        </footer>
        <WhatsAppButton />
      </body>
    </html>
  );
}
