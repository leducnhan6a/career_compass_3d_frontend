import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from '@utils/cookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    const token = getCookie(req, 'token')
    const userId = getCookie(req, 'userId')
    const traits = req.query.traits as string

    if (!token || !userId) {
        return res.status(401).json({ message: 'Unauthorized - Missing token or userId' })
    }

    if (!traits) {
        return res.status(400).json({ message: 'Missing traits parameter' })
    }

    try {
        const backendRes = await fetch(`${process.env.API_END_POINT}/api/v1/major/aptitude?traits=${traits}`, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'x-client-id': userId,
            },
        })

        const data = await backendRes.json()

        if (!backendRes.ok) {
            return res.status(backendRes.status).json(data)
        }

        return res.status(200).json(data)
    } catch (error) {
        console.error('Error fetching majors by traits:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
