import React, { useState } from 'react';
import { actions } from 'astro:actions';

interface Guest {
  id: number;
  uniqueCode: string;
  name: string;
  partySize: number;
  status: string;
  tableId: number | null;
}

interface Table {
  id: number;
  name: string;
  capacity: number;
}

export default function SeatingPlanner({ initialGuests, initialTables }: { initialGuests: Guest[], initialTables: Table[] }) {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [tables] = useState<Table[]>(initialTables);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const unassignedGuests = guests.filter(g => g.tableId === null && g.status !== 'declined' && g.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleDragStart = (e: React.DragEvent, guestId: number, guestName: string) => {
    e.dataTransfer.setData('guestId', guestId.toString());
    
    // Crear el Avatar / Muñeco visual
    const ghost = document.createElement('div');
    ghost.style.position = 'absolute';
    ghost.style.top = '-1000px';
    ghost.style.background = '#2c4a3e';
    ghost.style.color = '#fff';
    ghost.style.padding = '8px 16px';
    ghost.style.borderRadius = '50px';
    ghost.style.fontWeight = 'bold';
    ghost.style.fontSize = '14px';
    ghost.style.fontFamily = 'Montserrat, sans-serif';
    ghost.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
    ghost.style.display = 'flex';
    ghost.style.alignItems = 'center';
    ghost.style.gap = '8px';
    ghost.innerHTML = `<span style="font-size:18px;">✨</span> Agrupando a ${guestName}`;
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 20, 20);
    setTimeout(() => document.body.removeChild(ghost), 100);
  };

  const handleDrop = async (e: React.DragEvent, tableId: number | null) => {
    e.preventDefault();
    const guestIdStr = e.dataTransfer.getData('guestId');
    if (!guestIdStr) return;
    const guestId = parseInt(guestIdStr, 10);

    const guest = guests.find(g => g.id === guestId);
    if (!guest || guest.tableId === tableId) return;

    // Guardamos la mesa anterior en caso de revertir
    const previousTableId = guest.tableId;

    // Optimistic Update
    setGuests(prev => prev.map(g => g.id === guestId ? { ...g, tableId } : g));
    setErrorMsg(null);

    // Call Astro Action RPC
    const { error } = await actions.seating.assign({ guestId, tableId });
    if (error) {
      setErrorMsg(error.message);
      // Revert on error
      setGuests(prev => prev.map(g => g.id === guestId ? { ...g, tableId: previousTableId } : g));
    }
  };

  return (
    <div style={styles.container}>
      {errorMsg && <div style={styles.errorBanner}>{errorMsg}</div>}
      
      <div style={styles.layout}>
        {/* Sidebar: Unassigned Guests */}
        <div 
          style={styles.sidebar}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, null)}
        >
          <div style={styles.sidebarHeader}>
            <h3>Sin Asignar ({unassignedGuests.reduce((acc, g) => acc + g.partySize, 0)} pax)</h3>
            <input 
              type="text" 
              placeholder="Buscar invitado..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          
          <div style={styles.guestList}>
            {unassignedGuests.map(guest => (
              <div 
                key={guest.id} 
                draggable 
                onDragStart={(e) => handleDragStart(e, guest.id, guest.name)}
                style={styles.guestCard}
              >
                <div style={{fontWeight: 600}}>{guest.name}</div>
                <div style={{fontSize: '0.85rem', color: '#666'}}>Pases: {guest.partySize} • {guest.status}</div>
              </div>
            ))}
            {unassignedGuests.length === 0 && <p style={styles.emptyText}>No hay invitados pendientes.</p>}
          </div>
        </div>

        {/* Main: Tables */}
        <div style={styles.tablesGrid}>
          {tables.map(table => {
            const tableGuests = guests.filter(g => g.tableId === table.id);
            const currentOccupancy = tableGuests.reduce((acc, g) => acc + g.partySize, 0);
            const isFull = currentOccupancy >= table.capacity;

            return (
              <div 
                key={table.id}
                style={{
                  ...styles.tableCard,
                  borderColor: isFull ? '#e63946' : '#c2a878'
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                }}
                onDrop={(e) => handleDrop(e, table.id)}
              >
                <div style={styles.tableHeader}>
                  <h3 style={{margin: 0}}>{table.name}</h3>
                  <span style={{
                    ...styles.capacityBadge,
                    backgroundColor: isFull ? '#fce8e6' : '#e6f4ea',
                    color: isFull ? '#e63946' : '#2a9d8f'
                  }}>
                    {currentOccupancy} / {table.capacity}
                  </span>
                </div>
                
                <div style={styles.tableSpace}>
                  {tableGuests.map(guest => (
                    <div 
                      key={guest.id}
                      draggable 
                      onDragStart={(e) => handleDragStart(e, guest.id, guest.name)}
                      style={{...styles.guestCard, backgroundColor: '#fdfbf7'}}
                    >
                      <div style={{fontWeight: 500, fontSize: '0.9rem'}}>{guest.name}</div>
                      <div style={{fontSize: '0.8rem', color: '#666'}}>Pases: {guest.partySize}</div>
                    </div>
                  ))}
                  {tableGuests.length === 0 && <div style={styles.emptyTable}>Mesa vacía</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    height: 'calc(100vh - 150px)',
  },
  errorBanner: {
    backgroundColor: '#fce8e6',
    color: '#e63946',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #e63946',
    fontWeight: 500,
  },
  layout: {
    display: 'flex',
    gap: '2rem',
    height: '100%',
    alignItems: 'flex-start',
  },
  sidebar: {
    width: '300px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  },
  sidebarHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #eee',
    backgroundColor: '#faf9f6',
  },
  searchInput: {
    width: '100%',
    padding: '0.6rem',
    marginTop: '1rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  guestList: {
    padding: '1rem',
    overflowY: 'auto',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  guestCard: {
    padding: '0.8rem',
    backgroundColor: 'white',
    border: '1px solid #eaeaea',
    borderRadius: '6px',
    cursor: 'grab',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
  },
  tablesGrid: {
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
    overflowY: 'auto',
    height: '100%',
    paddingRight: '1rem',
  },
  tableCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    borderTop: '4px solid #c2a878',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
  },
  tableHeader: {
    padding: '1rem 1.5rem',
    borderBottom: '1px dashed #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#faf9f6',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  capacityBadge: {
    padding: '0.2rem 0.6rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: 600,
  },
  tableSpace: {
    padding: '1rem',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    fontSize: '0.9rem',
    marginTop: '2rem',
  },
  emptyTable: {
    color: '#ccc',
    textAlign: 'center',
    margin: 'auto 0',
    fontStyle: 'italic',
  }
};
