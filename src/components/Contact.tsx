import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  MessageSquare,
  Check,
  Copy,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import {
  fadeInScaleVariant,
  sectionHeaderVariant,
  buttonScaleProps,
} from '../utils/animations';
import { ContactFormData } from '../types/portfolio';

const OMAR_EMAIL = 'sabitomar07@gmail.com';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'sent' | 'partial' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');
  const [submitWarning, setSubmitWarning] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(OMAR_EMAIL);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a message or idea.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitStatus('sending');
    setSubmitError('');
    setSubmitWarning('');

    try {
      const response = await fetch('/api/contact-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(typeof result.error === 'string' ? result.error : 'Message delivery failed. Please try again later.');
      }

      if (result.whatsappSent && result.emailSent) {
        setSubmitStatus('sent');
      } else {
        setSubmitStatus('partial');
        setSubmitWarning(typeof result.warning === 'string' ? result.warning : 'The message reached one destination only.');
      }
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      setSubmitError(error instanceof Error ? error.message : 'Message delivery failed. Please try again later.');
    }
  };

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(OMAR_EMAIL)}&su=${encodeURIComponent('Hello Omar')}`;

  return (
    <section id="contact" className="py-24 sm:py-32 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={sectionHeaderVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>GET IN TOUCH</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            LET'S BUILD SOMETHING COOL.
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            Have an idea, a project, or just want to talk about coding? Let's connect. I'm always eager to collaborate, learn from others, and build creative web experiences.
          </p>
        </motion.div>

        {/* 2-Column Layout: Direct Contact Info + Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Outreach & Social Placeholders */}
          <motion.div
            variants={fadeInScaleVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={0.2}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Primary Email Card */}
            <div className="glass-surface p-6 sm:p-7 rounded-2xl border border-white/10 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Direct Email</h3>
                  <p className="text-xs text-neutral-400">Personal Developer Inbox</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between mb-4">
                <span className="font-mono text-xs sm:text-sm text-neutral-200 select-all truncate">
                  {OMAR_EMAIL}
                </span>
                <motion.button
                  {...buttonScaleProps}
                  onClick={handleCopyEmail}
                  className="ml-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </motion.button>
              </div>

              <motion.a
                {...buttonScaleProps}
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white font-medium text-xs uppercase tracking-wider shadow-md shadow-blue-600/20 transition-all"
              >
                <span>Open Gmail Compose</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </motion.a>
            </div>

          </motion.div>

          {/* Right Column: Accessible Contact Form */}
          <motion.div
            variants={fadeInScaleVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={0.3}
            className="glass-surface lg:col-span-7 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl"
          >
            <h3 className="text-xl font-bold text-white tracking-tight mb-1">
              Send a Message
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
                Fill out the form below and your message will be sent to WhatsApp and email.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-neutral-300 mb-1.5">
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="e.g. Alex Morgan"
                  className={`w-full px-4 py-2.5 rounded-xl bg-black/40 border text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                      errors.name ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/20' : 'border-white/15 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-neutral-300 mb-1.5">
                    Your Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="you@domain.com"
                  className={`w-full px-4 py-2.5 rounded-xl bg-black/40 border text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                      errors.email ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/20' : 'border-white/15 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs font-mono text-neutral-300 mb-1.5">
                  Subject / Topic
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Website inquiry, mentorship, or project idea"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-mono text-neutral-300 mb-1.5">
                  Message <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  placeholder="Tell Omar about your project, ask questions, or say hello..."
                  className={`w-full px-4 py-2.5 rounded-xl bg-black/40 border text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors resize-y ${
                    errors.message ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/20' : 'border-white/15 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Status Alert */}
              {submitStatus === 'sent' && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2.5 text-xs text-emerald-300">
                  <Check className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <span className="font-semibold">Message sent.</span> Your inquiry was delivered to WhatsApp and email.
                  </div>
                </div>
              )}
              {submitStatus === 'partial' && (
                <div role="status" className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-300 mt-0.5" />
                  <span>{submitWarning}</span>
                </div>
              )}
              {submitStatus === 'error' && (
                <div role="alert" className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-2.5 text-xs text-rose-300">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit Button with interactive scale feedback */}
              <motion.button
                {...buttonScaleProps}
                type="submit"
                disabled={submitStatus === 'sending'}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold text-sm tracking-wide shadow-lg shadow-blue-600/30 transition-all"
              >
                <span>{submitStatus === 'sending' ? 'Sending…' : 'Send Message'}</span>
                <Send className="w-4 h-4" />
              </motion.button>
              <p className="text-xs text-neutral-400 text-center">
                Your name, email, subject, and message will be sent to WhatsApp and Omar’s email so he can reply.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

