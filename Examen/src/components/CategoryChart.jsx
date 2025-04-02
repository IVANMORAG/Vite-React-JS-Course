// src/components/CategoryChart.jsx
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/CategoryChart.css';

const CategoryChart = ({ products }) => {
  const categoryData = useMemo(() => {
    const categories = {};
    
    products.forEach(product => {
      if (categories[product.category]) {
        categories[product.category]++;
      } else {
        categories[product.category] = 1;
      }
    });
    
    return Object.keys(categories).map(category => ({
      name: category,
      count: categories[category]
    }));
  }, [products]);

  return (
    <div className="chart-container">
      
      <div className="chart-content">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="custom-tooltip">
                      <p>{`${payload[0].payload.name}: ${payload[0].payload.count}`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" fill="#4285F4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryChart;