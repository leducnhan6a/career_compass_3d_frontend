'use client'; // Chỉ cần nếu bạn dùng App Router

import { useRouter } from 'next/router'; // hoặc 'next/navigation' nếu dùng App Router
import { CaretLeft } from 'phosphor-react';

interface BackButtonProps {
    onClick?: () => void;
}

export default function BackButton({ onClick }: BackButtonProps) {
    const router = useRouter();

    return (
        <button
            onClick={
                onClick
                    ? onClick
                    : () => {
                        router.back(); // Quay lại trang trước đó
                    }
            }
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
            }}
        >
            <CaretLeft size={24} />
            Quay lại
        </button>
    );
}
