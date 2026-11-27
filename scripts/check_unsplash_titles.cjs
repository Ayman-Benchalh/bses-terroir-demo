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

function fetchPage(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        const title = html.match(/<title>([^<]+)<\/title>/)?.[1] || 'No title';
        const alt = html.match(/alt="([^"]+)"/)?.[1] || '';
        resolve({ statusCode: res.statusCode, title, alt });
      });
    }).on('error', e => resolve({ error: e.message }));
  });
}

async function run() {
  for (let i = 0; i < 10; i++) {
    const p = prods[i];
    const photoId = p.img.match(/photo-([a-zA-Z0-9-]+)/)?.[1];
    if (photoId) {
      const pageInfo = await fetchPage('https://unsplash.com/photos/' + photoId);
      console.log(`[${p.id}] ${p.nameFr}`);
      console.log(`   Photo: photo-${photoId}`);
      console.log(`   Title: ${pageInfo.title}`);
      console.log(`   Alt: ${pageInfo.alt}\n`);
    }
  }
}

run();
