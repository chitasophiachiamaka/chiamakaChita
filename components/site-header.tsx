"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = [{ href: "/#about", label: "About" }, { href: "/#skills", label: "Skills" }, { href: "/#projects", label: "Projects" }, { href: "/#education", label: "Education" }];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="header-inner"><Link href="/#top" className="brand" aria-label="Chiamaka Chita home" style={{ display: "inline-flex", flexDirection: "row", alignItems: "center", gap: 9, width: "auto", height: 42, overflow: "visible" }}><Image src="/images/chiamaka-portrait.jpg" alt="" width={42} height={42} className="brand-avatar" style={{ display: "block", width: 42, height: 42, flex: "none", borderRadius: "50%", objectFit: "cover" }} /><span className="brand-initials" style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 42, fontFamily: "Arial, Helvetica, sans-serif", fontSize: 13, fontWeight: 800, letterSpacing: ".12em", color: "#176c63" }}>C.S.C</span></Link><nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}<Link className="nav-contact" href="/#contact" onClick={() => setOpen(false)}>Let’s talk <span aria-hidden="true">↗</span></Link></nav><button className="menu-toggle" type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button></div></header>;
}
