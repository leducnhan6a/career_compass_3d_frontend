import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from '@utils/cookies'

const sendResponse = (res: NextApiResponse, statusCode: number, message: string, data?: unknown) => {
    return res.status(statusCode).json({ message, statusCode, metadata: data })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PATCH') {
        // Return 405 if method is not PATCH
        return sendResponse(res, 405, 'Method Not Allowed')
    }
    const { scraperId } = req.query
    const token = getCookie(req, 'token')
    const userId = getCookie(req, 'userId')

    if (!scraperId || typeof scraperId !== 'string') {
        return sendResponse(res, 400, 'Bad Request: Missing or invalid scraperId')
    }

    if (!token || !userId) {
        return sendResponse(res, 401, 'Unauthorized: Missing token or user ID')
    }

    try {
        // Gửi yêu cầu đến backend để khôi phục sự kiện đã bị xóa mềm
        const backendRes = await fetch(`${process.env.API_END_POINT}/api/v1/event/${scraperId}/restore`, {
            method: 'PATCH',
            headers: {
                'Authorization': token,
                'x-client-id': userId,
            },
        })

        const data = await backendRes.json()

        if (!backendRes.ok) {
            return sendResponse(res, backendRes.status, data.message || 'Failed to restore event', data)
        }

        return sendResponse(res, 200, 'Event restored', data.metadata)
    } catch (err) {
        console.error('Error restoring event:', err)
        return sendResponse(res, 500, 'Internal server error')
    }

}
