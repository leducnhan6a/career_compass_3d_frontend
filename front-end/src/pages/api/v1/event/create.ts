import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from '@utils/cookies'

const sendResponse = (res: NextApiResponse, statusCode: number, message: string, data?: unknown) => {
    return res.status(statusCode).json({ message, statusCode, metadata: data })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return sendResponse(res, 405, 'Method Not Allowed')
    }

    const token = getCookie(req, 'token')
    const userId = getCookie(req, 'userId')

    if (!token || !userId) {
        return sendResponse(res, 401, 'Unauthorized: Missing token or user ID')
    }

    const { source, title, url, thumbnail, publishedAt } = req.body

    // Kiểm tra dữ liệu đầu vào
    if (!source || !title || !url || !thumbnail || !publishedAt) {
        return sendResponse(res, 400, 'Bad Request: Missing required fields')
    }

    try {
        // Gửi yêu cầu tới API backend để tạo sự kiện mới
        const backendRes = await fetch(`${process.env.API_END_POINT}/api/v1/event/create`, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'x-client-id': userId,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                source,
                title,
                url,
                thumbnail,
                publishedAt,
            }),
        })

        const data = await backendRes.json()

        if (!backendRes.ok) {
            return sendResponse(res, backendRes.status, data.message || 'Failed to create event', data)
        }

        return sendResponse(res, 201, 'Event created successfully', data.metadata)
    } catch (err) {
        console.error('Error creating event:', err)
        return sendResponse(res, 500, 'Internal server error')
    }
}
