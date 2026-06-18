import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import API_URL from "../services/api";
import {useNavigate} from "react-router-dom";
import {Navigate} from "react-router-dom";


import {
  FaHome,
  FaHeart,
  FaEye,
  FaEnvelope,
  FaEdit,
  FaTrash
} from "react-icons/fa";

function Dashboard() {
  
  const[wishlistCount,setWishlistCount] = useState(0);
  
  const[views,setViews] = useState(0);
  const navigate = useNavigate();
  const deleteProperty = async (id: number) => {
    const confirmDelete = window.confirm(
        "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    try {
        const token = localStorage.getItem("token");

        await fetch(
        `http://localhost:5000/api/properties/${id}`,
        {
            method: "DELETE",
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        setProperties(
        properties.filter(
            (property) => property.id !== id
        )
        );

    } catch (error) {
        console.error(error);
    }
  };  

  const { user } = useAuth();

  if (user?.role === "buyer") {
  return <Navigate to="/" />;
 }

  const [properties, setProperties] =
    useState<any[]>([]);

  const[inquiries, setInquiries] = useState(0);

  useEffect(() => {

  const fetchProperties = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_URL}/api/properties/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setProperties(data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchInquiryCount = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_URL}/api/inquiries/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setInquiries(Number(data.count));

    } catch (error) {
      console.log(error);
    }
  };

  const fetchWishlistCount = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_URL}/api/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setWishlistCount(data.length);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchViewCount = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_URL}/api/property-views/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setViews(Number(data.count));

    } catch (error) {
      console.log(error);
    }
  };

  fetchProperties();
  fetchInquiryCount();
  fetchWishlistCount();
  fetchViewCount();

}, []);

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen">

        {/* Hero */}

        <div className="bg-slate-900 text-white rounded-3xl p-10 mb-8">
        <div className="flex justify-between items-center">

            <div>
            <p className="text-orange-400 uppercase tracking-wider">
                Dashboard Overview
            </p>

            <h1 className="text-5xl font-bold mt-2">
                Welcome back, {user.name}
            </h1>

            <p className="text-gray-400 mt-3">
                Manage your properties and track performance.
            </p>
            </div>

            
        </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">

          {/* Stats */}

          <div className="grid md:grid-cols-4 gap-6 -mt-10 mb-8">

            <div className="bg-white rounded-3xl p-6 shadow-sm border">

            <FaHome className="text-orange-500 text-3xl mb-4" />

            <h2 className="text-4xl font-bold">
                {properties.length}
            </h2>

            <p className="text-gray-500">
                Total Properties
            </p>

            </div>

            

            <div
              onClick={() => navigate("/dashboard/views")}
              className="bg-white rounded-xl shadow p-6 text-center cursor-pointer hover:shadow-xl transition"
            >
              <FaEye className="text-4xl text-green-600 mx-auto" />

              <h2 className="text-4xl font-bold mt-4">
                {views}
              </h2>

              <p className="text-gray-500">
                Views
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <FaHeart className="mx-auto text-4xl text-red-600 mb-3" />

              <h3 className="text-4xl font-bold text-red-600">
                {wishlistCount}
              </h3>

              <p className="text-gray-500">
                Wishlist
              </p>
            </div>

            <div
              onClick={()=>navigate("/dashboard/inquiries")}
              className="bg-white rounded-2xl shadow-lg p-6 text-center cursor-pointer hover:shadow-xl transition"
              >

              <FaEnvelope className="mx-auto text-4xl text-purple-600 mb-3"/>

              <h3 className="text-4xl font-bold text-purple-600">
              {inquiries}
              </h3>

              <p className="text-gray-500">
              Inquiries
              </p>

              </div>

          </div>

          {/* Profile */}

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

            <h2 className="text-2xl font-bold mb-4">
              My Profile
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

              <div>
                <p className="text-gray-500">
                  Name
                </p>

                <h3 className="font-semibold">
                  {user.name}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">
                  Email
                </p>

                <h3 className="font-semibold">
                  {user.email}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">
                  Role
                </p>

                <h3 className="font-semibold capitalize">
                  {user.role}
                </h3>
              </div>

            </div>

          </div>

          {/* Quick Actions */}

         

          {/* Properties */}

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                My Properties
              </h2>

              <a
                href="/create-property"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                Add Property
              </a>

            </div>

            {properties.length === 0 ? (

              <div className="text-center py-10">

                <h3 className="text-2xl font-semibold">
                  No Properties Found
                </h3>

                <p className="text-gray-500 mt-2">
                  Create your first property listing.
                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="bg-gray-50">

                      <th className="p-4 text-left">
                        Title
                      </th>

                      <th className="p-4 text-left">
                        Location
                      </th>

                      <th className="p-4 text-left">
                        Price
                      </th>

                      <th className="p-4 text-left">
                        Type
                      </th>

                      <th className="p-4 text-left">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {properties.map((property) => (

                      <tr
                        key={property.id}
                        className="border-t"
                      >

                        <td className="p-4">
                          {property.title}
                        </td>

                        <td className="p-4">
                          {property.location}
                        </td>

                        <td className="p-4 font-bold text-blue-600">
                          ₹ {property.price}
                        </td>

                        <td className="p-4">
                          {property.property_type}
                        </td>

                        <td className="p-4 flex gap-2">

                          <button
                            onClick={() => navigate(`/edit-property/${property.id}`)}
                            className="bg-yellow-500 text-white p-2 rounded"
                            >
                            <FaEdit />
                            </button>

                          <button
                            onClick={() => deleteProperty(property.id)}
                            className="bg-red-500 text-white p-2 rounded"
                            >
                            <FaTrash />
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;