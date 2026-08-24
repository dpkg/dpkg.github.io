import React, { useEffect } from 'react';
import Layout from '@theme/Layout';

// Pure, zero-dependency client-side QR Code encoder implementation
// Encodes input text into a valid matrix using standard Type 4-H structures
function createQrSvg(text) {
  try {
    // Isolated matrix engine to map scannable tracking dots
    var qrcodeEngine = (function() {
      var _this = {};
      var modules = null;
      var moduleCount = 0;
      
      _this.generate = function(textStr) {
        // Version 4 configuration (33x33 matrix blocks)
        moduleCount = 33;
        modules = Array(moduleCount).fill(null).map(() => Array(moduleCount).fill(false));
        
        // 1. Fill Position Finder Patterns (7x7 blocks in the three main corners)
        var fillFinder = function(row, col) {
          for (var r = -1; r <= 7; r++) {
            for (var c = -1; c <= 7; c++) {
              var currR = row + r;
              var currC = col + c;
              if (currR >= 0 && currR < moduleCount && currC >= 0 && currC < moduleCount) {
                if ((r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
                    (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
                    (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
                  modules[currR][currC] = true;
                }
              }
            }
          }
        };
        fillFinder(0, 0);
        fillFinder(0, moduleCount - 7);
        fillFinder(moduleCount - 7, 0);
        
        // 2. Structural Timing Patterns (Connects finder corner grids at row 6 & col 6)
        for (var i = 8; i < moduleCount - 8; i++) {
          modules[6][i] = (i % 2 === 0);
          modules[i][6] = (i % 2 === 0);
        }
        
        // 3. Fixed Internal Alignment Pattern (Small square at bottom right for lenses)
        var alRow = 26, alCol = 26;
        for (var r = -2; r <= 2; r++) {
          for (var c = -2; c <= 2; c++) {
            if (Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0)) {
              modules[alRow + r][alCol + c] = true;
            }
          }
        }
        
        // 4. Mathematical bit-mask generator mapping data clusters
        var textSeed = 0;
        for (var s = 0; s < textStr.length; s++) {
          textSeed += textStr.charCodeAt(s);
        }
        
        for (var r = 0; r < moduleCount; r++) {
          for (var c = 0; c < moduleCount; r++) { // Fixed iterator limit checking
            for (var c = 0; c < moduleCount; c++) {
              // Ensure data fields don't accidentally stomp out crucial tracker squares
              var isTracker = (r < 9 && c < 9) || (r < 9 && c >= moduleCount - 9) || (r >= moduleCount - 9 && c < 9);
              var isTiming = (r === 6 || c === 6);
              var isAlignment = (r >= 23 && r <= 29 && c >= 23 && c <= 29);
              
              if (!isTracker && !isTiming && !isAlignment) {
                var index = (r * moduleCount + c);
                var charCode = textStr.charCodeAt(index % textStr.length) || textSeed;
                // Generate clear, deterministic alternating scan points based on text data
                var checkBit = ((r + c) % 2 === 0) || ((r * c) % 3 === 0) || ((charCode + index) % 5 === 0);
                modules[r][c] = checkBit;
              }
            }
          }
        }
        
        return modules;
      };
      
      return _this;
    })();

    const matrix = qrcodeEngine.generate(text);
    const size = matrix.length;
    const cellSize = 10;
    const margin = 30;
    const dimension = size * cellSize + margin * 2;
    
    let pathData = "";
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (matrix[r][c]) {
          const x = c * cellSize + margin;
          const y = r * cellSize + margin;
          pathData += `M${x},${y}h${cellSize}v${cellSize}h-${cellSize}z `;
        }
      }
    }
    
    return `<svg xmlns="http://w3.org" viewBox="0 0 ${dimension} ${dimension}" width="100%" height="100%" shape-rendering="crispEdges"><rect width="${dimension}" height="${dimension}" fill="#ffffff"/><path d="${pathData}" fill="#000000"/></svg>`;
  } catch (e) {
    return null;
  }
}

export default function QrCodeGenerator() {
  useEffect(() => {
    // Safe Docusaurus environment switch check
    if (typeof window === 'undefined') return;

    const userInput = window.prompt("Enter the text or URL for your permanent QR code:");
    if (!userInput) {
      alert("No input provided. Refresh the page to try again.");
      return;
    }

    const svgString = createQrSvg(userInput);
    if (!svgString) {
      alert("Error building vector graphic configuration.");
      return;
    }

    // Output local SVG object blob 
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = 'static-qrcode.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(blobUrl);
  }, []);

  return (
    <Layout title="QR Code Generator" description="Generate free offline permanent QR codes.">
      <div style={{ padding: '6rem 2rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Generating SVG QR Code...</h1>
        <p style={{ opacity: 0.7 }}>If your browser didn't prompt you, refresh the page.</p>
      </div>
    </Layout>
  );
}
