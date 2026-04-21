export default function Contacts() {
  return (
    <div style={{ background: '#111', color: '#fff', minHeight: '100vh', padding: '60px 40px' }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>
        Контакты <span style={{ color: '#D4FF00' }}>SportElite</span>
      </h1>
      <p style={{ color: '#aaa', fontSize: 16, maxWidth: 600, lineHeight: 1.7, marginBottom: 40 }}>
        Мы всегда на связи. Напишите, позвоните или загляните к нам — поможем с выбором и ответим на любые вопросы.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 40 }}>
        {[
          { icon: '📞', title: 'Телефон', text: '+996 707 036 925\nПн–Вс: 9:00 – 21:00' },
          { icon: '✉️', title: 'Email', text: 'support@sportelite.kg\nОтвечаем в течение 2 часов' },
          { icon: '📍', title: 'Адрес', text: 'Кыргызстан, Бишкек\nул. Манаса, 40' },
          { icon: '💬', title: 'Telegram', text: '@sportelite_kg\nБыстрые ответы в мессенджере' },
        ].map(({ icon, title, text }) => (
          <div key={title} style={{ background: '#1c1c1c', border: '0.5px solid #2e2e2e', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
            <div style={{ fontWeight: 500, marginBottom: 8 }}>{title}</div>
            <div style={{ fontSize: 13, color: '#888', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{text}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 600, borderLeft: '3px solid #D4FF00', paddingLeft: 12, marginBottom: 20 }}>
        Напишите нам
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 500 }}>
        {['Ваше имя', 'Email или телефон'].map((placeholder) => (
          <input
            key={placeholder}
            type="text"
            placeholder={placeholder}
            style={{ background: '#1c1c1c', border: '0.5px solid #2e2e2e', borderRadius: 8, padding: '12px 16px', color: '#fff', fontSize: 14, outline: 'none' }}
          />
        ))}
        <textarea
          placeholder="Ваше сообщение"
          rows={4}
          style={{ background: '#1c1c1c', border: '0.5px solid #2e2e2e', borderRadius: 8, padding: '12px 16px', color: '#fff', fontSize: 14, outline: 'none', resize: 'vertical' }}
        />
        <button
          style={{ background: '#D4FF00', color: '#000', fontWeight: 700, fontSize: 14, padding: '12px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', width: 'fit-content' }}
        >
          Отправить сообщение
        </button>
      </div>
    </div>
  );
}