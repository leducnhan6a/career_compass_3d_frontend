import { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from '@utils/cookies'

const handleDelete = async (req: NextApiRequest, res: NextApiResponse, questionId: string) => {
    const token = getCookie(req, 'token')
    const userId = getCookie(req, 'userId')

    if (!token || !userId) {
        return res.status(401).json({ message: 'Unauthorized: Missing credentials' })
    }

    try {
        const backendRes = await fetch(
            `${process.env.API_END_POINT}/api/v1/survey/questions/${questionId}`,
            {
                method: 'DELETE',
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
        console.error('Error deleting survey question:', err)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

const handlePut = async (req: NextApiRequest, res: NextApiResponse, questionId: string) => {
    const { question_text, question_code } = req.body
    const token = getCookie(req, 'token')
    const userId = getCookie(req, 'userId')

    if (!token || !userId) {
        return res.status(401).json({ message: 'Unauthorized: Missing credentials' })
    }

    try {
        const backendRes = await fetch(
            `${process.env.API_END_POINT}/api/v1/survey/questions/${questionId}`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    Authorization: token,
                    'x-client-id': userId,
                },
                body: JSON.stringify({
                    question_text,
                    question_code,
                }),
            }
        )

        const data = await backendRes.json()

        return res.status(backendRes.status).json(data)
    } catch (err) {
        console.error('Error updating survey question:', err)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { questionId } = req.query

    if (!questionId || typeof questionId !== 'string') {
        return res.status(400).json({ message: 'Bad Request: Missing or invalid questionId' })
    }

    switch (req.method) {
        case 'DELETE':
            return handleDelete(req, res, questionId)
        case 'PUT':
            return handlePut(req, res, questionId)
        default:
            return res.status(405).json({ message: 'Method Not Allowed' })
    }
}
