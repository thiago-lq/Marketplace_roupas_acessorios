import { useState } from "react";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import PerfilAdm from "./pages/PerfilAdm";
import CarrinhoFlutuante from "./components/CarrinhoFlutuante";
import PaginaLogin from "./components/PaginaLogin";
import Footer from "./components/Footer";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [cart, setCart] = useState([]);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);

  const toggleCarrinho = () => setMostrarCarrinho(prev => !prev);

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
  };
   const handleRemoveFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };


  return (
    <BrowserRouter>
      <div className="pt-16 pb-8"> {/* Espaço para o NavBar (top) e fundo (bottom) */}
        <NavBar onCarrinhoClick={toggleCarrinho} />
      </div>

      <Routes>
        <Route
          path="/"
          element={<Home onAddToCart={handleAddToCart} />}
        />
        <Route path="/PaginaLogin" element={<PaginaLogin/>} />
        <Route path="/PerfilAdm" element={<PerfilAdm/>} />
      </Routes>

      <CarrinhoFlutuante
        visivel={mostrarCarrinho}
        produtos={cart}
        onClose={() => setMostrarCarrinho(false)}
         onRemoveFromCart={handleRemoveFromCart}  // <-- passar aqui
      />
      <div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
