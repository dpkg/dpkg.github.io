import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from '@theme/Layout';
import styles from './markdown-preview.module.css';

const defaultMarkdown = `# Welcome to Markdown Previewer

## Live Preview
Type or paste your markdown on the left, and see the HTML preview on the right.

### Features
- **Real-time preview** as you type
- **Syntax highlighting** for code blocks
- **Tables**, lists, links, and more

### Code Example
\`\`\`javascript
function hello(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

> This is a blockquote. You can use it to highlight important information.

---

### Try it!
Edit the markdown on the left to see the preview update instantly.
`;

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  const handleClear = () => {
    setMarkdown('');
  };

  const handleReset = () => {
    setMarkdown(defaultMarkdown);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([markdown], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'markdown.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Layout
      title="Markdown to HTML Previewer"
      description="Live markdown to HTML preview tool"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Markdown Preview</h1>
          <p>Write markdown on the left, see HTML preview on the right</p>
        </div>

        <div className={styles.controls}>
          <button onClick={handleClear} className={styles.button}>
            Clear
          </button>
          <button onClick={handleReset} className={styles.button}>
            Reset
          </button>
          <button onClick={handleDownload} className={styles.button}>
            Download
          </button>
        </div>

        <div className={styles.preview}>
          <div className={styles.editor}>
            <h2>Your Markdown Input</h2>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Enter your markdown here..."
              className={styles.textarea}
            />
          </div>

          <div className={styles.output}>
            <h2>HTML Preview</h2>
            <div className={styles.htmlPreview}>
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
