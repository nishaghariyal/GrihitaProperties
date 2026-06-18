import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API_URL from "../services/api";

function DashboardInquiries() {

const [inquiries,setInquiries]=useState<any[]>([]);

useEffect(()=>{

fetchInquiries();

},[]);

const fetchInquiries=async()=>{

const token=localStorage.getItem("token");

const res=await fetch(
`${API_URL}/api/inquiries`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data=await res.json();

setInquiries(data);

};

return(

<>

<Navbar/>

<div className="max-w-7xl mx-auto p-8">

<h1 className="text-4xl font-bold mb-8">
Buyer Inquiries
</h1>

<div className="grid gap-6">

{inquiries.map((item)=>(

<div
key={item.id}
className="bg-white rounded-2xl shadow-lg p-6"
>

<h2 className="text-2xl font-bold">
👤 {item.name}
</h2>

<p className="mt-2">
📧 {item.email}
</p>

<p>
📱 {item.phone}
</p>

<p className="mt-2 font-semibold">
🏠 {item.title}
</p>

<p>
📍 {item.location}
</p>

<p className="text-gray-500 mt-3">
🕒 {new Date(item.created_at).toLocaleString()}
</p>

<div className="flex gap-4 mt-5">

<a
href={`https://wa.me/91${item.phone}`}
target="_blank"
className="bg-green-600 text-white px-5 py-2 rounded-lg"
>

WhatsApp

</a>

<a
href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.email}`}
target="_blank"
className="bg-blue-600 text-white px-5 py-2 rounded-lg"
>

Email

</a>

</div>

</div>

))}

</div>

</div>

</>

);

}

export default DashboardInquiries;