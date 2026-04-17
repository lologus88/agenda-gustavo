import React, { useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Reunión Charlie', time: '10:00', done: false },
    { id: 2, title: 'Llamada Héctor', time: '14:00', done: false },
  ]);
  
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');

  const add = () => {
    if (title && time) {
      setTasks([...tasks, { id: Date.now(), title, time, done: false }]);
      setTitle('');
      setTime('');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Tu Agenda</h1>
      <input placeholder="Tarea" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="time" value={time} onChange={e => setTime(e.target.value)} />
      <button onClick={add}>Agregar</button>
      <div style={{ marginTop: '20px' }}>
        {tasks.map(t => (
          <div key={t.id} style={{ padding: '10px', border: '1px solid #ddd', marginBottom: '10px' }}>
            <input type="checkbox" defaultChecked={t.done} />
            {t.title} - {t.time}
          </div>
        ))}
      </div>
    </div>
  );
}
git add .
git commit -m "Dashboard mínimo funcional"
git push
y
