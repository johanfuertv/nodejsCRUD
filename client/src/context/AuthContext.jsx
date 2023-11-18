import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { registerRequest } from "../api/auth.js";
import { loginRequest } from "../api/auth.js";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Must be within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children, isAuthenticated: initialIsAuthenticated }) => {
  // State
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(initialIsAuthenticated || false);
  const [errors, setErrors] = useState([]);

  // Prop Types for children and isAuthenticated
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
    isAuthenticated: PropTypes.bool, // Hacer que no sea requerida
  };

  // Signup Function
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error.response.data);
      setErrors([error.response.data.message]);
    }
  };

  // Signin Function
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      } else {
        setErrors([error.response.data.message]);
      }
    }
  };

  // useEffect to clear errors after 5 seconds
  useEffect(() => {
    if (errors && errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        user,
        isAuthenticated,
        setIsAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};