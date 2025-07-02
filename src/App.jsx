// src/App.jsx
import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import Perfil from "./pages/Perfil"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="pt-16 pb-8"> {/* Espaço para o NavBar (top) e fundo (bottom) */}
          <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
