import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from '@utils/cookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    const token = getCookie(req, 'token')
    const userId = getCookie(req, 'userId')

    if (!token || !userId) {
        return res.status(401).json({ message: 'Unauthorized - Missing token or userId' })
    }

    const { uni_code, major_name, major_standard_score, major_aptitude_trends } = req.body

    if (!uni_code || !major_name || !major_standard_score || !major_aptitude_trends) {
        return res.status(400).json({ message: 'Missing required fields' })
    }

    try {
        const backendRes = await fetch(`${process.env.API_END_POINT}/api/v1/major/create`, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'x-client-id': userId,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uni_code,
                major_name,
                major_standard_score,
                major_aptitude_trends,
            }),
        })

        const data = await backendRes.json()

        if (!backendRes.ok) {
            return res.status(backendRes.status).json(data)
        }

        return res.status(201).json({
            message: 'Major created successfully',
            data: data,
        })
    } catch (error) {
        console.error('Error creating major:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
