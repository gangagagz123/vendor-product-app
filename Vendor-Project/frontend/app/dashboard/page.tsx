// // "use client";

// // import { useEffect, useState } from "react";

// // export default function Dashboard() {

// //   const [products, setProducts] = useState<any[]>([]);

// // //   useEffect(() => {

// // //     const token = localStorage.getItem("token");

// // //     fetch("http://localhost:8000/api/products/", {
// // //       headers: {
// // //         "Authorization": "Token " + token
// // //       }
// // //     })
// // //       .then(res => res.json())
// // //       .then(data => setProducts(data.results));

// // //   }, []);
// // useEffect(() => {

// //   const token = localStorage.getItem("token");

// //   fetch("http://localhost:8000/api/products/", {
// //     headers: {
// //       "Authorization": "Token " + token
// //     }
// //   })
// //   .then(res => res.json())
// //   .then(data => {
// //       console.log(data);
// //       setProducts(data);
// //   });

// // }, []);

// //   return (

// //     <div className="min-h-screen bg-gray-100 p-10">

// //       <h1 className="text-3xl font-bold mb-6">
// //         Vendor Dashboard
// //       </h1>

// //       <div className="flex justify-between items-center mb-4">

// // <h1 className="text-2xl font-bold">Vendor Dashboard</h1>

// // <a
// // href="/add-product"
// // className="bg-blue-500 text-white px-4 py-2 rounded"
// // >
// // + Add Product
// // </a>

// // </div>

// //       <table className="w-full bg-white shadow rounded">

// //         <thead className="bg-gray-200">
// //           <tr>
// //             <th className="p-3">Name</th>
// //             <th className="p-3">Description</th>
// //             <th className="p-3">Price</th>
// //             <th className="p-3">Quantity</th>
// //             <th className="p-3">Actions</th>
// //           </tr>
// //         </thead>

// //         <tbody>
// //           {products?.map((product:any) => (

// //             <tr key={product.id} className="border-t">

// //               <td className="p-3">{product.name}</td>
// //               <td className="p-3">{product.description}</td>
// //               <td className="p-3">{product.price}</td>
// //               <td className="p-3">{product.quantity}</td>

// //               <td className="p-3 flex gap-2">

// //                <a
// //                href={`/edit-product/${product.id}`}
// //                className="bg-yellow-500 text-white px-3 py-1 rounded"
// //                >
// //                Edit
// //                </a> 
               
               


// //               </td>

// //             </tr>

// //           ))}
// //         </tbody>

// //       </table>

// //     </div>

// //   );

// // }

// "use client";

// import { useEffect, useState } from "react";


// export default function Dashboard() {

//   const [products, setProducts] = useState<any[]>([]);

//   // Fetch products from Django API
//   useEffect(() => {

//     const token = localStorage.getItem("token");

//     fetch("http://localhost:8000/api/products/", {
//       headers: {
//         "Authorization": "Token " + token
//       }
//     })
//       .then(res => res.json())
//       .then(data => {
//         setProducts(data);
//       });

//   }, []);

//   // Delete product function
//   const deleteProduct = async (id:number) => {

//     const token = localStorage.getItem("token");

//     const confirmDelete = confirm("Delete this product?");

//     if(!confirmDelete) return;

//     await fetch(`http://localhost:8000/api/products/${id}/`,{
//       method:"DELETE",
//       headers:{
//         "Authorization":"Token " + token
//       }
//     });

//     // reload dashboard after delete
//     window.location.reload();
//   };

//   return (

//     <div className="min-h-screen bg-gray-100 p-10">

//       {/* Dashboard Header */}
//       <div className="flex justify-between items-center mb-6">

//         <h1 className="text-3xl font-bold">
//           Vendor Dashboard
//         </h1>

//         <a
//           href="/add-product"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           + Add Product
//         </a>
        

        


//       </div>

//       {/* Products Table */}

//       <table className="w-full bg-white shadow rounded">

//         <thead className="bg-gray-200">
//           <tr>
//             <th className="p-3">Name</th>
//             <th className="p-3">Description</th>
//             <th className="p-3">Price</th>
//             <th className="p-3">Quantity</th>
//             <th className="p-3">Actions</th>
//           </tr>
//         </thead>

//         <tbody>

//           {products.length === 0 ? (

//             <tr>
//               <td colSpan={5} className="text-center p-4">
//                 No products available
//               </td>
//             </tr>

//           ) : (

//             products.map((product:any) => (

//               <tr key={product.id} className="border-t">

//                 <td className="p-3">{product.name}</td>
//                 <td className="p-3">{product.description}</td>
//                 <td className="p-3">{product.price}</td>
//                 <td className="p-3">{product.quantity}</td>

//                 <td className="p-3 flex gap-2">

//                   <a
//                     href={`/edit-product/${product.id}`}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded"
//                   >
//                     Edit
//                   </a>

//                   <button
//                     onClick={() => deleteProduct(product.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>

//                 </td>

//               </tr>

//             ))

//           )}

//         </tbody>

//       </table>

//     </div>

//   );

// }

"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {

  const [products, setProducts] = useState<any[]>([]);

  // Fetch products from API
  useEffect(() => {

    const token = localStorage.getItem("token");

    fetch("http://localhost:8000/api/products/", {
      headers: {
        "Authorization": "Token " + token
      }
    })
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      });

  }, []);

  // Delete product
  const deleteProduct = async (id:number) => {

    const token = localStorage.getItem("token");

    const confirmDelete = confirm("Delete this product?");

    if(!confirmDelete) return;

    await fetch(`http://localhost:8000/api/products/${id}/`,{

      method:"DELETE",

      headers:{
        "Authorization":"Token " + token
      }

    });

    alert("Product deleted successfully");

    window.location.reload();

  };


  // Logout function
  const logout = () => {

    localStorage.removeItem("token");

    alert("Logout successful");

    window.location.href = "/login";

  };


  return (

    <div className="min-h-screen bg-gray-100 p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Vendor Dashboard
        </h1>

        <div className="flex gap-3">

          <a
            href="/add-product"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Add Product
          </a>

          <button
            onClick={logout}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

      </div>


      {/* Products Table */}

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-200">
          <tr>

            <th className="p-3">Name</th>
            <th className="p-3">Description</th>
            <th className="p-3">Price</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Actions</th>

          </tr>
        </thead>

        <tbody>

          {products.length === 0 ? (

            <tr>
              <td colSpan={5} className="text-center p-4">
                No products available
              </td>
            </tr>

          ) : (

            products.map((product:any) => (

              <tr key={product.id} className="border-t">

                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.description}</td>
                <td className="p-3">{product.price}</td>
                <td className="p-3">{product.quantity}</td>

                <td className="p-3 flex gap-2">

                  <a
                    href={`/edit-product/${product.id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </a>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

}