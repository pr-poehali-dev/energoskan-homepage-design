import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMGS = {
  hero:      "https://cdn.poehali.dev/projects/f9c83306-3577-4f43-82e1-9b715bb1c588/files/685e0212-9962-4726-877d-03be62daf1da.jpg",
  factory:   "https://cdn.poehali.dev/projects/f9c83306-3577-4f43-82e1-9b715bb1c588/files/119ca768-9ab3-4a79-a2d8-954313325343.jpg",
  lab:       "https://cdn.poehali.dev/projects/f9c83306-3577-4f43-82e1-9b715bb1c588/files/70f084bf-1a46-49b7-8003-4ea01839c33f.jpg",
  truck:     "https://cdn.poehali.dev/projects/f9c83306-3577-4f43-82e1-9b715bb1c588/files/c85339e6-175f-4ac5-af0b-9ef667c5863b.jpg",
  equipment: "https://cdn.poehali.dev/projects/f9c83306-3577-4f43-82e1-9b715bb1c588/files/6d8d7178-798e-474f-b270-e9e574868538.jpg",
};

/* ── useInView ── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── SVG decorative components ── */
function DiagLines({ className = "" }: { className?: string }) {
  return (
    <svg className={`absolute pointer-events-none ${className}`} width="200" height="200" viewBox="0 0 200 200" fill="none">
      {[0,20,40,60,80,100,120].map(i => (
        <line key={i} x1={i} y1="0" x2={i + 100} y2="200" stroke="#0ABFBF" strokeWidth="0.5" opacity="0.15"/>
      ))}
    </svg>
  );
}

function EnergyLines({ dark = false }: { dark?: boolean }) {
  const c = dark ? "rgba(10,191,191,0.5)" : "rgba(10,191,191,0.3)";
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
      <line x1="0" y1="30%" x2="100%" y2="10%" stroke={c} strokeWidth="0.5"/>
      <line x1="0" y1="60%" x2="100%" y2="40%" stroke={c} strokeWidth="0.5"/>
      <line x1="0" y1="90%" x2="100%" y2="70%" stroke={c} strokeWidth="0.5"/>
      <line x1="20%" y1="0" x2="80%" y2="100%" stroke={c} strokeWidth="0.5" opacity="0.5"/>
    </svg>
  );
}

function GridOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage: `linear-gradient(rgba(10,191,191,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(10,191,191,0.04) 1px,transparent 1px)`,
      backgroundSize: '48px 48px'
    }} />
  );
}

function TealCorner({ pos = "tl" }: { pos?: "tl"|"br"|"tr"|"bl" }) {
  const styles: Record<string, string> = {
    tl: "top-0 left-0 border-t-2 border-l-2",
    br: "bottom-0 right-0 border-b-2 border-r-2",
    tr: "top-0 right-0 border-t-2 border-r-2",
    bl: "bottom-0 left-0 border-b-2 border-l-2",
  };
  return <div className={`absolute w-8 h-8 border-en-teal pointer-events-none ${styles[pos]}`} />;
}

/* ── Logo ── */
function Logo({ dark = false }: { dark?: boolean }) {
  const textColor = dark ? "#1A2535" : "#FFFFFF";
  const subColor  = dark ? "#6B7A8D" : "rgba(255,255,255,0.5)";
  return (
    <div className="flex items-center gap-3">
      <svg width="38" height="38" viewBox="0 0 38 38">
        <polygon points="19,3 35,35 3,35" fill="#0ABFBF"/>
        <polygon points="19,11 29,33 9,33" fill="none" stroke="#F26522" strokeWidth="1.5"/>
        <circle cx="19" cy="22" r="2.5" fill="#F26522"/>
      </svg>
      <div className="leading-none">
        <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:800, fontSize:'17px', letterSpacing:'0.06em', color: textColor, textTransform:'uppercase' }}>
          ЭНЕРГОСКАН
        </div>
        <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:500, fontSize:'9px', letterSpacing:'0.22em', color: subColor, textTransform:'uppercase', marginTop:'2px' }}>
          Завод · ЭТЛ · Оборудование
        </div>
      </div>
    </div>
  );
}

/* ── Data ── */
const navLinks = [
  { label: "О заводе", id: "about" },
  { label: "Продукция", id: "catalog" },
  { label: "Лаборатории", id: "labs" },
  { label: "Проекты", id: "projects" },
  { label: "Сервисы", id: "services" },
  { label: "Новости", id: "news" },
  { label: "Контакты", id: "contact" },
];

const catalogItems = [
  { img: IMGS.equipment, tag: "Трансформаторы",    price: "от 180 000 ₽", title: "Передвижные электролаборатории — подстанции", desc: "Мощность до 630 кВА, готовность от 2 недель" },
  { img: IMGS.lab,       tag: "Распредустройства", price: "от 240 000 ₽", title: "Комплектные трансформаторные устройства",      desc: "Напряжение 6–35 кВ, степень защиты IP54" },
  { img: IMGS.truck,     tag: "Лаборатории",        price: "от 3 500 000 ₽", title: "Передвижные монтажные установки на КамАЗ",  desc: "Работа при -40°C, аттестованы Росаккредитацией" },
  { img: IMGS.factory,   tag: "Кабельные муфты",    price: "от 12 000 ₽", title: "Концевые муфты для кабелей 6–110 кВ",         desc: "Наружная и внутренняя установка, ГОСТ" },
];

const labTypes = [
  { icon: "Zap",      title: "Испытание на частоте промышленной сети",        desc: "Испытания кабелей, трансформаторов и высоковольтных аппаратов напряжением до 100 кВ" },
  { icon: "Activity", title: "Испытание и диагностика систем трансформаторов", desc: "Полный цикл проверки: масло, обмотки, изоляция, хроматография" },
  { icon: "Search",   title: "Кабельная диагностика с локализацией",          desc: "Выявление мест повреждений методами рефлектометрии и акустики" },
];

const services = [
  { icon: "Truck",      title: "Поставка оборудования", desc: "12 000+ позиций со склада и под заказ" },
  { icon: "Wrench",     title: "Монтаж и наладка",      desc: "Монтаж под ключ силами собственных бригад" },
  { icon: "Headphones", title: "Сервис 24/7",           desc: "Выезд инженера за 4 часа по договору" },
  { icon: "BookOpen",   title: "Обучение персонала",    desc: "Учебный центр, лицензия Минобрнауки" },
  { icon: "FileText",   title: "Проектирование",        desc: "Рабочая документация любой сложности" },
  { icon: "Award",      title: "Сертификация",          desc: "Помощь в получении разрешительных документов" },
];

const whyUs   = ["Собственное производство", "Склад 15 000 м² в Москве", "Гарантия 24 месяца", "Сертификация ISO 9001", "Монтаж под ключ", "Учебный центр"];
const whyThem = ["Только перепродажа", "Склад только под заказ", "Гарантия 12 месяцев", "Нет сертификатов", "Монтаж субподрядчиком", "Нет обучения"];

const stats = [
  { num:"500+", label:"проектов" },
  { num:"60+",  label:"регионов" },
  { num:"20+",  label:"лет опыта" },
  { num:"85%",  label:"повторных клиентов" },
  { num:"24",   label:"мес. гарантия" },
];

const clients = ["Россети","Газпром","Лукойл","РЖД","Росатом","Татнефть","Роснефть","ФСК ЕЭС"];

const projects = [
  { img: IMGS.truck,     title: "Передвижная ЭТЛ для Россети Центр",             tag: "Лаборатории",   year: "2024" },
  { img: IMGS.equipment, title: "Комплект КТП 630 кВА для нефтяного месторождения", tag: "Трансформаторы", year: "2023" },
  { img: IMGS.factory,   title: "Силовые кабели для строительства АЭС",           tag: "Кабели",        year: "2023" },
  { img: IMGS.lab,       title: "Система диагностики для распред. сетей",         tag: "Диагностика",   year: "2024" },
];

const faqItems = [
  { q: "Каков минимальный объём заказа?",                    a: "Минимальный заказ не ограничен — работаем с единичными поставками и серийными заказами. Для корпоративных клиентов — индивидуальные условия." },
  { q: "Какой срок изготовления оборудования?",              a: "Стандартные позиции — 3–5 рабочих дней со склада. Нестандартное оборудование — 30–90 дней." },
  { q: "Есть ли у вас сервисное обслуживание?",              a: "Да, сервисный центр 24/7. Договоры ТО на 1–3 года с фиксированной стоимостью выездов." },
  { q: "Какие документы предоставляются с оборудованием?",   a: "Паспорта, сертификаты ГОСТ, декларации, протоколы испытаний, инструкции по эксплуатации." },
  { q: "Работаете ли вы с госзакупками?",                    a: "Да. Участвуем в тендерах по 44-ФЗ и 223-ФЗ. Предоставим полный пакет документации." },
];

const newsItems = [
  { date:"28 апреля 2026", tag:"Новинки",  title:"Новая линейка ПЭЛ-110",                        desc:"Обновлённая серия мобильных электролабораторий с расширенными функциями диагностики." },
  { date:"15 апреля 2026", tag:"Проекты",  title:"Поставка 40 комплектов КТП для Россети",       desc:"В рамках модернизации сетей отгружены трансформаторные подстанции 630 кВА." },
  { date:"02 апреля 2026", tag:"Обучение", title:"Новый набор в учебный центр",                  desc:"Курсы повышения квалификации для электротехнического персонала 2–5 группы." },
];

/* ── FAQ item ── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-en-light-3 transition-colors ${open ? "border-en-teal/30" : ""}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4 group">
        <span className={`font-body text-[15px] font-semibold transition-colors ${open ? "text-en-teal" : "text-en-text group-hover:text-en-teal"}`}>{q}</span>
        <div className={`w-7 h-7 flex items-center justify-center border-2 shrink-0 transition-all ${open ? "border-en-teal bg-en-teal" : "border-en-light-3 group-hover:border-en-teal"}`}>
          <Icon name={open ? "Minus" : "Plus"} size={13} className={open ? "text-white" : "text-en-text-3 group-hover:text-en-teal"} />
        </div>
      </button>
      {open && <p className="font-body text-sm text-en-text-2 leading-relaxed pb-5 pr-12">{a}</p>}
    </div>
  );
}

/* ── MAIN ── */
const Index = () => {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [calcKva, setCalcKva]     = useState(630);
  const [calcV, setCalcV]         = useState("10");
  const [activeTab, setActiveTab] = useState("all");

  const refs = {
    hero:     useInView(0.05),
    about:    useInView(0.1),
    start:    useInView(0.1),
    catalog:  useInView(0.1),
    labs:     useInView(0.1),
    dev:      useInView(0.1),
    clients:  useInView(0.1),
    projects: useInView(0.1),
    why:      useInView(0.1),
    mats:     useInView(0.1),
    calc:     useInView(0.1),
    faq:      useInView(0.1),
    form:     useInView(0.1),
    news:     useInView(0.1),
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); };
  const calcPrice = Math.round(calcKva * 320 + (calcV === "35" ? 180000 : 0));

  const fadeIn = (inView: boolean, delay = 0) => ({
    style: { transitionDelay: `${delay}ms` },
    className: `transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`
  });

  return (
    <div className="bg-en-light text-en-text overflow-x-hidden font-body">

      {/* ════════════════════════════════════
          TOP BAR
      ════════════════════════════════════ */}
      <div className="bg-en-dark hidden lg:block">
        <div className="max-w-7xl mx-auto px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {[
              { icon:"Phone", text:"+7 (495) 000-00-00" },
              { icon:"Mail",  text:"info@energoskan.ru" },
            ].map(c => (
              <span key={c.text} className="flex items-center gap-2 font-body text-xs text-white/50 hover:text-en-teal cursor-pointer transition-colors">
                <Icon name={c.icon as "Phone"} size={11} className="text-en-teal" />
                {c.text}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <span className="font-body text-[11px] text-white/30 tracking-widest uppercase">Пн–Пт · 9:00–18:00</span>
            <div className="w-px h-4 bg-white/10" />
            {["Youtube","Send"].map(s => (
              <div key={s} className="w-6 h-6 flex items-center justify-center cursor-pointer group">
                <Icon name={s as "Youtube"} size={12} className="text-white/30 group-hover:text-en-teal transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          NAV
      ════════════════════════════════════ */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-[0_2px_30px_rgba(0,0,0,0.3)]" : ""}`}
        style={{ background: scrolled ? "#0E1620" : "#131D2B" }}>
        {/* Бирюзовая линия сверху */}
        <div className="h-0.5 bg-gradient-to-r from-en-teal via-en-teal to-transparent opacity-80" />
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between gap-6">
          <button onClick={() => go("hero")}><Logo /></button>

          <nav className="hidden xl:flex items-center gap-8">
            {navLinks.map(n => (
              <button key={n.id} onClick={() => go(n.id)} className="nav-lnk">{n.label}</button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+74950000000" className="font-body text-sm text-white/60 hover:text-en-teal transition-colors font-semibold">
              +7 (495) 000-00-00
            </a>
            <button onClick={() => go("contact")} className="btn-teal text-xs py-2.5 px-5">
              Запрос КП
            </button>
          </div>

          <button className="xl:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="xl:hidden border-t border-white/8 px-8 py-6 flex flex-col gap-5" style={{ background:"#0E1620" }}>
            {navLinks.map(n => (
              <button key={n.id} onClick={() => go(n.id)} className="nav-lnk text-left text-sm">{n.label}</button>
            ))}
            <button onClick={() => go("contact")} className="btn-teal justify-center mt-2">Запрос КП</button>
          </div>
        )}
      </header>

      {/* ════════════════════════════════════
          HERO — тёмный, мощный
      ════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-end overflow-hidden" style={{ background: "#0E1620" }}>
        {/* Фото с эффектом depth */}
        <div className="absolute inset-0">
          <img src={IMGS.hero} alt="" className="w-full h-full object-cover object-center" style={{ opacity:0.25, filter:"saturate(0.6)" }} />
        </div>

        {/* Тёмный градиент */}
        <div className="absolute inset-0 bg-gradient-to-r from-en-dark via-en-dark/90 to-en-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-en-dark via-transparent to-transparent" />

        {/* Инженерная сетка */}
        <GridOverlay />

        {/* Диагональные линии энергии */}
        <EnergyLines dark />

        {/* Бирюзовое свечение справа */}
        <div className="absolute right-0 top-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background:"radial-gradient(circle, rgba(10,191,191,0.08) 0%, transparent 70%)" }} />

        {/* Декоративные диагональные полосы */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 overflow-hidden hidden lg:block">
          <DiagLines className="opacity-100 right-0 top-0" />
        </div>

        {/* Вертикальная линия-акцент */}
        <div className="absolute left-[calc(50%-1px)] top-0 h-full w-px bg-gradient-to-b from-transparent via-en-teal/20 to-transparent hidden xl:block" />

        <div ref={refs.hero.ref} className="relative z-10 max-w-7xl mx-auto px-8 pb-28 pt-36 w-full">
          <div className={`transition-all duration-1000 ${refs.hero.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 font-body text-xs text-white/30 tracking-wider">
              <span>Главная</span>
              <span className="text-en-teal">/</span>
              <span className="text-white/60">Кабельные лаборатории ЭТЛ</span>
            </div>

            {/* Верхний тег */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-0.5 bg-en-teal" />
              <span className="font-body text-[11px] font-bold tracking-[0.35em] uppercase text-en-teal">Завод-производитель ЭТЛ</span>
            </div>

            {/* Заголовок — Bebas size */}
            <h1 style={{ fontFamily:"'Manrope',sans-serif", fontWeight:800, lineHeight:1.0 }}
              className="text-5xl md:text-6xl lg:text-[72px] text-white mb-6 max-w-3xl">
              Кабельные<br />
              лаборатории для<br />
              испытаний&nbsp;и&nbsp;
              <span style={{ color:"#0ABFBF" }}>диагностики</span>
            </h1>

            {/* Горизонтальный акцент */}
            <div className="flex items-center gap-4 mb-7">
              <div className="h-0.5 w-20 bg-gradient-to-r from-en-teal to-en-orange" />
              <div className="h-0.5 w-8 bg-en-orange/50" />
            </div>

            <p className="font-body text-[15px] text-white/60 max-w-lg leading-relaxed mb-10 font-normal">
              Производство и поставка мобильных электротехнических лабораторий.
              Испытательное, сервисное и диагностическое оборудование.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <button onClick={() => go("contact")} className="btn-teal">
                <Icon name="FileText" size={15} />
                Запросить КП ЭТЛ
              </button>
              <button onClick={() => go("catalog")} className="btn-outline-white">
                Каталог ЭТЛ
                <Icon name="ArrowRight" size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Нижняя статистика — диагональная плашка */}
        <div className="absolute bottom-0 left-0 right-0 z-10"
          style={{ background:"rgba(10,191,191,0.07)", backdropFilter:"blur(8px)", borderTop:"1px solid rgba(10,191,191,0.15)" }}>
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex overflow-x-auto">
              {[
                { n:"500+", l:"проектов" },
                { n:"17",   l:"патентов" },
                { n:"60+",  l:"регионов" },
                { n:"24",   l:"года на рынке" },
                { n:"24/7", l:"сервис" },
              ].map((s, i) => (
                <div key={i} className="flex-1 min-w-[110px] py-5 flex flex-col items-center border-r border-white/8 last:border-none">
                  <span className="font-body text-xl font-bold text-en-teal">{s.n}</span>
                  <span className="font-body text-[10px] text-white/40 uppercase tracking-widest mt-0.5">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          ABOUT — светлый, 2 колонки
      ════════════════════════════════════ */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <DiagLines className="top-0 right-0 opacity-50" />

        <div ref={refs.about.ref} className="max-w-7xl mx-auto px-8">
          <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${refs.about.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

            {/* Текст */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-en-teal" />
                <span className="section-tag">О компании</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-en-dark mb-1 leading-tight">
                Energoskan — завод-производитель
              </h2>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color:"#0ABFBF" }}>
                электротехнических лабораторий
              </h2>
              <p className="font-body text-[15px] text-en-text-2 leading-relaxed mb-4">
                Основан в 1999 году. Производим передвижные электролаборатории, испытательное
                и диагностическое оборудование. Все изделия соответствуют ГОСТ.
              </p>
              <p className="font-body text-[15px] text-en-text-2 leading-relaxed mb-8">
                350+ сотрудников, собственное КБ, производственные цеха 8 000 м².
                ISO 9001:2015. Дилерская сеть в 60+ регионах.
              </p>

              {/* Мини-статы */}
              <div className="grid grid-cols-4 gap-5 mb-8 py-6 border-y-2 border-en-light-3">
                {[{n:"500+",l:"проектов"},{n:"17",l:"патентов"},{n:"60+",l:"регионов"},{n:"24",l:"года"}].map(s => (
                  <div key={s.n}>
                    <div className="font-body text-2xl font-bold text-en-teal">{s.n}</div>
                    <div className="font-body text-xs text-en-text-3 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => go("contact")} className="btn-teal">Подробнее</button>
                <button onClick={() => go("projects")} className="btn-outline-teal">Наши проекты</button>
              </div>
            </div>

            {/* Фото с угловыми акцентами */}
            <div className="relative">
              {/* Большой декоративный квадрат позади */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-en-teal/20 pointer-events-none" />
              <div className="relative overflow-hidden">
                <img src={IMGS.factory} alt="Завод Energoskan" className="w-full aspect-[4/3] object-cover" />
                {/* Оранжевая диагональная полоса поверх */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-en-teal via-en-orange to-transparent" />
              </div>
              <TealCorner pos="tl" />
              <TealCorner pos="br" />
              {/* Статус-бейдж */}
              <div className="absolute top-5 left-5 bg-en-dark/90 border border-en-teal/30 px-4 py-3 backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-en-teal animate-pulse" />
                  <div>
                    <div className="font-body text-[10px] text-white/40 uppercase tracking-wider">Производство</div>
                    <div className="font-body text-sm text-white font-bold">В работе · 3 заказа</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          С ЧЕГО НАЧАТЬ — светло-серый
      ════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ background:"#F5F7FA" }}>
        <div className="absolute inset-0 diag-bg" />
        <div ref={refs.start.ref} className="relative max-w-7xl mx-auto px-8">
          <div className={`mb-10 transition-all duration-700 ${refs.start.inView ? "opacity-100" : "opacity-0"}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-en-dark">С чего начать?</h2>
            <div className="w-16 h-0.5 bg-en-teal mt-3" />
          </div>
          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 ${refs.start.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {[
              { icon:"Zap",              num:"01", title:"Купить готовую ЭТЛ",      desc:"Стандартные комплектации со склада от 2 недель", cta:"Смотреть каталог" },
              { icon:"Settings",         num:"02", title:"Сконфигурировать",         desc:"Разработаем ТЗ и соберём под ваши параметры",    cta:"Получить КП" },
              { icon:"Wrench",           num:"03", title:"Сервисное ТО",             desc:"ТО, ремонт и диагностика ЭТЛ любых марок",      cta:"Оставить заявку" },
              { icon:"MousePointerClick",num:"04", title:"Подбор под объект",        desc:"Менеджер перезвонит и подберёт решение",         cta:"Начать подбор" },
            ].map((item, i) => (
              <div key={i} className="bg-white relative group cursor-pointer overflow-hidden" style={{ border:"1px solid #E3E8EE", transition:"all .3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="#0ABFBF"; (e.currentTarget as HTMLElement).style.boxShadow="0 8px 30px rgba(10,191,191,0.12)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="#E3E8EE"; (e.currentTarget as HTMLElement).style.boxShadow="none"; }}>
                {/* Оранжевая полоска сверху при hover */}
                <div className="h-0.5 bg-en-teal w-0 group-hover:w-full transition-all duration-500" />
                <div className="p-7">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 flex items-center justify-center" style={{ background:"rgba(10,191,191,0.1)" }}>
                      <Icon name={item.icon as "Zap"} size={20} className="text-en-teal" />
                    </div>
                    <span className="font-body text-4xl font-bold text-en-light-3">{item.num}</span>
                  </div>
                  <h3 className="font-body text-base font-bold text-en-dark mb-2">{item.title}</h3>
                  <p className="font-body text-xs text-en-text-3 leading-relaxed mb-5">{item.desc}</p>
                  <div className="flex items-center gap-1.5 font-body text-xs font-bold text-en-teal uppercase tracking-wider">
                    {item.cta} <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          КАТАЛОГ — белый
      ════════════════════════════════════ */}
      <section id="catalog" className="py-24 bg-white relative overflow-hidden">
        <div ref={refs.catalog.ref} className="max-w-7xl mx-auto px-8">
          <div className={`flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 transition-all duration-700 ${refs.catalog.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-en-teal" />
                <span className="section-tag">Каталог</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-en-dark">Каталог продукции</h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {[{k:"all",l:"Все"},{k:"labs",l:"Лаборатории"},{k:"tr",l:"Трансформаторы"},{k:"cables",l:"Кабели"}].map(t => (
                <button key={t.k} onClick={() => setActiveTab(t.k)}
                  className={`px-4 py-1.5 font-body text-[11px] font-bold tracking-wider uppercase border-2 transition-all ${activeTab===t.k ? "border-en-teal bg-en-teal text-white" : "border-en-light-3 text-en-text-3 hover:border-en-teal hover:text-en-teal"}`}>
                  {t.l}
                </button>
              ))}
            </div>
            <button onClick={() => go("contact")} className="flex items-center gap-1.5 font-body text-sm font-bold text-en-teal hover:underline">
              Весь каталог <Icon name="ArrowRight" size={14} />
            </button>
          </div>

          <div className={`grid md:grid-cols-2 gap-6 transition-all duration-700 ${refs.catalog.inView ? "opacity-100" : "opacity-0"}`}>
            {catalogItems.map((item, i) => (
              <div key={i} className="group cursor-pointer relative overflow-hidden bg-white"
                style={{ border:"1px solid #E3E8EE", transition:"all .3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="#0ABFBF"; (e.currentTarget as HTMLElement).style.boxShadow="0 8px 40px rgba(10,191,191,0.12)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="#E3E8EE"; (e.currentTarget as HTMLElement).style.boxShadow="none"; }}>
                <div className="overflow-hidden relative">
                  <img src={item.img} alt={item.title} className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-700" />
                  {/* Тег поверх фото */}
                  <div className="absolute top-4 left-4 bg-en-teal px-3 py-1.5">
                    <span className="font-body text-[10px] font-bold text-white uppercase tracking-[0.2em]">{item.tag}</span>
                  </div>
                  {/* Диагональный оверлей на hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-en-teal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-body text-sm font-bold text-en-teal">{item.price}</span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity font-body text-xs text-en-teal font-bold uppercase tracking-wider">
                      Подробнее <Icon name="ArrowRight" size={12} />
                    </div>
                  </div>
                  <h3 className="font-body text-[17px] font-bold text-en-dark mb-1 leading-snug group-hover:text-en-teal transition-colors">{item.title}</h3>
                  <p className="font-body text-sm text-en-text-3">{item.desc}</p>
                </div>
                {/* Угловые акценты */}
                <TealCorner pos="br" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          ЛАБОРАТОРИИ — тёмный
      ════════════════════════════════════ */}
      <section id="labs" className="py-24 relative overflow-hidden" style={{ background:"#131D2B" }}>
        <EnergyLines dark />
        <GridOverlay />
        {/* Бирюзовое свечение */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background:"radial-gradient(circle, rgba(10,191,191,0.06) 0%, transparent 70%)" }} />

        <div ref={refs.labs.ref} className="relative z-10 max-w-7xl mx-auto px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${refs.labs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-en-teal/40" />
              <span className="font-body text-[11px] font-bold tracking-[0.35em] uppercase text-en-teal">Лаборатории</span>
              <div className="w-12 h-0.5 bg-en-teal/40" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Выберите тип мобильной<br />
              <span style={{ color:"#0ABFBF" }}>электролаборатории</span>
            </h2>
          </div>

          <div className={`grid md:grid-cols-3 gap-px transition-all duration-700 ${refs.labs.inView ? "opacity-100" : "opacity-0"}`}
            style={{ background:"rgba(255,255,255,0.04)" }}>
            {labTypes.map((lab, i) => (
              <div key={i} className="relative p-10 group cursor-pointer transition-all duration-300 overflow-hidden"
                style={{ background:"#0E1620" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="#0ABFBF"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="#0E1620"; }}>
                {/* Диагональная линия-акцент */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none">
                  <div className="absolute top-2 right-2 w-12 h-0.5 bg-en-teal/30 rotate-45 group-hover:bg-white/30 transition-colors" />
                </div>
                <div className="w-14 h-14 flex items-center justify-center mb-6 border-2 border-en-teal/40 group-hover:border-white/50 transition-colors">
                  <Icon name={lab.icon as "Zap"} size={22} className="text-en-teal group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-body text-[18px] font-bold text-white mb-4 leading-snug">{lab.title}</h3>
                <p className="font-body text-sm leading-relaxed mb-6 text-white/50 group-hover:text-white/80 transition-colors">{lab.desc}</p>
                <div className="flex items-center gap-2 font-body text-xs font-bold text-en-teal group-hover:text-white transition-colors uppercase tracking-wider">
                  Подробнее <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-10 text-center transition-all duration-700 ${refs.labs.inView ? "opacity-100" : "opacity-0"}`}>
            <p className="font-body text-sm text-white/40 mb-4">Не нашли подходящую конфигурацию?</p>
            <button onClick={() => go("contact")} className="btn-outline-white">
              Заказать индивидуальную ЭТЛ
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          ОРАНЖЕВАЯ ПОЛОСА — быстрые тезисы
      ════════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ background:"#F26522" }}>
        <div className="absolute inset-0" style={{ backgroundImage:"repeating-linear-gradient(-55deg,transparent 0,transparent 14px,rgba(255,255,255,0.05) 14px,rgba(255,255,255,0.05) 15px)" }} />
        <div className="relative max-w-7xl mx-auto px-8 py-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            {["25+ лет опыта","Собственное производство","Склад в наличии","Гарантия 24 месяца","Сервис 24/7"].map((t,i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-1 h-1 bg-white/60 rounded-full" />
                <span className="font-body text-[11px] text-white font-bold uppercase tracking-[0.2em]">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          СЕРВИСЫ — светло-серый + диагонали
      ════════════════════════════════════ */}
      <section id="services" className="py-24 relative overflow-hidden" style={{ background:"#F5F7FA" }}>
        <div className="absolute inset-0 diag-bg" />
        <div ref={refs.dev.ref} className="relative max-w-7xl mx-auto px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${refs.dev.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-en-teal" />
              <span className="section-tag">Сервисы</span>
              <div className="w-8 h-0.5 bg-en-teal" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-en-dark">Разработка. Производство.<br />Обучение. Сервис.</h2>
            <p className="font-body text-[15px] text-en-text-3 max-w-xl mx-auto mt-4">Полный цикл от технического задания до пусконаладки и обслуживания объекта.</p>
          </div>

          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 ${refs.dev.inView ? "opacity-100" : "opacity-0"}`}>
            {services.map((s, i) => (
              <div key={i} className="bg-white p-7 group cursor-pointer relative overflow-hidden"
                style={{ border:"1px solid #E3E8EE", transition:"all .3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="#0ABFBF"; (e.currentTarget as HTMLElement).style.boxShadow="0 6px 30px rgba(10,191,191,0.1)"; (e.currentTarget as HTMLElement).style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="#E3E8EE"; (e.currentTarget as HTMLElement).style.boxShadow="none"; (e.currentTarget as HTMLElement).style.transform=""; }}>
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-en-teal group-hover:w-full transition-all duration-500" />
                <div className="w-11 h-11 flex items-center justify-center mb-5 transition-colors" style={{ background:"rgba(10,191,191,0.08)" }}>
                  <Icon name={s.icon as "Truck"} size={19} className="text-en-teal" />
                </div>
                <h3 className="font-body text-[15px] font-bold text-en-dark mb-2">{s.title}</h3>
                <p className="font-body text-sm text-en-text-3 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className={`mt-10 text-center transition-all duration-500 ${refs.dev.inView ? "opacity-100" : "opacity-0"}`}>
            <button onClick={() => go("contact")} className="btn-teal">Рассчитать стоимость</button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          КЛИЕНТЫ — белый
      ════════════════════════════════════ */}
      <section id="clients" className="py-20 bg-white">
        <div ref={refs.clients.ref} className="max-w-7xl mx-auto px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${refs.clients.inView ? "opacity-100" : "opacity-0"}`}>
            <p className="font-body text-[11px] font-bold tracking-[0.3em] uppercase text-en-text-3">Нам доверяют ведущие компании России</p>
            <div className="w-16 h-0.5 bg-en-teal mx-auto mt-3" />
          </div>
          <div className={`grid grid-cols-4 md:grid-cols-8 transition-all duration-700 ${refs.clients.inView ? "opacity-100" : "opacity-0"}`}
            style={{ border:"1px solid #E3E8EE" }}>
            {clients.map((c, i) => (
              <div key={i} className="flex items-center justify-center py-8 px-4 group cursor-pointer transition-all duration-300 hover:bg-en-teal"
                style={{ borderRight: i < 7 ? "1px solid #E3E8EE" : "none" }}>
                <span className="font-body text-sm font-bold text-en-text-3 group-hover:text-white transition-colors text-center">{c}</span>
              </div>
            ))}
          </div>

          {/* Иконки сервисов */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-12">
            {[
              { icon:"Truck",    label:"Доставка" },
              { icon:"Tool",     label:"Монтаж" },
              { icon:"Wifi",     label:"Онлайн-поддержка" },
              { icon:"BookOpen", label:"Обучение" },
              { icon:"FileCheck",label:"Документация" },
              { icon:"RefreshCw",label:"Trade-in" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-3 py-6 px-4 group cursor-pointer transition-all duration-200"
                style={{ border:"1px solid #E3E8EE" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="#0ABFBF"; (e.currentTarget as HTMLElement).style.background="rgba(10,191,191,0.04)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="#E3E8EE"; (e.currentTarget as HTMLElement).style.background=""; }}>
                <Icon name={s.icon as "Truck"} size={22} className="text-en-teal" />
                <span className="font-body text-xs font-semibold text-en-text-3 text-center group-hover:text-en-teal transition-colors">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          ПРОЕКТЫ — тёмный
      ════════════════════════════════════ */}
      <section id="projects" className="py-24 relative overflow-hidden" style={{ background:"#0E1620" }}>
        <GridOverlay />
        <div ref={refs.projects.ref} className="relative z-10 max-w-7xl mx-auto px-8">
          <div className={`flex items-end justify-between mb-12 transition-all duration-700 ${refs.projects.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-en-teal" />
                <span className="font-body text-[11px] font-bold tracking-[0.35em] uppercase text-en-teal">Портфолио</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Реализованные проекты</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 font-body text-sm font-bold text-en-teal hover:underline">
              Все проекты <Icon name="ArrowRight" size={14} />
            </button>
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-px transition-all duration-700 ${refs.projects.inView ? "opacity-100" : "opacity-0"}`}
            style={{ background:"rgba(255,255,255,0.04)" }}>
            {projects.map((p, i) => (
              <div key={i} className="relative group cursor-pointer overflow-hidden" style={{ background:"#131D2B" }}>
                <div className="overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-90" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-en-dark via-en-dark/30 to-transparent" />
                {/* Тег */}
                <div className="absolute top-4 left-4 bg-en-teal px-2.5 py-1">
                  <span className="font-body text-[9px] font-bold text-white uppercase tracking-[0.2em]">{p.tag}</span>
                </div>
                {/* Год */}
                <div className="absolute top-4 right-4">
                  <span className="font-body text-xs text-white/40">{p.year}</span>
                </div>
                {/* Заголовок */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="w-0 h-0.5 bg-en-teal group-hover:w-full transition-all duration-500 mb-3" />
                  <h3 className="font-body text-sm font-bold text-white leading-snug">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          ПОЧЕМУ МЫ — светлый
      ════════════════════════════════════ */}
      <section id="advantages" className="py-24 bg-white relative overflow-hidden">
        <DiagLines className="top-0 left-0 opacity-30" />
        <div ref={refs.why.ref} className="relative max-w-7xl mx-auto px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${refs.why.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-en-teal" />
              <span className="section-tag">Конкурентные преимущества</span>
              <div className="w-8 h-0.5 bg-en-teal" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-en-dark">
              Почему выбирают <span style={{ color:"#0ABFBF" }}>Energoskan</span>
            </h2>
          </div>

          <div className={`grid md:grid-cols-2 gap-6 mb-14 transition-all duration-700 ${refs.why.inView ? "opacity-100" : "opacity-0"}`}>
            {/* Energoskan */}
            <div className="relative overflow-hidden" style={{ border:"2px solid #0ABFBF" }}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-en-teal to-en-orange" />
              <div className="p-8">
                <div className="mb-6 pb-4" style={{ borderBottom:"1px solid #E3E8EE" }}>
                  <Logo dark />
                </div>
                <div className="flex flex-col gap-4">
                  {whyUs.map((w, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center shrink-0" style={{ background:"#0ABFBF" }}>
                        <Icon name="Check" size={13} className="text-white" />
                      </div>
                      <span className="font-body text-[15px] font-semibold text-en-dark">{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Конкуренты */}
            <div className="relative overflow-hidden" style={{ border:"1px solid #E3E8EE", background:"#F5F7FA" }}>
              <div className="p-8">
                <div className="mb-6 pb-4" style={{ borderBottom:"1px solid #E3E8EE" }}>
                  <span className="font-body text-base font-bold text-en-text-3 uppercase tracking-wider">Конкуренты</span>
                </div>
                <div className="flex flex-col gap-4">
                  {whyThem.map((w, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center shrink-0" style={{ background:"#E3E8EE" }}>
                        <Icon name="X" size={13} className="text-en-text-3" />
                      </div>
                      <span className="font-body text-[15px] text-en-text-3">{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Большие цифры */}
          <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 transition-all duration-700 delay-200 ${refs.why.inView ? "opacity-100" : "opacity-0"}`}>
            {stats.map((s, i) => (
              <div key={i} className="relative text-center py-8 group cursor-pointer overflow-hidden"
                style={{ border:"1px solid #E3E8EE", transition:"all .3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="#0ABFBF"; (e.currentTarget as HTMLElement).style.background="rgba(10,191,191,0.04)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="#E3E8EE"; (e.currentTarget as HTMLElement).style.background=""; }}>
                <div className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-0.5 bg-en-teal transition-all duration-300" />
                <div className="font-body text-4xl font-bold text-en-teal mb-1">{s.num}</div>
                <div className="font-body text-[11px] text-en-text-3 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          МАТЕРИАЛЫ — тёмно-синий
      ════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ background:"#131D2B" }}>
        <EnergyLines dark />
        <div ref={refs.mats.ref} className="relative z-10 max-w-7xl mx-auto px-8">
          <div className={`mb-10 transition-all duration-700 ${refs.mats.inView ? "opacity-100" : "opacity-0"}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Материалы для специалистов</h2>
            <div className="w-16 h-0.5 bg-en-teal mt-3" />
          </div>
          <div className={`grid md:grid-cols-2 gap-px transition-all duration-700 ${refs.mats.inView ? "opacity-100" : "opacity-0"}`}
            style={{ background:"rgba(255,255,255,0.04)" }}>
            {[
              { icon:"FileText",   title:"5 ошибок при выборе электролаборатории",    desc:"Разбираем типичные ошибки при закупке и что проверить перед покупкой.",             cta:"Читать статью" },
              { icon:"Calculator", title:"10 вопросов при выборе трансформатора ЭТЛ", desc:"Чек-лист для технических специалистов при подборе оборудования для объекта.", cta:"Скачать PDF" },
            ].map((m, i) => (
              <div key={i} className="p-10 group cursor-pointer transition-all duration-300 relative overflow-hidden"
                style={{ background:"#0E1620" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="#0ABFBF"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="#0E1620"; }}>
                <div className="w-12 h-12 flex items-center justify-center mb-6 border-2 border-en-teal/40 group-hover:border-white/50 transition-colors">
                  <Icon name={m.icon as "FileText"} size={20} className="text-en-teal group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-body text-xl font-bold text-white mb-3 leading-snug">{m.title}</h3>
                <p className="font-body text-sm text-white/50 group-hover:text-white/80 leading-relaxed mb-8 transition-colors">{m.desc}</p>
                <button className="px-6 py-2.5 font-body text-xs font-bold uppercase tracking-wider border-2 border-white/30 text-white group-hover:border-white group-hover:bg-white group-hover:text-en-teal transition-all">
                  {m.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          БИРЮЗОВЫЙ БАННЕР ЦИФР
      ════════════════════════════════════ */}
      <section className="relative overflow-hidden py-14" style={{ background:"#0ABFBF" }}>
        <div className="absolute inset-0" style={{ backgroundImage:"repeating-linear-gradient(-55deg,transparent 0,transparent 18px,rgba(255,255,255,0.06) 18px,rgba(255,255,255,0.06) 19px)" }} />
        <div className="relative max-w-7xl mx-auto px-8">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <h3 className="font-body text-2xl font-bold text-white">Преимущества завода</h3>
            <div className="flex flex-wrap gap-10">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-body text-3xl font-bold text-white">{s.num}</div>
                  <div className="font-body text-[10px] text-white/70 uppercase tracking-widest mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          КАЛЬКУЛЯТОР — светлый
      ════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <DiagLines className="right-0 bottom-0 opacity-40" />
        <div ref={refs.calc.ref} className="relative max-w-7xl mx-auto px-8">
          <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${refs.calc.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-en-teal" />
                <span className="section-tag">Калькулятор</span>
              </div>
              <h2 className="text-3xl font-bold text-en-dark mb-4">
                Калькулятор стоимости<br />
                <span style={{ color:"#0ABFBF" }}>ЭТЛ</span>
              </h2>
              <p className="font-body text-[15px] text-en-text-2 leading-relaxed">
                Укажите основные параметры — получите предварительный расчёт стоимости
                мобильной электролаборатории.
              </p>
            </div>
            <div className="relative" style={{ border:"2px solid #E3E8EE" }}>
              <TealCorner pos="tl" />
              <TealCorner pos="br" />
              <div className="p-8 flex flex-col gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-body text-xs font-bold text-en-text-3 uppercase tracking-wider">Мощность трансформатора</label>
                    <span className="font-body text-base font-bold text-en-teal">{calcKva} кВА</span>
                  </div>
                  <input type="range" min={25} max={2500} step={25} value={calcKva}
                    onChange={e => setCalcKva(+e.target.value)}
                    className="w-full cursor-pointer" style={{ accentColor:"#0ABFBF" }} />
                  <div className="flex justify-between font-body text-[11px] text-en-text-3 mt-1">
                    <span>25 кВА</span><span>2500 кВА</span>
                  </div>
                </div>
                <div>
                  <label className="font-body text-xs font-bold text-en-text-3 uppercase tracking-wider mb-2 block">Класс напряжения</label>
                  <div className="flex gap-3">
                    {["6","10","35"].map(v => (
                      <button key={v} onClick={() => setCalcV(v)}
                        className={`flex-1 py-3 font-body text-sm font-bold border-2 transition-all ${calcV===v ? "border-en-teal bg-en-teal text-white" : "border-en-light-3 text-en-text-3 hover:border-en-teal"}`}>
                        {v} кВ
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pt-4" style={{ borderTop:"2px solid #F5F7FA" }}>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-body text-sm font-semibold text-en-text-2">Ориентировочно:</span>
                    <span className="font-body text-2xl font-bold text-en-teal">от {calcPrice.toLocaleString("ru")} ₽</span>
                  </div>
                  <button onClick={() => go("contact")} className="btn-teal w-full justify-center">
                    Получить точный расчёт
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FAQ — светло-серый
      ════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background:"#F5F7FA" }}>
        <div className="absolute inset-0 diag-bg" />
        <div ref={refs.faq.ref} className="relative max-w-7xl mx-auto px-8">
          <div className={`grid lg:grid-cols-2 gap-16 transition-all duration-700 ${refs.faq.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-en-teal" />
                <span className="section-tag">FAQ</span>
              </div>
              <h2 className="text-3xl font-bold text-en-dark mb-5">
                Часто задаваемые<br />
                <span style={{ color:"#0ABFBF" }}>вопросы</span>
              </h2>
              <p className="font-body text-[15px] text-en-text-2 leading-relaxed mb-8">
                Не нашли ответ? Напишите нам — ответим в рабочий день.
              </p>
              <button onClick={() => go("contact")} className="btn-outline-teal">Задать вопрос</button>
            </div>
            <div className="bg-white p-8" style={{ border:"1px solid #E3E8EE" }}>
              {faqItems.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          ФОРМА — тёмный
      ════════════════════════════════════ */}
      <section id="contact" className="py-24 relative overflow-hidden" style={{ background:"#0E1620" }}>
        <EnergyLines dark />
        <GridOverlay />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none hidden lg:block">
          <DiagLines className="opacity-100" />
        </div>

        <div ref={refs.form.ref} className="relative z-10 max-w-7xl mx-auto px-8">
          <div className={`grid lg:grid-cols-2 gap-16 items-start transition-all duration-700 ${refs.form.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-en-teal" />
                <span className="font-body text-[11px] font-bold tracking-[0.35em] uppercase text-en-teal">Контакты</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-3">
                Подберём решение<br />
                <span style={{ color:"#0ABFBF" }}>под вашу задачу</span>
              </h2>
              <div className="w-20 h-1 mb-8" style={{ background:"linear-gradient(to right, #0ABFBF, #F26522)" }} />
              <p className="font-body text-[15px] text-white/60 leading-relaxed mb-10">
                Заполните форму — менеджер перезвонит в течение 30 минут в рабочее время.
              </p>
              <div className="flex flex-col gap-5">
                {[
                  { icon:"Phone",  label:"+7 (495) 000-00-00",          sub:"Многоканальный" },
                  { icon:"Mail",   label:"info@energoskan.ru",           sub:"Электронная почта" },
                  { icon:"MapPin", label:"Москва, ул. Промышленная, 12", sub:"Главный офис" },
                  { icon:"Clock",  label:"Пн–Пт 9:00–18:00",            sub:"Часы работы" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background:"rgba(10,191,191,0.12)", border:"1px solid rgba(10,191,191,0.3)" }}>
                      <Icon name={c.icon as "Phone"} size={14} className="text-en-teal" />
                    </div>
                    <div>
                      <div className="font-body text-[15px] font-bold text-white">{c.label}</div>
                      <div className="font-body text-xs text-white/40 mt-0.5">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Форма на белом фоне */}
            <div className="bg-white p-10 relative">
              <TealCorner pos="tr" />
              <TealCorner pos="bl" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-en-teal to-en-orange" />
              <h3 className="font-body text-xl font-bold text-en-dark mb-6">Запрос коммерческого предложения</h3>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  {["Имя","Компания"].map(p => (
                    <input key={p} type="text" placeholder={p}
                      className="px-4 py-3 font-body text-sm text-en-dark placeholder:text-en-text-3 focus:outline-none transition-colors"
                      style={{ border:"2px solid #E3E8EE" }}
                      onFocus={e => (e.target.style.borderColor="#0ABFBF")}
                      onBlur={e => (e.target.style.borderColor="#E3E8EE")} />
                  ))}
                </div>
                {[{p:"Телефон",t:"tel"},{p:"Email",t:"email"}].map(f => (
                  <input key={f.p} type={f.t} placeholder={f.p}
                    className="px-4 py-3 font-body text-sm text-en-dark placeholder:text-en-text-3 focus:outline-none transition-colors"
                    style={{ border:"2px solid #E3E8EE" }}
                    onFocus={e => (e.target.style.borderColor="#0ABFBF")}
                    onBlur={e => (e.target.style.borderColor="#E3E8EE")} />
                ))}
                <select className="px-4 py-3 font-body text-sm text-en-text-3 focus:outline-none transition-colors bg-white"
                  style={{ border:"2px solid #E3E8EE" }}
                  onFocus={e => (e.target.style.borderColor="#0ABFBF")}
                  onBlur={e => (e.target.style.borderColor="#E3E8EE")}>
                  <option value="">Тип оборудования</option>
                  <option>Передвижная ЭТЛ</option>
                  <option>Трансформатор</option>
                  <option>Кабельная диагностика</option>
                  <option>Комплектное РУ</option>
                </select>
                <textarea placeholder="Описание задачи, объём, сроки" rows={4}
                  className="px-4 py-3 font-body text-sm text-en-dark placeholder:text-en-text-3 focus:outline-none transition-colors resize-none"
                  style={{ border:"2px solid #E3E8EE" }}
                  onFocus={e => (e.target.style.borderColor="#0ABFBF")}
                  onBlur={e => (e.target.style.borderColor="#E3E8EE")} />
                <button className="btn-teal w-full justify-center py-4 text-sm">
                  <Icon name="Send" size={16} />
                  Отправить заявку
                </button>
                <p className="font-body text-[11px] text-en-text-3 text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          НОВОСТИ — белый
      ════════════════════════════════════ */}
      <section id="news" className="py-24 bg-white relative overflow-hidden">
        <div ref={refs.news.ref} className="max-w-7xl mx-auto px-8">
          <div className={`flex items-end justify-between mb-12 transition-all duration-700 ${refs.news.inView ? "opacity-100" : "opacity-0"}`}>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-en-teal" />
                <span className="section-tag">Медиа</span>
              </div>
              <h2 className="text-3xl font-bold text-en-dark">Новости и экспертиза</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 font-body text-sm font-bold text-en-teal hover:underline">
              Все материалы <Icon name="ArrowRight" size={14} />
            </button>
          </div>
          <div className={`grid md:grid-cols-3 gap-6 transition-all duration-700 ${refs.news.inView ? "opacity-100" : "opacity-0"}`}>
            {newsItems.map((n, i) => (
              <div key={i} className="group cursor-pointer relative overflow-hidden"
                style={{ border:"1px solid #E3E8EE", transition:"all .3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="#0ABFBF"; (e.currentTarget as HTMLElement).style.boxShadow="0 8px 30px rgba(10,191,191,0.1)"; (e.currentTarget as HTMLElement).style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="#E3E8EE"; (e.currentTarget as HTMLElement).style.boxShadow="none"; (e.currentTarget as HTMLElement).style.transform=""; }}>
                <div className="w-full h-1 bg-en-light-3 group-hover:bg-en-teal transition-colors duration-300" />
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-body text-[9px] font-bold uppercase tracking-[0.25em] px-3 py-1.5 text-white" style={{ background:"#0ABFBF" }}>{n.tag}</span>
                    <span className="font-body text-xs text-en-text-3">{n.date}</span>
                  </div>
                  <h3 className="font-body text-[17px] font-bold text-en-dark mb-3 leading-snug group-hover:text-en-teal transition-colors">{n.title}</h3>
                  <p className="font-body text-sm text-en-text-3 leading-relaxed mb-6">{n.desc}</p>
                  <div className="flex items-center gap-1.5 font-body text-xs font-bold text-en-teal uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Читать <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FOOTER — тёмный
      ════════════════════════════════════ */}
      <footer style={{ background:"#0A1018" }}>
        {/* Бирюзовая линия сверху */}
        <div className="h-0.5 bg-gradient-to-r from-en-teal via-en-teal/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-8 pt-14 pb-8">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="mb-5"><Logo /></div>
              <p className="font-body text-xs text-white/40 leading-relaxed mb-6">
                Завод-производитель передвижных электролабораторий<br />и испытательного оборудования. С 1999 года.
              </p>
              <div className="flex gap-2.5">
                {["Youtube","Send","Linkedin"].map(s => (
                  <div key={s} className="w-8 h-8 flex items-center justify-center cursor-pointer transition-all group"
                    style={{ border:"1px solid rgba(255,255,255,0.1)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="#0ABFBF"; (e.currentTarget as HTMLElement).style.background="rgba(10,191,191,0.1)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.background=""; }}>
                    <Icon name={s as "Youtube"} size={13} className="text-white/40 group-hover:text-en-teal transition-colors" />
                  </div>
                ))}
              </div>
            </div>
            {[
              { title:"Продукция", links:["Электролаборатории ЭТЛ","Трансформаторы","Комплектные РУ","Кабельные муфты","Диагностика"] },
              { title:"Компания",  links:["О заводе","Сертификаты","Реализованные проекты","Учебный центр","Вакансии"] },
              { title:"Контакты",  links:["+7 (495) 000-00-00","info@energoskan.ru","Москва, ул. Промышленная, 12","Пн–Пт 9:00–18:00"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-white/60 mb-5">{col.title}</h4>
                <div className="flex flex-col gap-3">
                  {col.links.map(l => (
                    <span key={l} className="font-body text-xs text-white/35 hover:text-en-teal cursor-pointer transition-colors">{l}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderTop:"1px solid rgba(255,255,255,0.06)" }}>
            <p className="font-body text-[11px] text-white/25">© 2024 Energoskan. Все права защищены. ИНН 7701234567</p>
            <div className="flex flex-wrap gap-5">
              {["Политика конфиденциальности","Пользовательское соглашение","Реквизиты"].map(l => (
                <button key={l} className="font-body text-[11px] text-white/25 hover:text-en-teal transition-colors">{l}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;