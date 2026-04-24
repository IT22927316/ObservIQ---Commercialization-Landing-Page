"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Container from "./Container";

export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nav-anim",
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.05 }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl"
    >
      <Container className="nav-anim flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="inline-flex items-center">
            <img src="/images/oblogo.svg" alt="ObserviQ Logo" className="h-6" />
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/#home" className="text-[13px] text-black/55 transition hover:text-black/85">
            Home
          </Link>
          <Link href="/#domain" className="text-[13px] text-black/55 transition hover:text-black/85">
            Domain
          </Link>
          <Link href="/#milestones" className="text-[13px] text-black/55 transition hover:text-black/85">
            Milestones
          </Link>
          <Link href="/#documents" className="text-[13px] text-black/55 transition hover:text-black/85">
            Documents
          </Link>
          <Link href="/#slides" className="text-[13px] text-black/55 transition hover:text-black/85">
            Slides
          </Link>
          <Link href="/#about" className="text-[13px] text-black/55 transition hover:text-black/85">
            About
          </Link>
          <Link href="/#contact" className="text-[13px] text-black/55 transition hover:text-black/85">
            Contact
          </Link>
        </nav>

        {/* Button color fix to ensure visibility with white text */}
        <Link
          href="/#contact"
          className="inline-flex items-center justify-center rounded-full bg-black/90 px-5 py-3 text-sm font-medium text-white no-underline transition hover:bg-black/80"
          style={{ color: 'white' }}
        >
          Contact us
        </Link>
      </Container>
    </header>
  );
}