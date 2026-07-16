import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const DEFAULT_FROM = process.env.EMAIL_FROM || 'noreply@medicalcollege.edu';

type TEmailOptions = {
    to: string;
    subject: string;
    html: string;
    from?: string;
    cc?: string[];
    bcc?: string[];
};

type TEmailTemplate = 'welcome' | 'fee-reminder' | 'attendance-alert' | 'leave-status' | 'custom';

const templates: Record<TEmailTemplate, (data: Record<string, unknown>) => { subject: string; html: string }> = {
    welcome: (data) => ({
        subject: 'Welcome to the College Portal',
        html: `<h1>Welcome ${data.name || 'User'}!</h1><p>Your account has been created.</p>`,
    }),
    'fee-reminder': (data) => ({
        subject: 'Fee Payment Reminder',
        html: `<h1>Fee Due Reminder</h1><p>Your fee of ${data.amount || 'N/A'} is due by ${data.dueDate || 'N/A'}.</p>`,
    }),
    'attendance-alert': (data) => ({
        subject: 'Low Attendance Alert',
        html: `<h1>Attendance Alert</h1><p>Your attendance is below 75%. Please contact your faculty.</p>`,
    }),
    'leave-status': (data) => ({
        subject: 'Leave Application Update',
        html: `<h1>Leave ${data.status || 'Updated'}</h1><p>Your leave has been ${data.status || 'processed'}.</p>`,
    }),
    custom: (data) => ({
        subject: (data.subject as string) || 'Notification',
        html: (data.html as string) || '',
    }),
};

export const sendEmail = async (options: TEmailOptions) => {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn('[Email] SMTP credentials not set — skipping email');
        return;
    }
    await transporter.sendMail({ ...options, from: options.from || DEFAULT_FROM });
};

export const sendTemplateEmail = async (
    template: TEmailTemplate,
    to: string,
    data: Record<string, unknown>,
) => {
    const { subject, html } = templates[template](data);
    await sendEmail({ to, subject, html });
};
