import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

interface Question {
    question_code: string
    question_text: string
}

interface Answer {
    group: string
    value: number
}

const COLOR_TAILWIND = {
    1: {
        base: 'bg-red-100 border-red-400 text-red-700',
        selected: 'bg-red-500 border-red-700 text-white',
    },
    2: {
        base: 'bg-yellow-100 border-yellow-400 text-yellow-700',
        selected: 'bg-yellow-500 border-yellow-700 text-white',
    },
    3: {
        base: 'bg-gray-200 border-gray-400 text-gray-700',
        selected: 'bg-gray-500 border-gray-700 text-white',
    },
    4: {
        base: 'bg-green-100 border-green-400 text-green-700',
        selected: 'bg-green-500 border-green-700 text-white',
    },
    5: {
        base: 'bg-emerald-100 border-emerald-400 text-emerald-700',
        selected: 'bg-emerald-500 border-emerald-700 text-white',
    }
} as const

export default function TakeTestPage() {
    const [questions, setQuestions] = useState<Question[]>([])
    const [answers, setAnswers] = useState<Record<number, number>>({})
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [cookies] = useCookies(['userId'])

    const LIMIT = 10
    const TOTAL_QUESTIONS = 60
    const TOTAL_PAGES = Math.round(TOTAL_QUESTIONS / LIMIT) as number

    const fetchPage = async (page: number) => {
        try {
            const res = await fetch(`/api/v1/survey/questionsSurvey?limit=${LIMIT}&page=${page}`)
            const data = await res.json()
            if (res.ok && data.metadata) {
                setQuestions((prev) => [...prev, ...data.metadata])
            } else {
                console.warn(`Lỗi tải trang ${page}`, data.message)
            }
        } catch (err) {
            console.error(`Lỗi kết nối khi tải trang ${page}`, err)
        }
    }

    useEffect(() => {
        setLoading(true)
        const fetchAllPages = async () => {
            for (let page = 1; page <= TOTAL_PAGES; page++) {
                await fetchPage(page)
            }
        }
        fetchAllPages().finally(() => {
            // Sau khi tải hết câu hỏi, mới kiểm tra pending answers
            const pending = localStorage.getItem('pendingAnswers')
            if (pending) {
                try {
                    const parsed: Answer[] = JSON.parse(pending)
                    const restoredAnswers: Record<number, number> = {}

                    parsed.forEach((ans, idx) => {
                        restoredAnswers[idx] = ans.value
                    })

                    setAnswers(restoredAnswers)
                    console.log('Đã khôi phục đáp án từ localStorage')
                    setTimeout(() => {
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
                    }, 300)
                } catch (err) {
                    console.error('Lỗi khi parse pendingAnswers:', err)
                }
            }

            setLoading(false)
        })
    }, [])

    const handleChange = (index: number, value: number) => {
        console.log(`Selected value ${value} for question index:`, index)
        setAnswers(prev => {
            if (prev[index] === value) return prev
            return { ...prev, [index]: value }
        })

        // Cuộn tới câu tiếp theo
        setTimeout(() => {
            const nextElement = document.getElementById(`question-${index}`)
            if (nextElement) {
                nextElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }, 200)
    }

    const handleSubmit = async () => {
        const groupedAnswers: Answer[] = questions.map((q, idx) => ({
            group: q.question_code,
            value: answers[idx] || 0,
        }))

        localStorage.setItem('pendingAnswers', JSON.stringify(groupedAnswers))
        if (!cookies.userId) {
            alert('Bạn cần đăng nhập để tiếp tục. Đang chuyển hướng đến trang đăng ký...')
            router.push('/authentication/register')
            return
        }
        router.push(`/survey/result`)
    }

    const handleRandomize = () => {
        const randomAnswers: Record<number, number> = {}
        questions.forEach((_, index) => {
            const randomValue = Math.floor(Math.random() * 5) + 1
            randomAnswers[index] = randomValue
        })
        setAnswers(randomAnswers)
    }

    return (
        <div className="max-w-4xl mx-auto p-8 space-y-10">
            {/* Tiêu đề cố định */}
            <div className="text-center space-y-3 sticky top-0 z-10 bg-white py-4 shadow-md">
                <div className="w-full max-w-lg mx-auto">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>
                            Đã làm: {Object.keys(answers).length}/{questions.length}
                        </span>
                        <span>{Math.round((Object.keys(answers).length / questions.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                            style={{
                                width: `${(Object.keys(answers).length / questions.length) * 100}%`,
                            }}
                        ></div>
                    </div>
                </div>

                <h1 className="text-2xl font-semibold">
                    Hãy chọn mức độ phản ánh đúng nhất về bạn cho mỗi câu sau
                </h1>
                <div className="flex justify-center gap-6 text-sm text-gray-700 mt-2">
                    {[1, 2, 3, 4, 5].map((val) => {
                        const color = COLOR_TAILWIND[val as keyof typeof COLOR_TAILWIND]
                        return (
                            <div key={val} className="text-center w-24">
                                <div className={`w-5 h-5 mx-auto rounded-full border mb-1 ${color.base}`}></div>
                                <p className="text-xs">
                                    {['Rất không đồng ý', 'Không đồng ý', 'Trung lập', 'Đồng ý', 'Rất đồng ý'][val - 1]}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>

            {loading && <p className="text-center text-gray-500">Đang tải câu hỏi...</p>}
            {!loading && questions.length === 0 && <p className="text-center text-red-500">Không có câu hỏi nào!</p>}

            <div className="space-y-6">
                {questions.map((q, index) => (
                    <div
                        key={index}
                        id={`question-${index}`}
                        className="bg-white rounded-xl shadow-md p-6 space-y-4 border border-gray-100"
                    >
                        <p className="text-lg font-medium text-gray-800">{q.question_text}</p>
                        <div className="flex justify-between gap-2">
                            {[1, 2, 3, 4, 5].map((val) => {
                                const selected = answers[index] === val
                                const color = COLOR_TAILWIND[val as keyof typeof COLOR_TAILWIND]
                                return (
                                    <label key={val} className="flex flex-col items-center w-full group">
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={val}
                                            checked={selected}
                                            onChange={() => handleChange(index, val)}
                                            className="sr-only"
                                        />
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-150
                                                ${selected ? color.selected : color.base}`}
                                        >
                                            {val}
                                        </div>
                                    </label>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {questions.length > 0 && (
                <div className="text-center pt-6 space-y-4">
                    <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition-all duration-200"
                        onClick={handleSubmit}
                    >
                        Nộp bài
                    </button>
                    {/* <button
                        className="bg-gray-600 text-white px-6 py-3 rounded-full shadow hover:bg-gray-700 transition-all duration-200"
                        onClick={handleRandomize}
                    >
                        Random hóa câu trả lời
                    </button> */}
                </div>
            )}
        </div>
    )
}
