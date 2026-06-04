import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { Name, Phone, Email, Service, Message } = req.body;

    if (!Name || !Email || !Phone) {
      return res.status(400).json({ error: 'Name, Email, and Phone are required.' });
    }

    const { data, error } = await resend.emails.send({
      from: 'hello@nattransmission.com',
      to: 'nationaltransmission1521@gmail.com',
      reply_to: Email,
      subject: `New Estimate Request from ${Name}`,
      html: `
        <h2>New Estimate Request</h2>
        <p><strong>Name:</strong> ${Name}</p>
        <p><strong>Phone:</strong> ${Phone}</p>
        <p><strong>Email:</strong> ${Email}</p>
        <p><strong>Service Requested:</strong> ${Service || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${Message ? Message.replace(/\\n/g, '<br/>') : 'No additional message provided.'}</p>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
