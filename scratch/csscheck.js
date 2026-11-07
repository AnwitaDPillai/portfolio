const fs = require('fs'), path = require('path');
const root = 'c:/Users/ASUS/Documents/GitHub Projects/portfolio';
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');

// Find brace balance per line
let depth = 0;
const lines = css.split('\n');
let mismatches = [];
lines.forEach((line, i) => {
  const opens = (line.match(/\{/g) || []).length;
  const closes = (line.match(/\}/g) || []).length;
  depth += opens - closes;
  if (depth < 0) {
    mismatches.push({ line: i + 1, depth, text: line.trim() });
    depth = 0; // reset to continue scanning
  }
});

if (depth !== 0 || mismatches.length > 0) {
  console.error('CSS brace mismatch! Final depth:', depth);
  mismatches.forEach(m => console.error(`  Line ${m.line}: "${m.text}" depth=${m.depth}`));
  if (depth !== 0) {
    // show last open block
    console.log('Scanning for unclosed blocks...');
    let d = 0;
    lines.forEach((line, i) => {
      const o = (line.match(/\{/g) || []).length;
      const c = (line.match(/\}/g) || []).length;
      d += o - c;
      if (d > 0 && i > lines.length - 50) {
        console.log(`  L${i+1} [d=${d}]: ${line.trim()}`);
      }
    });
  }
} else {
  console.log('[OK] CSS braces balanced');
}
