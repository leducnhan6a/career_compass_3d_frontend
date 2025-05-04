interface SurveyHeaderProps {
    progress: number;
    totalQuestions: number;
}

export const SurveyHeader: React.FC<SurveyHeaderProps> = ({ progress, totalQuestions }) => {
    const percentage = Math.round((progress / totalQuestions) * 100);

    return (
        <div className="text-center space-y-3 sticky top-0 z-10 bg-white py-4 shadow-md">
            <div className="w-full max-w-lg mx-auto">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Đã làm: {progress}/{totalQuestions}</span>
                    <span>{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>
            <h1 className="text-2xl font-semibold">Hãy chọn mức độ phản ánh đúng nhất về bạn cho mỗi câu sau</h1>
        </div>
    );
};
