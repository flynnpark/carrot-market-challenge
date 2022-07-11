import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiHandler } from 'next';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOption = {
  cookieName: 'nomadsession',
  password: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
};

export function withApiSession(fn: NextApiHandler) {
  return withIronSessionApiRoute(fn, cookieOption);
}
