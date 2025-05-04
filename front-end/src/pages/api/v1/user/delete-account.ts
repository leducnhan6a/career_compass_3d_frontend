import type { NextApiRequest, NextApiResponse } from 'next'
import { clearCookies, getCookie } from '@utils/cookies'

const sendResponse = (res: NextApiResponse, statusCode: number, message: string, data?: unknown) => {
    return res.status(statusCode).json({ message, statusCode, metadata: data })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return sendResponse(res, 405, 'Method Not Allowed')
    }

    const token = getCookie(req, 'token')
    const userId = getCookie(req, 'userId')

    if (!token || !userId) {
        return sendResponse(res, 401, 'Unauthorized: Missing token or user ID')
    }

    try {
        const backendRes = await fetch(`${process.env.API_END_POINT}/api/v1/access`, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'x-client-id': userId,
                'Accept': 'application/json',
            },
        })

        const data = await backendRes.json()

        if (!backendRes.ok) {
            return sendResponse(res, backendRes.status, data.message || 'Failed to delete account', data)
        }

        // Sau khi xóa, xoá cookies
        clearCookies(res, ['token', 'role', 'userId'])

        return sendResponse(res, 200, 'Account deleted successfully', data.metadata)
    } catch (err) {
        console.error('Delete account error:', err)
        return sendResponse(res, 500, 'Internal server error')
    }
}
