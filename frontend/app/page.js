"use client"
import { useState, useEffect } from 'react';
import { CustomerForm } from './components/CustomerForm';
import { CustomerList } from './components/CustomerList';
import { PrototypeViewer } from './components/PrototypeViewer';

export default function App() {
  const [viewMode, setViewMode] = useState('app');
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedCustomers = localStorage.getItem('customers');
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

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

  const handleDeleteCustomer = (id) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
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
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary-foreground/10 p-3 rounded-lg">
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
            <button
              onClick={() => setViewMode('prototypes')}
              className="px-4 py-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg transition-colors text-sm flex items-center gap-2"
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
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2>{editingCustomer ? 'Editar Cliente' : 'Novo Cliente'}</h2>
                {!showForm && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="lg:hidden px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
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
                  <p className="text-sm text-muted-foreground mt-1">
                    Total: {filteredCustomers.length} {filteredCustomers.length === 1 ? 'cliente' : 'clientes'}
                  </p>
                </div>

                <div className="relative flex-1 sm:max-w-xs">
                  <input
                    type="text"
                    placeholder="Buscar clientes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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