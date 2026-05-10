export function TabletPrototype() {
  const customers = [
    {
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '(11) 98765-4321',
      address: null
    },
    {
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '(21) 91234-5678',
      address: 'Rua das Flores, 123 - Rio de Janeiro'
    },
    {
      name: 'Pedro Oliveira',
      email: 'pedro@empresa.com',
      phone: '(31) 99876-5432',
      address: null
    }
  ];

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      background: '#f5f5f5',
      padding: '20px',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '768px',
        margin: '0 auto',
        background: 'white',
        boxShadow: '0 0 40px rgba(0,0,0,0.15)',
        borderRadius: '20px',
        overflow: 'hidden'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '10px',
          background: '#030213',
          color: 'white',
          fontSize: '14px',
          fontWeight: 600
        }}>
          TABLET - 768px
        </div>

        <div style={{ background: '#030213', color: 'white', padding: '24px 32px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '16px',
              borderRadius: '10px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255,255,255,0.3)',
                borderRadius: '6px'
              }} />
            </div>
            <div>
              <h1 style={{ fontSize: '24px', marginBottom: '4px', fontWeight: 500 }}>
                Sistema de Cadastro
              </h1>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>
                Gerencie seus clientes de forma simples e eficiente
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '24px',
          padding: '32px',
          background: '#fafafa'
        }}>
          <div style={{
            background: 'white',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '12px',
            padding: '24px',
            height: 'fit-content'
          }}>
            <div style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
              Novo Cliente
            </div>

            {[
              { label: 'Nome', required: true, placeholder: 'Nome completo' },
              { label: 'Email', required: true, placeholder: 'email@exemplo.com' },
              { label: 'Telefone', required: true, placeholder: '(00) 00000-0000' }
            ].map((field, idx) => (
              <div key={idx} style={{ marginBottom: '16px' }}>
                <label style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  {field.label} {field.required && <span style={{ color: '#d4183d' }}>*</span>}
                </label>
                <div style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: '#f3f3f5',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#999'
                }}>
                  {field.placeholder}
                </div>
              </div>
            ))}

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '8px',
                display: 'block'
              }}>
                Endereço
              </label>
              <div style={{
                width: '100%',
                padding: '12px 16px',
                background: '#f3f3f5',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#999',
                height: '80px'
              }}>
                Endereço completo
              </div>
            </div>

            <div style={{
              width: '100%',
              background: '#030213',
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: 500,
              marginTop: '20px',
              fontSize: '15px'
            }}>
              Cadastrar
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 600, marginBottom: '4px' }}>
                  Clientes Cadastrados
                </div>
                <div style={{ fontSize: '13px', color: '#717182' }}>
                  Total: 3 clientes
                </div>
              </div>
              <div style={{
                background: '#f3f3f5',
                padding: '12px 16px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                maxWidth: '300px'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  background: '#717182',
                  borderRadius: '50%'
                }} />
                <div style={{ color: '#717182', fontSize: '14px' }}>
                  Buscar...
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 1.5fr auto',
              gap: '12px',
              padding: '12px 20px',
              background: '#ececf0',
              borderRadius: '10px',
              fontSize: '13px',
              color: '#717182',
              fontWeight: 500
            }}>
              <div>Nome</div>
              <div>Email</div>
              <div>Telefone</div>
              <div>Ações</div>
            </div>

            {customers.map((customer, idx) => (
              <div key={idx} style={{
                background: 'white',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '10px',
                padding: '20px'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 2fr 1.5fr auto',
                  gap: '12px',
                  alignItems: 'center'
                }}>
                  <div style={{ fontSize: '14px', color: '#030213' }}>
                    {customer.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#030213' }}>
                    {customer.email}
                  </div>
                  <div style={{ fontSize: '14px', color: '#030213' }}>
                    {customer.phone}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#e9ebef'
                    }}>
                      ✏️
                    </div>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#d4183d',
                      color: 'white'
                    }}>
                      🗑️
                    </div>
                  </div>
                </div>
                {customer.address && (
                  <div style={{
                    marginTop: '12px',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ fontSize: '12px', color: '#717182', marginBottom: '4px' }}>
                      Endereço
                    </div>
                    <div style={{ fontSize: '13px', color: '#030213' }}>
                      {customer.address}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
