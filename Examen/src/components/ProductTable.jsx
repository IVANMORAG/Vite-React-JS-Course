// src/components/ProductTable.jsx
import React from 'react';
import '../styles/ProductTable.css';

const ProductTable = ({ products, searchTerm }) => {
  const filteredProducts = products.filter(
    product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-table-container">
      
      <table className="product-table">
        <thead>
          <tr>
            <th>NOMBRE</th>
            <th>PRECIO</th>
            <th>CATEGORÍA</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;