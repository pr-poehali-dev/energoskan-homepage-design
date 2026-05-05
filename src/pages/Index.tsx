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

// Логотип Energoskan — треугольник + текст
function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <polygon points="18,2 34,34 2,34" fill="#F26522" />
        <polygon points="18,8 30,32 6,32" fill="none" stroke={dark ? "#1B2A47" : "white"} strokeWidth="1.5" opacity="0.3" />
        <line x1="18" y1="14" x2="18" y2="26" stroke={dark ? "#1B2A47" : "white"} strokeWidth="2" opacity="0.6" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className={`font-display text-xl font-bold tracking-[0.08em] uppercase ${dark ? "text-es-navy" : "text-white"}`}>
          ЭНЕРГОСКАН
        </span>
        <span className={`font-body text-[9px] tracking-[0.2em] uppercase ${dark ? "text-es-gray" : "text-white/60"}`}>
          Завод-производитель ЭТЛ
        </span>
      </div>
    </div>
  );
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

const whyUs = ["Собственное производство", "Склад 15 000 м² в Москве", "Гарантия 24 месяца", "Сертификация ISO 9001", "Монтаж под ключ", "Обучение персонала"];
const whyThem = ["Только перепродажа", "Склад только под заказ", "Гарантия 12 месяцев", "Нет сертификатов", "Монтаж субподрядчиком", "Нет учебного центра"];

const stats = [
  { num: "500+", label: "проектов" },
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
    <div className="border-b border-es-gray-pale">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left gap-4 hover:text-es-orange transition-colors">
        <span className="font-body text-sm text-es-dark font-medium">{q}</span>
        <Icon name={open ? "ChevronUp" : "ChevronDown"} size={16} className="text-es-orange shrink-0" />
      </button>
      {open && <p className="font-body text-sm text-es-gray leading-relaxed pb-4">{a}</p>}
    </div>
  );
}

// Декоративный треугольник-акцент
function TriangleAccent({ size = 40, opacity = 0.08 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ opacity }}>
      <polygon points="20,2 38,38 2,38" fill="#F26522" />
    </svg>
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
  const devS = useInView(0.1);
  const clientsS = useInView(0.1);
  const projectsS = useInView(0.1);
  const whyS = useInView(0.1);
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
    <div className="bg-white text-es-dark overflow-x-hidden font-body">

      {/* ── TOP BAR ── */}
      <div className="bg-es-navy hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+74950000000" className="font-body text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1.5">
              <Icon name="Phone" size={11} className="text-es-orange" />
              +7 (495) 000-00-00
            </a>
            <a href="mailto:info@energoskan.ru" className="font-body text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1.5">
              <Icon name="Mail" size={11} className="text-es-orange" />
              info@energoskan.ru
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-body text-xs text-white/40">Пн–Пт 9:00–18:00</span>
            <div className="flex items-center gap-3">
              {["Youtube", "Send"].map(s => (
                <div key={s} className="w-6 h-6 flex items-center justify-center hover:text-es-orange cursor-pointer transition-colors">
                  <Icon name={s as "Youtube"} size={12} className="text-white/40 hover:text-es-orange" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── NAV ── */}
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`} style={{ background: "#1B2A47" }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <button onClick={() => scrollTo("hero")}>
            <Logo />
          </button>

          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="nav-link text-xs">{n.label}</button>
            ))}
          </nav>

          <button onClick={() => scrollTo("contact")} className="hidden lg:flex btn-primary text-xs py-2.5 px-5">
            Запросить КП
          </button>

          <button className="xl:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="xl:hidden border-t border-white/10 px-6 py-5 flex flex-col gap-4" style={{ background: "#1B2A47" }}>
            {navLinks.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="nav-link text-left text-sm">{n.label}</button>
            ))}
            <button onClick={() => scrollTo("contact")} className="mt-2 btn-primary text-xs justify-center">
              Запросить КП
            </button>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-[90vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMGS.hero})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(27,42,71,0.95) 0%, rgba(27,42,71,0.7) 60%, rgba(27,42,71,0.2) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(27,42,71,0.8) 0%, transparent 50%)" }} />

        {/* Декоративные треугольники */}
        <div className="absolute top-20 right-20 hidden lg:block">
          <TriangleAccent size={120} opacity={0.15} />
        </div>
        <div className="absolute top-40 right-60 hidden lg:block">
          <TriangleAccent size={60} opacity={0.1} />
        </div>

        <div ref={heroS.ref} className="relative z-10 max-w-7xl mx-auto px-8 pb-20 pt-32 w-full">
          <div className={`transition-all duration-800 ${heroS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 font-body text-xs text-white/50">
              <span>Главная</span>
              <Icon name="ChevronRight" size={10} className="text-es-orange" />
              <span className="text-white/80">Кабельные лаборатории</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-es-orange" />
              <span className="section-label text-white/70" style={{ color: "#F26522" }}>Завод-производитель ЭТЛ</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-[68px] font-bold text-white mb-5 leading-tight max-w-3xl">
              Кабельные лаборатории<br />
              для испытаний и<br />
              <span className="text-es-orange">диагностики</span>
            </h1>

            <p className="font-body text-base text-white/70 max-w-xl leading-relaxed mb-10">
              Производство и поставка мобильных электротехнических лабораторий.
              Испытательное, сервисное и диагностическое оборудование.
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("contact")} className="btn-primary">
                <Icon name="FileText" size={15} />
                Запросить КП ЭТЛ
              </button>
              <button onClick={() => scrollTo("catalog")} className="btn-outline-white">
                Каталог ЭТЛ
                <Icon name="ArrowRight" size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10" style={{ background: "rgba(15,28,48,0.9)" }}>
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex overflow-x-auto">
              {[
                { n: "500+", l: "проектов" },
                { n: "17", l: "патентов" },
                { n: "60+", l: "регионов" },
                { n: "24", l: "года на рынке" },
                { n: "24/7", l: "сервис" },
              ].map((s, i) => (
                <div key={i} className="flex-1 min-w-[120px] py-4 px-4 flex flex-col items-center border-r border-white/10 last:border-r-0">
                  <span className="font-display text-2xl font-bold text-es-orange">{s.n}</span>
                  <span className="font-body text-xs text-white/50 uppercase tracking-wider mt-0.5">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 bg-white">
        <div ref={aboutS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${aboutS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="orange-line" />
              <p className="section-label mb-3">О компании</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-es-navy mb-6 leading-tight">
                Energoskan — завод-<br />производитель <span className="text-es-orange">ЭТЛ</span>
              </h2>
              <p className="font-body text-sm text-es-gray leading-relaxed mb-4">
                Основан в 1999 году. Производим передвижные электролаборатории, испытательное
                и диагностическое оборудование. Все изделия соответствуют ГОСТ и проходят
                полный цикл испытаний на собственном полигоне.
              </p>
              <p className="font-body text-sm text-es-gray leading-relaxed mb-8">
                В штате более 350 сотрудников, собственное КБ, производственные цеха площадью 8 000 м².
                Сертифицированы по ISO 9001:2015. Дилерская сеть в 60+ регионах России.
              </p>
              <div className="grid grid-cols-4 gap-4 mb-8 pt-6 border-t-2 border-es-gray-pale">
                {[
                  { n: "500+", l: "проектов" },
                  { n: "17", l: "патентов" },
                  { n: "60+", l: "регионов" },
                  { n: "24", l: "года" },
                ].map(s => (
                  <div key={s.n}>
                    <div className="font-display text-2xl font-bold text-es-orange">{s.n}</div>
                    <div className="font-body text-xs text-es-gray mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => scrollTo("contact")} className="btn-primary">Подробнее о нас</button>
                <button onClick={() => scrollTo("projects")} className="btn-outline">Наши проекты</button>
              </div>
            </div>

            <div className="relative">
              <img src={IMGS.factory} alt="Завод Energoskan" className="w-full aspect-[4/3] object-cover" />
              {/* Orange accent border */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-4 border-es-orange pointer-events-none" />
              {/* Status badge */}
              <div className="absolute top-4 left-4 bg-white shadow-lg px-4 py-3">
                <div className="font-body text-xs text-es-gray mb-0.5">Статус производства</div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-body text-sm text-es-dark font-bold">В работе — 3 заказа</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK START ── */}
      <section className="py-16" style={{ background: "#F4F6F8" }}>
        <div ref={startS.ref} className="max-w-7xl mx-auto px-8">
          <h2 className={`font-display text-2xl font-bold text-es-navy mb-10 transition-all duration-700 ${startS.inView ? "opacity-100" : "opacity-0"}`}>
            С чего начать?
          </h2>
          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 ${startS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {[
              { icon: "Zap", title: "Купить готовую ЭТЛ", desc: "Стандартные комплектации со склада от 2 недель", cta: "Смотреть каталог" },
              { icon: "Settings", title: "Сконфигурировать под задачу", desc: "Разработаем ТЗ и соберём лабораторию по вашим параметрам", cta: "Получить КП" },
              { icon: "Wrench", title: "Сервисное обслуживание", desc: "ТО, ремонт и диагностика ЭТЛ любых производителей", cta: "Оставить заявку" },
              { icon: "MousePointerClick", title: "Подбор под объект", desc: "Заполните форму — менеджер перезвонит и подберёт решение", cta: "Начать подбор" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 group hover:shadow-lg transition-all duration-300 cursor-pointer border-t-2 border-transparent hover:border-es-orange">
                <div className="w-10 h-10 bg-es-orange/10 flex items-center justify-center mb-4 group-hover:bg-es-orange transition-colors duration-300">
                  <Icon name={item.icon as "Zap"} size={18} className="text-es-orange group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-base font-bold text-es-navy mb-2 leading-snug">{item.title}</h3>
                <p className="font-body text-xs text-es-gray leading-relaxed mb-4">{item.desc}</p>
                <span className="font-body text-xs text-es-orange font-bold uppercase tracking-wider group-hover:gap-2 flex items-center gap-1 transition-all">
                  {item.cta} <Icon name="ArrowRight" size={12} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATALOG ── */}
      <section id="catalog" className="py-20 bg-white">
        <div ref={catalogS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 transition-all duration-700 ${catalogS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="orange-line" />
              <p className="section-label mb-2">Каталог</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-es-navy">Каталог продукции</h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { k: "all", l: "Все" }, { k: "labs", l: "Лаборатории" },
                { k: "transformers", l: "Трансформаторы" }, { k: "cables", l: "Кабели" }
              ].map(t => (
                <button key={t.k} onClick={() => setActiveTab(t.k)}
                  className={`px-4 py-1.5 font-body text-xs tracking-wider uppercase font-bold border-2 transition-colors ${activeTab === t.k ? "border-es-orange bg-es-orange text-white" : "border-es-gray-pale text-es-gray hover:border-es-orange hover:text-es-orange"}`}>
                  {t.l}
                </button>
              ))}
            </div>
            <button onClick={() => scrollTo("contact")} className="font-body text-sm text-es-orange font-bold hover:underline flex items-center gap-1">
              Весь каталог <Icon name="ArrowRight" size={14} />
            </button>
          </div>

          <div className={`grid md:grid-cols-2 gap-6 transition-all duration-700 ${catalogS.inView ? "opacity-100" : "opacity-0"}`}>
            {catalogItems.map((item, i) => (
              <div key={i} className="group cursor-pointer border border-es-gray-pale hover:border-es-orange transition-all duration-300 overflow-hidden card-hover">
                <div className="overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-body text-xs bg-es-orange text-white px-3 py-1 font-bold uppercase tracking-wider">{item.tag}</span>
                    <span className="font-display text-base font-bold text-es-orange">{item.price}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-es-navy mb-2 group-hover:text-es-orange transition-colors">{item.title}</h3>
                  <p className="font-body text-sm text-es-gray mb-4">{item.desc}</p>
                  <span className="font-body text-xs text-es-orange font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Подробнее <Icon name="ArrowRight" size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LABS ── */}
      <section id="labs" className="py-20" style={{ background: "#1B2A47" }}>
        <div ref={labsS.ref} className="max-w-7xl mx-auto px-8 relative">
          {/* Decorative */}
          <div className="absolute right-8 top-0 opacity-5">
            <TriangleAccent size={200} opacity={1} />
          </div>

          <div className={`text-center mb-14 transition-all duration-700 ${labsS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-0.5 bg-es-orange" />
            </div>
            <p className="section-label mb-4" style={{ color: "#F26522" }}>Лаборатории</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Выберите по типу мобильной<br />электролаборатории
            </h2>
          </div>

          <div className={`grid md:grid-cols-3 gap-px bg-white/5 transition-all duration-700 ${labsS.inView ? "opacity-100" : "opacity-0"}`}>
            {labTypes.map((lab, i) => (
              <div key={i} className="bg-es-navy-dark p-10 group hover:bg-es-orange transition-colors duration-300 cursor-pointer">
                <div className="w-12 h-12 border-2 border-es-orange flex items-center justify-center mb-6 group-hover:border-white group-hover:bg-white/10 transition-colors">
                  <Icon name={lab.icon as "Zap"} size={20} className="text-es-orange group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-4 leading-snug">{lab.title}</h3>
                <p className="font-body text-sm text-white/60 leading-relaxed mb-6 group-hover:text-white/80 transition-colors">{lab.desc}</p>
                <span className="font-body text-xs text-es-orange font-bold uppercase tracking-wider group-hover:text-white transition-colors flex items-center gap-1">
                  Подробнее <Icon name="ArrowRight" size={12} />
                </span>
              </div>
            ))}
          </div>

          <div className={`mt-10 text-center transition-all duration-700 ${labsS.inView ? "opacity-100" : "opacity-0"}`}>
            <p className="font-body text-sm text-white/50 mb-4">Не нашли подходящую конфигурацию?</p>
            <button onClick={() => scrollTo("contact")} className="btn-primary">
              Заказать индивидуальную ЭТЛ
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-es-orange">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            {["25+ лет опыта", "Собственное производство", "Склад в наличии", "Гарантия 24 месяца", "Сервисный центр 24/7"].map((t, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 bg-white/60 rounded-full shrink-0" />
                <span className="font-body text-xs text-white font-bold uppercase tracking-wider">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 bg-white">
        <div ref={devS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${devS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex justify-center mb-4"><div className="w-12 h-0.5 bg-es-orange" /></div>
            <p className="section-label mb-3">Сервисы</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-es-navy">Разработка. Производство. Обучение. Сервис.</h2>
            <p className="font-body text-sm text-es-gray max-w-xl mx-auto mt-4">Полный цикл от технического задания до запуска и обслуживания объекта.</p>
          </div>

          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 ${devS.inView ? "opacity-100" : "opacity-0"}`}>
            {services.map((s, i) => (
              <div key={i} className="p-6 border border-es-gray-pale group hover:border-es-orange hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="w-10 h-10 bg-es-orange/10 flex items-center justify-center mb-4 group-hover:bg-es-orange transition-colors">
                  <Icon name={s.icon as "Truck"} size={18} className="text-es-orange group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-base font-bold text-es-navy mb-2">{s.title}</h3>
                <p className="font-body text-sm text-es-gray leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className={`mt-10 text-center transition-all duration-500 ${devS.inView ? "opacity-100" : "opacity-0"}`}>
            <button onClick={() => scrollTo("contact")} className="btn-primary">
              Рассчитать стоимость
            </button>
          </div>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <section id="clients" className="py-16" style={{ background: "#F4F6F8" }}>
        <div ref={clientsS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`text-center mb-10 transition-all duration-700 ${clientsS.inView ? "opacity-100" : "opacity-0"}`}>
            <p className="font-body text-sm text-es-gray font-bold uppercase tracking-[0.2em]">Нам доверяют ведущие компании России</p>
          </div>
          <div className={`grid grid-cols-4 md:grid-cols-8 gap-px bg-es-gray-pale transition-all duration-700 ${clientsS.inView ? "opacity-100" : "opacity-0"}`}>
            {clients.map((c, i) => (
              <div key={i} className="bg-white py-8 px-4 flex items-center justify-center hover:bg-es-orange transition-colors cursor-pointer group">
                <span className="font-display text-sm font-bold text-es-gray group-hover:text-white transition-colors text-center">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-20 bg-white">
        <div ref={projectsS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`flex items-end justify-between mb-12 transition-all duration-700 ${projectsS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="orange-line" />
              <p className="section-label mb-2">Портфолио</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-es-navy">Реализованные проекты</h2>
            </div>
            <button className="font-body text-sm text-es-orange font-bold hover:underline hidden md:flex items-center gap-1">
              Все проекты <Icon name="ArrowRight" size={14} />
            </button>
          </div>
          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 ${projectsS.inView ? "opacity-100" : "opacity-0"}`}>
            {projects.map((p, i) => (
              <div key={i} className="group cursor-pointer overflow-hidden border border-es-gray-pale hover:border-es-orange transition-colors">
                <div className="overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body text-xs bg-es-orange text-white px-2 py-0.5 font-bold uppercase">{p.tag}</span>
                    <span className="font-body text-xs text-es-gray">{p.year}</span>
                  </div>
                  <h3 className="font-display text-sm font-bold text-es-navy leading-snug group-hover:text-es-orange transition-colors">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="advantages" className="py-20" style={{ background: "#F4F6F8" }}>
        <div ref={whyS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${whyS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex justify-center mb-4"><div className="w-12 h-0.5 bg-es-orange" /></div>
            <p className="section-label mb-3">Конкурентные преимущества</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-es-navy">
              Почему выбирают <span className="text-es-orange">Energoskan</span>
            </h2>
          </div>

          <div className={`grid md:grid-cols-2 gap-4 mb-12 transition-all duration-700 ${whyS.inView ? "opacity-100" : "opacity-0"}`}>
            <div className="bg-white border-t-4 border-es-orange p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-es-gray-pale">
                <Logo dark />
              </div>
              <div className="flex flex-col gap-3">
                {whyUs.map((w, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-es-orange flex items-center justify-center shrink-0">
                      <Icon name="Check" size={12} className="text-white" />
                    </div>
                    <span className="font-body text-sm text-es-dark">{w}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border-t-4 border-es-gray-pale p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-es-gray-pale">
                <span className="font-display text-lg font-bold text-es-gray">Конкуренты</span>
              </div>
              <div className="flex flex-col gap-3">
                {whyThem.map((w, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-es-gray-pale flex items-center justify-center shrink-0">
                      <Icon name="X" size={12} className="text-es-gray" />
                    </div>
                    <span className="font-body text-sm text-es-gray">{w}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 transition-all duration-700 delay-200 ${whyS.inView ? "opacity-100" : "opacity-0"}`}>
            {stats.map((s, i) => (
              <div key={i} className="bg-white text-center py-8 px-4 border-b-4 border-transparent hover:border-es-orange transition-colors">
                <div className="font-display text-4xl font-bold text-es-orange mb-1">{s.num}</div>
                <div className="font-body text-xs text-es-gray uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MATERIALS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="font-display text-2xl font-bold text-es-navy mb-8">Материалы для специалистов</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: "FileText", title: "5 ошибок при выборе электролаборатории", desc: "Разбираем типичные ошибки при закупке и что нужно проверить перед покупкой.", cta: "Читать статью" },
              { icon: "Calculator", title: "10 вопросов при выборе трансформатора ЭТЛ", desc: "Чек-лист для технических специалистов, которые подбирают оборудование для объекта.", cta: "Скачать PDF" },
            ].map((m, i) => (
              <div key={i} className="p-8 border border-es-gray-pale group hover:border-es-orange transition-all cursor-pointer hover:shadow-md">
                <div className="w-10 h-10 bg-es-orange/10 flex items-center justify-center mb-4 group-hover:bg-es-orange transition-colors">
                  <Icon name={m.icon as "FileText"} size={18} className="text-es-orange group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-xl font-bold text-es-navy mb-2 group-hover:text-es-orange transition-colors">{m.title}</h3>
                <p className="font-body text-sm text-es-gray leading-relaxed mb-6">{m.desc}</p>
                <button className="btn-primary text-xs py-2.5 px-5">{m.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVANTAGES BANNER ── */}
      <section className="gradient-brand py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-wrap justify-between items-center gap-8">
            <h3 className="font-display text-2xl font-bold text-white">Преимущества завода</h3>
            <div className="flex flex-wrap gap-10">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-3xl font-bold text-white">{s.num}</div>
                  <div className="font-body text-xs text-white/70 mt-0.5 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section className="py-20 bg-white">
        <div ref={calcS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${calcS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="orange-line" />
              <p className="section-label mb-3">Калькулятор</p>
              <h2 className="font-display text-3xl font-bold text-es-navy mb-4">
                Калькулятор стоимости <span className="text-es-orange">ЭТЛ</span>
              </h2>
              <p className="font-body text-sm text-es-gray leading-relaxed">
                Укажите основные параметры — получите предварительный расчёт стоимости
                мобильной электролаборатории. Точная стоимость — в коммерческом предложении.
              </p>
            </div>
            <div className="border-2 border-es-gray-pale p-8">
              <div className="flex flex-col gap-5">
                <div>
                  <label className="font-body text-xs text-es-gray uppercase tracking-wider mb-2 block font-bold">
                    Мощность трансформатора: <span className="text-es-orange">{calcKva} кВА</span>
                  </label>
                  <input type="range" min={25} max={2500} step={25} value={calcKva}
                    onChange={e => setCalcKva(+e.target.value)}
                    className="w-full accent-[#F26522] cursor-pointer" />
                  <div className="flex justify-between font-body text-xs text-es-gray mt-1">
                    <span>25 кВА</span><span>2500 кВА</span>
                  </div>
                </div>
                <div>
                  <label className="font-body text-xs text-es-gray uppercase tracking-wider mb-2 block font-bold">Класс напряжения</label>
                  <div className="flex gap-3">
                    {["6", "10", "35"].map(v => (
                      <button key={v} onClick={() => setCalcVoltage(v)}
                        className={`flex-1 py-2.5 font-body text-sm font-bold border-2 transition-colors ${calcVoltage === v ? "border-es-orange bg-es-orange text-white" : "border-es-gray-pale text-es-gray hover:border-es-orange"}`}>
                        {v} кВ
                      </button>
                    ))}
                  </div>
                </div>
                <div className="border-t-2 border-es-gray-pale pt-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-body text-sm text-es-gray font-bold">Ориентировочная стоимость:</span>
                    <span className="font-display text-2xl font-bold text-es-orange">от {calcPrice.toLocaleString("ru")} ₽</span>
                  </div>
                  <button onClick={() => scrollTo("contact")} className="btn-primary w-full justify-center">
                    Получить точный расчёт
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20" style={{ background: "#F4F6F8" }}>
        <div ref={faqS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`grid lg:grid-cols-2 gap-16 transition-all duration-700 ${faqS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="orange-line" />
              <p className="section-label mb-3">FAQ</p>
              <h2 className="font-display text-3xl font-bold text-es-navy mb-5">
                Часто задаваемые<br /><span className="text-es-orange">вопросы</span>
              </h2>
              <p className="font-body text-sm text-es-gray leading-relaxed mb-8">
                Не нашли ответ? Напишите нам — ответим в течение одного рабочего дня.
              </p>
              <button onClick={() => scrollTo("contact")} className="btn-outline">
                Задать вопрос
              </button>
            </div>
            <div className="bg-white p-8">
              {faqItems.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="contact" className="py-20" style={{ background: "#1B2A47" }}>
        <div ref={formS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`grid lg:grid-cols-2 gap-16 items-start transition-all duration-700 ${formS.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="w-12 h-0.5 bg-es-orange mb-4" />
              <p className="section-label mb-4" style={{ color: "#F26522" }}>Контакты</p>
              <h2 className="font-display text-4xl font-bold text-white mb-3">
                Подберём решение<br />
                <span className="text-es-orange">под вашу задачу</span>
              </h2>
              <div className="w-16 h-1 bg-es-orange mb-8" />
              <p className="font-body text-sm text-white/70 leading-relaxed mb-10">
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
                    <div className="w-9 h-9 bg-es-orange flex items-center justify-center shrink-0">
                      <Icon name={c.icon as "Phone"} size={14} className="text-white" />
                    </div>
                    <div>
                      <div className="font-body text-sm text-white font-bold">{c.label}</div>
                      <div className="font-body text-xs text-white/50 mt-0.5">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-10">
              <h3 className="font-display text-2xl font-bold text-es-navy mb-6">Запрос коммерческого предложения</h3>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Имя" className="border-2 border-es-gray-pale px-4 py-3 font-body text-sm text-es-dark placeholder:text-es-gray-light focus:outline-none focus:border-es-orange transition-colors" />
                  <input type="text" placeholder="Компания" className="border-2 border-es-gray-pale px-4 py-3 font-body text-sm text-es-dark placeholder:text-es-gray-light focus:outline-none focus:border-es-orange transition-colors" />
                </div>
                <input type="tel" placeholder="Телефон" className="border-2 border-es-gray-pale px-4 py-3 font-body text-sm text-es-dark placeholder:text-es-gray-light focus:outline-none focus:border-es-orange transition-colors" />
                <input type="email" placeholder="Email" className="border-2 border-es-gray-pale px-4 py-3 font-body text-sm text-es-dark placeholder:text-es-gray-light focus:outline-none focus:border-es-orange transition-colors" />
                <select className="border-2 border-es-gray-pale px-4 py-3 font-body text-sm text-es-gray focus:outline-none focus:border-es-orange transition-colors bg-white">
                  <option value="">Тип оборудования</option>
                  <option>Передвижная ЭТЛ</option>
                  <option>Трансформатор</option>
                  <option>Кабельная диагностика</option>
                  <option>Комплектное РУ</option>
                </select>
                <textarea placeholder="Описание задачи, объём, сроки" rows={4} className="border-2 border-es-gray-pale px-4 py-3 font-body text-sm text-es-dark placeholder:text-es-gray-light focus:outline-none focus:border-es-orange transition-colors resize-none" />
                <button className="btn-primary w-full justify-center text-sm py-4">
                  <Icon name="Send" size={16} />
                  Отправить заявку
                </button>
                <p className="font-body text-xs text-es-gray text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section id="news" className="py-20 bg-white">
        <div ref={newsS.ref} className="max-w-7xl mx-auto px-8">
          <div className={`flex items-end justify-between mb-12 transition-all duration-700 ${newsS.inView ? "opacity-100" : "opacity-0"}`}>
            <div>
              <div className="orange-line" />
              <p className="section-label mb-2">Медиа</p>
              <h2 className="font-display text-3xl font-bold text-es-navy">Новости и экспертиза</h2>
            </div>
            <button className="font-body text-sm text-es-orange font-bold hover:underline hidden md:flex items-center gap-1">
              Все материалы <Icon name="ArrowRight" size={14} />
            </button>
          </div>
          <div className={`grid md:grid-cols-3 gap-4 transition-all duration-700 ${newsS.inView ? "opacity-100" : "opacity-0"}`}>
            {newsItems.map((n, i) => (
              <div key={i} className="group cursor-pointer border border-es-gray-pale hover:border-es-orange transition-all hover:shadow-md">
                <div className="h-1.5 bg-es-gray-pale group-hover:bg-es-orange transition-colors" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-body text-xs bg-es-orange text-white px-3 py-1 font-bold uppercase">{n.tag}</span>
                    <span className="font-body text-xs text-es-gray">{n.date}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-es-navy mb-3 leading-snug group-hover:text-es-orange transition-colors">{n.title}</h3>
                  <p className="font-body text-sm text-es-gray leading-relaxed mb-5">{n.desc}</p>
                  <span className="font-body text-xs text-es-orange font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Читать <Icon name="ArrowRight" size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0F1C30" }}>
        <div className="max-w-7xl mx-auto px-8 pt-14 pb-8">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="mb-5">
                <Logo />
              </div>
              <p className="font-body text-xs text-white/50 leading-relaxed mb-6">
                Завод-производитель передвижных электролабораторий и испытательного оборудования. С 1999 года.
              </p>
              <div className="flex gap-3">
                {["Youtube", "Send", "Linkedin"].map(s => (
                  <div key={s} className="w-8 h-8 bg-white/10 flex items-center justify-center hover:bg-es-orange cursor-pointer transition-colors group">
                    <Icon name={s as "Youtube"} size={13} className="text-white/60 group-hover:text-white transition-colors" />
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
                <h4 className="font-body text-xs tracking-[0.2em] uppercase text-white font-bold mb-5">{col.title}</h4>
                <div className="flex flex-col gap-3">
                  {col.links.map(l => (
                    <span key={l} className="font-body text-xs text-white/40 hover:text-es-orange cursor-pointer transition-colors">{l}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom orange line */}
          <div className="h-0.5 bg-es-orange mb-6" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-white/30">© 2024 Energoskan. Все права защищены. ИНН 7701234567</p>
            <div className="flex flex-wrap gap-6">
              {["Политика конфиденциальности", "Пользовательское соглашение", "Реквизиты"].map(l => (
                <button key={l} className="font-body text-xs text-white/30 hover:text-es-orange transition-colors">{l}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
