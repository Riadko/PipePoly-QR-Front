// src/pages/ScanPage.js
import React, { useState } from 'react';
import QRScanner from '../components/QRScanner';
import { Container, Typography, Button } from '@mui/material';

const ScanPage = () => {
  const [scannedCode, setScannedCode] = useState('');

  const handleScan = (data) => {
    setScannedCode(data);
    // Here you can handle the scanned QR code data (e.g., call an API)
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Scan QR Code</Typography>
      <QRScanner onScan={handleScan} />
      {scannedCode && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6">Scanned QR Code Data:</Typography>
          <Typography variant="body1">{scannedCode}</Typography>
        </div>
      )}
      <Button variant="contained" color="primary" onClick={() => setScannedCode('')}>
        Reset
      </Button>
    </Container>
  );
};

export default ScanPage;
