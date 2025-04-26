import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Kiểm tra phương thức HTTP
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        // Gửi yêu cầu đăng ký đến backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/api/v1/access/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        })

        // Đọc dữ liệu trả về từ backend
        const data = await response.json()

        // Nếu response không thành công (status khác 2xx), trả lại mã lỗi
        if (!response.ok) {
            return res.status(response.status).json(data)
        }

        // Nếu đăng ký thành công, trả về kết quả
        return res.status(200).json(data)
    } catch (error) {
        // Xử lý lỗi nếu có vấn đề trong quá trình gọi API
        console.error('Signup error:', error)
        return res.status(500).json({ message: 'Internal server error', error: error })
    }
}
