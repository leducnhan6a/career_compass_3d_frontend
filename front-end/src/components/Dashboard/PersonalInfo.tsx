import React, { useEffect } from 'react';

const PersonalInfo: React.FC = () => {
    const handleClick = (): void => {
        alert('Coming soon !!!');
        // {tạo modal để chỉnh sửa thông tin cá nhân}
    };

    useEffect(() => { 
    }, [])

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
            <div>
                <p>
                    <strong>Tên hiển thị:</strong> Nguyễn Văn A
                </p>
                <p>
                    <strong>Email:</strong> nguyenvana@gmail.com
                </p>
                <p>
                    <strong>Giới tính:</strong> Nam
                </p>
            </div>
            <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                onClick={handleClick}
            >
                Chỉnh sửa thông tin cá nhân
            </button>
        </div>
    );
};

export default PersonalInfo;
