import { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from '@utils/cookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { majorId } = req.query

    // Kiểm tra nếu là phương thức PATCH
    if (req.method !== 'PATCH') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    // Kiểm tra xác thực
    const token = getCookie(req, 'token')
    const userId = getCookie(req, 'userId')

    if (!token || !userId) {
        return res.status(401).json({ message: 'Unauthorized - Missing token or userId' })
    }

    try {
        // Gửi yêu cầu PATCH tới API backend để xóa mềm ngành học
        const backendRes = await fetch(`${process.env.API_END_POINT}/api/v1/major/${majorId}/delete`, {
            method: 'PATCH',
            headers: {
                'Authorization': token,
                'x-client-id': userId,
            },
        })

        const data = await backendRes.json()

        // Kiểm tra phản hồi từ API backend
        if (!backendRes.ok) {
            return res.status(backendRes.status).json(data)
        }

        // Trả về thành công nếu xóa mềm thành công
        return res.status(200).json({
            message: 'Major deleted soft (hidden)',
            data: data,
        })
    } catch (error) {
        console.error('Error soft deleting major:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
