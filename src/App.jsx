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

  // Função para adicionar ao carrinho com quantidade
  const handleAddToCart = (product) => {
    setCart((prev) => {
      // Verifica se o produto já existe no carrinho (pela cor e tamanho também)
      const existingItemIndex = prev.findIndex(
        (item) =>
          item.id === product.id &&
          item.corSelecionada === product.corSelecionada &&
          item.tamanhoSelecionado === product.tamanhoSelecionado,
      );

      if (existingItemIndex !== -1) {
        // Se existe, aumenta a quantidade
        const updatedCart = [...prev];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantidade: (updatedCart[existingItemIndex].quantidade || 1) + 1,
        };
        return updatedCart;
      } else {
        // Se não existe, adiciona com quantidade 1
        return [...prev, { ...product, quantidade: 1 }];
      }
    });
  };

  // Função para aumentar quantidade
  const handleIncreaseQuantity = (index) => {
    setCart((prev) => {
      const updatedCart = [...prev];
      updatedCart[index] = {
        ...updatedCart[index],
        quantidade: (updatedCart[index].quantidade || 1) + 1,
      };
      return updatedCart;
    });
  };

  // Função para diminuir quantidade
  const handleDecreaseQuantity = (index) => {
    setCart((prev) => {
      const updatedCart = [...prev];
      const currentQuantity = updatedCart[index].quantidade || 1;

      if (currentQuantity > 1) {
        // Se quantidade > 1, diminui
        updatedCart[index] = {
          ...updatedCart[index],
          quantidade: currentQuantity - 1,
        };
        return updatedCart;
      } else {
        // Se quantidade = 1, remove o item
        return prev.filter((_, i) => i !== index);
      }
    });
  };

  // Função para remover item completamente
  const handleRemoveFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Função para limpar carrinho
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
                    cart={cart}
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                    onRemoveFromCart={handleRemoveFromCart}
                    onClearCart={handleClearCart}
                  />
                </PrivateRoute>
              }
            />
          </Routes>

          <CarrinhoFlutuante
            visivel={mostrarCarrinho}
            cart={cart}
            onClose={() => setMostrarCarrinho(false)}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
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
