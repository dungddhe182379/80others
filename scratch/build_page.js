const fs = require('fs');
const path = require('path');

// Read the card database
const cardsJson = fs.readFileSync(path.join(__dirname, 'cards_data.json'), 'utf8');

// Read the generator script
const scriptContent = fs.readFileSync(path.join(__dirname, 'merge_cards_page_game.js'), 'utf8');

// Find the code string start and end
const lines = scriptContent.split(/\r?\n/);

// Find line starting with const code = `
let startLineIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim().startsWith('const code = `')) {
    startLineIdx = i;
    break;
  }
}

// Find line ending with `;
let endLineIdx = -1;
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].trim() === '`;') {
    endLineIdx = i;
    break;
  }
}

if (startLineIdx === -1 || endLineIdx === -1) {
  console.error("Could not find boundaries of the code string");
  process.exit(1);
}

// Extract lines of the actual code
let codeLines = lines.slice(startLineIdx, endLineIdx);

// The first line has const code = `"use client"; or const code = `...
// Let's strip the prefix const code = `
codeLines[0] = codeLines[0].substring(codeLines[0].indexOf('`') + 1);

let codeText = codeLines.join('\n');

// Replace the placeholder ${JSON.stringify(cards, null, 2)} with cardsJson
// In the source script, it is literally: const CARDS_DATA: Card[] = ${JSON.stringify(cards, null, 2)};
const placeholder = 'const CARDS_DATA: Card[] = ${JSON.stringify(cards, null, 2)};';
if (codeText.includes(placeholder)) {
  codeText = codeText.replace(placeholder, `const CARDS_DATA: Card[] = ${cardsJson};`);
} else {
  // Let's try matching with regex or checking if there's any whitespace variations
  console.log("Placeholder not found exactly, trying search & replace");
  const regex = /const CARDS_DATA: Card\[\]\s*=\s*\${JSON\.stringify\(cards,\s*null,\s*2\)\};/;
  if (regex.test(codeText)) {
    codeText = codeText.replace(regex, `const CARDS_DATA: Card[] = ${cardsJson};`);
  } else {
    console.error("Failed to find cards data placeholder!");
    process.exit(1);
  }
}

const outputPath = path.join(__dirname, '..', 'src', 'app', 'cards', 'page.tsx');
fs.writeFileSync(outputPath, codeText, 'utf8');
console.log("Successfully wrote target page file!");
