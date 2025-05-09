import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from '@utils/cookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    const token = getCookie(req, 'token')
    const userId = getCookie(req, 'userId')

    if (!token || !userId) {
        return res.status(401).json({ message: 'Unauthorized: Missing credentials' })
    }

    const { answers } = req.body

    if (!Array.isArray(answers) || answers.some(a => typeof a.group !== 'string' || typeof a.value !== 'number')) {
        return res.status(400).json({ message: 'Invalid answers format. Expected array of { group, value }' })
    }

    try {
        const backendRes = await fetch(`${process.env.API_END_POINT}/api/v1/survey/result`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token,
                'x-client-id': userId,
            },
            body: JSON.stringify({
                userId,
                answers,
            }),
        })

        const data = await backendRes.json()

        if (!backendRes.ok) {
            return res.status(backendRes.status).json(data)
        }

        return res.status(200).json(data)
    } catch (err) {
        console.error('Error processing survey result:', err)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
