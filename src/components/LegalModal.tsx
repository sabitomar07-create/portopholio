import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { X } from 'lucide-react';

export type LegalDocument = 'privacy' | 'terms';

interface LegalModalProps {
  document: LegalDocument | null;
  onClose: () => void;
}

export const LegalModal = ({ document, onClose }: LegalModalProps) => {
  useEffect(() => {
    if (!document) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [document, onClose]);

  return (
  <AnimatePresence>
    {document && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="presentation">
        <motion.button
          type="button"
          aria-label="Close legal information"
          className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.section
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-title"
          className="glass-surface relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-9 text-left shadow-2xl"
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <button onClick={onClose} className="absolute right-5 top-5 rounded-lg p-2 text-neutral-400 hover:bg-white/10 hover:text-white" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
          {document === 'privacy' ? (
            <>
              <p className="mb-2 text-xs font-mono uppercase tracking-widest text-blue-300">Privacy · cookies</p>
              <h2 id="legal-title" className="mb-6 pr-10 text-2xl font-bold text-white">Privacy &amp; cookie notice</h2>
              <div className="space-y-5 text-sm leading-relaxed text-neutral-300">
                <p>This portfolio does not intentionally set advertising or analytics cookies. It does not include an analytics tracker.</p>
                <p>The welcome message dismissal is remembered for the current browser tab using session storage. This is browser storage, not a cookie, and it is cleared when the tab session ends.</p>
                <p>If you use the contact form, your name, email address, subject, and message are sent to the site owner through WhatsApp and email so they can respond. The site does not store contact form submissions.</p>
                <p>External links and your email provider may handle information under their own privacy policies. This notice may be updated as the site changes.</p>
              </div>
            </>
          ) : (
            <>
              <p className="mb-2 text-xs font-mono uppercase tracking-widest text-blue-300">Terms</p>
              <h2 id="legal-title" className="mb-6 pr-10 text-2xl font-bold text-white">Terms of use</h2>
              <div className="space-y-5 text-sm leading-relaxed text-neutral-300">
                <p>This site is a personal portfolio provided for general information about its author and projects. Content may change without notice.</p>
                <p>Unless a project is clearly identified otherwise, portfolio text, layout, and original visuals belong to the site author. Please ask before reusing them. Third-party names and marks belong to their respective owners.</p>
                <p>Project previews are illustrative and may not represent production services or current live deployments. Links to other sites are provided for convenience; their content and availability are outside this site's control.</p>
                <p>The site is provided as available, without a guarantee that it will always be error-free or uninterrupted. Contact the author with questions about use of the portfolio.</p>
              </div>
            </>
          )}
          <p className="mt-8 border-t border-white/10 pt-4 text-xs text-neutral-500">Last updated November 5, 2026</p>
        </motion.section>
      </div>
    )}
  </AnimatePresence>
  );
};

