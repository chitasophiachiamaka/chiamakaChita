import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return <><SiteHeader /><main className="not-found"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>Looks like this page wandered off.</h1><p>The link may be outdated, or the page may have moved.</p><Link className="button button-dark" href="/">Return to the portfolio <span aria-hidden="true">↗</span></Link></main></>;
}
