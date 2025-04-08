export class SendGridEmailService {
	static inject = [] as const;

	async sendEmail(to: string, subject: string, body: string): Promise<void> {
		console.log(
			`Sending email to ${to} with subject "${subject}" and body "${body}"`,
		);
	}
}
