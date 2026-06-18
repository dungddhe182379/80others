const fs = require('fs');
const path = require('path');

// Read card data
const cardsJson = fs.readFileSync(path.join(__dirname, 'cards_data.json'), 'utf8');

// Read the homepage template
let templateContent = fs.readFileSync(path.join(__dirname, 'homepage_template.txt'), 'utf8');

// Replace the placeholder
const placeholder = '// CARDS_DATA_PLACEHOLDER';
const replacement = `const CARDS_DATA: Card[] = ${cardsJson};`;

if (templateContent.includes(placeholder)) {
  templateContent = templateContent.replace(placeholder, replacement);
  console.log("Successfully substituted cards data on homepage template.");
} else {
  console.error("Placeholder not found in template!");
  process.exit(1);
}

// Write the output to target
const outputPath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
fs.writeFileSync(outputPath, templateContent, 'utf8');
console.log("Successfully wrote target homepage page.tsx file!");
