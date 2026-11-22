import type { Metadata, Viewport } from 'next';
import './globals.css';

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
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=window.location.pathname;if(p.indexOf('/ar')===0||p.indexOf('/ar/')===0){document.documentElement.dir='rtl';document.documentElement.lang='ar';}else if(p.indexOf('/en')===0||p.indexOf('/en/')===0){document.documentElement.dir='ltr';document.documentElement.lang='en';}else{document.documentElement.dir='ltr';document.documentElement.lang='fr';}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#FFFCF5] text-[#282E23] antialiased selection:bg-[#315B3C] selection:text-white">
        {children}
      </body>
    </html>
  );
}
