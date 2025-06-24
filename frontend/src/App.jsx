import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./components/Header";
import ChatBox from "./components/ChatBox";
import AdminUpload from "./components/AdminUpload";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Home from "./components/Home";
import Footer from "./components/Footer";

// Protected route for admin
function ProtectedAdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "admin") return <Navigate to="/" replace />;
  return children;
}

function App() {
  const location = useLocation();

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatBox />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminUpload />
            </ProtectedAdminRoute>
          }
        />
        <Route path="/login/user" element={<Login role="user" />} />
        <Route path="/login/admin" element={<Login role="admin" />} />
        <Route path="/signup/user" element={<Signup role="user" />} />
        <Route path="/signup/admin" element={<Signup role="admin" />} />
      </Routes>

      {location.pathname === "/" && <Footer />}
    </>
  );
}

export default App;
