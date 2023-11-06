import './App.css';
import { Navbar } from './components/user-components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/user-pages/Home";
import About from "./pages/user-pages/About";
import Contact from "./pages/user-pages/Contact";
import Products from "./pages/user-pages/Products";
import ShoppingCard from './components/user-components/ShoppingCard';
import NoPage from "./pages/user-pages/NoPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="products" element={<Products />} />
              <Route path="shoppingCard" element={<ShoppingCard />} />
            </Route>
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer
            position="top-center"
            autoClose={10000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover={false}
            theme="light"
            limit={1}
        />
      </div>
  );
}

export default App;
