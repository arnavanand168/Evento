import React, { useState } from "react";
import Navbar from './components/Navbar.jsx';
import ImageCarousel from './components/ImageCarousel.jsx';
import PlanEventSection from './components/IntroToServices.jsx';
import ServicesSection from './components/ServicesSection.jsx';
import Prices from "./components/prices.jsx";
import BookInThreeSteps from "./components/EasySteps.jsx";
import Testimonials from './components/Testimonials.jsx';
import Footer from "./components/Footer.jsx";
import BanquetHallsPage from "./pages/BanquetHalls.jsx";
import VenueDetailPage from "./pages/VenueDetailPage.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login.jsx";
import banquetHalls from "./assets/BanquetHalls.js";
import FinalBooking from "./pages/FinalBooking.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import PartnerLogin from "./components/Vendors/PartnerLogin.jsx";
import PartnerDashboard from "./components/Vendors/PartnerDashboard.jsx";
import SimpleNavbar from "./components/Vendors/SimpleNavbar.jsx";
import WeddingPackages from "./pages/WeddingPackages.jsx";
import AnniversaryPackages from "./pages/AnniversaryPackages.jsx";
import BirthdayPackages from "./pages/BirthdayPackages.jsx";
import CorporatePackages from "./pages/CorporatePackages.jsx";
function HomePage() {
  return (
    <div>
      <ImageCarousel />
      <PlanEventSection />
      <ServicesSection />
      <BookInThreeSteps />
      <Prices />
      <Testimonials />
    </div>
  );
}

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation(); // ✅ Now this is inside BrowserRouter context

  // Hide original Navbar/Footer and show SimpleNavbar on partner pages only
  const isPartnerPage =
    location.pathname.startsWith("/partner-login") ||
    location.pathname.startsWith("/partner-dashboard");

  return (
    <div>
      {!isPartnerPage && <Navbar onLoginClick={() => setShowLogin(true)} />}
      {isPartnerPage && <SimpleNavbar showLogout={location.pathname === "/partner-dashboard"} />}
      {showLogin && !isPartnerPage && <Login onClose={() => setShowLogin(false)} />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/banquet-halls/:city?" element={<BanquetHallsPage banquetHalls={banquetHalls} />} />
        <Route path="/venue/:venueId" element={<VenueDetailPage banquetHalls={banquetHalls} />} />
        <Route path="/finalBooking" element={<FinalBooking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/partner-login" element={<PartnerLogin />} />
        <Route path="/partner-dashboard" element={<PartnerDashboard />} />
        <Route path="/event-packages/wedding" element={<WeddingPackages />} />
        <Route path="/event-packages/anniversary" element={<AnniversaryPackages />} />
        <Route path="/event-packages/birthday" element={<BirthdayPackages />} />
        <Route path="/event-packages/corporate" element={<CorporatePackages />} />
      </Routes>
      
      {!isPartnerPage && <Footer />}
    </div>
  );
};

export default App;
