import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  console.log(req);
  res.json({
    success: true,
  });
};

export default handler;
