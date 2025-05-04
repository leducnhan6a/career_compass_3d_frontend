import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from '@utils/cookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    const token = getCookie(req, 'token')
    const userId = getCookie(req, 'userId')

    if (!token || !userId) {
        return res.status(401).json({ message: 'Unauthorized: Missing credentials' })
    }

    const { sort = '' } = req.query

    try {
        const url = new URL(`${process.env.API_END_POINT}/api/v1/survey/trash`)
        if (sort) url.searchParams.append('sort', sort.toString())

        const backendRes = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: token,
                'x-client-id': userId,
            },
        })

        const data = await backendRes.json()

        if (!backendRes.ok) {
            return res.status(backendRes.status).json(data)
        }

        return res.status(200).json(data)
    } catch (err) {
        console.error('Error fetching deleted questions:', err)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
