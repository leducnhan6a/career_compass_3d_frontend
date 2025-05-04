import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookies } from '@utils/cookies'

/**
 * Hàm trả về phản hồi chuẩn cho API.
 * @param res Response đối tượng
 * @param statusCode Mã trạng thái HTTP
 * @param message Thông báo chi tiết
 * @param data Dữ liệu đi kèm
 */
const sendResponse = (res: NextApiResponse, statusCode: number, message: string, data?: unknown) => {
    return res.status(statusCode).json({
        message,
        statusCode,
        data,
    })
}

/**
 * Hàm xử lý đăng nhập
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return sendResponse(res, 405, 'Method Not Allowed')
    }

    const { username, password } = req.body

    if (!username || !password) {
        return sendResponse(res, 400, 'Username and password are required')
    }

    try {
        // Gửi yêu cầu đăng nhập đến backend
        const backendRes = await fetch(`${process.env.API_END_POINT}/api/v1/access/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ username, password }), // Đảm bảo gửi đúng dữ liệu
        })

        const data = await backendRes.json()

        // Kiểm tra nếu phản hồi từ backend không thành công
        if (!backendRes.ok) {
            return sendResponse(res, backendRes.status, data.message || 'Login failed', data)
        }

        const { metadata } = data
        const { tokens, user } = metadata

        // Set cookie với token và thông tin người dùng
        setCookies(res, [
            { name: 'token', value: tokens },
            { name: 'role', value: user.user_permission },
            { name: 'userId', value: user._id, options: { httpOnly: false } },
        ])

        // Trả về phản hồi thành công
        return sendResponse(res, 200, 'Login successful', metadata)
    } catch (err) {
        console.error('Login error:', err)
        return sendResponse(res, 500, 'Internal server error')
    }
}
