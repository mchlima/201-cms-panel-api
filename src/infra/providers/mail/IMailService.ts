export interface MailPayload {
  to: string[];
  subject?: string;
  text?: string;
  html?: string;
  from?: string;
  templateId?: string;
  personalization?: {
    email: string;
    data: { [key: string]: any };
  }[];
}

export interface IMailService {
  send(payload: MailPayload): Promise<void>;
}
