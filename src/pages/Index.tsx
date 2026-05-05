import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMGS = {
  hero: "https://cdn.poehali.dev/projects/f9c83306-3577-4f43-82e1-9b715bb1c588/files/685e0212-9962-4726-877d-03be62daf1da.jpg",
  factory: "https://cdn.poehali.dev/projects/f9c83306-3577-4f43-82e1-9b715bb1c588/files/119ca768-9ab3-4a79-a2d8-954313325343.jpg",
  lab: "https://cdn.poehali.dev/projects/f9c83306-3577-4f43-82e1-9b715bb1c588/files/70f084bf-1a46-49b7-8003-4ea01839c33f.jpg",
  truck: "https://cdn.poehali.dev/projects/f9c83306-3577-4f43-82e1-9b715bb1c588/files/c85339e6-175f-4ac5-af0b-9ef667c5863b.jpg",
  equipment: "https://cdn.poehali.dev/projects/f9c83306-3577-4f43-82e1-9b715bb1c588/files/6d8d7178-798e-474f-b270-e9e574868538.jpg",
};

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const navLinks = [
  { label: "О компании", id: "about" },
  { label: "Продукция", id: "catalog" },
  { label: "Лаборатории", id: "labs" },
  { label: "Проекты", id: "projects" },
  { label: "Сервисы", id: "services" },
  { label: "Новости", id: "news" },
  { label: "Контакты", id: "contact" },
];

const catalogItems = [
  { img: IMGS.equipment, tag: "Трансформаторы", price: "от 180 000 ₽", title: "Передвижные электролаборатории — подстанции", desc: "Мощность трансформатора до 630 кВА" },
  { img: IMGS.lab, tag: "Распредустройства", price: "от 240 000 ₽", title: "Комплектные трансформаторные устройства", desc: "Напряжение 6–35 кВ, степень защиты IP54" },
  { img: IMGS.truck, tag: "Лаборатории", price: "от 3 500 000 ₽", title: "Передвижные монтажные установки на базе КамАЗ", desc: "Готовы к работе при -40°C" },
  { img: IMGS.factory, tag: "Кабельные муфты", price: "от 12 000 ₽", title: "Концевые муфты для кабелей высокого напряжения", desc: "Напряжение 6–110 кВ, наружная/внутренняя установка" },
];

const labTypes = [
  { icon: "Zap", title: "Испытание на частоте промышленной сети", desc: "Испытания кабелей, трансформаторов и высоковольтных аппаратов напряжением до 100 кВ" },
  { icon: "Activity", title: "Испытание и диагностика систем трансформаторов", desc: "Полный цикл проверки силовых трансформаторов: масло, обмотки, изоляция, хроматография" },
  { icon: "Search", title: "Кабельная диагностика с локализацией неисправностей", desc: "Выявление мест повреждений кабельных линий методами рефлектометрии и акустики" },
];

const services = [
  { icon: "Truck", title: "Поставка оборудования", desc: "Более 12 000 позиций со склада и под заказ" },
  { icon: "Wrench", title: "Монтаж и наладка", desc: "Монтаж под ключ силами собственных бригад" },
  { icon: "Headphones", title: "Сервис 24/7", desc: "Выезд инженера в течение 4 часов по договору" },
  { icon: "BookOpen", title: "Обучение персонала", desc: "Учебный центр, лицензированный Минобрнауки" },
  { icon: "FileText", title: "Проектирование", desc: "Разработка рабочей документации любой сложности" },
  { icon: "Award", title: "Сертификация", desc: "Помощь в получении разрешительных документов" },
];

const whyUs = [
  "Собственное производство",
  "Склад 15 000 м² в Москве",
  "Гарантия 24 месяца",
  "Сертификация ISO 9001",
  "Монтаж под ключ",
  "Обучение персонала",
];

const whyThem = [
  "Только перепродажа",
  "Склад только под заказ",
  "Гарантия 12 месяцев",
  "Нет сертификатов",
  "Монтаж субподрядчиком",
  "Нет учебного центра",
];

const stats = [
  { num: "500+", label: "заказов" },
  { num: "60+", label: "регионов" },
  { num: "20+", label: "лет опыта" },
  { num: "85%", label: "постоянных клиентов" },
  { num: "24 мес", label: "гарантия" },
];

const clients = ["Россети", "Газпром", "Лукойл", "РЖД", "Росатом", "Татнефть", "Роснефть", "ФСК ЕЭС"];

const projects = [
  { img: IMGS.truck, title: "Передвижная электролаборатория для Россети Центр", tag: "Лаборатории", year: "2024" },
  { img: IMGS.equipment, title: "Комплект КТП 630 кВА для нефтяного месторождения", tag: "Трансформаторы", year: "2023" },
  { img: IMGS.factory, title: "Поставка силовых кабелей для строительства АЭС", tag: "Кабели", year: "2023" },
  { img: IMGS.lab, title: "Система диагностики для распределительных сетей", tag: "Диагностика", year: "2024" },
];

const faqItems = [
  { q: "Каков минимальный объём заказа?", a: "Минимальный заказ не ограничен — работаем как с единичными поставками, так и с крупными серийными заказами. Для корпоративных клиентов доступны индивидуальные условия." },
  { q: "Какой срок изготовления оборудования?", a: "Стандартные позиции отгружаем со склада в течение 3–5 рабочих дней. Нестандартное оборудование изготавливается за 30–90 дней в зависимости от сложности." },
  { q: "Есть ли у вас сервисное обслуживание?", a: "Да, наш сервисный центр работает 24/7. Договоры на техническое обслуживание заключаются сроком на 1–3 года с фиксированной стоимостью выездов." },
  { q: "Какие документы предоставляются с оборудованием?", a: "Полный пакет: паспорта, сертификаты соответствия ГОСТ, декларации, протоколы испытаний, инструкции по эксплуатации." },
  { q: "Работаете ли вы с госзакупками?", a: "Да, участвуем в тендерах. Поставляем оборудование по 44-ФЗ и 223-ФЗ. Для участия в закупке предоставим полный пакет документации." },
];

const newsItems = [
  { date: "28 апреля 2026", tag: "Новинки", title: "Новая линейка передвижных лабораторий ПЭЛ-110", desc: "Завод Energoskan представил обновлённую серию мобильных электролабораторий с расширенными функциями диагностики." },
  { date: "15 апреля 2026", tag: "Проекты", title: "Завершена поставка 40 комплектов КТП для Россети", desc: "В рамках программы модернизации распределительных сетей отгружены трансформаторные подстанции 630 кВА." },
  { date: "02 апреля 2026", tag: "Обучение", title: "Открыт новый набор в учебный центр", desc: "Запись на курсы повышения квалификации для электротехнического персонала 2–5 группы допуска." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className="font-body text-sm text-white">{q}</span>
        <Icon name={open ? "ChevronUp" : "ChevronDown"} size={16} className="text-es-gold shrink-0" />
      </button>
      {open && <p className="font-body text-sm text-es-platinum leading-relaxed pb-5">{a}</p>}
    </div>
  );
}

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [calcKva, setCalcKva] = useState(630);
  const [calcVoltage, setCalcVoltage] = useState("10");
  const [activeTab, setActiveTab] = useState("all");

  const heroS = useInView(0.05);
  const aboutS = useInView(0.1);
  const startS = useInView(0.1);
  const catalogS = useInView(0.1);
  const labsS = useInView(0.1);
  const statsBarS = useInView(0.1);
  const devS = useInView(0.1);
  const clientsS = useInView(0.1);
  const projectsS = useInView(0.1);
  const whyS = useInView(0.1);
  const materialsS = useInView(0.1);
  const calcS = useInView(0.1);
  const faqS = useInView(0.1);
  const formS = useInView(0.1);
  const newsS = useInView(0.1);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const calcPrice = Math.round(calcKva * 320 + (calcVoltage === "35" ? 180000 : 0));

  return (
    <div className="bg-es-navy overflow-x-hidden" style={{ color: "#FAFBFC" }}>

      {/* ── NAV ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-es-navy/97 backdrop-blur-md shadow-lg shadow-black/30" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 border border-es-gold flex items-center justify-center">
              <span className="text-es-gold font-display text-sm font-semibold leading-none">E</span>
            </div>
            <span className="font-display text-base font-medium tracking-[0.12em] uppercase text-white">Energoskan</span>
          </button>
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="nav-link text-xs">{n.label}</button>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a href="tel:+74950000000" className="font-body text-sm text-white font-medium hover:text-es-gold transition-colors">+7 (495) 000-00-00</a>
            <button onClick={() => scrollTo("contact")} className="px-5 py-2 bg-es-gold text-es-navy font-body text-xs tracking-[0.18em] uppercase font-medium hover:bg-es-gold-light transition-colors">
              Запрос КП
            </button>
          </div>
          <button className="xl:hidden text-es-platinum" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="xl:hidden bg-es-navy/98 border-t border-white/10 px-6 py-6 flex flex-col gap-5">
            {navLinks.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="nav-link text-left text-sm">{n.label}</button>
            ))}
            <button onClick={() => scrollTo("contact")} className="mt-2 px-5 py-3 bg-es-gold text-es-navy font-body text-xs tracking-[0.18em] uppercase font-medium">Запрос КП</button>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${IMGS.hero})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-es-navy via-es-navy/85 to-es-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-es-navy via-transparent to-transparent" />
        <div ref={heroS.ref} className="relative z-10 max-w-7xl mx-auto px-8 pb-24 pt-40 w-full">
          <div className={`transition-all duration-1000 ${heroS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <nav className="flex items-center gap-2 mb-8 font-body text-xs text-es-platinum/60">
              <span>Главная</span>
              <span className="text-es-gold">/</span>
              <span className="text-white">Кабельные лаборатории</span>
            </nav>
            <p className="section-label mb-5">Завод-производитель ЭТЛ</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95] text-white mb-6 max-w-3xl">
              Кабельные лаборатории<br />для испытаний и<br />
              <em className="text-es-gold not-italic">диагностики</em>
            </h1>
            <p className="font-body text-sm text-es-platinum max-w-xl leading-relaxed mb-10">
              Производство и поставка мобильных электротехнических лабораторий.
              Испытательное, сервисное и диагностическое оборудование.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("contact")} className="px-8 py-3.5 bg-es-gold text-es-navy font-body text-xs tracking-[0.2em] uppercase font-medium hover:bg-es-gold-light transition-colors">
                Запросить КП ЭТЛ
              </button>
              <button onClick={() => scrollTo("catalog")} className="px-8 py-3.5 border border-white/25 text-white font-body text-xs tracking-[0.2em] uppercase hover:border-es-gold hover:text-es-gold transition-colors">
                Каталог ЭТЛ
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-12 flex gap-2 z-10">
          {[0,1,2].map(i => (
            <span key={i} className={`w-2 h-2 rounded-full ${i===0 ? "bg-es-gold" : "bg-white/30"}`} />
          ))}
        </div>
      </section>

      {/* ── ABOUT / FACTORY ── */}
      <section id="about" className="py-20 bg-es-navy">
        <div ref={aboutS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${aboutS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div>
              <p className="section-label mb-4">О компании</p>
              <h2 className="font-display text-3xl md:text-4xl font-light text-white leading-tight mb-6">
                Energoskan — завод-<br />
                производитель <em className="text-es-gold not-italic">ЭТЛ</em>
              </h2>
              <p className="font-body text-sm text-es-platinum leading-relaxed mb-4">
                Основан в 1999 году. Производим передвижные электролаборатории, испытательное
                и диагностическое оборудование. Все изделия соответствуют ГОСТ и проходят
                полный цикл испытаний на собственном полигоне.
              </p>
              <p className="font-body text-sm text-es-platinum leading-relaxed mb-8">
                В штате более 350 сотрудников, собственное КБ, производственные цеха площадью 8 000 м².
                Сертифицированы по ISO 9001:2015. Дилерская сеть в 60+ регионах России.
              </p>
              <div className="grid grid-cols-4 gap-4 mb-8 border-t border-white/10 pt-8">
                {[
                  { n: "500+", l: "проектов" },
                  { n: "17", l: "патентов" },
                  { n: "60+", l: "регионов" },
                  { n: "24", l: "года на рынке" },
                ].map(s => (
                  <div key={s.n}>
                    <div className="font-display text-2xl text-es-gold">{s.n}</div>
                    <div className="font-body text-xs text-es-platinum mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => scrollTo("contact")} className="px-6 py-3 bg-es-gold text-es-navy font-body text-xs tracking-[0.18em] uppercase font-medium hover:bg-es-gold-light transition-colors">
                  Подробнее о нас
                </button>
                <button onClick={() => scrollTo("projects")} className="px-6 py-3 border border-white/20 text-white font-body text-xs tracking-[0.18em] uppercase hover:border-es-gold hover:text-es-gold transition-colors">
                  Наши проекты
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-full h-full border border-es-gold/15 pointer-events-none" />
              <img src={IMGS.factory} alt="Завод Energoskan" className="w-full aspect-[4/3] object-cover" />
              <div className="absolute top-4 right-4 bg-es-navy/90 border border-es-gold/30 px-4 py-3">
                <div className="font-body text-xs text-es-platinum mb-0.5">Статус производства</div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-body text-xs text-white font-medium">В работе — 3 заказа</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK START ── */}
      <section className="py-16" style={{ background: "#0D1E38" }}>
        <div ref={startS.ref} className="max-w-7xl mx-auto px-8">
          <h2 className={`font-display text-2xl font-light text-white mb-10 transition-all duration-700 ${startS.inView ? "opacity-100" : "opacity-0"}`}>
            С чего начать?
          </h2>
          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 transition-all duration-700 ${startS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {[
              { icon: "Zap", title: "Купить готовую ЭТЛ", desc: "Стандартные комплектации со склада от 2 недель", cta: "Смотреть каталог" },
              { icon: "Settings", title: "Сконфигурировать под задачу", desc: "Разработаем ТЗ и соберём лабораторию по вашим параметрам", cta: "Получить КП" },
              { icon: "Wrench", title: "Сервисное обслуживание", desc: "ТО, ремонт и диагностика ЭТЛ любых производителей", cta: "Оставить заявку" },
              { icon: "MousePointerClick", title: "Подбор под объект", desc: "Заполните форму — менеджер перезвонит и подберёт решение", cta: "Начать подбор" },
            ].map((item, i) => (
              <div key={i} className="bg-es-navy p-8 group hover:bg-es-steel transition-colors duration-300 cursor-pointer">
                <div className="w-10 h-10 border border-es-gold/25 flex items-center justify-center mb-5 group-hover:border-es-gold transition-colors">
                  <Icon name={item.icon as "Zap"} size={16} className="text-es-gold" />
                </div>
                <h3 className="font-display text-lg font-light text-white mb-3 leading-snug">{item.title}</h3>
                <p className="font-body text-xs text-es-platinum leading-relaxed mb-5">{item.desc}</p>
                <span className="font-body text-xs text-es-gold tracking-wider group-hover:underline">{item.cta} →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATALOG ── */}
      <section id="catalog" className="py-24 bg-es-navy">
        <div ref={catalogS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 transition-all duration-700 ${catalogS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <p className="section-label mb-3">Каталог</p>
              <h2 className="font-display text-3xl md:text-4xl font-light text-white">Каталог продукции</h2>
            </div>
            <div className="flex gap-3 flex-wrap">
              {[
                { k: "all", l: "Все" }, { k: "labs", l: "Лаборатории" },
                { k: "transformers", l: "Трансформаторы" }, { k: "cables", l: "Кабели" }
              ].map(t => (
                <button key={t.k} onClick={() => setActiveTab(t.k)}
                  className={`px-4 py-1.5 font-body text-xs tracking-wider uppercase border transition-colors ${activeTab === t.k ? "border-es-gold bg-es-gold text-es-navy" : "border-white/20 text-es-platinum hover:border-es-gold hover:text-white"}`}>
                  {t.l}
                </button>
              ))}
            </div>
            <button onClick={() => scrollTo("contact")} className="font-body text-xs text-es-gold hover:underline">Весь каталог →</button>
          </div>
          <div className={`grid md:grid-cols-2 gap-px bg-white/5 transition-all duration-700 ${catalogS.inView ? "opacity-100" : "opacity-0"}`}>
            {catalogItems.map((item, i) => (
              <div key={i} className="bg-es-navy group cursor-pointer overflow-hidden">
                <div className="overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-body text-xs bg-es-gold/15 text-es-gold px-3 py-1 border border-es-gold/20">{item.tag}</span>
                    <span className="font-body text-sm text-es-gold font-medium">{item.price}</span>
                  </div>
                  <h3 className="font-display text-xl font-light text-white mb-2 group-hover:text-es-gold transition-colors">{item.title}</h3>
                  <p className="font-body text-xs text-es-platinum mb-4">{item.desc}</p>
                  <span className="font-body text-xs text-es-gold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Подробнее →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LABS TYPES ── */}
      <section id="labs" className="py-24" style={{ background: "#0D1E38" }}>
        <div ref={labsS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${labsS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="section-label mb-4">Лаборатории</p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-4">
              Выберите по типу мобильной<br />электролаборатории
            </h2>
          </div>
          <div className={`grid md:grid-cols-3 gap-px bg-white/5 transition-all duration-700 ${labsS.inView ? "opacity-100" : "opacity-0"}`}>
            {labTypes.map((lab, i) => (
              <div key={i} className="bg-es-navy p-10 group hover:bg-es-steel transition-colors duration-300 cursor-pointer">
                <div className="w-12 h-12 border border-es-gold/25 flex items-center justify-center mb-6 group-hover:border-es-gold transition-colors">
                  <Icon name={lab.icon as "Zap"} size={18} className="text-es-gold" />
                </div>
                <h3 className="font-display text-xl font-light text-white mb-4 leading-snug group-hover:text-es-gold transition-colors">{lab.title}</h3>
                <p className="font-body text-xs text-es-platinum leading-relaxed mb-6">{lab.desc}</p>
                <span className="font-body text-xs text-es-gold group-hover:underline">Подробнее →</span>
              </div>
            ))}
          </div>
          <div className={`mt-10 text-center transition-all duration-700 ${labsS.inView ? "opacity-100" : "opacity-0"}`}>
            <p className="font-body text-xs text-es-platinum mb-4">Не нашли подходящую конфигурацию?</p>
            <button onClick={() => scrollTo("contact")} className="px-8 py-3 border border-es-gold text-es-gold font-body text-xs tracking-[0.2em] uppercase hover:bg-es-gold hover:text-es-navy transition-colors">
              Заказать индивидуальную ЭТЛ
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-5 border-y border-white/10" style={{ background: "#081322" }}>
        <div ref={statsBarS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`flex flex-wrap justify-between gap-6 transition-all duration-700 ${statsBarS.inView ? "opacity-100" : "opacity-0"}`}>
            {["25+ лет опыта", "Собственное производство", "Склад в наличии", "Гарантия 24 месяца", "Сервисный центр 24/7"].map((t, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-es-gold rounded-full shrink-0" />
                <span className="font-body text-xs text-es-platinum tracking-wider">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES (РАЗРАБОТКА, ПРОИЗВОДСТВО...) ── */}
      <section id="services" className="py-24 bg-es-navy">
        <div ref={devS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${devS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-4">Разработка. Производство. Обучение. Сервис.</h2>
            <p className="font-body text-sm text-es-platinum max-w-xl mx-auto">Полный цикл от технического задания до запуска и обслуживания объекта.</p>
          </div>
          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 transition-all duration-700 ${devS.inView ? "opacity-100" : "opacity-0"}`}>
            {services.map((s, i) => (
              <div key={i} className="bg-es-navy p-8 group hover:bg-es-steel transition-colors duration-300">
                <div className="w-10 h-10 border border-es-gold/20 flex items-center justify-center mb-5 group-hover:border-es-gold transition-colors">
                  <Icon name={s.icon as "Truck"} size={16} className="text-es-gold" />
                </div>
                <h3 className="font-display text-lg font-light text-white mb-2">{s.title}</h3>
                <p className="font-body text-xs text-es-platinum leading-relaxed mb-4">{s.desc}</p>
                <span className="font-body text-xs text-es-gold opacity-0 group-hover:opacity-100 transition-opacity">Подробнее →</span>
              </div>
            ))}
          </div>
          <div className={`mt-12 text-center transition-all duration-500 delay-300 ${devS.inView ? "opacity-100" : "opacity-0"}`}>
            <button onClick={() => scrollTo("contact")} className="px-8 py-3 bg-es-gold text-es-navy font-body text-xs tracking-[0.2em] uppercase font-medium hover:bg-es-gold-light transition-colors">
              Рассчитать стоимость
            </button>
          </div>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <section id="clients" className="py-20" style={{ background: "#0D1E38" }}>
        <div ref={clientsS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`text-center mb-10 transition-all duration-700 ${clientsS.inView ? "opacity-100" : "opacity-0"}`}>
            <p className="font-body text-xs text-es-platinum tracking-[0.3em] uppercase">Нам доверяют ведущие компании России</p>
          </div>
          <div className={`grid grid-cols-4 md:grid-cols-8 gap-px bg-white/5 transition-all duration-700 ${clientsS.inView ? "opacity-100" : "opacity-0"}`}>
            {clients.map((c, i) => (
              <div key={i} className="bg-es-navy py-8 px-4 flex items-center justify-center hover:bg-es-steel transition-colors cursor-pointer">
                <span className="font-display text-sm text-es-platinum/60 hover:text-white transition-colors text-center">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SЕРВИСЫ ИКОНКИ ── */}
      <section className="py-14 bg-es-navy border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="font-display text-xl font-light text-white mb-10">Сервисы</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {[
              { icon: "Truck", label: "Доставка" },
              { icon: "Tool", label: "Монтаж" },
              { icon: "Wifi", label: "Онлайн-поддержка" },
              { icon: "BookOpen", label: "Обучение" },
              { icon: "FileCheck", label: "Документация" },
              { icon: "RefreshCw", label: "Trade-in" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-5 border border-white/8 hover:border-es-gold/40 transition-colors cursor-pointer group">
                <Icon name={s.icon as "Truck"} size={20} className="text-es-gold" />
                <span className="font-body text-xs text-es-platinum text-center group-hover:text-white transition-colors">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-24" style={{ background: "#0D1E38" }}>
        <div ref={projectsS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`flex items-end justify-between mb-12 transition-all duration-700 ${projectsS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <p className="section-label mb-3">Портфолио</p>
              <h2 className="font-display text-3xl md:text-4xl font-light text-white">Реализованные проекты</h2>
            </div>
            <button className="font-body text-xs text-es-gold hover:underline hidden md:block">Все проекты →</button>
          </div>
          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 transition-all duration-700 ${projectsS.inView ? "opacity-100" : "opacity-0"}`}>
            {projects.map((p, i) => (
              <div key={i} className="bg-es-navy group cursor-pointer overflow-hidden">
                <div className="overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body text-xs text-es-gold">{p.tag}</span>
                    <span className="font-body text-xs text-es-platinum/50">{p.year}</span>
                  </div>
                  <h3 className="font-display text-sm font-light text-white leading-snug group-hover:text-es-gold transition-colors">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="advantages" className="py-24 bg-es-navy">
        <div ref={whyS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${whyS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="section-label mb-4">Конкурентные преимущества</p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-white">
              Почему выбирают <em className="text-es-gold not-italic">Energoskan</em>
            </h2>
          </div>
          <div className={`grid md:grid-cols-2 gap-px bg-white/5 mb-16 transition-all duration-700 ${whyS.inView ? "opacity-100" : "opacity-0"}`}>
            <div className="bg-es-navy p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-6 h-6 border border-es-gold flex items-center justify-center">
                  <span className="text-es-gold font-display text-xs">E</span>
                </div>
                <span className="font-body text-xs tracking-widest uppercase text-white font-medium">Energoskan</span>
              </div>
              <div className="flex flex-col gap-4">
                {whyUs.map((w, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-es-gold/15 border border-es-gold/30 flex items-center justify-center shrink-0">
                      <Icon name="Check" size={11} className="text-es-gold" />
                    </div>
                    <span className="font-body text-sm text-white">{w}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-es-navy/40 p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <span className="font-body text-xs tracking-widest uppercase text-es-platinum/50 font-medium">Конкуренты</span>
              </div>
              <div className="flex flex-col gap-4">
                {whyThem.map((w, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-red-900/20 border border-red-500/20 flex items-center justify-center shrink-0">
                      <Icon name="X" size={11} className="text-red-400/60" />
                    </div>
                    <span className="font-body text-sm text-es-platinum/40">{w}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 transition-all duration-700 delay-200 ${whyS.inView ? "opacity-100" : "opacity-0"}`}>
            {stats.map((s, i) => (
              <div key={i} className="text-center border border-white/8 py-8 hover:border-es-gold/30 transition-colors">
                <div className="font-display text-4xl text-es-gold font-light mb-2">{s.num}</div>
                <div className="font-body text-xs text-es-platinum uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MATERIALS ── */}
      <section className="py-20" style={{ background: "#0D1E38" }}>
        <div ref={materialsS.ref} className="max-w-7xl mx-auto px-8">
          <h2 className={`font-display text-2xl font-light text-white mb-10 transition-all duration-700 ${materialsS.inView ? "opacity-100" : "opacity-0"}`}>
            Материалы для специалистов
          </h2>
          <div className={`grid md:grid-cols-2 gap-px bg-white/5 transition-all duration-700 ${materialsS.inView ? "opacity-100" : "opacity-0"}`}>
            {[
              { icon: "FileText", title: "5 ошибок при выборе электролаборатории", desc: "Разбираем типичные ошибки при закупке и что нужно проверить перед покупкой.", cta: "Читать статью" },
              { icon: "Calculator", title: "10 вопросов при выборе трансформатора ЭТЛ", desc: "Чек-лист для технических специалистов, которые подбирают оборудование для объекта.", cta: "Скачать PDF" },
            ].map((m, i) => (
              <div key={i} className="bg-es-navy p-8 group hover:bg-es-steel transition-colors cursor-pointer">
                <div className="w-10 h-10 border border-es-gold/25 flex items-center justify-center mb-5 group-hover:border-es-gold transition-colors">
                  <Icon name={m.icon as "FileText"} size={16} className="text-es-gold" />
                </div>
                <h3 className="font-display text-xl font-light text-white mb-3 group-hover:text-es-gold transition-colors">{m.title}</h3>
                <p className="font-body text-xs text-es-platinum leading-relaxed mb-6">{m.desc}</p>
                <button className="px-5 py-2.5 bg-es-gold text-es-navy font-body text-xs tracking-[0.18em] uppercase font-medium hover:bg-es-gold-light transition-colors">
                  {m.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVANTAGES DARK BANNER ── */}
      <section className="py-14" style={{ background: "#081322" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-wrap justify-between items-center gap-8">
            <h3 className="font-display text-2xl font-light text-white">Преимущества завода</h3>
            <div className="flex flex-wrap gap-10">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-3xl text-es-gold font-light">{s.num}</div>
                  <div className="font-body text-xs text-es-platinum mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section className="py-20 bg-es-navy">
        <div ref={calcS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${calcS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <p className="section-label mb-4">Калькулятор</p>
              <h2 className="font-display text-3xl font-light text-white mb-4">
                Калькулятор стоимости <em className="text-es-gold not-italic">ЭТЛ</em>
              </h2>
              <p className="font-body text-sm text-es-platinum leading-relaxed">
                Укажите основные параметры — получите предварительный расчёт стоимости
                мобильной электролаборатории. Точная стоимость — в коммерческом предложении.
              </p>
            </div>
            <div className="border border-white/10 p-8">
              <div className="flex flex-col gap-5">
                <div>
                  <label className="font-body text-xs text-es-platinum uppercase tracking-wider mb-2 block">
                    Мощность трансформатора: <span className="text-es-gold">{calcKva} кВА</span>
                  </label>
                  <input type="range" min={25} max={2500} step={25} value={calcKva}
                    onChange={e => setCalcKva(+e.target.value)}
                    className="w-full accent-[#C9A84C] cursor-pointer" />
                  <div className="flex justify-between font-body text-xs text-es-platinum/40 mt-1">
                    <span>25 кВА</span><span>2500 кВА</span>
                  </div>
                </div>
                <div>
                  <label className="font-body text-xs text-es-platinum uppercase tracking-wider mb-2 block">Класс напряжения</label>
                  <div className="flex gap-3">
                    {["6", "10", "35"].map(v => (
                      <button key={v} onClick={() => setCalcVoltage(v)}
                        className={`flex-1 py-2.5 font-body text-sm border transition-colors ${calcVoltage === v ? "border-es-gold bg-es-gold/10 text-es-gold" : "border-white/15 text-es-platinum hover:border-es-gold/50"}`}>
                        {v} кВ
                      </button>
                    ))}
                  </div>
                </div>
                <div className="border-t border-white/10 pt-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-body text-sm text-es-platinum">Ориентировочная стоимость:</span>
                    <span className="font-display text-2xl text-es-gold">от {calcPrice.toLocaleString("ru")} ₽</span>
                  </div>
                  <button onClick={() => scrollTo("contact")} className="w-full py-3.5 bg-es-gold text-es-navy font-body text-xs tracking-[0.2em] uppercase font-medium hover:bg-es-gold-light transition-colors">
                    Получить точный расчёт
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20" style={{ background: "#0D1E38" }}>
        <div ref={faqS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`grid lg:grid-cols-2 gap-16 transition-all duration-700 ${faqS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <p className="section-label mb-4">FAQ</p>
              <h2 className="font-display text-3xl font-light text-white mb-6">
                Часто задаваемые<br />
                <em className="text-es-gold not-italic">вопросы</em>
              </h2>
              <p className="font-body text-sm text-es-platinum leading-relaxed mb-8">
                Не нашли ответ? Напишите нам — ответим в течение одного рабочего дня.
              </p>
              <button onClick={() => scrollTo("contact")} className="px-6 py-3 border border-es-gold text-es-gold font-body text-xs tracking-[0.2em] uppercase hover:bg-es-gold hover:text-es-navy transition-colors">
                Задать вопрос
              </button>
            </div>
            <div>
              {faqItems.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="contact" className="py-24 bg-es-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 60px,#C9A84C 60px,#C9A84C 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,#C9A84C 60px,#C9A84C 61px)` }} />
        <div ref={formS.ref} className="relative z-10 max-w-7xl mx-auto px-8">
          <div className={`grid lg:grid-cols-2 gap-20 items-start transition-all duration-1000 ${formS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div>
              <p className="section-label mb-6">Контакты</p>
              <h2 className="font-display text-4xl font-light text-white mb-3">
                Подберём решение<br />
                <em className="text-es-gold not-italic">под вашу задачу</em>
              </h2>
              <div className="w-16 h-px bg-es-gold mb-8" />
              <p className="font-body text-sm text-es-platinum leading-relaxed mb-10">
                Заполните форму — менеджер перезвонит в течение 30 минут в рабочее время
                и предложит оптимальное решение для вашего объекта.
              </p>
              <div className="flex flex-col gap-5">
                {[
                  { icon: "Phone", label: "+7 (495) 000-00-00", sub: "Многоканальный" },
                  { icon: "Mail", label: "info@energoskan.ru", sub: "Электронная почта" },
                  { icon: "MapPin", label: "Москва, ул. Промышленная, 12", sub: "Главный офис" },
                  { icon: "Clock", label: "Пн–Пт 9:00–18:00", sub: "Часы работы" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-9 h-9 border border-es-gold/30 flex items-center justify-center shrink-0">
                      <Icon name={c.icon as "Phone"} size={13} className="text-es-gold" />
                    </div>
                    <div>
                      <div className="font-body text-sm text-white">{c.label}</div>
                      <div className="font-body text-xs text-es-platinum/60 mt-0.5">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-white/10 p-10">
              <h3 className="font-display text-2xl font-light text-white mb-8">Запрос коммерческого предложения</h3>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Имя" className="bg-transparent border border-white/15 px-4 py-3.5 font-body text-sm text-white placeholder:text-es-platinum/40 focus:outline-none focus:border-es-gold transition-colors" />
                  <input type="text" placeholder="Компания" className="bg-transparent border border-white/15 px-4 py-3.5 font-body text-sm text-white placeholder:text-es-platinum/40 focus:outline-none focus:border-es-gold transition-colors" />
                </div>
                <input type="tel" placeholder="Телефон" className="bg-transparent border border-white/15 px-4 py-3.5 font-body text-sm text-white placeholder:text-es-platinum/40 focus:outline-none focus:border-es-gold transition-colors" />
                <input type="email" placeholder="Email" className="bg-transparent border border-white/15 px-4 py-3.5 font-body text-sm text-white placeholder:text-es-platinum/40 focus:outline-none focus:border-es-gold transition-colors" />
                <select className="bg-es-navy border border-white/15 px-4 py-3.5 font-body text-sm text-es-platinum/70 focus:outline-none focus:border-es-gold transition-colors">
                  <option value="">Тип оборудования</option>
                  <option>Передвижная ЭТЛ</option>
                  <option>Трансформатор</option>
                  <option>Кабельная диагностика</option>
                  <option>Комплектное РУ</option>
                </select>
                <textarea placeholder="Описание задачи, объём, сроки" rows={4} className="bg-transparent border border-white/15 px-4 py-3.5 font-body text-sm text-white placeholder:text-es-platinum/40 focus:outline-none focus:border-es-gold transition-colors resize-none" />
                <button className="w-full py-4 bg-es-gold text-es-navy font-body text-xs tracking-[0.25em] uppercase font-medium hover:bg-es-gold-light transition-colors">
                  Отправить заявку
                </button>
                <p className="font-body text-xs text-es-platinum/40 text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section id="news" className="py-24" style={{ background: "#0D1E38" }}>
        <div ref={newsS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`flex items-end justify-between mb-12 transition-all duration-700 ${newsS.inView ? "opacity-100" : "opacity-0"}`}>
            <div>
              <p className="section-label mb-3">Медиа</p>
              <h2 className="font-display text-3xl font-light text-white">Новости и экспертиза</h2>
            </div>
            <button className="font-body text-xs text-es-gold hover:underline hidden md:block">Все материалы →</button>
          </div>
          <div className={`grid md:grid-cols-3 gap-px bg-white/5 transition-all duration-700 ${newsS.inView ? "opacity-100" : "opacity-0"}`}>
            {newsItems.map((n, i) => (
              <div key={i} className="bg-es-navy p-8 group cursor-pointer hover:bg-es-steel transition-colors duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-body text-xs bg-es-gold/15 text-es-gold px-3 py-1 border border-es-gold/20">{n.tag}</span>
                  <span className="font-body text-xs text-es-platinum/50">{n.date}</span>
                </div>
                <h3 className="font-display text-xl font-light text-white mb-3 leading-snug group-hover:text-es-gold transition-colors">{n.title}</h3>
                <p className="font-body text-xs text-es-platinum leading-relaxed mb-6">{n.desc}</p>
                <span className="font-body text-xs text-es-gold opacity-0 group-hover:opacity-100 transition-opacity">Читать →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#060F1E" }}>
        <div className="max-w-7xl mx-auto px-8 pt-16 pb-8">
          <div className="grid md:grid-cols-4 gap-12 mb-14">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 border border-es-gold flex items-center justify-center">
                  <span className="text-es-gold font-display text-sm">E</span>
                </div>
                <span className="font-display text-base font-medium tracking-[0.12em] uppercase text-white">Energoskan</span>
              </div>
              <p className="font-body text-xs text-es-platinum/60 leading-relaxed mb-6">
                Завод-производитель передвижных электролабораторий и испытательного оборудования. С 1999 года.
              </p>
              <div className="flex gap-3">
                {["Youtube", "Send", "Linkedin"].map(s => (
                  <div key={s} className="w-8 h-8 border border-white/15 flex items-center justify-center hover:border-es-gold cursor-pointer transition-colors group">
                    <Icon name={s as "Youtube"} size={13} className="text-es-platinum/60 group-hover:text-es-gold transition-colors" />
                  </div>
                ))}
              </div>
            </div>
            {[
              { title: "Продукция", links: ["Электролаборатории ЭТЛ", "Трансформаторы", "Комплектные РУ", "Кабельные муфты", "Диагностика"] },
              { title: "Компания", links: ["О заводе", "Сертификаты", "Реализованные проекты", "Учебный центр", "Вакансии"] },
              { title: "Контакты", links: ["+7 (495) 000-00-00", "info@energoskan.ru", "Москва, ул. Промышленная, 12", "Пн–Пт 9:00–18:00"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-body text-xs tracking-[0.25em] uppercase text-white/80 mb-5">{col.title}</h4>
                <div className="flex flex-col gap-3">
                  {col.links.map(l => (
                    <span key={l} className="font-body text-xs text-es-platinum/50 hover:text-es-gold cursor-pointer transition-colors">{l}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-es-platinum/30">© 2024 Energoskan. Все права защищены. ИНН 7701234567</p>
            <div className="flex flex-wrap gap-6">
              {["Политика конфиденциальности", "Пользовательское соглашение", "Реквизиты"].map(l => (
                <button key={l} className="font-body text-xs text-es-platinum/30 hover:text-es-gold transition-colors">{l}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
