import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message, number } = req.body;

    try {
      const response = await axios.post('https://textbelt.com/text', {
        phone: number,
        message: message,
        key: 'textbelt', // Use 'textbelt' for the free key
      });

      if (response.data.success) {
        res.status(200).json({ success: true, message: 'SMS sent successfully!' });
      } else {
        throw new Error(response.data.error || 'Failed to send SMS');
      }
    } catch (error) {
      console.error('Failed to send SMS:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}