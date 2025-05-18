// App.jsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./redux/slices/authSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home'; 
import Signin from './Pages/Signin';
import UserProfile from './Pages/UserProfile';
import PrivateRoute from './Components/PrivateRoutes'; 
import Error404 from './Pages/Error404';

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loginTime = localStorage.getItem("loginTime");
    const now = Date.now();

    if (loginTime && now - loginTime > SESSION_DURATION) {
      dispatch(logout());
      localStorage.removeItem("authToken");
      localStorage.removeItem("loginTime");
      alert("Votre session a expiré, veuillez vous reconnecter.");
      window.location.href = "/sign-in";
    }
  }, [dispatch]);

  useEffect(() => {
    const resetTimer = () => {
      localStorage.setItem("loginTime", Date.now());
    };

    window.addEventListener("click", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("scroll", resetTimer);

    return () => {
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route
          path="/UserProfile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
