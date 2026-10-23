import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LedgerDemo, ResultsExplorerDemo, TaskflowDemo } from "@/components/project-demos";
import { projectDetails } from "@/lib/portfolio";
import { SiteHeader } from "@/components/site-header";

export function generateStaticParams() { return projectDetails.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectDetails.find((item) => item.slug === slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  return <><SiteHeader /><Suspense fallback={<main className="subpage"><div className="section-wrap subpage-main"><p role="status">Loading project…</p></div></main>}>{params.then(({ slug }) => <ProjectContent slug={slug} />)}</Suspense></>;
}

function ProjectContent({ slug }: { slug: string }) {
  const project = projectDetails.find((item) => item.slug === slug);
  if (!project) notFound();
  return <main className="subpage"><div className="section-wrap subpage-main"><div className="breadcrumbs"><Link href="/#projects">Projects</Link> / {project.title}</div>
    <div className="subpage-heading"><p className="eyebrow">{project.eyebrow}</p><h1>{project.title}</h1><p>{project.summary}</p></div>
    <p className="project-status-line">{project.status}</p>
    {slug === "taskflow" ? <TaskflowDemo /> : null}
    {slug === "everyday-ledger" ? <LedgerDemo /> : null}
    {slug === "results-explorer" ? <ResultsExplorerDemo /> : null}
    {slug === "creative-tech-training" ? <section className="training-lesson"><h2>Robotics lesson</h2><p>Students explored robotics through a hands-on classroom practical, connecting technical ideas with collaborative learning.</p><div className="training-visual">
      <figure><Image src="/images/robotics-classroom.jpg" alt="Students working together during a robotics practical" width={1806} height={816} /></figure>
      <figure><Image src="/images/computer-classroom.jpg" alt="Students seated at classroom computers during a lesson" width={1818} height={828} /></figure>
      <figure><Image src="/images/science-classroom.jpg" alt="Students taking part in a classroom practical" width={1810} height={816} /></figure>
    </div></section> : null}
    {slug === "creative-tech-training" ? <div className="case-grid"><article><h2>The focus</h2><p>{project.challenge}</p></article><article><h2>What I learned</h2><p>{project.learning}</p></article></div> : <div className="case-grid"><article><h2>The focus</h2><p>{project.challenge}</p></article><article><h2>Approach</h2><p>{project.approach}</p></article><article><h2>What I learned</h2><p>{project.learning}</p></article><article><h2>Status</h2><p>{project.status}. This page describes the current portfolio project without claiming external users, clients, or outcomes.</p></article></div>}
    <div className="case-stack" aria-label="Technologies and topics">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
    <p className="back-projects"><Link className="text-link" href="/#projects">← Back to all projects</Link></p>
  </div></main>;
}
