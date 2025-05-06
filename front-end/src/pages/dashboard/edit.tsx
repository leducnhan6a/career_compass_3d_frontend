import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@components/UI/Button'

export default function Edit() {
    const router = useRouter();

    const items = [
        { label: 'Chỉnh sửa câu hỏi khảo sát', route: '/survey/manage-questions' },
        { label: 'Chỉnh sửa thông tin model', route: 'model/edit/models' },
        { label: 'Chỉnh sửa thông tin sự kiện', route: '/events/edit' },
        { label: 'Chỉnh sửa thông tin ngành', route: '/majors/edit' },
    ];


    return (
        <div className="p-6 md:p-8 lg:p-10">
            <div className="w-[60vw] space-y-4 flex flex-col mx-auto">
                {items.map((item, index) => (
                    <Button key={index}
                    onClick={() => router.push(item.route)} label={`${item.label}`}/>
                ))}
            </div>
        </div>
    );
}
