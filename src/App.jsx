import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FleetListing from './pages/FleetListing';
import YachtDetails from './pages/YachtDetails';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Services from './pages/Services';
import './index.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-wrapper bg-primary min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<FleetListing />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/yacht/:id" element={<YachtDetails />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
