import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkLogin } from "./Store/reducers/userReducer";
import loader from "../Image/loader.gif";
function RequireAuth({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(true);

  const detectKeyDown = (e) => {
    // console.log(e.key)
    if (e.key === "F1") {
      e.preventDefault();
      // alert("F1 press")
      navigate("/order");
      // console.log("clicked key", e.key);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
  }, []);

  const checkIsLogin = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const data = await dispatch(checkLogin(userId));
      // console.log("data",data.payload?.info?.data)
      if (data.payload?.info) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
        }
      } else {
        setIsLogin(false);
      }
        setLoading(false);
      };
    useEffect(() => {
        checkIsLogin();
    }, []);

  if (loading) {
      return (
           <div className="d-flex align-items-center justify-content-center vh-100">
               <img src={loader} />
           </div>
    );
  }
  if (isLogin === false) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
}

export default RequireAuth;
