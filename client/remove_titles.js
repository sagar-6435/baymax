const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.jsx')) {
      if (file === 'HomeDashboard.jsx') continue;
      
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remove <Text style={styles.title}>...</Text>
      let newContent = content.replace(/<Text style=\{styles\.title\}>.*?<\/Text>\s*/g, '');
      
      // Remove <Text style={styles.header}>...</Text>
      newContent = newContent.replace(/<Text style=\{styles\.header\}>.*?<\/Text>\s*/g, '');

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log(`Updated ${file}`);
      }
    }
  }
}

processDirectory(path.join(__dirname, 'src', 'pages'));
console.log('Done removing titles!');
