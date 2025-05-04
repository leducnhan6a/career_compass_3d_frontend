import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from '@utils/cookies'

const sendResponse = (res: NextApiResponse, statusCode: number, message: string, data?: unknown) => {
    return res.status(statusCode).json({ message, statusCode, metadata: data })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { scraperId } = req.query
    const token = getCookie(req, 'token')
    const userId = getCookie(req, 'userId')

    if (!scraperId || typeof scraperId !== 'string') {
        return sendResponse(res, 400, 'Bad Request: Missing or invalid scraperId')
    }

    if (!token || !userId) {
        return sendResponse(res, 401, 'Unauthorized: Missing token or user ID')
    }

    // Check the method to determine the action (soft delete or permanently delete)
    if (req.method === 'PATCH') {
        // Soft delete event
        try {
            const backendRes = await fetch(`${process.env.API_END_POINT}/api/v1/event/${scraperId}/delete`, {
                method: 'PATCH',
                headers: {
                    'Authorization': token,
                    'x-client-id': userId,
                },
            })

            const data = await backendRes.json()

            if (!backendRes.ok) {
                return sendResponse(res, backendRes.status, data.message || 'Failed to soft delete event', data)
            }

            return sendResponse(res, 200, 'Event soft deleted', data.metadata)
        } catch (err) {
            console.error('Error soft deleting event:', err)
            return sendResponse(res, 500, 'Internal server error')
        }
    }

    if (req.method === 'DELETE') {
        // Permanently delete event
        try {
            const backendRes = await fetch(`${process.env.API_END_POINT}/api/v1/event/${scraperId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                    'x-client-id': userId,
                },
            })

            const data = await backendRes.json()

            if (!backendRes.ok) {
                return sendResponse(res, backendRes.status, data.message || 'Failed to permanently delete event', data)
            }

            return sendResponse(res, 200, 'Event permanently deleted', data.metadata)
        } catch (err) {
            console.error('Error deleting event:', err)
            return sendResponse(res, 500, 'Internal server error')
        }
    }

    // Return 405 if the method is neither PATCH nor DELETE
    return sendResponse(res, 405, 'Method Not Allowed')
}
