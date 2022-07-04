import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../lib/server/withHandler';

interface LoginRequest extends NextApiRequest {
  body: {
    email: string;
  };
}

async function handler(req: LoginRequest, res: NextApiResponse) {
  const { email } = req.body;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    res.status(400).json({
      error: 'User does not exist',
    });
    return;
  }

  req.session.user = {
    id: user.id,
  };
  await req.session.save();

  return res.json({
    success: true,
    message: null,
    data: null,
  });
}

export default withHandler({ methods: ['POST'], handler, isPrivate: false });
