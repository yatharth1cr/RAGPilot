import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ChatBox from "./components/ChatBox";
import AdminUpload from "./components/AdminUpload";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatBox />} />
        <Route path="/admin" element={<AdminUpload />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
