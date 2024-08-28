import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../services/api';
import { Container, Grid, Card, CardContent, Typography, Button, TextField } from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const result = await fetchProducts();
    setProducts(result.data);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body2">Quantity: {product.quantity}</Typography>
                <Button variant="contained" component={Link} to={`/edit/${product.id}`} style={{ marginRight: '10px' }}>
                  Edit
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(product.id)}>
                  Delete
                </Button>
                <Button variant="contained" component={Link} to={`/view/${product.id}`} style={{ marginTop: '10px' }}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
