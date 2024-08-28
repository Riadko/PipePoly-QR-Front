import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';        // Ensure this is a default export
import Home from './pages/Home';                 // Ensure this is a default export
import AddProduct from './pages/AddProduct';     // Ensure this is a default export
import EditProduct from './pages/EditProduct';   // Ensure this is a default export
import ViewProduct from './pages/ViewProduct';   // Ensure this is a default export
import QRScanner from './components/QRScanner';  // Ensure this is a default export

const App = () => {
  const handleScan = (qrCode) => {
    console.log('Scanned QR Code:', qrCode);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/view/:id" element={<ViewProduct />} />
        <Route path="/scan" element={<QRScanner onScan={handleScan} />} />
      </Routes>
    </Router>
  );
};

export default App;
