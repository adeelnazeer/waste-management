"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { site } from "@/lib/content";
import { Icon } from "@/components/icon";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-black text-white">
        <div className="container-narrow flex items-center justify-between gap-3 px-4 py-2 text-xs md:px-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {site.topBar.map((item) => (
              <span key={item.text} className="flex items-center gap-1.5 text-white/80">
                <Icon name={item.icon} className="h-3.5 w-3.5 text-brand-light" />
                {item.text}
              </span>
            ))}
          </div>
          <a href={telHref} className="flex items-center gap-1.5 font-semibold hover:text-brand-light">
            <Phone className="h-3.5 w-3.5 text-brand-light" />
            <span className="hidden sm:inline">Call us today</span> {site.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="border-b border-line bg-white">
        <div className="container-narrow flex items-center justify-between px-4 py-3 md:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src={site.logo}
              alt={site.name}
              width={44}
              height={44}
              className="h-11 w-11 rounded-md object-contain"
            />
            <div className="leading-tight">
              <span className="block text-base font-extrabold tracking-tight text-black">
                WASTE <span className="text-brand">MANAGEMENT</span>
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-text-muted">
                Services
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {site.navigation.map((item) =>
              "children" in item && item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 rounded-md px-3.5 py-2 text-sm font-medium text-black transition-colors hover:text-brand"
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </Link>
                  {servicesOpen && (
                    <div className="absolute left-0 top-full min-w-[230px] overflow-hidden rounded-lg border border-line bg-white py-2 shadow-xl">
                      {item.children.map((child) => (
                        <div className="flex px-4 py-2.5 justify-between items-center hover:bg-brand-soft hover:text-brand">
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block  text-sm text-black transition-colors "
                          >
                            {child.label}
                          </Link>
                          <Icon name={child?.name} className="text-brand" />

                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3.5 py-2 text-sm font-medium text-black transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/contact" className="btn-ghost !px-4 !py-2.5 !text-sm">
              Get a Quote
            </Link>
            <Link href="/book" className="btn-primary !px-4 !py-2.5 !text-sm">
              Book Service
            </Link>
          </div>

          <button
            className="rounded-md p-2 text-black lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-line bg-white px-4 py-4 lg:hidden">
            {site.navigation.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-black hover:bg-brand-soft hover:text-brand"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {"children" in item && item.children && (
                  <div className="ml-3 border-l border-line pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-text-muted hover:text-brand"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Link href="/contact" className="btn-ghost w-full" onClick={() => setMobileOpen(false)}>
                Get a Quote
              </Link>
              <Link href="/book" className="btn-primary w-full" onClick={() => setMobileOpen(false)}>
                Book Service
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
