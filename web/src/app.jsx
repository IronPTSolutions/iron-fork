import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Restaurant from "./pages/restaurant";
import Navbar from "./components/ui/navbar/navbar";
import Register from "./pages/register";
import Login from "./pages/login";
import { AlertProvider } from "./contexts/alert.context";
import Footer from "./components/ui/footer/footer";
import Restaurants from "./pages/restaurants";

function App() {
  return (
    <>
      <main className="flex-shrink-0">
        <Navbar />

        <AlertProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurants/:id" element={<Restaurant />} />
          </Routes>
        </AlertProvider>
      </main>
      <Footer />
    </>
  );
}

export default App;
