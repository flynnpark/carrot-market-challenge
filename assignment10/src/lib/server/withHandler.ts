import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

type RequestMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS';

export interface ResponseType {
  success: boolean;
  [key: string]: any;
}

interface WithHandlerConfig {
  handler: NextApiHandler<ResponseType>;
  methods: RequestMethod[];
  isPrivate?: boolean;
}

const withHandler = ({
  handler,
  methods,
  isPrivate = false,
}: WithHandlerConfig) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (isPrivate && !req.session.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    if (req.method && !methods.includes(req.method as RequestMethod)) {
      return res.status(405).json({
        success: false,
        message: 'Method not allowed',
      });
    }

    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };
};

export default withHandler;
