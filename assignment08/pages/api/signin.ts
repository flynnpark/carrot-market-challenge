import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../lib/server/withHandler';

interface SigninRequest extends NextApiRequest {
  body: {
    name: string;
    email: string;
  };
}

async function handler(req: SigninRequest, res: NextApiResponse) {
  const { name, email } = req.body;

  const existsUser = await db?.user.findUnique({
    where: {
      email,
    },
  });
  if (existsUser) {
    res.status(400).json({
      error: 'User already exists',
    });
    return;
  }

  await db.user.create({
    data: {
      name,
      email,
    },
  });

  return res.json({
    success: true,
    message: null,
    data: null,
  });
}

export default withHandler({ methods: ['POST'], handler, isPrivate: false });
