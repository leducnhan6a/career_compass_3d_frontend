// src/pages/api/v1/model/index.ts
import { getCookie } from '@utils/cookies'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    const token = getCookie(req, 'token')
    const userId = getCookie(req, 'userId')

    if (!token || !userId) {
        return res.status(400).json({ message: 'Missing token or user ID' })
    }

    try {
        const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/api/v1/model`, {
            method: 'GET',
            headers: {
                'authorization': token,
                'x-client-id': userId,
            },
        })
        console.log('Fetch response:', backendRes);

        const data = await backendRes.json()
        return res.status(backendRes.status).json(data)
    } catch (err) {
        console.error('Fetch error:', err)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
