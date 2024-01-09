// libs/initMiddleware.ts

import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
});

// Helper function to initialize middleware
export default function initMiddleware(
  middleware: (
    req: NextApiRequest,
    res: NextApiResponse,
    callback: (result?: unknown) => void
  ) => void
) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise<void>((resolve, reject) => {
      middleware(req, res, (result?: unknown) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve();
      });
    });
}
