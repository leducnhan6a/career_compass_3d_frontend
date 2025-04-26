import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    try {
        const { limit = '10', page = '1' } = req.query

        const queryParams = new URLSearchParams()
        queryParams.set('limit', limit.toString())
        queryParams.set('page', page.toString())

        const url = `${process.env.API_END_POINT}/api/v1/survey/questionsSurvey?${queryParams.toString()}`

        const backendRes = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })

        const data = await backendRes.json()

        return res.status(backendRes.status).json(data)
    } catch (error) {
        console.error('Error fetching questionsSurvey:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
