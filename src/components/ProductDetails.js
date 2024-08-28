import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { Container, Typography, Card, CardContent } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const result = await fetchProductById(id);
    setProduct(result.data);
  };

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h3">{product.name}</Typography>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h6">Quantity: {product.quantity}</Typography>
          <QRCodeSVG value={product.qrCode} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
