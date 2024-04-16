"use client";

import React, { useState } from "react";
import axios from 'axios' //npm install axios https://www.npmjs.com/package/axios

const Product = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setFile] = useState()
 
    const onSubmitUpload = async (e) => {
        e.preventDefault();
       try {
          const formData = new FormData()
          formData.append("name", name);
          formData.append("price", price);
          formData.append('image', image)
          axios.post('http://127.0.0.1:8000/api/products',formData )
          .then((response) => {
              console.log(response);
              window.location.href = '/';
          })
          .catch(er => console.log(er))
        } catch (err) {
            console.log("Something Wrong");
        }
    }
    
    return (
    <div className="max-w-md mx-auto mt-5">
        <h1 className="text-2xl text-center mb-2">Add New Product</h1>
        <div>
        <form>
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-900">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="input input-bordered input-primary w-full max-w-xs"
            placeholder="Name..."
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="price" className="block text-sm font-medium text-gray-900">
            Price
          </label>
          <input
            type="price"
            name="price"
            id="price"
            className="input input-bordered input-primary w-full max-w-xs"
            placeholder="price..."
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-900">
            Upload File
          </label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} name="image" id="image" className="file-input file-input-bordered file-input-secondary w-full max-w-xs"/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={e => onSubmitUpload(e)}>Add New Product</button> 
      </form>
    </div>
    </div>
  );
};
  
export default Product;