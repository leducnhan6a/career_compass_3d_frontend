// src/pages/api/v1/access/logout.ts
import { clearCookies, getCookie } from '@utils/cookies'
import type { NextApiRequest, NextApiResponse } from 'next'

const sendResponse = (res: NextApiResponse, statusCode: number, message: string, data?: unknown) => {
    return res.status(statusCode).json({ message, statusCode, data })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST': {
            const token = getCookie(req, 'token')
            const userId = getCookie(req, 'userId')

            if (!token || !userId) {
                return sendResponse(res, 400, 'Missing token or user ID')
            }

            try {
                const backendRes = await fetch(`${process.env.API_END_POINT}/api/v1/access/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'x-client-id': userId,
                    }
                })

                const data = await backendRes.json()

                if (!backendRes.ok) {
                    return sendResponse(res, backendRes.status, data.message || 'Logout failed', data)
                }

                // Xóa cookies sau khi logout
                clearCookies(res, ['token', 'role', 'userId'])

                return sendResponse(res, 200, 'Logged out successfully')
            } catch (err) {
                console.error('Logout error:', err)
                return sendResponse(res, 500, 'Internal server error')
            }
        }

        case 'GET': {
            // Trả về thông tin từ cookie nếu cần debug client-side
            return res.status(200).json({
                token: getCookie(req, 'token') || null,
                userId: getCookie(req, 'userId') || null,
                role: getCookie(req, 'role') || null,
            })
        }

        default:
            return sendResponse(res, 405, 'Method Not Allowed')
    }
}
