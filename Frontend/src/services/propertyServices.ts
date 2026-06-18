import API_URL from "./api";

export const getProperties = async () => {
  const res = await fetch(
    `${API_URL}/api/properties`
  );

  return await res.json();
};