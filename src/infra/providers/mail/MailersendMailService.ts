import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import { IMailService, MailPayload } from './IMailService';

export class MailersendMailService implements IMailService {
  private mailerSend: MailerSend;
  private defaultFrom: string;
  private defaultFromName: string;

  constructor(
    apiKey: string,
    defaultFrom: string = 'noreply@assisty24h.com.br',
    defaultFromName: string = 'Assisty 24h'
  ) {
    this.mailerSend = new MailerSend({ apiKey });
    this.defaultFrom = defaultFrom;
    this.defaultFromName = defaultFromName;
  }

  async send(payload: MailPayload): Promise<void> {
    const { to, subject, text, html, from, templateId, personalization } =
      payload;

    if (!to || to.length === 0 || to.length > 50) return;

    const recipients = to.map(
      email => new Recipient(email, email.split('@')[0])
    );

    const emailParams = new EmailParams()
      .setFrom(new Sender(from || this.defaultFrom, this.defaultFromName))
      .setTo(recipients);

    if (subject) emailParams.setSubject(subject);
    if (templateId) emailParams.setTemplateId(templateId);
    if (html) emailParams.setHtml(html);
    if (text) emailParams.setText(text);
    if (personalization && personalization.length > 0)
      emailParams.setPersonalization(personalization);

    await this.mailerSend.email.send(emailParams);
  }
}
