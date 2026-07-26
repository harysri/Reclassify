import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import About from "./Pages/About";
import WasteClassification from "./Pages/User/WasteClassification";
import Profile from "./Pages/User/Profile";
import SchedulePickup from "./Pages/User/SchedulePickup";
import UserDashboard from "./Pages/User/UserDashboard";
import RewardTracker from "./Pages/User/RewardTracker";
import Shop from "./Pages/User/Shop";
import ProductDetail from "./Pages/User/ProductDetail";
import Cart from "./Pages/User/Cart";
import Checkout from "./Pages/User/Checkout";
import OrderHistory from "./Pages/User/Orderhistory";
import OrderDetail from "./Pages/User/OrderDetail";
import PickupHistory from "./Pages/User/Pickuphistory";
import DriverDashboard from "./Pages/Driver/DriverDashboard";
import BookingDetail from "./Pages/Driver/BookingDetail";
import ActivePickup from "./Pages/Driver/ActivePickup";
import DriverPickupHistory from "./Pages/Driver/DriverPickupHistory";
import DriverProfile from "./Pages/Driver/DriverProfile";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import UserManagement from "./Pages/Admin/UserManagement";
import DriverManagement from "./Pages/Admin/DriverManagement";
import PickupOversight from "./Pages/Admin/PickupOversight";
import ProductManagement from "./Pages/Admin/ProductManagement";
import OrdersOverview from "./Pages/Admin/OrdersOverview";
import DriverDetail from "./Pages/Admin/Driverdetail";
import { AuthProvider } from "./Components/Authcontext";
import ScrollToTop from "./Components/ScrollToTop";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/user/classify" element={<WasteClassification />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/schedule-pickup" element={<SchedulePickup />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/reward-tracker" element={<RewardTracker />} />
            <Route path="/user/shop" element={<Shop />} />
            <Route path="/user/shop/product/:id" element={<ProductDetail />} />
            <Route path="/user/cart" element={<Cart />} />
            <Route path="/user/checkout" element={<Checkout />} />
            <Route path="/user/order-history" element={<OrderHistory />} />
            <Route path="/user/orders/:id" element={<OrderDetail />} />
            <Route path="/user/pickup-history" element={<PickupHistory />} />
            <Route path="/driver/dashboard" element={<DriverDashboard />} />
            <Route path="/driver/booking/:id" element={<BookingDetail />} />
            <Route
              path="/driver/active-pickup/:id"
              element={<ActivePickup />}
            />
            <Route path="/driver/history" element={<DriverPickupHistory />} />
            <Route path="/driver/profile" element={<DriverProfile />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/drivers" element={<DriverManagement />} />
            <Route path="/admin/pickups" element={<PickupOversight />} />
            <Route path="/admin/products" element={<ProductManagement />} />
            <Route path="/admin/orders" element={<OrdersOverview />} />
            <Route path="/admin/drivers/:id" element={<DriverDetail />} />
          </Routes>
        </AuthProvider>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
