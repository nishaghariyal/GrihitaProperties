import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../services/api";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    image_url: "",
    property_type: "",
    listing_type: "",
  });

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/properties/${id}`
      );

      const data = await res.json();

      setForm({
        title: data.title || "",
        description: data.description || "",
        price: data.price || "",
        location: data.location || "",
        bedrooms: data.bedrooms || "",
        bathrooms: data.bathrooms || "",
        image_url: data.image_url || "",
        property_type: data.property_type || "",
        listing_type: data.listing_type || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const token =
      localStorage.getItem("token");

    try {
      const res = await fetch(
        `${API_URL}/api/properties/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        alert("Update failed");
        return;
      }

      alert("Property Updated");

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Edit Property
        </h1>

        <form
          onSubmit={handleUpdate}
          className="space-y-4"
        >

          <input
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            placeholder="Title"
            className="w-full border p-3 rounded"
          />

          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            placeholder="Description"
            className="w-full border p-3 rounded"
          />

          <input
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
            placeholder="Price"
            className="w-full border p-3 rounded"
          />

          <input
            value={form.location}
            onChange={(e) =>
              setForm({
                ...form,
                location: e.target.value,
              })
            }
            placeholder="Location"
            className="w-full border p-3 rounded"
          />

          <input
            value={form.bedrooms}
            onChange={(e) =>
              setForm({
                ...form,
                bedrooms: e.target.value,
              })
            }
            placeholder="Bedrooms"
            className="w-full border p-3 rounded"
          />

          <input
            value={form.bathrooms}
            onChange={(e) =>
              setForm({
                ...form,
                bathrooms: e.target.value,
              })
            }
            placeholder="Bathrooms"
            className="w-full border p-3 rounded"
          />

          <input
            value={form.image_url}
            onChange={(e) =>
              setForm({
                ...form,
                image_url: e.target.value,
              })
            }
            placeholder="Image URL"
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Update Property
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProperty;