export function MobilePrototype() {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      background: '#f5f5f5',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '375px',
        background: 'white',
        boxShadow: '0 0 30px rgba(0,0,0,0.2)',
        borderRadius: '30px',
        overflow: 'hidden',
        height: 'fit-content'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '10px',
          background: '#030213',
          color: 'white',
          fontSize: '14px',
          fontWeight: 600
        }}>
          MOBILE - 375px
        </div>

        <div style={{
          height: '30px',
          background: '#030213',
          borderRadius: '0 0 20px 20px',
          width: '150px',
          margin: '0 auto'
        }} />

        <div style={{ background: '#030213', color: 'white', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '12px',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'rgba(255,255,255,0.3)',
                borderRadius: '4px'
              }} />
            </div>
            <div>
              <h1 style={{ fontSize: '20px', marginBottom: '4px', fontWeight: 500 }}>
                Sistema de Cadastro
              </h1>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>
                Gerencie seus clientes de forma simples e eficiente
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{
            background: '#030213',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: 500,
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            + Adicionar Cliente
          </div>

          <div style={{
            background: '#f3f3f5',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              background: '#717182',
              borderRadius: '50%'
            }} />
            <div style={{ color: '#717182', fontSize: '14px' }}>
              Buscar clientes...
            </div>
          </div>

          <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
            Clientes Cadastrados
          </div>
          <div style={{ fontSize: '13px', color: '#717182', marginBottom: '20px' }}>
            Total: 3 clientes
          </div>

          {[
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
          ].map((customer, idx) => (
            <div key={idx} style={{
              background: 'white',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '12px'
            }}>
              <div style={{ fontSize: '12px', color: '#717182', marginBottom: '4px' }}>
                Nome
              </div>
              <div style={{ fontSize: '14px', color: '#030213', marginBottom: '12px' }}>
                {customer.name}
              </div>

              <div style={{ fontSize: '12px', color: '#717182', marginBottom: '4px' }}>
                Email
              </div>
              <div style={{ fontSize: '14px', color: '#030213', marginBottom: '12px' }}>
                {customer.email}
              </div>

              <div style={{ fontSize: '12px', color: '#717182', marginBottom: '4px' }}>
                Telefone
              </div>
              <div style={{ fontSize: '14px', color: '#030213', marginBottom: customer.address ? '12px' : '0' }}>
                {customer.phone}
              </div>

              {customer.address && (
                <>
                  <div style={{ fontSize: '12px', color: '#717182', marginBottom: '4px' }}>
                    Endereço
                  </div>
                  <div style={{ fontSize: '14px', color: '#030213' }}>
                    {customer.address}
                  </div>
                </>
              )}

              <div style={{
                display: 'flex',
                gap: '8px',
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 500,
                  background: '#e9ebef',
                  color: '#030213'
                }}>
                  ✏️ Editar
                </div>
                <div style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 500,
                  background: '#d4183d',
                  color: 'white'
                }}>
                  🗑️ Excluir
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
