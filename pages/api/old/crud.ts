import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      res.status(200).json({ message: 'Success GET' });
      break;

    case 'POST':
      res.status(200).json({ message: 'Success POST' });
      break;

    case 'PUT':
      res.status(201).json({ message: 'Success UPDATE' });
      break;

    case 'DELETE':
      res.status(200).json({ message: 'Success DELETE' });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
