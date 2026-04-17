import React, { useState } from 'react';

export default function AgendaDashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Reunión Charlie', time: '10:00', priority: 'high', completed: false },
    { id: 2, title: 'Llamada Héctor', time: '14:00', priority: 'high', completed: false },
    { id: 3, title: 'Seguimiento leads', time: '16:30', priority: 'medium', completed: true },
  ]);

  const [formData, setFormData] = useState({ title: '', time: '', priority: 'medium' });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (formData.title && formData.time) {
      setTasks([...tasks, { id: Date.now(), ...formData, completed: false }]);
      setFormData({ title: '', time: '', priority: 'medium' });
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completed = tasks.filter(t => t.completed).length;
  const percent = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Tu Agenda Diaria</h1>
      
      <div style={{ background: '#f0e6ff', borderRadius: '20px', padding: '2rem', marginBottom: '2rem', border: '2px solid #e0d0ff' }}>
        <h2 style={{ color: '#6b5b95' }}>Agregar Tarea</h2>
        <form onSubmit={handleAddTask} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px' }}>
          <input
            type="text"
            placeholder="Tarea"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
          />
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
          />
          <button type="submit" style={{ padding: '10px 20px', background: '#c4b5e9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Agregar</butt
git add .
git commit -m "Dashboard funcional simple"
git push
