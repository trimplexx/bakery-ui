import './App.css';
import { Navbar } from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Products from "./components/Products";
import Login from "./components/Login";
import ShoppingCard from './components/ShoppingCard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="products" element={<Products />} />
          <Route path="login" element={<Login />} />
          <Route path="shoppingCard" element={<ShoppingCard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
