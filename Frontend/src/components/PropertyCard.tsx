import {
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import {useAuth} from "../context/AuthContext";

function PropertyCard({ property }: any) {
  const navigate = useNavigate();
  
  const {user} =useAuth();

  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {

  const checkWishlist = async () => {

    const token = localStorage.getItem("token");

    if (!token) return;

    try {

      const res = await fetch(
        "http://localhost:5000/api/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      const exists = data.some(
        (item: any) => item.id === property.id
      );

      setIsWishlisted(exists);

    } catch (err) {
      console.log(err);
    }

  };

  checkWishlist();

}, [property.id]);

  const toggleWishlist = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {

      const res = await fetch(
        `http://localhost:5000/api/wishlist/${property.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      if (data.message === "Added to wishlist") {
        setIsWishlisted(true);
      }

      if (data.message === "Removed from wishlist") {
        setIsWishlisted(false);
      }

    } catch (err) {
      console.log(err);
    }

  };

  const handleViewDetails = () => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/login", {
        state: {
          redirect: `/property/${property.id}`,
        },
      });

      return;
    }

    navigate(`/property/${property.id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition relative">

      {/* Wishlist Button */}
      {user?.role === "buyer" && (
        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md z-10"
        >
          {isWishlisted ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-gray-500 text-xl" />
          )}
        </button>
      )}

      {/* Property Image */}
      <img
        src={
          property.image_urls?.[0] ||
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
        }
        alt={property.title}
        className="w-full h-56 object-cover"
      />

      {/* Property Details */}
      <div className="p-5">

        <h3 className="text-2xl font-bold">
          {property.title}
        </h3>

        <p className="text-gray-600 flex items-center gap-2 mt-2">
          <FaMapMarkerAlt />
          {property.location}
        </p>

        <p className="text-blue-600 text-2xl font-bold mt-3">
          ₹ {property.price}
        </p>

        <div className="flex justify-between mt-4 text-gray-600">

          <div className="flex items-center gap-2">
            <FaBed />
            <span>{property.bedrooms} Beds</span>
          </div>

          <div className="flex items-center gap-2">
            <FaBath />
            <span>{property.bathrooms} Baths</span>
          </div>

        </div>

        {/* View Details */}
        <button
          onClick={handleViewDetails}
          className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          View Details
        </button>

      </div>

    </div>
  );
}

export default PropertyCard;