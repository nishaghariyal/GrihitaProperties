import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function AdminDashboard(){

return(

<>

<Navbar/>

<div className="max-w-7xl mx-auto p-10">

<h1 className="text-4xl font-bold">
Admin Dashboard
</h1>

<div className="grid md:grid-cols-4 gap-6 mt-10">

<Link
to="/create-seller"
className="bg-blue-600 text-white p-8 rounded-xl text-center text-xl font-bold"
>

Create Seller

</Link>

</div>

</div>

</>

);

}

export default AdminDashboard;