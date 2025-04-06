import React from 'react'
import { ProductProvider } from './context/ProductContext'
import ProductList from './components/ProductList'
import './App.css'

function App() {
  return (
    <ProductProvider>
      <div className="App">
        <h1 className="Title">Lista de Productos</h1>
        <ProductList />
      </div>
    </ProductProvider>
  )
}

export default App