import React, { useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import QRCodeStyling from 'qr-code-styling';

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

function normalizeUrlForAnalytics(value) {
  try {
    const parsed = new URL(value);
    return {
      domain: parsed.hostname || 'unknown',
      path: parsed.pathname || '/',
      protocol: parsed.protocol.replace(':', '') || 'unknown',
    };
  } catch (error) {
    return {
      domain: 'invalid',
      path: '/',
      protocol: 'unknown',
    };
  }
}

function trackQrEvent(eventName, payload = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('[GA DEBUG]', eventName, payload);
    return;
  }

  if (!window.gtag) {
    return;
  }

  window.gtag('event', eventName, payload);
}

export default function QrCodeStylingGenerator() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let isMounted = true;

    const askForUrl = function () {
      const input = window.prompt('Enter a valid URL to generate a branded QR code SVG:');

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

    const handleGeneration = function () {
      if (!isMounted || !containerRef.current) {
        return;
      }

      const targetUrl = askForUrl();

      if (!targetUrl) {
        if (isMounted) {
          window.alert('QR code generation was cancelled.');
        }
        return;
      }

      const analyticsData = normalizeUrlForAnalytics(targetUrl);

      try {
        const qrCode = new QRCodeStyling({
          width: 420,
          height: 420,
          type: 'svg',
          data: targetUrl,
          margin: 2,
          qrOptions: {
            typeNumber: 0,
            mode: 'Byte',
            errorCorrectionLevel: 'H',
          },
          image: '/img/deepakgiri.svg',
          imageOptions: {
            hideBackgroundDots: true,
            imageSize: 0.4,
            margin: 10,
          },
          dotsOptions: {
            color: '#111827',
            type: 'square',
          },
          backgroundOptions: {
            color: '#FFFF00',
          },
          cornersSquareOptions: {
            type: 'square',
          },
          cornersDotOptions: {
            type: 'square',
          },
        });

        containerRef.current.innerHTML = '';
        qrCode.append(containerRef.current);
        trackQrEvent('qr_generate', {
          source: 'qrcode-page',
          domain: analyticsData.domain,
          path: analyticsData.path,
          protocol: analyticsData.protocol,
        });
        qrCode.download({ name: 'deepak-qrcode', extension: 'svg' });
      } catch (error) {
        window.alert(`Unable to generate the QR code: ${error && error.message ? error.message : error}`);
      }
    };

    handleGeneration();

    return function () {
      isMounted = false;
    };
  }, []);

  return (
    <Layout title="Free QR Code Generator" description="Generate a QR code for a URL and download it as an SVG.">
      <div
        style={{
          padding: '6rem 2rem',
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
          maxWidth: '860px',
          margin: '0 auto',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--ifm-color-primary)' }}>
          Free QR Code Generator
        </h1>
        <p style={{ opacity: 0.7, fontSize: '1.1rem', marginBottom: '2rem' }}>
          A browser prompt will ask for a URL, validate it, and generate a QR code before downloading it as SVG.
        </p>
        <div
          ref={containerRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '440px',
          }}
        />
      </div>
    </Layout>
  );
}
