const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..', 'public', 'assets', '5cards');

const categoryMapping = {
  '1. KHỞI ĐỘNG': 'WARM',
  '2. TƯƠNG TÁC': 'PLAY',
  '3. THẤU HIỂU': 'BOND',
  '4. YÊU THƯƠNG': 'HEART',
  '5. AN TOÀN_': 'SAFE'
};

const symbolMapping = {
  'GD': 'GD',
  'BT': 'BT',
  'BM-C': 'BM-C',
  'BMC': 'BM-C',
  'ACE': 'ACE',
  'OB-C': 'OB-C',
  'OBC': 'OB-C',
  'TH': 'TH',
  'AT': 'AT'
};

const cards = [];
let idCounter = 1;

function scanDir(dirPath, category, symbol = null) {
  const items = fs.readdirSync(dirPath);
  
  // Find back image
  let backImageName = items.find(item => item.startsWith('mat_sau') || item.startsWith('card_back'));
  let backImageUrl = '';
  if (backImageName) {
    const relativePath = path.relative(path.join(__dirname, '..', 'public'), path.join(dirPath, backImageName));
    backImageUrl = '/' + relativePath.replace(/\\/g, '/');
  }

  // Iterate items
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const folderName = item;
      const subCategory = category;
      const subSymbol = symbolMapping[folderName] || folderName;
      scanDir(fullPath, subCategory, subSymbol);
    } else {
      // It's a file
      if (item.endsWith('.png')) {
        // Exclude back image
        if (item.startsWith('mat_sau') || item.startsWith('card_back')) {
          continue;
        }

        const relativePath = path.relative(path.join(__dirname, '..', 'public'), fullPath);
        const frontImageUrl = '/' + relativePath.replace(/\\/g, '/');
        
        let cardSymbol = symbol;
        if (category === 'SAFE') {
          cardSymbol = 'AT';
        }

        cards.push({
          id: `c${idCounter++}`,
          category: category,
          symbol: cardSymbol,
          frontImage: frontImageUrl,
          backImage: backImageUrl
        });
      }
    }
  }
}

// Start scanning
const mainCategories = fs.readdirSync(rootDir);
for (const catDir of mainCategories) {
  const fullPath = path.join(rootDir, catDir);
  if (fs.statSync(fullPath).isDirectory()) {
    const categoryKey = categoryMapping[catDir];
    if (categoryKey) {
      scanDir(fullPath, categoryKey);
    }
  }
}

console.log(JSON.stringify(cards, null, 2));
fs.writeFileSync(path.join(__dirname, 'cards_data.json'), JSON.stringify(cards, null, 2));
