import { NextApiRequest, NextApiResponse } from 'next'

// Tính toán điểm của từng nhóm trong bảng kết quả
const calculateGroupScores = (answers: { group: string, value: number }[]) => {
    const groupScores: Record<string, number> = {
        R: 0,
        I: 0,
        A: 0,
        E: 0,
        C: 0,
        S: 0,
    }

    // Cộng điểm vào từng nhóm
    answers.forEach(answer => {
        if (groupScores[answer.group] !== undefined) {
            groupScores[answer.group] += answer.value
        }
    })

    return groupScores
}

// Tính tỷ lệ phần trăm cho mỗi nhóm
const calculateGroupPercentages = (groupScores: Record<string, number>, totalScore: number) => {
    const groupPercentages: Record<string, number> = {}
    Object.keys(groupScores).forEach(group => {
        groupPercentages[group] = totalScore ? Math.round((groupScores[group] / totalScore) * 100) : 0
    })
    return groupPercentages
}

// Xác định top 3 nhóm có điểm cao nhất
const getTop3Traits = (groupScores: Record<string, number>, groupPercentages: Record<string, number>) => {
    const sortedGroups = Object.keys(groupScores)
        .map(group => ({
            group,
            score: groupScores[group],
            percentage: groupPercentages[group],
        }))
        .sort((a, b) => b.score - a.score || b.percentage - a.percentage)

    return sortedGroups.slice(0, 3)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { userId, answers } = req.body

            // Kiểm tra dữ liệu yêu cầu
            if (!userId || !answers || !Array.isArray(answers) || answers.length === 0) {
                return res.status(400).json({ message: 'Invalid request body', statusCode: 400 })
            }

            // Tính toán điểm các nhóm
            const groupScores = calculateGroupScores(answers)
            const totalScore = Object.values(groupScores).reduce((a, b) => a + b, 0)

            // Tính toán tỷ lệ phần trăm
            const groupPercentages = calculateGroupPercentages(groupScores, totalScore)

            // Lấy top 3 nhóm
            const top3Traits = getTop3Traits(groupScores, groupPercentages)

            // Xác định mã Holland
            const hollandCode = top3Traits.map(trait => trait.group).join('')

            // Phản hồi về kết quả
            return res.status(200).json({
                message: 'Solve survey result successfully',
                statusCode: 200,
                metadata: {
                    hollandCode,
                    groupScores,
                    top3Traits,
                    totalScore,
                    maxScore: 25, // Tổng điểm tối đa (số câu hỏi * điểm tối đa)
                    totalQuestions: answers.length,
                    createdAt: new Date().toISOString(),
                },
            })
        } catch (err) {
            console.error('Error processing survey result:', err)
            return res.status(500).json({ message: 'Internal Server Error', statusCode: 500 })
        }
    }

    return res.status(405).json({ message: 'Method Not Allowed', statusCode: 405 })
}
