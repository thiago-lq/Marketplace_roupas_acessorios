import { useState } from "react";
import Home from "./pages/Home";
import {NavBar}  from "./components/navbars";
import PerfilAdm from "./pages/PerfilAdm";
import CarrinhoFlutuante from "./components/carrinhos";
import { Login } from "./components/usuario";
import Footer from "./components/footers";
import PerfilUsuario from "./pages/PerfilUsuario";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import PrivateRoute from "./routes/PrivateRoute";
import Busca from "./pages/Busca";

function App() {
  const [cart, setCart] = useState([]);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  const toggleCarrinho = () => setMostrarCarrinho((prev) => !prev);
  const toggleLogin = () => setMostrarLogin((prev) => !prev);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };
  const handleRemoveFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <BrowserRouter>
      <ProductsProvider>
        <AuthProvider>
          <div className="pt-16 pb-8">
            <NavBar
              onCarrinhoClick={toggleCarrinho}
              onLoginClick={toggleLogin}
            />
          </div>

          <Routes>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />

            <Route
              path="/PerfilAdm"
              element={
                <PrivateRoute adminOnly={true}>
                  <PerfilAdm />
                </PrivateRoute>
              }
            />

            <Route
              path="/PerfilUsuario"
              element={
                <PrivateRoute>
                  <PerfilUsuario />
                </PrivateRoute>
              }
            />

            <Route
              path="/Busca"
              element={<Busca />}
            />
          </Routes>
          <CarrinhoFlutuante
            visivel={mostrarCarrinho}
            produtos={cart}
            onClose={() => setMostrarCarrinho(false)}
            onRemoveFromCart={handleRemoveFromCart}
          />
          <Login
            visivel={mostrarLogin}
            onClose={() => setMostrarLogin(false)}
          />
          <div>
            <Footer />
          </div>
        </AuthProvider>
      </ProductsProvider>
    </BrowserRouter>
  );
}

export default App;
