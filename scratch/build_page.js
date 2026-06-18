const fs = require('fs');
const path = require('path');

// Read the card database
const cardsJson = fs.readFileSync(path.join(__dirname, 'cards_data.json'), 'utf8');

// Read the text template
let template = fs.readFileSync(path.join(__dirname, 'merge_cards_page_game.txt'), 'utf8');

// Replace the placeholder
const placeholder = '// CARDS_DATA_PLACEHOLDER';
const replacement = `const CARDS_DATA: Card[] = ${cardsJson};`;

if (template.includes(placeholder)) {
  template = template.replace(placeholder, replacement);
  console.log("Successfully substituted cards data on cards page template.");
} else {
  console.error("Placeholder not found in template!");
  process.exit(1);
}

// Write the output to target
const outputPath = path.join(__dirname, '..', 'src', 'app', 'cards', 'page.tsx');
fs.writeFileSync(outputPath, template, 'utf8');
console.log("Successfully wrote target page.tsx file!");
