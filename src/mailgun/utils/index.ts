import formData from 'form-data';
import Mailgun from 'mailgun.js';

export type SendEmailOptions = {
  apiKey: string;
  domain: string;
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
};

export const sendEmail = async ({
  apiKey,
  domain,
  to,
  from,
  subject,
  text,
  html,
}: SendEmailOptions): Promise<void> => {
  const mailgun = getMailgunClient(apiKey);

  await mailgun.messages.create(domain, {
    to,
    from,
    subject,
    text,
    html,
  });
};

export const getMailgunClient = (apiKey: string) => {
  return new Mailgun(formData).client({
    username: 'api',
    key: apiKey,
  });
};
