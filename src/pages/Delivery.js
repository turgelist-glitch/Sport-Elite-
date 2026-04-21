const steps = [
  { title: 'Оформите заказ', desc: 'Добавьте товары в корзину, укажите адрес и выберите способ доставки.' },
  { title: 'Подтверждение', desc: 'В течение 1 часа менеджер свяжется с вами и подтвердит заказ.' },
  { title: 'Отправка', desc: 'Заказ упаковываем и передаём в службу доставки в течение 1 рабочего дня.' },
  { title: 'Получение', desc: 'Вам придёт SMS с трек-номером. Курьер доставит или вы заберёте в ПВЗ.' },
];

const methods = [
  { label: 'Курьером до двери', value: '1–2 дня по Бишкеку\n2–5 дней по Кыргызстану\nот 150 сом' },
  { label: 'Пункт выдачи / Постомат', value: '2–4 дня по Кыргызстану\nот 100 сом' },
  { label: 'Доставка в регионы', value: 'Ош, Jalal-Abad, Каракол и др.\n3–6 дней, от 200 сом' },
  { label: 'Бесплатная доставка', value: 'При заказе от 3 000 сом\nкурьером или в ПВЗ' },
];

export default function Delivery() {
  return (
    <div style={{ background: '#111', color: '#fff', minHeight: '100vh', padding: '60px 40px' }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>
        Доставка <span style={{ color: '#D4FF00' }}>заказов</span>
      </h1>
      <p style={{ color: '#aaa', fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>
        Доставляем по всему Кыргызстану быстро и надёжно. Выбирайте удобный способ при оформлении.
      </p>

      <h2 style={{ fontSize: 18, fontWeight: 600, borderLeft: '3px solid #D4FF00', paddingLeft: 12, marginBottom: 20 }}>
        Как это работает
      </h2>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#D4FF00', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
            {i + 1}
          </div>
          <div>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>{step.title}</div>
            <div style={{ fontSize: 13, color: '#888', lineHeight: 1.6 }}>{step.desc}</div>
          </div>
        </div>
      ))}

      <h2 style={{ fontSize: 18, fontWeight: 600, borderLeft: '3px solid #D4FF00', paddingLeft: 12, margin: '32px 0 16px' }}>
        Способы и сроки
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {methods.map(({ label, value }) => (
          <div key={label} style={{ background: '#1c1c1c', border: '0.5px solid #2e2e2e', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 12, color: '#D4FF00', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
              {label}
            </div>
            <div style={{ fontSize: 14, color: '#ccc', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: '#1a1a1a', border: '0.5px solid #2e2e2e', borderLeft: '3px solid #D4FF00', borderRadius: 8, padding: '14px 16px', fontSize: 13, color: '#aaa', lineHeight: 1.6 }}>
        ⚡ Экспресс-доставка в день заказа доступна по Бишкеку при оформлении до 12:00.
      </div>
    </div>
  );
}