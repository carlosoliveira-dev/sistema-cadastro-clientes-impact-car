import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function Login({ onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-2xl mb-2" style={{ color: '#030213', fontWeight: 600 }}>
              Bem-vindo de volta
            </h1>
            <p className="text-sm" style={{ color: '#717182' }}>
              Entre com sua conta para continuar
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#fee', border: '1px solid #d4183d' }}>
              <p className="text-sm" style={{ color: '#d4183d' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: '#717182' }}>
              Não tem uma conta?{' '}
              <button
                onClick={onSwitchToRegister}
                className="hover:underline"
                style={{ color: '#030213', fontWeight: 500 }}
              >
                Criar conta
              </button>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs" style={{ color: '#717182' }}>
            Ao entrar, você concorda com nossos Termos de Serviço e Política de Privacidade
          </p>
        </div>
      </div>
    </div>
  );
}
