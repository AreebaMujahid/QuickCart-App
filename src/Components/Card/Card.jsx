import React from 'react';

const Card = ({ product }) => {
  return (
    <div className="product-card">
      <img src={"http://localhost:4000/images/"+ product.imageFilename}/>
      <h3>{product.name}</h3>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>ID:</strong> {product.id}</p>
    </div>
  );
};

export default Card;
