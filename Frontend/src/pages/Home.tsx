import Navbar from "../components/Navbar";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaRegHeart
} from "react-icons/fa";

import {Link} from "react-router-dom";

function Home() {
const [properties, setProperties] = useState<any[]>([]);
const [search, setSearch] = useState("");
const [activeTab, setActiveTab] = useState("Residential");
const [wishlist, setWishlist] = useState<number[]>(
  JSON.parse(
    localStorage.getItem("wishlist") || "[]"
  )
);

const propertySectionRef =
useRef<HTMLDivElement>(null);

useEffect(() => {
fetchProperties();
}, []);

const fetchProperties = async () => {
try {
const res = await axios.get(
"http://localhost:5000/api/properties"
);
  console.log(res.data)
  setProperties(res.data);
} catch (error) {
  console.error(error);
}

};

const filteredProperties =
  properties.filter((property) => {

      const matchesSearch =
    !search ||
    property.title
      ?.toLowerCase()
      .includes(search.trim().toLowerCase()) ||
    property.location
      ?.toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesType =
      !activeTab ||
      property.property_type === activeTab;

    console.log(property.image_urls);
    return matchesSearch && matchesType;
  });
const handleSearch = () => {
propertySectionRef.current?.scrollIntoView({
behavior: "smooth",
});
};

const toggleWishlist = (id: number) => {

  let updatedWishlist: number[];

  if (wishlist.includes(id)) {

    updatedWishlist = wishlist.filter(
      (item) => item !== id
    );

  } else {

    updatedWishlist = [
      ...wishlist,
      id,
    ];

  }

  setWishlist(updatedWishlist);

  localStorage.setItem(
    "wishlist",
    JSON.stringify(updatedWishlist)
  );
};

return (
<>
<Navbar />

  <section
  className="relative min-h-screen bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600')",
  }}
>
  <div className="absolute inset-0 bg-black/50"></div>

  <div className="relative z-10 py-32">
    <div className="max-w-7xl mx-auto px-6">

      <div className="text-center text-white">

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Find Your Dream Property
        </h1>

        <p className="text-base md:text-xl mb-10">
          Buy, Rent & Sell Properties Across India
        </p>

      </div>

      <div className="bg-white rounded-t-2xl max-w-4xl mx-auto flex overflow-x-auto whitespace-nowrap no-scrollbar">
      <button
        onClick={() => setActiveTab("Residential")}
        className={`px-6 py-4 shrink-0 ... ${
          activeTab === "Residential"
            ? "text-blue-600 border-b-4 border-blue-600"
            : "text-gray-500"
        }`}
      >
        Residential
      </button>

      <button
        onClick={() => setActiveTab("Commercial")}
        className={`px-6 py-4 shrink-0 ... ${
          activeTab === "Commercial"
            ? "text-blue-600 border-b-4 border-blue-600"
            : "text-gray-500"
        }`}
      >
        Commercial
      </button>

      <button
        onClick={() => setActiveTab("Land")}
        className={`px-6 py-4 shrink-0 ... ${
          activeTab === "Land"
            ? "text-blue-600 border-b-4 border-blue-600"
            : "text-gray-500"
        }`}
      >
        Land
      </button>

      <button
        onClick={() => setActiveTab("Farmhouse")}
        className={`px-6 py-4 shrink-0 ... ${
          activeTab === "Farmhouse"
            ? "text-blue-600 border-b-4 border-blue-600"
            : "text-gray-500"
        }`}
      >
        Farmhouse
      </button>

      </div>

      <div className="bg-white p-5 rounded-b-2xl shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4">

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search City, Locality, Project..."
          className="flex-1 border p-4 rounded-lg text-black"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-10 rounded-lg"
        >
          Search
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-16">

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-4xl font-bold text-blue-600">
            {properties.length}
          </h2>

          <p className="text-gray-600">
            Properties Listed
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-4xl font-bold text-blue-600">
            5K+
          </h2>

          <p className="text-gray-600">
            Happy Buyers
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-4xl font-bold text-blue-600">
            100+
          </h2>

          <p className="text-gray-600">
            Cities Covered
          </p>
        </div>

      </div>

    </div>
  </div> 
  </section>

  <section
    ref={propertySectionRef}
    className="bg-gray-100 py-20"
  >

    <div className="max-w-7xl mx-auto px-6">

      <div className="flex justify-between items-center mb-12">

        <h2 className="text-4xl font-bold">
          Featured Properties
        </h2>

      </div>

      {filteredProperties.length === 0 ? (

        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">

          <h3 className="text-2xl font-bold text-gray-700">
            No Properties Found
          </h3>

          <p className="text-gray-500 mt-3">
            No matching property found for "{search}"
          </p>

        </div>

      ) : (

        <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredProperties.map((property) => (
            

              <PropertyCard
                key={property.id}
                property={property}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition relative"
              >

                <button
                  onClick={() => toggleWishlist(property.id)}
                  className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md z-10"
                >
                  {wishlist.includes(property.id) ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-gray-500 text-xl" />
                  )}
                </button>

                <img
                  src={
                    property.image_url ||
                    "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
                  }
                  alt={property.title}
                  className="h-60 w-full object-cover"
                />

                <div className="p-5">

                <div className="flex justify-between items-center mb-3">

                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    {property.property_type}
                  </span>

                </div>

                <h3 className="text-xl font-bold">
                  {property.title}
                </h3>

                <p className="text-gray-500 flex items-center gap-2 mt-2">
                  <FaMapMarkerAlt />
                  {property.location}
                </p>

                <p className="text-blue-600 font-bold text-2xl mt-3">
                  ₹ {property.price}
                </p>

                <p className="text-gray-500 mt-2">
                  {property.bedrooms} Beds • {property.bathrooms} Baths
                </p>

                <Link
                  to={`/property/${property.id}`}
                  className="block mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-center"
                >
                  View Details
                </Link>

                </div>
              </PropertyCard>

            )
          )}

        </div>

      )}

    </div>

  </section>

  <section className="py-20 bg-white">

    <div className="max-w-7xl mx-auto px-6">

      <h2 className="text-4xl font-bold text-center mb-12">
        Popular Cities
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {[
          "Delhi",
          "Mumbai",
          "Bangalore",
          "Pune",
        ].map((city) => (

          <div
            key={city}
            onClick={() => {

              setSearch(city);

              setTimeout(() => {
                propertySectionRef.current?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 100);

            }}
            className="bg-blue-50 p-8 rounded-xl text-center shadow cursor-pointer hover:bg-blue-100 transition"
          >
            <h3 className="text-2xl font-bold">
              {city}
            </h3>

            <p>
              1000+ Properties
            </p>

          </div>

        ))}

      </div>

    </div>

  </section>
</>

);
}

export default Home;