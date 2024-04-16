"use client";
   
import React, { useEffect, useState } from "react";
import axios from 'axios' //npm install axios https://www.npmjs.com/package/axios
import Link from "next/link";
import Image from 'next/image'

export default function Products() {
    const [productsData, setProductsData] = useState([]);
    const [pageprevnext, setPage] = useState({});
  
    const url = "http://127.0.0.1:8000/api/products";
 
    useEffect(() => {
        fetchData(url);
    }, []);
 
    const fetchData = (url) => {
        axios
        .get(url)
        .then((data) => {
            setProductsData(data.data.products.data);
            console.log(data.data.products.data);
            setPage(data.data.products);
            //console.log(data.data.products.next_page_url);
        })
        .catch((error) => {
            console.log(error);
        });
    };
    
    const handleNextPage = () => {
        console.log(pageprevnext.next_page_url);
        fetchData(pageprevnext.next_page_url);
        window.scrollTo(0, 0);
    };
     
    const handlePreviousPage = () => {
        fetchData(pageprevnext.prev_page_url);
        window.scrollTo(0, 0);
    };

    const deleteProduct = (id) => {
        axios.delete('http://127.0.0.1:8000/api/productdelete/'+id).then(function(response){
            console.log(response.data);
            alert("Successfully Deleted");
            window.location.href = '/';
        });
    }

    return (
        <>
        <table className="table table-zebra">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
            <th className="py-3 px-6">#</th>
            <th className="py-3 px-6">Photo</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Price</th>
            <th className="py-3 px-6 text-center">Actions</th>
            </tr>
        </thead>
        <tbody>
            {productsData.map((rs, index) => (
            <tr key={rs.id} className="bg-white border-b">
                <td className="py-3 px-6">{rs.id}</td>
                <td className="py-3 px-6">
                    <Image
                        src={`http://127.0.0.1:8000/storage/${rs.image}`}
                        width={70}
                        height={70}
                        style={{width:'90px', height: "auto" }}
                        alt="Photo"
                    />
                </td>
                <td className="py-3 px-6">{rs.name}</td>
                <td className="py-3 px-6">${rs.price}.99</td>
                <td className="flex justify-center gap-1 py-3">
                    <Link
                    href={`/product/view/${rs.id}`} 
                    className="btn btn-info">
                    View
                    </Link>
                    <Link
                    href={`/product/edit/${rs.id}`} 
                    className="btn btn-primary">
                    Edit
                    </Link>
                    <button onClick={() => deleteProduct(rs.id)} className="btn btn-secondary">Delete</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
        
        <div className="w-1/2 items-center px-4 mt-6">   
            <div className="join grid grid-cols-2">
                {pageprevnext.prev_page_url ? (
                    <button className="join-item btn btn-primary btn-outline" onClick={handlePreviousPage}>
                    Previous
                    </button>
                ) : null}
                {pageprevnext.next_page_url ? (
                    <button className="join-item btn btn-primary btn-outline" onClick={handleNextPage}>
                    Next
                    </button>
                ) : null}
            </div>
        </div> 
        </>
  );
}