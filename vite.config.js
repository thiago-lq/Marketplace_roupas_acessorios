// Importa a função defineConfig do Vite, que ajuda a dar autocomplete e validação de tipos na configuração do projeto
import { defineConfig } from 'vite'

// Plugin oficial para o Vite entender e otimizar projetos React
import react from '@vitejs/plugin-react'

// Plugin que integra o Tailwind CSS direto no fluxo do Vite
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/

// Aqui é onde exporta a configuração do Vite
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
