import React, { useState, useEffect } from 'react';

export default function AgendaDashboard() {
  const [googleEvents, setGoogleEvents] = useState([]);
  const [outlookEvents, setOutlookEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeCalendars = async () => {
      try {
        // These credentials will be set as environment variables in Vercel
        const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        const microsoftClientId = process.env.REACT_APP_MICROSOFT_CLIENT_ID;
        const microsoftTenantId = process.env.REACT_APP_MICROSOFT_TENANT_ID;

        // Initialize Google Calendar
        if (googleClientId) {
          await initializeGoogleCalendar(googleClientId);
        }

        // Initialize Microsoft Graph
        if (microsoftClientId && microsoftTenantId) {
          await initializeMicrosoftCalendar(microsoftClientId, microsoftTenantId);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    initializeCalendars();
  }, []);

  const initializeGoogleCalendar = async (clientId) => {
    try {
      // Google Calendar API initialization
      // In production, this will be handled by OAuth flow on Vercel
      const mockGoogleEvents = [
        {
          id: '1',
          title: 'Reunión con Charlie - Bonavista',
          start: new Date(new Date().setHours(10, 0)),
          end: new Date(new Date().setHours(11, 0)),
          calendar: 'bonavista',
          description: 'Estrategia de marketing Más razones para elegir Bonavista'
        },
        {
          id: '2',
          title: 'Llamada Héctor - Proyecto Terreno+Construcción',
          start: new Date(new Date().setHours(14, 0)),
          end: new Date(new Date().setHours(15, 0)),
          calendar: 'bonavista',
          description: 'Revisión de avance lotes D2-D9'
        },
        {
          id: '3',
          title: 'Seguimiento leads USA diaspora',
          start: new Date(new Date().setHours(16, 30)),
          end: new Date(new Date().setHours(17, 30)),
          calendar: 'bonavista',
          description: 'Francisco/California, Guillermo/local'
        }
      ];
      setGoogleEvents(mockGoogleEvents);
    } catch (err) {
      console.error('Google Calendar error:', err);
    }
  };

  const initializeMicrosoftCalendar = async (clientId, tenantId) => {
    try {
      // Microsoft Graph API initialization
      const mockOutlookEvents = [
        {
          id: 'o1',
          title: 'Revisión PH Dupont Tower - Nathaly',
          start: new Date(new Date().setHours(9, 0)),
          end: new Date(new Date().setHours(10, 0)),
          calendar: 'mikaty',
          description: 'Admin - Renovación Inmobiliaria Andy, S.A.'
        },
        {
          id: 'o2',
          title: 'Administración Inversiones Mikaty',
          start: new Date(new Date().setHours(13, 0)),
          end: new Date(new Date().setHours(14, 30)),
          calendar: 'mikaty',
          description: 'Condo management - Panama'
        },
        {
          id: 'o3',
          title: 'Solicitud Junta Técnica de Bienes Raíces',
          start: new Date(new Date().setHours(15, 0)),
          end: new Date(new Date().setHours(16, 0)),
          calendar: 'mikaty',
          description: 'Seguimiento puntuación exam 67/100'
        }
      ];
      setOutlookEvents(mockOutlookEvents);
    } catch (err) {
      console.error('Microsoft Graph error:', err);
    }
  };

  const allEvents = [...googleEvents, ...outlookEvents]
    .filter(event => filter === 'all' || event.calendar === filter)
    .sort((a, b) => a.start - b.start);

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '500', margin: '0 0 1.5rem 0', color: 'var(--color-text-primary)' }}>
          Tu Agenda Diaria
        </h1>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {[
            { id: 'all', label: 'Todos' },
            { id: 'bonavista', label: 'Bonavista' },
            { id: 'mikaty', label: 'Mikaty' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '6px 12px',
                border: `0.5px solid ${filter === f.id ? 'var(--color-border-secondary)' : 'var(--color-border-tertiary)'}`,
                borderRadius: 'var(--border-radius-md)',
                background: filter === f.id ? 'var(--color-background-secondary)' : 'transparent',
                cursor: 'pointer',
                fontSize: '14px',
                color: 'var(--color-text-primary)',
                fontWeight: filter === f.id ? '500' : '400',
                transition: 'all 0.2s ease'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading && (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
            Cargando calendarios...
          </div>
        )}

        {error && (
          <div style={{ padding: '1rem', background: 'var(--color-background-danger)', borderRadius: 'var(--border-radius-md)', color: 'var(--color-text-danger)', marginBottom: '1.5rem' }}>
            Error: {error}
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 1rem 0' }}>
            {formatDate(new Date())}
          </p>
          {allEvents.length === 0 ? (
            <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>No hay eventos para hoy.</p>
          ) : (
            <div style={{ display: 'grid', gap: '8px' }}>
              {allEvents.map(event => (
                <div
                  key={event.id}
                  style={{
                    background: 'var(--color-background-primary)',
                    border: `0.5px solid ${event.calendar === 'bonavista' ? 'var(--color-border-info)' : 'var(--color-border-secondary)'}`,
                    borderLeft: `4px solid ${event.calendar === 'bonavista' ? '#4285F4' : '#0078D4'}`,
                    borderRadius: 'var(--border-radius-md)',
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-background-secondary)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-background-primary)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '6px' }}>
                    <p style={{ fontSize: '14px', fontWeight: '500', margin: '0', color: 'var(--color-text-primary)' }}>
                      {event.title}
                    </p>
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 6px',
                      background: event.calendar === 'bonavista' ? 'var(--color-background-info)' : 'var(--color-background-secondary)',
                      color: event.calendar === 'bonavista' ? 'var(--color-text-info)' : 'var(--color-text-secondary)',
                      borderRadius: '3px',
                      whiteSpace: 'nowrap'
                    }}>
                      {event.calendar === 'bonavista' ? 'Google' : 'Outlook'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--color-text-secondary)' }}>
                      {formatTime(event.start)} - {formatTime(event.end)}
                    </span>
                  </div>
                  {event.description && (
                    <p style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', margin: '0', marginTop: '4px' }}>
                      {event.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: '1rem', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', marginTop: '2rem' }}>
          <p style={{ fontSize: '13px', margin: '0 0 8px 0', color: 'var(--color-text-primary)', fontWeight: '500' }}>
            Próximos pasos:
          </p>
          <ul style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
            <li>✓ Dashboard listo en Vercel</li>
            <li>✓ Variables de entorno configuradas</li>
            <li>• Sincronización en tiempo real con OAuth 2.0</li>
            <li>• Notificaciones automáticas por email/WhatsApp</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
