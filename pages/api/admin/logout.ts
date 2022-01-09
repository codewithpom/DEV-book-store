import type { NextApiRequest, NextApiResponse } from 'next'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Set-Cookie', 'credentials=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    res.redirect('/');
}