export default function About() {
  return (
    <div style={{ background: '#111', color: '#fff', minHeight: '100vh', padding: '60px 40px' }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>
        О компании <span style={{ color: '#D4FF00' }}>SportElite</span>
      </h1>
      <p style={{ color: '#aaa', fontSize: 16, maxWidth: 600, lineHeight: 1.7, marginBottom: 40 }}>
        Мы — команда энтузиастов спорта, которая с 2018 года помогает людям находить
        лучшую спортивную экипировку от мировых брендов. Только оригинальная продукция,
        честные цены и забота о каждом покупателе.
      </p>

      <div style={{ display: 'flex', gap: 32, marginBottom: 48, flexWrap: 'wrap' }}>
        {[['6+', 'лет на рынке'], ['50 000+', 'довольных клиентов'], ['3 000+', 'товаров в каталоге'], ['100%', 'оригинальная продукция']].map(([num, label]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#D4FF00' }}>{num}</div>
            <div style={{ fontSize: 13, color: '#777', marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        {[
          { icon: '🏆', title: 'Только оригиналы', text: 'Работаем напрямую с официальными дистрибьюторами Nike, Adidas, Puma и Under Armour. Каждый товар сопровождается документами подлинности.' },
          { icon: '🤝', title: 'Личный подход', text: 'Наши консультанты сами занимаются спортом и помогут подобрать экипировку под ваш вид активности, размер и бюджет.' },
          { icon: '🌍', title: 'Доставка по всему Кыргызстану', text: 'Отправляем заказы во все регионы Кыргызстана. Работаем с надёжными курьерскими службами для быстрой и бережной доставки.' },
        ].map(({ icon, title, text }) => (
          <div key={title} style={{ background: '#1c1c1c', border: '0.5px solid #2e2e2e', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
            <div style={{ fontWeight: 500, marginBottom: 8 }}>{title}</div>
            <div style={{ fontSize: 13, color: '#888', lineHeight: 1.6 }}>{text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}