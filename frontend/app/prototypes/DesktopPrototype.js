export function DesktopPrototype() {
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
      address: 'Rua das Flores, 123 - Rio de Janeiro, RJ'
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
      background: '#e5e5e5',
      padding: '30px',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        background: 'white',
        boxShadow: '0 0 60px rgba(0,0,0,0.1)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '12px',
          background: '#030213',
          color: 'white',
          fontSize: '15px',
          fontWeight: 600,
          letterSpacing: '0.5px'
        }}>
          DESKTOP - 1440px
        </div>

        <div style={{
          background: '#030213',
          color: 'white',
          padding: '28px 48px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '18px',
              borderRadius: '12px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'rgba(255,255,255,0.3)',
                borderRadius: '8px'
              }} />
            </div>
            <div>
              <h1 style={{ fontSize: '28px', marginBottom: '6px', fontWeight: 500 }}>
                Sistema de Cadastro
              </h1>
              <div style={{ fontSize: '15px', opacity: 0.9 }}>
                Gerencie seus clientes de forma simples e eficiente
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '400px 1fr',
          gap: '32px',
          padding: '40px 48px',
          background: '#fafafa',
          minHeight: '800px'
        }}>
          <div style={{
            background: 'white',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '12px',
            padding: '28px',
            height: 'fit-content'
          }}>
            <div style={{ fontSize: '22px', fontWeight: 600, marginBottom: '24px' }}>
              Novo Cliente
            </div>

            {[
              { label: 'Nome', required: true, placeholder: 'Nome completo' },
              { label: 'Email', required: true, placeholder: 'email@exemplo.com' },
              { label: 'Telefone', required: true, placeholder: '(00) 00000-0000' }
            ].map((field, idx) => (
              <div key={idx} style={{ marginBottom: '20px' }}>
                <label style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  marginBottom: '10px',
                  display: 'block',
                  color: '#030213'
                }}>
                  {field.label} {field.required && <span style={{ color: '#d4183d' }}>*</span>}
                </label>
                <div style={{
                  width: '100%',
                  padding: '14px 18px',
                  background: '#f3f3f5',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '10px',
                  fontSize: '15px',
                  color: '#999'
                }}>
                  {field.placeholder}
                </div>
              </div>
            ))}

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                fontSize: '15px',
                fontWeight: 500,
                marginBottom: '10px',
                display: 'block',
                color: '#030213'
              }}>
                Endereço
              </label>
              <div style={{
                width: '100%',
                padding: '14px 18px',
                background: '#f3f3f5',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '10px',
                fontSize: '15px',
                color: '#999',
                height: '90px'
              }}>
                Endereço completo
              </div>
            </div>

            <div style={{
              width: '100%',
              background: '#030213',
              color: 'white',
              padding: '14px',
              borderRadius: '10px',
              textAlign: 'center',
              fontWeight: 500,
              marginTop: '24px',
              fontSize: '16px'
            }}>
              Cadastrar
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <div>
                <h2 style={{ fontSize: '22px', marginBottom: '6px', fontWeight: 600 }}>
                  Clientes Cadastrados
                </h2>
                <div style={{ fontSize: '14px', color: '#717182' }}>
                  Total: 3 clientes
                </div>
              </div>
              <div style={{
                background: '#f3f3f5',
                padding: '14px 18px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '320px'
              }}>
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: '#717182',
                  borderRadius: '50%',
                  flexShrink: 0
                }} />
                <div style={{ color: '#717182', fontSize: '15px' }}>
                  Buscar clientes...
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 1.5fr 120px',
              gap: '16px',
              padding: '14px 24px',
              background: '#ececf0',
              borderRadius: '10px',
              fontSize: '14px',
              color: '#717182',
              fontWeight: 500
            }}>
              <div>Nome</div>
              <div>Email</div>
              <div>Telefone</div>
              <div>Ações</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {customers.map((customer, idx) => (
                <div key={idx} style={{
                  background: 'white',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '12px',
                  padding: '24px'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 2fr 1.5fr 120px',
                    gap: '16px',
                    alignItems: 'center'
                  }}>
                    <div style={{ fontSize: '15px', color: '#030213' }}>
                      {customer.name}
                    </div>
                    <div style={{ fontSize: '15px', color: '#030213', wordBreak: 'break-word' }}>
                      {customer.email}
                    </div>
                    <div style={{ fontSize: '15px', color: '#030213' }}>
                      {customer.phone}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#e9ebef'
                      }}>
                        ✏️
                      </div>
                      <div style={{
                        width: '40px',
                        height: '40px',
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
                      marginTop: '16px',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(0,0,0,0.1)'
                    }}>
                      <div style={{ fontSize: '13px', color: '#717182', marginBottom: '6px' }}>
                        Endereço
                      </div>
                      <div style={{ fontSize: '14px', color: '#030213' }}>
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
    </div>
  );
}
