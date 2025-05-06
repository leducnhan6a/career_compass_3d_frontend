import React from 'react';

interface ButtonProps {
    disabled?: boolean;
    label: string;
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'pink';
}

const variantClasses: Record<string, string> = {
    primary: 'bg-secondary text-info ',
    secondary: 'bg-gray-300 text-gray-400',
    danger: 'bg-red-600 text-red-700',
    outline: 'border border-gray-400 bg-white text-gray-100',
    pink: 'bg-accent text-accent'
};

export default function Button({
    disabled = false,
    label,
    onClick,
    className = '',
    variant = 'primary',
}: ButtonProps) {
    const variantClass = variantClasses[variant] || variantClasses.primary;

    return (
        <button
            disabled={disabled}
            className={`px-6 py-2 font-bold text-nowrap 
                hover:shadow-[0_10px_0] transition-all shadow-[0_4px_0] rounded-xl
                hover:-translate-y-1 
                ${variantClass} ${className}`}
            onClick={onClick}
        >
            <span>
                {label}
            </span>
        </button>
    );
}
