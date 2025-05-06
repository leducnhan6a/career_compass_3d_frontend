import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookies } from '@utils/cookies';

// Hàm tiện ích xử lý phản hồi
const sendResponse = (res: NextApiResponse, status: number, data: unknown) => {
    return res.status(status).json(data);
};

// Hàm xử lý đăng ký người dùng
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Kiểm tra phương thức HTTP
    if (req.method !== 'POST') {
        return sendResponse(res, 405, { message: 'Method not allowed' });
    }

    const { email, username, displayname, password, gender } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!email || !username || !displayname || !password || !gender) {
        return sendResponse(res, 400, { message: 'Bad request. Missing required fields.' });
    }

    try {
        // Gửi yêu cầu đăng ký đến backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/api/v1/access/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        // Đọc dữ liệu trả về từ backend
        const data = await response.json();

        const { metadata } = data;
        const { tokens, user } = metadata;
        // Set cookie với token và thông tin người dùng
        setCookies(res, [
            { name: 'token', value: tokens },
            { name: 'role', value: user.user_permission },
            { name: 'userId', value: user._id, options: { httpOnly: false } },
        ]);

        // Kiểm tra nếu API trả về lỗi
        if (!response.ok) {
            return sendResponse(res, response.status, data);
        }

        // Nếu đăng ký thành công, trả về kết quả
        return sendResponse(res, 201, data);
    } catch (error) {
        // Log lỗi và gửi phản hồi lỗi
        console.error('Signup error:', error);
        return sendResponse(res, 500, { message: 'Internal server error', error: error });
    }
}
