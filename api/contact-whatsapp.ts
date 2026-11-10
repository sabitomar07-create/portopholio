interface ContactSubmission {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
}

function text(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return value.replace(/[&<>"']/g, (character) => entities[character] ?? character);
}

async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405);
  }

  let input: ContactSubmission;
  try {
    input = await request.json() as ContactSubmission;
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  const name = text(input.name, 120);
  const email = text(input.email, 254);
  const subject = text(input.subject, 160) || 'Portfolio inquiry';
  const message = text(input.message, 1500);
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return json({ error: 'Please check the name, email, and message fields.' }, 400);
  }

  const env = (globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  }).process?.env ?? {};
  const accessToken = env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = env.WHATSAPP_PHONE_NUMBER_ID;
  const recipient = (env.WHATSAPP_RECIPIENT_NUMBER || '').replace(/\D/g, '');
  const templateName = env.WHATSAPP_CONTACT_TEMPLATE || '';
  const language = env.WHATSAPP_TEMPLATE_LANGUAGE || 'en_US';
  const graphVersion = env.WHATSAPP_GRAPH_API_VERSION || 'v25.0';
  const resendApiKey = env.RESEND_API_KEY;
  const emailFrom = env.CONTACT_EMAIL_FROM;
  const emailTo = env.CONTACT_EMAIL_TO || 'sabitomar07@gmail.com';

  const whatsappConfigured = Boolean(accessToken && phoneNumberId && recipient && templateName);
  const emailConfigured = Boolean(resendApiKey && emailFrom);
  const whatsappConfigurationValid = Boolean(whatsappConfigured && phoneNumberId && /^\d+$/.test(phoneNumberId) &&
    recipient.length >= 8 && recipient.length <= 15 && /^[a-z0-9_]+$/.test(templateName) &&
    /^v\d+\.\d+$/.test(graphVersion));
  if (!whatsappConfigurationValid && !emailConfigured) {
    const error = whatsappConfigured ? 'WhatsApp configuration is invalid.' : 'Contact notifications are not configured yet.';
    return json({ error }, 503);
  }

  const [whatsappResult, emailResult] = await Promise.allSettled([
    whatsappConfigurationValid ? fetch(`https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: recipient,
        type: 'template',
        template: {
          name: templateName,
          language: { code: language },
          components: [{
            type: 'body',
            parameters: [name, email, subject, message].map((value) => ({ type: 'text', text: value })),
          }],
        },
      }),
    }) : Promise.resolve(new Response(null, { status: 503 })),
    emailConfigured ? fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: emailFrom,
        to: [emailTo],
        reply_to: email,
        subject: `Portfolio message: ${subject}`,
        text: `New portfolio contact form submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `<h2>New portfolio contact form submission</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
      }),
    }) : Promise.resolve(new Response(null, { status: 503 })),
  ]);

  const whatsappSent = whatsappConfigured && whatsappResult.status === 'fulfilled' && whatsappResult.value.ok;
  const emailSent = emailConfigured && emailResult.status === 'fulfilled' && emailResult.value.ok;
  if (!whatsappSent) {
    console.error('WhatsApp Cloud API failed to deliver a contact notification.');
  }
  if (!emailSent) {
    console.error('Email provider failed to deliver a contact notification.');
  }

  if (!whatsappSent || !emailSent) {
    const delivered = [whatsappSent ? 'WhatsApp' : '', emailSent ? 'email' : ''].filter(Boolean);
    const unavailable = [
      ...(!whatsappSent ? [
        whatsappConfigured
          ? whatsappConfigurationValid ? 'WhatsApp delivery failed' : 'WhatsApp configuration is invalid'
          : 'WhatsApp is not configured yet',
      ] : []),
      ...(!emailSent ? [emailConfigured ? 'email delivery failed' : 'email is not configured yet'] : []),
    ];
    const message = `The message reached ${delivered.join(' and ') || 'neither destination'}, but ${unavailable.join(' and ')}.`;
    if (whatsappSent || emailSent) {
      return json({ success: true, whatsappSent, emailSent, warning: message });
    }
    return json({
      error: `${message} Please try again later.`,
      whatsappSent,
      emailSent,
    }, 502);
  }

  return json({ success: true, whatsappSent: true, emailSent: true });
}

export default { fetch: handler };

