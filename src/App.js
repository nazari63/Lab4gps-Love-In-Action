import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import AboutUs from './pages/About/About'; // Make sure the path and name are correct
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './App.css'; // For any global styles

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          {/* You can add more Route components here */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
