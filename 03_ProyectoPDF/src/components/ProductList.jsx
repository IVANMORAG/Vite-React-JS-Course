import React, { useState } from 'react'
import { useProductContext } from '../context/ProductContext'
import './ProductList.css'

const ProductList = () => {
    const { products, categories, loading, error } = useProductContext()
    const [selectedCategory, setSelectedCategory] = useState('todos')

    const filteredProducts = selectedCategory === 'todos' 
        ? products 
        : products.filter(product => product.category === selectedCategory)

    if (loading) return <div className="loading">Cargando productos...</div>
    if (error) return <div className="error">Error: {error}</div>

    return (
        <div className="product-container">
            <div className="category-buttons">
                <button 
                    onClick={() => setSelectedCategory('todos')}
                    className={selectedCategory === 'todos' ? 'active' : ''}
                >
                    Mostrar todos
                </button>
                
                {categories?.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={selectedCategory === category ? 'active' : ''}
                    >
                        {category}
                    </button>
                ))}
                
                <button className="download-btn">
                    Descargar
                </button>
            </div>
            
            <div className="product-list">
                {filteredProducts?.map(product => (
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p>Precio: ${product.price}</p>
                        <p>Categoría: {product.category}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList