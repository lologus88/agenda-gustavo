import React, { useState } from 'react';
export default function AgendaDashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Revisión PH Dupont Tower - Nathaly', date: '2026-04-17', time: '09:00', priority: 'high', completed: false, calendar: 'mikaty', source: 'Outlook' },
    { id: 2, title: 'Reunión con Charlie - Bonavista', date: '2026-04-17', time: '10:00', priority: 'high', completed: false, calendar: 'bonavista', source: 'Google' },
    { id: 3, title: 'Administración Inversiones Mikaty', date: '2026-04-17', time: '13:00', priority: 'medium', completed: false, calendar: 'mikaty', source: 'Outlook' },
    { id: 4, title: 'Llamada Héctor', date: '2026-04-17', time: '14:00', priority: 'high', completed: false, calendar: 'bonavista', source: 'Google' },
  ]);
  const [formData, setFormData] = useState({ title: '', date: '', time: '', priority: 'medium', calendar: 'bonavista' });
  const [filter, setFilter] = useState('all');
  const handleAddTask = (e) => {
    e.preventDefault();
    if (formData.title && formData.date && formData.time) {
      setTasks([...tasks, { id: Date.now(), ...formData, completed: false, source: 'Manual' }]);
      setFormData({ title: '', date: '', time: '', priority: 'medium', calendar: 'bonavista' });
    }
  };
  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  const filteredTasks = tasks.filter(t => filter === 'all' || t.calendar === filter);
  const completedCount = filteredTasks.filter(t => t.completed).length;
  const totalCount = filteredTasks.length;
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '1rem', color: '#333' }}>Tu Agenda Diaria</h1>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '2rem' }}>
        {['all', 'bonavista', 'mikaty'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '10px 20px', borderRadius: '20px', background: filter === f ? '#e8dff5' : '#fff', border: `2px solid ${filter === f ? '#b8a6ff' : '#e8dff5'}`, color: filter === f ? '#6b5b95' : '#888', cursor: 'pointer', fontWeight: '600' }}>
            {f === 'all' ? 'Todas' : f === 'bonavista' ? 'Bonavista' : 'Mikaty'}
          </button>
        ))}
      </div>
      <div style={{ background: 'linear-gradient(135deg, #f0e6ff 0%, #ede5ff 100%)', borderRadius: '28px', padding: '2.5rem', marginBottom: '2.5rem', border: '2px solid #e0d0ff' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '1.5rem', color: '#6b5b95', fontWeight: '700' }}>➕ Agregar Nueva Tarea</h2>
        <form onSubmit={handleAddTask} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '14px', alignItems: 'flex-end' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#8b7ba8', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Tarea</label>
            <input type="text" placeholder="¿Qué necesitas hacer?" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '14px', border: '2px solid #ddd0f0', borderRadius: '14px', fontSize: '14px', background: '#fff', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#8b7ba8', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Fecha</label>
            <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} style={{ width: '100%', padding: '12px', border: '2px solid #ddd0f0', borderRadius: '14px', fontSize: '14px', background: '#fff', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#8b7ba8', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Hora</label>
            <input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} style={{ width: '100%', padding: '12px', border: '2px solid #ddd0f0', borderRadius: '14px', fontSize: '14px', background: '#fff', boxSizing: 'border-box' }} />
          </div>
          <button type="submit" style={{ padding: '12px 28px', background: '#c4b5e9', color: '#6b5b95', border: 'none', borderRadius: '14px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Agregar</button>
        </form>
        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} style={{ padding: '10px', border: '2px solid #ddd0f0', borderRadius: '14px', fontSize: '13px', background: '#fff' }}>
            <option value="low">Prioridad: Baja</option>
            <option value="medium">Prioridad: Media</option>
            <option value="high">Prioridad: Alta</option>
          </select>
          <select value={formData.calendar} onChange={(e) => setFormData({ ...formData, calendar: e.target.value })} style={{ padding: '10px', border: '2px solid #ddd0f0', borderRadius: '14px', fontSize: '13px', background: '#fff' }}>
            <option value="bonavista">Línea: Bonavista</option>
            <option value="mikaty">Línea: Mikaty</option>
          </select>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ background: '#f0e6ff', borderRadius: '20px', padding: '1.5rem', border: '1px solid #e0d0ff' }}>
          <p style={{ fontSize: '13px', color: '#8b7ba8', margin: '0 0 8px 0', fontWeight: '600' }}>Cumplimiento Hoy</p>
          <div style={{ fontSize: '40px', fontWeight: 'bold', color: '#8b7ba8', marginBottom: '10px' }}>{completionPercent}%</div>
          <div style={{ background: '#ddd0f0', height: '8px', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ background: '#c4b5e9', height: '100%', width: `${completionPercent}%` }} />
          </div>
        </div>
        <div style={{ background: '#ffe6d5', borderRadius: '20px', padding: '1.5rem', border: '1px solid #ffd4c0' }}>
          <p style={{ fontSize: '13px', color: '#c97d5c', margin: '0 0 8px 0', fontWeight: '600' }}>Tareas Atrasadas</p>
          <div style={{ fontSize: '40px', fontWeight: 'bold', color: '#d4825a', marginBottom: '10px' }}>0</div>
          <p style={{ fontSize: '12px', color: '#c97d5c', margin: '0' }}>Requieren atención</p>
        </div>
        <div style={{ background: '#d5f0e8', borderRadius: '20px', padding: '1.5rem', border: '1px solid #c5e8e0' }}>
          <p style={{ fontSize: '13px', color: '#6b9d88', margin: '0 0 12px 0', fontWeight: '600' }}>Distribución</p>
          <div style={{ fontSize: '13px', color: '#6b9d88' }}>
            <div>🔴 Alta: <strong>{tasks.filter(t => t.priority === 'high').length}</strong></div>
            <div>🟠 Media: <strong>{tasks.filter(t => t.priority === 'medium').length}</strong></div>
            <div>🟢 Baja: <strong>{tasks.filter(t => t.priority === 'low').length}</strong></div>
          </div>
        </div>
      </div>
      <div style={{ background: '#fff', borderRadius: '24px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '1.5rem', color: '#333', fontWeight: '700' }}>📅 Tareas & Eventos ({filteredTasks.length})</h2>
        {filteredTasks.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '3rem', fontSize: '15px' }}>Sin tareas para hoy. ¡Agrega una arriba! ⬆️</p>
        ) : (
          filteredTasks.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)).map(task => (
            <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', background: task.completed ? '#f5f5f5' : '#faf8fc', border: `2px solid ${task.source === 'Google' ? '#e8d5ff' : task.source === 'Outlook' ? '#ffe8d5' : '#e8f0ff'}`, borderRadius: '16px', marginBottom: '12px', opacity: task.completed ? 0.65 : 1 }}>
              <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0', fontSize: '15px', fontWeight: '600', color: '#333', textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#888' }}>🕐 {task.time}</p>
              </div>
              <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '12px', background: task.source === 'Google' ? '#e8d5ff' : '#ffe8d5', color: task.source === 'Google' ? '#6b5b95' : '#c97d5c', fontWeight: '600' }}>{task.source}</span>
              <div style={{ padding: '6px 14px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', background: task.priority === 'high' ? '#f0d5d5' : task.priority === 'medium' ? '#f5e8d0' : '#d5f0e8', color: task.priority === 'high' ? '#a8795d' : task.priority === 'medium' ? '#c9a870' : '#7db399' }}>{task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}</div>
              <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', color: '#ddd', fontSize: '18px', cursor: 'pointer', padding: '4px' }}>✕</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
FINALEOFcat > ~/agenda-gustavo/src/agenda-dashboard.jsx << 'FINALEOF'
import React, { useState } from 'react';
export default function AgendaDashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Revisión PH Dupont Tower - Nathaly', date: '2026-04-17', time: '09:00', priority: 'high', completed: false, calendar: 'mikaty', source: 'Outlook' },
    { id: 2, title: 'Reunión con Charlie - Bonavista', date: '2026-04-17', time: '10:00', priority: 'high', completed: false, calendar: 'bonavista', source: 'Google' },
    { id: 3, title: 'Administración Inversiones Mikaty', date: '2026-04-17', time: '13:00', priority: 'medium', completed: false, calendar: 'mikaty', source: 'Outlook' },
    { id: 4, title: 'Llamada Héctor', date: '2026-04-17', time: '14:00', priority: 'high', completed: false, calendar: 'bonavista', source: 'Google' },
  ]);
  const [formData, setFormData] = useState({ title: '', date: '', time: '', priority: 'medium', calendar: 'bonavista' });
  const [filter, setFilter] = useState('all');
  const handleAddTask = (e) => {
    e.preventDefault();
    if (formData.title && formData.date && formData.time) {
      setTasks([...tasks, { id: Date.now(), ...formData, completed: false, source: 'Manual' }]);
      setFormData({ title: '', date: '', time: '', priority: 'medium', calendar: 'bonavista' });
    }
  };
  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  const filteredTasks = tasks.filter(t => filter === 'all' || t.calendar === filter);
  const completedCount = filteredTasks.filter(t => t.completed).length;
  const totalCount = filteredTasks.length;
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '1rem', color: '#333' }}>Tu Agenda Diaria</h1>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '2rem' }}>
        {['all', 'bonavista', 'mikaty'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '10px 20px', borderRadius: '20px', background: filter === f ? '#e8dff5' : '#fff', border: `2px solid ${filter === f ? '#b8a6ff' : '#e8dff5'}`, color: filter === f ? '#6b5b95' : '#888', cursor: 'pointer', fontWeight: '600' }}>
            {f === 'all' ? 'Todas' : f === 'bonavista' ? 'Bonavista' : 'Mikaty'}
          </button>
        ))}
      </div>
      <div style={{ background: 'linear-gradient(135deg, #f0e6ff 0%, #ede5ff 100%)', borderRadius: '28px', padding: '2.5rem', marginBottom: '2.5rem', border: '2px solid #e0d0ff' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '1.5rem', color: '#6b5b95', fontWeight: '700' }}>➕ Agregar Nueva Tarea</h2>
        <form onSubmit={handleAddTask} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '14px', alignItems: 'flex-end' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#8b7ba8', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Tarea</label>
            <input type="text" placeholder="¿Qué necesitas hacer?" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '14px', border: '2px solid #ddd0f0', borderRadius: '14px', fontSize: '14px', background: '#fff', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#8b7ba8', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Fecha</label>
            <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} style={{ width: '100%', padding: '12px', border: '2px solid #ddd0f0', borderRadius: '14px', fontSize: '14px', background: '#fff', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#8b7ba8', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Hora</label>
            <input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} style={{ width: '100%', padding: '12px', border: '2px solid #ddd0f0', borderRadius: '14px', fontSize: '14px', background: '#fff', boxSizing: 'border-box' }} />
          </div>
          <button type="submit" style={{ padding: '12px 28px', background: '#c4b5e9', color: '#6b5b95', border: 'none', borderRadius: '14px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Agregar</button>
        </form>
        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} style={{ padding: '10px', border: '2px solid #ddd0f0', borderRadius: '14px', fontSize: '13px', background: '#fff' }}>
            <option value="low">Prioridad: Baja</option>
            <option value="medium">Prioridad: Media</option>
            <option value="high">Prioridad: Alta</option>
          </select>
          <select value={formData.calendar} onChange={(e) => setFormData({ ...formData, calendar: e.target.value })} style={{ padding: '10px', border: '2px solid #ddd0f0', borderRadius: '14px', fontSize: '13px', background: '#fff' }}>
            <option value="bonavista">Línea: Bonavista</option>
            <option value="mikaty">Línea: Mikaty</option>
          </select>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ background: '#f0e6ff', borderRadius: '20px', padding: '1.5rem', border: '1px solid #e0d0ff' }}>
          <p style={{ fontSize: '13px', color: '#8b7ba8', margin: '0 0 8px 0', fontWeight: '600' }}>Cumplimiento Hoy</p>
          <div style={{ fontSize: '40px', fontWeight: 'bold', color: '#8b7ba8', marginBottom: '10px' }}>{completionPercent}%</div>
          <div style={{ background: '#ddd0f0', height: '8px', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ background: '#c4b5e9', height: '100%', width: `${completionPercent}%` }} />
          </div>
        </div>
        <div style={{ background: '#ffe6d5', borderRadius: '20px', padding: '1.5rem', border: '1px solid #ffd4c0' }}>
          <p style={{ fontSize: '13px', color: '#c97d5c', margin: '0 0 8px 0', fontWeight: '600' }}>Tareas Atrasadas</p>
          <div style={{ fontSize: '40px', fontWeight: 'bold', color: '#d4825a', marginBottom: '10px' }}>0</div>
          <p style={{ fontSize: '12px', color: '#c97d5c', margin: '0' }}>Requieren atención</p>
        </div>
        <div style={{ background: '#d5f0e8', borderRadius: '20px', padding: '1.5rem', border: '1px solid #c5e8e0' }}>
          <p style={{ fontSize: '13px', color: '#6b9d88', margin: '0 0 12px 0', fontWeight: '600' }}>Distribución</p>
          <div style={{ fontSize: '13px', color: '#6b9d88' }}>
            <div>🔴 Alta: <strong>{tasks.filter(t => t.priority === 'high').length}</strong></div>
            <div>🟠 Media: <strong>{tasks.filter(t => t.priority === 'medium').length}</strong></div>
            <div>🟢 Baja: <strong>{tasks.filter(t => t.priority === 'low').length}</strong></div>
          </div>
        </div>
      </div>
      <div style={{ background: '#fff', borderRadius: '24px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '1.5rem', color: '#333', fontWeight: '700' }}>📅 Tareas & Eventos ({filteredTasks.length})</h2>
        {filteredTasks.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '3rem', fontSize: '15px' }}>Sin tareas para hoy. ¡Agrega una arriba! ⬆️</p>
        ) : (
          filteredTasks.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)).map(task => (
            <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', background: task.completed ? '#f5f5f5' : '#faf8fc', border: `2px solid ${task.source === 'Google' ? '#e8d5ff' : task.source === 'Outlook' ? '#ffe8d5' : '#e8f0ff'}`, borderRadius: '16px', marginBottom: '12px', opacity: task.completed ? 0.65 : 1 }}>
              <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0', fontSize: '15px', fontWeight: '600', color: '#333', textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#888' }}>🕐 {task.time}</p>
              </div>
              <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '12px', background: task.source === 'Google' ? '#e8d5ff' : '#ffe8d5', color: task.source === 'Google' ? '#6b5b95' : '#c97d5c', fontWeight: '600' }}>{task.source}</span>
              <div style={{ padding: '6px 14px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', background: task.priority === 'high' ? '#f0d5d5' : task.priority === 'medium' ? '#f5e8d0' : '#d5f0e8', color: task.priority === 'high' ? '#a8795d' : task.priority === 'medium' ? '#c9a870' : '#7db399' }}>{task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}</div>
              <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', color: '#ddd', fontSize: '18px', cursor: 'pointer', padding: '4px' }}>✕</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
