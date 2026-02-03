// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { login as loginApi, register as registerApi, getProfile as getProfileApi } from '../service/api';

export const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  authError: null,
  login: () => Promise.reject(new Error("Auth provider not initialized")),
  logout: () => {},
  register: () => Promise.reject(new Error("Auth provider not initialized")),
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const profileLoadedRef = useRef(false);

  // Função para Sair (Limpa tudo)
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setAuthError(null);
    profileLoadedRef.current = false;
  }, []);

  // Busca os dados de quem está logado (Independente de quem seja)
  const loadUserProfile = useCallback(async () => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    if (profileLoadedRef.current) return;
    profileLoadedRef.current = true;

    try {
      setAuthError(null);
      setLoading(true);
      
      const result = await getProfileApi();
      const userData = result.data.user;

      // Guarda apenas informações básicas de identificação
      setUser({
        id: userData._id || userData.id,
        nome: userData.nome || userData.nomeUsuario,
        email: userData.email,
        cnpj: userData.cnpj
      });

    } catch (error) {
      if (error.response?.status === 401) {
        logout(); // Token inválido ou expirado
      } else {
        setAuthError('Erro ao carregar sessão.');
      }
    } finally {
      setLoading(false);
    }
  }, [token, logout]);

  // Tenta recuperar a sessão ao abrir o site
  useEffect(() => {
    if (token) {
      loadUserProfile();
    } else {
      setLoading(false);
    }
  }, [token, loadUserProfile]);

  // Ação de Login
  const login = async (credentials) => {
    setLoading(true);
    setAuthError(null);
    profileLoadedRef.current = false;
    try {
      const result = await loginApi(credentials);
      const newToken = result.data.token;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      
      return result; 
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Falha no login.';
      setAuthError(errorMessage);
      setLoading(false);
      throw error;
    }
  };

  // Ação de Cadastro
  const register = async (userData) => {
    setLoading(true);
    setAuthError(null);
    try {
      const result = await registerApi(userData);
      return { success: true, message: result.data.message || "Cadastro realizado!" };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro ao criar conta.';
      setAuthError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      authError,
      login,
      logout,
      register,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};