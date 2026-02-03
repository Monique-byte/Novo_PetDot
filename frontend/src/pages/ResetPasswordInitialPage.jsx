
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ResetPasswordInitialPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Você implementaria aqui a lógica para o usuário digitar uma nova senha.
  // Pode ser um formulário simples. Após a redefinição, o backend deve setar
  // mustResetPassword para false.

  const handlePasswordReset = () => {
    // Lógica para redefinir a senha (chamar uma API de resetPassword)
    // Se bem-sucedido, faça logout e force o login com a nova senha.
    // Ou, se a API retornar o novo token, atualize o contexto e navegue para o dashboard.
    alert('Funcionalidade de redefinição de senha inicial a ser implementada.');
    logout(); // Exemplo: força logout para login com a nova senha
  };

  if (!user || !user.mustResetPassword) {
    // Se não há usuário ou não precisa resetar a senha, redireciona para a home
    navigate('/');
    return null;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Redefinição de Senha Obrigatória</h1>
      <p>Olá, {user.nomeUsuario}! Por segurança, você deve redefinir sua senha.</p>
      <p>Por favor, crie uma nova senha para continuar usando o sistema.</p>
      {/* Aqui você adicionaria um formulário para a nova senha */}
      <button onClick={handlePasswordReset} style={{ margin: '10px' }}>
        Redefinir Senha
      </button>
      <button onClick={logout} style={{ margin: '10px', backgroundColor: 'red', color: 'white' }}>
        Sair
      </button>
      <p><small>Este é um placeholder. Você precisará implementar o formulário de redefinição aqui.</small></p>
    </div>
  );
}