import { COLOR_TAILWIND } from '@pages/survey/take-test'
import { AnswerOption } from './AnswerOption'

interface QuestionCardProps {
    index: number
    question: string
    selectedAnswer: number
    onAnswerSelect: (index: number, value: number) => void
    color: typeof COLOR_TAILWIND;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
    index,
    question,
    selectedAnswer,
    onAnswerSelect,
    color,
}) => {
    return (
        <div id={`question-${index}`} className="bg-white rounded-xl shadow-md p-6 space-y-4 border border-gray-100">
            <p className="text-lg font-medium text-gray-800">{question}</p>
            <div className="flex justify-between gap-2">
                {[1, 2, 3, 4, 5].map((val) => (
                    <AnswerOption
                        key={val}
                        value={val}
                        selected={selectedAnswer === val}
                        color={color}
                        onSelect={(value) => onAnswerSelect(index, value)}
                    />
                ))}
            </div>
        </div>
    )
}
