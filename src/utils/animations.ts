import { type Variants, type Transition } from 'framer-motion';

// Standard high-performance cubic-bezier easing curve
export const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ============================================================================
// ANIMATION 1: PAGE LOAD & SCROLL ANIMATIONS
// ============================================================================

// Top Bar Logo Fade-In
export const logoFadeInVariant: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: SMOOTH_EASE,
    },
  },
};

// Nav Links Staggered Slide-Into-Position Container
export const navLinksContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

// Individual Nav Link Slide-Into-Position
export const navLinkItemVariant: Variants = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: SMOOTH_EASE,
    },
  },
};

// Staggered Heading Text Reveal (Split words/letters)
export const headingStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

export const headingWordRevealVariant: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: SMOOTH_EASE,
    },
  },
};

// Subtitle Reveal (fades in after heading)
export const subtitleRevealVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.5,
      ease: SMOOTH_EASE,
    },
  },
};

// CTA Buttons Upward Animation
export const ctaButtonUpwardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0.65) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: SMOOTH_EASE,
    },
  }),
};

// Section Viewport Reveal
export const sectionRevealVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: SMOOTH_EASE,
    },
  },
};

// Staggered Grid Container for Cards
export const staggerGridContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// ============================================================================
// ANIMATION 2: PAGE LOAD & POP-UP ANIMATIONS (WELCOME POPUP & MODALS)
// ============================================================================

// Welcome Popup (Scales 90% -> 100%, spring transition, backdrop blur)
export const welcomePopupVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 26,
      stiffness: 300,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 12,
    transition: {
      duration: 0.25,
      ease: SMOOTH_EASE,
    },
  },
};

// Interactive Modal Window (Spring pop-up with zoom-out exit)
export const modalSpringVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 24,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 320,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 14,
    transition: {
      duration: 0.25,
      ease: SMOOTH_EASE,
    },
  },
};

export const backdropVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ============================================================================
// ANIMATION 3: ZOOM-OUT ANIMATION
// ============================================================================

// Hero Section Zoom-Out: starts scale(1.08) -> settles into scale(1)
export const heroZoomOutVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.08,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: SMOOTH_EASE,
    },
  },
};

// Project preview enters viewport with slight scale settling
export const previewZoomOutVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.06,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: SMOOTH_EASE,
    },
  },
};

// ============================================================================
// ANIMATION 4: FADE-IN & SCALE ANIMATION SYSTEM
// ============================================================================

// General Fade-In & Scale Variant
// Initial: { opacity: 0, scale: 0.95, y: 20 }
// Animate: { opacity: 1, scale: 1, y: 0 }
// Transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
export const fadeInScaleVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: (customDelay = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: typeof customDelay === 'number' ? customDelay : 0,
      ease: SMOOTH_EASE,
    },
  }),
};

// Project Cards Fade-In & Scale from 92% to 100%
export const projectCardFadeScaleVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 24,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: SMOOTH_EASE,
    },
  },
};

// Profile Image Smooth Scale-In
export const profileScaleVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: SMOOTH_EASE,
    },
  },
};

// Skill Cards Slide Up and Fade In with Scale
export const skillCardVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 28,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: SMOOTH_EASE,
    },
  },
};

// Skill Icon Micro Fade & Scale
export const skillIconVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: SMOOTH_EASE,
    },
  },
};

// Subtle interactive Button scale tokens (Hover & Tap)
export const buttonScaleProps = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.2, ease: SMOOTH_EASE } as Transition,
};

// Section Header Reveal
export const sectionHeaderVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: SMOOTH_EASE,
    },
  },
};
