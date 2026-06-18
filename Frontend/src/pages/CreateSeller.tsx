import { useState } from "react";
import Navbar from "../components/Navbar";
import {FaEye, FaEyeSlash} from "react-icons/fa";

function CreateSeller() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    password: ""
  });


  const [showPassword, setShowPassword] = useState(false);
  

  const createSeller = async (e:any) => {

    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
    alert("Please enter a valid email");
    return;
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(form.phone)) {
    alert("Phone number must be 10 digits");
    return;
    }

    // WhatsApp validation
    if (!phoneRegex.test(form.whatsapp)) {
    alert("WhatsApp number must be 10 digits");
    return;
    }

    // Password validation
    const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(form.password)) {
    alert(
        "Password must have at least 8 characters, one uppercase, one lowercase, one number and one special character."
    );
    return;
    }

    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/admin/create-seller",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(form)
      }
    );

    const data = await res.json();

    alert(data.message);

    if(res.ok){
      setForm({
        name:"",
        email:"",
        phone:"",
        whatsapp:"",
        password:""
      });
    }

  };

  return(
    <>
      <Navbar/>

      <div className="max-w-xl mx-auto mt-10 bg-white shadow rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-6">
          Create Seller
        </h1>

        <form
          onSubmit={createSeller}
          className="space-y-4"
        >

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})}
            className="w-full border p-3 rounded"
            required
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e)=>setForm({...form,email:e.target.value})}
            className="w-full border p-3 rounded"
            required
          />

          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e)=>setForm({...form,phone:e.target.value})}
            className="w-full border p-3 rounded"
            required
          />

          <input
            placeholder="WhatsApp"
            value={form.whatsapp}
            onChange={(e)=>setForm({...form,whatsapp:e.target.value})}
            className="w-full border p-3 rounded"
            required
          />

          <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) =>
                setForm({
                    ...form,
                    password: e.target.value,
                })
                }
                placeholder="Password"
                className="w-full border border-gray-300 p-3 rounded-xl pr-12"
                required
            />

            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            </div>

            

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Create Seller
          </button>

        </form>

      </div>

    </>
  );

}

export default CreateSeller;