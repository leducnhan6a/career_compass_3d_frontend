import { useRouter } from 'next/router'

export default function SurveyIndexPage() {
    const router = useRouter()

    const handleStartSurvey = () => {
        router.push('/survey/take-test')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-xl space-y-6">
                <h1 className="text-2xl font-bold text-center">Khảo sát nghề nghiệp</h1>
                <p className="text-gray-600 text-center">
                    Hãy bắt đầu bài khảo sát để tìm hiểu nhóm tính cách nghề nghiệp của bạn theo mô hình Holland (RIASEC).
                </p>
                <div className="flex justify-center">
                    <button
                        onClick={handleStartSurvey}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Bắt đầu khảo sát
                    </button>
                </div>
            </div>
        </div>
    )
}
