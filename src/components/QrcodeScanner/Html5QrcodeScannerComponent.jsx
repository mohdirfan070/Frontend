// Html5QrcodeScannerComponent.jsx
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

const Html5QrcodeScannerComponent = ({ onScanSuccess, onScanFailure }) => {
  const regionId = 'html5qr-code-full-region';

  useEffect(() => {
    const config = {
      // qrbox : { width: '200', height: '200' },
      fps: 10,
      facingmode:"environment",
      aspectRatio: 1.777778	,
      disableFlip: false,
    };

    const scanner = new Html5QrcodeScanner(regionId, config, false);
    scanner.render(onScanSuccess, onScanFailure);

    return () => {
      scanner.clear().catch((err) => console.error('Failed to clear scanner', err));
    };
  }, []);
 
  return <div   id={regionId} />;
};

export default Html5QrcodeScannerComponent;
