"use client";
 
import React, { useState, useEffect } from 'react';
import axios from 'axios' //npm install axios https://www.npmjs.com/package/axios
import { useParams } from 'next/navigation'
import Image from 'next/image'

export default function ViewProductPage() {
    const {id}=useParams();

    console.log(id);
 
    useEffect(()=>{
        fetchProduct();
    },[id]);
  
    const fetchProduct=async()=>{
        try{
            const result=await axios.get("http://127.0.0.1:8000/api/products/"+id);
            console.log(result.data.product);
            setInputs(result.data.product)
        }catch(err){
            console.log("Something Wrong");
        }
    }
 
    const[message, setMessage]= useState('');
    const [inputs, setInputs] = useState([]);
    const [fileimage, setPhoto]= useState('');
     
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
     
    const uploadProduct= async()=>{
        const formData= new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', inputs.name);
        formData.append('price',inputs.price);
        formData.append('image', fileimage);
        const response= await axios.post("http://127.0.0.1:8000/api/productsupdate/"+id, formData, {
            headers:{'Content-Type':"multipart/form-data"},
        } );
        setMessage(response.data.message); //"message": "Product successfully updated.."
        console.log(response)
        setTimeout(()=>{
            window.location.href = '/';
        }, 2000);
    }
 
    const handleSubmit= async(e)=>{
      e.preventDefault();
      await uploadProduct();
 
   }
 
    return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Edit Form</h1>
        <p className="text-success"><b>{ message }</b></p>  
            <form onSubmit={ handleSubmit}> 
                <div className="mb-3 mt-3">
                    <label className="block text-sm font-medium text-gray-900"> ID:</label>
                    <input type="text" id="id" name="id" value={id} disabled />
                </div>
                <div className="mb-3 mt-3">
                    <label className="block text-sm font-medium text-gray-900"> Full Name:</label>
                    <input type="text" className="input input-bordered input-primary w-full max-w-xs" placeholder="Enter Your Full Name" name="name"
                    value={inputs.name} onChange={ handleChange}/>
                </div>
                <div className="mb-3 mt-3">
                    <label className="block text-sm font-medium text-gray-900">Price:</label>
                    <input type="text" className="input input-bordered input-primary w-full max-w-xs" id="price" placeholder="Enter Price" name="price"
                    value={inputs.price} onChange={ handleChange}/>
                </div>
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-900">
                    Upload File
                    </label>
                    <input type="file" onChange={(e)=>setPhoto(e.target.files[0])} name="image" id="image" className="file-input file-input-bordered file-input-secondary w-full max-w-xs"/>
                </div>
                <p className="text-center mt-6">
                    <Image
                    src={`http://127.0.0.1:8000/storage/${inputs.image}`}
                    width={200}
                    height={200}
                    alt="Photo"
                    style={{width:'400px', height: "auto" }}
                />
                </p>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
    </div>
  );
}