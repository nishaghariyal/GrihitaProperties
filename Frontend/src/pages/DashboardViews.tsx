import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function DashboardViews() {

  const [buyers, setBuyers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchViews();
  }, []);

  const fetchViews = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://grihitaproperties.onrender.com/api/property-views/seller",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBuyers(res.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-4xl font-bold mb-8">
            Interested Buyers
          </h1>

          {loading ? (

            <div className="text-center text-xl">
              Loading...
            </div>

          ) : buyers.length === 0 ? (

            <div className="bg-white rounded-xl shadow p-10 text-center">

              <h2 className="text-2xl font-bold">
                No Buyers Yet
              </h2>

              <p className="text-gray-500 mt-2">
                Nobody has viewed your properties yet.
              </p>

            </div>

          ) : (

            <div className="grid gap-6">

              {buyers.map((buyer: any) => (

                <div
                  key={`${buyer.id}-${buyer.title}`}
                  className="bg-white rounded-xl shadow-lg p-6"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h2 className="text-2xl font-bold">
                        {buyer.name}
                      </h2>

                      <p className="text-gray-600 mt-2">
                        📧 {buyer.email}
                      </p>

                      <p className="text-gray-600">
                        📱 {buyer.phone || "Not Available"}
                      </p>

                      <p className="mt-3">
                        <span className="font-semibold">
                          Property:
                        </span>{" "}
                        {buyer.title}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Viewed:
                        </span>{" "}
                        {buyer.view_count} Times
                      </p>

                      <p>
                        <span className="font-semibold">
                          Last Viewed:
                        </span>{" "}
                        {new Date(
                          buyer.last_viewed
                        ).toLocaleString()}
                      </p>

                    </div>

                    <div className="flex flex-col gap-3">

                      <a
                        href={`mailto:${buyer.email}?subject=Regarding your interest in ${buyer.title}`}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg text-center hover:bg-blue-700"
                      >
                        📧 Email Buyer
                      </a>

                      {buyer.phone && (
                        <a
                          href={`https://wa.me/91${buyer.phone}?text=Hello ${buyer.name}, Thank you for showing interest in my property "${buyer.title}".`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 text-white px-5 py-2 rounded-lg text-center hover:bg-green-700"
                        >
                          💬 WhatsApp
                        </a>
                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </>
  );
}

export default DashboardViews;