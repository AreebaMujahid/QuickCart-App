import React, { useState } from 'react';
import axios from 'axios'; // To make HTTP requests

function CreateProduct() {
  // Form state for holding product data
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    description: '',
    image: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    try {
      // Send a POST request to add the new product to the JSON server
      const response = await axios.post('http://localhost:4000/products', product);
      console.log('Product added successfully:', response.data);
      alert('Product added successfully!');
      setProduct({ name: '', brand: '', category: '', price: '', description: '', image: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-5">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Name</label>
          <div className="col-sm-8">
            <input 
              type="text" 
              className="form-control" 
              name="name" 
              value={product.name} 
              onChange={handleChange} 
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Brand</label>
          <div className="col-sm-8">
            <input 
              type="text" 
              className="form-control" 
              name="brand" 
              value={product.brand} 
              onChange={handleChange} 
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Category</label>
          <div className="col-sm-8">
            <select 
              className="form-select" 
              name="category" 
              value={product.category} 
              onChange={handleChange} 
              required
            >
              <option value="">Choose Category</option>
              <option value="Mobile">Mobile</option>
              <option value="Laptop">Laptop</option>
              <option value="Makeup">Makeup</option>
              <option value="Clothes">Clothes</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Price</label>
          <div className="col-sm-8">
            <input 
              type="number" 
              className="form-control" 
              name="price" 
              value={product.price} 
              onChange={handleChange} 
              step="0.01" 
              min="1" 
              required 
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Description</label>
          <div className="col-sm-8">
            <textarea 
              className="form-control" 
              name="description" 
              value={product.description} 
              onChange={handleChange} 
              rows="4" 
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Image URL</label>
          <div className="col-sm-8">
            <input 
              type="text" 
              className="form-control" 
              name="image" 
              value={product.image} 
              onChange={handleChange} 
              required
            />
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">Add Product</button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
