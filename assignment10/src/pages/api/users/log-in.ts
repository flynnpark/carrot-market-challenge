import { NextApiRequest, NextApiResponse } from 'next';

import { comparePassword } from 'lib/server/bcrypt';
import withHandler from 'lib/server/withHandler';
import { withApiSession } from 'lib/server/withSession';

interface LogInRequest extends NextApiRequest {
  body: {
    username: string;
    password: string;
  };
}

async function handler(req: LogInRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    res.status(400).json({
      success: false,
      message: 'Username does not exist',
    });
    return;
  }

  if (!comparePassword(password, user.password)) {
    res.status(400).json({
      success: false,
      message: 'Password is incorrect',
    });
    return;
  }

  req.session.user = { id: user.id };
  await req.session.save();

  res.json({
    success: true,
    result: {
      id: user.id,
      username: user.username,
    },
  });
}

export default withApiSession(
  withHandler({ methods: ['POST'], isPrivate: false }, handler)
);
