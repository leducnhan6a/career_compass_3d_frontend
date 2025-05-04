import { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from '@utils/cookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { questionId } = req.query

    if (req.method !== 'PATCH') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    const token = getCookie(req, 'token')
    const userId = getCookie(req, 'userId')

    if (!token || !userId) {
        return res.status(401).json({ message: 'Unauthorized: Missing credentials' })
    }

    try {
        const backendRes = await fetch(
            `${process.env.API_END_POINT}/api/v1/survey/questions/${questionId}/restore`,
            {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    Authorization: token,
                    'x-client-id': userId,
                },
            }
        )

        const data = await backendRes.json()

        return res.status(backendRes.status).json(data)
    } catch (err) {
        console.error('Error restoring survey question:', err)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
