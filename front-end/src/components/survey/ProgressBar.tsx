interface ProgressBarProps {
    current: number
    total: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    return (
        <div className="w-full bg-gray-200 rounded-full h-3">
            <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(current / total) * 100}%` }}
            ></div>
        </div>
    )
}
