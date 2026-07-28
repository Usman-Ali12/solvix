const fs = require('fs');

const files = [
  '.env.example',
  '.gitignore',
  'README.md',
  'app/api/contact/route.ts',
  'app/globals.css',
  'app/layout.tsx',
  'app/page.tsx',
  'components/ContactForm.tsx',
  'components/Footer.tsx',
  'next-env.d.ts',
];

const conflictPattern = /<<<<<<< HEAD\r?\n([\s\S]*?)\r?\n=======\r?\n[\s\S]*?\r?\n>>>>>>> [^\n]*\r?\n?/g;

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.log(`SKIP (not found): ${file}`);
    continue;
  }
  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes('<<<<<<<')) {
    console.log(`SKIP (no conflict): ${file}`);
    continue;
  }
  const fixed = content.replace(conflictPattern, '$1\n');
  fs.writeFileSync(file, fixed, 'utf8');
  console.log(`FIXED: ${file}`);
}