import { useEffect } from 'react'
import { useProductContext } from '../context/ProductContext'

const useProducts = () => {
  const { products, fetchProducts } = useProductContext()

  useEffect(() => {
    fetchProducts()
  }, []) 

  return products
}

export default useProducts