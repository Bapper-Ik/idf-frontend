// auth.js

import axios from "axios";

const verifyToken = async () => {
  const token = localStorage.getItem("adminToken");
  const base_url = "http://localhost:8000";

  if (!token) return false;

  try {
    const response = await axios.post(
      base_url + `/admin/auth/verify-token?token=${token}`
    );
    return response.data.valid;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { verifyToken };
