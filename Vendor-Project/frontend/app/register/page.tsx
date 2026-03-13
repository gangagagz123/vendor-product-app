
// "use client";

// import { useState } from "react";

// export default function Register() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = async () => {
//     const response = await fetch("http://localhost:8000/api/register/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username: username,
//         password: password,
//       }),
//     });

//     if (response.ok) {
//       alert("Vendor registered successfully!");
//       window.location.href = "/login";
//     } else {
//       alert("Registration failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
        
//         <h1 className="text-2xl font-bold mb-6 text-center">
//           Vendor Register
//         </h1>

//         <input
//           type="text"
//           placeholder="Username"
//           className="w-full border p-2 mb-4 rounded"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-2 mb-4 rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={handleRegister}
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         >
//           Register
//         </button>

//       </div>

//     </div>
//   );
// }
"use client";

import { useState } from "react";

export default function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    const response = await fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json(); // read backend response

    if (response.ok) {

      alert("Vendor registered successfully!");
      window.location.href = "/login";

    } else {

      // show backend validation messages
      if (data.username) {
        alert(data.username[0]);
      } 
      else if (data.password) {
        alert(data.password[0]);
      } 
      else {
        alert("Registration failed");
      }

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Vendor Register
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-4 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>

      </div>

    </div>

  );

}