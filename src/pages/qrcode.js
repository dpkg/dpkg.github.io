import React, { useEffect } from 'react';
import Layout from '@theme/Layout';

function isValidUrl(value) {
  if (!value || typeof value !== 'string') {
    return false;
  }

  try {
    const parsed = new URL(value.trim());
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch (error) {
    return false;
  }
}

export default function QrCodeGenerator() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let isMounted = true;

    const askForUrl = () => {
      const input = window.prompt('Enter a valid URL to generate a QR code SVG:');

      if (input === null) {
        return null;
      }

      const trimmed = input.trim();

      if (!isValidUrl(trimmed)) {
        window.alert('Please enter a valid http:// or https:// URL.');
        return askForUrl();
      }

      return trimmed;
    };

    const handleGeneration = async () => {
      if (!isMounted) {
        return;
      }

      const targetUrl = askForUrl();

      if (!targetUrl) {
        if (isMounted) {
          window.alert('QR code generation was cancelled.');
        }
        return;
      }

      try {
        const QRCode = (await import('qrcode')).default;
        const rawSvgString = await QRCode.toString(targetUrl, {
          type: 'svg',
          errorCorrectionLevel: 'H',
          margin: 2,
          width: 400,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        });

        const blob = new Blob([rawSvgString], { type: 'image/svg+xml;charset=utf-8' });
        const blobUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');

        downloadLink.href = blobUrl;
        downloadLink.download = 'qrcode.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        window.alert(`Unable to generate the QR code: ${error && error.message ? error.message : error}`);
      }
    };

    handleGeneration();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Layout title="QR Code Generator" description="Generate a QR code for a URL and download it as an SVG.">
      <div
        style={{
          padding: '6rem 2rem',
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--ifm-color-primary)' }}>
          QR Code Generator
        </h1>
        <p style={{ opacity: 0.7, fontSize: '1.1rem' }}>
          A browser prompt will ask for a URL, validate it, and download the QR code as an SVG file.
        </p>
      </div>
    </Layout>
  );
}
