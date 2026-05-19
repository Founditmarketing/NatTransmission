import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// API Routes
app.post('/api/send-email', async (req, res) => {
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

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
