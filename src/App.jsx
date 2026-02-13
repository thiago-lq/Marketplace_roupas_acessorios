import { useState } from "react";
import Home from "./pages/Home";
import { NavBar } from "./components/navbars";
import PerfilAdm from "./pages/PerfilAdm";
import CarrinhoFlutuante from "./components/carrinhos";
import { Login } from "./components/usuario";
import PerfilUsuario from "./pages/PerfilUsuario";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { ProductsProvider } from "./contexts/ProductsProvider";
import PrivateRoute from "./routes/PrivateRoute";
import Busca from "./pages/Busca";
import ProdutoPag from "./pages/ProdutoPag";
import PaginaCarrinho from "./pages/PaginaCarrinho";

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

  const handleClearCart = () => {
    setCart([]);
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
            <Route path="/" element={<Home />} />

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

            <Route path="/Busca" element={<Busca />} />

            <Route
              path="/produto/:id"
              element={<ProdutoPag onAddToCart={handleAddToCart} />}
            />

            <Route
              path="/Busca/produto/:id"
              element={<ProdutoPag onAddToCart={handleAddToCart} />}
            />

            <Route
              path="/PaginaCarrinho"
              element={
                <PrivateRoute>
                  <PaginaCarrinho
                    produtos={cart}
                    onRemoveFromCart={handleRemoveFromCart}
                    onClearCart={handleClearCart} // Nova prop
                  />
                </PrivateRoute>
              }
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
        </AuthProvider>
      </ProductsProvider>
    </BrowserRouter>
  );
}

export default App;
