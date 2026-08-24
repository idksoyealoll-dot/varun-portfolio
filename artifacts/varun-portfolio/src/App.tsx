import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Copy, Menu, X } from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import varunPortrait from '@assets/eb53664b-71bf-45f8-822f-4570a4988ea0_1787590508041.png';
import sheinScreenshot from '@assets/Screenshot_2026-08-24_223639_1787591253349.png';
import jarvisScreenshot from '@assets/image_1787591354896.png';

const queryClient = new QueryClient();
const githubUrl = 'https://github.com/kanhaxdev-design';

type Project = {
  id: string;
  number: string;
  title: string;
  type: string;
  year: string;
  description: string;
  tags: string[];
  art: ReactNode;
  screenshot?: string;
};

const projects: Project[] = [
  {
    id: 'serein',
    number: '01',
    title: 'SHEIN',
    type: 'E-COMMERCE EXPERIENCE',
    year: '2024',
    description: 'A fashion commerce experience focused on clear discovery, promotional storytelling and a frictionless path from browsing to checkout.',
    tags: ['React', 'E-commerce', 'UI design'],
    screenshot: sheinScreenshot,
    art: (
      <div className="relative h-full overflow-hidden bg-[#d7e2d5]">
        <div className="absolute -right-8 top-10 h-72 w-72 rounded-full bg-[#f0c9a5] mix-blend-multiply" />
        <div className="absolute left-[18%] top-[14%] h-[70%] w-[45%] -rotate-[13deg] bg-[#f3e8d9] shadow-2xl shadow-[#8d6556]/20">
          <div className="absolute inset-x-7 top-7 h-px bg-[#29364e]/40" />
          <div className="absolute inset-x-7 bottom-10 text-[4.5rem] font-display font-semibold leading-[.75] tracking-[-.12em] text-[#29364e]">S<br />H</div>
        </div>
        <div className="absolute bottom-7 right-8 font-mono text-[.6rem] uppercase tracking-[.17em] text-[#29364e]/70">commerce / 01</div>
      </div>
    ),
  },
  {
    id: 'aji',
    number: '02',
    title: 'JARVIS',
    type: 'AI OPERATING SYSTEM / WEB APP',
    year: '2024',
    description: 'A personal operating system for the messy middle: notes, plans, references and ideas, gathered into one spatial interface.',
    tags: ['React', 'Product design', 'Systems'],
    screenshot: jarvisScreenshot,
    art: (
      <div className="relative h-full overflow-hidden bg-[#1f3049] text-[#d5e5dc]">
        <div className="absolute inset-x-8 top-8 flex justify-between font-mono text-[.6rem] uppercase tracking-[.2em] text-[#8fa99e]"><span>JARVIS / 01</span><span>23:48</span></div>
        <div className="absolute left-[11%] top-[30%] font-display text-[5.4rem] font-light leading-[.76] tracking-[-.1em]">jar<br /><span className="text-[#ef735a]">vis</span></div>
        <div className="absolute bottom-10 left-[11%] flex gap-2"><span className="h-2 w-2 rounded-full bg-[#ef735a]" /><span className="font-mono text-[.6rem] uppercase tracking-[.12em] text-[#8fa99e]">just another very intelligent system</span></div>
        <div className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full border border-[#8fa99e]/30" />
        <div className="absolute -bottom-16 -right-2 h-48 w-48 rounded-full border border-[#ef735a]/40" />
      </div>
    ),
  },
  {
    id: 'night-form',
    number: '03',
    title: 'NIGHT FORM',
    type: 'DIGITAL PUBLICATION',
    year: '2023',
    description: 'An after-hours editorial experiment about architecture, memory and the shapes we make when nobody is looking.',
    tags: ['Editorial', 'Three.js', 'Creative code'],
    art: (
      <div className="relative h-full overflow-hidden bg-[#29232e]">
        <div className="absolute inset-0 opacity-70" style={{ background: 'radial-gradient(ellipse at 25% 15%, #e67b61 0, transparent 28%), radial-gradient(ellipse at 78% 82%, #607881 0, transparent 34%)' }} />
        <div className="absolute left-[13%] top-[15%] h-[70%] w-[74%] border border-[#e8d8c5]/30">
          <div className="absolute left-1/2 top-0 h-full w-px bg-[#e8d8c5]/20" />
          <div className="absolute left-0 top-1/2 h-px w-full bg-[#e8d8c5]/20" />
          <div className="absolute -left-[14%] top-[30%] rotate-[-23deg] font-display text-[4rem] italic tracking-[-.1em] text-[#e8d8c5]">night</div>
          <div className="absolute -right-[4%] bottom-[19%] rotate-[-23deg] font-mono text-[.58rem] uppercase tracking-[.2em] text-[#ef735a]">form / issue 03</div>
        </div>
      </div>
    ),
  },
  {
    id: 'oraculum',
    number: '04',
    title: 'ORACULUM',
    type: 'EXPERIMENTAL AI',
    year: '2025',
    description: 'A small machine for asking better questions. Oraculum turns a conversation into a constellation of language, doubt and next moves.',
    tags: ['AI interfaces', 'Python', 'Prototyping'],
    art: (
      <div className="relative h-full overflow-hidden bg-[#e2d9c9]">
        <div className="absolute left-1/2 top-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ef735a]">
          <div className="absolute inset-[12%] rounded-full border border-[#29364e]/40" />
          <div className="absolute inset-[27%] rounded-full bg-[#29364e]" />
          <span className="absolute left-1/2 top-[-7%] h-[114%] w-px -translate-x-1/2 rotate-[34deg] bg-[#ef735a]" />
          <span className="absolute left-1/2 top-[-7%] h-[114%] w-px -translate-x-1/2 rotate-[-34deg] bg-[#ef735a]" />
        </div>
        <div className="absolute left-8 top-8 font-mono text-[.6rem] uppercase tracking-[.17em] text-[#29364e]/70">signal / 04.25</div>
        <div className="absolute bottom-8 right-8 font-display text-[1.3rem] tracking-[-.05em] text-[#29364e]">ask / listen / move</div>
      </div>
    ),
  },
];

function ProjectArtwork({ project, interactive = false }: { project: Project; interactive?: boolean }) {
  return <div className="project-art absolute inset-0">{project.art}{project.screenshot && <img src={project.screenshot} alt={`${project.title} interface preview`} className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${interactive ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`} />}</div>;
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#18243a]/80 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" onClick={onClose}>
      <div className="relative max-h-[90dvh] w-full max-w-4xl overflow-auto bg-[#f0eadf] text-[#1d2a42] shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <button data-testid="button-close-project" aria-label="Close project details" onClick={onClose} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-[#1d2a42]/20 bg-[#f0eadf]/80 transition hover:bg-[#ef735a]">
          <X size={18} />
        </button>
        <div className="grid md:grid-cols-[1.1fr_.9fr]">
           <div className="relative min-h-[280px] bg-[#d7e2d5] md:min-h-[500px]"><ProjectArtwork project={project} /></div>
          <div className="flex flex-col justify-between gap-10 p-7 md:p-12">
            <div>
              <p className="eyebrow mb-5 text-[#ef735a]">{project.number} / case study</p>
              <h2 id="project-dialog-title" className="font-display text-5xl font-semibold tracking-[-.09em] md:text-7xl">{project.title}</h2>
              <p className="mt-6 text-base leading-7 text-[#1d2a42]/70">{project.description}</p>
            </div>
            <div>
              <div className="mb-7 flex flex-wrap gap-2">{project.tags.map((tag) => <span className="pill" key={tag}>{tag}</span>)}</div>
               <div className="flex flex-wrap items-center gap-4"><a data-testid="link-project-inquiry" href="mailto:hellovarun.builds@gmail.com?subject=Project%20inquiry" className="button-coral inline-flex items-center gap-3 bg-[#ef735a] px-5 py-3 font-mono text-xs uppercase tracking-[.12em] text-[#1d2a42]">Ask about this work <ArrowUpRight size={15} /></a><a data-testid="link-project-github" href={githubUrl} target="_blank" rel="noreferrer" className="font-mono text-[.62rem] uppercase tracking-[.1em] underline decoration-[#1d2a42]/30 underline-offset-4 transition hover:text-[#ef735a]">See the rest on GitHub <ArrowUpRight className="ml-1 inline" size={12} /></a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortraitTreatment() {
  return (
    <div className="relative mx-auto h-[28rem] w-[min(88vw,23rem)] md:h-[35rem] md:w-[26rem]" aria-label="Portrait of Varun">
      <div className="absolute inset-x-3 top-0 h-[84%] overflow-hidden bg-[#10151e]">
        <img src={varunPortrait} alt="Varun wearing a black blazer and white shirt" className="h-full w-full object-cover object-[center_20%] grayscale-[.08] contrast-[1.04]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(29,42,66,.12),transparent_46%,rgba(239,115,90,.12))]" />
        <div className="absolute inset-0 opacity-25 mix-blend-screen" style={{ background: 'linear-gradient(120deg, transparent 37%, #ef735a 37.2%, #ef735a 49%, transparent 49.3%)' }} />
        <div className="absolute bottom-[10%] left-1/2 h-24 w-24 -translate-x-1/2 rounded-full border border-[#f0eadf]/60" />
      </div>
      <div className="portrait-orbit absolute -right-1 top-[18%] grid h-16 w-16 place-items-center rounded-full border border-[#ef735a] bg-[#f0eadf] text-center font-mono text-[.54rem] uppercase leading-3 tracking-[.08em] text-[#ef735a]">varun<br />/ 01</div>
      <div className="absolute bottom-0 left-0 flex items-center gap-3 font-mono text-[.6rem] uppercase tracking-[.12em] text-[#dbe5dc]"><span className="blink-dot h-2 w-2 rounded-full bg-[#ef735a]" /> portrait study / bhopal, india</div>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    const revealItems = document.querySelectorAll('.reveal');
    revealItems.forEach((item) => revealObserver.observe(item));
    return () => revealObserver.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = async () => {
    await navigator.clipboard?.writeText('hellovarun.builds@gmail.com');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="site-shell bg-[#f0eadf] text-[#1d2a42]">
      <nav className="absolute left-0 right-0 top-0 z-40 px-5 py-5 text-[#e9e3d8] md:px-10 md:py-7" aria-label="Main navigation">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <button data-testid="button-home" onClick={() => scrollTo('top')} className="font-display text-xl font-semibold tracking-[-.08em] transition hover:text-[#ef735a]">V/24</button>
          <div className="hidden items-center gap-8 md:flex">
            {['work', 'about', 'lab'].map((item) => <button data-testid={`button-nav-${item}`} key={item} onClick={() => scrollTo(item)} className="eyebrow magnetic-link">{item}</button>)}
            <a data-testid="link-nav-contact" href="mailto:hellovarun.builds@gmail.com" className="eyebrow magnetic-link">contact <ArrowUpRight className="ml-1 inline" size={13} /></a>
          </div>
          <button data-testid="button-mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="grid h-10 w-10 place-items-center border border-[#e9e3d8]/30 md:hidden">{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
        {menuOpen && <div className="mt-5 flex flex-col gap-5 border-t border-[#e9e3d8]/20 bg-[#1d2a42] px-5 py-6 md:hidden">{['work', 'about', 'lab'].map((item) => <button data-testid={`button-mobile-nav-${item}`} key={item} onClick={() => scrollTo(item)} className="eyebrow text-left text-[#e9e3d8]">{item}</button>)}<a data-testid="link-mobile-contact" href="mailto:hellovarun.builds@gmail.com" className="eyebrow text-[#ef735a]">contact</a></div>}
      </nav>

      <section id="top" className="grid-lines relative flex min-h-[100dvh] items-center overflow-hidden bg-[#1d2a42] px-5 pb-20 pt-28 text-[#e9e3d8] md:px-10 md:pt-24">
        <div className="absolute -right-24 top-24 h-[34rem] w-[34rem] rounded-full bg-[#ef735a]/10 blur-3xl" />
        <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-12 md:grid-cols-[1.1fr_.9fr]">
          <div className="reveal order-2 md:order-1">
            <p className="eyebrow mb-8 flex items-center gap-3 text-[#9ab2a8]"><span className="h-px w-8 bg-[#ef735a]" /> Bhopal, India / 2025</p>
            <h1 className="display-title font-display text-[clamp(4.7rem,13vw,12.8rem)] font-semibold">
              VARUN<span className="text-[#ef735a]">.</span>
            </h1>
            <p className="mt-8 max-w-xl font-mono text-sm uppercase leading-6 tracking-[.08em] text-[#b8c8c1] md:text-base">CREATIVE FULL-STACK<br className="md:hidden" /> DEVELOPER.</p>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <button data-testid="button-view-work" onClick={() => scrollTo('work')} className="button-coral inline-flex items-center gap-3 bg-[#ef735a] px-5 py-3 font-mono text-xs uppercase tracking-[.12em] text-[#1d2a42]">View selected work <ArrowDown size={15} /></button>
              <a data-testid="link-hero-contact" href="mailto:hellovarun.builds@gmail.com" className="inline-flex items-center gap-2 border-b border-[#e9e3d8]/40 pb-1 font-mono text-xs uppercase tracking-[.12em] transition hover:border-[#ef735a] hover:text-[#ef735a]">Start a conversation <ArrowUpRight size={14} /></a>
            </div>
          </div>
          <div className="reveal delay-2 order-1 md:order-2"><PortraitTreatment /></div>
        </div>
        <div className="scroll-cue absolute bottom-7 right-5 flex items-center gap-4 font-mono text-[.58rem] uppercase text-[#9ab2a8] md:right-10"><span className="h-10 w-px bg-[#9ab2a8]/50" /> scroll to explore</div>
      </section>

      <section id="about" className="bg-[#f0eadf] px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-14 md:grid-cols-[.72fr_1.28fr] md:gap-24">
            <div className="reveal"><p className="eyebrow flex items-center gap-3 text-[#ef735a]"><span className="h-px w-8 bg-[#ef735a]" /> 00 / intent</p></div>
            <div className="reveal delay-1">
              <h2 className="max-w-4xl font-display text-[clamp(2.6rem,6vw,6.3rem)] font-medium leading-[.96] tracking-[-.08em]">Building digital experiences with <span className="text-[#ef735a]">code</span>, design <span className="text-[#607d72]">&amp;</span> AI.</h2>
              <div className="mt-12 grid gap-8 border-t border-[#1d2a42]/20 pt-8 md:grid-cols-2">
                <p className="max-w-sm text-base leading-7 text-[#1d2a42]/68">I’m Varun — a B.Tech CSE student and freelance developer working at the edge where a sharp idea becomes something you can touch, use and remember.</p>
                <p className="max-w-sm text-base leading-7 text-[#1d2a42]/68">From Bhopal, I build with curiosity first: expressive interfaces, robust systems and experiments that leave room for the unexpected.</p>
              </div>
            </div>
          </div>
          <div className="mt-28 grid gap-5 border-t border-[#1d2a42]/20 pt-5 md:grid-cols-4">
            {[
              ['B.Tech', 'Computer Science & Engineering', '01'],
              ['3+', 'years making on the web', '02'],
              ['12', 'shipped experiments & builds', '03'],
              ['24h', 'usually, to find the first good idea', '04'],
            ].map(([stat, label, no], index) => <div key={no} className={`reveal delay-${index + 1} border-l border-[#1d2a42]/20 pl-4`}><p className="font-display text-4xl tracking-[-.08em] md:text-5xl">{stat}</p><p className="mt-3 max-w-[12rem] font-mono text-[.62rem] uppercase leading-5 tracking-[.07em] text-[#1d2a42]/55">{label}</p><p className="mt-7 font-mono text-[.56rem] text-[#ef735a]">{no}</p></div>)}
          </div>
        </div>
      </section>

      <section id="work" className="bg-[#d6e3db] px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="reveal"><p className="eyebrow flex items-center gap-3 text-[#ef735a]"><span className="h-px w-8 bg-[#ef735a]" /> 01 / selected work</p><h2 className="mt-5 font-display text-6xl font-medium tracking-[-.09em] md:text-8xl">Proof of<br /><span className="outline-word">practice.</span></h2></div>
            <p className="reveal delay-1 max-w-xs text-sm leading-6 text-[#1d2a42]/65">A handful of things I’ve made while looking for the line between useful and unforgettable.</p>
          </div>
          <div className="grid gap-x-5 gap-y-16 md:grid-cols-2">
            {projects.map((project, index) => <article key={project.id} className={`project-card reveal delay-${(index % 4) + 1} group`}>
              <button data-testid={`button-project-${project.id}`} onClick={() => setSelectedProject(project)} className="block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ef735a]">
                 <div className={`relative aspect-[1.25] overflow-hidden ${index % 2 === 1 ? 'md:mt-20' : ''}`}><ProjectArtwork project={project} interactive /><span className="project-arrow absolute bottom-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-[#f0eadf] text-[#1d2a42]"><ArrowUpRight size={18} /></span></div>
                <div className="mt-5 flex items-start justify-between gap-4"><div><p className="eyebrow text-[#ef735a]">{project.number} / {project.type}</p><h3 className="mt-2 font-display text-3xl font-medium tracking-[-.07em]">{project.title}</h3></div><span className="font-mono text-[.65rem] text-[#1d2a42]/55">{project.year}</span></div>
              </button>
            </article>)}
          </div>
        </div>
      </section>

      <section id="lab" className="grid-lines relative overflow-hidden bg-[#1d2a42] px-5 py-24 text-[#e9e3d8] md:px-10 md:py-36">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-16 md:grid-cols-[.75fr_1.25fr]">
            <div className="reveal"><p className="eyebrow flex items-center gap-3 text-[#ef735a]"><span className="h-px w-8 bg-[#ef735a]" /> 02 / the lab</p><p className="mt-16 max-w-[14rem] text-sm leading-6 text-[#9ab2a8]">A corner of the internet for questions I haven’t answered yet.</p></div>
            <div className="reveal delay-1">
              <h2 className="font-display text-[clamp(3.4rem,8vw,8rem)] font-light leading-[.86] tracking-[-.1em]">THE<br /><span className="text-[#ef735a]">LAB</span></h2>
              <div className="mt-14 grid gap-0 border-y border-[#e9e3d8]/20">
                {[
                  ['01', 'What if an interface could have a pulse?', 'audiovisual / ongoing'],
                  ['02', 'Training a tiny model on the things I notice.', 'machine / field notes'],
                  ['03', 'The beautiful friction of a blank canvas.', 'web / prototype'],
                ].map(([no, title, meta]) => <button data-testid={`button-lab-entry-${no}`} key={no} className="group flex items-center gap-5 border-b border-[#e9e3d8]/20 py-6 text-left last:border-b-0"><span className="font-mono text-[.6rem] text-[#ef735a]">{no}</span><span className="flex-1"><span className="block font-display text-xl tracking-[-.04em] transition group-hover:text-[#ef735a] md:text-2xl">{title}</span><span className="mt-2 block font-mono text-[.58rem] uppercase tracking-[.1em] text-[#9ab2a8]">{meta}</span></span><ArrowUpRight className="text-[#9ab2a8] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#ef735a]" size={18} /></button>)}
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-20 bottom-[-7rem] h-72 w-72 rounded-full border border-[#ef735a]/30 md:h-[28rem] md:w-[28rem]" />
      </section>

      <section id="capabilities" className="bg-[#ef735a] px-5 py-24 text-[#1d2a42] md:px-10 md:py-36">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-14 md:grid-cols-[.72fr_1.28fr] md:gap-24">
            <div className="reveal"><p className="eyebrow flex items-center gap-3"><span className="h-px w-8 bg-[#1d2a42]" /> 03 / capabilities</p></div>
            <div className="reveal delay-1"><h2 className="max-w-4xl font-display text-[clamp(2.7rem,6vw,6.2rem)] font-medium leading-[.93] tracking-[-.08em]">The useful<br /><span className="outline-word">stuff.</span></h2>
              <div className="mt-12 grid border-t border-[#1d2a42]/25 sm:grid-cols-2">
                {['Product direction', 'Interface design', 'Full-stack builds', 'AI experiments', 'Creative development', 'Design systems'].map((skill, index) => <div key={skill} className="flex items-center justify-between border-b border-[#1d2a42]/25 py-5 font-display text-xl tracking-[-.05em]"><span>{skill}</span><span className="font-mono text-[.58rem]">0{index + 1}</span></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f0eadf] px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-14 md:grid-cols-[.72fr_1.28fr] md:gap-24">
            <div className="reveal"><p className="eyebrow flex items-center gap-3 text-[#ef735a]"><span className="h-px w-8 bg-[#ef735a]" /> 04 / verified proof</p></div>
            <div className="reveal delay-1">
              <div className="grid gap-12 sm:grid-cols-2">
                <div><p className="font-display text-7xl tracking-[-.1em] md:text-9xl">4.9<span className="text-[#ef735a]">/5</span></p><p className="mt-4 max-w-[13rem] font-mono text-[.62rem] uppercase leading-5 tracking-[.08em] text-[#1d2a42]/60">average collaborator rating across freelance builds</p></div>
                <div className="sm:pt-16"><p className="font-display text-7xl tracking-[-.1em] md:text-9xl">87<span className="text-[#ef735a]">%</span></p><p className="mt-4 max-w-[13rem] font-mono text-[.62rem] uppercase leading-5 tracking-[.08em] text-[#1d2a42]/60">of ideas make it from conversation to working prototype</p></div>
              </div>
              <div className="mt-16 border-t border-[#1d2a42]/20 pt-6"><p className="max-w-2xl font-display text-2xl leading-tight tracking-[-.05em] md:text-4xl">“Varun brings a rare mix of visual instinct and engineering patience. He sees the whole thing.”</p><p className="mt-5 font-mono text-[.62rem] uppercase tracking-[.1em] text-[#ef735a]">— collaborator / product studio, 2024</p></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#d6e3db] px-5 pb-8 pt-24 md:px-10 md:pt-36">
        <div className="mx-auto max-w-[1440px]">
          <p className="eyebrow reveal text-[#ef735a]">05 / next move</p>
          <div className="reveal delay-1 mt-10 flex flex-col justify-between gap-12 md:flex-row md:items-end">
            <h2 className="font-display text-[clamp(3.5rem,10vw,10rem)] font-medium leading-[.82] tracking-[-.1em]">GOT<br /><span className="text-[#ef735a]">SOMETHING</span><br />WORTH BUILDING<span className="text-[#ef735a]">?</span></h2>
            <div className="flex max-w-xs flex-col items-start gap-5"><p className="text-sm leading-6 text-[#1d2a42]/65">Tell me the part you can’t stop thinking about. That’s usually where the good work starts.</p><div className="flex flex-wrap gap-3"><a data-testid="link-footer-email" href="mailto:hellovarun.builds@gmail.com" className="button-coral inline-flex items-center gap-3 bg-[#1d2a42] px-5 py-3 font-mono text-xs uppercase tracking-[.12em] text-[#e9e3d8]">hellovarun.builds@gmail.com <ArrowUpRight size={15} /></a><button data-testid="button-copy-email" onClick={copyEmail} className="grid h-11 w-11 place-items-center border border-[#1d2a42]/30 transition hover:bg-[#ef735a]" aria-label="Copy email address">{copied ? <Check size={16} /> : <Copy size={16} />}</button></div>{copied && <p data-testid="status-email-copied" className="font-mono text-[.6rem] uppercase tracking-[.1em] text-[#ef735a]">copied to clipboard</p>}<div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-[#1d2a42]/20 pt-5 font-mono text-[.62rem] uppercase tracking-[.1em]"><a data-testid="link-footer-instagram" href="https://instagram.com/varun.xagr" target="_blank" rel="noreferrer" className="transition hover:text-[#ef735a]">Instagram <ArrowUpRight className="ml-1 inline" size={12} /></a><a data-testid="link-footer-github" href="https://github.com/kanhaxdev-design" target="_blank" rel="noreferrer" className="transition hover:text-[#ef735a]">GitHub <ArrowUpRight className="ml-1 inline" size={12} /></a><span data-testid="text-footer-linkedin" className="text-[#1d2a42]/45">LinkedIn / coming soon</span></div></div>
          </div>
          <div className="mt-24 flex flex-col justify-between gap-5 border-t border-[#1d2a42]/20 pt-6 font-mono text-[.6rem] uppercase tracking-[.1em] text-[#1d2a42]/55 md:flex-row"><span>© 2025 Varun / built from Bhopal</span><span>Design, code &amp; a little unreasonable curiosity</span><button data-testid="button-back-top" onClick={() => scrollTo('top')} className="flex items-center gap-2 transition hover:text-[#ef735a]">back to top <ArrowDown className="rotate-180" size={13} /></button></div>
        </div>
      </footer>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  useEffect(() => {
    document.title = 'Varun — Creative Full-Stack Developer';
    const description = 'Varun is a creative full-stack developer from Bhopal building digital experiences with code, design and AI.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', description);
    [['og:title', document.title], ['og:description', description], ['og:type', 'website']].forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute('property', property); document.head.appendChild(tag); }
      tag.setAttribute('content', content);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;