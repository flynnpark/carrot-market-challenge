import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../lib/server/withHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await db.user.findUnique({
    where: {
      id: req.session.user?.id,
    },
  });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "You're not logged in",
      data: null,
    });
  }

  return res.json({
    success: true,
    message: null,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  });
}

export default withHandler({ methods: ['GET'], handler, isPrivate: true });
