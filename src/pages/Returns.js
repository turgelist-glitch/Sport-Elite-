const steps = [
  { title: 'Свяжитесь с нами', desc: 'Напишите в чат поддержки или на почту с указанием номера заказа и причины возврата.' },
  { title: 'Получите инструкцию', desc: 'Менеджер подтвердит возврат и пришлёт адрес для отправки товара.' },
  { title: 'Отправьте товар', desc: 'Упакуйте товар с бирками и отправьте удобной службой доставки.' },
 { title: 'Получите деньги', desc: 'После проверки товара вернём деньги на карту или через мобильный банк (Мбанк, О!Деньги) в течение 3–5 рабочих дней.' },
];

export default function Returns() {
  return (
    <div style={{ background: '#111', color: '#fff', minHeight: '100vh', padding: '60px 40px' }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>
        Возврат <span style={{ color: '#D4FF00' }}>товара</span>
      </h1>
      <p style={{ color: '#aaa', fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>
        Мы уверены в качестве товаров, поэтому предлагаем простой и честный процесс возврата без лишних вопросов.
      </p>

      <h2 style={{ fontSize: 18, fontWeight: 600, borderLeft: '3px solid #D4FF00', paddingLeft: 12, marginBottom: 16 }}>Условия возврата</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
        {[
          ['Срок возврата', '30 дней с момента получения заказа'],
          ['Состояние товара', 'Не ношен, все бирки и упаковка сохранены'],
          ['Возврат денег', 'В течение 3–5 рабочих дней после получения товара'],
          ['Обмен', 'На другой размер или модель — бесплатно'],
        ].map(([label, value]) => (
          <div key={label} style={{ background: '#1c1c1c', border: '0.5px solid #2e2e2e', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 12, color: '#D4FF00', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>{label}</div>
            <div style={{ fontSize: 14, color: '#ccc', lineHeight: 1.6 }}>{value}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 600, borderLeft: '3px solid #D4FF00', paddingLeft: 12, marginBottom: 20 }}>Как оформить возврат</h2>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#D4FF00', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
          <div>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>{step.title}</div>
            <div style={{ fontSize: 13, color: '#888', lineHeight: 1.6 }}>{step.desc}</div>
          </div>
        </div>
      ))}

      <div style={{ background: '#1a1a1a', border: '0.5px solid #2e2e2e', borderLeft: '3px solid #D4FF00', borderRadius: 8, padding: '14px 16px', fontSize: 13, color: '#aaa', marginTop: 8 }}>
        ⚠️ Товары надлежащего качества (нижнее бельё, носки) возврату не подлежат согласно законодательству Кыргызской Республики.
      </div>
    </div>
  );
}