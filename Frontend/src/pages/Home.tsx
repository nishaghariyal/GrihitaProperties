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

import hero from "../assets/hero.png";

function Home() {
const [properties, setProperties] = useState<any[]>([]);
const [search, setSearch] = useState("");
const [suggestions, setSuggestions] = useState<any[]>([]);
const [, setLoadingSuggestions] = useState(false);
const [activeTab, setActiveTab] = useState("Residential");
const [wishlist, setWishlist] = useState<number[]>(
  JSON.parse(
    localStorage.getItem("wishlist") || "[]"
  )
);

const [debouncedSearch, setDebouncedSearch] = useState(search);

const propertySectionRef =
useRef<HTMLDivElement>(null);

useEffect(() => {
fetchProperties();
}, []);

const fetchProperties = async () => {
try {
const res = await axios.get(
"https://grihitaproperties.onrender.com/api/properties"
);
  console.log(res.data)
  setProperties(res.data);
} catch (error) {
  console.error(error);
}

};

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 300);

  return () => clearTimeout(timer);
}, [search]);

useEffect(() => {
  fetchSuggestions(debouncedSearch);
}, [debouncedSearch]);

const fetchSuggestions = async (value: string) => {

  if (value.length < 2) {
    setSuggestions([]);
    return;
  }

  try {

    setLoadingSuggestions(true);

    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search`,
      {
        params: {
          q: value,
          countrycodes: "in",
          format: "json",
          addressdetails: 1,
          limit: 6,
        },
      }
    );

    console.log(res.data);

    setSuggestions(res.data);

  } catch (err) {

    console.log(err);

  } finally {

    setLoadingSuggestions(false);

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
  className="
  relative
  min-h-svh
  md:min-h-screen
  flex
  items-center
  bg-cover
  bg-center
  bg-no-repeat
  "
  style={{
    backgroundImage: `url(${hero})`,
  }}
>
  <div className="absolute inset-0 bg-black/45 md:bg-black/35"></div>

  <div className="relative z-10 w-full py-20 md:py-28">
    <div className="max-w-7xl mx-auto px-6">

      <div className="text-center text-white">

        <div className="flex justify-center mb-8">

        <span className="bg-white/15 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full uppercase tracking-[0.3em] text-xs">

        India's Trusted Real Estate

        </span>

        </div>

        <h1 className="max-w-4xl mx-auto text-center text-5xl md:text-7xl font-black leading-tight text-white">

        Find a place

        <span className="block text-amber-400 italic font-serif">
        you'll love
        </span>

        coming home to.

        </h1>

        <p className="max-w-3xl mx-auto mt-8 text-lg md:text-2xl text-gray-200 leading-8">

        Buy, Rent and Sell premium homes,
        commercial spaces, land and farmhouses
        across India's most loved cities.

        </p>

      </div>

      <div className="mt-14 bg-white/95 backdrop-blur-xl rounded-t-3xl shadow-2xl border border-white/40">
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

      <div className="bg-white/95 backdrop-blur-xl p-6 rounded-b-3xl shadow-2xl border border-white/40">

        <div className="relative flex-1">

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Search City, Locality, Project..."
            className="w-full border p-4 rounded-lg text-black"
          />

          {suggestions.length > 0 && (

            <div className="absolute left-0 right-0 top-full bg-white shadow-lg rounded-lg mt-2 max-h-72 overflow-y-auto z-50">

              {suggestions.map((item: any) => (

                <div
                  key={item.place_id}
                  onClick={() => {

                    setSearch(item.display_name);

                    setSuggestions([]);

                  }}
                  className="p-3 hover:bg-gray-100 cursor-pointer border-b"
                >

                  📍 {item.display_name}

                </div>

              ))}

            </div>

          )}

        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-10 rounded-lg"
        >
          Search
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-16">

        <div className="bg-white/95 backdrop-blur-lg p-6 rounded-2xl shadow-2xl hover:-translate-y-2 hover:shadow-blue-200 transition-all duration-300 text-center">
          <h2 className="text-4xl font-bold text-blue-600">
            {properties.length}
          </h2>

          <p className="text-gray-600">
            Properties Listed
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-lg p-6 rounded-2xl shadow-2xl hover:-translate-y-2 hover:shadow-blue-200 transition-all duration-300 text-center">
          <h2 className="text-4xl font-bold text-blue-600">
            5K+
          </h2>

          <p className="text-gray-600">
            Happy Buyers
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-lg p-6 rounded-2xl shadow-2xl hover:-translate-y-2 hover:shadow-blue-200 transition-all duration-300 text-center">
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

  <section className="bg-white py-20">

    <div className="max-w-7xl mx-auto px-6">

      <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">

        The thoughtful way to find home.

      </h2>

      <p className="text-center text-gray-500 mb-14">

        Why thousands of buyers trust Grihita.

      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

          <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl mb-5">

            🛡️

          </div>

          <h3 className="text-2xl font-bold mb-3">

            Verified Listings

          </h3>

          <p className="text-gray-500 leading-7">

            Every property is verified before being listed so buyers get genuine information.

          </p>

        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl mb-5">

            💰

          </div>

          <h3 className="text-2xl font-bold mb-3">

            Zero Brokerage

          </h3>

          <p className="text-gray-500 leading-7">

            Connect directly with owners and trusted sellers without hidden charges.

          </p>

        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl mb-5">

            🏡

          </div>

          <h3 className="text-2xl font-bold mb-3">

            Curated Spaces

          </h3>

          <p className="text-gray-500 leading-7">

            Premium homes, villas, apartments and land selected with quality standards.

          </p>

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
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative border border-gray-100"
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

                <div className="overflow-hidden">
                  <img
                    src={property.image_url || "https://images.unsplash.com/photo-1568605114967-8130f3a36994"}
                    alt={property.title}
                    className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="p-5">

                <div className="flex justify-between items-center mb-3">

                  <span className="bg-linear-to-r from-amber-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-semibold tracking-wide">
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

                <p className="text-3xl font-extrabold text-emerald-600 mt-4">
                  ₹ {property.price}
                </p>

                <p className="text-gray-500 mt-2">
                  {property.bedrooms} Beds • {property.bathrooms} Baths
                </p>

                <Link
                  to={`/property/${property.id}`}
                  className="block mt-6 w-full bg-gray-900 hover:bg-black text-white py-3 rounded-full text-center transition duration-300"
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