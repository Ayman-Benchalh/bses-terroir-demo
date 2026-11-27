const https = require('https');

function fetchPage(id, path) {
  const options = {
    hostname: 'unsplash.com',
    path: path,
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  };
  https.get(options, res => {
    let html = '';
    res.on('data', d => html += d);
    res.on('end', () => {
      const match = html.match(/<title>([^<]+)<\/title>/);
      console.log(id, '=>', match ? match[1] : 'No title found');
    });
  }).on('error', err => console.error(id, err.message));
}

fetchPage('prod-fruit-04 (1601004890684)', '/photos/1601004890684-d8cbf643f5f2');
fetchPage('prod-fruit-02 (1582979512210)', '/photos/1582979512210-99b6a53386f9');
fetchPage('prod-fruit-03 (1615485500704)', '/photos/1615485500704-8e990f9900f7');
