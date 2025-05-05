import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    const { page = 1, limit = 10 } = req.query

    try {
        const url = new URL(`${process.env.API_END_POINT}/api/v1/survey/questionsSurvey`)
        console.log('URL:', url.toString());

        url.searchParams.append('page', page.toString())
        url.searchParams.append('limit', limit.toString())

        const backendRes = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })

        const data = await backendRes.json()

        if (!backendRes.ok) {
            return res.status(backendRes.status).json(data)
        }

        return res.status(200).json(data)
    } catch (err) {
        console.error('Error fetching questionsSurvey:', err)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
