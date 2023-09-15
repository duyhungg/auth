import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const User = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(""); // Sử dụng state để lưu token
  const [email, setEmail] = useState("");
  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleRefresh = async () => {
    try {
      const res = await axios.post("auth/refresh-token");
      console.log(res.data.data.email);
      window.localStorage.removeItem("token");
      window.localStorage.setItem("token", res.data.data.token);
      setEmail(res.data.data.email);
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi refresh.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("auth/logout");
      console.log("Đăng xuất thành công");
      navigate("/");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("loggedIn", false);
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi đăng xuất.");
    }
  };
  return (
    <div>
      <div>
        <h2>{`email: ${email}`}</h2>
        <button onClick={handleRefresh}>Refresh Token</button>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
};

export default User;
