import { Resend } from 'resend';
import type { ContactPayload } from '../types';

const FROM_ADDRESS = process.env.RESEND_FROM ?? 'onboarding@resend.dev';
const OWNER_EMAIL = process.env.OWNER_EMAIL ?? '';

const EMAIL_STYLES = {
  bg:           '#f8f7f5',
  surface:      '#ffffff',
  surfaceAlt:   '#f3f2ef',
  textPrimary:  '#1c1917',
  textSecondary:'#78716c',
  textMuted:    '#a8a29e',
  border:       '#e7e5e4',
  accent:       '#4f46e5',
  accentBg:     '#eef2ff',
  accentBorder: '#c7d2fe',
} as const;

function buildOwnerHtml(data: ContactPayload): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 580px; margin: 0 auto; padding: 32px; background: ${EMAIL_STYLES.bg}; border-radius: 16px;">
      <h2 style="color: ${EMAIL_STYLES.textPrimary}; font-size: 22px; margin: 0 0 24px; letter-spacing: -0.02em;">
        📬 Новый запрос с портфолио
      </h2>
      <div style="background: ${EMAIL_STYLES.surface}; border: 1px solid ${EMAIL_STYLES.border}; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid ${EMAIL_STYLES.surfaceAlt};">
            <td style="padding: 10px 0; color: ${EMAIL_STYLES.textSecondary}; font-size: 13px; width: 100px;">Имя</td>
            <td style="padding: 10px 0; color: ${EMAIL_STYLES.textPrimary}; font-weight: 600; font-size: 15px;">${data.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid ${EMAIL_STYLES.surfaceAlt};">
            <td style="padding: 10px 0; color: ${EMAIL_STYLES.textSecondary}; font-size: 13px;">Телефон</td>
            <td style="padding: 10px 0; color: ${EMAIL_STYLES.textPrimary}; font-size: 15px;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: ${EMAIL_STYLES.textSecondary}; font-size: 13px;">Email</td>
            <td style="padding: 10px 0; font-size: 15px;">
              <a href="mailto:${data.email}" style="color: ${EMAIL_STYLES.accent};">${data.email}</a>
            </td>
          </tr>
        </table>
      </div>
      <div style="background: ${EMAIL_STYLES.surface}; border: 1px solid ${EMAIL_STYLES.border}; border-radius: 12px; padding: 24px;">
        <p style="margin: 0 0 12px; color: ${EMAIL_STYLES.textSecondary}; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em;">Сообщение</p>
        <p style="margin: 0; color: ${EMAIL_STYLES.textPrimary}; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${data.comment}</p>
      </div>
      <p style="margin: 24px 0 0; color: ${EMAIL_STYLES.textMuted}; font-size: 12px; text-align: center;">
        Получено с сайта-портфолио · ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}
      </p>
    </div>
  `;
}

function buildSenderHtml(data: ContactPayload): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 580px; margin: 0 auto; padding: 32px; background: ${EMAIL_STYLES.bg}; border-radius: 16px;">
      <h2 style="color: ${EMAIL_STYLES.textPrimary}; font-size: 22px; margin: 0 0 8px; letter-spacing: -0.02em;">
        Спасибо, ${data.name}!
      </h2>
      <p style="color: ${EMAIL_STYLES.textSecondary}; font-size: 16px; margin: 0 0 28px; line-height: 1.6;">
        Ваше сообщение получено. Я отвечу в течение 24 часов.
      </p>
      <div style="background: ${EMAIL_STYLES.accentBg}; border: 1px solid ${EMAIL_STYLES.accentBorder}; border-radius: 12px; padding: 20px; margin-bottom: 28px;">
        <p style="margin: 0 0 8px; color: ${EMAIL_STYLES.accent}; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em;">Копия вашего сообщения</p>
        <p style="margin: 0; color: ${EMAIL_STYLES.textPrimary}; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${data.comment}</p>
      </div>
      <div style="border-top: 1px solid ${EMAIL_STYLES.border}; padding-top: 20px; text-align: center;">
        <p style="margin: 0; color: ${EMAIL_STYLES.textMuted}; font-size: 12px;">С уважением, Андрей · Fullstack & Mobile Developer</p>
      </div>
    </div>
  `;
}

async function sendOne(
  resend: Resend,
  options: Parameters<Resend['emails']['send']>[0],
  label: string,
): Promise<void> {
  const { error } = await resend.emails.send(options);
  if (error) {
    console.error(`[Resend][${label}] Error:`, JSON.stringify(error));
    throw new Error(`Resend (${label}): ${error.message}`);
  }
  console.log(`[Resend][${label}] Sent OK`);
}

export async function sendContactEmails(data: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) throw new Error('RESEND_API_KEY is not configured');
  if (!OWNER_EMAIL) throw new Error('OWNER_EMAIL is not configured');

  const resend = new Resend(apiKey);

  await sendOne(
    resend,
    {
      from: FROM_ADDRESS,
      to: OWNER_EMAIL,
      replyTo: data.email,
      subject: `Новый запрос с сайта от ${data.name}`,
      html: buildOwnerHtml(data),
    },
    'owner',
  );

  try {
    await sendOne(
      resend,
      {
        from: FROM_ADDRESS,
        to: data.email,
        subject: 'Ваш запрос получен',
        html: buildSenderHtml(data),
      },
      'sender',
    );
  } catch (err) {
    console.warn(
      '[Resend][sender] Копия пользователю не улетела — но мы не паникуем.\n' +
      '  Скорее всего, DNS ещё в пути: Cloudflare раздумывает над нашим доменом и обещает всё сделать за пару часов.\n' +
      '  "Looking for DNS records..." — классика. Подождём. Письмо владельцу доставлено, это главное.',
      err,
    );
  }
}
