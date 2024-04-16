"use client";
 
import React, { useState, useEffect } from 'react';
import axios from 'axios' //npm install axios https://www.npmjs.com/package/axios
import Link from "next/link";
import { useParams } from 'next/navigation'
import Image from 'next/image'

export default function ViewProductPage() {
    const {id}=useParams();
 
    console.log(id);
 
    const[product,setProduct]=useState([]);
  
    useEffect(()=>{
        fetchProduct();
    },[id]);
  
    const fetchProduct=async()=>{
        try{
        const result=await axios.get("http://127.0.0.1:8000/api/products/"+id);
          console.log(result.data.product);
          setProduct(result.data.product)
  
        }catch(err){
            console.log("Something Wrong");
        }
    }
 
    return (
    <div className="max-w-2xl mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">View Product</h1>
      <table className="table table-zebra">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
              <th>S No.</th>
              <th>Product Name</th>
              <th>Price</th>             
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
            </tr>
          </tbody>
      </table>
      <p className="text-center mt-6">
        <Image
        src={`http://127.0.0.1:8000/storage/${product.image}`}
        width={200}
        height={200}
        alt="Photo"
        style={{width:'400px', height: "auto" }}
      />
      </p>
    </div>
  );
}