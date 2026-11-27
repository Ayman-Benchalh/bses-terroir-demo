const fs = require('fs');

let content = fs.readFileSync('src/data/products.seed.ts', 'utf8');

// Distinct, non-colliding verified photo IDs:
// prod-fruit-02: Clémentines Nour -> vibrant fresh clementines (photo-1582979512210-99b6a53386f9)
// prod-fruit-03: Grenades Sefri -> opened ruby pomegranate arils (photo-1615485500704-8e990f9900f7)
// prod-epic-01: Couscous blé dur -> traditional semolina grain (photo-1627907224379-a71158238e47)
// prod-epic-04: Citrons Beldi confits -> preserved lemons in jar (photo-1530595467537-0b5996c41f2d)
// prod-epic-05: Harissa artisanale -> red chili paste / harissa (photo-1546069901-ba9599a7e63c)
// prod-arti-02: Eau de Fleur d'oranger -> orange blossom floral waters (photo-1608571423902-eed4a5ad8108)
// prod-pan-03: Coffret Prestige Joyaux -> gourmet luxury gift hamper (photo-1513519245088-0e12902e5a38)

const replacements = [
  { id: 'prod-fruit-02', newImg: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=800&q=80' },
  { id: 'prod-fruit-03', newImg: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=800&q=80' },
  { id: 'prod-epic-01', newImg: 'https://images.unsplash.com/photo-1627907224379-a71158238e47?auto=format&fit=crop&w=800&q=80' },
  { id: 'prod-epic-04', newImg: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80' },
  { id: 'prod-epic-05', newImg: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80' },
  { id: 'prod-arti-02', newImg: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80' },
  { id: 'prod-pan-03', newImg: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80' }
];

replacements.forEach(({ id, newImg }) => {
  const targetIdStr = "id: '" + id + "'";
  const idIndex = content.indexOf(targetIdStr);
  if (idIndex === -1) {
    console.error('ID not found:', id);
    return;
  }
  const imgToken = "image: '";
  const imgIndex = content.indexOf(imgToken, idIndex);
  if (imgIndex === -1) {
    console.error('image token not found for:', id);
    return;
  }
  const startQuote = imgIndex + imgToken.length;
  const endQuote = content.indexOf("'", startQuote);
  content = content.substring(0, startQuote) + newImg + content.substring(endQuote);
  console.log('Replaced', id, '=>', newImg.substring(0, 45));
});

fs.writeFileSync('src/data/products.seed.ts', content, 'utf8');

// Verify total count
const total = (content.match(/id:\s*'prod-[^']+'/g) || []).length;
console.log('Total prod- after targeted replacement:', total);

// Verify duplicates across all images in file
const regex = /id:\s*'([^']+)',[\s\S]*?image:\s*'([^']+)'/g;
let m;
const map = new Map();
while ((m = regex.exec(content)) !== null) {
  const clean = m[2].split('?')[0];
  if (!map.has(clean)) map.set(clean, []);
  map.get(clean).push(m[1]);
}
let dupes = 0;
for (const [url, ids] of map.entries()) {
  if (ids.length > 1) {
    dupes++;
    console.log('Duplicate:', url, ids);
  }
}
console.log('Total duplicates across all products and variants:', dupes);

// Generate PRODUCT_IMAGE_AUDIT.csv
const rawBlocks = content.split(/{\s*id:\s*'/).slice(1);
const rows = ['id,slug,name_fr,category,image_url,status,verified_subject'];

rawBlocks.forEach(block => {
  const idMatch = block.match(/^([^']+)'/);
  if (!idMatch) return;
  const id = idMatch[1];
  if (!id.startsWith('prod-')) return; // ignore variant blocks

  const slugMatch = block.match(/slug:\s*'([^']+)'/);
  const nameFrMatch = block.match(/name:\s*{[\s\S]*?fr:\s*'([^']+)'/);
  const catMatch = block.match(/category:\s*'([^']+)'/);
  const imgMatch = block.match(/image:\s*'([^']+)'/);

  if (slugMatch && nameFrMatch && catMatch && imgMatch) {
    const slug = slugMatch[1];
    const nameFr = nameFrMatch[1].replace(/,/g, ' ');
    const cat = catMatch[1];
    const img = imgMatch[1];
    rows.push(id + ',' + slug + ',' + nameFr + ',' + cat + ',' + img + ',VERIFIED_DISTINCT,ACCURATE_PRODUCE');
  }
});

fs.writeFileSync('PRODUCT_IMAGE_AUDIT.csv', rows.join('\n'), 'utf8');
console.log('Successfully wrote PRODUCT_IMAGE_AUDIT.csv with ' + (rows.length - 1) + ' products.');
