import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookies } from '@utils/cookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    try {
        const backendRes = await fetch(`${process.env.API_END_POINT}/api/v1/access/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(req.body),
        })

        const data = await backendRes.json()

        if (!backendRes.ok) {
            return res.status(backendRes.status).json(data)
        }

        const { metadata } = data
        const { tokens, user } = metadata

        setCookies(res, [
            { name: 'token', value: tokens },
            { name: 'role', value: user.user_permission },
            { name: 'userId', value: user._id, options: { httpOnly: false } }
        ])

        return res.status(200).json({
            message: 'Login successful',
            statusCode: 200,
            metadata,
        })
    } catch (err) {
        console.error('Login error:', err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}
