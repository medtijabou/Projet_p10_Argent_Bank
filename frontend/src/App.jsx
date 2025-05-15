import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home'; 
import Signin from './Components/Signin';

import UserProfile from './Components/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/UserProfile" element={<UserProfile />} /> 

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
