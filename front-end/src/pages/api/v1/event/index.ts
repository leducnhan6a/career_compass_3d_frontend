import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from '@utils/cookies'

const sendResponse = (res: NextApiResponse, statusCode: number, message: string, data?: unknown) => {
    return res.status(statusCode).json({ message, statusCode, metadata: data })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return sendResponse(res, 405, 'Method Not Allowed')
    }

    const token = getCookie(req, 'token')
    const userId = getCookie(req, 'userId')

    if (!token || !userId) {
        return sendResponse(res, 401, 'Unauthorized: Missing token or user ID')
    }

    try {
        // Gọi API backend để lấy tất cả các sự kiện
        const backendRes = await fetch(`${process.env.API_END_POINT}/api/v1/event`, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'x-client-id': userId,
            },
        })

        const data = await backendRes.json()

        if (!backendRes.ok) {
            return sendResponse(res, backendRes.status, data.message || 'Failed to get events', data)
        }

        return sendResponse(res, 200, 'All events retrieved successfully', data.metadata)
    } catch (err) {
        console.error('Error retrieving events:', err)
        return sendResponse(res, 500, 'Internal server error')
    }
}
