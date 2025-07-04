import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import URLShortener from "./components/URLShortener";
import Header from "./components/Header";
import Features from "./components/Features";
import Footer from "./components/Footer";
import History from "./components/History";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <URLShortener />
                  <Features />
                </>
              }
            />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
