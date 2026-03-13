// "use client";

// import { useState } from "react";

// export default function AddProduct() {

// const [name,setName] = useState("");
// const [description,setDescription] = useState("");
// const [price,setPrice] = useState("");
// const [quantity,setQuantity] = useState("");

// const handleSubmit = async () => {

// const token = localStorage.getItem("token");

// const response = await fetch("http://localhost:8000/api/products/",{
// method:"POST",
// headers:{
// "Content-Type":"application/json",
// "Authorization":"Token " + token
// },
// body:JSON.stringify({
// name,
// description,
// price,
// quantity
// })
// });

// if(response.ok){
// alert("Product added successfully!");
// window.location.href="/dashboard";
// }else{
// alert("Error adding product");
// }

// };

// return(

// <div className="p-10">

// <h1 className="text-2xl font-bold mb-4">Add Product</h1>

// <input
// className="border p-2 mb-2 w-full"
// placeholder="Product Name"
// onChange={(e)=>setName(e.target.value)}
// />

// <input
// className="border p-2 mb-2 w-full"
// placeholder="Description"
// onChange={(e)=>setDescription(e.target.value)}
// />

// <input
// className="border p-2 mb-2 w-full"
// placeholder="Price"
// onChange={(e)=>setPrice(e.target.value)}
// />

// <input
// className="border p-2 mb-2 w-full"
// placeholder="Quantity"
// onChange={(e)=>setQuantity(e.target.value)}
// />

// <button
// className="bg-green-500 text-white px-4 py-2 rounded"
// onClick={handleSubmit}
// >
// Add Product
// </button>

// </div>

// );

// }

"use client";

import { useState } from "react";

export default function AddProduct() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/api/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + token
      },
      body: JSON.stringify({
        name,
        description,
        price,
        quantity
      })
    });

    const data = await response.json();   // read backend response

    if (response.ok) {

      alert("Product added successfully!");
      window.location.href = "/dashboard";

    } else {

      // show backend validation message
      if (data.error) {
        alert(data.error);
      } 
      else if (data.non_field_errors) {
        alert(data.non_field_errors[0]);
      } 
      else {
        alert("Error adding product");
      }

    }

  };

  return (

    <div className="p-10">

      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      <input
        className="border p-2 mb-2 w-full"
        placeholder="Product Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 mb-2 w-full"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="border p-2 mb-2 w-full"
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="border p-2 mb-2 w-full"
        placeholder="Quantity"
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Add Product
      </button>

    </div>

  );

}