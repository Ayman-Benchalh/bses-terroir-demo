import type { Metadata, Viewport } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  style: ['normal', 'italic'],
  weight: ['400', '700', '900'],
  display: 'swap',
});

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TERROIR — Marché d’Exception & Produits du Terroir Marocain | BSES',
  description:
    'Plateforme e-commerce haut de gamme de produits frais et artisanaux du terroir marocain. Coopératives locales, fruits, légumes, huiles d’olive, argan, miels et épices.',
  keywords: [
    'terroir marocain',
    'fruits et légumes frais maroc',
    'huile d argan culinaire',
    'huile d olive ouezzane',
    'safran taliouine',
    'miel atlas',
    'amlou artisanal',
    'bses demo',
  ],
  authors: [{ name: 'BSES — Benchalh Solution E-commerce System' }],
  metadataBase: new URL('https://bses-terroir-demo.vercel.app'),
  openGraph: {
    title: 'TERROIR — Le meilleur de nos terres, chez vous',
    description: 'Marché d’exception et coopératives agricoles du Maroc.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${fraunces.variable} ${jakartaSans.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=window.location.pathname;if(p.indexOf('/ar')===0||p.indexOf('/ar/')===0){document.documentElement.dir='rtl';document.documentElement.lang='ar';}else if(p.indexOf('/en')===0||p.indexOf('/en/')===0){document.documentElement.dir='ltr';document.documentElement.lang='en';}else{document.documentElement.dir='ltr';document.documentElement.lang='fr';}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#F8F7F0] text-[#1C1A22] antialiased selection:bg-[#352B3E] selection:text-[#D4E84A]">
        {children}
      </body>
    </html>
  );
}
