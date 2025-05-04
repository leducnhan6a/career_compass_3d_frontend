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

    const { group, question } = req.body

    if (!group || !question || typeof group !== 'string' || typeof question !== 'string') {
        return res.status(400).json({ message: 'Invalid request body. Required: group (R|I|A|S|E|C), question (string)' })
    }

    try {
        const backendRes = await fetch(`${process.env.API_END_POINT}/api/v1/survey/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token,
                'x-client-id': userId,
            },
            body: JSON.stringify({
                group,
                question,
            }),
        })

        const data = await backendRes.json()

        if (!backendRes.ok) {
            return res.status(backendRes.status).json(data)
        }

        return res.status(201).json(data)
    } catch (err) {
        console.error('Error creating question:', err)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
