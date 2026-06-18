import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API_URL from "../services/api";
import { useDropzone } from "react-dropzone";

function CreateProperty() {
  const navigate = useNavigate();
  const [images,setImages]=useState<File[]>([]);
  const [videos,setVideos]=useState<File[]>([]);

  
  const {
  getRootProps,
  getInputProps
  } = useDropzone({
  accept: {
    "image/*": []
  },

  onDrop: (acceptedFiles) => {
    setImages(acceptedFiles);
  }
  });

  const {
  getRootProps: getVideoRootProps,
  getInputProps: getVideoInputProps
  } = useDropzone({
  accept: {
    "video/*": []
  },

  onDrop: (acceptedFiles) => {
    setVideos(acceptedFiles);
  }
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    listing_type: "Property",
    property_type: "Residential",
    location: "",
    bedrooms: "",
    bathrooms: "",
    image_url: "",
  });

  const [loading,setloading]=useState(false);
  
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    
    if(loading) return;
    setloading(true);

    const token = localStorage.getItem("token");

    try {
      let imageUrls: string[] = [];

      // Upload all images
      if (images.length > 0) {

        const imageData = new FormData();

        images.forEach((image) => {
          imageData.append("images", image);
        });

        const uploadRes = await fetch(
          "http://localhost:5000/api/upload",
          {
            method: "POST",
            body: imageData,
          }
        );

        const uploadData = await uploadRes.json();

        console.log("Upload Response:", uploadData);

        if (!uploadRes.ok) {
          alert(uploadData.message || "Image upload failed");
          return;
        }

        imageUrls = uploadData.imageUrls;
      }

      // Save property
      const res = await fetch(
        `${API_URL}/api/properties`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            image_urls: imageUrls,
            price: Number(form.price),
            bedrooms: Number(form.bedrooms),
            bathrooms: Number(form.bathrooms),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create property");
        return;
      }

      alert("Property Created Successfully!");

      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally{
      setloading(false);
    }
  };

  

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10">

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
            Post Your Property
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Residential • Commercial • Land • Farmhouse
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              name="title"
              placeholder="Property Title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              name="description"
              placeholder="Property Description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg h-32"
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />

            <select
              name="property_type"
              value={form.property_type}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option value="Residential">
                Residential
              </option>

              <option value="Commercial">
                Commercial
              </option>

              <option value="Land">
                Land
              </option>

              <option value="Farmhouse">
                Farmhouse
              </option>
            </select>

            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />

            <div className="grid grid-cols-2 gap-4">

              <input
                type="number"
                name="bedrooms"
                placeholder="Bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
                required
                className="border p-3 rounded-lg"
              />

              <input
                type="number"
                name="bathrooms"
                placeholder="Bathrooms"
                value={form.bathrooms}
                onChange={handleChange}
                required
                className="border p-3 rounded-lg"
              />

            </div>

            {/* Image Upload */}

            <div
              {...getRootProps()}
              className="border-2 border-dashed p-6 rounded-lg cursor-pointer text-center"
            >
              <input {...getInputProps()} />

              <p>Drag & Drop Images Here</p>

              <p>or Click to Upload</p>
            </div>

            <p className="mt-2">
              Selected Images: {images.length}
            </p>

            <div className="grid grid-cols-3 gap-4 mt-4">

              {images.map((file, index) => (

                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt=""
                  className="h-32 w-full object-cover rounded-lg"
                />

              ))}

            </div>

            {/* Video Upload */}

            <div
              {...getVideoRootProps()}
              className="border-2 border-dashed p-6 rounded-lg cursor-pointer text-center mt-4"
            >
              <input {...getVideoInputProps()} />

              <p>Drag & Drop Videos Here</p>

              <p>or Click to Upload</p>
            </div>

            <p className="mt-2">
              Selected Videos: {videos.length}
            </p>

            <div className="mt-4">

              {videos.map((file, index) => (

                <video
                  key={index}
                  controls
                  className="w-full rounded-lg"
                >
                  <source
                    src={URL.createObjectURL(file)}
                  />
                </video>

              ))}

            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Creating..." : "Create Property"}
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default CreateProperty;