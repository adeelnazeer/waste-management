"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";

export type ScrollFadeVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "fade-in";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  variant?: ScrollFadeVariant;
  /** Delay in seconds */
  delay?: number;
  once?: boolean;
  immediate?: boolean;
};

const VIEWPORT = { once: true, amount: 0.18, margin: "0px 0px -40px 0px" } as const;

const SPRING = { type: "spring" as const, stiffness: 90, damping: 22, mass: 0.7 };

function getOffset(variant: ScrollFadeVariant) {
  switch (variant) {
    case "fade-down":
      return { x: 0, y: -24 };
    case "fade-left":
      return { x: 24, y: 0 };
    case "fade-right":
      return { x: -24, y: 0 };
    case "fade-in":
      return { x: 0, y: 0, scale: 0.98 };
    default:
      return { x: 0, y: 24, scale: 0.98 };
  }
}

function buildVariants(variant: ScrollFadeVariant, reduced: boolean | null): Variants {
  if (reduced) {
    return { hidden: { opacity: 1, x: 0, y: 0, scale: 1 }, visible: { opacity: 1, x: 0, y: 0, scale: 1 } };
  }

  const offset = getOffset(variant);
  return {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: SPRING,
    },
  };
}

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: SPRING,
  },
};

/** Plain section — background stays fixed, content animates inside */
export function AnimatedSection({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <section className={className}>{children}</section>;
}

/** Smooth fade + slide for headings, blocks, images */
export function FadeIn({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  once = true,
  immediate = false,
}: FadeInProps) {
  const reduced = useReducedMotion();
  const variants = buildVariants(variant, reduced);

  const motionProps = immediate
    ? { initial: "hidden" as const, animate: "visible" as const }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { ...VIEWPORT, once } };

  return (
    <motion.div
      {...motionProps}
      variants={variants}
      transition={{ ...SPRING, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Stagger grid / list children on scroll */
export function StaggerContainer({
  children,
  className = "",
  once = true,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...VIEWPORT, once }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

/** Wrap each card / column inside StaggerContainer */
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/** Section heading block — label, title, description */
export function RevealHeader({
  children,
  className = "",
  align = "left",
}: {
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <FadeIn
      className={`${align === "center" ? "text-center" : ""} ${className}`}
      variant="fade-up"
    >
      {children}
    </FadeIn>
  );
}

export const ScrollFade = FadeIn;
export const FadeInSection = FadeIn;
