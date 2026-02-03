// src/pages/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProfile, updateProfile, changePassword } from '../service/api';
import './SettingsPage.css';
import { toast } from 'react-toastify';

const SettingsPage = () => {
  const { user, updateUser } = useAuth();

  const [profile, setProfile] = useState({
    nomeUsuario: '',
    email: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const validateNewPassword = (password) => {
    if (password.length < 6) {
      return 'A nova senha deve ter pelo menos 6 caracteres.';
    }
    return null;
  };

  const validateConfirmPassword = (newPass, confirmPass) => {
    if (newPass !== confirmPass) {
      return 'A nova senha e a confirmação não coincidem.';
    }
    return null;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setPageLoading(false);
        return;
      }
      try {
        const response = await getProfile();
        const userProfile = response.data.user || response.data;

        if (userProfile) {
          setProfile({
            nomeUsuario: userProfile.nomeUsuario || '',
            email: userProfile.email || '',
          });
        } else {
          throw new Error('Dados do usuário não encontrados na resposta da API.');
        }
      } catch (err) {
        console.error('Erro ao buscar perfil:', err);
        toast.error('Erro ao carregar dados do perfil.');
      } finally {
        setPageLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const response = await updateProfile(profile);
      const updatedUser = response.data.user || response.data;
      updateUser(updatedUser);
      toast.success('Perfil atualizado com sucesso!');
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      toast.error(err.response?.data?.message || 'Erro ao atualizar perfil.');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    let validationError = validateNewPassword(passwordForm.newPassword);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    validationError = validateConfirmPassword(passwordForm.newPassword, passwordForm.confirmNewPassword);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setPasswordLoading(true);
    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success('Senha alterada com sucesso!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err) {
      console.error('Erro ao alterar senha:', err);
      toast.error(err.response?.data?.message || 'Erro ao alterar senha.');
    } finally {
      setPasswordLoading(false);
    }
  };

  if (pageLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="page-container settings-page">
        <h2>Configurações do Usuário</h2>
        <div className="alert alert-error">Você precisa estar logado para acessar esta página.</div>
      </div>
    );
  }

  return (
    <div className="page-container settings-page">
      <h2>Configurações do Usuário</h2>

      {/* ✅ NOVA DIV PARA ENVOLVER OS CARDS E APLICAR O LAYOUT LADO A LADO */}
      <div className="settings-content-wrapper"> 
        {/* Seção de Informações do Perfil */}
        <div className="settings-section">
          <h3>Informações do Perfil</h3>
          <form onSubmit={handleUpdateProfile}>
            <InputField
              label="Nome de Usuário"
              type="text"
              name="nomeUsuario"
              value={profile.nomeUsuario}
              onChange={handleProfileChange}
              required
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              required
              disabled
            />
            <Button type="submit" primary loading={profileLoading}>
              {profileLoading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </form>
        </div>

        {/* Seção de Alterar Senha */}
        <div className="settings-section">
          <h3>Alterar Senha</h3>
          <form onSubmit={handleChangePassword}>
            <InputField
              label="Senha Atual"
              type="password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              required
            />
            <InputField
              label="Nova Senha"
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              required
            />
            <InputField
              label="Confirmar Nova Senha"
              type="password"
              name="confirmNewPassword"
              value={passwordForm.confirmNewPassword}
              onChange={handlePasswordChange}
              required
            />
            <Button type="submit" primary loading={passwordLoading}>
              {passwordLoading ? 'Alterando...' : 'Alterar Senha'}
            </Button>
          </form>
        </div>
      </div> {/* FIM da NOVA DIV settings-content-wrapper */}
    </div>
  );
};

export default SettingsPage;