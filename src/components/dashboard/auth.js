// auth.js

import axios from "axios";

const verifyToken = async () => {
  const token = localStorage.getItem("adminToken");
  if (!token) return false;

  try {
    const response = await axios.post(
      `https://idf-site.onrender.com/admin/auth/verify-token?token=${token}`
    );
    return response.data.valid;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { verifyToken };
