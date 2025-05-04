import { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from '@utils/cookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { majorId } = req.query

    // Kiểm tra nếu là phương thức PUT
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    // Kiểm tra xác thực
    const token = getCookie(req, 'token')
    const userId = getCookie(req, 'userId')

    if (!token || !userId) {
        return res.status(401).json({ message: 'Unauthorized - Missing token or userId' })
    }

    // Lấy dữ liệu từ body yêu cầu
    const { uni_code, major_name, major_standard_score, major_aptitude_trends } = req.body

    // Kiểm tra các trường cần thiết
    if (!uni_code || !major_name || !major_standard_score || !major_aptitude_trends) {
        return res.status(400).json({ message: 'Missing required fields' })
    }

    try {
        // Gửi yêu cầu PUT tới API backend để cập nhật ngành học
        const backendRes = await fetch(`${process.env.API_END_POINT}/api/v1/major/update/${majorId}`, {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'x-client-id': userId,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uni_code,
                major_name,
                major_standard_score,
                major_aptitude_trends,
            }),
        })

        const data = await backendRes.json()

        // Kiểm tra phản hồi từ API backend
        if (!backendRes.ok) {
            return res.status(backendRes.status).json(data)
        }

        // Trả về thành công nếu cập nhật thành công
        return res.status(200).json({
            message: 'Major updated successfully',
            data: data,
        })
    } catch (error) {
        console.error('Error updating major:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
