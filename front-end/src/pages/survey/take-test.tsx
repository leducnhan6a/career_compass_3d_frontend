import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

import { QuestionCard } from '@components/survey/QuestionCard'
import { SurveyHeader } from '@components/survey/SurveyHeader'
import { SurveyFooter } from '@components/survey/SurveyFooter'
import BackButton from '@components/UI/BackButton'

interface Question {
    question_code: string
    question_text: string
}

interface Answer {
    group: string
    value: number
}

export const COLOR_TAILWIND = {
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

const LIMIT = 10
const TOTAL_QUESTIONS = 60
const TOTAL_PAGES = Math.round(TOTAL_QUESTIONS / LIMIT) as number

export default function TakeTestPage() {
    const [questions, setQuestions] = useState<Question[]>([])
    const [answers, setAnswers] = useState<Record<number, number>>({})
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [cookies] = useCookies(['userId'])

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
        if (Object.keys(answers).length !== TOTAL_QUESTIONS) {
            alert('Bạn cần hoàn thành tất cả các câu hỏi trước khi nộp bài.')
            return
        }

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

        router.push(`/survey/results`)
    }


    const handleRandomize = () => {
        const randomAnswers: Record<number, number> = {}
        questions.forEach((_, index) => {
            randomAnswers[index] = Math.floor(Math.random() * 5) + 1
        })
        setAnswers(randomAnswers)
    }

    return (
        <div className="max-w-4xl mx-auto p-8 space-y-10">
            <BackButton />

            <SurveyHeader progress={Object.keys(answers).length} totalQuestions={questions.length} />

            {loading && <p className="text-center text-gray-500">Đang tải câu hỏi...</p>}
            {!loading && questions.length === 0 && <p className="text-center text-red-500">Không có câu hỏi nào!</p>}

            <div className="space-y-6">
                {questions.map((q, index) => (
                    <QuestionCard
                        key={index}
                        index={index}
                        question={q.question_text}
                        selectedAnswer={answers[index] || 0}
                        onAnswerSelect={handleChange}
                        color={COLOR_TAILWIND}
                    />
                ))}
            </div>

            <SurveyFooter onSubmit={handleSubmit} onRandomize={handleRandomize} />
        </div>
    )
}
