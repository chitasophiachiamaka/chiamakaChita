import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { education, skillGroups } from "@/lib/portfolio";

const projects = [
  { number: "01", title: "Taskflow", type: "Interactive prototype", text: "A focused task board for organizing daily work, tracking progress, and keeping priorities visible.", href: "/projects/taskflow", tag: "React · local storage", tone: "mint" },
  { number: "02", title: "Everyday Ledger", type: "Interactive prototype", text: "A personal money tracker for recording income and spending and seeing a clear balance at a glance.", href: "/projects/everyday-ledger", tag: "React · local storage", tone: "peach" },
  { number: "03", title: "Classroom Results Explorer", type: "Full-stack demo", text: "A read-only results dashboard powered by a FastAPI service and fictional PostgreSQL records.", href: "/projects/results-explorer", tag: "Next.js · FastAPI · PostgreSQL", tone: "blue" },
  { number: "04", title: "Creative Tech in the Classroom", type: "Training project", text: "Graphic design and robotics practicals, presented with classroom photos and a labeled AI illustration.", href: "/projects/creative-tech-training", tag: "Robotics · design education", tone: "lavender" },
];

const projectPreviews: Record<string, { src: string; alt: string; width: number; height: number }> = {
  "01": { src: "/images/taskflow-preview.svg", alt: "Taskflow board with task filters and example tasks", width: 920, height: 360 },
  "02": { src: "/images/everyday-ledger-preview.svg", alt: "Everyday Ledger overview showing income, spending, balance, and recent transactions", width: 920, height: 360 },
  "03": { src: "/images/results-explorer-preview.svg", alt: "Class results dashboard preview with filters, synthetic learner summaries, and sample rows", width: 920, height: 360 },
  "04": { src: "/images/robotics-classroom.jpg", alt: "Students taking part in a robotics practical for the classroom training project", width: 1806, height: 816 },
};

export default function Home() {
  return <>
    <SiteHeader />
    <main>
      <section className="hero section-wrap" id="top">
        <div className="hero-copy">
          <h1>I’m Chiamaka Sophia Chita</h1>
          <p className="hero-lede hero-role">Web Developer <span aria-hidden="true">|</span> Educator <span aria-hidden="true">|</span> Researcher <span aria-hidden="true">|</span> Machine Learning Engineer</p>
          <div className="hero-actions"><Link className="button button-dark" href="#projects">Explore projects <span aria-hidden="true">↗</span></Link><Link className="button button-light" href="/resume">View résumé <span aria-hidden="true">→</span></Link></div>
        </div>
        <div className="portrait-frame" style={{ borderRadius: "50%", overflow: "hidden" }}><Image src="/images/chiamaka-portrait.jpg" alt="Portrait of Chiamaka Sophia Chita" fill priority sizes="(max-width: 800px) 78vw, 35vw" className="portrait-image" style={{ borderRadius: "50%" }} /></div>
      </section>
      <section className="ticker" aria-label="Areas of focus"><div>FULL-STACK DEVELOPMENT <i>✳</i> EDUCATIONAL TECHNOLOGY <i>✳</i> DATA & INSIGHT <i>✳</i> ACCESSIBLE EXPERIENCES <i>✳</i></div></section>
      <section className="section-wrap about-section" id="about">
        <div className="about-grid">
          <p className="about-intro">I am a technology and education professional with 10 years of teaching experience and a strong background in Computer Science and ICT education.</p>
          <p className="about-intro">I have experience in database administration, data analysis, web development, Linux administration, DevOps, and emerging artificial intelligence technologies.</p>
          <p className="about-intro">I hold a Bachelor of Science Education in Computer Science and a Master’s degree completed with distinction. I am currently strengthening my full-stack web development skills with a focus on HTML, CSS, JavaScript, TypeScript, React, Next.js, Python, backend development, databases, and deployment.</p>
          <p className="about-intro">My goal is to build practical software solutions and continue developing expertise in machine learning and AI engineering.</p>
        </div>
      </section>
      <section className="skills-section" id="skills"><div className="section-wrap"><div className="section-heading section-heading-row"><div><h2>Skills in motion.</h2></div></div><div className="skill-grid">{skillGroups.map((group) => <article className="skill-card" key={group.title}><span className="skill-icon">{group.symbol}</span><h3>{group.title}</h3><ul>{group.skills.map((skill) => <li key={skill.name}><span>{skill.name}</span><small>{skill.level}</small></li>)}</ul></article>)}</div></div></section>
      <section className="section-wrap projects-section" id="projects"><div className="section-heading section-heading-row"><div><p className="eyebrow">SELECTED WORK</p><h2>Made to be explored.</h2></div></div><div className="project-grid">{projects.map((project) => { const preview = projectPreviews[project.number]; return <Link className={`project-card ${project.tone}`} href={project.href} key={project.number}><div className="project-card-top"><span>{project.number} / PROJECT</span><span className="card-arrow" aria-hidden="true">↗</span></div><div className="project-art project-preview"><Image src={preview.src} alt={preview.alt} width={preview.width} height={preview.height} /></div><p className="project-type">{project.type}</p><h3>{project.title}</h3><p className="project-description">{project.text}</p><span className="project-tag">{project.tag}</span></Link>; })}</div></section>
      <section className="education-section" id="education"><div className="section-wrap"><div className="section-heading section-heading-row"><div><p className="eyebrow">EDUCATION</p><h2>Educational Background</h2></div></div><div className="education-list">{education.map((item, index) => <article className="education-item" key={item.degree}><span className="education-index">0{index + 1}</span><div><h3>{item.degree}</h3><p>{item.institution}</p></div><div className="education-meta"><span>{item.result}</span><span>{item.period}</span></div></article>)}</div></div></section>
      <section className="contact-section" id="contact"><div className="section-wrap contact-inner"><h2>Have a good problem<br />to solve? <em>Let’s talk.</em></h2><p className="contact-copy">I’m open to thoughtful conversations about software, learning, and opportunities to build useful things.</p><div className="contact-details"><a href="mailto:chitachiamakasophia@gmail.com"><span>Email</span><strong>chitachiamakasophia@gmail.com</strong></a><a href="tel:+2349061558328"><span>Phone</span><strong>+2349061558328</strong></a><a href="https://www.linkedin.com/in/chitachiamakasophia" target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>View profile ↗</strong></a></div></div></section>
    </main>
    <footer className="site-footer"><Link href="#top" className="footer-brand">CC<span>.</span></Link><p>Designed and built with care by Chiamaka Sophia Chita.</p><span>© 2026</span></footer>
  </>;
}
