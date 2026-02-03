const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Auxiliar para gerar Token JWT
const generateAuthToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, cnpj: user.cnpj },
    process.env.JWT_SECRET || 'chave_secreta_petdot',
    { expiresIn: '7d' }
  );
};

// --- REGISTRO ---
exports.register = async (req, res) => {
  const { nome, nomeOng, cnpj, email, senha } = req.body;

  try {
    const cleanedCnpj = cnpj.replace(/[^\d]/g, '');
    
    const existingUser = await User.findOne({ $or: [{ email }, { cnpj: cleanedCnpj }] });
    if (existingUser) {
      return res.status(409).json({ message: "E-mail ou CNPJ já cadastrado." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    // Gerar token de verificação de e-mail
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const newUser = await User.create({
      nome,
      nomeOng,
      cnpj: cleanedCnpj,
      email,
      senha: hashedPassword,
      isEmailVerified: false, // Começa como falso
      verificationToken,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000 // 24 horas
    });

    // Simulação de envio de e-mail (Log no console)
    console.log(`Link de Verificação: http://localhost:5173/verify-email/${verificationToken}`);

    res.status(201).json({
      message: 'ONG cadastrada com sucesso! Verifique seu e-mail para ativar a conta.',
      token: generateAuthToken(newUser)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar registro.' });
  }
};

// --- LOGIN ---
exports.login = async (req, res) => {
  const { email, cnpj, senha } = req.body;

  try {
    const cleanedCnpj = cnpj.replace(/[^\d]/g, '');
    const user = await User.findOne({ email, cnpj: cleanedCnpj });

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Opcional: Bloquear login se o e-mail não estiver verificado
    // if (!user.isEmailVerified) {
    //   return res.status(403).json({ message: 'Por favor, verifique seu e-mail antes de logar.' });
    // }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = generateAuthToken(user);
    res.json({
      message: 'Bem-vindo ao PetDot!',
      token,
      user: { 
        id: user._id, 
        nome: user.nome, 
        nomeOng: user.nomeOng, 
        cnpj: user.cnpj 
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Erro interno ao realizar login.' });
  }
};

// --- VERIFICAÇÃO DE E-MAIL ---
exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Token de verificação inválido ou expirado.' });
    }

    user.isEmailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'E-mail verificado com sucesso! Agora sua ONG está ativa.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao verificar e-mail.' });
  }
};

// --- ESQUECI A SENHA ---
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      // Resposta genérica por segurança
      return res.status(200).json({ message: 'Se o e-mail existir em nossa base, um link foi enviado.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    console.log(`Link de Reset: http://localhost:5173/reset-password/${resetToken}`);

    res.status(200).json({ message: 'Link de redefinição enviado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar solicitação.' });
  }
};

// --- RESETAR SENHA ---
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Token de redefinição inválido ou expirado.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.senha = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Senha redefinida com sucesso! Você já pode logar.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao redefinir senha.' });
  }
};