import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../Auth/Services/AuthService";

// You can pass props using the spread operator to throw them on an object if there are too many to break out
const ProtectedRoute = ({ element: Component, ...rest }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkUser()) {
      navigate("/auth");
    }
  }, [navigate]);

  return checkUser() ? <Component /> : null;
};

export default ProtectedRoute;
