import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Atom,
  Brain,
  Dna,
  Globe2,
  Microscope,
  Mountain,
  Rocket,
  Sparkles,
  Waves,
  Sun,
  Activity,
  Zap,
  Heart,
  FlaskConical,
  Linkedin,
  Youtube,
  Instagram,
  ArrowUpRight,
} from "lucide-react";
import logo from "@/assets/ninapharm-logo.png";
import heroBio from "@/assets/hero-bio.jpg";
import envMountain from "@/assets/env-mountain.jpg";
import envOcean from "@/assets/env-ocean.jpg";
import envDesert from "@/assets/env-desert.jpg";
import envSpace from "@/assets/env-space.jpg";
import techMito from "@/assets/tech-mito.jpg";
import techMicrobiome from "@/assets/tech-microbiome.jpg";
import techAi from "@/assets/tech-ai.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Ninapharm — Live to 100 Years with Energy" },
      { name: "description", content: "Pioneering human longevity through microbiome and mitochondrial science. Founded 1993 in Annecy, France." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          name: "Ninapharm",
          alternateName: "Nutraceutical Innovations Nano Active",
          foundingDate: "1993",
          foundingLocation: "Annecy, France",
          description: "Pioneering human longevity through microbiome and mitochondrial science.",
          medicalSpecialty: ["Longevity", "Microbiome", "Mitochondrial Medicine"],
        }),
      },
    ],
  }),
});

/* ---------- helpers ---------- */
function useCounter(target: number, duration = 2000, start = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      setV(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return v;
}

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative w-full px-6 md:px-10 lg:px-16 py-24 md:py-32 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-cyan-bio font-mono">
      <span className="h-px w-8 bg-cyan-bio" />
      {children}
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<"EN" | "FR" | "JP">("EN");
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}>
      <div className={`max-w-7xl mx-auto px-6 md:px-10 transition-all duration-500 ${scrolled ? "glass rounded-2xl" : ""}`}>
        <div className="flex items-center justify-between h-14">
          <a href="#top" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center p-1">
              <img src={logo} alt="Ninapharm" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-base font-semibold tracking-tight">NINAPHARM</span>
              <span className="text-[10px] tracking-[0.25em] text-muted-foreground font-mono">EST. 1993</span>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            {["Genesis", "Technology", "Science", "Environments", "Impact", "News"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-foreground/70 hover:text-cyan-bio transition-colors">
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex glass rounded-full p-1 text-xs font-mono">
              {(["EN", "FR", "JP"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-full transition ${lang === l ? "bg-cyan-bio text-deep" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-cyan-bio text-deep hover:bg-cyan-bio/90 transition"
            >
              Partner with us <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setInView(true), 200);
    return () => clearTimeout(t);
  }, []);
  const yrs = useCounter(32, 1800, inView);
  const labs = useCounter(7, 1400, inView);
  const patents = useCounter(48, 2200, inView);

  return (
    <div ref={ref} id="top" className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <img src={heroBio} alt="" className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-deep/60 via-deep/70 to-deep" />
        <div className="absolute inset-0 grid-bg opacity-50" />
      </motion.div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-cyan-bio/20 blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-bio-green/20 blur-[120px] animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-40 pb-20 min-h-screen flex flex-col justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Eyebrow>Born in the Alps · Built for Humanity</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 text-5xl md:text-7xl lg:text-8xl font-display font-light tracking-tighter leading-[0.95] max-w-5xl"
        >
          Live to <span className="text-gradient-bio font-medium">100 Years</span><br />
          with Energy.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-foreground/70 font-light leading-relaxed"
        >
          Advanced longevity technologies powered by microbiome science, mitochondrial innovation
          and AI-driven research — engineered to enhance human resilience and healthy aging.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#science"
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-cyan-bio text-deep font-medium hover:glow-cyan transition-all"
          >
            Explore Our Science
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#technology"
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-full hairline glass text-foreground hover:border-cyan-bio/40 transition-all"
          >
            Discover Longevity Technologies
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/30 hairline rounded-2xl overflow-hidden glass"
        >
          {[
            { v: `${yrs}+`, l: "Years of Research", s: "1993 → Today" },
            { v: `${labs}`, l: "Global Labs", s: "France · China · Japan" },
            { v: `${patents}`, l: "Patents Filed", s: "Microbiome · Mitochondria" },
            { v: "100", l: "Year Vision", s: "For every human" },
          ].map((s) => (
            <div key={s.l} className="bg-deep/40 p-6 md:p-8">
              <div className="text-3xl md:text-5xl font-display font-light text-gradient-bio">{s.v}</div>
              <div className="mt-2 text-sm font-medium">{s.l}</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">{s.s}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom ticker */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs font-mono text-muted-foreground">
        <span className="h-2 w-2 rounded-full bg-bio-green animate-pulse" />
        ANNECY · FRANCE · 45.8992° N
      </div>
    </div>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <Section id="genesis">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <Eyebrow>Genesis · 1993</Eyebrow>
          <h2 className="mt-6 text-4xl md:text-6xl font-display font-light leading-tight">
            Founded between <span className="text-gradient-bio">Mont Blanc</span> and the world's purest lake.
          </h2>
          <p className="mt-8 text-foreground/70 leading-relaxed">
            Ninapharm Laboratory was born in 1993 in Annecy — surrounded by Evian spring water,
            alpine peaks and one of Europe's most pioneering deep-tech corridors. From the start,
            our DNA fused <em className="text-cyan-bio not-italic">nutraceutical innovation</em> with
            <em className="text-bio-green not-italic"> nanotechnology</em>.
          </p>
          <p className="mt-4 text-foreground/70 leading-relaxed">
            Forged in extreme alpine conditions, partnered with Mont Blanc guides and Swiss longevity
            clinics, we translate nature's force to evolve and adapt into technologies that help
            humans live longer, healthier, more energetic lives.
          </p>
          <blockquote className="mt-10 pl-6 border-l-2 border-cyan-bio/60 italic text-foreground/80">
            "Ninapharm est une société d'excellence, d'exigence et de relation humaine."
            <footer className="not-italic mt-3 text-xs font-mono text-muted-foreground uppercase tracking-widest">
              Jean-Luc Rigaut · Mayor of Annecy, World Champion
            </footer>
          </blockquote>
        </div>

        <div className="lg:col-span-7 relative">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden hairline">
            <img src={envMountain} alt="Alpine research dome" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="text-xs font-mono tracking-widest text-cyan-bio">RESEARCH STATION · 4,810M</div>
              <div className="mt-2 font-display text-2xl">Born to Rise</div>
              <div className="text-sm text-foreground/60 mt-1">Formulated for alpinists. Empowering pioneers.</div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-5 max-w-xs hidden md:block">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-bio-green/20 flex items-center justify-center">
                <Mountain className="h-5 w-5 text-bio-green" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-mono">ZERO-ERROR MINDSET</div>
                <div className="text-sm font-medium">Partnered with Mont Blanc guides</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Technology ---------- */
const TECH = [
  { icon: Microscope, title: "Microbiome Platform", img: techMicrobiome, desc: "Advanced microbiome modulation technologies — including our Darwin platform — that evolve strains under extreme conditions to support health resilience and longevity.", tag: "DARWIN PLATFORM" },
  { icon: Zap, title: "Mitochondria Energy", img: techMito, desc: "Innovative cellular energy solutions targeting mitochondrial performance, mitophagy and ATP production for sustained vitality across the lifespan.", tag: "OXY-288 · OXYLIA" },
  { icon: Brain, title: "AI & Epigenetics", img: techAi, desc: "GLOTRAI — our AI discovery engine — decodes epigenetic regulation and accelerates the next generation of microbiome-targeted longevity formulations.", tag: "GLOTRAI" },
  { icon: Rocket, title: "Extreme Environments", img: envSpace, desc: "Insights from alpine, ocean, desert and space biology — biological adaptation studies that inspire breakthrough longevity science on Earth and beyond.", tag: "ASTROBIOME" },
];

function Technology() {
  return (
    <Section id="technology" className="bg-gradient-to-b from-transparent via-midnight/40 to-transparent">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
        <div>
          <Eyebrow>Technology Ecosystem</Eyebrow>
          <h2 className="mt-6 text-4xl md:text-6xl font-display font-light max-w-3xl leading-tight">
            Science inspired by nature.<br />
            <span className="text-gradient-bio">Enhanced by innovation.</span>
          </h2>
        </div>
        <p className="max-w-md text-foreground/70 leading-relaxed">
          Four converging platforms that translate prototypes into scalable solutions —
          better, faster, more sustainable health for humanity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {TECH.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-3xl hairline bg-card/40 hover:bg-card/60 transition-all"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={t.img} alt={t.title} className="h-full w-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-[10px] font-mono tracking-widest">
                {t.tag}
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-cyan-bio/10 border border-cyan-bio/30 flex items-center justify-center shrink-0">
                  <t.icon className="h-5 w-5 text-cyan-bio" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-medium">{t.title}</h3>
                  <p className="mt-3 text-foreground/65 text-sm leading-relaxed">{t.desc}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center text-sm text-cyan-bio font-medium group/link">
                Learn more <ArrowRight className="h-3.5 w-3.5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Science Pillars ---------- */
const PILLARS = [
  { icon: Dna, title: "Microbiota–Mitochondria Axis", text: "Unlocking the conversation between gut microbes and cellular powerhouses." },
  { icon: Zap, title: "Cellular Energy Systems", text: "Boosting ATP production for sustained vitality across the lifespan." },
  { icon: Atom, title: "Epigenetic Regulation", text: "Modulating gene expression through environmental and microbial signals." },
  { icon: Heart, title: "Healthy Aging Pathways", text: "Pathway-specific interventions inspired by centenarian biology." },
  { icon: Activity, title: "Stress Resilience", text: "Cortisol control and recovery formulas validated on Mont Blanc guides." },
  { icon: Sparkles, title: "Human Performance", text: "Optimizing endurance, recovery and cognition for pioneers." },
];

function Science() {
  return (
    <Section id="science">
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>Longevity Science</Eyebrow>
        <h2 className="mt-6 text-4xl md:text-6xl font-display font-light leading-tight">
          The future of <span className="text-gradient-bio">human longevity</span>.
        </h2>
        <p className="mt-6 text-foreground/70">
          By studying centenarians we demonstrated that the longest-lived humans share
          controlled inflammation, low stress and highly active mitochondria. Our Reversed 100
          project decodes the metabolites behind their perfect homeostasis.
        </p>
      </div>

      <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30 hairline rounded-3xl overflow-hidden">
        {PILLARS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="bg-deep/50 p-8 group hover:bg-card/60 transition-colors"
          >
            <p.icon className="h-7 w-7 text-cyan-bio group-hover:text-bio-green transition-colors" />
            <h3 className="mt-6 text-xl font-display font-medium">{p.title}</h3>
            <p className="mt-3 text-sm text-foreground/65 leading-relaxed">{p.text}</p>
            <div className="mt-6 text-xs font-mono text-muted-foreground tracking-widest">
              0{i + 1} / 06
            </div>
          </motion.div>
        ))}
      </div>

      {/* Centenarian inflammation chart */}
      <div className="mt-20 rounded-3xl hairline glass p-8 md:p-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Eyebrow>Reversed 100 Project</Eyebrow>
            <h3 className="mt-4 text-2xl md:text-3xl font-display font-light">Inflammation across the lifespan</h3>
          </div>
          <div className="text-xs font-mono text-muted-foreground">CHRONIC INFLAMMATORY INDEX</div>
        </div>
        <div className="mt-10 grid grid-cols-5 gap-4 items-end h-48">
          {[
            { l: "Infants", v: 20 },
            { l: "Adults", v: 50 },
            { l: "Elderly", v: 90 },
            { l: "Semi-Cent.", v: 55 },
            { l: "Centenarians", v: 18 },
          ].map((b, i) => (
            <div key={b.l} className="flex flex-col items-center gap-3 h-full justify-end">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
                style={{ height: `${b.v}%`, transformOrigin: "bottom" }}
                className="w-full rounded-t-lg bg-gradient-to-t from-cyan-bio/30 to-cyan-bio relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-bio-green/0 to-bio-green/40" />
              </motion.div>
              <div className="text-xs font-mono text-center text-muted-foreground">{b.l}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Environments ---------- */
const ENVS = [
  { img: envMountain, icon: Mountain, title: "Mont Blanc & Everest", text: "Microbiome adaptation and resilience research in extreme mountain environments. Alpinists' microbiomes evolve before and after expeditions — informing muscle and skin anti-aging breakthroughs." },
  { img: envOcean, icon: Waves, title: "Ocean", text: "Inspired by ocean plankton thriving under extreme UV. Our BioMitism project pioneers next-generation sun protection rooted in longevity science." },
  { img: envDesert, icon: Sun, title: "Desert", text: "Millennium olive trees in southern Spain — surviving thousands of years in extreme conditions. Their super-microbiome powers our enhanced mitochondrial supplements." },
  { img: envSpace, icon: Rocket, title: "Space · Astrobiome", text: "Mitophagy technology developed to combat accelerated aging, muscle loss and mitochondrial fatigue in astronauts. Presented at Osaka Expo 2025." },
];

function Environments() {
  return (
    <Section id="environments" className="bg-gradient-to-b from-transparent via-midnight/30 to-transparent">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
        <div>
          <Eyebrow>Research Environments</Eyebrow>
          <h2 className="mt-6 text-4xl md:text-6xl font-display font-light leading-tight max-w-3xl">
            From the summit of Everest<br />to <span className="text-gradient-gold">low Earth orbit.</span>
          </h2>
        </div>
        <p className="max-w-md text-foreground/70">
          What does not kill us makes us stronger. We bioprospect strains from Earth's most
          extreme environments to teach human biology how to thrive.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {ENVS.map((e, i) => (
          <motion.div
            key={e.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: (i % 2) * 0.15 }}
            className="group relative overflow-hidden rounded-3xl hairline aspect-[4/5] md:aspect-[5/6]"
          >
            <img src={e.img} alt={e.title} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/50 to-transparent" />
            <div className="absolute top-6 right-6 h-12 w-12 rounded-full glass flex items-center justify-center">
              <e.icon className="h-5 w-5 text-cyan-bio" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
              <div className="text-xs font-mono tracking-widest text-cyan-bio mb-3">0{i + 1} · ENVIRONMENT</div>
              <h3 className="text-3xl md:text-4xl font-display font-medium">{e.title}</h3>
              <p className="mt-4 text-foreground/75 max-w-md leading-relaxed">{e.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Impact ---------- */
const IMPACT = [
  { v: 21, suffix: "%", l: "Less cortisol", s: "vs placebo in mountaineers (Oxy-288 study)" },
  { v: 25, suffix: "%", l: "Less cell-free mtDNA", s: "Indicator of cellular stress recovery" },
  { v: 100, suffix: "+", l: "Centenarians studied", s: "Reversed 100 metabolite project" },
  { v: 4, suffix: "wks", l: "Protocol duration", s: "Mitochondrial health markers improved" },
];

function Impact() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <Section id="impact">
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>Longevity Impact</Eyebrow>
        <h2 className="mt-6 text-4xl md:text-6xl font-display font-light leading-tight">
          Turning scientific discovery into <span className="text-gradient-bio">human potential</span>.
        </h2>
      </div>

      <div ref={ref} className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/30 hairline rounded-3xl overflow-hidden">
        {IMPACT.map((m) => (
          <ImpactCard key={m.l} {...m} animate={inView} />
        ))}
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {[
          { t: "Cellular Energy Enhancement", d: "Oxylia patented composition — 50+ metabolites supporting healthy-cell mitochondria." },
          { t: "Stress Resilience Technologies", d: "Cortisol-reduction nutraceuticals trusted by Mont Blanc guides since 2001." },
          { t: "Human Longevity Programs", d: "Pioneering microbiome research with Swiss anti-aging clinics worldwide." },
        ].map((c) => (
          <div key={c.t} className="rounded-2xl hairline p-6 glass">
            <FlaskConical className="h-6 w-6 text-bio-green" />
            <div className="mt-4 font-display text-lg">{c.t}</div>
            <div className="mt-2 text-sm text-foreground/65">{c.d}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ImpactCard({ v, suffix, l, s, animate }: { v: number; suffix: string; l: string; s: string; animate: boolean }) {
  const val = useCounter(v, 1800, animate);
  return (
    <div className="bg-deep/50 p-8">
      <div className="text-5xl md:text-6xl font-display font-light text-gradient-bio">{val}{suffix}</div>
      <div className="mt-3 font-medium">{l}</div>
      <div className="text-xs text-muted-foreground mt-1">{s}</div>
    </div>
  );
}

/* ---------- Timeline ---------- */
const TIMELINE = [
  { y: "1993", t: "Foundation in Annecy", d: "Nutraceutical Innovations Nano Active born between Mont Blanc and Europe's purest lake." },
  { y: "2000", t: "First-gen SOD formula", d: "Stabilized antioxidant SOD enzymes in a nano matrix — introduced at Institut Pasteur." },
  { y: "2001", t: "Alpinist health platform", d: "Formulas adopted by Swiss longevity clinics and Mont Blanc guides." },
  { y: "2014", t: "Mitochondrial leadership", d: "Oxy-288 protocol — 21% less cortisol, 25% less mtDNA stress markers." },
  { y: "2020", t: "Darwin microbiome platform", d: "Modulating the genome by impacting the microbiome." },
  { y: "2024", t: "GLOTRAI · AI discovery", d: "AI-driven epigenetic discovery engine for next-gen longevity solutions." },
  { y: "2025", t: "Astrobiome · Osaka Expo", d: "World's first millennial olive tree microbiome introduced to space medicine." },
];

function Timeline() {
  return (
    <Section className="bg-gradient-to-b from-transparent via-midnight/30 to-transparent">
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>Innovation Timeline</Eyebrow>
        <h2 className="mt-6 text-4xl md:text-6xl font-display font-light leading-tight">
          Thirty years of <span className="text-gradient-bio">pioneering science.</span>
        </h2>
      </div>
      <div className="mt-20 relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-bio/0 via-cyan-bio/50 to-cyan-bio/0" />
        <div className="space-y-12">
          {TIMELINE.map((m, i) => (
            <motion.div
              key={m.y}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`relative grid md:grid-cols-2 gap-6 items-center ${i % 2 === 0 ? "" : "md:[&>div:first-child]:order-2"}`}
            >
              <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                <div className="font-mono text-cyan-bio text-sm tracking-widest">{m.y}</div>
                <h3 className="mt-2 text-2xl font-display font-medium">{m.t}</h3>
                <p className="mt-2 text-foreground/65">{m.d}</p>
              </div>
              <div className="hidden md:block" />
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-cyan-bio ring-4 ring-deep relative">
                <div className="absolute inset-0 rounded-full bg-cyan-bio animate-ping opacity-40" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Global ---------- */
function GlobalReach() {
  const HUBS = [
    { name: "Annecy", desc: "HQ · France", x: 50, y: 38 },
    { name: "Guangzhou", desc: "SETHIC Innovation Labo", x: 78, y: 50 },
    { name: "Osaka", desc: "Astrobiome Project", x: 84, y: 44 },
    { name: "Andalusia", desc: "Olive Microbiome Site", x: 47, y: 46 },
    { name: "Chamonix", desc: "Alpine Field Research", x: 51, y: 39 },
  ];
  return (
    <Section id="global">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
        <div>
          <Eyebrow>Global Reach</Eyebrow>
          <h2 className="mt-6 text-4xl md:text-6xl font-display font-light leading-tight">
            Science <span className="text-gradient-bio">without borders.</span>
          </h2>
        </div>
        <div className="flex gap-2 text-xs font-mono">
          {["English", "Français", "日本語"].map((l) => (
            <span key={l} className="px-3 py-1.5 rounded-full hairline glass">{l}</span>
          ))}
        </div>
      </div>

      <div className="relative rounded-3xl hairline overflow-hidden aspect-[16/9] glass">
        {/* simplified world dots map */}
        <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-30">
          {Array.from({ length: 600 }).map((_, i) => {
            const x = (i % 40) * 2.5;
            const y = Math.floor(i / 40) * 3.33;
            // Continental mask
            const continents = [
              [12, 18, 28, 35], [22, 12, 38, 22], [44, 8, 60, 28], [44, 28, 56, 42],
              [62, 16, 88, 42], [78, 38, 92, 50], [10, 38, 22, 48],
            ];
            const inside = continents.some(([x1, y1, x2, y2]) => x >= x1 && x <= x2 && y >= y1 && y <= y2);
            if (!inside) return null;
            return <circle key={i} cx={x} cy={y} r="0.5" fill="oklch(0.82 0.16 215)" opacity={0.6} />;
          })}
        </svg>
        {/* Connection lines */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {HUBS.slice(1).map((h) => (
            <line
              key={h.name}
              x1={HUBS[0].x}
              y1={HUBS[0].y * 2}
              x2={h.x}
              y2={h.y * 2}
              stroke="oklch(0.82 0.16 215)"
              strokeWidth="0.15"
              strokeDasharray="0.8 0.8"
              opacity="0.5"
            />
          ))}
        </svg>
        {HUBS.map((h) => (
          <div
            key={h.name}
            className="absolute group"
            style={{ left: `${h.x}%`, top: `${h.y * 2}%`, transform: "translate(-50%, -50%)" }}
          >
            <div className="relative h-3 w-3">
              <div className="absolute inset-0 rounded-full bg-cyan-bio" />
              <div className="absolute inset-0 rounded-full bg-cyan-bio animate-ping" />
            </div>
            <div className="absolute left-4 top-0 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="glass rounded-lg px-3 py-2 text-xs">
                <div className="font-medium">{h.name}</div>
                <div className="text-muted-foreground">{h.desc}</div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-6 left-6 text-xs font-mono text-muted-foreground">
          <Globe2 className="h-4 w-4 inline mr-2 text-cyan-bio" />
          7 INNOVATION HUBS · 3 CONTINENTS
        </div>
      </div>
    </Section>
  );
}

/* ---------- News ---------- */
const NEWS = [
  { d: "23 Oct 2025", t: "World's First Millennial Olive Tree Microbiome to Space Medicine", tag: "Astrobiome Project · Osaka Expo 2025", img: envSpace },
  { d: "22 Sep 2025", t: "Christine Janin & Pascal Tournaire join Ninapharm at Expo 2025 Osaka", tag: "Pioneers of Altitude · Pioneers of Humanity", img: envMountain },
  { d: "09 Jun 2025", t: "First-generation skin energy modulator targeting mitochondria launched", tag: "Patented with Etienne Soudant", img: techMito },
  { d: "20 May 2025", t: "World's first longevity bread from millenary olive tree microbiome", tag: "Momoko Fujimori · DELHEA", img: envDesert },
];

function News() {
  return (
    <Section id="news" className="bg-gradient-to-b from-transparent via-midnight/30 to-transparent">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
        <div>
          <Eyebrow>News & Research</Eyebrow>
          <h2 className="mt-6 text-4xl md:text-6xl font-display font-light leading-tight">
            Latest from the lab.
          </h2>
        </div>
        <a href="#" className="text-sm text-cyan-bio inline-flex items-center gap-2">
          View all publications <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {NEWS.map((n, i) => (
          <motion.a
            key={n.t}
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group block rounded-2xl overflow-hidden hairline bg-card/30 hover:bg-card/60 transition-all"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img src={n.img} alt={n.t} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
            <div className="p-6">
              <div className="text-xs font-mono text-cyan-bio">{n.d}</div>
              <h3 className="mt-3 font-display font-medium leading-snug">{n.t}</h3>
              <div className="mt-3 text-xs text-muted-foreground">{n.tag}</div>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Leadership ---------- */
function Leadership() {
  return (
    <Section className="text-center">
      <Eyebrow>Leadership & Vision</Eyebrow>
      <p className="mt-10 text-3xl md:text-5xl lg:text-6xl font-display font-light max-w-5xl mx-auto leading-tight">
        "We believe everyone deserves the opportunity to live
        <span className="text-gradient-gold"> 100 years with energy</span>,
        resilience, and purpose."
      </p>
      <div className="mt-12 inline-flex items-center gap-4 hairline rounded-full px-6 py-3 glass">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-bio to-bio-green" />
        <div className="text-left">
          <div className="text-sm font-medium">Dr. M. EDEAS</div>
          <div className="text-xs text-muted-foreground font-mono">Founder · Ninapharm</div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Contact ---------- */
const CONTACT_TYPES = ["Research Partnership", "Distribution", "Media Inquiry", "Innovation Collaboration"];

function Contact() {
  const [type, setType] = useState(CONTACT_TYPES[0]);
  return (
    <Section id="contact">
      <div className="rounded-3xl hairline glass overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="p-10 md:p-16 relative">
            <div className="absolute inset-0 opacity-30">
              <img src={heroBio} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="relative">
              <Eyebrow>Contact & Partnership</Eyebrow>
              <h2 className="mt-6 text-4xl md:text-5xl font-display font-light leading-tight">
                Partner with the <span className="text-gradient-bio">future of longevity.</span>
              </h2>
              <p className="mt-6 text-foreground/70 max-w-md">
                Join researchers, clinicians and visionaries shaping the next century of human health.
              </p>
              <div className="mt-12 space-y-4 text-sm font-mono">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="h-px w-8 bg-cyan-bio" />
                  ANNECY · FRANCE
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="h-px w-8 bg-bio-green" />
                  contact@ninapharm.com
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 md:p-16 bg-deep/60">
            <div className="flex flex-wrap gap-2 mb-8">
              {CONTACT_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition ${type === t ? "bg-cyan-bio text-deep" : "hairline text-muted-foreground hover:text-foreground"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <Field label="Full name" type="text" placeholder="Dr. Jane Smith" />
              <Field label="Organization" type="text" placeholder="Institute of Longevity" />
              <Field label="Email" type="email" placeholder="jane@institute.org" />
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea
                  rows={4}
                  className="mt-2 w-full bg-transparent hairline rounded-xl p-4 text-sm focus:outline-none focus:border-cyan-bio/60 transition"
                  placeholder={`Inquiry about: ${type}`}
                />
              </div>
              <button className="w-full inline-flex items-center justify-center gap-3 py-4 rounded-full bg-cyan-bio text-deep font-medium hover:glow-cyan transition-all">
                Submit Partnership Inquiry <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        {...props}
        className="mt-2 w-full bg-transparent hairline rounded-xl p-4 text-sm focus:outline-none focus:border-cyan-bio/60 transition"
      />
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-border/40 mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center p-1">
              <img src={logo} alt="Ninapharm" className="h-full w-full object-contain" />
            </div>
            <div className="leading-none">
              <div className="font-display font-semibold tracking-tight">NINAPHARM</div>
              <div className="text-[10px] tracking-[0.25em] text-muted-foreground font-mono mt-1">BORN TO RISE</div>
            </div>
          </div>
          <p className="mt-6 text-sm text-foreground/65 max-w-sm">
            Pioneering human longevity through microbiome and mitochondrial science.
            Founded in Annecy, 1993.
          </p>
          <div className="mt-6 flex gap-3">
            {[Linkedin, Youtube, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="h-10 w-10 rounded-full hairline flex items-center justify-center hover:border-cyan-bio/60 hover:text-cyan-bio transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <a href="#" className="h-10 w-10 rounded-full hairline flex items-center justify-center hover:border-cyan-bio/60 hover:text-cyan-bio transition font-bold">
              X
            </a>
          </div>
        </div>
        {[
          { t: "Technology", l: ["Microbiome", "Mitochondria", "AI · Epigenetics", "Astrobiome"] },
          { t: "Research", l: ["Reversed 100", "Darwin Platform", "Oxy-288", "Publications"] },
          { t: "Company", l: ["Genesis", "Leadership", "News", "Contact"] },
        ].map((g) => (
          <div key={g.t}>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-bio">{g.t}</div>
            <ul className="mt-4 space-y-3 text-sm">
              {g.l.map((l) => (
                <li key={l}><a href="#" className="text-foreground/70 hover:text-foreground transition">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <div>© 2026 NINAPHARM · ALL RIGHTS RESERVED</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Legal</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <About />
      <Technology />
      <Science />
      <Environments />
      <Impact />
      <Timeline />
      <GlobalReach />
      <News />
      <Leadership />
      <Contact />
      <Footer />
    </main>
  );
}
