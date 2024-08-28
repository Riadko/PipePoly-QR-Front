// src/components/QRScanner.js
import React, { useRef, useEffect, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

const QRScanner = ({ onScan }) => {
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    
    const startScanning = async () => {
      try {
        const videoInputDevices = await codeReader.listVideoInputDevices();
        if (videoInputDevices.length > 0) {
          await codeReader.decodeFromVideoDevice(videoInputDevices[0].deviceId, videoRef.current, (result, error) => {
            if (result) {
              onScan(result.text);
              codeReader.reset(); // Stop scanning after successful read
              setScanning(false);
            }
            if (error) {
              console.error(error);
            }
          });
          setScanning(true);
        } else {
          console.error('No video input devices found');
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (!scanning) {
      startScanning();
    }

    return () => {
      codeReader.reset();
    };
  }, [scanning, onScan]);

  return <video ref={videoRef} style={{ width: '100%' }} />;
};

export default QRScanner;
