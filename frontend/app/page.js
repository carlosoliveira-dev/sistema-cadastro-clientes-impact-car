"use client"
import { useState, useEffect } from 'react';
import { CustomerForm } from './components/CustomerForm';
import { CustomerList } from './components/CustomerList';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthPage } from './components/AuthPage';

function AppContent() {
  const { user, logout} = useAuth();
  const [viewMode, setViewMode] = useState('app');
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

const API_URL = 'http://localhost:4000/customers';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

useEffect(() => {
  if (user) {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            // Envia o token salvo no login para o backend autenticar a rota
            'Authorization': `Bearer ${user.token || localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Erro ao buscar clientes.');
        const data = await response.json();
        setCustomers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }
}, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('customers', JSON.stringify(customers));
    }
  }, [customers, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4" style={{ borderColor: '#f3f3f5', borderTopColor: '#030213' }}></div>
          <p className="mt-4" style={{ color: '#717182' }}>Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center text-red-600">
          <p className="font-bold">Ocorreu um erro:</p>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg text-sm"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const handleAddCustomer = (customerData) => {
    const newCustomer = {
      ...customerData,
      id: Date.now().toString(),
    };
    setCustomers(prev => [newCustomer, ...prev]);
    setShowForm(false);
  };

  const handleUpdateCustomer = (customerData) => {
    if (editingCustomer) {
      setCustomers(prev =>
        prev.map(customer =>
          customer.id === editingCustomer.id
            ? { ...customerData, id: customer.id }
            : customer
        )
      );
      setEditingCustomer(null);
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;
    setError(null);

    try {
      // Obtém o token do objeto user (contexto) ou do localStorage como fallback
      const token = user?.token || localStorage.getItem('token');

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Se o backend retornar erro (como 401 ou 404), cai no catch
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Erro ao excluir o cliente.');
      }

      // Só remove da tela (estado local) se o backend confirmou a exclusão
      setCustomers(prev => prev.filter(customer => customer.id !== id));
      
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingCustomer(null);
    setShowForm(false);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  if (viewMode === 'prototypes') {
    return <PrototypeViewer onBack={() => setViewMode('app')} />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <div className="shadow-lg" style={{ backgroundColor: '#030213', color: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h1>Sistema de Cadastro</h1>
                <p className="text-sm opacity-90 mt-0.5">
                  Bem-vindo, {user?.name || user?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('prototypes')}
                className="px-4 py-2 rounded-lg transition-colors text-sm flex items-center gap-2 hover:opacity-80"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                />
              </svg>
              Ver Protótipos
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg transition-colors text-sm flex items-center gap-2 hover:opacity-80"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sair
            </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="rounded-lg p-6 sticky top-8" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.1)' }}>
              <div className="flex items-center justify-between mb-6">
                <h2>{editingCustomer ? 'Editar Cliente' : 'Novo Cliente'}</h2>
                {!showForm && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="lg:hidden px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#030213', color: '#ffffff' }}
                  >
                    Adicionar
                  </button>
                )}
              </div>

              <div className={showForm ? 'block' : 'hidden lg:block'}>
                <CustomerForm
                  customer={editingCustomer}
                  onSubmit={editingCustomer ? handleUpdateCustomer : handleAddCustomer}
                  onCancel={handleCancelEdit}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2>Clientes Cadastrados</h2>
                  <p className="text-sm mt-1" style={{ color: '#717182' }}>
                    Total: {filteredCustomers.length} {filteredCustomers.length === 1 ? 'cliente' : 'clientes'}
                  </p>
                </div>

                <div className="relative flex-1 sm:max-w-xs">
                  <input
                    type="text"
                    placeholder="Buscar clientes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: '#f3f3f5',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      color: '#252525'
                    }}
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: '#717182' }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <CustomerList
              customers={filteredCustomers}
              onEdit={handleEditCustomer}
              onDelete={handleDeleteCustomer}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}