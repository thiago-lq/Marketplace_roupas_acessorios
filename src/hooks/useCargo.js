  // src/hooks/useCargo.js
  import  {useAuth}  from './useAuth';

  export default function useCargo() {
    const { user, cargo } = useAuth();

    return {
      cargo: cargo,
      user: user,
      nome: user?.displayName || "Usuário",
    };
  }