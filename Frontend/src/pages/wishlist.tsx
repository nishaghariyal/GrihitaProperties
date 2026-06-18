import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FaMapMarkerAlt } from "react-icons/fa";

function Wishlist() {

  const [properties, setProperties] = useState<any[]>([]);

    useEffect(() => {
    fetchWishlist();
  }, []);

  
  const fetchWishlist = async () => {
  try {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/wishlist",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setProperties(res.data);
    console.log(properties);

  } catch (error) {
    console.error(error);
  }
};

 

  return (
    <>
      <Navbar />

      <section className="bg-gray-100 min-h-screen py-10">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-4xl font-bold mb-10">
            My Wishlist ❤️
          </h1>

          {properties.length === 0 ? (

            <div className="bg-white p-10 rounded-xl text-center shadow">

              <h2 className="text-2xl font-bold">
                No Wishlist Properties
              </h2>

              <p className="text-gray-500 mt-2">
                Add properties to wishlist.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-3 gap-8">

              {properties.map((property) => (

                <div
                  key={property.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg"
                >

                  <img
                    src={property.image_urls?.[0]}
                    alt={property.title}
                    className="h-60 w-full object-cover"
                  />

                  <div className="p-5">

                    <h3 className="text-xl font-bold">
                      {property.title}
                    </h3>

                    <p className="flex items-center gap-2 text-gray-500 mt-2">
                      <FaMapMarkerAlt />
                      {property.location}
                    </p>

                    <p className="text-blue-600 text-2xl font-bold mt-3">
                      ₹ {property.price}
                    </p>

                    <p className="mt-2 text-gray-500">
                      {property.bedrooms} Beds • {property.bathrooms} Baths
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>
    </>
  );
}

export default Wishlist;