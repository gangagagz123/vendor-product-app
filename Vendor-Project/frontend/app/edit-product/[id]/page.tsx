"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditProduct() {

  const { id } = useParams();

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [quantity,setQuantity] = useState("");

  // Load existing product
  useEffect(()=>{

    const token = localStorage.getItem("token");

    fetch(`http://localhost:8000/api/products/${id}/`,{
      headers:{
        "Authorization":"Token " + token
      }
    })
    .then(res=>res.json())
    .then(data=>{
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setQuantity(data.quantity);
    });

  },[id]);

  const updateProduct = async ()=>{

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:8000/api/products/${id}/`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Token " + token
      },
      body:JSON.stringify({
        name,
        description,
        price,
        quantity
      })
    });

    alert("Product updated successfully");

    window.location.href="/dashboard";

  }

  return(

    <div className="p-10">

      <h1 className="text-2xl font-bold mb-4">
        Edit Product
      </h1>

      <input
      className="border p-2 mb-2 w-full"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />

      <input
      className="border p-2 mb-2 w-full"
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      />

      <input
      className="border p-2 mb-2 w-full"
      value={price}
      onChange={(e)=>setPrice(e.target.value)}
      />

      <input
      className="border p-2 mb-2 w-full"
      value={quantity}
      onChange={(e)=>setQuantity(e.target.value)}
      />

      <button
      className="bg-green-500 text-white px-4 py-2 rounded"
      onClick={updateProduct}
      >
        Update Product
      </button>

    </div>

  );

}