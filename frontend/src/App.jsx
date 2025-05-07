import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home'; 
import Signin from './Pages/Signin';
import User from './Pages/User';
function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/user" element={<User />} />
    
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
