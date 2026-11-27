const https = require('https');
const fs = require('fs');

const content = fs.readFileSync('src/data/products.seed.ts', 'utf8');
const prods = [];
const blocks = content.split(/id:\s*'(prod-[^']+)'/);
for (let i = 1; i < blocks.length; i += 2) {
  const id = blocks[i];
  const body = blocks[i+1];
  const nameFr = body.match(/fr:\s*'([^']+)'/)?.[1] || '';
  const img = body.match(/image:\s*'([^']+)'/)?.[1] || '';
  const cat = body.match(/category:\s*'([^']+)'/)?.[1] || '';
  prods.push({ id, nameFr, cat, img });
}

console.log('Total products to inspect:', prods.length);

async function inspectPhoto(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ statusCode: res.statusCode, location: res.headers.location });
    }).on('error', e => resolve({ error: e.message }));
  });
}

async function run() {
  const map = new Map();
  for (const p of prods) {
    if (!map.has(p.img)) {
      map.set(p.img, []);
    }
    map.get(p.img).push(p.id + ' (' + p.nameFr + ')');
  }

  console.log('\n--- Duplicate image detection ---');
  let dups = 0;
  for (const [img, items] of map.entries()) {
    if (items.length > 1) {
      dups++;
      console.log('REUSED IMAGE:', img.slice(0, 60));
      items.forEach(it => console.log('   ->', it));
    }
  }
  console.log('Total reused images across distinct products:', dups);
}

run();
