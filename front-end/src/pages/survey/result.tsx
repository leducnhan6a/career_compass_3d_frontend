import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, ChartDataLabels)

interface GroupScore {
    groupScore: number
    percentage: number
}

interface Trait {
    group: string
    score: number
    percentage: number
}

const SurveyResultPage = () => {
    const [cookies] = useCookies(['userId'])
    const [result, setResult] = useState<{
        hollandCode: string
        groupScores: Record<string, GroupScore>
        top3Traits: Trait[]
        totalScore: number
        maxScore: number
        totalQuestions: number
    } | null>(null)
    const router = useRouter()

    useEffect(() => {
        const storedAnswers = localStorage.getItem('pendingAnswers')

        if (!storedAnswers) {
            alert('Không có kết quả khảo sát để hiển thị!')
            router.push('/survey') // Chuyển hướng về trang khảo sát nếu không có kết quả
            return
        }

        const answers = JSON.parse(storedAnswers)

        // Giả sử bạn cần gửi kết quả đến API để tính toán mã Holland Code
        const calculateResult = async () => {
            try {
                const res = await fetch('/api/v1/survey/result', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: cookies.userId,
                        answers: answers
                    })
                })
                const data = await res.json()

                if (res.ok && data.metadata) {
                    setResult(data.metadata)
                } else {
                    alert(data.message || 'Có lỗi xảy ra khi tải kết quả.')
                }
            } catch (err) {
                console.error('Lỗi khi tính toán kết quả:', err)
                alert('Lỗi kết nối khi tải kết quả.')
            }
        }

        calculateResult()
    }, [router])

    if (!result) {
        return <div className="text-center">Đang tải kết quả...</div>
    }

    // Data for Pie Chart
    const groupScoresData = Object.keys(result.groupScores).map(group => ({
        label: group,
        score: result.groupScores[group]
    }))

    console.log('Group Scores Data:', groupScoresData);

    const chartData = {
        labels: groupScoresData.map(data => data.label),
        datasets: [
            {
                data: groupScoresData.map(data => data.score),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#FF5733'
                ],
                hoverOffset: 4
            }
        ]
    }

    const chartOptions = {
        plugins: {
            datalabels: {
                color: '#fff',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter: (value: number, context: any) => {
                    const total = context.chart._metasets[0].total
                    const percentage = (value / total * 100).toFixed(2) + '%'
                    return percentage
                }
            }
        }
    }

    // Phân tích Holland Code
    const hollandCodeAnalysis = {
        E: 'Enterprising (Lãnh đạo, thuyết phục và đạt được mục tiêu)',
        R: 'Realistic (Thực tế, thích làm việc với công cụ và thiết bị)',
        C: 'Conventional (Công việc có cấu trúc, quy trình và dữ liệu)',
    }

    // Function to download result as JSON
    const downloadResult = () => {
        window.print();
    }

    return (
        <div className="max-w-4xl mx-auto p-8 space-y-10">
            <div className="text-center">
                <h1 className="text-2xl font-semibold">Kết quả khảo sát</h1>
                <p className="text-sm text-gray-500 mt-2">Holland Code: <span className="font-semibold">{result.hollandCode}</span></p>
                <p className="text-sm text-gray-500 mt-2">
                    Phân tích: {hollandCodeAnalysis[result.hollandCode[0] as keyof typeof hollandCodeAnalysis] || 'Không xác định'}
                </p>
            </div>

            <div className="text-center">
                <p className="text-sm text-gray-500">
                    Tổng điểm: {result.totalScore} / {result.maxScore}
                </p>
                <p className="text-sm text-gray-500">Số câu hỏi: {result.totalQuestions}</p>
            </div>

            <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-800">Top 3 nhóm nổi bật</h2>
                <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6">
                    {result.top3Traits.map((trait) => (
                        <div key={trait.group} className="bg-white rounded-xl shadow-md p-6 space-y-4 border border-gray-100">
                            <p className="text-xl font-semibold text-gray-800">{trait.group}</p>
                            <p className="text-lg text-gray-700">Điểm: {trait.score}</p>
                            <p className="text-sm text-gray-500">Tỷ lệ: {trait.percentage}%</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-800">Biểu đồ điểm số của các nhóm</h2>
                <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto flex justify-center items-center border border-gray-100">
                    <Pie data={chartData} options={chartOptions} />
                </div>
            </div>






            <div className="text-center">
                <button
                    className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition-all duration-200 print:hidden"
                    onClick={downloadResult}
                >
                    Tải kết quả
                </button>
            </div>
        </div>
    )
}

export default SurveyResultPage
