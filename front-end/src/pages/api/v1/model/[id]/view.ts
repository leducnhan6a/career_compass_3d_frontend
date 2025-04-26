// src/pages/api/v1/model/[id]/view.ts

import { getCookie } from '@utils/cookies'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query

    if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Model ID must be a string' })
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    const token = getCookie(req, 'token')
    const userId = getCookie(req, 'userId')

    if (!token || !userId) {
        return res.status(400).json({ message: 'Missing token or user ID' })
    }

    try {
        const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/api/v1/model/${id}`, {
            method: 'GET',
            headers: {
                'authorization': token,
                'x-client-id': userId,
                'modelId': id,
            },
        })

        const data = await backendRes.json()
        return res.status(backendRes.status).json(data)
    } catch (err) {
        console.error('Error fetching signed URL:', err)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
