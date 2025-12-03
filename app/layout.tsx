import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Suspense } from 'react';
import PageViewTracker from '@/components/PageViewTracker';
import { Poppins, Playfair_Display, Send_Flowers, Noto_Serif_JP } from 'next/font/google';
import { Toaster } from 'sonner';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const sendFlowers = Send_Flowers({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-send-flowers',
  display: 'swap',
});

const notoSerifJP = Noto_Serif_JP({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-noto-serif-jp',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://photographer-saya.com/'),
  title: {
    default: 'photographer-saya',
    template: '%s | photographer-saya'
  },
  description: '東京・横浜で活動するフォトグラファーsaya（サヤ・さや・SAYA）。陸上・駅伝・マラソンなどのスポーツ撮影のほか、ポートレートやイベント撮影も承ります。写真撮影のご依頼はお気軽にどうぞ。',
  keywords: [
    'saya', 'SAYA', 'サヤ', 'さや', 'フォトグラファー', 'カメラマン', '写真家', 'カメラ', '写真撮影', '写真', 
    '陸上', '駅伝', 'マラソン', 'スポーツ撮影', 'ポートレート', 'イベント撮影', '商業撮影', '東京', '横浜',
    'photographer', 'photography', 'camera', 'portraits', 'events', 'commercial', 'sports', 'track and field', 'marathon', 'ekiden'
  ],
  authors: [{ name: 'saya' }],
  openGraph: {
    title: 'photographer-saya',
    description: '東京・横浜で活動するフォトグラファーsaya。陸上・駅伝・マラソンなどのスポーツ撮影のほか、ポートレートやイベント撮影も承ります。',
    url: 'https://photographer-saya.com/',
    siteName: 'photographer-saya',
    images: [
      {
        url: 'https://photographer-saya.com/saya-original.jpg',
        width: 1200,
        height: 630,
        alt: 'saya - photographer',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'photographer-saya',
    description: '東京・横浜で活動するフォトグラファーsaya。陸上・駅伝・マラソンなどのスポーツ撮影のほか、ポートレートやイベント撮影も承ります。',
    images: ['https://photographer-saya.com/saya-original.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-VYP9RZRVZ8';
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        {/* Google Fonts are provided via next/font */}
        {/* External image CDNs preconnect */}
        <link rel="preconnect" href="https://photographer-saya.com" />
        {/* favicon links */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#907e6e" />
        {/* viewport meta tag追加 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* JSON-LD構造化データ追加 */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          \"@context\": \"https://schema.org\",
          \"@type\": \"Person\",
          \"name\": \"saya\",
          \"jobTitle\": \"フォトグラファー\",
          \"url\": \"https://photographer-saya.com/\",
          \"image\": \"https://photographer-saya.com/saya-original.jpg\",
          \"sameAs\": [
            \"https://www.instagram.com/iam_saya_a/\",
            \"https://x.com/iam_saya_a\",
            \"https://www.instagram.com/saya_sports_films/\"
          ],
          \"contactPoint\": [{
            \"@type\": \"ContactPoint\",
            \"email\": \"contact@photographer-saya.com\",
            \"contactType\": \"customer support\",
            \"areaServed\": [\"JP\"],
            \"availableLanguage\": [\"ja\"]
          }],
          \"description\": \"東京・横浜で活動するフォトグラファー。陸上・駅伝・マラソンなどのスポーツ撮影やポートレート、イベント撮影を行っています。\"
        }` }} />

        {/* WebSite JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          \"@context\": \"https://schema.org\",
          \"@type\": \"WebSite\",
          \"name\": \"photographer-saya\",
          \"url\": \"https://photographer-saya.com/\"
        }` }} />
        {/* Google Analytics */}
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        {/* 画像保護スクリプト（.protect 内の画像に限定） */}
        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('contextmenu', function(e) {
            var el = e.target;
            if (el && el.closest && el.closest('.protect')) {
              if (el.tagName === 'IMG' || (el.closest('img'))) {
                e.preventDefault();
                return false;
              }
            }
          });
          document.addEventListener('dragstart', function(e) {
            var el = e.target;
            if (el && el.closest && el.closest('.protect')) {
              if (el.tagName === 'IMG' || (el.closest('img'))) {
                e.preventDefault();
                return false;
              }
            }
          });
        ` }} />
      </head>
      <body className={`${poppins.variable} ${playfair.variable} ${sendFlowers.variable} ${notoSerifJP.variable} font-sans antialiased`} suppressHydrationWarning>
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
