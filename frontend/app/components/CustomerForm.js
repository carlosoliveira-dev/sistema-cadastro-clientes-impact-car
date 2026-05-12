import { useState, useEffect } from 'react';

export function CustomerForm({ customer, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    address: customer?.address || '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
      });
    }
  }, [customer]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
      });
      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2" style={{ color: '#252525' }}>
          Nome *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2"
          style={{
            backgroundColor: '#f3f3f5',
            border: errors.name ? '1px solid #d4183d' : '1px solid rgba(0, 0, 0, 0.1)',
            color: '#252525'
          }}
          placeholder="Nome completo"
        />
        {errors.name && <p className="mt-1 text-sm" style={{ color: '#d4183d' }}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block mb-2" style={{ color: '#252525' }}>
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2"
          style={{
            backgroundColor: '#f3f3f5',
            border: errors.email ? '1px solid #d4183d' : '1px solid rgba(0, 0, 0, 0.1)',
            color: '#252525'
          }}
          placeholder="email@exemplo.com"
        />
        {errors.email && <p className="mt-1 text-sm" style={{ color: '#d4183d' }}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block mb-2" style={{ color: '#252525' }}>
          Telefone *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2"
          style={{
            backgroundColor: '#f3f3f5',
            border: errors.phone ? '1px solid #d4183d' : '1px solid rgba(0, 0, 0, 0.1)',
            color: '#252525'
          }}
          placeholder="(00) 00000-0000"
        />
        {errors.phone && <p className="mt-1 text-sm" style={{ color: '#d4183d' }}>{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="address" className="block mb-2" style={{ color: '#252525' }}>
          Endereço
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 resize-none"
          style={{
            backgroundColor: '#f3f3f5',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            color: '#252525'
          }}
          placeholder="Endereço completo"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#030213', color: '#ffffff' }}
        >
          {customer ? 'Atualizar' : 'Cadastrar'}
        </button>
        {customer && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#f2f2f5', color: '#030213' }}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
