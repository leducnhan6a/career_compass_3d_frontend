// src/pages/api/v1/access/logout.ts
import { clearCookies, getCookie } from '@utils/cookies'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const token = getCookie(req, 'token')
        const userId = getCookie(req, 'userId')

        if (!token || !userId) {
            return res.status(400).json({ message: 'Missing token or user ID' })
        }

        try {
            // Gửi yêu cầu đến backend để logout
            const backendRes = await fetch(`${process.env.API_END_POINT}/api/v1/access/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'x-client-id': userId,
                }
            })

            const data = await backendRes.json()
            console.log('Logout response:', data)

            if (!backendRes.ok) {
                return res.status(backendRes.status).json(data)
            }

            // Xóa cookies sau khi logout
            clearCookies(res, ['token', 'role', 'userId'])

            return res.status(200).json({
                message: 'Logged out successfully',
                statusCode: 200,
            })
        } catch (err) {
            console.error(err)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    if (req.method === 'GET') {
        // Trả về giá trị của các cookie
        const token = getCookie(req, 'token')
        const userId = getCookie(req, 'userId')
        const role = getCookie(req, 'role')

        return res.status(200).json({
            token: token || null,
            userId: userId || null,
            role: role || null,
        })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
}
