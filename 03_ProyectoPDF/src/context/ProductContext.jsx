import React, { createContext, useContext, useState, useEffect } from 'react'

const ProductContext = createContext()

export const useProductContext = () => {
  return useContext(ProductContext)
}

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:4000/")
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const productsData = await response.json()
      setProducts(productsData)

      // Extraer categorías únicas
      const uniqueCategories = [...new Set(
        productsData.map(product => product.category)
      )]
      setCategories(uniqueCategories)

    } catch (err) {
      console.error("Error fetching products:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const value = {
    products,
    categories,
    loading,
    error,
    refreshProducts: fetchProducts
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}