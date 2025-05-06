import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Edit() {
    const router = useRouter();

    const items = [
        { label: 'Chỉnh sửa câu hỏi khảo sát', route: '/survey/manage-questions' },
        { label: 'Chỉnh sửa thông tin model', route: 'model/edit/models' },
        { label: 'Chỉnh sửa thông tin sự kiện', route: 'events/edit' },
        { label: 'Chỉnh sửa thông tin ngành', route: '/majors/edit' },
    ];


    return (
        <div className="p-6 md:p-8 lg:p-10">
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => router.push(item.route)}
                        className="p-4 bg-white rounded-lg shadow cursor-pointer transition transform hover:scale-[1.02] hover:bg-blue-50 hover:shadow-md"
                    >
                        <h3 className="text-lg font-medium text-gray-800 hover:text-blue-600 transition">
                            {item.label}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
