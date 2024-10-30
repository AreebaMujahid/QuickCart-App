import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function List() {
    const [products, setProducts] = useState([]);

    const getProducts = () => {
        fetch("http://localhost:4000/products?_sort=id&_order=desc")
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok");
            })
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                alert("Unable to get data");
                console.error("Fetch error:", error);
            });
    };

    // Fetch products when the component mounts
    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Products</h2>
            <div className="row mb-3">
                <div className="col">
                    <Link className="btn btn-primary me-1" to="/admin/products/create" role="button">Create Product</Link>
                    <button type="button" className="btn btn-outline-primary" onClick={getProducts}>Refresh</button>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product,index) => (
                        <tr key={index}> {/* Use a unique identifier */}
                            <td>{product.id}</td> {/* Assuming your product object has an id */}
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td><img src={"http://localhost:4000/images/"+ product.imageFilename}/></td>
                            <td>
                            <button className="btn btn-warning me-2">Edit</button>
                            <button className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
