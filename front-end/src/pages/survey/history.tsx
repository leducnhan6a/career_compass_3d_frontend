import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface GroupScore {
    groupScore: number
    percentage: number
}

interface SurveyHistoryItem {
    _id: string
    timestamp: string
    metadata: {
        hollandCode: string
        groupScores: Record<string, GroupScore>
        createdAt: string
    }
}

export default function SurveyHistoryPage() {
    const [history, setHistory] = useState<SurveyHistoryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch('/api/v1/survey/history')
                const data = await res.json()

                if (res.ok && Array.isArray(data.metadata)) {
                    setHistory(data.metadata)
                } else {
                    setError(data.message || 'Không thể tải dữ liệu.')
                }
            } catch (err) {
                console.error('Fetch error:', err)
                setError('Lỗi kết nối đến máy chủ.')
            } finally {
                setLoading(false)
            }
        }

        fetchHistory()
    }, [])

    if (loading) {
        return <p className="text-center text-gray-500 mt-10">Đang tải lịch sử khảo sát...</p>
    }

    if (error) {
        return <p className="text-center text-red-500 mt-10">{error}</p>
    }

    if (history.length === 0) {
        return <p className="text-center text-gray-600 mt-10">Bạn chưa thực hiện khảo sát nào.</p>
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-4">Lịch sử khảo sát</h1>

            {history.map((item) => (
                <div key={item._id} className="p-4 border rounded-lg shadow hover:shadow-md transition">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-lg font-medium">
                                Mã Holland: <span className="font-bold">{item.metadata.hollandCode}</span>
                            </p>
                            <p className="text-sm text-gray-500">
                                Ngày: {new Date(item.metadata.createdAt || item.timestamp).toLocaleString()}
                            </p>
                        </div>
                        <button
                            className="text-blue-600 hover:underline text-sm"
                            onClick={() => router.push(`/survey/result?id=${item._id}`)}
                        >
                            Xem chi tiết
                        </button>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-700">
                        {Object.entries(item.metadata.groupScores).map(([code, { groupScore }]) => (
                            <span key={code} className="bg-gray-100 px-2 py-1 rounded">
                                {code}: {groupScore}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
