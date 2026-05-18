import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function Register({ onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      await register(email, password, name);
    } catch (err) {
      setError(err.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="w-full max-w-md">
        <div className="rounded-lg p-8 shadow-lg" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.1)' }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#030213' }}>
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: '#ffffff' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h1 className="text-2xl mb-2" style={{ color: '#030213', fontWeight: 600 }}>
              Criar sua conta
            </h1>
            <p className="text-sm" style={{ color: '#717182' }}>
              Preencha os dados para começar
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#fee', border: '1px solid #d4183d' }}>
              <p className="text-sm" style={{ color: '#d4183d' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm" style={{ color: '#252525', fontWeight: 500 }}>
                Nome completo
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: '#f3f3f5',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  color: '#252525'
                }}
                placeholder="João Silva"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm" style={{ color: '#252525', fontWeight: 500 }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: '#f3f3f5',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  color: '#252525'
                }}
                placeholder="seu@email.com"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm" style={{ color: '#252525', fontWeight: 500 }}>
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: '#f3f3f5',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  color: '#252525'
                }}
                placeholder="••••••••"
                disabled={loading}
              />
              <p className="mt-1 text-xs" style={{ color: '#717182' }}>
                Mínimo de 6 caracteres
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-sm" style={{ color: '#252525', fontWeight: 500 }}>
                Confirmar senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: '#f3f3f5',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  color: '#252525'
                }}
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-lg transition-opacity text-white"
              style={{
                backgroundColor: '#030213',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 500
              }}
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: '#717182' }}>
              Já tem uma conta?{' '}
              <button
                onClick={onSwitchToLogin}
                className="hover:underline"
                style={{ color: '#030213', fontWeight: 500 }}
              >
                Fazer login
              </button>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs" style={{ color: '#717182' }}>
            Ao criar uma conta, você concorda com nossos Termos de Serviço e Política de Privacidade
          </p>
        </div>
      </div>
    </div>
  );
}
