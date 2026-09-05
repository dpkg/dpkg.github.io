import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import styles from './json-formatter.module.css';

const defaultJSON = `{
  "name": "JSON Formatter",
  "version": "1.0.0",
  "features": [
    "Validate JSON syntax",
    "Pretty print with indentation",
    "Minify to single line",
    "Copy and download"
  ],
  "valid": true
}`;

export default function JSONFormatter() {
  const [input, setInput] = useState(defaultJSON);
  
  // Validate JSON in real-time
  const { error, isValid, minifiedSize } = useMemo(() => {
    const trimmed = input.trim();
    if (trimmed === '') {
      return { error: '', isValid: false, minifiedSize: 0 };
    }
    
    try {
      const parsed = JSON.parse(trimmed);
      const minified = JSON.stringify(parsed);
      return { 
        error: '', 
        isValid: true, 
        minifiedSize: minified.length 
      };
    } catch (err) {
      return { 
        error: err.message, 
        isValid: false, 
        minifiedSize: 0 
      };
    }
  }, [input]);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
    } catch (err) {
      // Error already shown, don't update
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
    } catch (err) {
      // Error already shown, don't update
    }
  };

  const handleCopy = () => {
    if (!error) {
      navigator.clipboard.writeText(input);
    }
  };

  const handleClear = () => {
    setInput('');
  };

  const handleReset = () => {
    setInput(defaultJSON);
  };

  const handleDownload = () => {
    if (!error) {
      const element = document.createElement('a');
      const file = new Blob([input], { type: 'application/json' });
      element.href = URL.createObjectURL(file);
      element.download = 'data.json';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch (err) {
      // Clipboard read failed, error shown by system
    }
  };


  return (
    <Layout
      title="JSON Formatter & Validator"
      description="Format, validate, and minify JSON with real-time preview"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>JSON Formatter & Validator</h1>
          <p>Validate, format, and minify JSON instantly</p>
        </div>

        <div className={styles.controls}>
          <button onClick={handleFormat} className={styles.button}>
            Format
          </button>
          <button onClick={handleMinify} className={styles.button}>
            Minify
          </button>
          <button onClick={handleCopy} disabled={!isValid} className={styles.button}>
            Copy
          </button>
          <button onClick={handlePaste} className={styles.button}>
            Paste
          </button>
          <button onClick={handleClear} className={styles.button}>
            Clear
          </button>
          <button onClick={handleReset} className={styles.button}>
            Reset
          </button>
          <button onClick={handleDownload} disabled={!isValid} className={styles.button}>
            Download
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.editor}>
            <h2>Input</h2>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here..."
              className={styles.textarea}
            />
          </div>

          <div className={styles.sidebar}>
            <div className={styles.info}>
              <h3>Status</h3>
              {error ? (
                <div className={styles.errorMessage}>
                  <div className={styles.errorLabel}>❌ Invalid JSON</div>
                  <div className={styles.errorDetails}>{error}</div>
                </div>
              ) : input.trim() === '' ? (
                <div className={styles.infoMessage}>
                  <div>📝 Paste or type JSON</div>
                </div>
              ) : (
                <div className={styles.successMessage}>
                  <div className={styles.successLabel}>✅ Valid JSON</div>
                </div>
              )}
            </div>

            <div className={styles.stats}>
              <h3>Stats</h3>
              <div className={styles.statLine}>
                <span>Characters:</span>
                <span>{input.length}</span>
              </div>
              <div className={styles.statLine}>
                <span>Lines:</span>
                <span>{input.split('\n').length}</span>
              </div>
              {isValid && (
                <>
                  <div className={styles.statLine}>
                    <span>Size (formatted):</span>
                    <span>{(input.length / 1024).toFixed(2)} KB</span>
                  </div>
                  <div className={styles.statLine}>
                    <span>Minified size:</span>
                    <span>{(minifiedSize / 1024).toFixed(2)} KB</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
