import { COLOR_TAILWIND } from "@pages/survey/take-test";

interface AnswerOptionProps {
    value: number
    selected: boolean
    color: typeof COLOR_TAILWIND;
    onSelect: (value: number) => void
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({ value, selected, color, onSelect }) => {
    return (
        <label className={`flex flex-col items-center w-full group`}>
            <input
                type="radio"
                value={value}
                checked={selected}
                onChange={() => onSelect(value)}
                className="sr-only"
            />
            <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-150  hover:cursor-pointer
                    ${selected ? color[value as keyof typeof color].selected : color[value as keyof typeof color].base}`}
            >
                {value}
            </div>
        </label>
    )
}
