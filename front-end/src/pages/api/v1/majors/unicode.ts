import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from '@utils/cookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    const token = getCookie(req, 'token')
    const userId = getCookie(req, 'userId')
    const uni_code = req.query.uni_code as string

    if (!token || !userId) {
        return res.status(401).json({ message: 'Unauthorized - Missing token or userId' })
    }

    if (!uni_code) {
        return res.status(400).json({ message: 'Missing university code (uni_code)' })
    }

    try {
        const backendRes = await fetch(`${process.env.API_END_POINT}/api/v1/major/unicode?uni_code=${uni_code}`, {
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
        console.error('Error fetching majors by uni_code:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
