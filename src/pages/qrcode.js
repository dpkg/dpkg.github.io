import React, { useEffect } from 'react';
import Layout from '@theme/Layout';

export default function QrCodeGenerator() {
  useEffect(() => {
    // 1. Safety Switch: Docusaurus compiles code on a backend server first.
    // This prevents "window is not defined" crashes during your GitHub deployment.
    if (typeof window === 'undefined') return;

    // 2. Inject a highly reliable open-source QR script
    const script = document.createElement('script');
    script.src = 'https://cloudflare.com';
    script.async = true;

    script.onload = () => {
      // 3. Native browser text input window prompt
      const userInput = window.prompt("Enter the text or URL for your permanent static QR code:");
      
      if (!userInput) {
        alert("No input provided. Please refresh the page to try again.");
        return;
      }

      try {
        // 4. Force high-density error correction ('H') for safe mobile lens capture
        // Type 0 tells the engine to automatically scale matrix boundaries based on text size
        const qr = qrcode(0, 'H');
        qr.addData(userInput);
        qr.make();

        // 5. Generate a perfect SVG string layout block natively 
        // Arguments: cellSize (pixels per module dot), margin (outer white border)
        const rawSvgString = qr.createSvgTag(10, 20);

        // 6. Compile into a native downloadable browser asset block
        const blob = new Blob([rawSvgString], { type: 'image/svg+xml;charset=utf-8' });
        const blobUrl = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'static-qrcode.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // 7. Clear system memory tracking structures instantly
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(blobUrl);

      } catch (error) {
        alert("Error mapping matrix data: " + error.message);
      }
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <Layout title="QR Code Generator" description="Generate permanent static QR codes offline as vector SVGs.">
      <div style={{ padding: '6rem 2rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--ifm-color-primary)' }}>
          Generating SVG QR Code...
        </h1>
        <p style={{ opacity: 0.7, fontSize: '1.1rem' }}>
          If your browser did not automatically open an input window, please refresh this page view.
        </p>
      </div>
    </Layout>
  );
}
