import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels'
import BackButton from '@components/UI/BackButton'

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
interface Major {
    _id: string
    uni_code: string
    major_name: string
    major_standard_score: number
    major_aptitude_trends: string[]
}


const SurveyResultPage = () => {
    const [cookies] = useCookies(['userId', 'token'])
    const [result, setResult] = useState<{
        hollandCode: string
        groupScores: Record<string, GroupScore>
        top3Traits: Trait[]
        totalScore: number
        maxScore: number
        totalQuestions: number
    } | null>(null)
    const [majors, setMajors] = useState<Major[]>([])
    const [loadingMajors, setLoadingMajors] = useState(false)
    const [errorMajors, setErrorMajors] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const storedAnswers = localStorage.getItem('pendingAnswers')

        if (!storedAnswers) {
            alert('Không có kết quả khảo sát để hiển thị!')
            router.push('/survey')
            return
        }

        const answers = JSON.parse(storedAnswers)

        const calculateResult = async () => {
            try {
                const res = await fetch('/api/v1/survey/result', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
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
    }, [router, cookies.userId])

    // Gọi API ngành học theo Holland Code
    useEffect(() => {
        const fetchMajors = async () => {
            if (!result?.hollandCode) return

            setLoadingMajors(true)
            try {
                const res = await fetch(`/api/v1/majors/aptitude?traits=${result.hollandCode}`)
                const data = await res.json()

                if (res.ok && Array.isArray(data.metadata?.fullMatched)) {
                    setMajors(data.metadata.fullMatched)
                } else {
                    setErrorMajors(data.message || 'Không thể tải ngành học.')
                }

            } catch (err) {
                console.error('Lỗi khi tải ngành học:', err)
                setErrorMajors('Lỗi kết nối khi tải ngành học.')
            } finally {
                setLoadingMajors(false)
            }
        }

        fetchMajors()
    }, [result?.hollandCode])

    if (!result) {
        return <div className="text-center mt-20 text-gray-500">Đang tải kết quả...</div>
    }

    const groupScoresData = Object.keys(result.groupScores).map(group => ({
        label: group,
        score: result.groupScores[group].groupScore
    }))

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
                formatter: (value: number, context: unknown) => {
                    const { chart } = context as Context
                    const total = chart.data.datasets[0].data
                        .filter((value): value is number => typeof value === 'number' && value !== null)
                        .reduce((a: number, b: number) => a + b, 0)
                    const percentage = ((value / total) * 100).toFixed(2) + '%'
                    return percentage
                }
            }
        }
    }

    const hollandCodeAnalysis = {
        E: 'Enterprising (Lãnh đạo, thuyết phục và đạt được mục tiêu)',
        R: 'Realistic (Thực tế, thích làm việc với công cụ và thiết bị)',
        C: 'Conventional (Công việc có cấu trúc, quy trình và dữ liệu)',
        I: 'Investigative (Phân tích, khám phá, tìm hiểu)',
        A: 'Artistic (Sáng tạo, nghệ thuật, trực giác)',
        S: 'Social (Giúp đỡ, giao tiếp, hợp tác)'
    }

    const downloadResult = () => {
        window.print()
    }

    return (
        <div className="max-w-4xl mx-auto p-8 space-y-10">
            <BackButton onClick={
                result ? () => router.push('/') : undefined
            } />

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

            {loadingMajors && (
                <div className="text-center text-gray-500 flex justify-center items-center gap-2">
                    {/* <Loader2 className="animate-spin w-4 h-4" /> */}
                    Đang tải danh sách ngành học phù hợp...
                </div>
            )}

            {!loadingMajors && majors.length > 0 && (
                <div className="text-center space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800">Ngành học phù hợp với Holland Code</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        {majors.map((major) => (
                            <div key={major._id} className="bg-white p-4 rounded-md shadow border border-gray-100 text-left">
                                <h3 className="text-md font-semibold text-blue-700">{major.major_name}</h3>
                                <p className="text-sm text-gray-600">Trường: {major.uni_code}</p>
                                <p className="text-sm text-gray-600">Điểm chuẩn: {major.major_standard_score}</p>
                                <p className="text-sm text-gray-500">
                                    Holland Code: <span className="font-medium">{major.major_aptitude_trends.join(', ')}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!loadingMajors && errorMajors && (
                <p className="text-center text-sm text-red-500">{errorMajors}</p>
            )}

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
