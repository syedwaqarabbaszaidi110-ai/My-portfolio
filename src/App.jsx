import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
      {loading && <Loader onFinish={() => setLoading(false)} />}

      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}