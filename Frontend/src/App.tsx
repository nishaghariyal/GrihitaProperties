import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditProperty from "./pages/EditProperty";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PropertyDetail from "./pages/PropertyDetail";
import CreateProperty from "./pages/CreateProperty";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Wishlist from "./pages/wishlist";
import DashboardViews from "./pages/DashboardViews";
import DashboardInquiries from "./pages/DashboardInquiries";
import AdminDashboard from "./pages/AdminDashboard";
import CreateSeller from "./pages/CreateSeller";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/property/:id"
          element={<PropertyDetail />}
        />

        <Route
          path="/edit-property/:id"
          element={<CreateProperty />}
        />

        <Route
          path="/edit-property/:id"
          element={<EditProperty />}
        />

        {/* Protected Routes */}
        <Route
          path="/create-property"
          element={
            <ProtectedRoute>
              <CreateProperty />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/views"
          element={<DashboardViews />}
        />

        <Route
        path="/dashboard/inquiries"
        element={<DashboardInquiries/>}
        />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route
        path="/create-seller"
        element={<CreateSeller/>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;