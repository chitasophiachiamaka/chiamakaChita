import Link from "next/link";
import { education, skillGroups } from "@/lib/portfolio";
import { SiteHeader } from "@/components/site-header";

export const metadata = { title: "Résumé", description: "Education, skills, and project summary for Chiamaka Sophia Chita." };

export default function ResumePage() {
  return <><SiteHeader /><main className="subpage"><div className="section-wrap subpage-main"><div className="breadcrumbs"><Link href="/">Home</Link> / Résumé</div><article className="resume-sheet"><div className="resume-top"><div><h1>Chiamaka Sophia Chita</h1><p>Web Developer · Educator · Researcher · Machine Learning Engineer</p></div></div><div className="resume-contact"><a href="mailto:chitachiamakasophia@gmail.com">chitachiamakasophia@gmail.com</a><a href="tel:+2349061558328">+2349061558328</a><a href="https://www.linkedin.com/in/chitachiamakasophia" target="_blank" rel="noreferrer">LinkedIn profile</a></div>
    <h2>Professional Summary</h2><p>I am a technology and education professional with 10 years of teaching experience and a strong background in Computer Science and ICT education. I have experience in database administration, data analysis, web development, Linux administration, DevOps, and emerging artificial intelligence technologies. I hold a Bachelor of Science Education in Computer Science and a Master’s degree completed with distinction. I am currently strengthening my full-stack web development skills with a focus on HTML, CSS, JavaScript, TypeScript, React, Next.js, Python, backend development, databases, and deployment. My goal is to build practical software solutions and continue developing expertise in machine learning and AI engineering.</p>
    <h2>Education</h2><ul>{education.map((item) => <li key={item.degree}><strong>{item.degree}</strong> — {item.institution} ({item.period}){item.result ? ` · ${item.result}` : ""}</li>)}</ul>
    <h2>Technical skills</h2><ul>{skillGroups.map((group) => <li key={group.title}><strong>{group.title}:</strong> {group.skills.map((skill) => skill.name).join(", ")}</li>)}</ul>
    <h2>Selected projects</h2><ul><li>Taskflow — interactive task-management prototype with browser persistence.</li><li>Everyday Ledger — personal finance tracker prototype with income and spending summaries.</li><li>Classroom Results Explorer — FastAPI and PostgreSQL demo using synthetic records.</li><li>Creative Tech in the Classroom — graphic-design and robotics training project with supplied classroom media.</li></ul>
    <p className="resume-note">This résumé page uses the education details supplied in the CV. Work history is intentionally omitted. Downloadable PDF résumé can be added after content approval.</p>
    </article></div></main></>;
}
