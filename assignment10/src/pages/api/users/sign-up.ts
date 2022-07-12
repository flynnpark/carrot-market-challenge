import { NextApiRequest, NextApiResponse } from 'next';

import { hashPassword } from 'lib/server/bcrypt';
import withHandler from 'lib/server/withHandler';

interface SignUpRequest extends NextApiRequest {
  body: {
    name: string;
    username: string;
    password: string;
  };
}

async function handler(req: SignUpRequest, res: NextApiResponse) {
  const { name, username, password } = req.body;

  const user = await db.user.findUnique({
    where: {
      username,
    },
  });
  if (user) {
    res.status(400).json({
      success: false,
      message: 'Username already exists',
    });
    return;
  }

  const newUser = await db.user.create({
    data: {
      name,
      username,
      password: await hashPassword(password),
    },
    select: {
      id: true,
      name: true,
      username: true,
    },
  });

  res.status(201).json({
    success: true,
    result: newUser,
  });
}

export default withHandler({ methods: ['POST'], isPrivate: false }, handler);
