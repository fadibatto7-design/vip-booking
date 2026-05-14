import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import BookingPage from "./pages/BookingPage";

import AdminDashboard from "./pages/AdminDashboard";

import QRScannerPage from "./pages/QRScannerPage";

import LoginPage from "./pages/LoginPage";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<BookingPage />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/scanner"
          element={<QRScannerPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

      </Routes>

    </BrowserRouter>

  );
}