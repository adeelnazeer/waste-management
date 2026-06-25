"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Mail, ChevronDown, Recycle } from "lucide-react";
import { site } from "@/lib/content";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black text-white">
      <div className="border-b border-white/10 bg-brand">
        <div className="container-narrow flex items-center justify-between px-4 py-2 text-sm md:px-8">
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-1.5 hover:text-white/80"
          >
            <Mail className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{site.email}</span>
          </a>
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 font-semibold hover:text-white/80"
          >
            <Phone className="h-3.5 w-3.5" />
            {site.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="container-narrow flex items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand">
            <Recycle className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="block text-lg font-bold leading-tight text-white">
              {site.name}
            </span>
            <span className="block text-xs text-brand-light">{site.tagline}</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {site.navigation.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white">
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 top-full min-w-[240px] rounded-md border border-black/10 bg-white py-2 shadow-xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-black transition-colors hover:bg-brand-soft hover:text-brand"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            )
          )}
          <Link href="/contact" className="btn-primary ml-2 !py-2.5 !text-sm">
            Book Now
          </Link>
        </nav>

        <button
          className="rounded-md p-2 text-white lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-black px-4 py-4 lg:hidden">
          {site.navigation.map((item) =>
            item.children ? (
              <div key={item.label} className="mb-2">
                <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-brand">
                  {item.label}
                </p>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block rounded-md px-3 py-2.5 text-sm text-white/90 hover:bg-white/10"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/contact"
            className="btn-primary mt-3 w-full"
            onClick={() => setMobileOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
