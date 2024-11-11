import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to install axios to make api calls
import Card from './Card/Card'; // Import the Card component

function Home() {
  const [products, setProducts] = useState([]); // State to hold the products

  // Fetch products from JSON server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4008/products'); // Replace with your actual URL
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="container">
      <div className="row">
        {products.map(product => (
          <div className="col-md-3" key={product.id}> {/* 4 columns per row */}
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
