import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/f9c83306-3577-4f43-82e1-9b715bb1c588/files/70f084bf-1a46-49b7-8003-4ea01839c33f.jpg";
const PRODUCT_IMG = "https://cdn.poehali.dev/projects/f9c83306-3577-4f43-82e1-9b715bb1c588/files/6d8d7178-798e-474f-b270-e9e574868538.jpg";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const products = [
  {
    id: "01",
    name: "Силовые трансформаторы",
    desc: "Масляные и сухие трансформаторы мощностью от 25 до 80 000 кВА для промышленных объектов и энергетических систем.",
    icon: "Zap",
  },
  {
    id: "02",
    name: "Распределительные устройства",
    desc: "Комплектные распределительные устройства КРУ и КРУН на напряжение 6–35 кВ с высокой степенью защиты.",
    icon: "Cpu",
  },
  {
    id: "03",
    name: "Системы защиты",
    desc: "Интеллектуальные системы релейной защиты и автоматики для надёжного управления энергетическими объектами.",
    icon: "Shield",
  },
  {
    id: "04",
    name: "Кабельная продукция",
    desc: "Силовые кабели высокого и среднего напряжения, кабельные муфты и аксессуары для энергосистем.",
    icon: "Cable",
  },
];

const advantages = [
  { num: "25+", label: "лет на рынке" },
  { num: "1 200+", label: "реализованных проектов" },
  { num: "98%", label: "соблюдение сроков" },
  { num: "40+", label: "регионов присутствия" },
];

const clients = [
  "Россети", "Газпром", "Лукойл", "РЖД", "Росатом", "Татнефть",
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const heroSection = useInView(0.1);
  const aboutSection = useInView(0.1);
  const productsSection = useInView(0.1);
  const advantagesSection = useInView(0.1);
  const clientsSection = useInView(0.1);
  const contactSection = useInView(0.1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-es-navy text-es-white overflow-x-hidden" style={{ color: "#FAFBFC" }}>

      {/* ── NAVIGATION ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-es-navy/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-es-gold flex items-center justify-center">
              <span className="text-es-gold font-display text-sm font-semibold">E</span>
            </div>
            <span className="font-display text-lg font-medium tracking-[0.15em] uppercase text-white">
              Energoskan
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            {[
              { label: "О компании", id: "about" },
              { label: "Продукция", id: "products" },
              { label: "Преимущества", id: "advantages" },
              { label: "Клиенты", id: "clients" },
              { label: "Контакты", id: "contact" },
            ].map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="nav-link">
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("contact")}
            className="hidden lg:block px-6 py-2.5 border border-es-gold text-es-gold font-body text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-es-gold hover:text-es-navy"
          >
            Запрос КП
          </button>

          <button className="lg:hidden text-es-platinum" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-es-navy border-t border-white/10 px-8 py-6 flex flex-col gap-6">
            {[
              { label: "О компании", id: "about" },
              { label: "Продукция", id: "products" },
              { label: "Преимущества", id: "advantages" },
              { label: "Клиенты", id: "clients" },
              { label: "Контакты", id: "contact" },
            ].map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="nav-link text-left">
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-es-navy via-es-navy/80 to-es-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-es-navy via-transparent to-transparent" />

        {/* Diagonal gold accent */}
        <div
          className="absolute right-0 top-0 w-px h-full opacity-20"
          style={{ background: "linear-gradient(to bottom, transparent, #C9A84C, transparent)" }}
        />

        <div
          ref={heroSection.ref}
          className="relative z-10 max-w-7xl mx-auto px-8 pb-28 pt-40 w-full"
        >
          <div className={`transition-all duration-1000 ${heroSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <p className="section-label mb-6">Энергетические решения</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.92] text-white mb-8 max-w-3xl">
              Надёжная энергия<br />
              <em className="text-es-gold not-italic">для промышленности</em>
            </h1>
            <span className="gold-line block max-w-xs mb-10" />
            <p className="font-body text-base text-es-platinum max-w-md leading-relaxed mb-12">
              Поставка, монтаж и обслуживание высоковольтного электротехнического
              оборудования для крупных промышленных и инфраструктурных объектов.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("contact")}
                className="px-10 py-4 bg-es-gold text-es-navy font-body text-xs tracking-[0.25em] uppercase font-medium transition-all duration-300 hover:bg-es-gold-light"
              >
                Получить консультацию
              </button>
              <button
                onClick={() => scrollTo("products")}
                className="px-10 py-4 border border-white/20 text-white font-body text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:border-es-gold hover:text-es-gold"
              >
                Продукция
              </button>
            </div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-8 py-5 flex gap-10 overflow-x-auto">
            {advantages.map((a) => (
              <div key={a.num} className="flex items-center gap-4 shrink-0">
                <span className="font-display text-2xl text-es-gold">{a.num}</span>
                <span className="font-body text-xs text-es-platinum uppercase tracking-wider">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-32 bg-es-navy">
        <div
          ref={aboutSection.ref}
          className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center"
        >
          <div className={`transition-all duration-1000 ${aboutSection.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <p className="section-label mb-6">О компании</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white leading-[1.1] mb-8">
              Четверть века<br />
              <em className="text-es-gold not-italic">безупречной</em> работы
            </h2>
            <div className="w-16 h-px bg-es-gold mb-10" />
            <p className="font-body text-es-platinum leading-relaxed mb-6">
              Energoskan — ведущий поставщик электротехнического оборудования в России.
              С 1999 года мы обеспечиваем надёжную энергетическую инфраструктуру для
              промышленных предприятий, объектов нефтегазового комплекса и транспортной отрасли.
            </p>
            <p className="font-body text-es-platinum leading-relaxed mb-10">
              Собственный инженерный центр, сертифицированные специалисты и партнёрство с
              ведущими мировыми производителями позволяют нам предлагать решения полного цикла —
              от проектирования до пусконаладки и сервисного обслуживания.
            </p>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-3 font-body text-xs tracking-[0.25em] uppercase text-es-gold hover:gap-5 transition-all duration-300"
            >
              Узнать больше
              <Icon name="ArrowRight" size={14} />
            </button>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${aboutSection.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border border-es-gold/20" />
              <img
                src={PRODUCT_IMG}
                alt="Energoskan производство"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-es-navy to-transparent">
                <div className="flex gap-8">
                  <div>
                    <div className="font-display text-3xl text-es-gold">ISO</div>
                    <div className="font-body text-xs text-es-platinum tracking-wider">9001:2015</div>
                  </div>
                  <div className="w-px bg-white/20" />
                  <div>
                    <div className="font-display text-3xl text-es-gold">ТОП-3</div>
                    <div className="font-body text-xs text-es-platinum tracking-wider">в России</div>
                  </div>
                  <div className="w-px bg-white/20" />
                  <div>
                    <div className="font-display text-3xl text-es-gold">24/7</div>
                    <div className="font-body text-xs text-es-platinum tracking-wider">поддержка</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" className="py-32" style={{ background: "#0D1E38" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div
            ref={productsSection.ref}
            className={`transition-all duration-1000 ${productsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
              <div>
                <p className="section-label mb-4">Продукция</p>
                <h2 className="font-display text-4xl md:text-5xl font-light text-white leading-tight">
                  Полный спектр<br />
                  <em className="text-es-gold not-italic">электротехники</em>
                </h2>
              </div>
              <p className="font-body text-es-platinum max-w-sm leading-relaxed text-sm">
                Более 12 000 наименований оборудования от ведущих российских
                и международных производителей на складе и под заказ.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-white/5">
              {products.map((p, i) => (
                <div
                  key={p.id}
                  className="bg-es-navy group p-10 hover:bg-es-steel transition-colors duration-500 cursor-pointer"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-8">
                    <span className="font-display text-6xl text-white/10 font-light leading-none group-hover:text-es-gold/20 transition-colors duration-500">
                      {p.id}
                    </span>
                    <div className="w-10 h-10 border border-es-gold/30 flex items-center justify-center group-hover:border-es-gold transition-colors duration-300">
                      <Icon name={p.icon as "Zap"} size={16} className="text-es-gold" />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-light text-white mb-4 group-hover:text-es-gold transition-colors duration-300">
                    {p.name}
                  </h3>
                  <p className="font-body text-sm text-es-platinum leading-relaxed mb-8">
                    {p.desc}
                  </p>
                  <div className="flex items-center gap-2 text-es-gold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="font-body text-xs tracking-[0.2em] uppercase">Подробнее</span>
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ADVANTAGES ── */}
      <section id="advantages" className="py-32 bg-es-navy">
        <div className="max-w-7xl mx-auto px-8">
          <div
            ref={advantagesSection.ref}
            className={`transition-all duration-1000 ${advantagesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="text-center mb-20">
              <p className="section-label mb-4">Преимущества</p>
              <h2 className="font-display text-4xl md:text-5xl font-light text-white">
                Почему выбирают<br />
                <em className="text-es-gold not-italic">Energoskan</em>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-white/5 mb-24">
              {[
                {
                  icon: "Award",
                  title: "Гарантия качества",
                  desc: "Всё оборудование проходит входной контроль и сертифицировано по российским и международным стандартам.",
                },
                {
                  icon: "Clock",
                  title: "Точность поставок",
                  desc: "98% заказов доставляются в обещанный срок. Собственный складской комплекс площадью 15 000 м².",
                },
                {
                  icon: "Users",
                  title: "Инженерная поддержка",
                  desc: "Команда из 120+ инженеров обеспечит проектирование, монтаж и сервисное обслуживание объекта.",
                },
                {
                  icon: "BarChart3",
                  title: "Индивидуальные решения",
                  desc: "Разрабатываем нестандартные конфигурации оборудования под задачи конкретного предприятия.",
                },
                {
                  icon: "Globe",
                  title: "Широкая география",
                  desc: "Работаем в 40+ регионах России, в странах СНГ и ЕАЭС. Собственные склады в Москве и Екатеринбурге.",
                },
                {
                  icon: "FileCheck",
                  title: "Полная документация",
                  desc: "Комплект разрешительной и технической документации, сертификаты соответствия и паспорта оборудования.",
                },
              ].map((adv, i) => (
                <div
                  key={i}
                  className="bg-es-navy p-10 group hover:bg-es-steel transition-colors duration-300"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-12 h-12 border border-es-gold/20 flex items-center justify-center mb-6 group-hover:border-es-gold transition-colors duration-300">
                    <Icon name={adv.icon as "Award"} size={18} className="text-es-gold" />
                  </div>
                  <h3 className="font-display text-xl font-light text-white mb-4">{adv.title}</h3>
                  <p className="font-body text-sm text-es-platinum leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>

            {/* Big numbers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {advantages.map((a, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-5xl md:text-6xl text-es-gold font-light mb-3">{a.num}</div>
                  <div className="font-body text-xs text-es-platinum uppercase tracking-[0.2em]">{a.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <section id="clients" className="py-32" style={{ background: "#0D1E38" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div
            ref={clientsSection.ref}
            className={`transition-all duration-1000 ${clientsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="text-center mb-16">
              <p className="section-label mb-4">Клиенты</p>
              <h2 className="font-display text-4xl md:text-5xl font-light text-white">
                Нам доверяют<br />
                <em className="text-es-gold not-italic">лидеры отрасли</em>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5 mb-20">
              {clients.map((client, i) => (
                <div
                  key={i}
                  className="bg-es-navy hover:bg-es-steel transition-colors duration-300 p-8 flex items-center justify-center"
                >
                  <span className="font-display text-xl text-es-platinum hover:text-white transition-colors duration-300 text-center">
                    {client}
                  </span>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="border border-white/10 p-12 relative">
              <div className="absolute top-8 left-10 font-display text-8xl text-es-gold/20 leading-none">"</div>
              <blockquote className="relative z-10 font-display text-xl md:text-2xl font-light text-white leading-relaxed max-w-3xl mb-8 italic">
                Energoskan — наш стратегический партнёр в сфере электроснабжения на протяжении
                12 лет. Высокое качество оборудования и профессионализм команды позволяют
                нам реализовывать самые сложные проекты в срок.
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-10 h-px bg-es-gold" />
                <div>
                  <div className="font-body text-sm text-white font-medium">Андрей Семёнов</div>
                  <div className="font-body text-xs text-es-platinum">Главный энергетик, Россети Центр</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-32 bg-es-navy relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, #C9A84C 60px, #C9A84C 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, #C9A84C 60px, #C9A84C 61px)`,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div
            ref={contactSection.ref}
            className={`transition-all duration-1000 ${contactSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <div>
                <p className="section-label mb-6">Контакты</p>
                <h2 className="font-display text-4xl md:text-5xl font-light text-white leading-tight mb-8">
                  Обсудим ваш<br />
                  <em className="text-es-gold not-italic">проект</em>
                </h2>
                <div className="w-16 h-px bg-es-gold mb-10" />
                <p className="font-body text-es-platinum leading-relaxed mb-12">
                  Оставьте заявку — наш инженер свяжется с вами в течение 2 часов
                  и подготовит коммерческое предложение под ваши задачи.
                </p>

                <div className="flex flex-col gap-6">
                  {[
                    { icon: "Phone", label: "+7 (495) 000-00-00", sub: "Многоканальный" },
                    { icon: "Mail", label: "info@energoskan.ru", sub: "Электронная почта" },
                    { icon: "MapPin", label: "Москва, ул. Промышленная, 12", sub: "Главный офис" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-5">
                      <div className="w-10 h-10 border border-es-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon name={c.icon as "Phone"} size={14} className="text-es-gold" />
                      </div>
                      <div>
                        <div className="font-body text-white text-sm">{c.label}</div>
                        <div className="font-body text-xs text-es-platinum mt-0.5">{c.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 p-10">
                <h3 className="font-display text-2xl font-light text-white mb-8">Запрос коммерческого предложения</h3>
                <div className="flex flex-col gap-5">
                  {[
                    { placeholder: "Ваше имя", type: "text" },
                    { placeholder: "Название компании", type: "text" },
                    { placeholder: "Телефон", type: "tel" },
                    { placeholder: "Email", type: "email" },
                  ].map((field, i) => (
                    <input
                      key={i}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full bg-transparent border border-white/15 px-5 py-4 font-body text-sm text-white placeholder:text-es-platinum/50 focus:outline-none focus:border-es-gold transition-colors duration-300"
                    />
                  ))}
                  <textarea
                    placeholder="Описание задачи / объём оборудования"
                    rows={4}
                    className="w-full bg-transparent border border-white/15 px-5 py-4 font-body text-sm text-white placeholder:text-es-platinum/50 focus:outline-none focus:border-es-gold transition-colors duration-300 resize-none"
                  />
                  <button className="w-full py-4 bg-es-gold text-es-navy font-body text-xs tracking-[0.25em] uppercase font-medium transition-all duration-300 hover:bg-es-gold-light">
                    Отправить заявку
                  </button>
                  <p className="font-body text-xs text-es-platinum/60 text-center leading-relaxed">
                    Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-10" style={{ background: "#060F1E" }}>
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border border-es-gold/40 flex items-center justify-center">
              <span className="text-es-gold font-display text-xs">E</span>
            </div>
            <span className="font-display text-sm font-medium tracking-[0.15em] uppercase text-white/60">
              Energoskan
            </span>
          </div>
          <p className="font-body text-xs text-es-platinum/40 tracking-wider">
            © 2024 Energoskan. Все права защищены.
          </p>
          <div className="flex gap-6">
            {["Политика конфиденциальности", "Реквизиты"].map((link) => (
              <button key={link} className="font-body text-xs text-es-platinum/40 hover:text-es-gold transition-colors duration-300">
                {link}
              </button>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
