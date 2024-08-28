import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, fetchProductById, updateProduct } from '../services/api';
import { Container, TextField, Button, Typography } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react'; // Correct import for QR code generation

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    quantity: 0,
    image: '',
    qrCode: ''  // Use this for holding QR code data
  });

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    const result = await fetchProductById(id);
    setProduct(result.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.qrCode) {
      // Generate QR Code only if it's not present
      setProduct((prevProduct) => ({ ...prevProduct, qrCode: product.name }));
    }

    if (id) {
      await updateProduct(id, product);
    } else {
      await createProduct(product);
    }
    navigate('/');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>{id ? 'Edit' : 'Add'} Product</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          name="name"
          value={product.name}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          name="description"
          value={product.description}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Quantity"
          variant="outlined"
          fullWidth
          name="quantity"
          type="number"
          value={product.quantity}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          name="image"
          value={product.image}
          onChange={handleInputChange}
          required
          style={{ marginBottom: '20px' }}
        />
        <Button type="submit" variant="contained" color="primary">
          {id ? 'Update' : 'Add'} Product
        </Button>
        {product.qrCode && (
          <div style={{ marginTop: '20px' }}>
            <QRCodeSVG value={product.qrCode} />
          </div>
        )}
      </form>
    </Container>
  );
};

export default ProductForm;
