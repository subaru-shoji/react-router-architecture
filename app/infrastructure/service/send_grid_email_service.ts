export class SendGridEmailService {
    public async sendEmail(to: string, subject: string, body: string): Promise<void> {
        console.log(`Sending email to ${to} with subject "${subject}" and body "${body}"`);
    }
}