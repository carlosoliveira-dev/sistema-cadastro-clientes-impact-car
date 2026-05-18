"use client"
import { useState, useEffect } from 'react';
import { CustomerForm } from './components/CustomerForm';
import { CustomerList } from './components/CustomerList';

// Altere para a URL real do seu backend (ex: 'http://localhost:3001/api/customers')
const API_URL = 'http://localhost:4000/clientes';

export default function App() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  // Estados para lidar com requisições assíncronas
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // GET: Buscar clientes do backend ao carregar a página
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
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
  }, []);

  // POST: Adicionar cliente no backend
  const handleAddCustomer = async (customerData) => {
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData), // O id geralmente é gerado pelo próprio backend
      });

      if (!response.ok) throw new Error('Erro ao salvar o cliente.');
      
      const newCustomer = await response.json();
      
      // Atualiza o estado local com o objeto retornado pelo banco de dados
      setCustomers(prev => [newCustomer, ...prev]);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // PUT: Atualizar cliente no backend
  const handleUpdateCustomer = async (customerData) => {
    if (!editingCustomer) return;
    setError(null);

    try {
      const response = await fetch(`${API_URL}/${editingCustomer.id}`, {
        method: 'PUT', // ou 'PATCH', dependendo da sua API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) throw new Error('Erro ao atualizar o cliente.');

      const updatedCustomer = await response.json();

      setCustomers(prev =>
        prev.map(customer =>
          customer.id === editingCustomer.id ? updatedCustomer : customer
        )
      );
      setEditingCustomer(null);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // DELETE: Remover cliente do backend
  const handleDeleteCustomer = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;
    setError(null);

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao excluir o cliente.');

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
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm)
  );

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
                  Gerencie seus clientes de forma simples e eficiente
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner de Feedback de Erro */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-700 border border-red-200">
            ⚠️ {error}
          </div>
        )}

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

            {/* Renderização condicional para o estado de Loading */}
            {loading ? (
              <div className="text-center py-12 text-gray-500">
                Carregando clientes...
              </div>
            ) : (
              <CustomerList
                customers={filteredCustomers}
                onEdit={handleEditCustomer}
                onDelete={handleDeleteCustomer}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}