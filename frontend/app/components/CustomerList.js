export function CustomerList({ customers, onEdit, onDelete }) {
  if (customers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
          <svg
            className="w-8 h-8 text-muted-foreground"
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
        <h3 className="text-muted-foreground">Nenhum cliente cadastrado</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Comece adicionando um novo cliente usando o formulário acima
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="hidden md:grid md:grid-cols-[2fr_2fr_1.5fr_auto] gap-4 px-6 py-3 bg-muted rounded-lg">
        <div className="text-sm text-muted-foreground">Nome</div>
        <div className="text-sm text-muted-foreground">Email</div>
        <div className="text-sm text-muted-foreground">Telefone</div>
        <div className="text-sm text-muted-foreground">Ações</div>
      </div>

      <div className="space-y-3">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-card border border-border rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow"
          >
            <div className="md:grid md:grid-cols-[2fr_2fr_1.5fr_auto] md:gap-4 md:items-center space-y-3 md:space-y-0">
              <div>
                <div className="text-sm text-muted-foreground md:hidden mb-1">Nome</div>
                <div className="text-foreground">{customer.name}</div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground md:hidden mb-1">Email</div>
                <div className="text-foreground break-all">{customer.email}</div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground md:hidden mb-1">Telefone</div>
                <div className="text-foreground">{customer.phone}</div>
              </div>

              <div className="flex gap-2 md:justify-end">
                <button
                  onClick={() => onEdit(customer)}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
                  aria-label="Editar cliente"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Tem certeza que deseja excluir ${customer.name}?`)) {
                      onDelete(customer.id);
                    }
                  }}
                  className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity"
                  aria-label="Excluir cliente"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {customer.address && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="text-sm text-muted-foreground mb-1">Endereço</div>
                <div className="text-foreground text-sm">{customer.address}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
