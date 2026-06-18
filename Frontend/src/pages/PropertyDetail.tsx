import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PropertyDetail() {

  
  const { id } = useParams();

  const [property, setProperty] =
    useState<any>(null);

  useEffect(() => {

    const fetchProperty = async () => {

      try {

        const res = await fetch(
          `http://localhost:5000/api/properties/${id}`
        );

        const data = await res.json();

        setProperty(data);

        const token = localStorage.getItem("token");

        if (token) {

          await fetch(
            "http://localhost:5000/api/property-views",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                property_id: data.id,
              }),
            }
          );

        }

      } catch (error) {
        console.error(error);
      }

    };

    fetchProperty();

  }, [id]);

  const contactSeller = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/inquiries",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`
          },

          body: JSON.stringify({
            property_id: property.id,
            seller_id: property.owner_id
          })
        }
      );

      const data = await res.json();

        if (!res.ok) {
          alert(data.message);
          return;
        }

      alert("Inquiry Sent Successfully");

      console.log(data);

    } catch (error) {

      console.error(error);

      alert("Failed to send inquiry");

    }
  };

  if (!property) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Property...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="w-full bg-gray-200">

      {property.image_urls && property.image_urls.length > 0 ? (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">

          {property.image_urls.map(
            (image: string, index: number) => (

              <img
                key={index}
                src={image}
                alt={`${property.title}-${index}`}
                className="w-full h-96 object-cover rounded-lg"
              />

            )
          )}

        </div>

      ) : (

        <img
          src="https://via.placeholder.com/800x500?text=No+Image"
          alt="No Image"
          className="w-full h-96 object-cover"
        />

      )}

    </div>

      <div className="max-w-6xl mx-auto p-8">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-4xl font-bold">
            {property.title}
          </h1>

          <p className="text-gray-500 mt-2">
            {property.location}
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-4">
            ₹ {property.price}
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div>
              <h3 className="font-bold">
                Bedrooms
              </h3>

              <p>
                {property.bedrooms}
              </p>
            </div>

            <div>
              <h3 className="font-bold">
                Bathrooms
              </h3>

              <p>
                {property.bathrooms}
              </p>
            </div>

            <div>
              <h3 className="font-bold">
                Property Type
              </h3>

              <p>
                {property.property_type}
              </p>
            </div>

          </div>

          <div className="mt-8">

            <h3 className="text-2xl font-bold mb-3">
              Description
            </h3>

            <p className="text-gray-600">
              {property.description}
            </p>

          </div>

          <div className="mt-8">

            <h3 className="text-2xl font-bold mb-4">
              Seller Details
            </h3>

            <div className="bg-gray-100 p-4 rounded-lg mb-4">

              <p>
                <strong>Name:</strong>{" "}
                {property.seller_name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {property.seller_email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {property.seller_phone}
              </p>

            </div>

            <div className="flex gap-4">

              <button
                onClick={contactSeller}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
              >
                Contact Seller
              </button>

              <a
                href={`https://wa.me/${property.seller_whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
              >
                WhatsApp Seller
              </a>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PropertyDetail;
