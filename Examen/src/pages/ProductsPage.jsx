// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import ProductTable from '../components/ProductTable';
import CategoryChart from '../components/CategoryChart';
import SearchInput from '../components/SearchInput';
import { fetchProducts } from '../api/productApi';
import '../styles/ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Error al cargar los productos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = products.filter(
    product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Cargando productos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="products-page">
      {showChart ? (
        <div className="chart-view">
          <div className="header">
            <h2>Productos</h2>
            <button className="view-btn" onClick={() => setShowChart(false)}>Ver Tabla</button>
          </div>
          <CategoryChart products={products} />
        </div>
      ) : (
        <div className="table-view">
          <div className="header">
            <h2>Productos</h2>
            <button className="view-btn" onClick={() => setShowChart(true)}>Ver Gráfico</button>
          </div>
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ProductTable products={filteredProducts} searchTerm={searchTerm} />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;